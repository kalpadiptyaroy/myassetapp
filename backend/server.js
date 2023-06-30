const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const dbconnect = require("./db/dbconnect");
const corsFilter = require("./config/corsConfig");
const publicRouter = require("./router/public-router");

const app = express();

// Setup cors policy for http request
app.use(cors());
app.use(express.json());

// Configure cors filter for development purpose.
app.use(corsFilter);

dotenv.config({path: '../.env'}); // We mention the path to the .env file.
const port = process.env.PORT_DEV || 5000;

// Establish connection to MongoDB.
dbconnect();

// Signup or register endpoint API.
app.post("/api/signup", publicRouter.signup);
app.post("/api/signin", publicRouter.signin);

app.listen(port, () => console.log(`Express running at ${port}`));