import { Badge } from "@/components/atoms/badge"
import { cn } from "@/utils"

interface CategoryTagsProps extends React.HTMLAttributes<HTMLDivElement> {
  categories: Array<{
    name: string
    variant?: 'default' | 'secondary' | 'success' | 'warning' | 'destructive'
  }>
}

export function CategoryTags({ categories, className, ...props }: CategoryTagsProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap justify-center gap-2",
        className
      )}
      {...props}
    >
      {categories.map((category, index) => (
        <Badge
          key={index}
          variant={category.variant || 'default'}
          className="px-3 py-1"
        >
          {category.name}
        </Badge>
      ))}
    </div>
  )
}
