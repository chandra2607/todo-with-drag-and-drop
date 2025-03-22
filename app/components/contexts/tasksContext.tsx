"use client";
import dayjs from "dayjs";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import initialTasks from '../contexts/tasks.json'
const TasksContext = createContext(null);
export const TasksProvider = ({children}) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
  // expose some variable to the window object
  const visibleTasks = useMemo(() => {
    return tasks.filter((task) => task.timeSlot.split(" ")[0] === selectedDate);
  },[tasks,selectedDate])
  
  if(typeof window !== 'undefined')
  {
    window.tasks = tasks;
    window.visibleTasks = visibleTasks;
    window.dayjs = dayjs;
    window.selectedDate = selectedDate;
  }
  const filters =[
    { label: "All", count: visibleTasks.length, filteredTasks: visibleTasks },
    {
      label: "Open",
      count: visibleTasks.filter((item) => item.isCompleted === false).length,
      filteredTasks: visibleTasks.filter((item) => item.isCompleted === false),
    },
    {
      label: "Closed",
      count: visibleTasks.filter((item) => item.isCompleted === true).length,
      filteredTasks: visibleTasks.filter((item) => item.isCompleted === true),
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
  }, [tasks,selectedDate]);
  const handleSelectedDay=(day)=>{
    setSelectedDate(day)
  }

  return (
    <TasksContext.Provider
      value={{
        tasks,
        handleCompletionStatus,
        handleAddTodo,
        activeFilter,
        setActiveFilter,
        filters,
        handleSelectedDay,
        selectedDate,
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
