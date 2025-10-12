// Write a custom Express middleware function called requestLogger. This middleware should log the following to the console for every incoming request:

// The HTTP method (e.g., GET, POST).

// The request URL path (e.g., /api/users).

// The current timestamp (a simple new Date().toISOString() is fine).

// After logging this information, it must pass control to the next function in the chain. Then, show how you would apply this middleware globally to your Express application.

const express = require('express')
const app = express()

app.use(express.json())

// Custom middleware function
const requestLogger = (req, res, next) => {
    const method = req.method
    const path = req.path
    const timestamp = new Date().toISOString()
    // attach data for downstream handlers
    req.requestTime = timestamp
    console.log(`[${timestamp}] ${method} ${path}`)
    next()
}

// Apply middleware globally
app.use(requestLogger)

// Example: mount middleware only for /api routes
// app.use('/api', requestLogger)

// Route-level usage (only this route uses the logger)
app.get('/api/users', (req, res) => {
    // you can access data set by middleware
    res.json({ message: 'User list', requestedAt: req.requestTime })
})

// Using a Router with middleware applied to the router
const router = express.Router()
router.use(requestLogger) // runs for any route in this router
router.get('/items', (req, res) => {
    res.json({ items: [], requestedAt: req.requestTime })
})
app.use('/api', router)

// Example to skip middleware for a path
// app.use((req, res, next) => {
//   if (req.path === '/health') return next()
//   requestLogger(req, res, next)
// })

// Error-handling middleware (4 args) — place after routes
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err)
    res.status(500).json({ message: err.message || 'Internal Server Error' })
})

// Start server for testing (optional)
if (require.main === module) {
    const port = 3000
    app.listen(port, () => console.log(`Server listening on ${port}`))
}

module.exports = app