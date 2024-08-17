import { useEffect, useRef, useState } from "react";
import todo_icon from "../assets/todo_icon.png";
import Todo_items  from "./Todo_items";

const Todo = () => {
  // State to hold the list of todo items, initialized from localStorage if available
  const [todoList, setTodoList] = useState(
    localStorage.getItem("todoList")
      ? JSON.parse(localStorage.getItem("todoList"))
      : []
  );

  // Ref to access the input element
  const inputRef = useRef();

  // Function to add a new todo item
  const add = () => {
    const inputText = inputRef.current.value.trim();

    // Return early if the input is empty
    if (inputText === "") {
      return null;
    }

    // Create a new todo object
    const newTodo = {
      id: Date.now(), // Unique ID based on current timestamp
      text: inputText,
      isComplete: false, // Initially not completed
    };

    // Update the todo list state by adding the new todo item
    setTodoList((prev) => [...prev, newTodo]);

    // Clear the input field
    inputRef.current.value = "";
  };

  // Function to delete a todo item by ID
  const deleteTodo = (id) => {
    setTodoList((prevTodo) => prevTodo.filter((todo) => todo.id !== id));
  };

  // Function to toggle the completion status of a todo item
  const toggle = (id) => {
    setTodoList((prevTodo) =>
      prevTodo.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  };

  // useEffect hook to synchronize the todoList state with localStorage
  useEffect(() => {
    // Store the updated todoList in localStorage
    localStorage.setItem("todoList", JSON.stringify(todoList));
    console.log(todoList); // For debugging purposes
  }, [todoList]); // Runs whenever todoList changes

  return (
    <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl">
      {/*------title----- */}
      <div className="flex items-center mt-7 gap-2">
        <img className="w-8" src={todo_icon} alt="Todo icon" />
        <h1 className="text-3xl font-semibold">To-Do List</h1>
      </div>

      {/*------input Box----- */}
      <div className="flex items-center my-7 bg-gray-200 rounded-full">
        <input
          ref={inputRef}
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
          type="text"
          placeholder="Add Your Task"
        />
        <button
          onClick={add}
          type="button"
          className="border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer"
        >
          Add +
        </button>
      </div>

      {/*------todo list----- */}
      <div>
        {todoList.map((item) => (
          <Todo_items
            key={item.id}
            text={item.text}
            id={item.id}
            isComplete={item.isComplete}
            onDelete={deleteTodo}
            toggle={toggle}
          />
        ))}
      </div>
    </div>
  );
};

export default Todo;
