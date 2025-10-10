/**
 * You are tasked with creating a basic Express.js application. The application should perform the following
 * operations:
 *         1. Connect to a MongoDB database using the Mongoose ORM.
           2.  Define a Mongoose model for a User with fields for name and email.
           3. Define a GET route at the path "/users/:id".
           4.The GET route should retrieve a user by ID from the MongoDB database and respond with the result. The ID should be provided as a parameter in the URL.
           5. Use async/await syntax for handling asynchronous operations.

Setup dependencies by importing necessary libraries (express, mongoose). Implement the GET route at "/users/:id" to retrieve a user by their ID using User.findById() from Mongoose, passing the id parameter from the URL. Add error handling by checking if no user is found and responding with a 404 status. Use a try-catch block to handle and respond to any errors during database operations with status 500 and message: "Internal server error".
Write your code in src/api.js
 */

const express = require('express')
const mongoose = require('mongoose')
const { type } = require('os')
const app = express()

//The line app.use(express.json()); in an Express.js application serves to enable the built-in middleware for parsing incoming request bodies with JSON payloads.
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/myApp", {
      newUrlParser: true,
      newUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to databse")
    })
    .catch((err) => {
        console.log(err)
    })

// Mongoose schemas
const User = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

// Creating a object that will follow our schema
const person = mongoose.model('person', User)

app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404);
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});