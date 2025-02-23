import { Button } from "./Button"
import { Badge } from "./Badge"

interface FilterButtonProps {
  label: string
  count: number,
  setActiveFilter:Function,
  activeFilter:Object,
}

export function FilterButton({ label, count,activeFilter,setActiveFilter }: FilterButtonProps) {
  return (
    <Button onClick={setActiveFilter} variant="secondary" className={`rounded-full flex items-center gap-2 ${activeFilter.label===label?'bg-blue-600 text-white hover:bg-blue-600':''}`}>
      {label}
      <Badge count={count} />
    </Button>
  )
}

