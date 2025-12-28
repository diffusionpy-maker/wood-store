"use client"

import * as React from "react"
import { Clock, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const TimePicker = () => {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <div className="relative w-full max-w-xs">
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-muted-foreground">Starting time</label>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                        "h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background flex items-center justify-between hover:border-primary/50 transition-colors focus:outline-none focus:ring-1 focus:ring-ring",
                        isOpen && "border-primary ring-1 ring-ring"
                    )}
                >
                    <span className="w-[1px] h-5 bg-foreground/20 animate-pulse"></span>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                </button>
            </div>

            {isOpen && (
                <div className="absolute top-0 left-full ml-4 z-50 p-6 rounded-xl bg-[#A79EAD] text-white shadow-xl w-[320px] animate-in fade-in-0 zoom-in-95 slide-in-from-left-2 before:content-[''] before:absolute before:top-4 before:right-full before:border-8 before:border-transparent before:border-r-[#A79EAD]">

                    {/* Time Selection */}
                    <div className="flex items-center justify-between mb-8 px-4">
                        <div className="flex items-center gap-2 cursor-pointer">
                            <span className="text-2xl font-semibold">00:00</span>
                            <ChevronDown className="h-5 w-5" />
                        </div>
                        <div className="text-white/50">_</div>
                        <div className="flex items-center gap-2 cursor-pointer">
                            <span className="text-2xl font-semibold">00:00</span>
                            <ChevronDown className="h-5 w-5" />
                        </div>

                        <div className="h-9 px-3 rounded bg-[#7A6E7D] flex items-center justify-center text-sm font-medium shadow-sm ml-2">
                            AM
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <button className="flex-1 h-9 rounded-md bg-white text-[#A79EAD] text-sm font-medium hover:bg-white/90 transition-colors">Cancel</button>
                        <button className="flex-1 h-9 rounded-md bg-[#7A6E7D] text-white text-sm font-medium hover:bg-[#685d6b] transition-colors shadow-sm">Set Time</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export { TimePicker }
