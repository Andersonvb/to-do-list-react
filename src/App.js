import React, { useEffect, useState, useRef } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Bottom from "./components/Bottom";
import "./App.css";

const SESSION_STORAGE_KEY = "task-list";

function App() {
  const [tasks, setTasks] = useState([]);
  const [pendingTasks, setPendingTasks] = useState(0);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const storageTasks = JSON.parse(
      sessionStorage.getItem(SESSION_STORAGE_KEY)
    );

    if (storageTasks) {
      setTasks(storageTasks);
    }
  }, []);

  useEffect(() => {
    if (!isFirstRender.current) {
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(tasks));
    } else {
      isFirstRender.current = false;
    }

    calculatePendingTask();
  }, [tasks]);

  function addTask(task) {
    setTasks([...tasks, task]);
  }

  function toggleComplete(id) {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      })
    );
  }

  function removeTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function calculatePendingTask() {
    let pendingTasks = 0;
    tasks.forEach((task) => {
      if (!task.completed) {
        pendingTasks = pendingTasks + 1;
      }
    });
    setPendingTasks(pendingTasks);
  }

  function clearAll() {
    setTasks([]);
  }

  return (
    <main className="main">
      <section className="task-section">
        <Header className="task-header" />
        <TaskForm addTask={addTask} className="task-form" />
        <TaskList
          tasks={tasks}
          toggleComplete={toggleComplete}
          removeTask={removeTask}
          className="task-list"
        />
        <Bottom
          pendingTasks={pendingTasks}
          clearAll={clearAll}
          className="taks-bottom"
        />
      </section>
    </main>
  );
}

export default App;
