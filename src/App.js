import React, { useEffect, useState } from "react";
import Task from "./components/Task.jsx";
import AddTask from "./components/AddTask.jsx";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskComponents, setTaskComponents] = useState([]);

  const renderTasks = () => {
    if (tasks.length === 0) {
      return;
    }

    let taskArray = [];
    for (let i = 0; i < tasks.length; i++) {
      taskArray.push(<Task value={tasks[i]} id={i} key={i} />);
    }

    setTaskComponents(taskArray);
  };

  const getInputData = (data) => {
    if (!data) {
      return;
    }

    if (sessionStorage.getItem("taskList") === null) {
      sessionStorage.setItem("taskList", data);
    } else {
      sessionStorage.setItem(
        "taskList",
        sessionStorage.getItem("taskList") + "," + data
      );
    }

    let listData = sessionStorage.getItem("taskList").split(",");
    setTasks(listData);
  };

  useEffect(() => {
    renderTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks]);

  return (
    <main className="w-screen flex justify-center p-5 ">
      <div className="lg:w-3/5">
        <AddTask childToParentFunc={getInputData} />
        <div>{taskComponents}</div>
      </div>
    </main>
  );
}

export default App;
