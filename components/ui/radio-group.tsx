"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const RadioGroupContext = React.createContext<{
    value: string | undefined;
    onValueChange: (value: string) => void;
    name?: string;
} | undefined>(undefined);

const RadioGroup = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { value?: string; onValueChange?: (value: string) => void; defaultValue?: string; name?: string }
>(({ className, value: controlledValue, onValueChange, defaultValue, name, ...props }, ref) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;

    const handleValueChange = React.useCallback((newValue: string) => {
        const nextValue = newValue === value ? "" : newValue; // Toggle logic: if same, clear it
        if (!isControlled) {
            setUncontrolledValue(nextValue);
        }
        onValueChange?.(nextValue);
    }, [isControlled, value, onValueChange]);

    return (
        <RadioGroupContext.Provider value={{ value, onValueChange: handleValueChange, name }}>
            <div className={cn("grid gap-2", className)} ref={ref} {...props} />
        </RadioGroupContext.Provider>
    )
})
RadioGroup.displayName = "RadioGroup"

const RadioGroupItem = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string }
>(({ className, value: itemValue, ...props }, ref) => {
    const context = React.useContext(RadioGroupContext);
    const checked = context?.value === itemValue;

    return (
        <button
            type="button"
            role="radio"
            aria-checked={checked}
            ref={ref}
            className="group flex items-center gap-2 cursor-pointer focus:outline-none"
            onClick={() => context?.onValueChange(itemValue)}
            {...props}
        >
            <div
                className={cn(
                    "aspect-square h-5 w-5 rounded-full border border-input bg-background ring-offset-background transition-all duration-200 ease-in-out flex items-center justify-center",
                    "group-hover:border-primary/50",
                    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    // Disabled style: Gray fill, darker gray border
                    "group-disabled:cursor-not-allowed group-disabled:opacity-80 group-disabled:bg-muted group-disabled:border-muted-foreground",
                    // Checked state: Primary border/text usually. For disabled+checked: Keep grayish
                    checked && !props.disabled && "border-primary text-primary",
                    checked && props.disabled && "text-muted-foreground", // Dot color when disabled
                    className
                )}
            >
                <div
                    className={cn(
                        "h-2.5 w-2.5 rounded-full bg-current transition-transform duration-200",
                        checked ? "scale-100" : "scale-0"
                    )}
                />
            </div>
        </button>
    )
})
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }
