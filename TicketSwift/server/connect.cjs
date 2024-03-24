const { MongoClient } = require("mongodb")
require("dotenv").config({path: "./config.env"})

async function main()
{
    const Db = process.env.ATLAS_URI
    const client = new MongoClient(Db)

    try
    {
        await client.connect()
        const comments = await client.db("sample_mflix").collection("comments")
        
        const query = {name: "poop"}

        const result = await comments.findOne(query)

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