import { useState } from "react";
import { ImageWithText } from "@/types/service/main";

export const useImages = () => {
    const [images, setImages] = useState<ImageWithText[]>([]);
  
    const addImages = (newFiles: File[]) => {
      const newImages = newFiles.map((file) => ({
        file,
        text: "", // Default empty text for each image
      }));
      setImages((prevImages) => [...prevImages, ...newImages]);
    };
  
    const removeImage = (index: number) => {
      setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };
  
    const updateImageText = (index: number, newText: string) => {
      setImages((prevImages) =>
        prevImages.map((image, i) =>
          i === index ? { ...image, text: newText } : image
        )
      );
    };
  
    return {
      images,
      setImages,
      addImages,
      removeImage,
      updateImageText,
    };
  };