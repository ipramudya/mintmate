"use client";

import { useRouter } from "next/navigation";
import { Button } from "./Button";
import { Icon } from "./Icon";

export function RemintButton() {
    const router = useRouter();

    return (
        <Button className="mx-auto mt-12 w-fit" onClick={() => router.push("/mint/nft/upload")}>
            <Icon.Refresh />
            Mint Again
        </Button>
    );
}
