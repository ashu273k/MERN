// Extend /todos/:id (PUT) to update the title.


// src/todoUpdate.js
const express = require("express");
const app = express();
app.use(express.json());

let todos = [{ id: 1, title: "Old" }];

// Your code here
app.put('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id))
    todo.title = req.body.title
    res.json(todo)
})
module.exports = app;

// DELETE /todos/:id → remove from array and return remaining.

app.delete('/todos/:id', (req, res) => {
    todos = todos.filter(t => t.id !== parseInt(req.params.id))
    res.json(todos)
})