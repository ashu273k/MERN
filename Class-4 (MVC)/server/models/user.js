const mongoose = require('mongoose') 

const UserSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        require: true
    },

    password: {
        type: String,
        required: true
    },

    phone_number: {
        type: Number
    }
})


let UserModel = mongoose.model('products', ProductSchema)  

module.exports = UserModel