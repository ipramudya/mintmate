import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges multiple class names into a single string. This is useful for
 * conditionally applying classes based on props or state.
 *
 * @param inputs - An array of classnames or tailwind classes to merge.
 * @returns A single string of merged classnames.
 */
export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs));
}
