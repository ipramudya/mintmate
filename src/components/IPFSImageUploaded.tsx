import { client } from "@/lib";
import { MediaRenderer } from "thirdweb/react";
import { Icon } from "./Icon";

interface Props {
    ipfsURI: string;
}

export function IPFSImageUploaded({ ipfsURI }: Props) {
    return (
        <div className="relative h-full w-full rounded-lg border border-neutral-300 p-4">
            {/* IPFS badge */}
            <div className="absolute left-4 top-4 z-10 flex w-fit items-center space-x-2 rounded-full bg-neutral-100/70 px-3 py-1 text-blue-600 backdrop-blur-sm">
                <Icon.Blockchain className="text-inherit" />
                <p className="text-xs font-semibold text-inherit">Uploaded to IPFS</p>
            </div>
            <MediaRenderer
                client={client}
                src={ipfsURI}
                className="mx-auto h-full object-contain"
            />
        </div>
    );
}
