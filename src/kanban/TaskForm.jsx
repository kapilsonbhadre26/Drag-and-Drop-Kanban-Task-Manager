import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTask, editTask } from "../features/tasks/taskSlice";
import { v4 as uuidv4 } from "uuid";
import { useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";

const TaskForm = () => {
  const location = useLocation();
  const task = location.state?.task;
  // console.log("task with edit ", task);

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
    dueDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        dueDate: task.dueDate,
      });
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (task) {
      dispatch(editTask({ ...formData, id: task.id }));
      //toast for successful edit
      toast.success("Task edited successfully");
    } else {
      dispatch(addTask({ ...formData, id: uuidv4() }));
      // console.log(formData);
      toast.success("Task created successfully");
    }

    //clear form after submit
    setFormData({
      title: "",
      description: "",
      priority: "",
      status: "",
      dueDate: "",
    });
  };

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:bg-zinc-800 dark:text-white dark:border-zinc-600">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Create New Task
        </h2>

        <p className="mt-1 text-sm text-zinc-500 dark:text-gray-200">
          Add a task to your workflow board
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-gray-300">
            Task Title
          </label>

          <input
            type="text"
            name="title"
            placeholder="Enter task title"
            value={formData.title}
            onChange={handleChange}
            className="w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-zinc-900  dark:bg-zinc-800 dark:text-white dark:border-zinc-600"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-gray-300">
            Description
          </label>

          <textarea
            name="description"
            rows="4"
            placeholder="Enter task description"
            value={formData.description}
            onChange={handleChange}
            className="w-full resize-none rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-zinc-900  dark:bg-zinc-800 dark:text-white dark:border-zinc-600"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-gray-300">
              Priority
            </label>

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-zinc-900  dark:bg-zinc-800 dark:text-white dark:border-zinc-600"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-gray-300">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-zinc-900  dark:bg-zinc-800 dark:text-white dark:border-zinc-600"
            >
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-gray-300">
            Due Date
          </label>

          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-zinc-900  dark:bg-zinc-800 dark:text-white dark:border-zinc-600"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
        >
          {task ? "Edit Task" : "Create Task"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
