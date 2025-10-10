/*
 * You are tasked with creating a basic Express.js application. The application should perform the following operations:

1. Connect to a MongoDB database using the Mongoose ORM.
2. Define a Mongoose model for a Product with fields for name, brand, price, and specs.
3. Define two routes: a GET route at the path "/products" and a POST route at the path "/products".
4. The GET route should retrieve all products from the MongoDB database and respond with the result.
5. The POST route should accept JSON data in the format { "name": "Smartphone", "brand": "XYZ", "price": 699, "specs": { "display": "6.5 inches", "storage": "128GB", "camera": "Quad-camera setup" } }, create a new product in the MongoDB database, and respond with the created product.
6. Use async/await syntax for handling asynchronous operations.

Setup dependencies and middleware by importing necessary libraries (express, mongoose) and configuring Express to use middleware for JSON parsing.
Implement routes by creating a GET route at "/products" to fetch all products from the database using Product.find() and return them in JSON format, and a POST route at "/products" to accept data in JSON format, create a new Product instance, save it to the database, and return the created product. Add error handling by including try-catch blocks in your async functions to handle and respond to errors appropriately. Set status to 200 in try block and 400 in catch block while sending response.
Write your code in src/api.js
 */

const express = require('express')
const app = express()
const mongoose = require('mongoose')

// We are using this so that we can get data in JSON format or use it
app.use(express.json())

// MongoDB connected to mongoose (it is ORM) which in turn connect with our backend
mongoose
    .connect("mongodb://localhost:27017/myApp", {
      newUrlParser: true,
      newUnifiedTopology: true
    })
    .then (() => {
      console.log('Connected to database')
    })
    .catch((err) => {
      console.log(err)
    })

    // Schema is created
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  brand: {
    type: String,
  },
  price: {
    type: Number,
    min: 0
  },
  specs: {
    type: Object
  }
})

// Object that follows our schema so it like creating object that we can add to our database it will have
// fields that are given in our schema
const product = mongoose.model('product', productSchema)

// Getting products from the database
app.get('/products',async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products)
  } catch(err) {
    res.status(500).send(err)
  }
})

// Putting product into our database

app.post('/products',async (req, res) => {
  try {
    const product = new Product(req.body)
    const savedProduct = await product.save()
    res.status(201).json(savedProduct)
  } catch (err) {
    res.status(400).send(err)
  }
})

module.exports = app