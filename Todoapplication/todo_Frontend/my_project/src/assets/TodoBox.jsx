import React from "react";

const TodoBox = ({ details }) => {
  return (
    <div className="todo-item">
      <h2>Todo:- {details}</h2>
    </div>
  );
};

export default TodoBox;
