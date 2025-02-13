import VinylService from '@/services/vinyl.service';
import { IVinyl } from '@/types/vinyl/vinyl';
import { useState, useCallback, useEffect } from 'react';

interface PreviewImage extends IVinyl {
  id: string;
  preview: string;
}

interface UseImageUpload {
  images: PreviewImage[];
  isUploading: boolean;
  error: string | null;
  success: string | null;
  addImages: (files: File[]) => void;
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

  const fetchImages = async (uuid: string) => {
    try {
      const response = await VinylService.getUser(uuid);
      if (response.success) {
        const mappedImages = (response.images as IVinyl[]).map(img => ({
          id: img.id,
          text: img.text,
          preview: img.url,
          url: img.url
        }));

        console.log("Mapped Images: ", mappedImages)
        setImages(mappedImages as any)
      } else {
        setImages([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch images');
    }
  }

  const addImages = useCallback((files: File[]) => {
    const newImages: PreviewImage[] = files.map(file => ({
      id: `${file.name}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      file,
      text: '',
      preview: URL.createObjectURL(file),
      url: ''
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

  useEffect(() => {
    fetchImages(uuid);
  }, [uuid])

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