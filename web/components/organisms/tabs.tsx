"use client"

import { useState } from "react"
import { cn } from "@/utils"

interface Tab {
  id: string
  label: string
  content: React.ReactNode
  disabled?: boolean
}

interface TabsProps {
  tabs: Tab[]
  defaultTab?: string
  onTabChange?: (tabId: string) => void
  variant?: 'default' | 'pills' | 'underline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Tabs({ 
  tabs, 
  defaultTab, 
  onTabChange,
  variant = 'default',
  size = 'md',
  className 
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)
    onTabChange?.(tabId)
  }

  const baseTabStyles = "inline-flex items-center justify-center whitespace-nowrap font-medium transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 disabled:pointer-events-none disabled:opacity-50"
  
  const variants = {
    default: {
      container: "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1",
      tab: "rounded-sm",
      active: "bg-background text-foreground shadow-sm",
      inactive: "text-muted-foreground hover:text-foreground"
    },
    pills: {
      container: "inline-flex gap-1",
      tab: "rounded-full",
      active: "bg-primary text-primary-foreground",
      inactive: "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
    },
    underline: {
      container: "inline-flex border-b border-border",
      tab: "rounded-none border-b-2 border-transparent",
      active: "border-primary text-primary",
      inactive: "text-muted-foreground hover:text-foreground"
    }
  }

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base"
  }

  const currentVariant = variants[variant]
  const activeTabContent = tabs.find(tab => tab.id === activeTab)

  return (
    <div className={className}>
      <div className={cn(currentVariant.container, "text-muted-foreground")}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            disabled={tab.disabled}
            onClick={() => handleTabClick(tab.id)}
            className={cn(
              baseTabStyles,
              currentVariant.tab,
              sizes[size],
              activeTab === tab.id 
                ? currentVariant.active 
                : currentVariant.inactive
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-4 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1">
        {activeTabContent?.content}
      </div>
    </div>
  )
}
