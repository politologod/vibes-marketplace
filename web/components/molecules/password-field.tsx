"use client"

import { useState } from "react"
import { Input } from "@/components/atoms/input"
import { Label } from "@/components/atoms/label"
import { Button } from "@/components/atoms/button"
import { cn } from "@/utils"
import { Lock, Eye, EyeOff } from "lucide-react"

interface PasswordFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
  error?: string
  required?: boolean
  variant?: 'default' | 'error' | 'success'
}

export function PasswordField({
  label,
  error,
  required = false,
  variant = 'default',
  className,
  id,
  ...props
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false)
  const inputVariant = error ? 'error' : variant

  return (
    <div className="space-y-2">
      <Label htmlFor={id} required={required} className="text-sm font-medium">
        {label}
      </Label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          variant={inputVariant}
          className={cn(
            "pl-10 pr-10 glass-effect border-primary/30 focus:border-primary/60 transition-all duration-300",
            className
          )}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-0 top-0 h-full w-10 hover:bg-transparent text-muted-foreground hover:text-primary transition-colors"
        >
          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </Button>
      </div>
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  )
}
