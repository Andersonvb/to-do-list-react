import React, { useEffect, useState, useRef } from "react";
import "../stylesheets/TaskForm.css";

const SESSION_STORAGE_ID_KEY = "id";

function TaskForm({ addTask }) {
  const isFirstRender = useRef(true);

  const [task, setTask] = useState({
    id: 0,
    value: "",
    completed: false,
  });

  useEffect(() => {
    const storageId = JSON.parse(
      sessionStorage.getItem(SESSION_STORAGE_ID_KEY)
    );
    if (storageId) {
      setTask({
        ...task,
        id: JSON.parse(sessionStorage.getItem(SESSION_STORAGE_ID_KEY)),
      });
    }
  }, []);

  useEffect(() => {
    if (!isFirstRender.current) {
      sessionStorage.setItem(SESSION_STORAGE_ID_KEY, task.id);
    } else {
      isFirstRender.current = false;
    }
  }, [task]);

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
