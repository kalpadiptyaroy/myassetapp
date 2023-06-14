const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const dbconnect = require("./db/dbconnect");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());

dotenv.config({path: '../.env'}); // We mention the path to the .env file.
const port = process.env.PORT_DEV || 5000;

// Establish connection to MongoDB.
dbconnect();

// Signup or register endpoint API.
const User = require("./db/model/user-model");

app.post("/signup", async (req, res) => {

    let hashedPassword = null;

    try
    {
        hashedPassword = await bcrypt.hash(req.body.password, 8);
        console.log("Hashed Password: ", hashedPassword);
    }
    catch(error)
    {
        res.status(500).send({message: "Can't hash you password successfully"});
        console.log("Error occured in while encrypting password.");
        console.error(error);
    }

    const user = new User({ email: req.body.email, password: hashedPassword });

    try {
        const savedUser = await user.save();    
        res.status(201).send({message: "Created user successfully", newUser: savedUser});
        console.log("User created successfully !");        
    } catch (error) {
        res.status(500).send({message: "Error creating user."});
        console.log("Error creating user.");
        console.error(error);
    }

});

// Setup cors policy for http request
app.use(cors());
app.use(express.json());

app.listen(port, () => console.log(`Express running at ${port}`));