"use client";

import { DummyNFTGallery } from "@/data/gallery-dummy";
import { useMediaQuery } from "@/hooks";
import useEmblaCarousel from "embla-carousel-react";
import { type PropsWithChildren } from "react";
import { GalleryCardItem } from "./GalleryCardItem";

const MOBILE_BREAKPOINT = "only screen and (max-width : 640px)";

const CAROUSEL_OPTIONS = {
    dragFree: true,
    startIndex: 0,
    slidesToScroll: 1
} satisfies Parameters<typeof useEmblaCarousel>[0];

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
                        <GalleryCardItem {...item} imageSrc="" />
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