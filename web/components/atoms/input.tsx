import { cn } from "@/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'error' | 'success'
  size?: 'sm' | 'md' | 'lg'
}

export function Input({ 
  className, 
  variant = 'default', 
  size = 'md', 
  type = 'text',
  ...props 
}: InputProps) {
  const baseStyles = "w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
  
  const variants = {
    default: "border-input focus:ring-ring",
    error: "border-destructive focus:ring-destructive",
    success: "border-green-500 focus:ring-green-500"
  }
  
  const sizes = {
    sm: "h-8 text-xs",
    md: "h-10 text-sm", 
    lg: "h-12 text-base"
  }

  return (
    <input
      type={type}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  )
}
