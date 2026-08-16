const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const z = require("zod");

const { TodoModel, UserModel } = require("./utlis/db");
const authMiddleware = require("./Middleware/Auth");

mongoose.connect(process.env.DATA_URL);

const app = express();
app.use(express.json());
app.use(cors());

app.post("/signup", async (req, res) => {
  const requiredBodySchema = z.object({
    email: z.string().email().min(5).max(50),
    password: z.string().min(8).max(12),
    username: z.string().min(3).max(15),
  });

  const parsedData = requiredBodySchema.safeParse(req.body);
  if (!parsedData.success) {
    return res.status(400).json({
      msg: "Invalid format",
      error: parsedData.error.flatten(),
    });
  }

  const { username, email, password } = parsedData.data;

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return res.status(409).json({
      msg: "User already exists",
    });
  }

  const hashPassword = await bcrypt.hash(password, 5);

  const feedback = await UserModel.create({
    username,
    email,
    password: hashPassword,
  });

  return res.status(200).json({
    msg: "User created successfully",
    feedback,
  });
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const response = await UserModel.findOne({ email });
  if (!response) {
    return res.status(401).json({
      msg: "Invalid email or password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, response.password);
  if (!isPasswordValid) {
    return res.status(401).json({
      msg: "Invalid email or password",
    });
  }

  const token = jwt.sign(
    { id: response._id.toString() },
    process.env.JWT_SECRET,
  );

  return res.status(200).json({
    msg: "User logged in successfully",
    token,
  });
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
