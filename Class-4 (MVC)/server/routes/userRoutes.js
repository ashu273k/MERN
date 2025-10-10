const UserModel = require('../models/user.js')

const express = require('express')
const router = express.Router()

router.get('/user', (req, res) => {

})

router.post('/user', async (req, res) => {

    try {
        const user = new UserModel.create({
            user_name: req.body.user_name,
            email: req.body.email,
            password: req.body.password,
            phone_number: req.body.phone_number
        })

        res.send(user)
    } catch(err) {
        res.status(400).send(err)
    }

})