import Link from "next/link";

export default function NotFound() {
    return (
        <div className="absolute left-0 top-0 flex h-dvh w-dvw flex-col items-center justify-center gap-3">
            <h1 className="text-2xl font-semibold text-neutral-900">Not Found</h1>
            <p className="text-sm text-neutral-700">
                Resource could not be found,{" "}
                <Link href="/" className="text-sm text-blue-700">
                    click here to back to homepage
                </Link>
            </p>
        </div>
    );
}
