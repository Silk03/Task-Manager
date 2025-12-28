import { useState, useEffect } from "react";
import supabase from "../config/supabaseClient";

function TaskManager() {
  let [newTask, setNewTask] = useState({ title: "", description: "" });
  let [tasks, setTasks] = useState([]);
  let [newDescription, setDescription] = useState("");
  // Function to fetch tasks from Supabase
  let fetchTasks = async () => {
    // Select all tasks from the "tasks" table
    // This line of code connects to supabase and fetches the tasks
    let { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.log("Error fetching data:", error);
      return;
    } else {
      console.log("Data fetched successfully:", data);
    }

    setTasks(data);
  };

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
    // this line of code connected to supabase and adds the new task
    let { error } = await supabase.from("tasks").insert(newTask).single();
    // Log any error that occurs during insertion
    // Check if there was an error during insertion
    if (error) {
      console.log("Error inserting data:", error);
      return;
    } else {
      console.log("Data inserted successfully!");
    }
  };

  function clearForm() {
    setNewTask({ title: "", description: "" });
  }
  // Fetch tasks when the component mounts
  // this useEffect runs when the component is first rendered
  // to display the existing tasks

  useEffect(() => {
    fetchTasks();
  }, []);

  let handleDelete = async (id) => {
    let { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) {
      console.log("Error deleting data:", error);
      return;
    } else {
      console.log("Data deleted successfully!");
    }
  };

  let handleEdit = async (id) => {
    let { error } = await supabase
      .from("tasks")
      .update({ description: newDescription })
      .eq("id", id);
    if (error) {
      console.log("Error updating data:", error);
      return;
    } else {
      console.log("Data updated successfully!");
    }
  };

  function handleDescriptionUpdate(e) {
    
      setDescription(e.target.value);

  }
    return (
      <div className="bg-[#232b2b] h-screen flex flex-col items-center justify-center">
        <div>
          <h1 className="text-white text-3xl font-semibold">
            Task Manager CRUD
          </h1>
          <div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center"
            >
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
            <button
              className="mt-5 p-2 rounded-md text-xl text-white bg-[#3f3f3f]
            transition-all duration-150
            hover:bg-[#525252]
            active:scale-95
           active:bg-[#2f2f2f]
            active:shadow-inner"
              onClick={clearForm}
            >
              Clear
            </button>
          </div>
          {/* Displaying the list of tasks 
        using map to loop through them */}
          {tasks.map((task) => (
            <div className="outline outline-white w-auto h-auto mt-10 rounded-md">
              <div className="flex flex-col items-center">
                <h2 className="text-white text-2xl font-semibold m-2">
                  {task.title}
                </h2>
                <h2 className="text-white text-xl  m-2">{task.description}</h2>
              </div>
              <div>
                <input
                  className="mt-5 p-2 rounded-md text-xl text-white bg-[#3f3f3f]"
                  placeholder="Updated description..."
                  onChange={handleDescriptionUpdate}
                />
              </div>
              <div className="flex justify-evenly p-5">
                <button
                  className="mt-5 p-2 rounded-md text-xl text-white bg-[#3f3f3f]
            transition-all duration-150
            hover:bg-[#525252]
            active:scale-95
           active:bg-[#2f2f2f]
            active:shadow-inner"
                  onClick={() => handleEdit(task.id)}
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
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }


export default TaskManager;
