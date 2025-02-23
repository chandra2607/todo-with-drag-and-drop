import type { ReactNode } from "react"

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: "primary" | "secondary"
  className?: string
}

export function Button({ children, onClick, variant = "secondary", className = "" }: ButtonProps) {
  const baseClasses = "px-4 py-2 rounded-lg text-sm font-medium transition-colors"
  const variantClasses = variant === "primary" ? "bg-blue-600 text-white hover:bg-blue-700" : "border hover:bg-gray-50"

  return (
    <button onClick={onClick} className={`${baseClasses} ${variantClasses} ${className}`}>
      {children}
    </button>
  )
}

