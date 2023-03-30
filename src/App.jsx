import { useState } from "react";
import { TodoList } from "./TodoList";
import { TodoEnter } from "./TodoEnter";
import { useEffect } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const createTask = async (
    title,
    desc,
    date = new Date().toLocaleString("tr-TR")
  ) => {
    if (title && desc !== "") {
      const response = await axios.post("http://localhost:3000/task", {
        title: title,
        desc: desc,
        date: date,
      });
      const createdTasks = [...tasks, response.data];

      setTasks(createdTasks);
      return response;
    }

    alert("Başlık veya açıklama boş olamaz");
  };

  const deleteTaskById = async (id) => {
    await axios.delete(`http://localhost:3000/task/${id}`);
    const afterDeletingTasks = tasks.filter((task) => {
      return task.id !== id;
    });
    setTasks(afterDeletingTasks);
  };

  const updateById = async (id, newTitle, newDesc, date) => {
    await axios.put(`http://localhost:3000/task/${id}`, {
      title: newTitle,
      desc: newDesc,
    });
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { id, title: newTitle, desc: newDesc, date: date };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const fetchTasks = async () => {
    const response = await axios.get("http://localhost:3000/task");
    setTasks(response.data);
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="App">
      <TodoEnter createTask={createTask}></TodoEnter>
      <TodoList
        tasks={tasks}
        onDelete={deleteTaskById}
        onUpdate={updateById}></TodoList>
    </div>
  );
}

export default App;
