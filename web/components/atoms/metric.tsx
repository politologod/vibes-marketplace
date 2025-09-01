import { cn } from "@/utils"

interface MetricProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  label: string
  color?: 'primary' | 'secondary' | 'accent'
}

export function Metric({ 
  value, 
  label, 
  color = 'primary',
  className, 
  ...props 
}: MetricProps) {
  const colors = {
    primary: "text-primary",
    secondary: "text-secondary", 
    accent: "text-accent"
  }

  return (
    <div
      className={cn(
        "glass-effect rounded-lg p-4 text-center",
        className
      )}
      {...props}
    >
      <div className={cn("text-2xl font-bold", colors[color])}>
        {value}
      </div>
      <div className="text-sm text-muted-foreground">
        {label}
      </div>
    </div>
  )
}
