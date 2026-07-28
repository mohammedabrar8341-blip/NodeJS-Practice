const fs = require("fs");
const path = require("path");
const { program } = require("commander");
const { json } = require("stream/consumers");
// CRUD
const filePath = path.join(__dirname, "todo.json");

// Read
const printTodo = () => {
  const data = fs.readFileSync(filePath, "utf8");
  console.log(data);
};
// Create
const addTodo = (new_todo) => {
  const data = fs.readFileSync(filePath, "utf-8");
  const todoArr = JSON.parse(data);

  todoArr.push(new_todo);

  fs.writeFileSync(filePath, JSON.stringify(todoArr), "utf-8");
  console.log("Todo add succesfully", new_todo);
};
// printTodo()
// addTodo()
// printTodo()

// Update
const updateTodo = (existing_todo, new_todo) => {
  const data = fs.readFileSync(filePath, "utf-8");
  const todoArr = JSON.parse(data);

  let deletedElementIndex = 0;

  const filterTodo = todoArr.filter((todo, index) => {
    if (todo.toLowerCase() == existing_todo.toLowerCase()) {
      return false;
    } else {
      return true;
    }
  });
  filterTodo.splice(deletedElementIndex, 0, new_todo);
  fs.writeFileSync(filePath, JSON.stringify(filterTodo), "utf-8");
  console.log("Todo update from ", existing_todo, "to", new_todo);
};

//Deleted

const deleteTodo = (todo_value) => {
  const data = fs.readFileSync(filePath, "utf8");
  const todoArr = JSON.parse(data);

  const filteredTodo = todoArr.filter((todo) => {
    if (todo.toLowerCase() == todo_value.toLowerCase()) {
      return false;
    } else {
      return true;
    }
  });

  fs.writeFileSync(filePath, JSON.stringify(filteredTodo), "utf8");
  console.log("Todo Deleted Successfully", todo_value);
};

program
  .name("TodoCLI")
  .description("CLI based persistent todo applicatioin")
  .version("1.0.0");

program
  .command("print")
  .description("Print all todos from the Todo list")
  .action(() => {
    printTodo();
  });

program
  .command("add")
  .description("Add new todo to the todo List")
  .argument("<new_todo>", "argument to get new todo value from user")
  .action((new_todo) => {
    addTodo(new_todo);
  });

program
  .command("delete")
  .description("Delete an existing todo from the todo list")
  .argument("<todo_value>", "argument to store delete value from CLI")
  .action((todo_value) => {
    deleteTodo(todo_value);
  });

program
  .command("update")
  .description("update an existing todo from the todo list")
  .argument("<existing_todo>", "add existing todo")
  .argument("<new_todo>", "add new todo")
  .action((existing_todo, new_todo) => {
    updateTodo(existing_todo, new_todo);
  });

program.parse();
