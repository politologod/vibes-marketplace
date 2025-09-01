import { cn } from "@/utils"
import { Check } from "lucide-react"

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg'
}

export function Checkbox({ 
  className, 
  size = 'md',
  ...props 
}: CheckboxProps) {
  const baseStyles = "peer cursor-pointer rounded border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
  
  const sizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5"
  }

  return (
    <div className="relative inline-flex items-center">
      <input
        type="checkbox"
        className={cn(
          baseStyles,
          sizes[size],
          "appearance-none checked:bg-primary checked:border-primary",
          className
        )}
        {...props}
      />
      <Check 
        className={cn(
          "absolute pointer-events-none text-primary-foreground opacity-0 peer-checked:opacity-100 transition-opacity",
          size === 'sm' && "h-2 w-2",
          size === 'md' && "h-3 w-3", 
          size === 'lg' && "h-4 w-4"
        )}
      />
    </div>
  )
}
