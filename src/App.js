import React, { useEffect, useState } from "react";
import Task from "./components/Task.jsx";
import AddTask from "./components/AddTask.jsx";

function App() {
  const [tasks, setTasks] = useState([]);

  const getInputData = (data) => {
    let list = sessionStorage.getItem("taskList");
    console.log(list)
    list.push(data);
    sessionStorage.setItem("taskList", list);
    setTasks(list);
    console.log("List: ", list)
  };

  useEffect(() => {
    let data = sessionStorage.getItem("taskList");
    if (!data) {
      sessionStorage.setItem("taskList", []);
      console.log('hola', sessionStorage.getItem("taskList"))
      // TODO: Learn how to use sessionStorage
    }
  }, []);

  return (
    <main className="w-screen flex justify-center p-5 ">
      <div className="lg:w-3/5">
        <AddTask childToParentFunc={getInputData} />
        <Task value="Texto de prueba 1" />
        <Task value="Texto de prueba 2" />
        <Task value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris " />
      </div>
    </main>
  );
}

export default App;
