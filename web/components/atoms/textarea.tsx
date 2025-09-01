import { cn } from "@/utils"

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'default' | 'error' | 'success'
  size?: 'sm' | 'md' | 'lg'
}

export function Textarea({ 
  className, 
  variant = 'default',
  size = 'md',
  ...props 
}: TextareaProps) {
  const baseStyles = "w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 transition-colors resize-vertical"
  
  const variants = {
    default: "border-input focus:ring-ring",
    error: "border-destructive focus:ring-destructive",
    success: "border-green-500 focus:ring-green-500"
  }
  
  const sizes = {
    sm: "min-h-[60px] text-xs",
    md: "min-h-[80px] text-sm",
    lg: "min-h-[100px] text-base"
  }

  return (
    <textarea
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
