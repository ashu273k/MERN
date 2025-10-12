// Use dotenv to load PORT from environment. Start the server on that port and respond { "port": <PORT> } at /env.

require('dotenv').config()
const express = require('express')
const app = express()

app.get('/env', (req, res) => {
    res.json({ port: process.env.PORT })
})