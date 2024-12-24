// import React, { useEffect, useRef, useState } from 'react'
// import InputMultiple from './InputMultiple';
// import { useStore } from '../../Store/Store';
// import Swal from 'sweetalert2';
// import { FaRegFilePdf } from "react-icons/fa";
// import { FaDownload } from 'react-icons/fa6';
// import { FaCheckCircle } from 'react-icons/fa';
// import { IoMdEye } from 'react-icons/io';
// import { RiDeleteBin6Line } from 'react-icons/ri';
// import { SiMicrosoftexcel } from 'react-icons/si';
// import axios from 'axios';
// import Modal from '../Share/Modal';
// import JSZip from 'jszip';
// import { saveAs } from 'file-saver';
// export default function OCRbody() {
//     const [files, setFiles] = useState(null);
//     const [error, setError] = useState('');
//     const [openModals, setOpenModals] = useState([]);
//     const [saveItems, setSaveItems] = useState([]);
//     const [allFilesUploaded, setAllFilesUploaded] = useState(false);
//     const [isDownloadExcell, setIsDownloadExcell] = useState([]);
//     const [isDownloadPdf, setIsDownloadPdf] = useState([]);
//     const [isDownloadWord, setIsDownloadWord] = useState([]);
//     console.log("multiple files", files);
//     const hasSaved = useRef(false);

//     useEffect(() => {
//         if (allFilesUploaded && !hasSaved.current) {
//             try {
//                 localStorage.setItem('multiSeavedItems', JSON.stringify(saveItems));
//                 console.log('Items saved successfully');
//                 hasSaved.current = true;
//                 window.location.reload();
//             } catch (err) {
//                 console.error('Error saving items:', err);
//             }
//         }
//     }, [allFilesUploaded, saveItems]);

//     useEffect(() => {
//         function getSavedItems() {
//             try {
//                 const storedItems = JSON.parse(localStorage.getItem('multiSeavedItems'));
//                 setSaveItems(storedItems || []);
//             } catch (err) {
//                 console.error('Error retrieving items:', err);
//             }
//         }
//         getSavedItems();
//     }, []);

//     const { setShowBTN, ChangeIndexMultiple } = useStore();

//     const handelremove = (id:number) => {
//         const updatedItems = saveItems.filter((_, i) => i !== id);
//         setSaveItems(updatedItems);

//         try {
//             localStorage.setItem('multiSeavedItems', JSON.stringify(updatedItems));
//             Swal.fire({
//                 title: "فایل با موفقیت حذف شد",
//                 icon: "success",
//             });
//         } catch (error) {
//             console.error("Error updating localStorage: ", error);
//         }
//     };

//     const handleModalOpen = (index:number, txt:string) => {
//         localStorage.setItem('txt', txt);
//         const updatedOpenModals = [...openModals];
//         updatedOpenModals[index] = true;
//         setOpenModals(updatedOpenModals);
//     };

//     const handleModalClose = (index:number) => {
//         const updatedOpenModals = [...openModals];
//         updatedOpenModals[index] = false;
//         setOpenModals(updatedOpenModals);
//     };



//     const handelDownloadExcell = async (index:number) => {
//         try {
//             const zip = new JSZip(); // ایجاد یک فایل ZIP
//             const updatedIsDownloadExcell = [...isDownloadExcell];
//             updatedIsDownloadExcell[index] = true; // وضعیت دانلود فعال می‌شود
//             setIsDownloadExcell(updatedIsDownloadExcell);

//             for (let itemIndex = 0; itemIndex < saveItems[index].length; itemIndex++) {
//                 const item = saveItems[index][itemIndex];
//                 const url_document = item.url_document;

//                 let isProcessing = true;
//                 let excelBlob = null;

//                 // دریافت فایل اکسل تا زمانی که پردازش تمام شود
//                 while (isProcessing) {
//                     const response = await axios.post(
//                         'http://192.168.4.177:17017/download_excel',
//                         { document_url: url_document }
//                     );

//                     if (response.data.state === "processing") {
//                         console.log(response.data.state);
//                         await new Promise((resolve) => setTimeout(resolve, 3000));
//                     } else {
//                         const res = await axios.post(
//                             'http://192.168.4.177:17017/download_excel',
//                             { document_url: url_document },
//                             { responseType: 'blob' }
//                         );
//                         console.log('excel file received');
//                         excelBlob = res.data;
//                         isProcessing = false;
//                     }
//                 }

//                 if (excelBlob) {
//                     const formData = new FormData();
//                     formData.append('file', excelBlob, 'uploaded_file.xlsx');

