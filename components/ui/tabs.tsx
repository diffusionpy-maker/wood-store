"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

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
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "inline-flex h-10 items-center justify-start rounded-none border-b border-border bg-transparent p-0 text-muted-foreground w-full",
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
                "inline-flex items-center justify-center whitespace-nowrap px-4 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative",
                isActive
                    ? "text-primary after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-primary"
                    : "hover:text-foreground hover:bg-muted/20",
                className
            )}
            onClick={() => setActiveTab?.(value)}
            {...props}
        >
            {children}
        </button>
    )
})
TabsTrigger.displayName = "TabsTrigger"

const TabsContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { value: string; activeTab?: string }
>(({ className, value, activeTab, ...props }, ref) => {
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
