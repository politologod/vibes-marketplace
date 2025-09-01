import { cn } from "@/utils"

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  size?: 'sm' | 'md' | 'lg'
  required?: boolean
}

export function Label({ 
  className, 
  size = 'md',
  required = false,
  children,
  ...props 
}: LabelProps) {
  const baseStyles = "font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
  
  const sizes = {
    sm: "text-xs",
    md: "text-sm", 
    lg: "text-base"
  }

  return (
    <label
      className={cn(
        baseStyles,
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="text-destructive ml-1">*</span>}
    </label>
  )
}
