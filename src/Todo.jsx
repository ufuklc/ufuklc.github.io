import React from "react";
import { useState } from "react";
import "./App.css";

export const Todo = ({ task, onDelete, onUpdate }) => {
  const [toggleEdit, setToggleEdit] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [desc, setDesc] = useState(task.desc);
  const handleNewTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleNewDesc = (event) => {
    setDesc(event.target.value);
  };
  const handleDelete = () => {
    onDelete(task.id);
  };
  const handleUpdate = () => {
    setToggleEdit(!toggleEdit);
    onUpdate(task.id, title, desc, task.date);
  };

  return (
    <div>
      {toggleEdit === true ? (
        <div className="updateDiv">
          <h3 className="title">Başlık</h3>
          <input type="text" onChange={handleNewTitle} value={title} />
          <p className="desc">Açıklama</p>
          <textarea rows="4" onChange={handleNewDesc} value={desc}></textarea>
          <p className="createDate">Tarih : {task.date}</p>
          <div className="buttons">
            <button className="edit-button" onClick={handleUpdate}>
              Düzenle
            </button>
          </div>
        </div>
      ) : (
        <div className="todoDiv">
          <h3 className="title">{task.title}</h3>
          <p className="desc">{task.desc}</p>
          <p className="createDate">Tarih : {task.date}</p>
          <div className="buttons">
            <button className="delete-button" onClick={handleDelete}>
              Sil
            </button>
            <button className="edit-button" onClick={handleUpdate}>
              Düzenle
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
