import React from "react";
import "../stylesheets/Task.css";
import { MdDelete } from "react-icons/md";

function Task({ task, toggleComplete, removeTask }) {
  function handleCheckboxClick() {
    toggleComplete(task.id);
  }

  function handleRemoveClick() {
    removeTask(task.id);
  }

  return (
    <article className="task">
      <input
        id={task.id}
        type="checkbox"
        onClick={handleCheckboxClick}
        className="task__input"
      />
      <label htmlFor={task.id} className="task__label" id={task.id}>
        {task.value}
      </label>
      <MdDelete onClick={handleRemoveClick} className="task__remove" />
    </article>
  );
}

export default Task;
