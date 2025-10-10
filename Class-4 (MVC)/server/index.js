const express = require('express')
require('dotenv').config()
const {connectDB} = require('./dbConfig')
const productRoutes = require('./routes/productRoutes')

const app = express()
connectDB(process.env.dbURL)

app.get('/', (req, res) => {
    res.send("Sever started")
})

app.listen(8081, () => {
    console.log(`Server started ashu`)
})