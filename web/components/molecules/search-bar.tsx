import { Input } from "@/components/atoms/input"
import { Button } from "@/components/atoms/button"
import { Search } from "lucide-react"
import { cn } from "@/utils"

interface SearchBarProps extends React.HTMLAttributes<HTMLDivElement> {
  placeholder?: string
  onSearch?: (query: string) => void
  size?: 'sm' | 'md' | 'lg'
}

export function SearchBar({ 
  placeholder = "Search products...", 
  onSearch,
  size = 'md',
  className,
  ...props 
}: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const query = formData.get('search') as string
    onSearch?.(query)
  }

  const sizes = {
    sm: "h-8",
    md: "h-10", 
    lg: "h-12"
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className={cn("relative flex items-center", className)}
      {...props}
    >
      <Input
        name="search"
        placeholder={placeholder}
        size={size}
        className="pr-10"
      />
      <Button
        type="submit"
        size="icon"
        variant="ghost"
        className={cn(
          "absolute right-1 shrink-0",
          sizes[size]
        )}
      >
        <Search className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>
    </form>
  )
}
