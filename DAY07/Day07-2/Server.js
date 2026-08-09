//issue: 1. DNS server not working properly
const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);
const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();
const jwt = require("jsonwebtoken");

const { UserModel, TodoModel } = require("./utlis/db");

mongoose.connect(process.env.DB_URL);

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;

  const feedBack = await UserModel.create({
    username,
    email,
    password,
  });

  res.json({
    msg: "User resgistered successfully",
    feedBack,
  });
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const response = await UserModel.findOne({
    email,
    password,
  });
  if (response) {
    const token = jwt.sign({ email: response.email }, process.env.JWT_SECRET);

    res.json({
      msg: "You'r login sucessfully",
      token: token,
    });
  } else {
    res.json({
      msg: "Invalid credentails",
    });
  }
});

app.get("/users", async (req, res) => {
  const response = await UserModel.find();
  res.json({
    msg: "All users",
    response,
  });
});
app.listen(8080, () => {
  console.log("Server is listening.......");
});
