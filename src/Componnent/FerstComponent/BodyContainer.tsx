/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";

import ItemsComponnets from "./ItemsComponnets";
export default function BodyContainer() {
  const [showWebSite, setShowWebsite] = useState(false);
  return (
    <div
     className="flex flex-wrap items-start xl:justify-between justify-center xl:gap-5 gap-2 w-2/3 mx-auto"
      dir="rtl"
    >
      <ItemsComponnets
        id={1}
        title="ASR"
        discription="فناوری است که گفتار انسان را به متن دیجیتال قابل ویرایش تبدیل میکند"
        link="/ASR"
        key={1}
        bgClassName="bg-photoASR"
      />
      <ItemsComponnets
        id={2}
        title="OCR"
        discription="فناوری است که متن را از تصویر و اسناد اسکن شده به متن دیجیتال قابل ویرایش تبدیل میکند"
        link="http://195.191.45.56:17017"
        key={2}
        bgClassName="bg-photoOCR"
      />
      <ItemsComponnets
        id={3}
        title="VAD"
        discription="فناوری است که بخش های حاوی گفتار را در یک سیگنال صوتی شناسایی کرده و از بخش های بدون گفتار تفکیک میکند"
        link="/VAD"
        key={1}
        bgClassName="bg-photoVAD"
      />

      
      <ItemsComponnets
        id={3}
        title="Speech Enhancement"
        discription="فناوری است که کیفیت و وضوح صدای ظبط شده را با کاهش نویز و تقویت سیگنال های گفتاری بهبود می بخشد"
        link="/SpeechEnhancement"
        key={1}
        bgClassName="bg-photoSE"
      />
    </div>
  );
}
