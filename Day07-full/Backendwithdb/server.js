const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const { TodoModel, UserModel } = require("./utlis/db");
const authMiddleware = require("./Middleware/Auth");

mongoose.connect(process.env.DATA_URL);

const app = express();
app.use(express.json());
app.use(cors());

app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  const feedback = await UserModel.create({ username, email, password });
  res.status(200).json({
    msg: "User created successfully",
    feedback: feedback,
  });
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  //db call and verify for these email and password
  const response = await UserModel.findOne({
    email,
    password,
  });
  if (response) {
    // token generate
    const token = jwt.sign(
      { id: response._id.toString() },
      process.env.JWT_SECRET,
    );

    res.status(200).json({
      msg: "User logged in successfully",
      token: token,
    });
  } else {
    res.status(401).json({
      msg: "Invalid email or password",
    });
  }
});

app.use(authMiddleware);

app.get("/me", async (req, res) => {
  const userId = req.userId;

  const data = await UserModel.find({ _id: userId });
  res.json({
    msg: "you'r request recieved from me",
    data,
  });
});

///todo.............
app.get("/todo", async (req, res) => {
  const userId = req.userId;

  const data = await TodoModel.find({
    userId,
  });
  res.json({
    msg: "you'r request recieved",
    data,
  });
});

app.post("/todo", async (req, res) => {
  const { title, description, isDone } = req.body;

  const feedback = await TodoModel.create({
    title,
    description,
    isDone,
    userId: req.userId,
  });
  res.json({
    msg: "todo added successfully",
    feedback,
  });
});

app.put("/todo", async (req, res) => {
  try {
    const userId = req.userId;
    const { id, title, description, isDone } = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Valid todo id is required" });
    }

    const feedback = await TodoModel.findOneAndUpdate(
      { _id: id, userId },
      { title, description, isDone, userId },
      { new: true },
    );

    if (!feedback) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    return res.json({
      msg: "todo updated successfully",
      feedback,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error while updating todo" });
  }
});

app.delete("/todo", async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.query;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Valid todo id is required" });
    }

    const feedback = await TodoModel.findOneAndDelete({
      _id: id,
      userId,
    });

    if (!feedback) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    return res.json({
      msg: "todo deleted successfully",
      feedback,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error while deleting todo" });
  }
});
app.listen(8080, () => {
  console.log("Server is listening...........");
});
