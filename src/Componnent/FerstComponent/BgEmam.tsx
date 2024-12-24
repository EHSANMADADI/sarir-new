import React from 'react';
import { FaAngleDoubleDown } from 'react-icons/fa';
interface BgEmamProps {
  onScrollDown: () => void; 
}

export default function BgEmam({ onScrollDown }:BgEmamProps) {
  return (
    <div className="w-full mx-auto h-screen hero-banr p-0 m-0 relative">
      <div
        className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-center text-4xl text-white justify-center z-50 animate-pulse cursor-pointer"
        onClick={onScrollDown}
      >
        <FaAngleDoubleDown />
      </div>
    </div>
  );
}
