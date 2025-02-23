"use client"

import { useState } from "react"
import { Tab } from "./Tab"
import { Button } from "./Button"
import { FilterButton } from "./FilterButton"
import { TaskCard } from "./TaskCard"
import { AddTodoPopup } from "./AddTodo"

export default function TaskManager() {
  const [activeTab, setActiveTab] = useState("today")
  const [isAddTodoPopupOpen, setIsAddTodoPopupOpen] = useState(false)

  const tabs = [
    { id: "messages", label: "Messages" },
    { id: "today", label: "Today's Task" },
    { id: "activity", label: "Last Activity" },
  ]

  const [tasks, setTasks] = useState([
    {
      id:1,
      title: "Client Review & Feedback",
      subtitle: "Crypto Wallet Redesign",
      timeSlot: "Today 10:00 PM - 11:45 PM",
      isCompleted: false,
      assignees: ["/man.png", "/woman.png"],
    },
    {
      id:2,
      title: "Create Wireframe",
      subtitle: "Crypto Wallet Redesign",
      timeSlot: "Today 09:15 PM - 10:00 PM",
      isCompleted: true,
      assignees: [
        "/man.png",
        "/profile.png",
        "/woman.png",
      ],
    },
    {
      id:3,
      title: "Client Review & Feedback",
      subtitle: "Crypto Wallet Redesign",
      timeSlot: "Today 10:00 PM - 11:45 PM",
      isCompleted: true,
      assignees: ["/man.png", "/woman.png"],
    },
    {
      id:4,
      title: "Create Wireframe",
      subtitle: "Crypto Wallet Redesign",
      timeSlot: "Today 09:15 PM - 10:00 PM",
      isCompleted: true,
      assignees: [
        "/man.png",
        "/profile.png",
        "/woman.png",
      ],
    },
    {
      id:5,
      title: "Client Review & Feedback",
      subtitle: "Crypto Wallet Redesign",
      timeSlot: "Today 10:00 PM - 11:45 PM",
      isCompleted: true,
      assignees: ["/man.png", "/woman.png"],
    },
    {
      id:6,
      title: "Create Wireframe",
      subtitle: "Crypto Wallet Redesign",
      timeSlot: "Today 09:15 PM - 10:00 PM",
      isCompleted: true,
      assignees: [
        "/man.png",
        "/profile.png",
        "/woman.png",
      ],
    },
    {
      id:7,
      title: "Client Review & Feedback",
      subtitle: "Crypto Wallet Redesign",
      timeSlot: "Today 10:00 PM - 11:45 PM",
      isCompleted: true,
      assignees: ["/man.png", "/woman.png"],
    },
    {
      id:8,
      title: "Create Wireframe",
      subtitle: "Crypto Wallet Redesign",
      timeSlot: "Today 09:15 PM - 10:00 PM",
      isCompleted: true,
      assignees: [
        "/man.png",
        "/profile.png",
        "/woman.png",
      ],
    },
  ])

  const filters = [
    { label: "All", count: tasks.length,filteredTasks:tasks },
    { label: "Open", count: tasks.filter(item=>item.isCompleted===false).length,filteredTasks:tasks.filter(item=>item.isCompleted===false) },
    { label: "Closed", count:  tasks.filter(item=>item.isCompleted===true).length ,filteredTasks:tasks.filter(item=>item.isCompleted===true)},
    // { label: "Archived", count: 2 },
  ]
  const [activeFilter,setActiveFilter]=useState(filters[0])

  const handleAddTodo = (todo: { title: string; description: string; date: string; time: string }) => {
    const newTask = {
      title: todo.title,
      subtitle: todo.description,
      timeSlot: `${todo.date} ${todo.time}`,
      isCompleted: false,
      assignees: ["/profile.png"],
      id:Math.random()
    }
    setTasks([newTask,...tasks])
  }
  const handleCompletionStatus = (id:number) => {
    setTasks((prevTasks) =>
      prevTasks.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-white max-h-screen overflow-auto">
      <div className="container max-w-md mx-auto p-4">
        {/* Custom Tabs */}
        <div className="flex justify-between border-b sticky top-2 bg-white">
          {tabs.map((tab) => (
            <Tab key={tab.id} label={tab.label} isActive={activeTab === tab.id} onClick={() => setActiveTab(tab.id)} />
          ))}
        </div>

        {activeTab === "today" && (
          <div>
            {/* Header Section */}
            <div className='sticky pt-6 top-[46px] bg-white'>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-semibold mb-1">Today's Task</h1>
                <p className="text-gray-500">Wednesday, 11 May</p>
              </div>
              <Button onClick={() => setIsAddTodoPopupOpen(true)} variant="primary" className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Task
              </Button>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
              {filters.map((filter) => (
                <FilterButton activeFilter={activeFilter} setActiveFilter={()=>setActiveFilter(filter)} key={filter.label} label={filter.label} count={filter.count} />
              ))}
            </div>
            </div>

            {/* Task Cards */}
            <div className="space-y-4">
              {activeFilter.filteredTasks.map((task, index) => (
                <TaskCard handleCompletionStatus={()=>handleCompletionStatus(task.id)} key={index} {...task} />
              ))}
            </div>
          </div>
        )}
      </div>
      <AddTodoPopup
        isOpen={isAddTodoPopupOpen}
        onClose={() => setIsAddTodoPopupOpen(false)}
        onAddTodo={handleAddTodo}
      />
    </div>
  )
}

