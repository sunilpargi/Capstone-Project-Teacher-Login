const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const Student = require("./Models/Student");

require("dotenv").config();

const app = express();
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

// Connect to database
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database connection error:", err);
  });

// Test server
app.get("/test", (req, res) => {
  res.json("Hello World");
});

// Register user
app.post("/register", async (req, res) => {
  const { username, password, fullName, email, phone, age } = req.body;
  try {
    const user = await User.create({
      username,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
      fullName,
      email,
      phone,
      age,
    });
    res.json(user);
  } catch (error) {
    console.error("Registration error:", error); 
    res.status(400).json(error);
  }
});

// Login user
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("Login attempt for username:", username); 

  try {
    const user = await User.findOne({ username });

    if (!user) {
      console.warn("Login failed: Username not found"); 
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const passOk = bcrypt.compareSync(password, user.password);
    if (passOk) {
      jwt.sign(
        { username, id: user._id },
        secret,
        {},
        (err, token) => {
          if (err) {
            console.error("JWT signing error:", err); 
            return res.status(500).json({ error: "Internal server error" });
          }
          res
            .cookie("token", token, {
              sameSite: "none",
              secure: true,
            })
            .json({ id: user._id, username });
        }
      );
    } else {
      console.warn("Login failed: Incorrect password"); 
      res.status(400).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login error:", error); 
    res.status(500).json({ error: "An error occurred during login" });
  }
});

// User profile
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) {
      console.error("JWT verification error:", err); // Error log
      return res.status(401).json({ error: "Unauthorized" });
    }
    res.json(info);
  });
});

// Logout
app.post("/logout", (req, res) => {
  res.cookie("token", "").json("Logged Out");
});

// Add student
app.post("/add", async (req, res) => {
  try {
    const { name, subject, marks } = req.body;
    if (!name || !subject || !marks) {
      return res.status(400).send({
        message: "Send all required fields: name, subject, marks",
      });
    }

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
    console.error("Error adding student:", err); 
    return res.status(500).send({ message: err.message });
  }
});

// Get students
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    return res.status(200).json(students);
  } catch (err) {
    console.error("Error fetching students:", err); 
    return res.status(500).send({ message: err.message });
  }
});

// Delete student
app.delete("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdAndDelete(id);
    if (!student) {
      console.warn("Delete failed: Student not found"); 
      return res.status(404).send({ message: "Student not found" });
    }
    return res.status(200).json({ message: "Student deleted successfully" });
  } catch (err) {
    console.error("Error deleting student:", err); 
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

