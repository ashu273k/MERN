/**
 * 
 * Problem Statement: Implement a rate-limiting middleware for an Express application. The middleware should limit the number of requests from a single IP address to a specified rate, and return a 429 Too Many Requests status if the limit is exceeded.

Utilize the express-rate-limit library to create a middleware that can keep track of the number of requests from each IP address over a fixed window of time. Configure the Middleware: Set the windowMs to 900000 milliseconds (15 minutes) and max to 100 requests, allowing up to 100 requests per IP per 15 minutes. Apply the Middleware Globally: Integrate the middleware into the application so that it affects all incoming requests, ensuring that every route is protected from excessive use. Handle Exceeded Limits: Customize the response when an IP exceeds the allowed number of requests to return a 429 HTTP status, informing the user that they have sent too many requests in a given amount of time. Handle possible errors and send appropriate error responses.

Write your code in src/api.js
 */