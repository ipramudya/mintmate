export function truncateAddress(
    address: string,
    frontChars: number = 6,
    endChars: number = 4
): string {
    if (address.length <= frontChars + endChars) return address;
    return `${address.slice(0, frontChars)}...${address.slice(-endChars)}`;
}
