// POST /register with body { username, password }. If missing any field, respond 400 { error: "All fields required" }.

// src/register.js
const express = require("express");
const app = express();
app.use(express.json());

// Your code here
app.post('/register', (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json({ error: 'All fields requied' })
    }
    res.status(201).json({ username })
})

module.exports = app;

// GET /posts should simulate DB delay using setTimeout (2s) then return array [1,2,3].
// src/posts.js
const express = require("express");

// Your code here
app.get('/posts', async (req, res) => {
    setTimeout(() => {
        return res.json([1, 2, 3])
    }, 2000)
})

module.exports = app;

// POST /todos → expects { title }. Return 201 with { id, title } using incremental id.
let id = 1
app.post('/todos', (req, res) => {
    const { title } = req.body
    if (!title) {
        return res.status(400).json({ error: 'Title is required' })
    }
    res.status(201).json({ id: id++, title })
})