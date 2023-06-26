const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const User = require("./models/Users.jsx");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("database connected to server");
});

const salt = bcrypt.genSaltSync(10);

const app = express();
app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));
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
    } else {
      res.status(422).json("Wrong Password");
    }
  }
});

app.post("/logout", (req, res) => {
  alert("Successfully logged out!");
  res.json("logged out");
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  res.json("Profile details");
});

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  imageDownloader
    .image({
      url: link,
      dest: __dirname + "/uploads/" + newName,
    })
    .then(({ filename }) => {
      console.log("Saved to ", filename);
    })
    .catch((e) => {
      console.log("Error at imageDownloader: ", e);
    });
  res.json(newName);
});

const photosUploadMiddleware = multer({ dest: "uploads/" });

app.post("/upload", photosUploadMiddleware.array("photos", 30), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads", ""));
  }
  res.json(uploadedFiles);
});

app.listen(3000, () => {
  console.log("server started at port 3000");
});
