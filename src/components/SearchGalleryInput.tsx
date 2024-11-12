"use client";

import { useSearchGallery } from "@/hooks";
import { useEffect } from "react";
import { InputField } from "./InputField";

export function SearchGalleryInput() {
    const { setSearch, search, reset } = useSearchGallery();

    useEffect(() => {
        return () => reset();
    }, [reset]);

    return (
        <InputField
            color="secondary"
            placeholder="Browse NFT..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
    );
}
