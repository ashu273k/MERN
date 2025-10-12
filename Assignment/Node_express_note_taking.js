// Problem Statement
// You're tasked with developing a backend service for a simple note-taking application. The service should allow users to perform CRUD (Create, Read, Update, Delete) operations on notes. Notes should be stored in a MongoDB database, and the backend should be built using Express and middleware for handling request and response data. Below are the requirements:

// Create a Note
// Users should be able to create a new note by sending a POST request to /notes. The request body should contain a JSON object with title and content fields. Validate that both fields are present and not empty.
// Status Codes:
// 201 Created: When a note is successfully created.
// 400 Bad Request: If the title or content is missing.
// Read Notes
// Users should be able to get a list of all notes by sending a GET request to /notes. Each note should include its id, title, and content.
// Status Code:
// 200 OK: When the list of notes is successfully retrieved.
// Update a Note
// Users should be able to update an existing note by sending a PUT request to /notes/:id. The request should include a JSON object with the fields that need to be updated (title and/or content).
// Status Codes:
// 200 OK: When the note is successfully updated.
// 400 Bad Request: If the title or content is missing or invalid.
// 404 Not Found: If the note with the specified id is not found.
// Delete a Note
// Users should be able to delete a note by sending a DELETE request to /notes/:id.
// Status Codes:
// 200 OK: When the note is successfully deleted.
// 404 Not Found: If the note with the specified id is not found.
// Error Handling
// You must implement error-handling middleware to manage cases where the request contains invalid data or references a non-existent note. Return appropriate HTTP response codes.
// Status Codes:
// 400 Bad Request: For validation errors.
// 404 Not Found: When a resource is not found.
// 500 Internal Server Error: For unhandled server errors.
// Possible Approach
// Defining Routes
// Implement routes for each CRUD operation. Ensure proper validation for request bodies and parameters.

// Middleware for Error Handling
// Create middleware to handle and log errors, and send appropriate HTTP response codes to the client.

// MongoDB Integration
// Use Mongoose's methods to perform CRUD operations on the database.

// Write your code in src/api.js

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Initialize Express app
const app = express();
app.use(bodyParser.json());

/** Do not change the connection string below */
mongoose.connect("mongodb://localhost:27017/myApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
/** connection ends */

// Define Note schema and model
const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

const Note = mongoose.model("Note", noteSchema);

// Routes
// TODO: Implement CRUD routes

app.post('/notes', async (req, res, next) => {
  try {
    const {title, content} = req.body
    if (!title || !content) {
      return res.status(400).json({ message: 'Bad Request'})
    }
    const note = new Note({ title, content }) 
    await note.save()
    res.status(201).json(note)

  } catch (error) {
    next(error)
  }
})

app.get('/notes', async(req, res, next) => {
  try {
    const notes = await Note.find()
    if (!notes) {
      return res.status(400).json({ message: 'No notes are found'})
    } 
    res.status(200).json(notes)
  } catch (error) {
    next(error)
  }
})

// PUT /notes
app.put('/notes/:id', async(req, res, next) => {
  try {
    const {title, content} = req.body
    if (!title || !content) {
      return res.status(400).json({ message: 'Bad Request'})
    }
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      {title, content},
      {new: true}
    )
    if (!note) {
      return res.status(404).json({message: 'Not Found'})
    }
    res.status(200).json(note)
  } catch(error) {
    next(error)
  }
})

app.delete('/notes/:id', async(req, res, next) => {
  try {
    const note = await Note.findByIdAndDelete(
      req.params.id
    )
    if (!note) {
      return res.status(404).json({message: 'Not Found'})
    }
    res.status(200).json({messsage: 'OK'})
  } catch(error) {
    next(error)
  }
})

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: err.message });
});

module.exports = { app, Note };