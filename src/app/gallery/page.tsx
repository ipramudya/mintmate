import { GalleryCardItem, InputField } from "@/components";
import { DummyNFTGallery } from "@/data/gallery-dummy";

export default function GalleryPage() {
    return (
        <main className="mx-auto flex max-w-screen-lg flex-col px-2 md:px-4">
            <header className="mt-[100px] flex items-center justify-between">
                <h2 className="text-2xl font-bold md:text-3xl">Gallery</h2>
                <div className="w-full max-w-[300px]">
                    <InputField color="secondary" placeholder="Browse NFT..." />
                </div>
            </header>
            <section className="mt-10 grid gap-2 pb-10 sm:grid-cols-2 md:grid-cols-3 md:gap-4">
                {DummyNFTGallery.map((item, index) => (
                    <GalleryCardItem key={`gallery-${index}`} {...item} imageSrc="" />
                ))}
            </section>
        </main>
    );
}
