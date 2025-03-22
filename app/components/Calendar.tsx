"use client"

import { useState } from "react"
import { Button } from "./Button"
import { useTasksContext } from "./contexts/tasksContext"
import dayjs from "dayjs"

export function Calendar() {
  const {tasks,selectedDate}=useTasksContext()
  const [currentDate, setCurrentDate] = useState(new Date())
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  
 const { handleSelectedDay } = useTasksContext();
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const changeMonth = (increment: number) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate)
      newDate.setMonth(prevDate.getMonth() + increment)
      return newDate
    })
  }

  const changeYear = (increment: number) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate)
      newDate.setFullYear(prevDate.getFullYear() + increment)
      return newDate
    })
  }
  const getTasksCountByDate = (_date: string) => {
    return tasks.filter((task) => task.timeSlot === _date).length
  }

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDayOfMonth = getFirstDayOfMonth(year, month)

  const monthName = currentDate.toLocaleString("default", { month: "long" })

  return (
    <div className="bg-white rounded-xl shadow-sm border p-4">
      <div className="flex justify-between items-center mb-4">
        <Button variant="secondary" className="p-2" onClick={() => changeMonth(-1)}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Button>
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">
            {monthName} {year}
          </h2>
          <div className="flex gap-1">
            <Button variant="secondary" className="p-1 text-xs" onClick={() => changeYear(-1)}>
              -
            </Button>
            <Button variant="secondary" className="p-1 text-xs" onClick={() => changeYear(1)}>
              +
            </Button>
          </div>
        </div>
        <Button variant="secondary" className="p-2" onClick={() => changeMonth(1)}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-2 mb-2">
        {daysOfWeek.map((day) => (
          <button key={day} className="text-center text-sm font-medium text-gray-500">
            {day}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {[...Array(firstDayOfMonth)].map((_, index) => (
          <div key={`empty-${index}`} />
        ))}
        {[...Array(daysInMonth)].map((_, index) => {
          const day = index + 1
          const isToday =
            day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()
            const _date=dayjs(`${year}-${month+1}-${day}`).format('YYYY-MM-DD')
            const _total=getTasksCountByDate(_date)
          return (
            <Button  onClick={()=>handleSelectedDay(_date)} key={day} variant="secondary" className={`relative overflow-hidden p-2 h-[50px] lg:h-[70px] text-sm ${selectedDate===_date?'bg-green-500 hover:text-black':''} ${isToday ? "bg-blue-600 hover:text-black text-white" : ""}`}>
              {day} {_total>0&&(<span className={'p-3 h rounded-full right-0 absolute top-0 bg-black text-white translate-x-1/4 -translate-y-1/4'}>{_total}</span>)}
            </Button>
          )
        })}
      </div>
    </div>
  )
}

