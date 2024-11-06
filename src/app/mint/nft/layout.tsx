import { MintStepper } from "@/components";
import { type PropsWithChildren } from "react";

export default function MintNFTLayout({ children }: PropsWithChildren) {
    return (
        <div className="mx-auto flex max-w-screen-lg flex-col px-2 md:px-4">
            {/* stepper */}
            <div className="my-[100px] flex items-center justify-center">
                <MintStepper />
            </div>
            {children}
        </div>
    );
}
