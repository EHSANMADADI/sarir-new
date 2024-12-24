import React from "react";
interface Component {
  title: string;
  detailes: string;
}
export default function TitleDetails({ title, detailes }: Component) {
  return (
    <div className="font-Byekan">
      <div className="bg-blue-50 w-full text-center pt-4 pb-2">
        <h2 className="text-3xl text-blue-800 font-bold mb-3">{title}</h2>
        <p className="py-3 text-blue-500 font-medium text-lg tracking-wider">{detailes}</p>
      </div>
    </div>
  );
}
