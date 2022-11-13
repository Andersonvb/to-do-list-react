import React, { useEffect, useState } from "react";
import Task from "./components/Task.jsx";
import AddTask from "./components/AddTask.jsx";

function App() {
  const [taskComponents, setTaskComponents] = useState([]);
  const [idDeleteItem, setIdDeleteItem] = useState(0);
  const [deletingItem, setDeletingItem] = useState(false);
  const [pendingTask, setPendingTask] = useState(0);

  const updateSessionVariable = () => {
    sessionStorage.setItem("taskList", JSON.stringify([]));
    const tempArray = taskComponents.map((element) => {
      return element.props.value;
    });
    sessionStorage.setItem("taskList", JSON.stringify(tempArray));
    setDeletingItem(false);
    renderTasks();
  };

  const deleteTask = (idValue) => {
    const taskComponentsList = taskComponents;
    const newTaskComponentsList = taskComponentsList.filter((element) => {
      return element.props.idValue !== idValue;
    });

    decreaseCount();
    setIdDeleteItem(0);
    setDeletingItem(true);
    setTaskComponents(newTaskComponentsList);
  };

  const increaseCount = () => {
    setPendingTask((prev) => prev + 1);
  };

  const decreaseCount = () => {
    if (pendingTask > 0) {
      setPendingTask((prev) => prev - 1);
    }
  };

  const deleteTaskRequest = (idValue) => {
    setIdDeleteItem(idValue);
  };

  const renderTasks = () => {
    const taskComponentsList = [];
    const sessionArray = JSON.parse(sessionStorage.getItem("taskList"));
    for (let i = 0; i < sessionArray.length; i++) {
      taskComponentsList.push(
        <Task
          value={sessionArray[i]}
          deleteFunc={deleteTaskRequest}
          increaseCountFunc={increaseCount}
          decreaseCountFunc={decreaseCount}
          idValue={i + 1}
          key={i + 1}
        />
      );
    }
    setTaskComponents(taskComponentsList);
  };

  const getInputData = (value) => {
    if (sessionStorage.getItem("taskList") === null) {
      sessionStorage.setItem("taskList", JSON.stringify([]));
    }
    const tempArray = JSON.parse(sessionStorage.getItem("taskList"));
    tempArray.push(value);
    sessionStorage.setItem("taskList", JSON.stringify(tempArray));
    increaseCount();
    renderTasks();
  };

  const handleClearAllClick = () => {
    sessionStorage.setItem("taskList", JSON.stringify([]));
    setTaskComponents([]);
    setPendingTask(0);
    renderTasks();
  };

  useEffect(() => {
    if (deletingItem) {
      updateSessionVariable();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskComponents]);

  useEffect(() => {
    if (idDeleteItem !== 0) {
      deleteTask(idDeleteItem);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idDeleteItem]);

  useEffect(() => {
    if (sessionStorage.getItem("taskList") !== null) {
      renderTasks();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="w-screen flex justify-center p-5 font-roboto ">
      <div className="flex flex-col gap-5 lg:w-3/5">
        <div className="flex">
          <h1 className="font-bold text-6xl">To Do List</h1>
        </div>
        <AddTask childToParentFunc={getInputData} />
        <div className="flex flex-col gap-5">{taskComponents}</div>
        <div className="flex justify-between items-center">
          <label className="text-lg">
            You have {pendingTask} pending tasks
          </label>
          <button
            onClick={handleClearAllClick}
            className="w-2/6 md:w-2/6 lg:w-1/6 h-12 px-5 text-white font-light bg-sky-600 rounded-lg"
          >
            Clear All
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
