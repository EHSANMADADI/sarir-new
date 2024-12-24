import React from 'react'
import { IoIosCloseCircle } from "react-icons/io";
import { MdClose } from "react-icons/md";
interface ModalInput {
  Open: boolean,
  onClose: () => void,
  children: any,
  
}
export default function Modal({ Open, onClose, children }: ModalInput) {


  if (!Open) return null;


  const Handelclose = (e: { target: { id: string; }; }) => {
    if (e.target.id === 'wrapper') onClose();
  }

  return (
    <div className='md:fixed  inset-y-0 right-0 lg:w-2/3 w-full flex justify-center h-screen items-center transition-colors bg-opacity-25 z-50 ' id='wrapper' onClick={() => Handelclose}>
      <div className='w-full sm:w-5/6 flex flex-col sm:mx-0 mx-auto'>

        <div className='bg-gray-50 border-4 border-blue-700 rounded p-5 h-[78vh] overflow-auto '>
          <button className=' text-3xl bg-transparent p-2 mb-1' onClick={() => onClose()}><MdClose className='text-3xl bg-white' /></button>
          <div className='w-full'>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}