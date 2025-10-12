// Create Comment model { text:String, postId:String, author:String }. POST /comments saves it.
const { timeStamp } = require('console')
const express = require('express')
const app = express()
app.use(express.json())
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true })

const commentSchema = new mongoose.Schema({
    text: { type: String, required: true },
    postId: { type: String, required: true },
    author: { type: String, required: true }
})

const comment = mongoose.model('Comment', commentSchema)

app.post('/comments', async (req, res) => {
    try {
        const { text, postId, author } = req.body
        if (!text || !postId || !author) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        const newComment = new comment({ text, postId, author })
        const saved = await newComment.save()
        res.status(201).json(saved)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
    
})

// Write a Mongoose schema for a BlogPost. The schema should be assigned to a variable named blogPostSchema. It must have the following fields and constraints:

// title: A String, which is required.

// body: A String, also required.

// author: An ObjectId that references the User model. This field is also required.

// likes: A Number, which should default to 0.

// status: A String that can only be one of three values: 'draft', 'published', or 'archived'. The default value should be 'draft'.

// The schema should automatically add createdAt and updatedAt timestamps.

const blogPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    likes: { type: Number, default: 0 },
    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
}, { timestamps: true })    

const BlogPost = mongoose.model('BlogPost', blogPostSchema)

module.exports = { app, BlogPost };