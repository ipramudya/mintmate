export function encodeBase64(str: string): string {
    // Create a new TextEncoder
    const encoder = new TextEncoder();

    // Encode the string as a Uint8Array
    const data = encoder.encode(str);

    // Convert to Base64
    return btoa(String.fromCharCode(...data));
}

// Function to decode a Base64 string
export function decodeBase64(str: string): string {
    // Decode the Base64 string
    const decodedData = atob(str);

    // Create an array of byte numbers
    const byteNumbers = new Array(decodedData.length);

    // Populate the array with byte numbers
    for (let i = 0; i < decodedData.length; i++) {
        byteNumbers[i] = decodedData.charCodeAt(i);
    }

    // Create a Uint8Array from the byte numbers
    const byteArray = new Uint8Array(byteNumbers);

    // Create a new TextDecoder
    const decoder = new TextDecoder();

    // Decode the Uint8Array back to a string
    return decoder.decode(byteArray);
}
