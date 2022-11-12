import React, { useEffect, useState } from "react";
import Task from "./components/Task.jsx";
import AddTask from "./components/AddTask.jsx";

function App() {
  const [taskComponents, setTaskComponents] = useState([]);
  const [idDeleteItem, setIdDeleteItem] = useState(0);

  const updateSessionVariable = () => {
    sessionStorage.setItem("taskList", JSON.stringify([]));
    const tempArray = taskComponents.map((element) => {
      return element.props.value;
    });
    sessionStorage.setItem("taskList", JSON.stringify(tempArray));
  };

  const deleteTask = (idValue) => {
    const taskComponentsList = taskComponents;
    const newTaskComponentsList = taskComponentsList.filter((element) => {
      return element.props.idValue !== idValue;
    });
    setTaskComponents(newTaskComponentsList);
    updateSessionVariable();
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
          idValue={i + 1}
          key={i + 1}
        />
      );
    }
    setTaskComponents(taskComponentsList);
  };

  const getInputData = (value) => {
    const tempArray = JSON.parse(sessionStorage.getItem("taskList"));
    tempArray.push(value);
    sessionStorage.setItem("taskList", JSON.stringify(tempArray));
    renderTasks();
  };

  useEffect(() => {
    deleteTask(idDeleteItem);
  }, [idDeleteItem]);

  useEffect(() => {
    sessionStorage.setItem("taskList", JSON.stringify([]));
  }, []);

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
