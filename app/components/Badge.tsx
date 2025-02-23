interface BadgeProps {
  count: number
}

export function Badge({ count }: BadgeProps) {
  return <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">{count}</span>
}

