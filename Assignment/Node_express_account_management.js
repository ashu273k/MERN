// You are tasked with creating a RESTful API for managing user accounts in a web application. The solution will use the Express framework, middleware for input validation, and MongoDB Atlas as the database backend. The API should cover the following requirements:

// Routes and Endpoints:

// POST /users: Create a new user account. The request body should contain a JSON object with fields username, password, and email.
// GET /users: Fetch a list of all user accounts.
// GET /users/:id: Fetch a single user account by its ID. If user not found, respond with status 404 with message("User not found").
// PUT /users/:id: Update a user's account information. The request body can contain any combination of username, password, or email. If user not found, respond with status 404 with message("User not found").
// DELETE /users/:id: Delete a user's account by its ID and respond with ("User deleted successfully") message.


// Middleware for Input Validation: Check that the username, password, and email fields are valid in the POST and PUT requests:

// username: should be a non-empty string, If not respond with status 400 with message ("Invalid username").
// password: should be a string with at least 6 characters, If not respond with status 400 with message ("Password must be at least 6 characters long").
// email: should be in a valid email format (can use the validator library for this), If not respond with status 400 with message ("Invalid email format").
// If any field is missing, respond with status 400 with message ("Missing required fields").

// Write your code in src/api.js

const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const validator = require("validator");

/** Do not change the connection string below */
mongoose.connect("mongodb://localhost:27017/myApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
/** connection ends */

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  email: { type: String, unique: true },
});

const User = mongoose.model("User", userSchema);

// Middleware for input validation
function validateInput(req, res, next) {
  // Implement validation logic
  const {username, password, email} = req.body 

  if (!username || !password || !email) {
    return res.status(400).json({ message: "Missing required fields"})
  }

  if (typeof username !== "string" || username.length < 1) {
    return res.status(400).json({ message: "Invalid username"})
  }

  if (typeof password !== "string" || password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long"})
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email format"})
  }

  next();
}

// Your code goes here.

app.post("/users", validateInput, async (req, res, next) => {
    try {
        const {username, password, email} = req.body
        const user = new User({username, password, email})
        await user.save()
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
})

// GET /users Implementation
app.get('/users', async (req, res, next) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch(error) {
        next(error)
    }
})

// GET /users/:id Implementation
app.get('/users/:id', async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({ message: "User not found"})
        }
        res.json(user)
    } catch (error) {
        next(error)
    }
})

// PUT /users/:id Implementation
app.put('/users/:id', validateInput, async (req, res, next) => {
    try {
        const { username, password, email } = req.body
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { username, password, email },
            { new: true}
        )

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' })
        }

        res.json(updatedUser)

    } catch (error) {
        next(error)
    }
})

// DELETE /users/:id Implementation
app.delete('/users/:id', async (req, res, next) => {
    try {
        const deletedUser = await User.findByIdAndRemove(req.params.id)
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found'})
        }
        res.json( { message: 'User deleted successfully'})
    } catch (error) {
        next(error)
    }
})

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message })
})
module.exports = { app, User };
