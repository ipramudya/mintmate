import { readContract } from "thirdweb";
import { contract } from "./thirdweb";

/**
 * Retrieves all token URIs in the contract.
 *
 * @returns {Promise<string[]>} Promise that resolves to an array of token URIs.
 */
export async function retrieveTokenURIs(): Promise<string[]> {
    // Retrieve the total number of token IDs in the contract.
    const totalTokenIDs = await readContract({
        contract,
        method: "function _tokenIdCounter() view returns (uint256)",
        params: []
    });

    // Create an array of promises to read the token URI for each token ID.
    // This is done in parallel using `Promise.all`, so it should be faster
    // than calling `readContract` sequentially.
    const readContractsPromises = [];
    for (let index = 0; index < Number(totalTokenIDs) - 1; index++) {
        readContractsPromises.push(
            readContract({
                contract,
                method: "function tokenURI(uint256 tokenId) view returns (string)",
                params: [BigInt(index)]
            })
        );
    }

    // Wait for all the promises to resolve.
    // `Promise.all` will return an array of resolved values, which in this
    // case will be an array of token URIs.
    return await Promise.all(readContractsPromises);
}
