"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
// Import motion from framer-motion for fluid animations
import { motion } from "framer-motion"

const Tabs = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { defaultValue: string }
>(({ className, defaultValue, children, ...props }, ref) => {
    const [activeTab, setActiveTab] = React.useState(defaultValue);

    return (
        <div
            ref={ref}
            className={cn("w-full", className)}
            {...props}
            data-active-tab={activeTab}
        >
            {React.Children.map(children, child => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, { activeTab, setActiveTab } as any);
                }
                return child;
            })}
        </div>
    )
})
Tabs.displayName = "Tabs"

const TabsList = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { activeTab?: string; setActiveTab?: any }
>(({ className, activeTab, setActiveTab, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "inline-flex h-10 items-center justify-center rounded-full bg-muted/50 p-1 text-muted-foreground",
            className
        )}
        {...props}
    />
))
TabsList.displayName = "TabsList"

const TabsTrigger = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string; activeTab?: string; setActiveTab?: (v: string) => void }
>(({ className, value, activeTab, setActiveTab, children, ...props }, ref) => {
    const isActive = activeTab === value;
    return (
        <button
            ref={ref}
            type="button"
            className={cn(
                "relative inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 z-10",
                isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                className
            )}
            onClick={() => setActiveTab?.(value)}
            // Remove data-state in favor of explicit motion handling or keep for accessibility
            role="tab"
            aria-selected={isActive}
            {...props}
        >
            {isActive && (
                <motion.div
                    layoutId="active-tab"
                    className="absolute inset-0 z-[-1] rounded-full bg-primary shadow-sm"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
            )}
            <span className="relative z-10">{children}</span>
        </button>
    )
})
TabsTrigger.displayName = "TabsTrigger"

const TabsContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { value: string; activeTab?: string; setActiveTab?: any }
>(({ className, value, activeTab, setActiveTab, ...props }, ref) => {
    if (activeTab !== value) return null;
    return (
        <div
            ref={ref}
            className={cn(
                "mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 animate-in fade-in-50 slide-in-from-bottom-1 duration-300",
                className
            )}
            {...props}
        />
    )
})
TabsContent.displayName = "TabsContent"

export { Tabs, TabsList, TabsTrigger, TabsContent }
