"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const TasksContext = createContext(null);
export const TasksProvider = ({children}) => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Client Review & Feedback",
      subtitle: "Crypto Wallet Redesign",
      timeSlot: "Today 10:00 PM - 11:45 PM",
      isCompleted: false,
      assignees: ["/man.png", "/woman.png"],
    },
    {
      id: 2,
      title: "Create Wireframe",
      subtitle: "Crypto Wallet Redesign",
      timeSlot: "Today 09:15 PM - 10:00 PM",
      isCompleted: true,
      assignees: ["/man.png", "/profile.png", "/woman.png"],
    },
    {
      id: 3,
      title: "Client Review & Feedback",
      subtitle: "Crypto Wallet Redesign",
      timeSlot: "Today 10:00 PM - 11:45 PM",
      isCompleted: true,
      assignees: ["/man.png", "/woman.png"],
    },
    {
      id: 4,
      title: "Create Wireframe",
      subtitle: "Crypto Wallet Redesign",
      timeSlot: "Today 09:15 PM - 10:00 PM",
      isCompleted: true,
      assignees: ["/man.png", "/profile.png", "/woman.png"],
    },
    {
      id: 5,
      title: "Client Review & Feedback",
      subtitle: "Crypto Wallet Redesign",
      timeSlot: "Today 10:00 PM - 11:45 PM",
      isCompleted: true,
      assignees: ["/man.png", "/woman.png"],
    },
    {
      id: 6,
      title: "Create Wireframe",
      subtitle: "Crypto Wallet Redesign",
      timeSlot: "Today 09:15 PM - 10:00 PM",
      isCompleted: true,
      assignees: ["/man.png", "/profile.png", "/woman.png"],
    },
    {
      id: 7,
      title: "Client Review & Feedback",
      subtitle: "Crypto Wallet Redesign",
      timeSlot: "Today 10:00 PM - 11:45 PM",
      isCompleted: true,
      assignees: ["/man.png", "/woman.png"],
    },
    {
      id: 8,
      title: "Create Wireframe",
      subtitle: "Crypto Wallet Redesign",
      timeSlot: "Today 09:15 PM - 10:00 PM",
      isCompleted: true,
      assignees: ["/man.png", "/profile.png", "/woman.png"],
    },
  ]);

  const filters =[
    { label: "All", count: tasks.length, filteredTasks: tasks },
    {
      label: "Open",
      count: tasks.filter((item) => item.isCompleted === false).length,
      filteredTasks: tasks.filter((item) => item.isCompleted === false),
    },
    {
      label: "Closed",
      count: tasks.filter((item) => item.isCompleted === true).length,
      filteredTasks: tasks.filter((item) => item.isCompleted === true),
    },
    // { label: "Archived", count: 2 },
  ]
  const [activeFilter, setActiveFilter] = useState(filters[0]);
  const handleAddTodo = (todo: {
    title: string;
    description: string;
    date: string;
    time: string;
  }) => {
    const newTask = {
      title: todo.title,
      subtitle: todo.description,
      timeSlot: `${todo.date} ${todo.time}`,
      isCompleted: false,
      assignees: ["/profile.png"],
      id: Math.random(),
    };
    setTasks([newTask, ...tasks]);
  };
  const handleCompletionStatus = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };
  useEffect(() => {
    setActiveFilter(filters.find(f => f.label === activeFilter.label) || filters[0]);
  }, [tasks]);
  

  return (
    <TasksContext.Provider
      value={{
        handleCompletionStatus,
        handleAddTodo,
        activeFilter,
        setActiveFilter,
        filters,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export function useTasksContext() {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
