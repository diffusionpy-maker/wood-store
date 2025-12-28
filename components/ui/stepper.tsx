"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

// Stepper Component
// steps: ["Step 1", "Step 2", "Step 3"]
// currentStep: 1-indexed (e.g. 2 means Step 2 is active)

interface StepperProps {
    steps: string[];
    currentStep: number;
    className?: string;
}

const Stepper = ({ steps, currentStep, className }: StepperProps) => {
    return (
        <div className={cn("w-full", className)}>
            <div className="relative flex items-center justify-between w-full">
                {/* Connecting Line - Background */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-gray-200 z-0 rounded-full"></div>

                {/* Connecting Line - Active Fill */}
                <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-primary z-0 transition-all duration-500 ease-in-out rounded-full"
                    style={{ width: `${((Math.min(currentStep, steps.length) - 1) / (steps.length - 1)) * 100}%` }}
                ></div>

                {steps.map((step, index) => {
                    const stepNum = index + 1;
                    const isCompleted = stepNum < currentStep || (stepNum === currentStep && currentStep > steps.length); // Logic varies, assuming pure progress
                    // Actually, usually currentStep means "In Progress", so previous are completed.
                    const isCompletedState = stepNum < currentStep;
                    const isActiveState = stepNum === currentStep;

                    return (
                        <div key={index} className="relative z-10 flex flex-col items-center gap-2">
                            <div
                                className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 bg-background",
                                    isActiveState ? "border-primary text-primary" :
                                        isCompletedState ? "border-primary bg-primary text-primary-foreground" :
                                            "border-gray-300 text-muted-foreground"
                                )}
                            >
                                {isCompletedState ? <Check className="w-5 h-5" /> : <span className="text-sm font-medium">{stepNum}</span>}
                            </div>
                            <span className={cn(
                                "absolute top-10 text-xs font-medium whitespace-nowrap transition-colors duration-300",
                                isActiveState || isCompletedState ? "text-primary" : "text-muted-foreground"
                            )}>
                                {step}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export { Stepper }
