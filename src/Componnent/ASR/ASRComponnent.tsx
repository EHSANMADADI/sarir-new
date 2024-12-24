import React from "react";
import HeaderMenue from "../Share/HeaderMenue";
import TitleDetails from "../Share/TitleDetails";
import ASRbody from "./ASRbody";

export default function ASRComponnent() {
  return (
    <div className='overflow-hidden mx-auto h-screen'>
      <HeaderMenue />
      <div className="pb-20 overflow-auto h-[90vh] w-full bg-blue-50">
        <TitleDetails
          title={"ASRابزار تبدیل گفتار انسان به متن"}
          detailes={
            "فناوری ای است که گفتار انسان را به متن قابل ویرایش تبدیل میکند"
          }
        />
        <ASRbody />
      </div>
    </div>
  );
}
