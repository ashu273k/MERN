/**
 * In this coding challenge, you will create a secure user registration backend using Express.js and bcrypt. The goal is to safely store user passwords in a database by hashing them before storage. This ensures that even if the data is compromised, the actual passwords remain protected.

Set up the Express server with the necessary middleware. Implement the /register endpoint to accept username and password from the request body. Validate the received data. Use bcrypt to hash the received password. Store the username and hashed password in the users array. Send a success response to the client if all steps are successful. Handle possible errors and send appropriate error responses.

In case of success, the server should return an HTTP status code of 201 along with the message "User registered successfully". In case of failure, the server should return an HTTP status code of 400 along with the message "Username and password are required" if either the username or password is missing. If there is an internal server error during the registration process, the server should return an HTTP status code of 500 along with the message "Internal Server Error".

Write your code in src/api.js
 */
/*********************code to be  written in the stub*************************/
const express = require("express");
const bcrypt = require("bcrypt");
const app = express();
app.use(express.json());

const users = []; // In-memory storage for users

// app.post("/register", async (req, res) => {
//   /************************learner code ************************/
//   // Here goes the learner's code
//   try {

//     const {username, password} = req.body

//     // Validating presence
//     if (!username || !password || typeof username !== "string" || typeof password !== "string" || username.trim() === "" || password.trim() === "") {
//       return res.status(400).send("Username and password are required"); 
//     }

//     // Hash the password
//     const saltRounds = 10
//     const hashedPassword = await bcrypt.hash(password, saltRounds)

//     // Store user with hashed password
//     users.push({username: username.trim(), password: hashedPassword})

//     // success response
//     return res.status(201).send("User registered successfully")
//   } catch (error) {
//     res.status(500).send({message: "Internal Server Error"})
//   }
// });

app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .send({ message: "Username and password are required" });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = { username, password: hashedPassword };
    users.push(user);
    res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = app;
/***********************code will be provided in stub*******************************/
