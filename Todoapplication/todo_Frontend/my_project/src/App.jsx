import { useState } from "react";

import "./App.css";
import TodoBox from "./assets/TodoBox";
import Signup from "./Components/Signup";
import Signin from "./Components/Signin";
import Profile from "./Profile";

function App() {
  const [input, setInput] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [view, setView] = useState(token ? "loggedIn" : "signup");

  function handleLoginSuccess(newToken) {
    setToken(newToken);
    localStorage.setItem("token", newToken);
    setView("loggedIn");
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setToken("");
    setView("signin");
  }

  function submitFun() {
    if (!token) {
      alert("Please login first to add todo.");
      return;
    }

    if (!input.trim()) {
      alert("Todo cannot be empty.");
      return;
    }

    setTodoList((prev) => [...prev, input.trim()]);
    setInput("");
  }

  if (!token) {
    return (
      <div>
        {view === "signup" ? (
          <div>
            <Signup onSignupSuccess={() => setView("signin")} />
            <button onClick={() => setView("signin")}>
              Already have an account? Sign in
            </button>
          </div>
        ) : (
          <div>
            <Signin onLoginSuccess={handleLoginSuccess} />
            <button onClick={() => setView("signup")}>
              Create new account
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>

      <Profile token={token} />

      <h1>Todo Application</h1>
      <input
        type="text"
        placeholder="Enter Todo value"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={submitFun}>Add Todo</button>

      {todoList.map((todo, index) => (
        <TodoBox details={todo} key={index} />
      ))}
    </div>
  );
}

export default App;
