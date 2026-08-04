const express = require("express");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const JWT_SECRET = "I AM ALIVE";

const filePath = path.join(__dirname, "todo.json");
const jsonData = fs.readFileSync(filePath, "utf-8");
let todoArr = JSON.parse(jsonData);

let users = [];
const app = express();

app.use(express.json());
app.use(cors());

const authenticate = (req, res, next) => {
  const token =
    req.headers.token || req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized access. Please login first.",
    });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.transaction = payload;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token/Unauthorized access",
    });
  }
};

function updateTodo(oldTodo, newTodo) {
  let index;
  let filteredArray = todoArr.filter((todo, index) => {
    if (todo === oldTodo) {
      index = index;
      return false;
    } else {
      return true;
    }
  });
  filteredArray.splice(index, 0, newTodo);
  todoArr = filteredArray;
}

app.post("/signup", (req, resp) => {
  const { username, password, email } = req.body;
  const userData = {
    username,
    password,
    email,
  };
  users.push(userData);
  resp.json({
    message: "User signed up successfully",
    data: userData,
  });
});

app.post("/signin", (req, resp) => {
  const { email, password } = req.body;

  let filterUser = users.find((userobj) => {
    return userobj.email === email && userobj.password === password;
  });

  if (!filterUser) {
    return resp.json({
      msg: "Invalid user credentials",
    });
  }

  const token = jwt.sign({ username: filterUser.username }, JWT_SECRET);

  resp.json({
    token,
  });
});

app.get("/todo", authenticate, (req, resp) => {
  const payload = req.transaction;

  const verifiedUser = users.find((userobj) => {
    return userobj.username === payload.username;
  });

  resp.json({
    message: "You're eligible to access data",
    data: verifiedUser,
  });
});

app.post("/todo", authenticate, (req, resp) => {
  const { data } = req.body;

  if (!data) {
    return resp.status(400).json({
      message: "Todo data is required",
    });
  }

  todoArr.push(data);

  resp.json({
    message: "Todo received and added successfully",
    data: todoArr,
  });
});

app.put("/todo", authenticate, (req, resp) => {
  const { oldTodo, newTodo } = req.body;

  updateTodo(oldTodo, newTodo);

  resp.json({
    message: "todo update successfully",
  });
});

app.delete("/todo", authenticate, (req, res) => {
  const { todo } = req.body;
  todoArr = todoArr.filter((elem) => {
    return elem !== todo;
  });

  res.json({
    message: "todo deleted successfully",
  });
});
const PORT = 8080;
app.listen(PORT, () => {
  console.log("Server is running at port", PORT);
});
