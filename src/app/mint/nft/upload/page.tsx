"use client";

import { Button, Icon } from "@/components";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone, type DropzoneOptions, type FileRejection } from "react-dropzone";
import { toast } from "sonner";

type FileWithPreview = File & { preview: string };

// const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB in bytes
const MAX_FILE_SIZE = 100 * 1024; // 20MB in bytes
const DROPZONE_OPTIONS: DropzoneOptions = {
    maxSize: MAX_FILE_SIZE,
    multiple: false,
    maxFiles: 1,
    accept: {
        "image/svg+xml": [".svg"],
        "image/png": [".png"],
        "image/jpeg": [".jpg", ".jpeg"],
        "image/gif": [".gif"],
        "video/mp4": [".mp4"]
    }
};

export default function UploadPage() {
    const [files, setFiles] = useState<FileWithPreview[]>([]);

    const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
        if (acceptedFiles.length > 0) {
            setFiles(
                acceptedFiles.map((file) => {
                    // Create a preview URL for the uploaded file
                    // This is a temporary URL that will be revoked when the component is unmounted
                    const preview = URL.createObjectURL(file);

                    // Return a copy of the file with the preview URL
                    return Object.assign(file, { preview });
                })
            );
        }

        // Alert every-single file, and errors if any
        if (fileRejections.length > 0) {
            fileRejections.forEach((file) => {
                file.errors.forEach((error) => {
                    toast.error(error.message);
                });
            });
        }
    }, []);

    const { getRootProps, getInputProps, open } = useDropzone({
        ...DROPZONE_OPTIONS,
        onDrop
    });

    useEffect(() => {
        // Revoke the object URL when the component unmounts or files state changes.
        // This is necessary to prevent memory leaks.
        return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        <div className="mx-auto flex w-full max-w-[500px] flex-col">
            {/* dropzone wrapper */}
            <div
                {...getRootProps({
                    className:
                        "flex h-[500px] items-center justify-center rounded-lg border border-dashed border-neutral-300 bg-neutral-50 p-10"
                })}
            >
                <input {...getInputProps()} />
                {files.length > 0 ? (
                    <div className="relative h-full w-full overflow-hidden">
                        <Image src={files[0].preview} alt="preview" objectFit="contain" fill />
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <Icon.Upload width={32} height={32} className="text-neutral-600" />
                        <p className="mt-2 text-sm">
                            <strong className="text-inherit">Click the box</strong> or drag and drop
                        </p>
                        <p className="text-sm">SVG, PNG, JPG, GIF or MP4 (max. 20MB)</p>
                    </div>
                )}
            </div>
            <div className="mt-4 flex items-center gap-4">
                {/* choose another file button */}
                {files.length > 0 && (
                    <Button onClick={open} dimensions="lg" color="white" className="rounded-lg">
                        <Icon.Refresh strokeWidth={3} />
                    </Button>
                )}
                <Button dimensions="lg" className="w-full rounded-lg" disabled>
                    Upload
                </Button>
            </div>
        </div>
    );
}
