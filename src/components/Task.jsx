import React, { useEffect } from "react";
import { MdDelete } from "react-icons/md";

const Task = ({
  value,
  idValue,
  deleteFunc,
  checkInput,
  noCheckInput,
  isChecked,
}) => {
  const handleChange = (e) => {
    let task = e.target.parentNode;
    let label = task.childNodes[1];
    label.classList.toggle("line-through");

    if (e.target.checked) {
      checkInput(idValue);
    } else {
      noCheckInput(idValue);
    }
  };

  const handleClick = () => {
    document.getElementById(idValue).checked = false;
    document.getElementById("task-label").classList.remove("line-through");
    deleteFunc(idValue);
  };

  useEffect(() => {
    if (isChecked) {
      document.getElementById(idValue).checked = true;
      document.getElementById("task-label").classList.add("line-through");
    } else {
      document.getElementById(idValue).checked = false;
      document.getElementById("task-label").classList.remove("line-through");
    }
  }, []);

  return (
    <article className="group py-4 px-5 flex justify-between items-center rounded-lg bg-gray-100 hover:bg-sky-600">
      <input
        type="checkbox"
        id={idValue}
        onChange={handleChange}
        className="cursor-pointer"
      />
      <label
        id="task-label"
        htmlFor={idValue}
        className="group-hover:text-white w-4/5 text-xl break-words cursor-pointer"
      >
        {value}
      </label>
      <MdDelete
        className="text-2xl cursor-pointer group-hover:text-white"
        onClick={handleClick}
      />
    </article>
  );
};

export default Task;
