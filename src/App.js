import React, { useEffect, useState } from "react";
import Task from "./components/Task.jsx";
import AddTask from "./components/AddTask.jsx";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskComponents, setTaskComponents] = useState([]);

  const renderTasks = () => {
    let taskArray = tasks.map((task) => {
      return <Task value={task} />;
    });
    setTaskComponents(taskArray);
  };

  const getInputData = (data) => {
    if (!data) {
      return;
    }

    sessionStorage.setItem(
      "taskList",
      sessionStorage.getItem("taskList") + data + ","
    );

    let sessionData = sessionStorage.getItem("taskList");
    let listData = sessionData.split(",");
    setTasks(listData);
  };

  useEffect(() => {
    renderTasks();
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