//                     // بارگذاری فایل اکسل به سرور
//                     const responseUpload = await axios.post(
//                         'http://195.191.45.56:17011/upload',
//                         formData,
//                         { headers: { 'Content-Type': 'multipart/form-data' } }
//                     );

//                     if (responseUpload.status === 200) {
//                         const res = await axios.post(
//                             'http://195.191.45.56:17011/extract',
//                             { file_path: responseUpload.data.file_path },
//                             { headers: { 'Content-Type': 'application/json' } }
//                         );

//                         if (res.status === 200) {
//                             const fileUrl = `http://195.191.45.56:17011/download/${res.data.output_file}`;
//                             const fileResponse = await axios.get(fileUrl, { responseType: 'blob' });

//                             // اضافه کردن فایل اکسل به زیپ
//                             const fileName = res.data.output_file; // نام پیش‌فرض فایل دانلودی
//                             zip.file(fileName, fileResponse.data);
//                         }
//                     }
//                 }
//             }

//             // ایجاد فایل زیپ و دانلود آن
//             const zipBlob = await zip.generateAsync({ type: 'blob' });
//             saveAs(zipBlob, 'excel_files.zip'); // فایل زیپ دانلود می‌شود

//         } 
//         catch (error) {
//             console.error('Error downloading Excel files:', error);
//             Swal.fire({
//                 title: 'خطا در دانلود فایل اکسل',
//                 icon: 'error',
//                 text: 'لطفاً دوباره تلاش کنید.',
//             });
//         } finally {
//             const updatedIsDownloadExcell = [...isDownloadExcell];
//             updatedIsDownloadExcell[index] = false; // وضعیت دکمه را ریست می‌کنیم
//             setIsDownloadExcell(updatedIsDownloadExcell);
//         }
//     };

//     const handelDownloadPdf = async (index:number) => {
//         try {
//             const zip = new JSZip(); // ایجاد یک فایل ZIP
//             const updatedIsDownloadPdf = [...isDownloadPdf];
//             updatedIsDownloadPdf[index] = true; // وضعیت دانلود فعال می‌شود
//             setIsDownloadPdf(updatedIsDownloadPdf);

//             for (let itemIndex = 0; itemIndex < saveItems[index].length; itemIndex++) {
//                 const item = saveItems[index][itemIndex];
//                 const url_document = item.url_document;

//                 let isProcessing = true;
//                 let pdfBlob = null;

//                 // دریافت فایل PDF تا زمانی که پردازش تمام شود
//                 while (isProcessing) {
//                     const response = await axios.post(
//                         'http://192.168.4.177:17017/download_pdf',
//                         { document_url: url_document }
//                     );

//                     if (response.data.state === "processing") {
//                         console.log(response.data.state);
//                         await new Promise((resolve) => setTimeout(resolve, 3000));
//                     } else {
//                         const res = await axios.post(
//                             'http://192.168.4.177:17017/download_pdf',
//                             { document_url: url_document },
//                             { responseType: 'blob' }
//                         );
//                         console.log('PDF file received');
//                         pdfBlob = res.data;
//                         isProcessing = false;

//                         // اضافه کردن فایل به ZIP
//                         const fileName = `file_${itemIndex + 1}.pdf`; // نام فایل
//                         zip.file(fileName, pdfBlob); // اضافه کردن فایل به ZIP
//                     }
//                 }
//             }

//             // ایجاد فایل زیپ و دانلود آن
//             const zipBlob = await zip.generateAsync({ type: 'blob' });
//             saveAs(zipBlob, 'PDF_files.zip'); // فایل زیپ دانلود می‌شود
//         } catch (error) {
//             console.error('Error downloading PDF files:', error);
//             Swal.fire({
//                 title: 'خطا در دانلود فایل PDF',
//                 icon: 'error',
//                 text: 'لطفاً دوباره تلاش کنید.',
//             });
//         } finally {
//             const updatedIsDownloadPdf = [...isDownloadPdf];
//             updatedIsDownloadPdf[index] = false; // وضعیت دکمه را ریست می‌کنیم
//             setIsDownloadPdf(updatedIsDownloadPdf);
//         }
//     };


//     const handelDownloadWord = async (index:number) => {
//         try {
//             const zip = new JSZip(); // ایجاد یک فایل ZIP
//             const updatedIsDownloadWord = [...isDownloadWord];
//             updatedIsDownloadWord[index] = true; // وضعیت دانلود فعال می‌شود
//             setIsDownloadWord(updatedIsDownloadWord);

