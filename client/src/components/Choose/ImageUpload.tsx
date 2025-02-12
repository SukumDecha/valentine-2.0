import React, { useRef } from 'react';
import { useImageUpload } from '@/hooks/useImage';

interface ImageUploadProps {
  uuid_slug: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ uuid_slug }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    images,
    isUploading,
    error,
    success,
    addImages,
    removeImage,
    updateImageText,
    uploadImages
  } = useImageUpload(uuid_slug);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addImages(e.target.files);
      e.target.value = '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Upload Images</h2>

      {/* File Input */}
      <div className="mb-6">
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-blue-400 rounded-lg p-8 text-center cursor-pointer hover:border-blue-600 transition-colors"
        >
          <div className="text-gray-600 mb-2">Click or drag images here</div>
          <div className="text-sm text-gray-500">Support JPG, JPEG, PNG, GIF (max 20MB)</div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>

      {/* Success Message */}
      {success && (
        <div className="bg-green-50 text-green-700 p-4 mb-6 rounded-lg flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {success}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 text-red-700 p-4 mb-6 rounded-lg flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}

      {/* Image Preview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {images.map((image) => (
          <div
            key={image.id}
            className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Image Preview */}
            <div className="relative">
              <img
                src={image.preview}
                alt="Preview"
                className="w-full h-48 object-cover"
              />
              <button
                onClick={() => removeImage(image.id)}
                className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm hover:bg-red-600 transition-colors shadow-md"
              >
                Remove
              </button>
            </div>

            {/* Text Input */}
            <div className="p-4">
              <input
                type="text"
                value={image.text}
                onChange={(e) => updateImageText(image.id, e.target.value)}
                placeholder="Enter image description"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Upload Button */}
      {images.length > 0 && (
        <button
          onClick={uploadImages}
          disabled={isUploading}
          className="w-full bg-blue-500 text-white p-3 rounded-lg font-medium 
                   hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 
                   disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
        >
          {isUploading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Uploading...
            </div>
          ) : (
            `Upload ${images.length} Image${images.length > 1 ? 's' : ''}`
          )}
        </button>
      )}
    </div>
  );
};