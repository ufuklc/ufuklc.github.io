import React from "react";
import { useState } from "react";
import "./App.css";

export const TodoEnter = ({ createTask }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const handleTitle = (title) => {
    setTitle(title.target.value);
  };
  const handleDesc = (desc) => {
    setDesc(desc.target.value);
  };
  const handleSubmit = () => {
    try {
      createTask(title, desc);
      setTitle("");
      setDesc("");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="todoEnterDiv">
      <h1>To-Do List</h1>
      <h2>Başlık</h2>
      <input
        className="title-input"
        id="title"
        type="text"
        value={title}
        onChange={handleTitle}
      />
      <h2>Açıklama</h2>
      <textarea
        id="desc"
        className="desc-input"
        value={desc}
        onChange={handleDesc}
      />

      <button className="add-button" onClick={handleSubmit}>
        Ekle
      </button>
    </div>
  );
};
