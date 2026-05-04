import { CalendarDays, Flag, Pencil, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { deleteTask } from "../features/tasks/taskSlice";
import { useNavigate } from "react-router-dom";
import { useDraggable } from "@dnd-kit/core";
import { GripVertical } from "lucide-react";
import toast from "react-hot-toast";

const TaskCard = ({ task }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });
  const handleDelete = () => {
    toast((t) => (
      <div className="flex items-center gap-2">
        <span>Are you sure you want to delete this task?</span>
        <button
          className="rounded-lg bg-red-500 px-3 py-1 text-white hover:bg-red-600"
          onClick={() => {
            // console.log("delete task with id: ", task.id);
            dispatch(deleteTask(task.id));
            toast.success("Task deleted successfully");
            toast.dismiss(t.id);
          }}
        >
          Yes
        </button>
        <button
          className="rounded-lg bg-zinc-300 px-3 py-1 text-zinc-700 hover:bg-zinc-400"
          onClick={() => toast.dismiss(t.id)}
        >
          No
        </button>
      </div>
    ));
  };

  const handleEdit = () => {
    // console.log("edit task with id: ", task.id);
    navigate("/form", { state: { task } });
  };

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;
  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        zIndex: 1000,
        // position: "relative",
      }}
      className="group relative rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md dark:bg-zinc-800 dark:border-zinc-700"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-zinc-800 dark:text-white">
            {task.title}
          </h3>

          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-200 ">
            {task.description}
          </p>
        </div>

        <div className="flex items-center gap-2 opacity-0 transition group-hover:opacity-100">
          <button className="rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-800 dark:text-zinc-300 ">
            <Pencil size={16} onClick={handleEdit} />
          </button>

          <div
            {...listeners}
            {...attributes}
            className="cursor-grab rounded-lg p-1 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 active:cursor-grabbing dark:text-zinc-300"
          >
            <GripVertical size={18} />
          </div>

          <button className="rounded-lg p-2 text-zinc-500 transition hover:bg-red-100 hover:text-red-500  dark:text-zinc-300">
            <Trash2 size={16} onClick={handleDelete} />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-600">
          <Flag size={14} />
          {task.priority}
        </div>

        <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
          <CalendarDays size={16} />
          <span>{task.dueDate}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
