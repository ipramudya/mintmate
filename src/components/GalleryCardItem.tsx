interface Props {
    name: string;
    description: string;
    imageSrc: string;
}

export function GalleryCardItem(props: Props) {
    return (
        <article className="flex flex-col">
            {/* image placeholder */}
            <div className="h-72 w-full rounded-t bg-neutral-200"></div>
            {/* card content */}
            <div className="mt-1 rounded-b bg-neutral-900">
                <div className="flex flex-col p-3">
                    <h3 className="text-base font-semibold text-white">{props.name}</h3>
                    <p className="line-clamp-2 min-h-[48px] text-sm text-neutral-400">
                        {props.description}
                    </p>
                </div>
            </div>
        </article>
    );
}
