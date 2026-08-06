import React from "react";
import { useState, useEffect } from "react";

const useFetchTodo = () => {
  const [todoList, setTodoList] = useState([]);

  const fetchTodo = async function () {
    try {
      const token = localStorage.getItem("token") || "";
      const resp = await fetch("http://localhost:8080/todo", {
        headers: {
          token,
        },
      });

      if (!resp.ok) {
        console.error("Fetch todos failed", resp.status);
        return;
      }

      const json = await resp.json();
      setTodoList(json.data?.todos || []);
    } catch (err) {
      console.error("Error fetching todos", err);
    }
  };
  useEffect(() => {
    fetchTodo();
  }, []);
  return { todoList, fetchTodo };
};
export default useFetchTodo;
