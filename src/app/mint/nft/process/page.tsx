import { IPFSImageUploaded, MintNFTForm } from "@/components";
import { checkIPFSUri, decodeBase64 } from "@/lib";
import { Metadata } from "next";
import { redirect } from "next/navigation";

const REDIRECT_URL = "/mint/nft/upload";

export default async function ProcessingPage({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    const uri = (await searchParams).uri;
    if (!uri) redirect(REDIRECT_URL);

    const decodedURI = decodeBase64(uri);
    const isValidIPFS = await checkIPFSUri(decodedURI);

    if (!isValidIPFS) redirect(REDIRECT_URL);

    return (
        <div className="mx-auto flex w-full max-w-screen-lg">
            <div className="mb-8 grid w-full grid-cols-1 gap-6 md:grid-cols-2">
                <IPFSImageUploaded ipfsURI={decodedURI} />
                <MintNFTForm ipfsURI={decodedURI} originalURI={uri} />
            </div>
        </div>
    );
}

export const metadata: Metadata = {
    title: "Mintmate - Process NFT",
    description: "Mintmate process page, you can process your nft to mint."
};
