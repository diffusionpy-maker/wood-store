"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
    HTMLInputElement,
    React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
    <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="peer sr-only" ref={ref} {...props} />
        <div
            className={cn(
                "w-11 h-6 bg-input rounded-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-ring peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-background after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary transition-colors duration-200",
                "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
                className
            )}
        ></div>
    </label>
))
Switch.displayName = "Switch"

export { Switch }
