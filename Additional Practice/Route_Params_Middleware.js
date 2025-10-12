// Create an Express server with a single route:

// GET /hello → returns
// { "message": "Hello Express!" }
const express = require('express')
const app = express()

app.use(express.json())

// GET /hello route
app.get('/hello', (req, res) => {
    res.json({ message: 'Hello Express!'})
})

module.exports = app

// The server should listen on port 3000.`

// Problem Statement
// Create GET /welcome/:name → returns { "message": "Welcome <name>!" }

app.get('/welcome/:name', (req, res) => {
    res.json({ message: `Welcome ${req.params.name}` })
})

// Create a middleware that adds req.time = new Date().toISOString() and use it for /time route returning { "time ": "<timestamp>" }

// Middleware + Route here
const addTimeStamp = (req, res, next) => {
    req.time = new Date().toISOString()
    next()
}

app.use(addTimeStamp)

app.get('/time', (req, res) => {
    res.json({ time: req.time})
})

// Create GET /divide?a=10&b=2 → { "result": 5 } If b=0, respond with status 400 and { "error": "Cannot divide by zero" }.

app.get('/divide', (req, res) => {
    const {a, b} = req.query
    if (Number(b) === 0) {
        return res.status(400).json({ error: 'Cannot divide by zero' })
    }
    const result = Number(a) / Number(b)
    res.json({ result: result })
})

