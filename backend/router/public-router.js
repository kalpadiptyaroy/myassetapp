const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../db/model/user-model");
const bcrypt = require("bcrypt");

async function signup(req, res) {

    let hashedPassword;

    try
    {
        hashedPassword = await bcrypt.hash(req.body.password, 8);
        console.log("Hashed Password: ", hashedPassword);
    }
    catch(error)
    {
        console.log("Error occured in while encrypting password.");
        console.error(error);
        return res.status(500).send({message: "Can't hash you password successfully"});
    }

    const user = new User({ email: req.body.email, password: hashedPassword });

    try {
        const savedUser = await user.save();    
        console.log("User created successfully !"); 
        return res.status(201).send({message: "Created user successfully", newUser: savedUser});       
    } catch (error) {
        console.log("Error creating user.");
        console.error(error);
        return res.status(500).send({message: "Error creating user."});
    }

}


async function signin(req, res) {
    let existingUser;
    let matchPassword;

    try{ // Check email exists or not ?
        existingUser = await User.findOne({ email: req.body.email });
    }
    catch(error) // if email doesn't exists then return not found.
    {
        return res.status(404).send({message: "Email not found."});
    }

    try{    // if user is found then we match password.
        matchPassword = await bcrypt.compare(req.body.password, existingUser.password);

        if(matchPassword) // if password matches then we create the token and send to frontend.
        {
            const secretKey = process.env.SECRETKEY;
            const jwttoken = jwt.sign({userId: existingUser._id, userEmail: existingUser.email}, secretKey, {expiresIn: "1h"});
            console.log("User Signed In...");
            return res.status(200).send({message: "Signed In", user: {email: req.body.email, token: jwttoken}});
        }
    }
    catch(error) // if passowrd doesn't match we return failed response to frontend.
    {
        console.log("Password does not match");
        console.error(error);
        return res.status(400).send({message: "Password doesn't match"});
    }
}

module.exports = {signin: signin, signup: signup};