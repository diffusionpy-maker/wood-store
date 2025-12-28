import * as React from "react"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"
// Simply using a div structure for now, can be expanded to full accessiblity

const Breadcrumb = React.forwardRef<
    HTMLElement,
    React.HTMLAttributes<HTMLElement>
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />)
Breadcrumb.displayName = "Breadcrumb"

const BreadcrumbList = React.forwardRef<
    HTMLOListElement,
    React.OlHTMLAttributes<HTMLOListElement>
>(({ className, ...props }, ref) => (
    <ol
        ref={ref}
        className={cn(
            "flex flex-wrap items-center gap-2 break-words text-sm text-muted-foreground sm:gap-2.5",
            className
        )}
        {...props}
    />
))
BreadcrumbList.displayName = "BreadcrumbList"

const BreadcrumbItem = React.forwardRef<
    HTMLLIElement,
    React.LiHTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
    <li
        ref={ref}
        className={cn("inline-flex items-center gap-1.5", className)}
        {...props}
    />
))
BreadcrumbItem.displayName = "BreadcrumbItem"

const BreadcrumbLink = React.forwardRef<
    HTMLAnchorElement,
    React.AnchorHTMLAttributes<HTMLAnchorElement> & { asChild?: boolean }
>(({ className, ...props }, ref) => {
    return (
        <a
            ref={ref}
            className={cn("transition-colors hover:text-foreground cursor-pointer flex items-center gap-1", className)}
            {...props}
        />
    )
})
BreadcrumbLink.displayName = "BreadcrumbLink"

const BreadcrumbPage = React.forwardRef<
    HTMLSpanElement,
    React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
    <span
        ref={ref}
        role="link"
        aria-disabled="true"
        aria-current="page"
        className={cn("font-normal text-foreground", className)}
        {...props}
    />
))
BreadcrumbPage.displayName = "BreadcrumbPage"

const BreadcrumbSeparator = ({
    children,
    className,
    ...props
}: React.ComponentProps<"li">) => (
    <li
        role="presentation"
        aria-hidden="true"
        className={cn("[&>svg]:size-3.5", className)}
        {...props}
    >
        {children ?? <ChevronRight />}
    </li>
)
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

export {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
}
