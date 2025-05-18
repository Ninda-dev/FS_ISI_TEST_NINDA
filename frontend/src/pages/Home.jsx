import { useState } from "react";
import TodoCard from "../components/TodoCard";

export default function Home() {
  const [isUpdate, setIsUpdate] = useState(false);

  return (
    <>
      <h1 className="text-3xl font-medium my-4" style={{ textAlign: "center" }}>
        Task Management
      </h1>
      <div className="w-1/3 mx-auto min-h-screen flex flex-col justify-items-center align-items-start">
        <form action="" className="w-full flex flex-row items-center">
          <div className="sm:col-span-4 w-full mb-4 gap-4 items-center">
            <label for="title" className="block text-sm text-gray-900">
              Title
            </label>
            <div className="mb-4">
              <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-500 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-gray-600">
                <input type="text" name="title" id="title" className="block w-full min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" />
              </div>
            </div>
            <div className="sm:col-span-4 w-full mb-4 flex justify-center">
              {isUpdate ? (
                <>
                  <button type="button" className="rounded-xl bg-orange-300 hover:text-white items-center px-2 py-1 mr-2" onClick={() => setIsUpdate(false)}>
                    Update Task
                  </button>
                  <button type="button" className="rounded-xl bg-red-400 hover:text-white items-center px-4 py-1" onClick={() => setIsUpdate(false)}>
                    Cancel
                  </button>
                </>
              ) : (
                <button type="button" className="rounded-xl bg-sky-blue hover:text-white items-center px-4 py-1">
                  Add Task
                </button>
              )}
            </div>
          </div>
        </form>

        <TodoCard />
      </div>
    </>
  );
}
