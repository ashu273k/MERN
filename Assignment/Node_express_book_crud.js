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
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

/** Do not change the connection string below */
mongoose.connect("mongodb://localhost:27017/myApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
/** connection ends */

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  year: Number,
});

const Book = mongoose.model("Book", bookSchema);

// ✅ Middleware for authentication
function authenticate(req, res, next) {
  const apiKey = req.headers["authorization"];

  if (!apiKey || apiKey !== "mysecretkey") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
}

// ✅ Apply middleware to all book routes
app.use("/books", authenticate);

// ========================================================================================
// 📚 GET /books — Fetch all books
// ========================================================================================
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(200).json(books);
  } catch (err) {
    return res.status(400).json({ message: "Error fetching books" });
  }
});

// ========================================================================================
// ➕ POST /books — Add a new book
// ========================================================================================
app.post("/books", async (req, res) => {
  try {
    const { title, author, year } = req.body;
    const newBook = new Book({ title, author, year });
    await newBook.save();

    return res.status(201).json(newBook); // ✅ MUST BE 201
  } catch (err) {
    return res.status(400).json({ message: "Error adding book" });
  }
});

// ========================================================================================
// 🔍 GET /books/:id — Fetch one book by ID
// ========================================================================================
app.get("/books/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json(book);
  } catch (err) {
    return res.status(400).json({ message: "Invalid ID format" });
  }
});

// ========================================================================================
// ✏️ PUT /books/:id — Update a book
// ========================================================================================
app.put("/books/:id", async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json(updatedBook);
  } catch (err) {
    return res.status(400).json({ message: "Error updating book" });
  }
});

// ========================================================================================
// 🗑 DELETE /books/:id — Delete a book
// ========================================================================================
app.delete("/books/:id", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    return res.status(400).json({ message: "Error deleting book" });
  }
});

module.exports = { app, Book };
