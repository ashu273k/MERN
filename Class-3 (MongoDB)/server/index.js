const express = require("express");

const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// MongoDB is connected with mongoose which in turn connected to our backend
mongoose
  .connect(
    "mongodb+srv://ashu273k:iVigsXwXPniiQJlL@cluster0.zjyiqyv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Db connected");
  })
  .catch((err) => {
    console.log(err);
  });

// Course Schema

let courseSchema = new mongoose.Schema({
    course_name: {
        type: String,
        required: true
    },
    instructor: {
        type: String,
        required: true
    },

    ratings: {
        type: Number,

    },

    isLive: {
        type: Boolean,
        required: true
    }
})

// It is like creating class that will follow our schema it will have those field 
const CourseModel = mongoose.model('courses', courseSchema)

// Reading 
app.get("/", (req, res) => {
  res.send("Message from the Server");
});

// Creating object in the Database
app.post('/courses', async(req, res) => {
    let course = await CourseModel.create({
        course_name: req.body.course_name,
        instructor: req.body.instructor,
        ratings: req.body.ratings,
        isLive: req.body.isLive 
    })

    res.send(course)
})

// listening from server
app.listen(8081, () => {
  console.log("Server started");
});
