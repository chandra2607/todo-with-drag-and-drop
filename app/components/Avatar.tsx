interface AvatarProps {
  src: string
  alt?: string
}

export function Avatar({ src, alt = "" }: AvatarProps) {
  return (
    <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-200">
      <img src={`/images/avatars/${src}` || "/placeholder.svg"} alt={alt} className="w-full h-full object-cover" />
    </div>
  )
}

