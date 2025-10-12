// Write middleware auth that checks for header x-api-key="12345". If not present, respond 401 { error:"Unauthorized" }. Use for /secure.

// src/auth.js
const express = require("express");
const app = express();

// Middleware + Route
const auth = (req, res, next) => {
    if (req.headers['x-api-key'] !== '12345') {
        return res.status(401).json({ error: "Unauthorized" })
    }
    next()
}

app.get('/secure', auth, (req, res) => {
    res.json({ message: 'Access granted' })
})
module.exports = app;