//             for (let itemIndex = 0; itemIndex < saveItems[index].length; itemIndex++) {
//                 const item = saveItems[index][itemIndex];
//                 const url_document = item.url_document;

//                 let isProcessing = true;
//                 let wordBlob = null;

//                 // دریافت فایل PDF تا زمانی که پردازش تمام شود
//                 while (isProcessing) {
//                     const response = await axios.post(
//                         'http://192.168.4.177:17017/download_word',
//                         { document_url: url_document }
//                     );

//                     if (response.data.state === "processing") {
//                         console.log(response.data.state);
//                         await new Promise((resolve) => setTimeout(resolve, 3000));
//                     } else {
//                         const res = await axios.post(
//                             'http://192.168.4.177:17017/download_word',
//                             { document_url: url_document },
//                             { responseType: 'blob' }
//                         );
//                         console.log('word file received');
//                         wordBlob = res.data;
//                         isProcessing = false;

//                         // اضافه کردن فایل به ZIP
//                         const fileName = `file_${itemIndex + 1}.doc`; // نام فایل
//                         zip.file(fileName, wordBlob); // اضافه کردن فایل به ZIP
//                     }
//                 }
//             }

//             // ایجاد فایل زیپ و دانلود آن
//             const zipBlob = await zip.generateAsync({ type: 'blob' });
//             saveAs(zipBlob, 'WORD_files.zip'); // فایل زیپ دانلود می‌شود
//         } catch (error) {
//             console.error('Error downloading word files:', error);
//             Swal.fire({
//                 title: 'خطا در دانلود فایل word',
//                 icon: 'error',
//                 text: 'لطفاً دوباره تلاش کنید.',
//             });
//         } finally {
//             const updatedIsDownloadWord = [...isDownloadPdf];
//             updatedIsDownloadWord[index] = false; // وضعیت دکمه را ریست می‌کنیم
//             setIsDownloadWord(updatedIsDownloadWord);
//         }
//     };
//   return (
//     <div className='flex lg:overflow-hidden bg-blue-50 lg:flex-nowrap flex-wrap lg:h-screen '>

//     <div className='w-2/3 mx-auto'>
//         <InputMultiple files={files} setFiles={setFiles} error={error} setError={setError} />
//     </div>
//     <div className='h-screen lg:w-1/2 w-full mx-auto sm:mr-20 flex items-center'>
//         <div className='w-full md:h-1/2 h-full overflow-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full  scrollbar-thumb-yellow-600 scrollbar-track-gray-50 '>
//             {!files && saveItems.length === 0 && (
//                 <div className='flex justify-center items-center text-gray-500 sm:text-2xl text-base font-bold mt-10 text-center'>
//                     <p>فایلی موجود نیست لطفا فایلی را انتخاب نمایید</p>
//                 </div>
//             )}
//             {files && (
//                 <UploadMultipleFiles
//                     allFilesUploaded={allFilesUploaded}
//                     setAllFilesUploaded={setAllFilesUploaded}
//                     keys={files.length}
//                     files={files}
//                     setFiles={setFiles}
//                     setSaveItems={setSaveItems}
//                     saveItems={saveItems}
//                 />
//             )}
//             {saveItems.length > 0 &&
//                 saveItems.map((itemArray, index) => (
//                     <div key={index} className='box-Item seavItem border bg-white border-gray-100 shadow-lg rounded-lg xl:mx-6 mx-1 xl:p-5 py-2 mb-10'>
//                         <div className='flex justify-between items-center md:mx-5 mx-2'>
//                             <p className='text-xl font-semibold'>پردازش تکمیل شد</p>
//                             <div className='text-lg text-green-500'>
//                                 <FaCheckCircle />
//                             </div>
//                         </div>
//                         <div className='sm:mx-6 mx-0 mt-1'>
//                             <div className='bg-gray-200 rounded-full h-2 '>
//                                 <div className='bg-blue-600 h-2 rounded-full' style={{ width: '100%' }}></div>
//                             </div>
//                             <div className='flex justify-end mb-1'>
//                                 <span className='text-sm font-medium text-gray-400 '>100%</span>
//                             </div>
//                             <div className='flex'>
//                                 <div className='flex justify-between w-full'>
//                                     <button
//                                         className='border-dotted border-black rounded-md border-2 md:px-4 px-2 pt-1 pb-2 mx-2 sm:text-xl text-xs font-semibold text-center flex items-center hover:scale-105 duration-200'
//                                         onClick={() => handelremove(index)}
//                                     >
//                                         <span className='text-center  mr-2 text-2xl text-red-600 '>
//                                             <RiDeleteBin6Line />
//                                         </span>
//                                         حذف
//                                     </button>
//                                     <button
//                                         className='border-dotted border-black rounded-md border-2 md:px-4 px-2 pt-1 pb-2 mx-2 sm:text-xl text-xs font-semibold text-center flex items-center hover:scale-105 duration-200'
//                                         onClick={() => { setShowBTN(true); handleModalOpen(index, itemArray.responseText); ChangeIndexMultiple(index) }}
//                                     >
//                                         <span className='text-center mr-2 text-2xl text-blue-600'>
//                                             <IoMdEye />
//                                         </span>
//                                         مشاهده
//                                     </button>
//                                     <button
//                                     className='border-dotted border-black rounded-md border-2 md:px-4 px-2 pt-1 pb-2 mx-2 sm:text-xl text-xs font-semibold text-center flex items-center hover:scale-105 duration-200'
//                                     onClick={() => handelDownloadExcell(index)}
//                                     disabled={isDownloadExcell[index]}
//                                 >
//                                     <span className='text-center mr-2 text-xl text-green-700'>
//                                         <SiMicrosoftexcel />
//                                     </span>
//                                     {isDownloadExcell[index] ? (<span className='text-sm'>صبر کنید</span>) : (<span>EXCEL</span>)}

