"use client"

import React, { useState, useEffect, useRef } from "react"
import { cn } from "@/utils"

interface DropdownMenuProps {
  children: React.ReactNode
}

interface DropdownMenuTriggerProps {
  children: React.ReactNode
  asChild?: boolean
  className?: string
}

interface DropdownMenuContentProps {
  children: React.ReactNode
  align?: 'start' | 'center' | 'end'
  side?: 'top' | 'right' | 'bottom' | 'left'
  className?: string
}

interface DropdownMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
  disabled?: boolean
}

interface DropdownMenuSeparatorProps {
  className?: string
}

export function DropdownMenu({ children }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { 
        isOpen, 
        setIsOpen 
      } as any)
    }
    return child
  })

  return (
    <div ref={containerRef} className="relative inline-block">
      {childrenWithProps}
    </div>
  )
}

export function DropdownMenuTrigger({ 
  children, 
  asChild = false, 
  className,
  isOpen,
  setIsOpen
}: DropdownMenuTriggerProps & { isOpen?: boolean; setIsOpen?: (open: boolean) => void }) {
  const handleClick = () => {
    setIsOpen?.(!isOpen)
  }

  if (asChild && React.isValidElement(children)) {
    const childProps = children.props as any || {}
    return React.cloneElement(children, {
      ...childProps,
      onClick: (e: any) => {
        handleClick()
        childProps.onClick?.(e)
      },
      'aria-expanded': isOpen,
      'aria-haspopup': 'menu' as const,
      className: cn(childProps.className, className)
    })
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      aria-expanded={isOpen}
      aria-haspopup="menu"
    >
      {children}
    </button>
  )
}

export function DropdownMenuContent({ 
  children, 
  align = 'center', 
  side = 'bottom',
  className,
  isOpen
}: DropdownMenuContentProps & { isOpen?: boolean }) {
  if (!isOpen) return null

  const alignmentClasses = {
    start: 'left-0',
    center: 'left-1/2 transform -translate-x-1/2',
    end: 'right-0'
  }

  const sideClasses = {
    top: 'bottom-full mb-2',
    right: 'left-full top-0 ml-2',
    bottom: 'top-full mt-2',
    left: 'right-full top-0 mr-2'
  }

  return (
    <div
      className={cn(
        "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
        alignmentClasses[align],
        sideClasses[side],
        className
      )}
      role="menu"
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { 
            setIsOpen: (child.props as any).setIsOpen 
          } as any)
        }
        return child
      })}
    </div>
  )
}

export function DropdownMenuItem({ 
  children, 
  asChild = false, 
  disabled = false, 
  className,
  onClick,
  setIsOpen,
  ...props 
}: DropdownMenuItemProps & { setIsOpen?: (open: boolean) => void }) {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return
    
    onClick?.(event)
    setIsOpen?.(false) 
  }

  if (asChild && React.isValidElement(children)) {
    const childProps = children.props as any || {}
    return React.cloneElement(children, {
      ...childProps,
      onClick: (e: any) => {
        handleClick(e)
        childProps.onClick?.(e)
      },
      className: cn(
        "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        disabled && "pointer-events-none opacity-50",
        childProps.className,
        className
      ),
      role: "menuitem",
      ...props
    })
  }

  return (
    <div
      onClick={handleClick}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        disabled && "pointer-events-none opacity-50",
        className
      )}
      role="menuitem"
      {...props}
    >
      {children}
    </div>
  )
}

export function DropdownMenuSeparator({ className }: DropdownMenuSeparatorProps) {
  return (
    <div
      className={cn("-mx-1 my-1 h-px bg-muted", className)}
      role="separator"
    />
  )
}