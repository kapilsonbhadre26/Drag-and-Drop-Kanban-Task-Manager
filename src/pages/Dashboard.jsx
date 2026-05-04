import { useState } from "react";
import Board from "../kanban/Board";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const [filterTask, setFilterTask] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const handleFilterTask = (e) => {
    setFilterTask(e.target.value);
  };
  const handleFilterPriority = (e) => {
    setFilterPriority(e.target.value);
  };

  const inProgressTasks = tasks.filter((task) => task.status === "in-progress");
  const completedTasks = tasks.filter((task) => task.status === "done");
  const pendingTasks = tasks.filter((task) => task.status === "todo");

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:bg-zinc-800 dark:text-white dark:border-zinc-600">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Task Dashboard
          </h1>

          <p className="mt-2 text-sm text-zinc-500 dark:text-gray-200">
            Organize, manage, and track your workflow efficiently
          </p>
        </div>

        <input
          type="text"
          value={filterTask}
          onChange={handleFilterTask}
          placeholder="Search tasks by title"
          className="w-full rounded-lg border border-zinc-300 bg-zinc-50 px-4 py-2 text-sm text-zinc-700 focus:border-zinc-500 focus:ring-1  sm:w-auto dark:text-white dark:bg-zinc-800 dark:border-zinc-600 dark:focus:border-zinc-500 dark:focus:ring-zinc-500"
        />
        {/* add priority dropdown for filtering */}
        <select
          value={filterPriority}
          onChange={handleFilterPriority}
          className="rounded-lg border border-zinc-300 bg-zinc-50 px-4 py-2 text-sm text-zinc-700 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 sm:w-auto dark:text-white dark:bg-zinc-800 dark:border-zinc-600 dark:focus:border-zinc-500 dark:focus:ring-zinc-500"
        >
          <option value="">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button className="rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800">
          <Link to="/form">+ Create Task</Link>
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:bg-zinc-800 dark:text-white dark:border-zinc-600">
          <p className="text-sm font-medium text-zinc-500 dark:text-gray-200">
            Total Tasks
          </p>

          <h2 className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-400">
            {tasks.length}
          </h2>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:bg-zinc-800 dark:text-white dark:border-zinc-600">
          <p className="text-sm font-medium text-zinc-500 dark:text-gray-200">
            In Progress
          </p>

          <h2 className="mt-2 text-3xl font-bold text-amber-500">
            {inProgressTasks.length}
          </h2>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:bg-zinc-800 dark:text-white dark:border-zinc-600">
          <p className="text-sm font-medium text-zinc-500 dark:text-gray-200">
            Completed
          </p>

          <h2 className="mt-2 text-3xl font-bold text-emerald-500">
            {completedTasks.length}
          </h2>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:bg-zinc-800 dark:text-white dark:border-zinc-600">
          <p className="text-sm font-medium text-zinc-500">Pending</p>

          <h2 className="mt-2 text-3xl font-bold text-rose-500">
            {pendingTasks.length}
          </h2>
        </div>
      </div>

      <Board filterPriority={filterPriority} filterTask={filterTask} />
    </section>
  );
};

export default Dashboard;
