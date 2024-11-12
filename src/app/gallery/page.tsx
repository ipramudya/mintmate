import { GalleryCardItem } from "@/components";
import { getAllIPFSData, retrieveTokenURIs } from "@/lib";

export default async function GalleryPage() {
    const tokenURIs = await retrieveTokenURIs();
    const ipfsData = await getAllIPFSData(tokenURIs);

    // I accidently added a "data" field to the IPFS data, so I need to extract it
    const extractDataFields = ipfsData.map((item) => (item.data ? item.data : item));

    return (
        <section className="mt-10 grid gap-2 pb-10 sm:grid-cols-2 md:grid-cols-3 md:gap-4">
            {extractDataFields.map((item, index) => (
                <GalleryCardItem key={`gallery-${index}`} {...item} />
            ))}
        </section>
    );
}
