"use client";

import { cn } from "@/lib";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";

const variants = tv({
    base: [
        "block font-medium tracking-wide text-neutral-900",
        "aria-disabled::cursor-not-allowed aria-disabled::text-neutral-900/40",
        "aria-required:after:ml-1 aria-required:after:!text-red-700 aria-required:after:content-['*']"
    ]
});

type Ref = React.ElementRef<typeof LabelPrimitive.Root>;
type Props = React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof variants>;

export const InputLabel = React.forwardRef<Ref, Props>(({ className, ...props }, ref) => (
    <LabelPrimitive.Root ref={ref} className={cn(variants(), className)} {...props} />
));
InputLabel.displayName = LabelPrimitive.Root.displayName;
