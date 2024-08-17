/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import tick from "../assets/tick.png";
import not_tick from "../assets/not_tick.png";
import delete_icon from "../assets/delete.png";

const Todo_items = ({ text, id, isComplete, onDelete, toggle }) => {
  return (
    <div className="flex items-center my-3 gap-2">
      <div
        onClick={() => toggle(id)}
        className="flex flex-1 items-center cursor-pointer"
      >
        <img
          src={isComplete ? tick : not_tick}
          alt={isComplete ? "Completed" : "Not Completed"}
          className="w-7"
        />
        <p
          className={`ml-4 text-[17px] ${isComplete ? 'line-through text-gray-500' : 'text-slate-700'}`}
        >
          {text}
        </p>
      </div>

      <img
        onClick={() => onDelete(id)}
        src={delete_icon}
        alt="Delete"
        className="w-3.5 cursor-pointer"
      />
    </div>
  );
};

export default Todo_items;
