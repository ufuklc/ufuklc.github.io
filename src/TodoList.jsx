import React from "react";
import "./App.css";
import { Todo } from "./Todo.jsx";

export const TodoList = ({ tasks, onDelete, onUpdate }) => {
  return (
    <div className="todo-list">
      {tasks.map((task, index) => {
        return (
          <Todo
            key={index}
            task={task}
            onDelete={onDelete}
            onUpdate={onUpdate}></Todo>
        );
      })}
    </div>
  );
};
