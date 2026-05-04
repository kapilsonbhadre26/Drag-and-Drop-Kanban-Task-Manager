import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/Dashboard";
import { createBrowserRouter } from "react-router-dom";
import TaskForm from "../kanban/TaskForm";

//   export router variable to be used in main.jsx

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "/form", element: <TaskForm /> },
    ],
  },
]);

export default router;
