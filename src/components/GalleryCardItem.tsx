import { client } from "@/lib";
import { MediaRenderer } from "thirdweb/react";

interface Props {
    name: string;
    description: string;
    image: string;
}

export function GalleryCardItem(props: Props) {
    return (
        <article className="flex flex-col">
            {/* image placeholder */}
            <div className="h-72 w-full min-w-[320px] rounded-t bg-neutral-200 p-4">
                <MediaRenderer
                    client={client}
                    src={props.image}
                    className="mx-auto h-full object-contain"
                />
            </div>
            {/* card content */}
            <div className="mt-1 rounded-b bg-neutral-900">
                <div className="flex flex-col p-3">
                    <h3 className="text-base font-semibold text-white">{props.name}</h3>
                    <p className="line-clamp-2 h-[40px] text-sm text-neutral-400">
                        {props.description}
                    </p>
                </div>
            </div>
        </article>
    );
}
