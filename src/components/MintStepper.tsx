"use client";

import { MintSteps } from "@/data/mintStepper";
import { cn } from "@/lib";
import { usePathname } from "next/navigation";

export function MintStepper() {
    const pathname = usePathname();
    const pathnames = pathname.split("/");
    const lastPathname = pathnames[pathnames.length - 1];

    /**
     * A function to determine if the button should be active or not.
     *
     * @param slug The slug of the current step.
     * @param index The index of the current step.
     * @returns Whether the button should be active or not.
     */
    const getActiveButton = (slug: string, index: number) => {
        // Find the index of the current path in the MintSteps array
        const currentPathnameIndex = MintSteps.findIndex(
            (item) => item.slug.toLowerCase() === lastPathname.toLowerCase()
        );

        // Whenever the current step index is earlier than the current pathname index, make it active
        if (index < currentPathnameIndex) return true;

        // Check if the slug matches the last part of the pathname, return the result
        return slug.toLowerCase() === lastPathname.toLowerCase();
    };

    return (
        <div className="relative flex w-full max-w-[700px] items-center justify-between">
            {MintSteps.map((item, index) => (
                <div
                    key={`mint-step-${index}`}
                    className="relative z-10 flex items-center justify-center bg-white px-2"
                >
                    <div
                        className={cn(
                            "flex h-9 items-center justify-center rounded-full px-4 text-sm font-semibold",
                            getActiveButton(item.slug, index)
                                ? "bg-gradient-to-l from-fuchsia-500 to-rose-400 text-white"
                                : "bg-neutral-100 text-neutral-400"
                        )}
                    >
                        {item.name}
                    </div>
                </div>
            ))}
            {/* line */}
            <div className="absolute left-0 top-1/2 z-0 h-[2px] w-full -translate-y-1/2 bg-neutral-200/50"></div>
        </div>
    );
}
