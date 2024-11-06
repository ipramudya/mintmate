import { Button, GalleryCardItem, Icon } from "@/components";

export default function CompletedPage() {
    return (
        <div className="mx-auto flex w-full max-w-[500px] flex-col">
            <div className="text-center">
                <h2 className="text-2xl font-bold md:text-3xl">Congratulations</h2>
                <p className="text-sm">
                    You have crystalized your art, it will be marked for so long time.
                </p>
            </div>
            <div className="mx-auto mt-12 max-w-[350px]">
                <GalleryCardItem
                    name="Ethereal Sunrise"
                    description="A beautiful sunrise captured on the Ethereum blockchain."
                    price="0.0456"
                    imageSrc=""
                />
            </div>
            <Button className="mx-auto mt-12 w-fit" disabled>
                <Icon.Refresh />
                Mint Again
            </Button>
        </div>
    );
}
