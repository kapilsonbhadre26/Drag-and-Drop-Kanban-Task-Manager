import { LayoutDashboard, Moon, Plus, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDark;
    setIsDark(newMode);

    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };
  return (
    <header className="border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3">
          <div className="rounded-xl bg-zinc-900 p-2 text-white">
            <LayoutDashboard size={20} />
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
              Kanban Board
            </h1>

            <p className="text-sm text-zinc-500 dark:text-gray-300">
              Manage your tasks visually
            </p>
          </div>
        </NavLink>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleDarkMode}
            className="rounded-xl border border-zinc-200 bg-white p-2 text-zinc-700 shadow-sm transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `rounded-xl px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-black"
                  : "text-zinc-600 hover:bg-zinc-100 dark:text-white"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/form"
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-zinc-900 text-white"
                  : "bg-zinc-900 text-white hover:bg-zinc-800"
              }`
            }
          >
            <Plus size={16} />
            Add Task
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
