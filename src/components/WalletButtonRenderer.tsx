"use client";

import { client, truncateAddress } from "@/lib";
import { useMemo } from "react";
import { sepolia } from "thirdweb/chains";
import {
    useActiveAccount,
    useAutoConnect,
    useConnectedWallets,
    useConnectModal,
    useWalletDetailsModal
} from "thirdweb/react";
import { Button } from "./Button";

export function WalletButtonRenderer() {
    const account = useActiveAccount();
    const wallets = useConnectedWallets();
    const { isLoading } = useAutoConnect({
        client,
        wallets
    });

    // Render skeleton until autoConnect successfully getting its data
    if (isLoading)
        return <div className="h-9 w-[100px] animate-pulse rounded-full bg-neutral-200 p-2" />;

    return account ? <WalletProfileButton /> : <ConnectButton />;
}

function ConnectButton() {
    const { connect, isConnecting } = useConnectModal();

    async function handleConnect() {
        await connect({
            client,
            chain: sepolia
        });
    }

    return (
        <Button loading={isConnecting} onClick={handleConnect}>
            Connect
        </Button>
    );
}

function WalletProfileButton() {
    const detailsModal = useWalletDetailsModal();
    const activeAccount = useActiveAccount();

    function handleOpenWalletDetails() {
        detailsModal.open({ client, theme: "dark" });
    }

    const buttonText = useMemo(() => {
        if (!activeAccount) return "Please wait";

        const truncatedAddr = truncateAddress(activeAccount.address);
        return truncatedAddr;
    }, [activeAccount]);

    return (
        <Button onClick={handleOpenWalletDetails} color="white">
            <div className="size-4 rounded-full bg-gradient-to-t from-fuchsia-500 to-rose-400" />
            <span className="font-normal text-inherit">{buttonText}</span>
        </Button>
    );
}
