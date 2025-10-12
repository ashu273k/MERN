// Create /products router:

// GET /products/:id → { "productId": "<id>" }

const express = require('express')
const router = express.Router()

module.exports = router

// src app.js
const app = express()
app.use(express.json())
const productRoutes = requires('../routes/')