const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const Student = require("./Models/Student");

//require("dotenv").config({ path: "../.env" });
require("dotenv").config();

const app = express();

const salt = bcrypt.genSaltSync(10);
const PORT = process.env.PORT;
const secret = process.env.SECRET;
const mongoDBURL = process.env.MONGODB_URL;

app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(cookieParser());

// connect to database

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

//test server

app.get("/test", (req, res) => {
  res.json("Hello World");
});

//register user

app.post("/register", async (req, res) => {
  const { username, password, fullName, email, phone, age } = req.body;
  try {
    const user = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
      fullName,
      email,
      phone,
      age,
    });
    res.json(user);
  } catch (error) {
    res.status(400).json(error);
  }
});

//login user

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const passOk = bcrypt.compareSync(password, user.password);
  if (passOk) {
    //loggedin
    jwt.sign(
      {
        username,
        id: user._id,
      },
      secret,
      {},
      (err, token) => {
        if (err) throw err;
        res
          .cookie("token", token,{
            sameSite: "none",
            secure: true,
          })
          .json({
          id: user._id,
          username,
        });
      }
    );
  } else {
    //not logged in
    res.status(400).json("wrong credentials");
  }
});

//user profile

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("Logged Out");
});

//add student

app.post("/add", async (req, res) => {
  try {
    if (!req.body.name || !req.body.subject || !req.body.marks) {
      return res.status(400).send({
        message: "Send all required fields: name, subject, marks",
      });
    }

    const { name, subject, marks } = req.body;
    const existingStudent = await Student.findOne({ name, subject });

    if (existingStudent) {
      await Student.updateOne({ name, subject }, { marks });
      return res.status(200).send({ message: "Student updated" });
    } else {
      const newStudent = { name, subject, marks };
      const student = await Student.create(newStudent);
      return res.status(201).send(student);
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
});

//get students

app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();

    return res.status(200).json({
      count: students.length,
      data: students,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
});

//delete student

app.delete("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Student.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Student not found" });
    }
    return res.status(200).json({
      message: "Student deleted successfully",
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
});

//update student

app.put("/students/:id", async (req, res) => {
  try {
    if (!req.body.name || !req.body.subject || !req.body.marks) {
      return res.status(400).send({
        message: "Send all required fields: name, subject, marks",
      });
    }

    const { id } = req.params;

    const result = await Student.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.status(200).json({
      message: "Student updated successfully",
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
});

//get single student
app.get("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id);

    return res.status(200).json(student);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
});

