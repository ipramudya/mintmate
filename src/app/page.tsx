import { Banner, HomeGallery } from "@/components";
import { Metadata } from "next";

export default function Home() {
    return (
        <main className="flex flex-col">
            <Banner />
            <HomeGallery />
        </main>
    );
}

export const metadata: Metadata = {
    title: "Mintmate - Home",
    description: "Mintmate landing page, you can explore showcased nft on our gallery."
};
