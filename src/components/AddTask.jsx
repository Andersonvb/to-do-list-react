import React, { useState } from "react";

const AddTask = ({ childToParentFunc }) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    childToParentFunc(value);
  };

  return (
    <article>
      <form className="h-12 flex justify-between border border-gray-400 rounded-lg  ">
        <input
          type="text"
          onChange={handleChange}
          placeholder="New Task"
          className="w-4/6 md:w-5/6 pl-5 rounded-l-lg outline-0 focus:outline-sky-700 focus:outline-1"
        />
        <button
          onClick={handleClick}
          className="w-2/6 md:w-1/6 px-5 text-white font-bold bg-gradient-to-r from-sky-700 to-cyan-500"
        >
          Add Task
        </button>
      </form>
    </article>
  );
};

export default AddTask;
