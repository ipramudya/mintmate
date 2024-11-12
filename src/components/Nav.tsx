"use client";

import { cn } from "@/lib";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type PropsWithChildren } from "react";
import { useActiveAccount } from "thirdweb/react";
import { Button } from "./Button";

interface Props extends PropsWithChildren {
    className?: string;
}

export function Nav({ children, className }: Props) {
    const router = useRouter();
    const account = useActiveAccount();

    return (
        <nav
            className={cn(
                "sticky left-0 top-0 mx-auto flex h-16 max-w-screen-lg items-center justify-center bg-white px-2 md:px-4",
                className
            )}
        >
            <div className="flex w-full items-center justify-between">
                {/* right side */}
                <div className="flex items-center gap-2 md:gap-4">
                    <Link href="/">
                        <h1 className="text-2xl font-bold uppercase">mnnt</h1>
                    </Link>
                    <Link
                        href="/gallery"
                        className="inline-flex h-9 items-center justify-center rounded-full px-4 text-sm capitalize text-neutral-700 transition duration-300 hover:bg-neutral-100"
                    >
                        gallery
                    </Link>
                </div>
                {/* left side */}
                <div className="flex items-center gap-2 md:gap-4">
                    {account && (
                        <Button color="secondary" onClick={() => router.push("/mint/nft/upload")}>
                            Mint
                        </Button>
                    )}
                    {/* `children` rendered as profile button or connect button */}
                    {children}
                </div>
            </div>
        </nav>
    );
}
