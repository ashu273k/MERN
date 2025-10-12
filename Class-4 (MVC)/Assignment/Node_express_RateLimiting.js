/**
 * 
 * Problem Statement: Implement a rate-limiting middleware for an Express application. The middleware should limit the number of requests from a single IP address to a specified rate, and return a 429 Too Many Requests status if the limit is exceeded.

Utilize the express-rate-limit library to create a middleware that can keep track of the number of requests from each IP address over a fixed window of time. Configure the Middleware: Set the windowMs to 900000 milliseconds (15 minutes) and max to 100 requests, allowing up to 100 requests per IP per 15 minutes. Apply the Middleware Globally: Integrate the middleware into the application so that it affects all incoming requests, ensuring that every route is protected from excessive use. Handle Exceeded Limits: Customize the response when an IP exceeds the allowed number of requests to return a 429 HTTP status, informing the user that they have sent too many requests in a given amount of time. Handle possible errors and send appropriate error responses.

Write your code in src/api.js
 */
/*********************code to be  written in the stub*************************/
const express = require('express');
const rateLimit = require('express-rate-limit');
const app = express();

/**
 * Rate-limiting middleware for Express
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */

// Configure the rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;