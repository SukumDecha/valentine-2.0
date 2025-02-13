import { useState, useCallback, useEffect } from 'react';
import VinylService from '@/services/vinyl.service';
import { IVinyl } from '@/types/vinyl/vinyl';
import heic2any from 'heic2any';

interface PreviewImage extends IVinyl {
  id: string;
  preview: string;
}

interface UseImageUpload {
  images: PreviewImage[];
  isUploading: boolean;
  error: string | null;
  success: string | null;
  addImages: (files: File[]) => Promise<void>;
  removeImage: (id: string) => void;
  updateImageText: (id: string, text: string) => void;
  uploadImages: () => Promise<void>;
  clearSuccess: () => void;
}

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/heic', 'image/heif'];

export const useImageUpload = (uuid: string): UseImageUpload => {
  const [images, setImages] = useState<PreviewImage[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const convertHeicToJpeg = async (file: File): Promise<File> => {
    try {
      const blob = await heic2any({
        blob: file,
        toType: 'image/jpeg',
        quality: 0.8
      });
      
      return new File(
        [blob as Blob], 
        file.name.replace(/\.(heic|heif)$/i, '.jpg'),
        { type: 'image/jpeg' }
      );
    } catch (error) {
      console.error('HEIC conversion error:', error);
      throw new Error('Failed to convert HEIC image');
    }
  };

  const processFile = async (file: File): Promise<File> => {
    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      throw new Error(`File ${file.name} is too large. Maximum size is 20MB`);
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type.toLowerCase())) {
      throw new Error(`File ${file.name} has unsupported format`);
    }

    // Convert HEIC/HEIF to JPEG if necessary
    if (file.type.toLowerCase().includes('heic') || file.type.toLowerCase().includes('heif')) {
      return await convertHeicToJpeg(file);
    }

    return file;
  };


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
  const addImages = useCallback(async (files: File[]) => {
    setError(null);
    setSuccess(null);

    try {
      const processedFiles = await Promise.all(
        files.map(async (file) => {
          const processed = await processFile(file);
          return {
            id: `${processed.name}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            file: processed,
            text: '',
            preview: URL.createObjectURL(processed),
            url: ''
          };
        })
      );

      setImages(prev => [...prev, ...processedFiles]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process images');
    }
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