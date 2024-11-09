export async function checkIPFSUri(uri: string): Promise<boolean> {
    try {
        if (!uri.startsWith("ipfs://")) return false;

        uri = uri.replace("ipfs://", "https://ipfs.io/ipfs/");
        const response = await fetch(uri);

        return response.ok;
    } catch (error) {
        console.error("Error fetching IPFS file", error);
        return false;
    }
}
