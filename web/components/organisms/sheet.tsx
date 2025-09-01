"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { cn } from "@/utils"

interface SheetProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  title?: string
  description?: string
  className?: string
}

export function Sheet({ 
  open, 
  onClose, 
  children,
  side = 'right',
  size = 'md',
  title,
  description,
  className 
}: SheetProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    
    if (open) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [open, onClose])

  if (!open) return null

  const sideClasses = {
    top: "inset-x-0 top-0 border-b translate-y-0",
    right: "inset-y-0 right-0 border-l translate-x-0",
    bottom: "inset-x-0 bottom-0 border-t translate-y-0", 
    left: "inset-y-0 left-0 border-r translate-x-0"
  }

  const sizeClasses = {
    sm: side === 'top' || side === 'bottom' ? 'h-1/3' : 'w-80',
    md: side === 'top' || side === 'bottom' ? 'h-1/2' : 'w-96',
    lg: side === 'top' || side === 'bottom' ? 'h-2/3' : 'w-1/2',
    xl: side === 'top' || side === 'bottom' ? 'h-3/4' : 'w-2/3',
    full: side === 'top' || side === 'bottom' ? 'h-full' : 'w-full'
  }

  return (
    <>
      <div 
        className="fixed inset-0 z-50 bg-black/80 animate-in fade-in-0"
        onClick={onClose}
      />
      <div
        className={cn(
          "fixed z-50 gap-4 bg-background p-6 shadow-lg transition-transform duration-300 ease-in-out",
          sideClasses[side],
          sizeClasses[size],
          className
        )}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        {(title || description) && (
          <div className="flex flex-col space-y-2 text-center sm:text-left pb-4">
            {title && (
              <h2 className="text-lg font-semibold text-foreground">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        )}

        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </>
  )
}

export function SheetHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col space-y-2 text-center sm:text-left pb-4", className)} {...props}>
      {children}
    </div>
  )
}

export function SheetTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={cn("text-lg font-semibold text-foreground", className)} {...props}>
      {children}
    </h2>
  )
}

export function SheetFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-4", className)} {...props}>
      {children}
    </div>
  )
}
