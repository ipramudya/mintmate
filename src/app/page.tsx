import { InputField, InputLabel } from "@/components";

export default function Home() {
    return (
        <div className="flex h-screen w-screen items-center justify-center">
            <div className="flex w-full max-w-[300px] flex-col gap-2">
                <InputLabel htmlFor="input" aria-required>
                    Input Label
                </InputLabel>
                <InputField required id="input" placeholder="eg. hello world" />
            </div>
        </div>
    );
}
