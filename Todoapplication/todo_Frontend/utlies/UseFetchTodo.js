import React from "react";
import { useState, useEffect } from "react";

const useFetchTodo = () => {
  const [todoList, setTodoList] = useState([]);

  const fetchTodo = async function () {
    const data = await fetch("http://localhost:8080/todo");
    const json = await data.json();
    setTodoList(json.data);
  };
  useEffect(() => {
    fetchTodo();
  }, []);
  return { todoList, fetchTodo };
};
export default useFetchTodo;
