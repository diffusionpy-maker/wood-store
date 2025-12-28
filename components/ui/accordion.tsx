"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { cn } from "@/lib/utils"

const AccordionContext = React.createContext<{
    value?: string | string[]
    onValueChange?: (value: string) => void
    type?: "single" | "multiple"
    collapsible?: boolean
}>({})

const Accordion = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & {
        type?: "single" | "multiple"
        collapsible?: boolean
        defaultValue?: string | string[]
        value?: string | string[]
        onValueChange?: (value: string) => void
    }
>(({ className, type = "single", collapsible, defaultValue, value: controlledValue, onValueChange, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState<string | string[]>(
        defaultValue || (type === "single" ? "" : [])
    )

    const value = controlledValue !== undefined ? controlledValue : internalValue

    const handleValueChange = (itemValue: string) => {
        if (type === "single") {
            const newValue = itemValue === value && collapsible ? "" : itemValue;
            if (onValueChange) onValueChange(newValue);
            else setInternalValue(newValue);
        }
    }

    return (
        <AccordionContext.Provider value={{ value, onValueChange: handleValueChange, type, collapsible }}>
            <div ref={ref} className={cn(className)} {...props} />
        </AccordionContext.Provider>
    )
})
Accordion.displayName = "Accordion"

const AccordionItemContext = React.createContext<{ value: string }>({ value: "" });

const AccordionItem = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, value, ...props }, ref) => {
    return (
        <AccordionItemContext.Provider value={{ value }}>
            <div ref={ref} className={cn("border-b", className)} {...props} />
        </AccordionItemContext.Provider>
    )
})
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
    const { value: itemValue } = React.useContext(AccordionItemContext);
    const { value: selectedValue, onValueChange } = React.useContext(AccordionContext);
    const isOpen = selectedValue === itemValue;

    return (
        <div className="flex">
            <button
                ref={ref}
                onClick={() => onValueChange?.(itemValue)}
                className={cn(
                    "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
                    className
                )}
                data-state={isOpen ? "open" : "closed"}
                {...props}
            >
                {children}
                <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
            </button>
        </div>
    )
})
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
    const { value: itemValue } = React.useContext(AccordionItemContext);
    const { value: selectedValue } = React.useContext(AccordionContext);
    const isOpen = selectedValue === itemValue;

    return (
        <AnimatePresence initial={false}>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                >
                    <div ref={ref} className={cn("pb-4 pt-0", className)} {...props}>{children}</div>
                </motion.div>
            )}
        </AnimatePresence>
    )
})
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
