interface TabProps {
  label: string
  isActive: boolean
  onClick: () => void
}

export function Tab({ label, isActive, onClick }: TabProps) {
  return (
    <button
      onClick={onClick}
      className={`pb-4 px-2 text-sm font-medium transition-colors relative ${
        isActive ? "text-black border-b-2 border-blue-600" : "text-gray-500"
      }`}
    >
      {label}
    </button>
  )
}

