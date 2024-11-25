type ERC721Metadata = {
    name: string;
    description: string;
    image: string;
};

export function isERC721Metadata(item: unknown): item is ERC721Metadata {
    return (
        typeof item === "object" &&
        item !== null &&
        "name" in item &&
        "description" in item &&
        "image" in item &&
        typeof (item as ERC721Metadata).name === "string" &&
        typeof (item as ERC721Metadata).description === "string" &&
        typeof (item as ERC721Metadata).image === "string"
    );
}
