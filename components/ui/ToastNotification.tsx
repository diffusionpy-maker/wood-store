"use client";

import { useToastStore } from "@/lib/toastStore";
import { AnimatePresence, motion } from "framer-motion";
import { Check, X, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export function ToastNotification() {
    const { toasts, removeToast } = useToastStore();

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
            <AnimatePresence mode="popLayout">
                {toasts.map((toast) => (
                    <motion.div
                        key={toast.id}
                        layout
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className={cn(
                            "pointer-events-auto min-w-[300px] p-4 rounded-2xl flex items-center gap-4 shadow-2xl backdrop-blur-xl border border-white/20",
                            toast.type === 'success' && "bg-background/80 text-foreground", // Minimalist dark/light adaptive
                            toast.type === 'error' && "bg-destructive/10 border-destructive/20 text-destructive",
                            toast.type === 'info' && "bg-primary/10 border-primary/20 text-primary"
                        )}
                    >
                        <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                            toast.type === 'success' && "bg-primary text-primary-foreground",
                            toast.type === 'error' && "bg-destructive text-destructive-foreground",
                            toast.type === 'info' && "bg-primary text-primary-foreground"
                        )}>
                            {toast.type === 'success' && <Check className="w-5 h-5" />}
                            {toast.type === 'error' && <X className="w-5 h-5" />}
                            {toast.type === 'info' && <Info className="w-5 h-5" />}
                        </div>

                        <div className="flex-1">
                            <p className="font-medium text-sm tracking-wide">{toast.message}</p>
                        </div>

                        <button
                            onClick={() => removeToast(toast.id)}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
