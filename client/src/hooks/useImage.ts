import { useState } from "react";

export function useImages() {
    const [images, setImages] = useState<File[]>([]);

    const addImages = (newImages: File[]) => {
        setImages((prevImages) => [...prevImages, ...newImages]);
    };

    const removeImage = (index: number) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    return { images, addImages, removeImage, setImages };
}
