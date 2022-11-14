import React, { useState } from "react";
import "../stylesheets/TaskForm.css";

function TaskForm({ addTask }) {
  const [task, setTask] = useState({
    id: 0,
    value: "",
    completed: false,
  });

  function handleChange(e) {
    setTask({ ...task, value: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (task.value) {
      addTask(task);
      // Reset task input and increase id
      setTask({ ...task, id: task.id + 1, value: "" });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={task.value}
        placeholder="New Task"
        onChange={handleChange}
        className="task-input"
      />
      <button type="submit" className="task-btn">
        Add
      </button>
    </form>
  );
}

export default TaskForm;
