import { useEffect, useState } from "react";
import TodoCard from "../components/TodoCard";
import { API_BASE_URL } from "../utils/apiBase";

export default function Home() {
  const [ongoingTasks, setOngoingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOngoingTasks();
  }, []);

  useEffect(() => {
    fetchCompletedTasks();
  }, []);

  const fetchOngoingTasks = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks?is_done=false`, {
        mode: "cors",
        // credentials: "include",
      });
      const data = await response.json();

      setOngoingTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchCompletedTasks = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks?is_done=true`, {
        mode: "cors",
        // credentials: "include",
      });
      const data = await response.json();

      setCompletedTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleEditTask = (task) => {
    setEditTask(task);
    setIsUpdate(true);
    setTitle(task.title);
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const title = formData.get("title");
    console.log("Update task with ID:");

    if (!title) {
      setError("Title is required");
      return;
    } else {
      setError("");

      const fetchUpdateTask = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/tasks/${editTask.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: title,
              id: editTask.id,
              is_done: editTask.is_done,
            }),
            mode: "cors",
            // credentials: "include",
          });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          alert("Task updated successfully");
          setTitle("");
          setIsUpdate(false);
          setEditTask(null);
          fetchOngoingTasks();
          fetchCompletedTasks();
        } catch (error) {
          console.error("Error updating task:", error);
        }
      };

      fetchUpdateTask();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("e >>>>>>>>>>>>>>", e);
    const formData = new FormData(e.target);
    const title = formData.get("title");

    if (!title) {
      setError("Title is required");
      return;
    } else {
      setError("");

      try {
        const response = await fetch(`${API_BASE_URL}/tasks`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            is_done: false,
          }),
          mode: "cors",
          // credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        alert("Task added successfully");
        setTitle("");
        fetchCompletedTasks();
        fetchOngoingTasks();
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  console.log("isUpdate >>>>>>>>>>>>>>", isUpdate);
  return (
    <>
      <h1 className="text-2xl sm:text-3xl font-medium my-4 text-center">Task Management</h1>
      <div className="w-full max-w-lg mx-auto min-h-screen flex flex-col px-2 sm:px-0">
        <form onSubmit={isUpdate ? handleUpdateTask : handleSubmit} className="w-full flex flex-col sm:flex-row items-center">
          <div className="w-full mb-4 gap-4 items-center">
            <label htmlFor="title" className="block text-sm text-gray-900">
              Title
            </label>
            <div className="mb-4">
              <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-500 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-gray-600">
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="block w-full min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  defaultValue={isUpdate && editTask ? editTask.title : ""}
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setError("");
                  }}
                />
              </div>
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>
            <div className="w-full mb-4 flex flex-col sm:flex-row justify-center gap-2">
              {isUpdate ? (
                <>
                  <button type="submit" className="rounded-xl bg-orange-300 hover:text-white items-center px-2 py-1 mr-0 sm:mr-2">
                    Update Task
                  </button>
                  <button
                    type="button"
                    className="rounded-xl bg-red-400 hover:text-white items-center px-4 py-1"
                    onClick={() => {
                      setEditTask(null);
                      setIsUpdate(false);
                      setTitle("");
                      setError("");
                    }}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button type="submit" className="btn rounded-xl bg-sky-blue hover:text-white items-center px-4 py-1">
                  Add Task
                </button>
              )}
            </div>
          </div>
        </form>

        <TodoCard ongoingTasks={ongoingTasks} completedTasks={completedTasks} fetchOngoingTasks={fetchOngoingTasks} fetchCompletedTasks={fetchCompletedTasks} onEditTask={handleEditTask} />
      </div>
    </>
  );
}
