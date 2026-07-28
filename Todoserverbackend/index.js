const express = require("express");

const app = express();

let todoArr = ["go to college"];

// extract json from body and parse in original js object
app.use(express.json());

app.get("/todo", (req, resp) => {
  resp.json({
    data: todoArr,
  });
});

app.post("/todo", (req, resp) => {
  const newTodo = req.body.todo;

  todoArr.push(newTodo);

  resp.json({
    message: "Todo recieved and added successfully",
  });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log("Server is running at port", PORT);
});
