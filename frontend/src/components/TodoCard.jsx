import { Circle, CircleCheck, CircleX, Pencil } from "lucide-react";

export default function TodoCard() {
  return (
    <>
      <div>
        <div className="sm:col-span-4 w-full mb-4 gap-4">
          <label className="block font-bold text-gray-900 my-4">Ongoing Task</label>
          <div className="flex justify-between items-center rounded-lg bg-gray-400 w-full px-4 py-4">
            <div className="flex flex-col">
              <div className="flex flex-row items-baseline gap-2">
                <label htmlFor="" className="text-sm">
                  Tugas 1
                </label>
                <Pencil strokeWidth={3} className="w-3 h-3"/>
              </div>
              <label htmlFor="" className="text-xs">
                10 Maret 2025 12:00
              </label>
            </div>
            <div className="flex flex-row gap-2">
              <CircleX />
              <Circle fill="white" />
            </div>
          </div>
        </div>

        <div>
          <label className="block font-bold text-gray-900">Completed Task</label>
          <div className="flex justify-between items-center rounded-lg bg-gray-400 w-full px-4 py-4">
            <div className="flex flex-col">
              <div className="flex flex-row items-baseline gap-2">
                <label htmlFor="" className="text-sm">
                  Tugas 2
                </label>
                <Pencil strokeWidth={3} className="w-3 h-3"/>
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
