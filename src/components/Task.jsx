import React from "react";
import { MdDelete } from "react-icons/md";

const Task = ({ value, idValue,deleteFunc }) => {
  const handleChange = (e) => {
    let task = e.target.parentNode;
    let label = task.childNodes[1];
    label.classList.toggle("line-through");
  };

  const handleClick = () => {
    deleteFunc(idValue);
  };

  return (
    <article className="group py-4 px-5 flex justify-between items-center rounded-lg shadow-lg hover:bg-sky-600">
      <input type="checkbox" id={idValue} onChange={handleChange} />
      <label htmlFor={idValue} className="group-hover:text-white w-4/5 text-xl break-words">{value}</label>
      <MdDelete className="text-2xl" onClick={handleClick} />
    </article>
  );
};

export default Task;
