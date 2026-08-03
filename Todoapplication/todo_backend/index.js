const express = require("express");
const fs = require("fs");
const path = require("path");

const jwt = require("jsonwebtoken");

const JWT_SECRET = "I AM ALIVE";

const filePath = path.join(__dirname, "todo.json");
const jsonData = fs.readFileSync(filePath, "utf-8");
const todoArr = JSON.parse(jsonData);

let users = [];
const app = express();
const cros = require("cors");
app.use(express.json());
app.use(cros());


const authenticate = (req, res, next) => {
  const { token } = req.headers;
  const payload = jwt.verify(token, JWT_SECRET);
  if (!payload) {
    return res.json({
      message: "Invalid token/Unauthorized access",
    });
  }
  req.transaction = payload;
  next();
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

app.use(authenticate);
app.get("/todo", (req, resp) => {
  const payload = req.transaction;

  const VerifiedUser = users.find((userobj) => {
    if (userobj.username === payload.username) {
      return true;
    }
  });
  resp.json({
    message: "You'r eligible to access data",
    data: VerifiedUser,
  });
});

app.post("/todo", (req, resp) => {
  const { data } = req.body;
  // console.log(req.body);

  todoArr.push(data);
  // console.log(todoArr);

  resp.json({
    message: "Todo recieved and added successfully",
  });
});

app.put("/todo", (req, resp) => {
  const { oldTodo, newTodo } = req.body;

  updateTodo(oldTodo, newTodo);
  console.log(todoArr);

  resp.json({
    message: "todo update successfully",
  });
});

app.delete("/todo", (req, res) => {
  const { todo } = req.body;
  todoArr = todoArr.filter((elem) => {
    if (elem == todo) {
      return false;
    } else {
      return true;
    }
  });
  res.json({
    message: "todo deleted successfully",
  });
});
const PORT = 8080;
app.listen(PORT, () => {
  console.log("Server is running at port", PORT);
});
