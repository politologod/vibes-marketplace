import { Input } from "@/components/atoms/input"
import { Label } from "@/components/atoms/label"
import { cn } from "@/utils"
import { LucideIcon } from "lucide-react"

interface InputFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string
  icon?: LucideIcon
  error?: string
  required?: boolean
  variant?: 'default' | 'error' | 'success'
}

export function InputField({
  label,
  icon: Icon,
  error,
  required = false,
  variant = 'default',
  className,
  id,
  ...props
}: InputFieldProps) {
  const inputVariant = error ? 'error' : variant

  return (
    <div className="space-y-2">
      <Label htmlFor={id} required={required} className="text-sm font-medium">
        {label}
      </Label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        )}
        <Input
          id={id}
          variant={inputVariant}
          className={cn(
            Icon && "pl-10",
            "glass-effect border-primary/30 focus:border-primary/60 transition-all duration-300",
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  )
}
