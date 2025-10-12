// Two middlewares:

// logger logs method
// auth verifies x-api-key Apply both to /admin.

const express = require('express')
const app = express()

const logger = (req, res, next) => {
    console.log(req.method)
    next()
}

const auth = (req, res, next) => {
    
    if (req.headers['x-api-key'] !== '12345') {
        return res.status(401).json({ error: "Unauthorized" })
    }
    next()
}   

app.get('/admin', logger, auth, (req, res) => {
    res.send('Admin Ok')
})
