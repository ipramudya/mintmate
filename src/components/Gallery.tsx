"use client";

import { useSearchGallery } from "@/hooks";
import { useEffect } from "react";
import { GalleryCardItem } from "./GalleryCardItem";

interface Props {
    galleryData: {
        name: string;
        description: string;
        image: string;
    }[];
}

export function Gallery(props: Props) {
    const { search, reset } = useSearchGallery();

    // reset the search when the component mounts
    useEffect(() => {
        reset();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const filteredData = props.galleryData.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <section className="mt-10 grid gap-2 pb-10 sm:grid-cols-2 md:grid-cols-3 md:gap-4">
            {filteredData.map((item, index) => (
                <GalleryCardItem key={`gallery-${index}`} {...item} />
            ))}
        </section>
    );
}
