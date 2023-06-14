const mongoose = require("mongoose");
require("dotenv").config();

async function dbconnect() {

    try {
        // establish connection with mongoDB.
        const connection = await mongoose.connect(process.env.ATLAS_URI, 
            { useNewUrlParser: true, useUnifiedTopology: true });
        if(connection)
            console.log("Connected to MongoDB");
    }
    catch(error)
    {
        console.log("Cannot connect to MongoDB");
        console.error(error);
    }
}

module.exports = dbconnect;