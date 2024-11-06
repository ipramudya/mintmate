"use client";

import { cn } from "@/utils";
import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";

const variants = tv({
    base: [
        "peer flex w-full rounded-md border py-2 text-neutral-900",
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
            default: "h-9 px-4 text-sm",
            lg: "h-12 px-6 text-base"
        }
    },
    defaultVariants: {
        color: "primary",
        dimensions: "default"
    }
});

type ColorProps = VariantProps<typeof variants>["color"];
type DimensionsProps = VariantProps<typeof variants>["dimensions"];

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    color?: ColorProps;
    dimensions?: DimensionsProps;
}

export const InputField = React.forwardRef<HTMLInputElement, Props>(
    ({ className, color, dimensions, ...props }, ref) => {
        return (
            <input
                className={cn(variants({ color, dimensions }), className)}
                ref={ref}
                {...props}
            />
        );
    }
);

InputField.displayName = "Input";
