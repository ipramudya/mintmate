import { Button, Icon } from "@/components";

export default function UploadPage() {
    return (
        <div className="mx-auto flex w-full max-w-[500px] flex-col">
            {/* dropzone wrapper */}
            <div className="flex h-[500px] items-center justify-center rounded-lg border border-dashed border-neutral-300 bg-neutral-50 p-4">
                <div className="flex flex-col items-center">
                    <Icon.Upload width={32} height={32} className="text-neutral-600" />
                    <p className="mt-2 text-sm">
                        <strong className="text-inherit">Click to upload</strong> or drag and drop
                    </p>
                    <p className="text-sm">SVG, PNG, JPG, GIF or MP4 (max. 20MB)</p>
                </div>
            </div>
            <Button dimensions="lg" className="mt-4 rounded-lg" disabled>
                Upload
            </Button>
        </div>
    );
}
