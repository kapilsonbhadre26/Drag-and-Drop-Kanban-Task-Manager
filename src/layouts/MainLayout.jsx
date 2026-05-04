import { useEffect } from "react";
import Navbar from "../layout/Navbar";
import { Outlet } from "react-router-dom";
import { saveTasksToLocalStorage } from "../utils/storage";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
// import { getTasksFromLocalStorage } from "../utils/storage";

const MainLayout = () => {
  const tasks = useSelector((state) => state.tasks.tasks);

  useEffect(() => {
    saveTasksToLocalStorage(tasks);
  }, [tasks]);
  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100">
      <Toaster />
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
