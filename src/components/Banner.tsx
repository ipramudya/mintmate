"use client";

import { useRouter } from "next/navigation";
import { Button } from "./Button";

export function Banner() {
    const router = useRouter();

    return (
        <section className="flex h-[300px] w-full items-center justify-center py-10 md:h-[400px]">
            <div className="flex flex-col items-center justify-center gap-4 md:gap-6">
                <h3 className="text-sm uppercase text-neutral-700">
                    create, explore & collect digital art nfts.
                </h3>
                <h2 className="text-4xl capitalize">
                    <strong>crystalized passion.</strong>
                </h2>
                <Button color="white" dimensions="lg" onClick={() => router.push("/gallery")}>
                    Explore
                </Button>
            </div>
        </section>
    );
}
