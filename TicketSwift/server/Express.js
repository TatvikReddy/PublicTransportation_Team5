// Import required modules
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Assuming you have a bcrypt module installed
require('dotenv').config({ path: './src/.env' }); // For loading environment variables
const { createHash } = require('crypto');
const jwt = require('jwtwebtoken')

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Define user schema and model
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model('User', userSchema);

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Registration endpoint
app.post('/api/register', async (req, res) => {
    try {
        const { firstName, lastName, email, username, password, confirmPassword } = req.body;

        // Validation checks
        if (!firstName || !lastName) return res.status(400).send("First name and last name are required");
        if (!email) return res.status(400).send("Email is required");
        if (!username) return res.status(400).send("Username is required");
        if (!password || password.length < 6) return res.status(400).send("Password is required and should be at least 6 characters long");
        if (password !== confirmPassword) return res.status(400).send("Passwords do not match");

        // Check if the user already exists
        let existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).send("User with this email or username already exists");
        }

        // Hash the password
        const hashedPassword = createHash('sha256').update(password).digest('hex')

        // Create a new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            username,
            password: hashedPassword,
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Hash the password
        const hashedPassword = createHash('sha256').update(password).digest('hex')
        console.log("website: " + hashedPassword);

        // Check if the user already exists
        let existingUser = await User.findOne({ $or: [{ email }] });
        if (existingUser.password === hashedPassword) {
            console.log(existingUser);

            const token = jwt.sign(existingUser, process.env.MY_SECRET, { expiresIN: '15m' });
            res.cookie("token", token)

            return res.status(200).send("User verified");
        }
        
        console.log("database: " + existingUser.password);
        const shapassword = createHash('sha256').update(password).digest('hex')
        console.log(shapassword)
        console.log(createHash('sha256').update(password).digest('hex'))

        return res.status(400).send("No credential match found")
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
