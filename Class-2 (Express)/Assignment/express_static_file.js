/*
 *Create an Express.js application that serves static files such as HTML, CSS, and images from a designated directory called "public." 
 The application should ensure that when users access the root URL ("/"), the server responds with the "index.html" file located within the "public" directory. Use express.static() to serve static files by passing the path to the "public" directory as an argument to express.static(). Define a route for the root ("/") using app.get(). In the route handler function, use res.sendFile() to send the "index.html" file located in the "public" directory.
Write your code in src/api.js 
 */
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, "public")));


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"))
})

module.exports = app;