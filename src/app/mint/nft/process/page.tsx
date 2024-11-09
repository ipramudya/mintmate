import { Button, Icon, InputField, InputLabel, Textarea } from "@/components";
import { decodeBase64 } from "@/lib";

export default async function ProcessingPage({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    const uri = (await searchParams).uri;

    if (uri) {
        const decodedUri = decodeBase64(uri);
        console.log({ decodedUri });
    }

    return (
        <div className="mx-auto flex w-full max-w-screen-lg">
            <div className="grid w-full grid-cols-2 gap-6">
                {/* IPFS image uploading */}
                <div className="h-full w-full rounded-lg border border-neutral-300 p-4">
                    {/* IPFS badge */}
                    <div className="flex w-fit items-center space-x-2 rounded-full bg-neutral-100 px-3 py-1 text-blue-600">
                        <Icon.Blockchain className="text-inherit" />
                        <p className="text-xs font-semibold text-inherit">Uploaded to IPFS</p>
                    </div>
                </div>
                <form className="flex flex-col space-y-6">
                    <div className="space-y-2">
                        <InputLabel aria-required htmlFor="name">
                            Name
                        </InputLabel>
                        <InputField
                            dimensions="lg"
                            id="name"
                            required
                            placeholder="eg. Adorable Yellow Dinosaur"
                        />
                    </div>
                    <div className="space-y-2">
                        <InputLabel aria-required htmlFor="description">
                            Description
                        </InputLabel>
                        <Textarea
                            dimensions="lg"
                            className="min-h-[200px] resize-none"
                            id="description"
                            placeholder="What's your description?"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <InputLabel htmlFor="external URL">External URL</InputLabel>
                        <InputField
                            dimensions="lg"
                            id="external URL"
                            placeholder="eg. https://example.com"
                        />
                    </div>
                    <Button dimensions="lg" disabled>
                        Mint NFT
                    </Button>
                </form>
            </div>
        </div>
    );
}
