import VinylService from '@/services/vinyl.service';
import { IVinyl } from '@/types/vinyl/vinyl';
import { useState, useCallback, useEffect } from 'react';
import heic2any from 'heic2any';

// Constants for validation
const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB per file
const MAX_TOTAL_SIZE = 200 * 1024 * 1024; // 200MB total
const MAX_FILES = 10; // Maximum 5 files at once
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/heic', 'image/heif'];
const ALLOWED_EXTENSIONS = /\.(jpg|jpeg|png|gif|webp|heic|heif)$/i;

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

const isHeicOrHeif = (file: File): boolean => {
  return file.type === 'image/heic' ||
    file.type === 'image/heif' ||
    file.name.toLowerCase().endsWith('.heic') ||
    file.name.toLowerCase().endsWith('.heif');
};

const convertHeicToJpeg = async (file: File): Promise<File> => {
  try {
    const convertedBlob = await heic2any({
      blob: file,
      toType: 'image/jpeg',
      quality: 0.8
    });

    // Handle both single blob and array of blobs
    const jpegBlob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;

    // Create a new file with the converted blob
    const fileName = file.name.replace(/\.(heic|heif)$/i, '.jpg');
    return new File([jpegBlob], fileName, { type: 'image/jpeg' });
  } catch (error) {
    console.error('Error converting HEIC/HEIF to JPEG:', error);
    throw new Error('Failed to convert image format');
  }
};

const validateFile = (file: File): string | null => {
  // Check file type
  if (!ALLOWED_EXTENSIONS.test(file.name)) {
    return `File ${file.name} has an invalid format. Allowed formats: JPG, PNG, GIF, WebP, HEIC`;
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return `File ${file.name} is too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB`;
  }

  return null;
};

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
        setImages(mappedImages as PreviewImage[]);
      } else {
        setImages([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch images');
    }
  };

  const addImages = useCallback(async (files: File[]) => {
    setError(null);
    setSuccess(null);

    // Check number of files
    if (files.length > MAX_FILES) {
      setError(`Maximum ${MAX_FILES} files can be uploaded at once`);
      return;
    }

    // Check if adding new files would exceed the total limit
    if (images.length + files.length > MAX_FILES) {
      setError(`Cannot add more images. Maximum ${MAX_FILES} files allowed in total`);
      return;
    }

    // Check total size
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    if (totalSize > MAX_TOTAL_SIZE) {
      setError(`Total file size exceeds ${MAX_TOTAL_SIZE / (1024 * 1024)}MB limit`);
      return;
    }

    // Validate each file
    for (const file of files) {
      const error = validateFile(file);
      if (error) {
        setError(error);
        return;
      }
    }

    try {
      // Process files (convert HEIC if necessary)
      const processedFiles = await Promise.all(
        files.map(async (file) => {
          if (isHeicOrHeif(file)) {
            return await convertHeicToJpeg(file);
          }
          return file;
        })
      );

      const newImages: PreviewImage[] = processedFiles.map(file => ({
        id: `${file.name}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        file,
        text: '',
        preview: URL.createObjectURL(file),
        url: ''
      }));

      setImages(prev => [...prev, ...newImages]);
    } catch (err) {
      setError('Failed to process one or more images');
      console.error('Error processing images:', err);
    }
  }, [images]);

  const removeImage = useCallback((id: string) => {
    setImages(prev => {
      const filtered = prev.filter(img => img.id !== id);
      const removedImage = prev.find(img => img.id === id);
      if (removedImage?.preview) {
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
        // Clean up preview URLs
        images.forEach(img => {
          if (img.preview) {
            URL.revokeObjectURL(img.preview);
          }
        });
        setImages([]);
        setSuccess('Images uploaded successfully!');
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
  }, [uuid]);

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