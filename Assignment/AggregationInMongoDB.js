// Salary Processing & Ranking — Node.js + MongoDB
// You're building a backend module for a company's internal accounting system. Each employee belongs to a department, and their monthly salary is stored.

// You are required to implement two endpoints:

// Endpoint 1: GET /salary/summary
// Returns total monthly salary paid per department.

// Sample Output:

// [
//   { "department": "Engineering", "totalSalary": 350000 },
//   { "department": "HR", "totalSalary": 80000 }
// ]
// `

// Endpoint 2: GET /salary/top3
// Returns top 3 highest salaries per department, sorted descending by salary.

// Sample Output:

// [
//   {
//     "department": "Engineering",
//     "topSalaries": [
//       { "name": "Alice", "salary": 120000 },
//       { "name": "Bob", "salary": 110000 },
//       { "name": "Eve", "salary": 100000 }
//     ]
//   },
//   {
//     "department": "HR",
//     "topSalaries": [
//       { "name": "Charlie", "salary": 40000 },
//       { "name": "Dana", "salary": 30000 }
//     ]
//   }
// ]
// MongoDB Collection: employees
// {
//   "_id": "emp1",
//   "name": "Alice",
//   "department": "Engineering",
//   "salary": 120000
// }

const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/myApp");

const employeeSchema = new mongoose.Schema({
  name: String,
  department: String,
  salary: Number,
});

const Employee = mongoose.model("Employee", employeeSchema);

// TODO: GET /salary/summary
app.get("/salary/summary", async (req, res) => {
  // Implement aggregation to return totalSalary per department
  const summary = await Employee.aggregate([
    { $group: {
      _id: '$department', totalSalary: { $sum: '$salary' }
    }},
    { $project: { _id: 0, department: '$_id', totalSalary: 1 } }
  ])
  res.json(summary)
});

// TODO: GET /salary/top3
app.get("/salary/top3", async (req, res) => {
  // Implement aggregation to return top 3 highest salaries per department
  const top3 = await Employee.aggregate([
    { $sort: { department: 1, salary: -1} },
    { $group: {
      _id: '$department',
      topSalaries: {$push: { name: '$name', salary: '$salary' }}
    }},
    { $project: { _id: 0, department: '$_id', topSalaries: { $slice: ['$topSalaries', 3]}}}
  ])
  res.json(top3)
});

module.exports = { app, Employee };
