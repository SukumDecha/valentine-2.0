"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { uploadFiles } from "@/services/upload.service";
import { useImages } from "@/hooks/use-images";
import { validateFiles } from "@/utils/image-validator.util";


export default function UploadImage({url_slug} : {url_slug:string}) {
    const { images, addImages, removeImage, setImages } = useImages();
    const [uploadStatus, setUploadStatus] = useState({
        isUploading: false,
        error: null as string | null,
        success: false,
    });

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const newFiles = Array.from(files);
            const validationError = validateFiles(newFiles);

            if (validationError) {
                setUploadStatus((prev) => ({ ...prev, error: validationError }));
                return;
            }
            addImages(newFiles);
            setUploadStatus((prev) => ({ ...prev, error: null }));
        }
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (images.length === 0) {
            setUploadStatus((prev) => ({
                ...prev,
                error: "Please select at least one image to upload.",
            }));
            return;
        }
        setUploadStatus({ isUploading: true, error: null, success: false });

        try {
            const response = await uploadFiles(url_slug,images);
            if (response.success) {
                setUploadStatus({ isUploading: false, error: null, success: true });
                setImages([]);
            }
        } catch (error: any) {
            setUploadStatus({
                isUploading: false,
                error: error.message || "Failed to upload images. Please try again.",
                success: false,
            });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-4 p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-md">
                <label className="block text-xl font-semibold text-gray-700">
                    Upload Images
                </label>

                {/* File input */}
                <div className="mt-2">
                    <input
                        type="file"
                        accept="image/jpeg,image/png,image/gif"
                        onChange={handleImageChange}
                        multiple
                        className="w-full p-2 border border-gray-300 rounded-md"
                        disabled={uploadStatus.isUploading}
                    />
                    <p className="mt-1 text-sm text-gray-300">
                        Supported formats: JPEG, PNG, GIF (max 5MB per file)
                    </p>
                </div>

                {/* Status Messages */}
                {uploadStatus.error && (
                    <div className="mt-3 p-2 text-red-500 bg-red-50 rounded-md">
                        {uploadStatus.error}
                    </div>
                )}
                {uploadStatus.success && (
                    <div className="mt-3 p-2 text-green-500 bg-green-50 rounded-md">
                        Images uploaded successfully!
                    </div>
                )}

                {/* Display selected images */}
                <div className="mt-3 grid grid-cols-3 gap-4">
                    {images.map((image, index) => (
                        <div key={index} className="relative">
                            <img
                                src={URL.createObjectURL(image)}
                                alt={`Upload Preview ${index + 1}`}
                                className="w-full h-32 object-cover rounded-md"
                            />
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                                disabled={uploadStatus.isUploading}
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={uploadStatus.isUploading || images.length === 0}
                    className={`mt-4 w-full px-6 py-2 text-white font-semibold rounded-md
                        ${uploadStatus.isUploading || images.length === 0
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                        }`}
                >
                    {uploadStatus.isUploading ? "Uploading..." : "Upload Images"}
                </button>
            </form>
        </div>
    );
}
