// Lok Sabha Voting System – REST API
// You are building a basic RESTful API to simulate voting in the Indian Lok Sabha. The system should allow Members of Parliament (MPs) to be added, cast their votes, and retrieve the voting results.

// You’ll use Express.js and in-memory arrays (no database) to store MP details and vote records.

// Functional Requirements
// 1. POST /mp — Add a New MP
// Description: This endpoint should allow adding a new Member of Parliament (MP).

// Request Body:

// {
//   "name": "Rahul Gandhi",
//   "constituency": "Wayanad"
// }
// Validations:

// Both name and constituency are required.

// If either field is missing, return:

// { "message": "Name and constituency are required" }
// with HTTP 400 (Bad Request) status.

// Behavior:

// Each MP should be assigned a unique id automatically (starting from 1, incremented for each new MP).
// The new MP should be stored in an in-memory array called mps.
// Successful Response (201 Created):

// {
//   "id": 1,
//   "name": "Rahul Gandhi",
//   "constituency": "Wayanad"
// }
// 2. POST /vote — Record a Vote
// Description: This route allows an MP to vote on a bill.

// Request Body:

// {
//   "mpId": 1,
//   "vote": "yes"
// }
// Validations:

// Both mpId and vote are required. If missing, return:

// { "message": "mpId and vote are required" }
// with HTTP 400 (Bad Request).

// The vote value must be one of:

// yes | no | abstain
// If it’s anything else, return:

// { "message": "Invalid vote value" }
// with HTTP 400 (Bad Request).

// The given mpId must match an existing MP. If no MP with that id exists, return:

// { "message": "Invalid MP ID" }
// with HTTP 404 (Not Found).

// Each MP can vote only once. If an MP tries to vote again, return:

// { "message": "MP has already voted" }
// with HTTP 409 (Conflict).

// Behavior:

// On a valid vote, record it in an in-memory array called votes.
// Each record should store { mpId, vote }.
// Successful Response (200 OK):

// { "message": "Vote recorded successfully" }
// 3. GET /results — Retrieve Vote Results
// Description: Returns the current tally of votes.

// Response (200 OK):

// {
//   "yes": 5,
//   "no": 2,
//   "abstain": 1
// }
// Behavior:

// Count all votes from the votes array.
// Return the total for each category (yes, no, and abstain).
// MPs who haven’t voted shouldn’t affect the tally.
// Data Structures (In-Memory Arrays)
// You must use two arrays in your code:

// const mps = [];    // Stores MP details (id, name, constituency)
// const votes = [];  // Stores votes ({ mpId, vote })
// Additionally, maintain a simple counter for MP IDs:

// let currentId = 1;
// Error Handling Summary
// | Scenario | HTTP Status | Message | | -------------------------------- | ----------- | ------------------------------------ | | Missing name or constituency | 400 | "Name and constituency are required" | | Missing mpId or vote | 400 | "mpId and vote are required" | | Invalid vote type | 400 | "Invalid vote value" | | Non-existent MP ID | 404 | "Invalid MP ID" | | MP votes more than once | 409 | "MP has already voted" |

// Implementation Rules
// Use Express.js and express.json() middleware.

// Store all logic in memory (no database or external files).

// Implement all routes in the file src/api.js.

// Export the Express app at the end using:

// module.exports = app;
// Do not use external frameworks or ORMs.

// Example Workflow
// Step 1: Add two MPs POST /mp

// { "name": "Rahul Gandhi", "constituency": "Wayanad" }
// Response →

// { "id": 1, "name": "Rahul Gandhi", "constituency": "Wayanad" }
// POST /mp

// { "name": "Amit Shah", "constituency": "Gandhinagar" }
// Response →

// { "id": 2, "name": "Amit Shah", "constituency": "Gandhinagar" }
// Step 2: Cast votes POST /vote

// { "mpId": 1, "vote": "yes" }
// Response →

// { "message": "Vote recorded successfully" }
// POST /vote

// { "mpId": 1, "vote": "no" }
// Response →

// { "message": "MP has already voted" }
// (409 Conflict)

// Step 3: View results GET /results Response →

// { "yes": 1, "no": 0, "abstain": 0 }
// Hints
// Use Array.find() to locate MPs or existing votes.
// Use Array.forEach() or a loop to count votes in /results.
// Remember to respond with the correct HTTP status codes as per the table above.


// ✅ Lok Sabha Voting System API

const express = require('express')
const app = express()
app.use(express.json())

// 🧠 In-memory storage
const mps = []   // Stores MPs { id, name, constituency }
const votes = [] // Stores votes { mpId, vote }
let currentId = 1 // Unique ID counter for MPs


// ========================================================================
// 🏛️ 1. POST /mp — Add a New MP
//========================================================================
app.post('/mp', (req, res) => {
    
    const { name, constituency } = req.body

    // Validation: Both fields required
    if (!name || !constituency) {
        return res.status(400).json({ message: "Name and constituency are required" })
    }

    // Create new MP record
    const newMp = {
        id: currentId++,
        name,
        constituency
    }

    mps.push(newMp) // Store in mps array

    // Return with 201 Created
    return res.status(201).json(newMp)
})

// ============================================================================
// 🗳️ 2. POST /vote — Record a Vote
// ============================================================================

app.post('/vote', (req, res) => {

    const { mpId, vote } = req.body

    // Validation: Both mpId and vote required
    if (mpId === undefined || !vote) {
        return res.status(400).json({ message: "mpId and vote are required" })
    }

    // Validation: vote must be one of 'yes', 'no', or 'abstain'
    const validVotes = ['yes', 'no', 'abstain']
    if (!validVotes.includes(vote)) {
        return res.status(400).json({ messsage: "Invalid vote value" }) 
    }

    // Check if MP exists
    const mp = mps.find((m) => m.id === mpId)

    if (!mp) {
        return res.status(404).json({ message: "Invalid MP ID" })
    }

    // Check if MP already voted
    const existingVote = votes.find((v) => v.mpId === mpId)
    if (existingVote) {
        return res.status(409).json({ message: "MP has already voted" })
    }

    // Record the vote
    votes.push({ mpId, vote })

    return res.status(200).json({ message: "Vote recorded successfully" })
})


// ============================================================================
// 📊 3. GET /results — Retrieve Vote Results
// ============================================================================
app.get('/results', (req, res) => {
    
    let results = { yes: 0, no: 0, abstain: 0 }

    // Count votes
    votes.forEach((v) => {
        if (v.vote === 'yes') results.yes++
        else if (v.vote === 'no') results.no++
        else if (v.vote === 'abstain') results.abstain++
    })

    return res.status(200).json(results)
})