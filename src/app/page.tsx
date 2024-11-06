import { Banner, HomeGallery } from "@/components";

export default function Home() {
    return (
        <main className="flex flex-col">
            <Banner />
            <HomeGallery />
        </main>
    );
}
