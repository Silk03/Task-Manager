import { useState } from "react";
import supabase from "../config/supabaseClient";

function TaskManager() {
  let [newTask, setNewTask] = useState({ title: "", description: "" });

  // Handlers for input changes
  function handletileChange(e) {
    // Update the title in newTask state
    // Using functional update to ensure we have the latest state
    setNewTask((prev) => ({ ...prev, title: e.target.value }));
  }

  // Handler for description input change
  function handleDescriptionChange(e) {
    // Update the description in newTask state
    // Using functional update to ensure we have the latest state
    setNewTask((prev) => ({ ...prev, description: e.target.value }));
  }

  // Handler for form submission
  let handleSubmit = async (e) => {
    e.preventDefault();
    // Insert new task into the "tasks" table in Supabase
    let { error } = await supabase.from("tasks").insert(newTask).single();
    // Log any error that occurs during insertion
    // Check if there was an error during insertion
    if (error) {
      console.log("Error inserting data:", error);
    } else {
      console.log("Data inserted successfully!");
    }

    setNewTask({ title: "", description: "" });
  };

  return (
    <div className="bg-[#232b2b] h-screen flex flex-col items-center justify-center">
      <div>
        <h1 className="text-white text-3xl font-semibold">Task Manager CRUD</h1>
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input
              className="mt-5 p-2 rounded-md text-xl text-white bg-[#3f3f3f]"
              type="text"
              placeholder="Task Title"
              onChange={handletileChange}
            />

            <input
              className="mt-5 p-2 rounded-md text-xl text-white bg-[#3f3f3f]"
              type="text"
              placeholder="Description"
              onChange={handleDescriptionChange}
            />
            <button
              className="mt-5 p-2 rounded-md text-xl text-white bg-[#3f3f3f]
            transition-all duration-150
            hover:bg-[#525252]
            active:scale-95
           active:bg-[#2f2f2f]
            active:shadow-inner"
            >
              Add Task
            </button>
          </form>
        </div>

        <div className="outline outline-white w-auto h-auto mt-10 rounded-md">
          <div className="flex flex-col items-center">
            <h2 className="text-white text-2xl font-semibold m-2">Title</h2>
            <h2 className="text-white text-xl  m-2">Description</h2>
          </div>
          <div className="flex justify-evenly p-5">
            <button
              className="mt-5 p-2 rounded-md text-xl text-white bg-[#3f3f3f]
            transition-all duration-150
            hover:bg-[#525252]
            active:scale-95
           active:bg-[#2f2f2f]
            active:shadow-inner"
            >
              Edit
            </button>

            <button
              className="mt-5 p-2 rounded-md text-xl text-white bg-[#3f3f3f]
            transition-all duration-150
            hover:bg-[#525252]
            active:scale-95
           active:bg-[#2f2f2f]
            active:shadow-inner"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskManager;
