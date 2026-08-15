import { useEffect, useState } from "react";
import axios from "axios";
import Todobox from "./Todobox";

const Body = () => {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const getTodos = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get("http://localhost:8080/todo", {
        headers: {
          token,
          Authorization: `Bearer ${token}`,
        },
      });

      setTodos(response?.data?.data || []);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.msg || "Please login again");
    }
  };

  const resetForm = () => {
    setTitle("");
    setEditingId(null);
  };

  const handleSaveTodo = async () => {
    const token = localStorage.getItem("token");
    if (!title.trim()) return;

    try {
      if (editingId) {
        await axios.put(
          "http://localhost:8080/todo",
          {
            id: editingId,
            title,
            description: "Todo updated from frontend",
            isDone: false,
          },
          {
            headers: {
              token,
              Authorization: `Bearer ${token}`,
            },
          },
        );
      } else {
        await axios.post(
          "http://localhost:8080/todo",
          {
            title,
            description: "Todo added from frontend",
            isDone: false,
          },
          {
            headers: {
              token,
              Authorization: `Bearer ${token}`,
            },
          },
        );
      }

      resetForm();
      getTodos();
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.msg ||
          (editingId ? "Unable to update todo" : "Unable to add todo"),
      );
    }
  };

  const handleDeleteTodo = async (id) => {
    const confirmed = window.confirm("Do you want to delete this todo?");
    if (!confirmed) return;

    const token = localStorage.getItem("token");

    try {
      const response = await axios.delete("http://localhost:8080/todo", {
        params: { id },
        headers: {
          token,
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Delete response:", response.data);
      getTodos();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.msg || "Unable to delete todo");
    }
  };

  const handleEditTodo = (todo) => {
    setEditingId(todo._id);
    setTitle(todo.title);
  };

  const handleToggleTodo = async (todo) => {
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        "http://localhost:8080/todo",
        {
          id: todo._id,
          title: todo.title,
          description: todo.description || "Todo updated from frontend",
          isDone: !todo.isDone,
        },
        {
          headers: {
            token,
            Authorization: `Bearer ${token}`,
          },
        },
      );

      getTodos();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.msg || "Unable to update todo status");
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="Enter todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleSaveTodo}>{editingId ? "Update" : "Add"}</button>
      {editingId && <button onClick={resetForm}>Cancel</button>}

      <Todobox
        todos={todos}
        onDelete={handleDeleteTodo}
        onEdit={handleEditTodo}
        onToggle={handleToggleTodo}
      />
    </div>
  );
};

export default Body;
