"use client";

import { client, truncateAddress } from "@/lib";
import { MediaRenderer, useActiveAccount } from "thirdweb/react";

interface Props {
    name: string;
    description: string;
    externalURL: string;
    transactionHash: string;
    ipfsURI: string;
}

export function MintedNFTCard(props: Props) {
    const account = useActiveAccount();

    return (
        <div className="mx-auto mt-12 max-w-[350px]">
            <article className="flex flex-col">
                {/* image placeholder */}
                <div className="h-72 w-full min-w-[320px] rounded-t bg-neutral-200 p-4">
                    <MediaRenderer
                        client={client}
                        src={props.ipfsURI}
                        className="mx-auto h-full object-contain"
                    />
                </div>
                {/* card content */}
                <div className="mt-1 rounded-b bg-neutral-900">
                    <div className="flex flex-col p-4">
                        {account && (
                            <div className="mb-3 flex max-w-fit items-center justify-center gap-2 rounded-full border border-neutral-700 bg-neutral-800 px-3 py-1 text-sm">
                                <div className="size-4 rounded-full bg-gradient-to-t from-fuchsia-500 to-rose-400" />
                                <p className="text-xs text-white">
                                    {truncateAddress(account.address)}
                                </p>
                            </div>
                        )}
                        <h3 className="text-base font-semibold text-white">{props.name}</h3>
                        <p className="line-clamp-2 h-[40px] text-sm text-neutral-400">
                            {props.description}
                        </p>
                        <p className="mt-3 text-xs text-neutral-400">
                            Transaction Hash:{" "}
                            <span className="text-white underline underline-offset-2">
                                {truncateAddress(props.transactionHash)}
                            </span>
                        </p>
                    </div>
                </div>
            </article>
        </div>
    );
}
