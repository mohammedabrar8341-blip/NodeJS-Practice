import { useState } from "react";

import "./App.css";
import useFetchTodo from "../../utlies/UseFetchTodo";
import TodoBox from "./assets/TodoBox";
import Signup from "./Components/Signup";
import Signin from "./Components/Signin";

function App() {
  const [input, setInput] = useState("");

  let { todoList, fetchTodo } = useFetchTodo();

  async function submitFun() {
    const response = await fetch("http://localhost:8080/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: input,
      }),
    });
    setInput("");
    // fetchTodo() or update state here
    fetchTodo(); // Refresh the list and UI
    const data = await response.json();
    console.log(data);
  }
  if (todoList == null) {
    return <div>loading....</div>;
  }
  return (
    <div>
      <h1>Todo Application</h1>
      <input
        type="text"
        placeholder={"Enter Todo value"}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <button
        onClick={() => {
          submitFun();
        }}
      >
        Add Todo
      </button>
      {/* {console.log(todoList)} */}

      {todoList.map((todo, index) => {
        return <TodoBox details={todo} key={index} />;
      })}
      <Signup/>
      <Signin />
    </div>
  );
}

export default App;
