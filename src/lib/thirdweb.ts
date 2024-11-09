import { createThirdwebClient, getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";

const secretKey = process.env.THIRDWEB_SECRET_KEY;
const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID as string;

/**
 * Creates a new instance of the thirdweb client, using the environment variables
 * for the client id and secret key.
 */
export const client = createThirdwebClient(secretKey ? { secretKey } : { clientId });

/**
 * The instance of the thirdweb contract, using the client instance, the contract
 * address from the environment variable, and the sepolia chain.
 */
export const contract = getContract({
    client,
    chain: sepolia,
    address: process.env.NEXT_PUBLIC_SEPOLIA_CONTRACT_ADDRESS as string
});
