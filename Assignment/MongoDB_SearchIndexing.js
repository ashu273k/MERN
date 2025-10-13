// Search API with Text Indexing (Node.js + MongoDB)
// You are building a backend for a blogging platform. Users can search for articles by entering text queries (like "React performance" or "MongoDB indexing").

// Your job is to implement an API that performs text search on the article collection and returns matching results, sorted by relevance.

// Requirements:
// Create the following route:

// GET /articles/search?q=searchTerm
// It should return all articles that match the q parameter using MongoDB’s $text operator.
// Match should happen against the title and content fields.
// You must add a text index for optimal performance.
// Sort results by MongoDB text score (relevance).
// MongoDB Schema (articles):
// {
//   "_id": "articleId123",
//   "title": "Understanding MongoDB Indexing",
//   "content": "This article explains compound and text indexes...",
//   "author": "Alice"
// }
// `

// Example Input:
// GET /articles/search?q=mongodb indexing

// Example Output:
// [
//   {
//     "title": "Understanding MongoDB Indexing",
//     "content": "This article explains compound and text indexes...",
//     "score": 2.5
//   }
// ]

const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/myApp");

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
});

// TODO: Create text index on title and content
articleSchema.index({ title: 'text', content: 'text' })


const Article = mongoose.model("Article", articleSchema);

// TODO: Implement search route
app.get("/articles/search", async (req, res, next) => {
  // Student will implement
  const { query } = req.query.q

  if ( !query ) return res.status(404).json({ message: 'No query found' })

  try {

    const results = await Article.find(
        { $text: { $search: query }},
        { score: { $meta: 'textScore'}}
    ).sort( { score: { $meta: 'textScore'}})
    res.status(200).json(results)
  } catch (error) {
    next(error)
  }
});

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message })
    next()
})

module.exports = { app, Article };
