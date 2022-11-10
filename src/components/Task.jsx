import React from "react";
import { MdDelete } from "react-icons/md";

const Task = ({ value }) => {
  const handleChange = (e) => {
    let task = e.target.parentNode;
    let label = task.childNodes[1];
    label.classList.toggle("line-through");
  };

  return (
    <article className="py-4 px-5 flex justify-between items-center rounded-lg shadow-lg">
      <input type="checkbox" id={value} onChange={handleChange} />
      <label htmlFor={value} className="pl-2 w-4/5 text-xl break-words">
        {value}
      </label>
      <MdDelete className="text-2xl" />
    </article>
  );
};

export default Task;
