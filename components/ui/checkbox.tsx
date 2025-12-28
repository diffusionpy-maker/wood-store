"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
    HTMLInputElement,
    React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
    <label className="relative flex items-center gap-2 cursor-pointer group">
        <input
            type="checkbox"
            className="peer sr-only"
            ref={ref}
            {...props}
        />
        <div
            className={cn(
                "h-5 w-5 rounded-[6px] border border-input bg-background ring-offset-background transition-all duration-200 ease-in-out",
                "peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2",
                "peer-checked:bg-primary peer-checked:text-primary-foreground peer-checked:border-primary",
                "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
                "group-hover:border-primary/50",
                "flex items-center justify-center peer-checked:[&_svg]:opacity-100",
                className
            )}
        >
            <Check className="h-3.5 w-3.5 opacity-0 transition-opacity duration-200 stroke-[3]" />
        </div>
    </label>
))
Checkbox.displayName = "Checkbox"

export { Checkbox }
