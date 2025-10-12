// POST /register with body { username, password }. If missing any field, respond 400 { error: "All fields required" }.

// src/register.js
const express = require("express");
const app = express();
app.use(express.json());

// Your code here
app.post('/register', (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json({ error: 'All fields requied' })
    }
    res.status(201).json({ username })
})

module.exports = app;

// GET /posts should simulate DB delay using setTimeout (2s) then return array [1,2,3].

