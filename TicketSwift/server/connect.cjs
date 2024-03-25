const { MongoClient } = require("mongodb")
require("dotenv").config({path: "./config.env"})

async function main()
{
    const Db = process.env.ATLAS_URI
    const client = new MongoClient(Db)

    const username = "bob"
    const email_address = "bob69@fakegmail.com"
    const password = "assdffewfaef"

    try
    {
        await client.connect()
        const comments = await client.db("sample_mflix").collection("comments")
        
        const query = {name: username}

        const result = await comments.findOne(query)
        if(result != null)
        {
            console.log("Username already exists")
        }
        else
        {
            const doc = {
                name: username,
                email: email_address,
                text: password,
            }
            const res = await comments.insertOne(doc)
            console.log("Account successfully created")
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
}

main()