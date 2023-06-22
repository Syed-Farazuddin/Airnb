const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const User = require("./models/Users.jsx");
const bcrypt = require("bcrypt");

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
app.get("/", (req, res) => {
  res.json("server page started");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashPassword = bcrypt.hashSync(password, salt);
  const userDoc = await User.create({
    name,
    email,
    password: hashPassword,
  }).then(() => {
    console.log("Database updated");
  });
  res.json(userDoc);
});

app.listen(3000, () => {
  console.log("server started at port 3000");
});
