import React from "react";
import "../stylesheets/Bottom.css";

function Bottom({ pendingTasks, clearAll }) {
  function handleClick() {
    clearAll();
  }

  return (
    <div className="container">
      <label className="container__label">You have {pendingTasks} pending tasks</label>
      <button onClick={handleClick} className="container__btn">Clear All</button>
    </div>
  );
}

export default Bottom;
