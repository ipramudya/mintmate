"use client";

import { MintSteps } from "@/data/mintStepper";
import { cn } from "@/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MintStepper() {
    const pathname = usePathname();
    const pathnames = pathname.split("/");
    const lastPathname = pathnames[pathnames.length - 1];

    const getActiveButton = (slug: string) => {
        return slug.toLowerCase() === lastPathname.toLowerCase();
    };

    return (
        <div className="relative flex w-full max-w-[700px] items-center justify-between">
            {MintSteps.map((item, index) => (
                <div
                    key={`mint-step-${index}`}
                    className="relative z-10 flex items-center justify-center bg-white px-2"
                >
                    <Link
                        href={item.href}
                        className={cn(
                            "flex h-9 items-center justify-center rounded-full px-4 text-sm font-semibold",
                            getActiveButton(item.slug)
                                ? "bg-gradient-to-l from-fuchsia-500 to-rose-400 text-white"
                                : "bg-neutral-100 text-neutral-400"
                        )}
                    >
                        {item.name}
                    </Link>
                </div>
            ))}
            {/* line */}
            <div className="absolute left-0 top-1/2 z-0 h-[2px] w-full -translate-y-1/2 bg-neutral-200/50"></div>
        </div>
    );
}
