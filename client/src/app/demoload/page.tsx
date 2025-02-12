// "use client";
// import React, { useState } from "react";
// import Page from "@/app/nay/page";

// const UploadPage = () => {
//     const [images, setImages] = useState<File[]>([]);
//     const [imagePreviews, setImagePreviews] = useState<string[]>([]);
//     const [isImagesUploaded, setIsImagesUploaded] = useState<boolean>(false);
//     const [textInputs, setTextInputs] = useState<string[]>(["", "", ""]);
//     const [names, setNames] = useState<string>("");

//     const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const files = e.target.files;
//         if (files) {
//             const filesArray = Array.from(files);
//             const previewsArray = filesArray.map(file => URL.createObjectURL(file));
//             setImages(filesArray);
//             setImagePreviews(previewsArray);
//         }
//     };

//     const handleTextChange = (index: number, value: string) => {
//         const newTextInputs = [...textInputs];
//         newTextInputs[index] = value;
//         setTextInputs(newTextInputs);
//     };

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         if (images.length > 0) {
//             setIsImagesUploaded(true);  // ตั้งค่าว่าอัปโหลดเสร็จ
//         } else {
//             alert("Please select at least one image to upload.");
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100">
//             {isImagesUploaded ? (
//                 <Page name={names} image={imagePreviews} text={textInputs} />
//             ) : (
//                 <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
//                     <h2 className="text-2xl font-bold text-center text-pink-600 mb-4">Upload Your Images</h2>
//                     <form onSubmit={handleSubmit} className="space-y-4">
//                         <div className="flex justify-center">
//                             <input
//                                 type="file"
//                                 accept="image/*"
//                                 onChange={handleImageChange}
//                                 multiple
//                                 className="text-sm text-gray-500 file:py-2 file:px-4 file:bg-pink-100 file:text-pink-500 file:border-0 file:rounded-xl"
//                             />
//                         </div>

//                         {imagePreviews.length > 0 && (
//                             <div className="flex justify-center flex-wrap space-x-4 mt-4">
//                                 {imagePreviews.map((preview, index) => (
//                                     <img
//                                         key={index}
//                                         src={preview}
//                                         alt={`Image preview ${index}`}
//                                         className="w-32 h-32 object-cover rounded-xl"
//                                     />
//                                 ))}
//                             </div>
//                         )}

//                         <div>
//                             <input
//                                 type="text"
//                                 value={names}
//                                 onChange={(e) => setNames(e.target.value)}
//                                 placeholder="Enter recipient's name"
//                                 className="w-full p-2 border rounded-xl text-gray-700"
//                             />
//                         </div>

//                         {textInputs.map((text, index) => (
//                             <div key={index}>
//                                 <input
//                                     type="text"
//                                     value={text}
//                                     onChange={(e) => handleTextChange(index, e.target.value)}
//                                     placeholder={`Enter text ${index + 1}`}
//                                     className="w-full p-2 border rounded-xl text-gray-700"
//                                 />
//                             </div>
//                         ))}

//                         <div className="flex justify-center">
//                             <button
//                                 type="submit"
//                                 className="px-6 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600"
//                             >
//                                 Upload Images
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default UploadPage;


import React from 'react'

const page = () => {
    return (
        <div>page</div>
    )
}

export default page