"use client";

import { Button, InputField, InputLabel, Textarea } from "@/components";
import { client, contract, contractAddress, encodeBase64 } from "@/lib";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { HashLoader } from "react-spinners";
import { toast } from "sonner";
import { prepareContractCall } from "thirdweb";
import { useSendAndConfirmTransaction } from "thirdweb/react";
import { upload } from "thirdweb/storage";

type FormFields = {
    name: string;
    description: string;
    externalURL: string;
};

type MintingResult = FormFields & {
    transactionHash: string;
};

interface Props {
    ipfsURI: string;
    originalURI: string;
}

export function MintNFTForm({ ipfsURI, originalURI }: Props) {
    const router = useRouter();
    const { mutate: transactAndConfirm, isPending } = useSendAndConfirmTransaction();

    /**
     * Uploads the metadata to IPFS, and returns the URI of the uploaded file.
     *
     * @param {FormFields} formData - The form data to upload.
     * @returns {Promise<string>} The URI of the uploaded file.
     */
    async function uploadMetadataToIPFS({
        name,
        description,
        externalURL
    }: FormFields): Promise<string> {
        // Upload the metadata to IPFS, and return the URI of the uploaded file.
        // The `uploadWithoutDirectory` option is set to true, so
        // that the file is uploaded directly to the root of the IPFS host.
        const metadataURI = await upload({
            client,
            files: [
                {
                    name,
                    description,
                    externalURL,
                    // The image is the IPFS URI passed as a prop.
                    // This is the URI of the image that was previously uploaded.
                    image: ipfsURI
                }
            ],
            uploadWithoutDirectory: true
        });

        return metadataURI;
    }

    /**
     * Mints a new NFT on the contract with the given metadata URI.
     *
     * @param {string} metadataURI - The URI of the metadata file uploaded to IPFS.
     * @param {FormFields} formData - The form data (name, description, externalURL) to mint the NFT with.
     */
    async function mintNFT(metadataURI: string, formData: FormFields) {
        const transaction = prepareContractCall({
            contract,
            method: "function mintNFT(address recipient, string tokenURI) returns (uint256)",
            params: [contractAddress, metadataURI]
        });

        transactAndConfirm(transaction, {
            onSuccess: (receipt) => {
                const result: MintingResult = {
                    name: formData.name,
                    description: formData.description,
                    externalURL: formData.externalURL,
                    transactionHash: receipt.transactionHash
                };

                const encodeMintResult = encodeBase64(JSON.stringify(result));
                router.push(
                    `/mint/nft/completed?uri=${originalURI}&mintResultEncoded=${encodeMintResult}`
                );
            },
            onError(error) {
                toast.error(error.message);
            }
        });
    }

    const form = useForm<FormFields>();

    const handleSubmit = form.handleSubmit(async (formData) => {
        const metadataURI = await uploadMetadataToIPFS(formData);
        await mintNFT(metadataURI, formData);
        form.reset();
    });

    return (
        <form className="relative flex flex-col space-y-6" onSubmit={handleSubmit}>
            {isPending && (
                <div className="absolute left-1/2 top-1/2 h-[calc(100%+16px)] w-[calc(100%+16px)] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-neutral-200/10 backdrop-blur-[2px]">
                    <div className="flex h-full w-full flex-col items-center justify-center">
                        <HashLoader size={32} color="#3b82f6" />
                        <p className="mt-2 text-sm font-semibold">Minting your NFT Art</p>
                        <p className="text-sm text-neutral-500">
                            Pease wait while we&apos;re minting your art, it will be quick.
                        </p>
                    </div>
                </div>
            )}
            <div className="space-y-2">
                <InputLabel aria-required htmlFor="name">
                    Name
                </InputLabel>
                <InputField
                    dimensions="lg"
                    placeholder="eg. Adorable Yellow Dinosaur"
                    id="name"
                    {...form.register("name", { required: true })}
                />
            </div>
            <div className="space-y-2">
                <InputLabel aria-required htmlFor="description">
                    Description
                </InputLabel>
                <Textarea
                    className="min-h-[200px] resize-none"
                    dimensions="lg"
                    placeholder="What's your description?"
                    id="description"
                    {...form.register("description", { required: true })}
                />
            </div>
            <div className="space-y-2">
                <InputLabel htmlFor="externalURL">External URL</InputLabel>
                <InputField
                    dimensions="lg"
                    placeholder="eg. https://example.com"
                    id="externalURL"
                    {...form.register("externalURL")}
                />
            </div>
            <Button
                dimensions="lg"
                type="submit"
                loading={form.formState.isSubmitting}
                disabled={form.formState.isSubmitting || !form.formState.isValid}
            >
                Mint NFT
            </Button>
        </form>
    );
}

//
