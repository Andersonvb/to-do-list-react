import React, { useEffect, useState } from "react";
import Task from "./components/Task.jsx";
import AddTask from "./components/AddTask.jsx";

function App() {
  const [taskComponents, setTaskComponents] = useState([]);
  const [idDeleteItem, setIdDeleteItem] = useState(0);
  const [deletingItem, setDeletingItem] = useState(false);
  const [pendingTask, setPendingTask] = useState(0);
  const [taskCounter, setTaskCounter] = useState(1);

  /*
  {
    id: 0,
    value: "Task",
    checked: false
  }
  */

  // Get the task from the input
  const getInputData = (value) => {
    if (sessionStorage.getItem("taskList") === null) {
      sessionStorage.setItem("taskList", JSON.stringify([]));
    }

    const tempArray = JSON.parse(sessionStorage.getItem("taskList"));

    const id = taskCounter;
    const tempTask = {
      id: id,
      value: value,
      checked: false,
    };

    tempArray.push(tempTask);
    setTaskCounter((prev) => prev + 1);

    sessionStorage.setItem("taskList", JSON.stringify(tempArray));

    increaseCount();
    renderTasks();
  };

  // Render tasks on screen
  const renderTasks = () => {
    const taskComponentsList = [];
    const sessionArray = JSON.parse(sessionStorage.getItem("taskList"));
    for (let i = 0; i < sessionArray.length; i++) {
      taskComponentsList.push(
        <Task
          value={sessionArray[i].value}
          deleteFunc={deleteTaskRequest}
          checkInput={setCheckInputToTrue}
          noCheckInput={setCheckInputToFalse}
          idValue={sessionArray[i].id}
          key={sessionArray[i].id}
          isChecked={sessionArray[i].checked}
        />
      );
    }
    setTaskComponents(taskComponentsList);
  };

  const setCheckInputToTrue = (id) => {
    const tempArray = JSON.parse(sessionStorage.getItem("taskList"));
    tempArray.forEach((element) => {
      if (element.id === id) {
        element.checked = true;
      }
    });
    sessionStorage.setItem("taskList", JSON.stringify(tempArray));
    console.log(sessionStorage.getItem("taskList"));
    decreaseCount();
  };

  const setCheckInputToFalse = (id) => {
    const tempArray = JSON.parse(sessionStorage.getItem("taskList"));
    tempArray.forEach((element) => {
      if (element.id === id) {
        element.checked = false;
      }
    });
    sessionStorage.setItem("taskList", JSON.stringify(tempArray));
    console.log(sessionStorage.getItem("taskList"));
    increaseCount();
  };

  const increaseCount = () => {
    setPendingTask((prev) => prev + 1);
  };

  const decreaseCount = () => {
    setPendingTask((prev) => prev - 1);
  };

  const deleteTaskRequest = (id) => {
    setIdDeleteItem(id);
  };

  const deleteTask = (id) => {
    const sessionArray = JSON.parse(sessionStorage.getItem("taskList"));

    sessionArray.forEach((element) => {
      if (element.id === id) {
        if (!element.checked) {
          decreaseCount();
        }
      }
    });

    const newSessionArray = sessionArray.filter((element) => {
      return element.id !== id;
    });

    for (let i = 0; i < newSessionArray.length; i++) {
      newSessionArray[i].id = i + 1;
    }

    sessionStorage.setItem("taskList", JSON.stringify(newSessionArray));
    setIdDeleteItem(0);

    renderTasks();
    //setIdDeleteItem(0);
    //setDeletingItem(true);
    //setTaskComponents(newTaskComponentsList);
  };

  const updateSessionVariable = () => {
    sessionStorage.setItem("taskList", JSON.stringify([]));
    const tempArray = taskComponents.map((element) => {
      return element.props.value;
    });
    sessionStorage.setItem("taskList", JSON.stringify(tempArray));
    setDeletingItem(false);
    renderTasks();
  };

  const handleClearAllClick = () => {
    sessionStorage.setItem("taskList", JSON.stringify([]));
    setTaskComponents([]);
    setPendingTask(0);
    renderTasks();
  };

  // UseEffect

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
