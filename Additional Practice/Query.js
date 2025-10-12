// Problem Statement
// Build an endpoint:

// GET /add?a=3&b=5 → { "sum": 8 }

const express = require('express')
const app = express()

app.use('/add', (req, res) => {
    const a = parseInt(req.query.a)
    const b = parseInt(req.query.b)
    if (isNaN(a) || isNaN(b)) {
        return res.status(400).json({ message: 'Invalid numbers' })

    }
    
    res.json({ sum: a + b })
})

app.use('/add', (req, res) => {
    const { a, b } = req.query
    
    
    res.json({ sum: Number(a) + Number(b) })
})

module.exports = app