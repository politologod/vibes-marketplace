import { cn } from "@/utils"

interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg'
}

export function Slider({ 
  className, 
  size = 'md',
  ...props 
}: SliderProps) {
  const baseStyles = "w-full cursor-pointer appearance-none bg-transparent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
  
  const sizes = {
    sm: "h-1",
    md: "h-2", 
    lg: "h-3"
  }

  return (
    <input
      type="range"
      className={cn(
        baseStyles,
        sizes[size],
        "[&::-webkit-slider-track]:rounded-full [&::-webkit-slider-track]:bg-secondary",
        "[&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-secondary [&::-moz-range-track]:border-0",
        "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary",
        "[&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:border-0",
        className
      )}
      {...props}
    />
  )
}
