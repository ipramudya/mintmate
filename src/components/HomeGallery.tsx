"use client";

import { DummyNFTGallery } from "@/data/galleryDummy";
import { useMediaQuery } from "@/hooks";
import useEmblaCarousel from "embla-carousel-react";
import { type PropsWithChildren } from "react";
import { GalleryCardItem } from "./GalleryCardItem";

const MOBILE_BREAKPOINT = "only screen and (max-width : 640px)";

const CAROUSEL_OPTIONS: Parameters<typeof useEmblaCarousel>[0] = {
    dragFree: true,
    startIndex: 0,
    slidesToScroll: 1
};

const MobileGallery = () =>
    DummyNFTGallery.map((item, index) => (
        <GalleryCardItem key={`gallery-mobile-${index}`} {...item} imageSrc="" />
    ));

const HomeGalleryCarouselItem = ({ children }: PropsWithChildren) => (
    <div className="min-w-0 shrink-0 grow-0 basis-1/2 pl-4 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
        {children}
    </div>
);

const DesktopCarousel = () => {
    const [carouselRef] = useEmblaCarousel(CAROUSEL_OPTIONS);

    return (
        <div ref={carouselRef} className="w-full overflow-hidden">
            <div className="-ml-4 flex">
                {DummyNFTGallery.map((item, index) => (
                    <HomeGalleryCarouselItem key={`gallery-desktop-${index}`}>
                        <div
                            key={`gallery-${index}`}
                            className="h-72 w-full animate-pulse rounded-t bg-neutral-200"
                        ></div>
                    </HomeGalleryCarouselItem>
                ))}
            </div>
        </div>
    );
};

export function HomeGallery() {
    const isSmallDevice = useMediaQuery(MOBILE_BREAKPOINT);

    return (
        <section className="flex w-full flex-col gap-4 px-4 sm:h-auto sm:flex-row sm:px-6 sm:py-10">
            {isSmallDevice ? <MobileGallery /> : <DesktopCarousel />}
        </section>
    );
}
