import { InputField } from "@/components";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
    return (
        <main className="mx-auto flex max-w-screen-lg flex-col px-2 md:px-4">
            <header className="mt-[100px] flex items-center justify-between">
                <h2 className="text-2xl font-bold md:text-3xl">Gallery</h2>
                <div className="w-full max-w-[300px]">
                    <InputField color="secondary" placeholder="Browse NFT..." />
                </div>
            </header>
            {children}
        </main>
    );
}
