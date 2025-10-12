// Create a route:

// POST /greet that accepts a JSON body { "name": "Alice" } and returns { "message": "Hello Alice!" }.

const express = require('express')
const app = express()
app.use(express.json())

app.get('/greet', (req, res) => {
    const { name } = req.body
    if (!name) {
        return res.status(400).json({ message: 'Name is required' })
    }
    res.json({ message: `Hello ${name}!` })
})