// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { CiCircleRemove } from "react-icons/ci";
// import { FaCheckCircle } from "react-icons/fa";
// import { IoMdEye } from "react-icons/io";
// import { RiDeleteBin6Line } from "react-icons/ri";

// export default function UploadMultipleFiles({ files, setSaveItems, saveItems, setAllFilesUploaded, allFilesUploaded }) {
//   const [fileStates, setFileStates] = useState(files.map(file => ({
//     file,
//     responseText: '',
//     src: '',
//     isSent: false,
//     progress: 0,
//     url_document: '',
//   })));

//   const [progressAll, setProgressAll] = useState(0);

//   const handleUpload = (fileState, index) => {
//     console.log(fileState);
    
//     const formData = new FormData();
//     formData.append('image', fileState.file);
//     console.log(formData);
    

//     let imageUrls;
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       imageUrls = e.target.result;
//     };
//     reader.readAsDataURL(fileState.file);

//     axios.post('https://192.168.4.177:17017/process_image?type=excel', formData, {
//       onUploadProgress: (progressEvent) => {
//         const percentage = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
//         setFileStates(prevStates => {
//           const updatedStates = [...prevStates];
//           updatedStates[index].progress = percentage;
//           return updatedStates;
//         });
//       }
//     })
//     .then(res => {
//       console.log("res form eliaaa=>",res);
//       setFileStates(prevStates => {
//         const updatedStates = [...prevStates];
//         updatedStates[index].isSent = true;
//         updatedStates[index].responseText = res.data.pages[0].text;
//         updatedStates[index].src = imageUrls;
//         updatedStates[index].url_document = res.data.document_url;
//         return updatedStates;
//       });
//     })
//     .catch(err => {
//       alert(`فایل ${fileState.file.name} ارسال نشد`);
//       console.log(err);
//     });
//   };

//   useEffect(() => {
//     fileStates.forEach((fileState, index) => {
//       if (!fileState.isSent) {
//         handleUpload(fileState, index);
//       }
//     });
//   }, []);

//   useEffect(() => {
//     const totalFiles = fileStates.length;
//     const sentFiles = fileStates.filter(fileState => fileState.isSent).length;
//     const newProgressAll = totalFiles === 0 ? 0 : Math.floor((sentFiles / totalFiles) * 100);
//     setProgressAll(newProgressAll);
    
//     if (sentFiles === totalFiles && totalFiles > 0) {
//       setAllFilesUploaded(true);
      
//       // Manage the localStorage storage
//       const storedArray = localStorage.getItem('multiSeavedItems');
//       const parsedArray = storedArray ? JSON.parse(storedArray) : [];
//       const updatedArray = [fileStates, ...parsedArray];
//       localStorage.setItem('multiSeavedItems', JSON.stringify(updatedArray));
//       setSaveItems(updatedArray);
//     }
//   }, [fileStates]);

//   return (
//     <div>
//       {
//         saveItems.length === 0 && !files && <div className='flex text-center justify-center text-gray-500 text-2xl font-bold mt-10'>
//           <p className='text-center'>فایلی موجود نیست لطفا فایلی را انتخاب نمایید</p>
//         </div>
//       }

//       {
//         !allFilesUploaded && <div className='w-full'>
//           <div className='border border-gray-100 shadow-2xl rounded-lg xl:mx-6 mx-1 xl:p-5 py-2 mb-10 bg-white'>
//             <div className='flex justify-between items-center md:mx-5 mx-2'>
//               <p className='text-xl font-semibold overflow-clip'>درحال پردازش لطفا صبر کنید</p>
//               {
//                 progressAll === 100 && <div className='text-lg text-green-500'>
//                   <FaCheckCircle />
//                 </div>
//               }
//               {
//                 progressAll !== 100 && <div className='text-3xl text-red-500 font-bold cursor-pointer hover:scale-110 duration-200'>
//                   <CiCircleRemove />
//                 </div>
//               }
//             </div>
//             <div className='mx-6 mt-1'>
//               <div className="bg-gray-200 rounded-full h-2 ">
//                 <div className="bg-blue-700 h-2 rounded-full" style={{ width: `${progressAll}%` }}></div>
//               </div>
//               <div className="flex justify-end mb-1">
//                 <span className="text-sm font-medium text-gray-400 ">{progressAll}%</span>
//               </div>
//               <div className='flex'>
//                 <div className='flex justify-between w-full items-center'>
//                   <button className='border-dotted border-black rounded-md border-2 sm:px-4 px-2 pt-1 pb-2 mx-2 sm:text-xl text-xs font-semibold flex items-center text-center hover:scale-105 duration-200'>
//                     <span className='text-center mr-2 text-2xl text-red-600'><RiDeleteBin6Line /></span>حذف
//                   </button>
//                   <button className='border-dotted border-black rounded-md border-2 sm:px-4 px-2 pt-1 pb-2 mx-2 sm:text-xl text-xs font-semibold text-center flex items-center hover:scale-105 duration-200'>
//                     <span className='text-center mr-2 text-2xl'><IoMdEye /></span>نمایش
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       }
//     </div>
//   );
// }
