import { Gallery } from "@/components";
import { getAllIPFSData, retrieveTokenURIs } from "@/lib";
import { isERC721Metadata } from "@/lib/erc721";
import { type Metadata } from "next";

export default async function GalleryPage() {
    const tokenURIs = await retrieveTokenURIs();
    const ipfsData = await getAllIPFSData(tokenURIs);

    const extractDataFields = ipfsData
        .filter((item) => Boolean(item)) // filter out undefined items
        .map((item) => (item.data ? item.data : item)) // I accidently added a "data" field to the IPFS data, so I need to extract it
        .filter((item) => isERC721Metadata(item));

    return <Gallery galleryData={extractDataFields} />;
}

export const metadata: Metadata = {
    title: "Mintmate - Gallery",
    description: "Mintmate gallery page, you can explore showcased nft on our gallery."
};

export const dynamic = "force-dynamic";
