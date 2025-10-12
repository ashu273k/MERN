// Serve static files from /public. A file index.html should open on GET /.

// src/staticServer.js
const express = require("express");
const path = require("path");
const app = express();

// Your code here
app.use(express.static(path.join(__dirname, 'public')))
module.exports = app;