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


