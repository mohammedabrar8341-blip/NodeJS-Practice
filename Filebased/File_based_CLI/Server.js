const express = require("express");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "todo.json");
const json = fs.readFileSync(filePath, "utf-8");

const todoArr = JSON.parse(json);

function updateTodo(oldTodo, newTodo) {
  let index;
  let filterArr = todoArr.filter((todo, index) => {
    if (todo == oldTodo) {
      index = index;
      return false;
    } else {
      return true;
    }
  });
  filterArr.splice(index, 0, newTodo);

  fs.writeFileSync(filePath, JSON.stringify(filterArr), "utf-8");
  console.log("filter update successfully");
}

const app = express();
app.use(express.json());

app.get("/todo", (req, res) => {
  console.log("Get request recived at /todo route");

  res.json({
    data: todoArr,
  });
});

app.post("/todo", (req, res) => {
  const { todo } = req.body;
  console.log(todo);

  console.log("POST request recieved on /todo route: data got:: ", todo);

  todoArr.push(todo);

  fs.writeFileSync(filePath, JSON.stringify(todoArr), "utf8");

  console.log("Data Added to file: ", todoArr);

  res.json({
    msg: "todo added successfully",
  });
});

app.put("/todo", (req, res) => {
  const { oldTodo, newTodo } = req.body;
  updateTodo(oldTodo, newTodo);
  res.json({ msg: "old todo updated succesfully" });
});

app.delete("/todo", (req, res) => {
  const { todo } = req.body;

  let filteredArray = todoArr.filter((elem) => {
    if (elem === todo) {
      return false;
    } else {
      return true;
    }
  });

  fs.writeFileSync(filePath, JSON.stringify(filteredArray), "utf-8");

  res.json({ msg: "todo deleted successfully" });
});

app.listen("8080", () => {
  console.log("server is listing at port 8080");
});
