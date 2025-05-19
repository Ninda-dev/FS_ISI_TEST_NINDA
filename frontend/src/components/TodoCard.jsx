import { Circle, CircleCheck, CircleX, Pencil } from "lucide-react";
import PropTypes from "prop-types";
import { formatDate } from "../utils/formatDate";


export default function TodoCard({tasks}) {
  console.log("Tasks>>>>>", tasks);
  return (
    <>
      <div>
        <div className="sm:col-span-4 w-full mb-4 gap-4">
          <label className="block font-bold text-gray-900 my-4">Ongoing Task</label>
          {tasks.map((task) => {
            return (
              <div className="flex justify-between items-center rounded-lg bg-gray-200 w-full px-4 py-4 my-2">
                <div className="flex flex-col">
                  <div className="flex flex-row items-baseline gap-2">
                    <label htmlFor="" className="text-sm">
                      {task.title}
                    </label>
                    <Pencil strokeWidth={3} className="w-3 h-3" />
                  </div>
                  <label htmlFor="" className="text-xs">
                    {formatDate(task.created_at)}
                  </label>
                </div>
                <div className="flex flex-row gap-2">
                  <CircleX />
                  <Circle fill="white" />
                </div>
              </div>
            );
          })}
        </div>

        <div>
          <label className="block font-bold text-gray-900">Completed Task</label>
          <div className="flex justify-between items-center rounded-lg bg-gray-200 w-full px-4 py-4">
            <div className="flex flex-col">
              <div className="flex flex-row items-baseline gap-2">
                <label htmlFor="" className="text-sm line-through">
                  Tugas 2
                </label>
                <Pencil strokeWidth={3} className="w-3 h-3" />
              </div>
              <label htmlFor="" className="text-xs">
                25 April 2024 08:00
              </label>
            </div>
            <div className="flex flex-row gap-2">
              <CircleX />
              <CircleCheck />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

TodoCard.PropTypes = {
  tasks: PropTypes.array.isRequired,
};
