import { type Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
    title: "Mintmate - Upload NFT",
    description: "Mintmate upload page, you can upload your nft to mint."
};

// This layout is specifically created to provide metadata for the upload page
export default function Layout({ children }: PropsWithChildren) {
    return <>{children}</>;
}
