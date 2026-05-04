import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

const Column = ({ title, tasks, status, filterTask }) => {
  // make column droppable

  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  //if there are no matching tasks, display a message
  const filteredTasks = filterTask
    ? tasks.filter((task) =>
        task.title.toLowerCase().includes(filterTask.toLowerCase()),
      )
    : tasks;

  return (
    <div className="bg-white border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-400">
          {title}
        </h2>

        <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-600 dark:text-black">
          {tasks.length}
        </span>
      </div>
      <div
        ref={setNodeRef}
        className={`flex h-125 flex-col gap-4 overflow-y-auto rounded-xl bg-zinc-50 p-3 dark:bg-zinc-900 ${isOver ? "bg-zinc-200" : "bg-zinc-50"}`}
      >
        <div className="flex flex-col gap-4 rounded-xl border border-dashed border-zinc-300 p-6 text-sm text-zinc-400 dark:bg-black">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => <TaskCard key={task.id} task={task} />)
          ) : (
            <p>No tasks found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Column;
