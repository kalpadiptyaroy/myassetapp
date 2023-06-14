const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const dbconnect = require("./db/dbconnect");

const app = express();
app.use(express.json());

dotenv.config({path: '../.env'}); // We mention the path to the .env file.
const port = process.env.PORT_DEV || 5000;

// Establish connection to MongoDB.
dbconnect();

// Setup cors policy for http request
app.use(cors());
app.use(express.json());

app.listen(port, () => console.log(`Express running at ${port}`));