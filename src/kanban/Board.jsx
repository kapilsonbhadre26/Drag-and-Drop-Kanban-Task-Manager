import Column from "./Column";

// import { tasks } from "../data/dummyData";
import { useSelector, useDispatch } from "react-redux";
import { updateTaskStatus } from "../features/tasks/taskSlice";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { useState } from "react";
import TaskCard from "./TaskCard";

const Board = ({ filterPriority, filterTask }) => {
  const [activeTask, setActiveTask] = useState(null);
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  const handleDragStart = (event) => {
    const task = tasks.find((t) => t.id === event.active.id);
    setActiveTask(task);
  };
  //implement drag and drop functionality using dnd kit
  //implement onDragEnd function to update task status based on the column it is dropped in
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    //dispatch action to update task status
    dispatch(updateTaskStatus({ id: active.id, status: over.id }));
    setActiveTask(null);
  };

  const handleDragCancel = () => {
    setActiveTask(null);
  };
  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
    >
      <section className="grid gap-6 lg:grid-cols-3 dark:bg-zinc-900">
        <Column
          title="Todo"
          tasks={
            filterPriority
              ? tasks.filter(
                  (task) =>
                    task.status === "todo" && task.priority === filterPriority,
                )
              : tasks.filter((task) => task.status === "todo")
          }
          status="todo"
          filterTask={filterTask}
        />
        <Column
          title="In Progress"
          tasks={
            filterPriority
              ? tasks.filter(
                  (task) =>
                    task.status === "in-progress" &&
                    task.priority === filterPriority,
                )
              : tasks.filter((task) => task.status === "in-progress")
          }
          status="in-progress"
          filterTask={filterTask}
        />
        <Column
          title="Done"
          tasks={
            filterPriority
              ? tasks.filter(
                  (task) =>
                    task.status === "done" && task.priority === filterPriority,
                )
              : tasks.filter((task) => task.status === "done")
          }
          status="done"
          filterTask={filterTask}
        />
      </section>
      <DragOverlay>
        {activeTask ? <TaskCard task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Board;
