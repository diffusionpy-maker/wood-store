"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export function DatePicker() {
    const [date, setDate] = React.useState<Date>()

    return (
        <div className="flex flex-col gap-2 w-full max-w-xs">
            <label className="text-sm font-medium text-muted-foreground">Starting date</label>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-full justify-start text-left font-normal hover:bg-transparent hover:border-primary/50 transition-colors",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-muqi-gray-400 border-none shadow-xl text-white rounded-xl" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                    />
                    <div className="flex gap-3 p-4 pt-0">
                        <Button variant="secondary" className="flex-1 bg-white text-muqi-gray-500 hover:bg-white/90">Cancel</Button>
                        <Button className="flex-1 bg-muqi-gray-800 text-white hover:bg-muqi-gray-700 shadow-none">Set Date</Button>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}
