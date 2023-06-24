const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const User = require("./models/Users.jsx");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("database connected to server");
});

const salt = bcrypt.genSaltSync(10);

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json("server page started");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashPassword = bcrypt.hashSync(password, salt);
  try {
    const userDoc = await User.create({
      name,
      email,
      password: hashPassword,
    }).then(() => {
      console.log("Database updated");
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.find({ email });
  if (userDoc) {
    const passOk = bcrypt.compare(password, userDoc[0].password);
    if (passOk) {
      const token = jwt.sign({ id: userDoc[0]._id }, "sadfihahfousaghuo");
      res.cookie("token", token).json(userDoc[0]);
      //   res.json(userDoc);
    } else {
      res.status(422).json("Wrong Password");
    }
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  // console.log(token);
  res.json("Profile details");
  // res.json("token", token);
});

app.listen(3000, () => {
  console.log("server started at port 3000");
});
