/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Checks if the given IPFS URI is valid and the data is available.
 *
 * @param {string} uri The IPFS URI to check.
 * @returns {Promise<boolean>} True if the URI is valid and the data is available.
 */
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

/**
 * Fetches the data from the given IPFS URIs and returns the results.
 *
 * @param {string[]} ipfsURIs The IPFS URIs to fetch data from.
 * @returns {Promise<any[]>} An array of data fetched from the IPFS URIs.
 */
export async function getAllIPFSData(ipfsURIs: string[]): Promise<any[]> {
    const remappedURIs = [];

    for (const uri of ipfsURIs) {
        if (uri.startsWith("ipfs://")) {
            remappedURIs.push(uri.replace("ipfs://", "https://ipfs.io/ipfs/"));
        } else {
            continue;
        }
    }

    // fetch the data from each URI and wait for all the promises to resolve
    const responses = await Promise.all(
        remappedURIs.map(async (uri) => {
            try {
                const response = await fetch(uri);

                // Check if response is successful
                if (response.ok) {
                    const contentType = response.headers.get("content-type") || "";
                    return contentType.includes("application/json")
                        ? response.json()
                        : response.text();
                }
            } catch (error) {
                console.error(`Failed to fetch data from ${uri}:`, error);
            }
        })
    );

    return responses;
}
