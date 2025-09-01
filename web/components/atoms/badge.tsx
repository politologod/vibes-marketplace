import { cn } from "@/utils"

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'destructive' | 'outline'
  size?: 'sm' | 'md'
}

export function Badge({ 
  className, 
  variant = 'default',
  size = 'md',
  ...props 
}: BadgeProps) {
  const baseStyles = "inline-flex items-center rounded-full border font-medium transition-colors"
  
  const variants = {
    default: "border-transparent bg-primary text-primary-foreground",
    secondary: "border-transparent bg-secondary text-secondary-foreground",
    success: "border-transparent bg-green-500 text-white",
    warning: "border-transparent bg-yellow-500 text-white", 
    destructive: "border-transparent bg-destructive text-destructive-foreground",
    outline: "border-border text-foreground bg-transparent"
  }
  
  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-0.5 text-xs"
  }

  return (
    <span
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
