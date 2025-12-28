"use client"

import * as React from "react"
import { ChevronDown, Check } from "lucide-react"
import { cn } from "@/lib/utils"

// Simplified Select for Design System Showcase
// For production, consider using @radix-ui/react-select

const Select = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { value?: string; onValueChange?: (value: string) => void; placeholder?: string; options: { label: string; value: string }[] }
>(({ className, value, onValueChange, placeholder = "Select...", options, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedLabel = options.find(opt => opt.value === value)?.label || placeholder;

    return (
        <div className={cn("relative w-full min-w-[120px]", className)} ref={dropdownRef} {...props}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 hover:border-primary/50",
                    isOpen && "ring-1 ring-ring border-primary"
                )}
            >
                <span className="truncate">{selectedLabel}</span>
                <ChevronDown className={cn("h-4 w-4 opacity-50 transition-transform duration-200", isOpen && "rotate-180")} />
            </button>

            {isOpen && (
                <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2">
                    <div className="p-1">
                        {options.map((option) => (
                            <div
                                key={option.value}
                                className={cn(
                                    "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors hover:bg-primary hover:text-primary-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                                    value === option.value && "bg-primary/10 text-primary"
                                )}
                                onClick={() => {
                                    onValueChange?.(option.value);
                                    setIsOpen(false);
                                }}
                            >
                                <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                                    {value === option.value && <Check className="h-4 w-4" />}
                                </span>
                                <span className="truncate font-medium">{option.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
})
Select.displayName = "Select"

export { Select }
