const ProductModel = require("../models/product.js");

const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {

})


router.post('/', async (req, res) => {
    let product = await ProductModel.create({
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        isInStock: req.body.isInStock,
        ratings: req.body.ratings
    })

    res.send(product)
})


router.put('/:id', (req, res) => {

})