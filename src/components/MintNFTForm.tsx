"use client";

import { Button, InputField, InputLabel, Textarea } from "@/components";
import { client, contract, contractAddress } from "@/lib";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { upload } from "thirdweb/storage";

type InputFields = {
    name: string;
    description: string;
    externalURL: string;
};

interface Props {
    ipfsURI: string;
    originalURI: string;
}

export function MintNFTForm({ ipfsURI, originalURI }: Props) {
    const router = useRouter();
    const { mutate: transact, isPending } = useSendTransaction({
        payModal: {
            theme: "dark"
        }
    });

    useEffect(() => {
        console.log({ isPending });
    }, [isPending]);

    async function uploadMetadataToIPFS({
        name,
        description,
        externalURL
    }: InputFields): Promise<string> {
        const filename = name.split(" ").join("-") + "_metadata.json";
        const metadataURI = await upload({
            client,
            files: [
                {
                    name: filename,
                    type: "application/json",
                    data: {
                        name,
                        description,
                        externalURL,
                        image: ipfsURI
                    }
                }
            ],
            uploadWithoutDirectory: true
        });

        return metadataURI;
    }

    async function mintNFT(metadataURI: string) {
        const transaction = prepareContractCall({
            contract,
            method: "function mintNFT(address recipient, string tokenURI) returns (uint256)",
            params: [contractAddress, metadataURI]
        });

        transact(transaction, {
            onSuccess: (data) => {
                router.push(
                    `/mint/nft/completed?uri=${originalURI}&transactionHash=${data.transactionHash}`
                );
            },
            onError(error) {
                toast.error(error.message);
            }
        });
    }

    const form = useForm<InputFields>();

    const handleSubmit = form.handleSubmit(async (data) => {
        const metadataURI = await uploadMetadataToIPFS(data);
        await mintNFT(metadataURI);
    });

    return (
        <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
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
