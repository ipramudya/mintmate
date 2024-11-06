interface Props {
    name: string;
    description: string;
    price: string;
    imageSrc: string;
}

export function GalleryCardItem(props: Props) {
    return (
        <article className="flex flex-col">
            {/* image placeholder */}
            <div className="h-72 w-full rounded-t-lg bg-neutral-200"></div>
            {/* card content */}
            <div className="mt-1 rounded-b-lg bg-neutral-900">
                <div className="flex flex-col p-3">
                    <h3 className="text-base font-semibold text-white">{props.name}</h3>
                    <p className="line-clamp-1 text-sm text-neutral-400">{props.description}</p>
                    <p className="mt-4 text-sm font-semibold text-white">{props.price} ETH</p>
                </div>
            </div>
        </article>
    );
}
