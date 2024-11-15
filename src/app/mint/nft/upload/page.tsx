"use client";

import { Button, Icon } from "@/components";
import { client, encodeBase64 } from "@/lib";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDropzone, type DropzoneOptions, type FileRejection } from "react-dropzone";
import { HashLoader } from "react-spinners";
import { toast } from "sonner";
import { upload } from "thirdweb/storage";

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB in bytes
const DROPZONE_OPTIONS: DropzoneOptions = {
    maxSize: MAX_FILE_SIZE,
    multiple: false,
    maxFiles: 1,
    accept: {
        "image/svg+xml": [".svg"],
        "image/png": [".png"],
        "image/jpeg": [".jpg", ".jpeg"],
        "image/gif": [".gif"]
    }
};

export default function UploadPage() {
    const router = useRouter();
    const [assetObjectURL, setAssetObjectURL] = useState<string>("");
    const [uploading, setUploading] = useState(false);

    const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];

            // Create a preview URL for the uploaded file
            // This is a temporary URL that will be revoked when the component is unmounted
            const preview = URL.createObjectURL(file);
            setAssetObjectURL(preview);
        }

        // Alert every-single file for error its may occur
        if (fileRejections.length > 0) {
            fileRejections.forEach((file) => {
                file.errors.forEach((error) => {
                    toast.error(error.message);
                });
            });
        }
    }, []);

    const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
        ...DROPZONE_OPTIONS,
        onDrop
    });

    useEffect(() => {
        // Revoke the object URL when the component unmounts or files state changes.
        // This is necessary to prevent memory leaks.
        return () => URL.revokeObjectURL(assetObjectURL);
    }, [assetObjectURL]);

    async function handleUpload() {
        if (!assetObjectURL && acceptedFiles.length === 0) return;

        setUploading(true);
        let uri = "";
        try {
            uri = await upload({
                client,
                files: [acceptedFiles[0]], // Refer to the acceptedFiles directly from dropzone
                uploadWithoutDirectory: true
            });
        } catch (error) {
            toast.error("Error uploading file to IPFS, detail: " + error);
        } finally {
            setUploading(false);
        }

        if (uri) {
            const uriEncoded = encodeBase64(uri);
            router.push(`/mint/nft/process?uri=${uriEncoded}`);
        }
    }

    if (uploading) {
        return (
            <div className="mx-auto flex w-full max-w-[400px] flex-col items-center text-center">
                <div className="mb-4">
                    <HashLoader size={48} color="#3b82f6" />
                </div>
                <h2 className="text-2xl font-bold md:text-3xl">Uploading media to IPFS</h2>
                <p className="mt-2 text-sm text-neutral-700 md:text-base">Please wait...</p>
            </div>
        );
    }

    return (
        <div className="mx-auto flex w-full max-w-[500px] flex-col">
            {/* dropzone wrapper */}
            <div
                {...getRootProps({
                    className:
                        "flex h-[500px] items-center justify-center rounded-lg border border-dashed border-neutral-300 bg-neutral-50 p-10"
                })}
            >
                {/* Dropzone input holder */}
                <input {...getInputProps()} />
                {assetObjectURL.length > 0 ? (
                    <div className="relative h-full w-full overflow-hidden">
                        <Image src={assetObjectURL} alt="preview" className="object-contain" fill />
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <Icon.Upload width={32} height={32} className="text-neutral-600" />
                        <p className="mt-2 text-sm">
                            <strong className="text-inherit">Click the box</strong> or drag and drop
                        </p>
                        <p className="text-sm">SVG, PNG, JPG, or GIF (max. 20MB)</p>
                    </div>
                )}
            </div>
            <div className="mt-4 flex items-center gap-4">
                {/* choose another file button */}
                {assetObjectURL.length > 0 && (
                    <Button onClick={open} dimensions="lg" color="white" className="rounded-lg">
                        <Icon.Refresh strokeWidth={3} />
                    </Button>
                )}
                <Button
                    dimensions="lg"
                    className="w-full rounded-lg"
                    disabled={assetObjectURL.length === 0}
                    onClick={handleUpload}
                    loading={uploading}
                >
                    Upload
                </Button>
            </div>
        </div>
    );
}
