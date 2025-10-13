// You are tasked with creating a RESTful API for a simple book management system using the Express framework, middleware for authentication, and MongoDB Atlas as the database backend. Your solution should cover the following requirements:

// Routes and Endpoints:

// GET /books: Fetch a list of all books in the database.
// POST /books: Add a new book to the database. The request body should contain a JSON object with fields title, author, and year.
// GET /books/:id: Fetch a single book by its ID.
// PUT /books/:id: Update a book by its ID. The request body can contain any combination of title, author, and year fields.
// DELETE /books/:id: Delete a book by its ID and respond with ("Book deleted successfully") message.
// Middleware:

// Authentication: Implement an authentication middleware that verifies an API key passed in the Authorization header. If the key is invalid or missing, respond with a 401 Unauthorized status. The key can be hardcoded for simplicity (e.g., "mysecretkey").
// Error Handling: Use try-catch block within your route handling to catch and respond to errors with status 400. If the book is not found with the provided ID, respond with a status 404 with message ("Book not found").

// Write your code in src/api.js

const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());

/** Do not change the connection string below */
mongoose.connect("mongodb://localhost:27017/myApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
/** connection ends */

const Book = mongoose.model(
  "Book",
  new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: Number, required: true },
  })
);

const authenticate = (req, res, next) => {
  const apiKey = req.headers.authorization;
  if (apiKey !== "mysecretkey") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

app.get("/books", authenticate, async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/books", authenticate, async (req, res) => {
  try {
    const book = new Book(req.body);
    const newBook = await book.save();
    res.json(newBook);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/books/:id", authenticate, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.put("/books/:id", authenticate, async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(updatedBook);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete("/books/:id", authenticate, async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndRemove(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = { app, Book };
