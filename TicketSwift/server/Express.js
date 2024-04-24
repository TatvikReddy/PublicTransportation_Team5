// Import required modules
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Assuming you have a bcrypt module installed
require('dotenv').config({ path: './src/.env' }); // For loading environment variables
const { createHash } = require('crypto');
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
const emailHandling = require('./EmailHandling');

//PayPal imports
const fetch = require("node-fetch");
const path = require("path");

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET} = process.env;
const base = "https://api-m.sandbox.paypal.com";


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));
const changePasswordSubject = "Change password request";
const changePasswordText = "This is your notification that your password has been changed.";
const feedbackSubject = 'Feedback request';
const feedbackText = 'Thank you for your feedback';

// Define user schema and model
const ticketSchema = new mongoose.Schema({
  uuid: {
      type: String,
      required: true,
      unique: true,
  },
  name : {
    type: String,
    required: true,
    unique: true,
  },
  arrival_time :  {
    
  },
  departure_time:  {
    
  },
  arrival_stop:  {
    
  },
  departure_stop:  {
    
  },
  agency:  {
    
  },
  distance:  {
    
  },
  price:  {
    
  },
  confirmed:  {
    
  },
});

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
    isAdmin: {
        type: Boolean,
        default: false,
    },
    securityQuestion: {
        type: String,
        default : "Please select a security question...",
        required: true,
    },
    securityAnswer: {
        type: String,
        required: true,
    },
    trips: {
      type: Array,
      require: true,
    }
});

const tripSchema = new mongoose.Schema({
  arrival: {
      type: String,
      required: true,
  },
  depart: {
      type: String,
      required: true,
  },
  end: {
      type: String,
      required: true,
  },
  start: {
      type: String,
      required: true,
  },
  tickets: {
    type: Array,
    require: true,
  },
  uuid: {
    type: String,
    require: true,
  },
});

const User = mongoose.model('User', userSchema);
const Ticket = mongoose.model('Ticket', ticketSchema)
const Trip = mongoose.model('Trip', tripSchema)

// Initialize express app
const app = express();

// Middleware
app.use(express.json({limit: '50mb', extended: true}));
app.use(cors());
app.use(cookieParser());

// Registration endpoint
app.post('/api/register', async (req, res) => {
    try {
        const { firstName, lastName, email, username, password, confirmPassword, isAdmin, securityQuestion, securityAnswer } = req.body;

        //console.log(req.body)

        // Validation checks
        if (!firstName || !lastName) return res.status(400).send("First name and last name are required");
        if (!email) return res.status(400).send("Email is required");
        if (!username) return res.status(400).send("Username is required");
        if (!password || password.length < 6) return res.status(400).send("Password is required and should be at least 6 characters long");
        if (password !== confirmPassword) return res.status(400).send("Passwords do not match");
        if (securityQuestion === null || securityAnswer === null) return res.status(400).send("Security question and answer are required");

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
            isAdmin, 
            securityQuestion,
            securityAnswer
        });
        
        //console.log(newUser)
        //console.log(newUser.securityQuestion)
        
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

        // Check if the user already exists
        let existingUser = await User.findOne({ $or: [{ email }] });
        
        if (existingUser.password === hashedPassword) {

            const token = jwt.sign({email: email,id: existingUser._id, role: existingUser.isAdmin}, process.env.SECRET, { expiresIn: 60*60*60 });

            res.cookie( "token", token,{ maxAge: 1000 * 60 * 10, httpOnly: false });

            //console.log(token + "\n\n");

            return res.status(200).send(token);
        }

        return res.status(400).send("No credential match found")
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.post('/api/resetpassword', async (req, res) => {
    
    try {
        const { email, password, confirmPassword, securityQuestion, securityAnswer } = req.body;

        if (!email) return res.status(400).send("Email is required");
        if (!password || password.length < 6) return res.status(400).send("Password is required and should be at least 6 characters long");
        if (password !== confirmPassword) return res.status(400).send("Passwords do not match");
        if (securityQuestion === null || securityAnswer === null) return res.status(400).send("Security question and answer are required");

      let existingUser = await User.findOne({ $or: [{ email }] });
        
        if (!existingUser) {
          return res.status(400).send("User does not exist");
        }      

        if (existingUser.securityQuestion !== securityQuestion || existingUser.securityAnswer !== securityAnswer) {
          return res.status(400).send("Security question or answer is incorrect");
        }

        //console.log(email)

        // Hash the password
        const hashedPassword = createHash('sha256').update(password).digest('hex')

        // Check if the user already exists

        existingUser.password = hashedPassword;

        emailHandling.sendEmail(email, changePasswordSubject, changePasswordText);

        await existingUser.save();

        return res.status(200).send("Password has been changed")
    } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.post('/api/userinfo', async (req, res) => {
    
    const { token } = req.body;
    //console.log(token);
    var base64Payload = token.split('.')[1];
    var payload = Buffer.from(base64Payload, 'base64');
    payload = JSON.parse(payload.toString())
    const email = payload.email;
    let existingUser = await User.findOne({ $or: [{ email }] });
    // console.log(email);
    // console.log(existingUser);

    return res.status(200).send(existingUser)

})

app.post('/api/reportissue', async (req, res) => {
    
    try {
        const { name, email, subject, issue } = req.body;

        emailHandling.sendEmail(email, feedbackSubject, feedbackText); // Send feedback email
        return res.status(200).send("Issue has been reported")
    } catch (error) {
        console.error("Error registering feedback:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.post('/api/makeqr', async (req, res) => {
    try {
        const qr = crypto.randomUUID();
        
        let qrCheck = await Ticket.findOne({ $or: [{ qr }] });
        if (qrCheck === null){
            //console.log(qr)

            const qrUUID = new Ticket({uuid : qr,});

            //console.log(qrUUID.uuid)

            await qrUUID.save();
            return res.status(200).send(qr)
        }
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).send("Internal Server Error");
    }
})

app.post('/api/readqr', async (req, res) => {
    try {
        const { uuid } = req.body;

        let qrCheck = await Ticket.findOne({ $or: [{ uuid }] });
        console.log(qrCheck)
        console.log(uuid)
        if (qrCheck !== null){
            return res.send('Valid')
        }
        return res.send("Invalid")

    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).send("Internal Server Error");
    }
})

app.post('/api/verify', async (req, res) => {
  try {
      console.log(req.body.trip.tickets);
      Ticket.insertMany(req.body.trip.tickets);
      emailHandling.sendEmail(req.body.paypal.payer.email_address, "Ticket Swift Comfirmation and Receipt", "works");
      var base64Payload = req.body.token.split('.')[1];
      var payload = Buffer.from(base64Payload, 'base64');
      payload = JSON.parse(payload.toString())
      const email = payload.email;
      let existingUser = await User.findOneAndUpdate({ $or: [{ email }] }, { $push: {trips: req.body.trip} });
      res.send(200);

  } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).send("Internal Server Error");
  }
})

app.post('/api/trips', async (req, res) => {
  try {
      var base64Payload = req.body.token.split('.')[1];
      var payload = Buffer.from(base64Payload, 'base64');
      payload = JSON.parse(payload.toString())
      const email = payload.email;
      let existingUser = await User.findOne({ $or: [{ email }] });
      res.send(existingUser.trips);

  } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).send("Internal Server Error");
  }
})