//                                 </button>
//                                     <button
//                                         className='border-dotted border-black rounded-md border-2 md:px-4 px-2 pt-1 pb-2 mx-2 sm:text-xl text-xs font-semibold text-center flex items-center hover:scale-105 duration-200'
//                                         onClick={() => handelDownloadPdf(index)}
//                                         disabled={isDownloadPdf[index]}
//                                     >
//                                         <span className='text-center mr-2 text-xl text-red-700'>
//                                             <FaRegFilePdf />
//                                         </span>
//                                         {isDownloadPdf[index] ? (<span className='text-sm'>صبر کنید</span>) : (<span>PDF</span>)}

//                                     </button>
//                                     <button
//                                         className='border-dotted border-black rounded-md border-2 md:px-4 px-2 pt-1 pb-2 mx-2 sm:text-xl text-xs font-semibold text-center flex items-center hover:scale-105 duration-200'
//                                         onClick={() => handelDownloadWord(index)}
//                                     >
//                                         <span className='text-center mr-2 text-xl text-yellow-600'>
//                                             <FaDownload />
//                                         </span>
//                                         {isDownloadWord[index] ? (<span className='text-sm'>صبر کنید</span>) : (<span>WORD</span>)}

//                                     </button>
//                                 </div>
//                             </div>
//                         </div>

//                         {
//                             itemArray.map((file:any, i:any) => (
//                                 <Modal
//                                     key={i}
//                                     Open={openModals[index]}
//                                     onClose={() => handleModalClose(index)}
//                                 >
//                                     <div key={i} className="flex md:flex-row flex-col h-full">
//                                         <div dir='rtl' className="md:w-1/2 w-full overflow-x-auto max-h-[80vh] p-2">
//                                             <div className={`grid grid-cols-1 gap-1 md:grid-cols-2 xl:grid-cols-${Math.ceil(itemArray.length - 1 / 2)}`}>
//                                                 {itemArray.map((detail, index) => (
//                                                     <div key={index} className="relative">
//                                                         <img
//                                                             className="w-full h-auto  object-cover rounded-lg"
//                                                             src={detail.src}
//                                                             alt={`detail-${index}`}
//                                                         />
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                         </div>

//                                         <div dir="rtl" className="md:w-1/2 w-full md:p-4 p-2 bg-gray-50 overflow-auto max-h-[80vh]">
//                                             <p className="text-2xl font-black leading-8">
//                                                 {itemArray.map((detail:any, index:number) => (
//                                                     <div key={index} className="border-b-[3px] border-dashed pb-2">
//                                                         <span className='md:text-base text-xs'>{detail.responseText.split('\u200B').join(' ')}</span>
//                                                         <div className="text-left text-sm text-gray-600 mt-1">
//                                                             {`شماره: ${index + 1}`}
//                                                         </div>
//                                                     </div>
//                                                 ))}
//                                             </p>
//                                         </div>
//                                     </div>
//                                 </Modal>
//                             ))
//                         }


//                     </div>
//                 ))}
//         </div>
//     </div>
// </div>
//   )
// }
