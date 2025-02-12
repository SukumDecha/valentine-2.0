import VinylService from '@/services/vinyl.service';
import { IVinyl } from '@/types/vinyl/vinyl';
import { useState, useCallback } from 'react';

interface PreviewImage extends IVinyl {
  id: string;
  preview: string;
}

interface UseImageUpload {
  images: PreviewImage[];
  isUploading: boolean;
  error: string | null;
  success: string | null;
  addImages: (files: FileList) => void;
  removeImage: (id: string) => void;
  updateImageText: (id: string, text: string) => void;
  uploadImages: () => Promise<void>;
  clearSuccess: () => void;
}

export const useImageUpload = (uuid: string): UseImageUpload => {
  const [images, setImages] = useState<PreviewImage[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const addImages = useCallback((files: FileList) => {
    const newImages: PreviewImage[] = Array.from(files).map(file => ({
      id: `${file.name}-${Date.now()}`,
      file,
      text: '',
      preview: URL.createObjectURL(file)
    }));

    setImages(prev => [...prev, ...newImages]);
    setError(null);
    setSuccess(null);
  }, []);

  const removeImage = useCallback((id: string) => {
    setImages(prev => {
      const filtered = prev.filter(img => img.id !== id);
      const removedImage = prev.find(img => img.id === id);
      if (removedImage) {
        URL.revokeObjectURL(removedImage.preview);
      }
      return filtered;
    });
  }, []);

  const updateImageText = useCallback((id: string, text: string) => {
    setImages(prev =>
      prev.map(img =>
        img.id === id ? { ...img, text } : img
      )
    );
  }, []);

  const clearSuccess = useCallback(() => {
    setSuccess(null);
  }, []);

  const uploadImages = async () => {
    if (images.length === 0) {
      setError('Please add at least one image');
      return;
    }

    setIsUploading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await VinylService.uploadVinyls(uuid, images);
      if (response.success) {
        images.forEach(img => URL.revokeObjectURL(img.preview));
        setImages([]);
        setSuccess('Images uploaded successfully!');
        // Auto-clear success message after 5 seconds
        setTimeout(() => setSuccess(null), 5000);
      } else {
        setError(response.message || 'Upload failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload images');
    } finally {
      setIsUploading(false);
    }
  };

  return {
    images,
    isUploading,
    error,
    success,
    addImages,
    removeImage,
    updateImageText,
    uploadImages,
    clearSuccess
  };
};