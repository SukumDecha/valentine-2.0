"use client"
import { useState, ChangeEvent, FormEvent } from 'react';
import { uploadFiles } from '@/services/upload.service';

interface UploadStatus {
    isUploading: boolean;
    error: string | null;
    success: boolean;
}

export default function ImageUpload() {
    const [images, setImages] = useState<File[]>([]);
    const [uploadStatus, setUploadStatus] = useState<UploadStatus>({
        isUploading: false,
        error: null,
        success: false
    });

    const validateFiles = (files: File[]): string | null => {
        const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
        const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

        for (const file of files) {
            if (!ALLOWED_TYPES.includes(file.type)) {
                return `File "${file.name}" is not a supported image type. Please use JPEG, PNG, or GIF.`;
            }
            if (file.size > MAX_FILE_SIZE) {
                return `File "${file.name}" exceeds 5MB size limit.`;
            }
        }
        return null;
    };

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const newFiles = Array.from(files);
            const validationError = validateFiles(newFiles);
            
            if (validationError) {
                setUploadStatus(prev => ({ ...prev, error: validationError }));
                return;
            }

            setImages(prevImages => [...prevImages, ...newFiles]);
            setUploadStatus(prev => ({ ...prev, error: null }));
        }
    };

    const handleRemoveImage = (index: number) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index));
        // Reset status when all images are removed
        if (images.length === 1) {
            setUploadStatus({ isUploading: false, error: null, success: false });
        }
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        
        if (images.length === 0) {
            setUploadStatus(prev => ({
                ...prev,
                error: 'Please select at least one image to upload.'
            }));
            return;
        }

        setUploadStatus({ isUploading: true, error: null, success: false });

        try {
            const response = await uploadFiles(images);
            if (response.success) {
                setUploadStatus({
                    isUploading: false,
                    error: null,
                    success: true
                });
                setImages([]);
            }
        } catch (error: any) {
            setUploadStatus({
                isUploading: false,
                error: error.message || 'Failed to upload images. Please try again.',
                success: false
            });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-4 p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-md">
                <label className="block text-xl font-semibold text-gray-700">Upload Images</label>

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
                    <p className="mt-1 text-sm text-gray-500">
                        Supported formats: JPEG, PNG, GIF (max 5MB per file)
                    </p>
                </div>

                {/* Status Messages */}
                {uploadStatus.error && (
                    <div className="mt-2 p-2 text-red-500 bg-red-50 rounded-md">
                        {uploadStatus.error}
                    </div>
                )}
                {uploadStatus.success && (
                    <div className="mt-2 p-2 text-green-500 bg-green-50 rounded-md">
                        Images uploaded successfully!
                    </div>
                )}

                {/* Display selected images */}
                <div className="mt-4 grid grid-cols-3 gap-4">
                    {images.map((image, index) => (
                        <div key={index} className="relative">
                            <img
                                src={URL.createObjectURL(image)}
                                alt={`Upload Preview ${index + 1}`}
                                className="w-full h-32 object-cover rounded-md"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveImage(index)}
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
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                >
                    {uploadStatus.isUploading ? 'Uploading...' : 'Upload Images'}
                </button>
            </form>
        </div>
    );
}