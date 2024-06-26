import express from "express"
import { isAbsolute } from "path";
import { isNamedExportBindings } from "typescript";
const { MongoClient } = require("mongodb")
require("dotenv").config({path: "./config.env"})

const router = express.Router()

router.post("/register", async (req, res) => {
const { firstName, lastName, email, username, password, confirmPassword } = req.body;

const Db = process.env.ATLAS_URI
const client = new MongoClient(Db)

// const username = "bob"
// const email_address = "bob69@fakegmail.com"
// const password = "assdffewfaef"

try
{
    if (!firstName || !lastName) return res.status(400).send("First name and last name are required");
    if (!email) return res.status(400).send("Email is required");
    if (!username) return res.status(400).send("Username is required");
    if (!password || password.length < 6) return res.status(400).send("Password is required and should be at least 6 characters long");
    if (password !== confirmPassword) return res.status(400).send("Passwords do not match");

    await client.connect()
    const comments = await client.db("sample_mflix").collection("comments")    
    const query = {name: username}

    const userExist = await comments.findOne({ email });
    const result = await comments.findOne(query)
    if(result != null || userExist)
    {
        console.log("User already exists")
    }
    else
    {
        const hashedPassword = await hashPassword(password);
        const doc = {
            firstName,
            lastName,
            email,
            username,
            password: hashedPassword,
            isAdmin: false,
        }
        const res = await comments.insertOne(doc)
        console.log("Account successfully created")
        return res.json({ ok: true });
    }

    console.log(result)
}
catch(e)
{
    console.error(e)
}
finally
{
    await client.close()
}
});

router.post("/create-account-admin", async (req, res) => {
    const { firstName, lastName, email, username, password, confirmPassword } = req.body;
    
    const Db = process.env.ATLAS_URI
    const client = new MongoClient(Db)
    
    try
    {
        if (!firstName || !lastName) return res.status(400).send("First name and last name are required");
        if (!email) return res.status(400).send("Email is required");
        if (!username) return res.status(400).send("Username is required");
        if (!password || password.length < 6) return res.status(400).send("Password is required and should be at least 6 characters long");
        if (password !== confirmPassword) return res.status(400).send("Passwords do not match");
    
        await client.connect()
        const comments = await client.db("sample_mflix").collection("comments")    
        const query = {name: username}
    
        const userExist = await comments.findOne({ email });
        const result = await comments.findOne(query)
        if(result != null || userExist)
        {
            console.log("User already exists")
        }
        else
        {
            const hashedPassword = await hashPassword(password);
            const doc = {
                firstName,
                lastName,
                email,
                username,
                password: hashedPassword,
                isAdmin: true,
            }
            const res = await comments.insertOne(doc)
            console.log("Account successfully created")
            return res.json({ ok: true });
        }
    
        console.log(result)
    }
    catch(e)
    {
        console.error(e)
    }
    finally
    {
        await client.close()
    }
    });

const app = express();
app.use(express.json());
app.use("/api", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});