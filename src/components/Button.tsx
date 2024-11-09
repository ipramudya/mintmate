"use client";

import { cn } from "@/lib";
import { tv, type VariantProps } from "tailwind-variants";

const variants = tv({
    base: "flex items-center justify-center rounded-full border border-transparent font-semibold capitalize transition duration-300 disabled:cursor-not-allowed",
    variants: {
        color: {
            primary: "bg-black text-white hover:bg-black/80 disabled:bg-black/40",
            secondary: "bg-blue-100 text-blue-700 hover:bg-blue-100/80 disabled:bg-blue-100/40",
            white: "border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-100/80 disabled:bg-neutral-100/40"
        },
        dimensions: {
            default: "h-9 gap-2 px-4 text-sm",
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

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    color?: ColorProps;
    dimensions?: DimensionsProps;
    loading?: boolean;
}

export function Button({
    className,
    color,
    dimensions,
    disabled,
    loading = false,
    ...props
}: Props) {
    return (
        <button
            className={cn(variants({ color, dimensions }), className)}
            disabled={loading || disabled}
            {...props}
        >
            {loading ? "please wait..." : props.children}
        </button>
    );
}
