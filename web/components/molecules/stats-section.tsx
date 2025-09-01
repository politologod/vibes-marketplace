import { Metric } from "@/components/atoms/metric"
import { cn } from "@/utils"

interface StatsSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  stats: Array<{
    value: string
    label: string
    color?: 'primary' | 'secondary' | 'accent'
  }>
}

export function StatsSection({ stats, className, ...props }: StatsSectionProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 md:grid-cols-4 gap-8",
        className
      )}
      {...props}
    >
      {stats.map((stat, index) => (
        <Metric
          key={index}
          value={stat.value}
          label={stat.label}
          color={stat.color}
        />
      ))}
    </div>
  )
}
