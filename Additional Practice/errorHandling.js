// Add global error middleware that catches thrown async errors and responds { error:"Something broke" }.
const express = require('express')
const app = express()
app.use(express.json())

app.use((err, req, res, next) => {
    res.status(500).json({ message: 'Internal Server error Or something broke'})
})

// Cache GET /data result for 10 seconds using in-memory variable before recomputing.
let cache = null, lastTime = 0;
app.get('/data', (req, res) => {
    const now = Date.now()
    if (cache && (now - lastTime) < 10000) {
        return res.json(cache)
    }
    cache = { time: new Date().toISOString() },
    lastTime = now
    res.json(cache)
})
