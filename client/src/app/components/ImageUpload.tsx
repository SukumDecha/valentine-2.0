"use client"
import { useState, ChangeEvent, FormEvent } from 'react';
import { uploadFiles } from '../services/upload.service';

export default function ImageUpload() {
    const [images, setImages] = useState<File[]>([]);

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            setImages((prevImages) => [...prevImages, ...Array.from(files)]);
        }
    };

    const handleRemoveImage = (index: number) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const uploadedImageReponse = await uploadFiles(images);

        if (uploadedImageReponse) {
            alert(`Images uploaded successfully! (${images.length} files)`);
            setImages([]);
        } else {
            alert('Failed to upload images');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-4 p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-md">
                <label className="block text-xl font-semibold text-gray-700">Upload Images</label>

                {/* File input */}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    multiple
                    className="mt-2 p-2 border border-gray-300 rounded-md"
                />

                {/* Display selected images */}
                <div className="mt-4 flex flex-wrap gap-4">
                    {images.length > 0 && images.map((image, index) => (
                        <div key={index} className="relative">
                            <img
                                src={URL.createObjectURL(image)}
                                alt={`Uploaded Image ${index + 1}`}
                                className="w-32 h-32 object-cover rounded-md"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                                className="absolute top-0 right-0 text-red-500 bg-white rounded-full p-1"
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                >
                    Upload
                </button>
            </form>
        </div>
    );
}
