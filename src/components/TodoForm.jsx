import React, { useState } from "react";
import postData from "../utils/postData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TodoForm(props) {
  const [title, setTitle] = useState("");

  const createTodo = async () => {
    const res = await postData("/api/todo/createTodo", { title });
    if (res.success === true) {
      toast("Todo created successfully", {
        theme: props.mode,
        type: "success",
        autoClose: 2000,
      });
      
      setTitle("");

      if (props.todos === null){
        props.setTodos([res.todo]);
      }
    }
    else if (res.message === "Not authorized to access this route") {
      console.log(res);
      toast("Please login to access this", {
        theme: props.mode,
        type: "warning",
        autoClose: 2000,
      });
    } 
    else {
      toast("Something went wrong", {
        theme: props.mode,
        type: "error",
        autoClose: 2000,
      });
    }
  };

  const handleForm = (event) => {
    event.preventDefault();
    createTodo();
  };
  return (
    <div className={props.visible}>
      <ToastContainer />
      <form
        className={`flex items-center justify-between border-2 p-2 rounded-xl border-gray-400 mt-4 ${
          props.mode === "light" ? "bg-white" : "bg-gray-900"
        }`}
        onSubmit={handleForm}
      >
        <div className="w-full">
          <input
            type="text"
            placeholder="Add title..."
            className={`outline-none w-full p-1 text-lg font-mono bg-transparent ${
              props.mode === "light"
                ? "placeholder:text-gray-500 text-gray-500 "
                : "placeholder:text-white text-white "
            }`}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="">
          <button
            type="submit"
            className="px-3 py-1 text-lg bg-blue-600 text-white rounded font-mono"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
