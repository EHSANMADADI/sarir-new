import React from 'react'
import { MdHome } from "react-icons/md";
import logo from '../../../src/IMG/logo.png'
export default function HeaderMenue() {
    return (
        <div className='w-full sticky flex lg:px-14 px-5 py-2 mx-auto justify-between items-center border-b-2'>
             <div className='flex items-center text-blue-800'>
                <span>
                    <img src={logo} alt='logo' className='h-auto w-16' />
                </span>
                <span className='font-nastaliq text-5xl px-1'>سریر</span>


            </div>
            <div className='flex items-center text-blue-800'>
                <span className='text-2xl font-extrabold'>صفحه اصلی</span>
                <span className='mx-2 text-4xl'><MdHome /></span>
            </div>
           
        </div>
    )
}
