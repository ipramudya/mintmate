import { cn } from "@/lib";
import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";

const variants = tv({
    base: [
        "peer flex min-h-[100px] w-full rounded-md border py-2 text-neutral-900",
        "focus-visible:outline-dashed focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-neutral-400",
        "placeholder:text-neutral-300 disabled:cursor-not-allowed"
    ],
    variants: {
        color: {
            primary:
                "border-neutral-300 bg-neutral-50 disabled:border-neutral-300/40 disabled:bg-neutral-50/40",
            secondary: "border-neutral-200 bg-white"
        },
        dimensions: {
            default: "px-3 text-sm",
            lg: "px-4 text-base"
        }
    },
    defaultVariants: {
        color: "primary",
        dimensions: "default"
    }
});

type ColorProps = VariantProps<typeof variants>["color"];
type DimensionsProps = VariantProps<typeof variants>["dimensions"];

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    color?: ColorProps;
    dimensions?: DimensionsProps;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, Props>(
    ({ className, color, dimensions, ...props }, ref) => {
        return (
            <textarea
                className={cn(variants({ color, dimensions }), className)}
                ref={ref}
                {...props}
            />
        );
    }
);

Textarea.displayName = "Textarea";
