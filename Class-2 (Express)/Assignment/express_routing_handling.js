/*
 * You are building a web application using Express in Node.js. Create an Express route to handle GET requests to the endpoint "/greet" that takes a query parameter "name" and returns a personalized greeting.
 If the name parameter is not provided, the default greeting should be "Hello, Guest!". Create an Express route for handling GET requests to the "/greet" endpoint using the app.get() method to define the route. Inside the route handler function, use req.query.name to access the value of the "name" query parameter from the request URL. Check if the "name" parameter exists. If it does, return a personalized greeting using the provided name. If not, return a default greeting for guests. Use res.send() to send the greeting as the response to the client.
Write your code in src/api.js
 */

const express = require("express")
const app = express()

app.get('/greet', (req, res) => {
    const name = req.query.name || "Guest"
    res.send(`Hello, ${name}!`)
})

module.exports = app;