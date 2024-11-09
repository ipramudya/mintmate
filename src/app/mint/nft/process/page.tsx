import { IPFSImageUploaded, MintNFTForm } from "@/components";
import { checkIPFSUri, decodeBase64 } from "@/lib";
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
            <div className="grid w-full grid-cols-2 gap-6">
                <IPFSImageUploaded ipfsURI={decodedURI} />
                <MintNFTForm ipfsURI={decodedURI} />
            </div>
        </div>
    );
}
