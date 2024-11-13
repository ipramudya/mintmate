import { Gallery } from "@/components";
import { getAllIPFSData, retrieveTokenURIs } from "@/lib";
import { type Metadata } from "next";

type ERC721Metadata = {
    name: string;
    description: string;
    image: string;
};

export default async function GalleryPage() {
    const tokenURIs = await retrieveTokenURIs();
    const ipfsData = await getAllIPFSData(tokenURIs);

    // I accidently added a "data" field to the IPFS data, so I need to extract it
    const extractDataFields = ipfsData
        .filter((item) => Boolean(item)) // filter out undefined items
        .map((item) => (item.data ? item.data : item)) as ERC721Metadata[];

    return <Gallery galleryData={extractDataFields} />;
}

export const metadata: Metadata = {
    title: "Mintmate - Gallery",
    description: "Mintmate gallery page, you can explore showcased nft on our gallery."
};

export const dynamic = "force-dynamic";
