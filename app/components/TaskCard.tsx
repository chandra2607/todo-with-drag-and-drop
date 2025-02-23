import { Avatar } from "./Avatar"

interface TaskCardProps {
  title: string
  subtitle: string
  timeSlot: string
  isCompleted: boolean
  assignees: string[],
  handleCompletionStatus:Function
}

export function TaskCard({ title, subtitle, timeSlot, isCompleted, assignees,handleCompletionStatus }: TaskCardProps) {
  return (
    <div className={`border rounded-xl p-4 shadow-sm ${isCompleted ? "bg-green-50" : ""}`}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h3 className={`font-medium ${isCompleted ? "line-through" : ""}`}>{title}</h3>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
          <div onClick={handleCompletionStatus} className={`text-white cursor-pointer ${isCompleted?'bg-green-600':'border-black border text-black'} rounded-full p-1`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-500">{timeSlot}</p>
        <div className="flex -space-x-2">
          {assignees.slice(0, 3).map((src, index) => (
            <Avatar key={index} src={src} />
          ))}
          {assignees.length > 3 && (
            <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-600 flex items-center justify-center">
              <span className="text-white text-xs font-medium">+{assignees.length - 3}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

