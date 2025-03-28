import { useEffect, useId, useRef, useState } from "react";
import { Avatar } from "./Avatar";
import { useTasksContext } from "./contexts/tasksContext";

interface TaskCardProps {
  title: string;
  subtitle: string;
  timeSlot: string;
  isCompleted: boolean;
  assignees: string[];
  handleCompletionStatus: Function;
  priority: string;
  id: string;
}

export function TaskCard({
  title,
  subtitle,
  timeSlot,
  isCompleted,
  assignees,
  handleCompletionStatus,
  priority,
  id,
}: TaskCardProps) {
  const reactUnikId = useId();
  const { tasks, setTasks } = useTasksContext();
  const [dragStarted, setDragStarted] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(-1);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const dragRef = useRef(null);
  const lastDragPosition = useRef(null);
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    setHoveredIndex(Number(id));
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    setHoveredIndex(-1);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setHoveredIndex(Number(id));
    if (lastDragPosition.current !== null) {
      const isDraggingUp = e.clientY < lastDragPosition.current;
    }
    lastDragPosition.current = e.clientY; // Continuously update position
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setHoveredIndex(-1);

    const jsonData = JSON.parse(e.dataTransfer.getData("application/json"));
    const draggedTask = tasks.find((task) => task.id === jsonData.id);

    if (!draggedTask) return;

    const remainingTasks = tasks.filter((task) => task.id !== jsonData.id);
    const hoveredTaskPosition = remainingTasks.findIndex(
      (task) => task.id === hoveredIndex
    );

    if (hoveredTaskPosition === -1) return;

    const isDraggingUp = e.clientY < lastDragPosition.current;
    const newIndex = isDraggingUp
      ? hoveredTaskPosition
      : hoveredTaskPosition + 1;

    const finalTasks = [
      ...remainingTasks.slice(0, newIndex),
      draggedTask,
      ...remainingTasks.slice(newIndex),
    ];

    setTasks(finalTasks);
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setDragStarted(true);
    setDraggedIndex(Number(id));
    lastDragPosition.current = e.clientY;
    const dragImage = e.target as HTMLElement;
    // create custom ghose image for proper control
    const clonedDragImage = dragImage.cloneNode(true) as HTMLElement;
    clonedDragImage.style.width = `${dragImage.offsetWidth}px`;
    clonedDragImage.style.height = `${dragImage.offsetHeight}px`;
    // // Add the cloned element to DOM
    document.body.appendChild(clonedDragImage);
    e.dataTransfer.setDragImage(clonedDragImage, 50, 50);

    requestAnimationFrame(() => {
      document.body.removeChild(clonedDragImage);
    });

    e.dataTransfer.setData("text", reactUnikId);
    e.dataTransfer.setData("application/json", JSON.stringify({ id: id }));
  };
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.target.style.opacity = "";
    e.target.style.border = "";
    setDragStarted(false);
    setDraggedIndex(-1);
  };
  return (
    <div
      id={reactUnikId}
      ref={dragRef}
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      // handling drag events in between similar elements
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`border transition-all duration-300 ease-linear rounded-xl p-4 shadow-sm ${
        isCompleted ? "bg-green-50" : ""
      }
      ${dragStarted ? "opacity-20" : ""}
      ${
        hoveredIndex === Number(id) && draggedIndex !== hoveredIndex
          ? "relative after:absolute after:content-[''] after:h-full  after:w-full after:box-border after:border-blue-500 after:border-4 after:border-dotted  after:left-0 after:translate-y-4 after:right-0 after:-bottom-full after:rounded-md after:z-10 !mb-[182px] block"
          : ""
      }
      `}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h3 className={`font-medium ${isCompleted ? "line-through" : ""}`}>
            {title} {id}
          </h3>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        <div
          onClick={handleCompletionStatus}
          className={`text-white cursor-pointer ${
            isCompleted ? "bg-green-600" : "border-black border text-black"
          } rounded-full p-1`}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
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
              <span className="text-white text-xs font-medium">
                +{assignees.length - 3}
              </span>
            </div>
          )}
        </div>
      </div>
      <div>
        <p className={`text-sm text-gray-500 flex items-center gap-1`}>
          Priority {priority} &nbsp;
          <PriorityIcon priority={priority} />
        </p>
      </div>
    </div>
  );
}

// Priority icon component with different visuals based on priority level
const PriorityIcon = ({ priority }) => {
  const numPriority = Number(priority) || 1;

  // Color based on priority
  const getColor = () => {
    if (numPriority >= 4) return "text-red-500";
    if (numPriority === 3) return "text-orange-500";
    if (numPriority === 2) return "text-yellow-500";
    return "text-blue-500";
  };

  return (
    <svg
      className={`w-4 h-4 ${getColor()}`}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        stroke="currentColor"
        fill="none"
      />
    </svg>
  );
};

// blaze svg
const Blaze = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);
