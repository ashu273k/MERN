// Create /products router:

// GET /products/:id → { "productId": "<id>" }

const express = require('express')
const router = express.Router()

router.get('/products/:id', (req, res) => {
    res.json({ productId: req.params.id })
})

module.exports = router

// src app.js
const app = express()
app.use(express.json())
const productRoutes = requires('../routes/productRouter.js')

app.use('/api', productRoutes)

module.exports = app

// Implement /users:

// GET /users → returns all users array.
// GET /users/:id → returns one user. Use dummy array [ {id:1,name:"A"}, {id:2,name:"B"} ].

// src/user.js
const users = [
    { id: 1, name: 'A' },
    { id: 2, name: 'B' }
]

app.get('/users', (req, res) => {
    res.json(users)
})

app.get('/users/:id', (req, res) => {
    const user = users.find( u => u.id === parseInt(req.params.id) )
    if (!user) {
        return res.status(404).json({ message: 'User not found'})
    }
    res.json(user)
})
