/*
 *  Node_express_error_handling
 * 
 * Create an Express route that checks if the request parameter "number" is a positive integer. 
 * If the "number" parameter is not a positive integer, the route should send "Invalid positive integer" with status code 400. If the validation is successful, the response should include a success message saying "Success!". Write a middleware function to validate the "number" parameter.
Write your code in src/api.js
 */
const express = require('express')
const app = express()

app.get('/validate-number', (req, res) => {
    const number = parseInt(req.query.number)

    if (Number.isInteger(number) & number > 0 ) {
        res.send("Success!")
    } else {
        res.status(400).send('Invalid positive integer')
    }
})

module.exports = app