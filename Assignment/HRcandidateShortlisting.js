// HR Candidate Shortlisting System
// You are helping an HR team build an API to filter candidates based on selection criteria like required skills and minimum experience.

// Your Task:
// Implement an API endpoint that receives a list of candidates and returns only those who match:

// A minimum number of years of experience
// A set of required skills
// Endpoint:
// POST /hr/shortlist
// Input Example:

// {
//   "minExperience": 2,
//   "requiredSkills": ["JavaScript", "React"],
//   "candidates": [
//     {
//       "name": "Alice",
//       "experience": 3,
//       "skills": ["JavaScript", "React", "Node.js"]
//     },
//     {
//       "name": "Bob",
//       "experience": 1,
//       "skills": ["JavaScript", "Vue"]
//     },
//     {
//       "name": "Charlie",
//       "experience": 5,
//       "skills": ["Java", "Spring"]
//     }
//   ]
// }
// `

// Response:

// {
//   "shortlisted": [
//     {
//       "name": "Alice",
//       "experience": 3,
//       "skills": ["JavaScript", "React", "Node.js"]
//     }
//   ]
// }
// Constraints:
// Candidates must have all required skills.
// Matching is case-sensitive.
// No database needed — process everything in-memory.
// Note: Write Your Code in src/api.js

const express = require("express");
const app = express();
app.use(express.json());

app.post("/hr/shortlist", (req, res) => {
  const { minExperience, requiredSkills, candidates } = req.body;

  if (!Array.isArray(candidates) || !Array.isArray(requiredSkills)) {
    return res.status(400).json({ message: "Invalid input" });
  }

  const shortlisted = candidates.filter(c => {
    if (c.experience < minExperience) return false;
    return requiredSkills.every(skill => c.skills.includes(skill));
  });

  res.json({ shortlisted });
});

module.exports = app;
