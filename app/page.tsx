"use client";
import React from "react";
import TaskManager from "./components/TaskManager";
import { Calendar } from "./components/Calendar";
import Hamburger from "./components/Hamburger";
import { TasksProvider } from "./components/contexts/tasksContext";
function page() {
  const [isCalenderOpen, setIsCalenderOpen] = React.useState(false);
  const handleSideBarToggle = () => {
    setIsCalenderOpen(!isCalenderOpen);
  };
  return (
    <TasksProvider>
    <div className="flex gap-1 flex-col lg:flex-row" suppressHydrationWarning>
      {/* Semicircular Container */}
      <div className={`fixed lg:hidden top-0 flex items-center justify-center left-0 px-3 z-20 py-1.5 bg-blue-600 border rounded-full rounded-l-none ${isCalenderOpen?'left-[80%]':''}`}>
        {/* Hamburger Icon */}
        <button
          onClick={handleSideBarToggle}
          className="text-white"
          aria-label="Toggle Menu"
        >
          <Hamburger />
        </button>
      </div>
      {/* calender visibility mobile */}
      {isCalenderOpen && (
        <div className="fixed top-0 left-0 w-[80%] z-40">
          <Calendar />
        </div>
      )}

      <div className="lg:basis-1/4 lg:w-1/4">
        <TaskManager />
      </div>
      <div className="hidden lg:block lg:basis-3/4">
        <Calendar />
      </div>
    </div>
    </TasksProvider>
  );
}

export default page;