app.post('/api/ticket', async (req, res) => {
  const { uuid } = req.body;

  let qrCheck = await Ticket.findOne({ $or: [{ uuid }] });
  if (qrCheck.confirmed) return res.status(200).send(qrCheck);
  qrCheck.confirmed = true;
  await qrCheck.save();
  qrCheck.confirmed = false
  return res.status(200).send(qrCheck);
})


///
const generateAccessToken = async () => {
    try {
      if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
        throw new Error("MISSING_API_CREDENTIALS");
      }
      const auth = Buffer.from(
        PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET,
      ).toString("base64");
      const response = await fetch(`${base}/v1/oauth2/token`, {
        method: "POST",
        body: "grant_type=client_credentials",
        headers: {
          Authorization: `Basic ${auth}`,
        },
      });
  
      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error("Failed to generate Access Token:", error);
    }
  };
  
  /**
   * Create an order to start the transaction.
   * @see https://developer.paypal.com/docs/api/orders/v2/#orders_create
   */
  const createOrder = async (cart) => {
    // use the cart information passed from the front-end to calculate the purchase unit details
    console.log(
      "shopping cart information passed from the frontend createOrder() callback:",
      cart,
    );
    console.log(cart[0].price)
  
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders`;



    const payload = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: cart[0].price,
          },
        },
      ],
    };
  
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
        // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
        // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
        // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'
        // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
      },
      method: "POST",
      body: JSON.stringify(payload),
    });
  
    return handleResponse(response);
  };
  
  /**
   * Capture payment for the created order to complete the transaction.
   * @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
   */
  const captureOrder = async (orderID) => {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders/${orderID}/capture`;
  
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
        // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
        // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'
        // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'
        // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
      },
    });
  
    return handleResponse(response);
  };
  
  async function handleResponse(response) {
    try {
      const jsonResponse = await response.json();
      return {
        jsonResponse,
        httpStatusCode: response.status,
      };
    } catch (err) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
  }
  
  app.post("/api/orders", async (req, res) => {
    try {
      // use the cart information passed from the front-end to calculate the order amount detals
      const { cart } = req.body;
      const { jsonResponse, httpStatusCode } = await createOrder(cart);
      res.status(httpStatusCode).json(jsonResponse);
    } catch (error) {
      console.error("Failed to create order:", error);
      res.status(500).json({ error: "Failed to create order." });
    }
  });
  
  app.post("/api/orders/:orderID/capture", async (req, res) => {
    try {
      const { orderID } = req.params;
      const { jsonResponse, httpStatusCode } = await captureOrder(orderID);
      res.status(httpStatusCode).json(jsonResponse);
    } catch (error) {
      console.error("Failed to create order:", error);
      res.status(500).json({ error: "Failed to capture order." });
    }
  });

app.post('/api/payment', async (req, res) => {
  const { arrival, depart, end, start, tickets, uuid } = req.body;
  //console.log(uuid)
  newTickets = [];
  for (i in tickets){
    if (tickets[i].agency[0].name === "Greyhound" || tickets[i].agency[0].name === "FlixBus" || tickets[i].agency[0].name === "Amtrak"){
      newTickets.push(tickets[i])
    }
  }

  const newTrip = new Trip({ arrival, depart, end, start, tickets : newTickets, uuid });
  await newTrip.save();

  try {
      //console.log(req.body)
      

  } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
  }
});

app.post('/api/checkout', async (req, res) => {
  uuid = req.body.uuid;
  console.log(uuid);
  try {
    let trip = await Trip.findOne({ $or: [{ uuid }] });
    console.log(trip)
    res.send(trip);
      

  } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});