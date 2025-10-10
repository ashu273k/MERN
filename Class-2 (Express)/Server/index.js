const express = require("express");

const app = express();
app.use(express.json())


const courses = [
  {course_id: 1, name:'Java', instructor: 'Ashu'},
  {course_id: 2, name: 'JavaScript', instructor: 'Raam'},
  {course_id: 3, name: 'DBMS', instructor: 'Soumayjit'}

];

app.get('/', (req, res) => {
  // All the courses
  res.send('Welcome to my server ')
})
// Read
// To get All courses

app.get('/courses', (req, res) => {
  res.status(200).send(courses)
})
// to get a single course based on name or id
app.get('/courses/:id', (req, res) => {
  // All the courses
  console.log(req.params)
  let course = courses.find((course) => course.course_id === parseInt(req.params.id))

  if (!course) {
    res.status(404).send('Course does not exist')
  }
  res.status(201).send(course)
});


// Create
app.post('/courses', (req, res) => {
      let course = {
        course_id: req.body.course_id,
        name: req.body.name,
        instructor: req.body.instructor
      }
      courses.push(course)

      res.status(201).send('Course created')
})


// Update
app.put('/courses/:id', (req, res) => {
  let course = courses.find((course) => course.course_id === parseInt(req.params.id));

  if (!course) {
    res.status(404).send('Course does not exist')
  }

  course.instructor = res.body.instructor
  res.status(200).send(course)
})

// Delete
// app.delete()

app.listen(8080, () => {
  console.log("Server started at port 8080 ");
});
