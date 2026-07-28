const express = require("express");

const app = express();

let todoArr = ["go to university"];

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

// extract json from body and parse in original js object
app.use(express.json());

app.get("/todo", (req, resp) => {
  resp.json({
    data: todoArr,
  });
});

app.post("/todo", (req, resp) => {
  const { data } = req.body;
  // console.log(req.body);

  todoArr.push(data);
  console.log(todoArr);

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
