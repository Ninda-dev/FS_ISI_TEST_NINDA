import { Circle, CircleCheck, CircleX, Pencil } from "lucide-react";
import PropTypes from "prop-types";
import { formatDate } from "../utils/formatDate";
import { useState } from "react";

export default function TodoCard({ ongoingTasks, completedTasks, fetchOngoingTasks, fetchCompletedTasks, onEditTask}) {
  const [hoveredId, setHoveredId] = useState(null);
  console.log("ongoingTasks>>>>>>>>>", ongoingTasks);

  const handleUpdate = (task) => {
    console.log("Update task with ID:", task);

    const fetchUpdateTask = async () => {
      try {
        const response = await fetch(`http://localhost:8000/tasks/${task.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: task.title,
            id: task.id,
            is_done: true,
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        alert("Task updated successfully");
        fetchOngoingTasks();
        fetchCompletedTasks();
      } catch (error) {
        console.error("Error updating task:", error);
      }
    };

    fetchUpdateTask();
  };

  const handleDelete = (taskId) => {
    // console.log("Delete task with ID:", task);

    const fetchDeleteTask = async () => {
      try {
        if (!confirm("Are you sure you want to delete this task?")) {
          return;
        }

        const response = await fetch(`http://localhost:8000/tasks/${taskId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        alert("Task deleted successfully");
        fetchOngoingTasks();
        fetchCompletedTasks();
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    };

    fetchDeleteTask();
  };

  return (
    <>
      <div>
        {/* ongoing tasks */}
        <div className="sm:col-span-4 w-full mb-4 gap-4">
          <label className="block font-bold text-gray-900 my-4">Ongoing Task</label>
          {ongoingTasks.length === 0 && (
            <div className="flex justify-center items-center rounded-lg bg-gray-200 w-full px-4 py-4 my-2">
              <label htmlFor="" className="text-sm">
                No ongoing tasks
              </label>
            </div>
          )}
          {ongoingTasks.length > 0 && (
            <>
              {ongoingTasks.map((task) => {
                return (
                  <div className="flex justify-between items-center rounded-lg bg-gray-200 w-full px-4 py-4 my-2">
                    <div className="flex flex-col">
                      <div className="flex flex-row items-baseline gap-2">
                        <label htmlFor="" className="text-sm">
                          {task.title}
                        </label>
                        <Pencil strokeWidth={3} className="w-3 h-3" onClick={() => onEditTask(task)}/>
                      </div>
                      <label htmlFor="" className="text-xs">
                        {formatDate(task.created_at)}
                      </label>
                    </div>
                    <div className="flex flex-row gap-2">
                      <CircleX
                        onClick={() => {
                          handleDelete(task.id);
                        }}
                      />
                      <span onMouseEnter={() => setHoveredId(task.id)} onMouseLeave={() => setHoveredId(null)}>
                        {hoveredId === task.id ? <CircleCheck fill="white" className="text-green-500" onClick={() => handleUpdate(task)} /> : <Circle fill="white" />}
                      </span>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>

        {/* completed tasks */}
        <div>
          <label className="block font-bold text-gray-900">Completed Task</label>
          {completedTasks.length === 0 && (
            <div className="flex justify-center items-center rounded-lg bg-gray-200 w-full px-4 py-4 my-2">
              <label htmlFor="" className="text-sm">
                No completed tasks
              </label>
            </div>
          )}
          {completedTasks.length > 0 && (
            <>
              {completedTasks.map((task) => {
                return (
                  <div className="flex justify-between items-center rounded-lg bg-gray-200 w-full px-4 py-4 my-2">
                    <div className="flex flex-col">
                      <div className="flex flex-row items-baseline gap-2">
                        <label htmlFor="" className="text-sm">
                          {task.title}
                        </label>
                        <Pencil strokeWidth={3} className="w-3 h-3" onClick={() => onEditTask(task)}/>
                      </div>
                      <label htmlFor="" className="text-xs">
                        {formatDate(task.created_at)}
                      </label>
                    </div>
                    <div className="flex flex-row gap-2">
                      <CircleX
                        onClick={() => {
                          handleDelete(task.id);
                        }}
                      />
                      <CircleCheck />
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
}

TodoCard.PropTypes = {
  ongoingTasks: PropTypes.array.isRequired,
  completedTasks: PropTypes.array.isRequired,
  fetchOngoingTasks: PropTypes.func.isRequired,
  fetchCompletedTasks: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
};
