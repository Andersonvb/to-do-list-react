import React from "react";
import Task from "./Task";
import "../stylesheets/TaskList.css";

function TaskList({ tasks, toggleComplete, removeTask }) {
  return (
    <ul className="task-list">
      <li className="task-list__li">
        {tasks.map((task) => {
          return (
            <Task
              key={task.id}
              task={task}
              toggleComplete={toggleComplete}
              removeTask={removeTask}
            />
          );
        })}
      </li>
    </ul>
  );
}

export default TaskList;
