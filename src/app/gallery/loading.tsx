export default function Loading() {
    return (
        <section className="mt-10 grid gap-2 pb-10 sm:grid-cols-2 md:grid-cols-3 md:gap-4">
            {Array.from({ length: 10 }).map((_, index) => (
                <div
                    key={`gallery-${index}`}
                    className="h-72 w-full animate-pulse rounded-t bg-neutral-200"
                ></div>
            ))}
        </section>
    );
}
