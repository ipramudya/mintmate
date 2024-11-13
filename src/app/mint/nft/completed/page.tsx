import { MintedNFTCard, RemintButton } from "@/components";
import { checkIPFSUri, decodeBase64 } from "@/lib";
import { redirect } from "next/navigation";

type MintingResult = {
    name: string;
    description: string;
    externalURL: string;
    transactionHash: string;
};

const REDIRECT_URL = "/mint/nft/upload";

export default async function CompletedPage({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    const uri = (await searchParams).uri;
    const mintResultEncoded = (await searchParams).mintResultEncoded;

    if (!uri || !mintResultEncoded) redirect(REDIRECT_URL);

    const decodedURI = decodeBase64(uri);
    const isValidIPFS = await checkIPFSUri(decodedURI);

    if (!isValidIPFS) redirect(REDIRECT_URL);

    const mintResult = JSON.parse(decodeBase64(mintResultEncoded)) as MintingResult;

    return (
        <div className="mx-auto mb-8 flex w-full max-w-[500px] flex-col">
            <div className="text-center">
                <h2 className="text-2xl font-bold md:text-3xl">Congratulations</h2>
                <p className="text-sm">
                    You have crystalized your art, it will be marked for so long time.
                </p>
            </div>
            <MintedNFTCard {...mintResult} ipfsURI={decodedURI} />
            <RemintButton />
        </div>
    );
}
