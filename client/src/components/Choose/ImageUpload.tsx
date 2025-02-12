// import { useState, useEffect, ChangeEvent, FormEvent, useCallback } from "react";
// import { uploadImagesWithTexts, getUserData } from "@/services/main.service";
// import { useImages } from "@/hooks/useImage";
// import { validateFiles } from "@/utils/image-validator.util";
// import { Heart, Upload, X, Image as ImageIcon } from 'lucide-react';

// interface UploadedImage {
//     url: string;
//     text:string;
//     id: string;
// }

// export default function UploadImage({ uuid_slug }: { uuid_slug: string }) {
//     const { images, addImages, removeImage, setImages } = useImages();
//     const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
//     const [uploadStatus, setUploadStatus] = useState({
//         isUploading: false,
//         error: null as string | null,
//         success: false,
//     });
//     const [isLoading, setIsLoading] = useState(true);

//     const fetchUserData = useCallback(async () => {
//         try {
//             const response = await getUserData(uuid_slug);
//             if (response.success && response.images) {
//                 setUploadedImages(response.images.map((url: string, index: number) => ({
//                     url,
//                     id: `uploaded-${index}`
//                 })));
//             }
//         } catch (error) {
//             console.error('Error fetching images:', error);
//         } finally {
//             setIsLoading(false);
//         }
//     }, [uuid_slug]);

//     useEffect(() => {
//         fetchUserData();
//     }, [fetchUserData]);

//     const handleImageChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
//         const files = event.target.files;
//         if (files) {
//             const newFiles = Array.from(files);
//             const validationError = validateFiles(newFiles);
//             if (validationError) {
//                 setUploadStatus((prev) => ({ ...prev, error: validationError }));
//                 return;
//             }
//             console.log('Adding new files:', newFiles);
//             addImages(newFiles);
//             setUploadStatus((prev) => ({ ...prev, error: null }));
//         }
//         event.target.value = '';
//     }, [addImages]);

//     const handleRemoveImage = useCallback((index: number) => {
//         if (uploadStatus.isUploading) {
//             console.log('Cannot remove while uploading');
//             return;
//         }
//         console.log('Attempting to remove image at index:', index);
//         console.log('Current images:', images);
//         removeImage(index);
//         if (uploadStatus.success) {
//             setUploadStatus(prev => ({ ...prev, success: false }));
//         }
//     }, [uploadStatus.isUploading, uploadStatus.success, images, removeImage]);

//     const handleSubmit = async (event: FormEvent) => {
//         event.preventDefault();
//         if (images.length === 0) {
//             setUploadStatus((prev) => ({
//                 ...prev,
//                 error: "Please select at least one image to upload.",
//             }));
//             return;
//         }

//         setUploadStatus({ isUploading: true, error: null, success: false });

//         try {
//             const response = await uploadImagesWithTexts(uuid_slug, images);
//             if (response.success) {
//                 await fetchUserData();
//                 setUploadStatus({ isUploading: false, error: null, success: true });
//                 setImages([]); // Clear the images after successful upload
//             }
//         } catch (error: any) {
//             setUploadStatus({
//                 isUploading: false,
//                 error: error.message || "Failed to upload images. Please try again.",
//                 success: false,
//             });
//         }
//     };

//     return (
//         <div className="space-y-4">
//             <form onSubmit={handleSubmit} className="w-full">
//                 <div className="relative group">
//                     <input
//                         type="file"
//                         accept="image/jpeg,image/png,image/gif"
//                         onChange={handleImageChange}
//                         multiple
//                         className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
//                         disabled={uploadStatus.isUploading}
//                     />
//                     <div className="h-32 border-2 border-dashed border-white/40 rounded-xl flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition-all">
//                         <div className="text-center text-white/60">
//                             <Upload className="w-8 h-8 mx-auto mb-2" />
//                             <p className="text-sm">Drop your images here or click to browse</p>
//                         </div>
//                     </div>
//                 </div>

//                 {uploadStatus.error && (
//                     <div className="mt-3 p-3 bg-red-500/20 border border-red-500/40 rounded-xl text-white text-sm">
//                         {uploadStatus.error}
//                     </div>
//                 )}

//                 {uploadStatus.success && (
//                     <div className="mt-3 p-3 bg-green-500/20 border border-green-500/40 rounded-xl text-white text-sm flex items-center gap-2">
//                         <Heart className="w-4 h-4" fill="white" />
//                         Images uploaded successfully!
//                     </div>
//                 )}

//                 {images.length > 0 && (
//                     <>
//                         <h3 className="text-white text-sm font-medium mt-6 mb-3 flex items-center gap-2">
//                             <ImageIcon className="w-4 h-4" />
//                             New Images to Upload ({images.length})
//                         </h3>
//                         <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                             {images.map((image, index) => (
//                                 <div
//                                     key={`preview-${Date.now()}-${index}-${image.name}`}
//                                     className="relative group rounded-xl overflow-hidden"
//                                 >
//                                     <img
//                                         src={URL.createObjectURL(image)}
//                                         alt={`Upload Preview ${index + 1}`}
//                                         className="w-full h-32 object-cover"
//                                     />
//                                     <button
//                                         type="button"
//                                         onClick={() => handleRemoveImage(index)}
//                                         className="absolute top-2 right-2 w-8 h-8 bg-red-400 hover:bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20"
//                                         disabled={uploadStatus.isUploading}
//                                     >
//                                         <X className="w-4 h-4" />
//                                     </button>
//                                     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
//                                 </div>
//                             ))}
//                         </div>
//                     </>
//                 )}

//                 <button
//                     type="submit"
//                     disabled={uploadStatus.isUploading || images.length === 0}
//                     className={`mt-4 w-full p-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all
//                         ${uploadStatus.isUploading || images.length === 0
//                             ? "bg-white/20 text-white/60 cursor-not-allowed"
//                             : "bg-white/20 hover:bg-white/30 text-white"
//                         }`}
//                 >
//                     {uploadStatus.isUploading ? (
//                         <>
//                             <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/60 border-t-transparent" />
//                             Uploading...
//                         </>
//                     ) : (
//                         <>
//                             <Heart className="w-4 h-4" fill="white" />
//                             Upload Sweetie !
//                         </>
//                     )}
//                 </button>
//             </form>

//             {!isLoading && uploadedImages.length > 0 && (
//                 <div className="mt-8">
//                     <h3 className="text-white text-sm font-medium mb-3 flex items-center gap-2">
//                         <Heart className="w-4 h-4" fill="white" />
//                         Your Love Gallery ({uploadedImages.length})
//                     </h3>
//                     <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                         {uploadedImages.map((image) => (
//                             <div
//                                 key={image.id}
//                                 className="relative group rounded-xl overflow-hidden"
//                             >
//                                 <img
//                                     src={image.url}
//                                     alt={`Uploaded Image`}
//                                     className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
//                                 />
//                                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             )}

//             {isLoading && (
//                 <div className="flex justify-center items-center py-8">
//                     <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent" />
//                 </div>
//             )}
//         </div>
//     );
// }