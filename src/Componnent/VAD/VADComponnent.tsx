import React from 'react'
import HeaderMenue from '../Share/HeaderMenue';
import TitleDetails from '../Share/TitleDetails';

import VADbody from './VADbody';


export default function VADComponnent() {

    return (
        <div className='overflow-hidden h-screen'>
          <HeaderMenue />
          <div className="pb-20 overflow-auto h-[90vh]  bg-blue-50">
            <TitleDetails
              title={"VAD ابزار تفکیک بخش های گفتار از سکوت"}
              detailes={
                "فناوری ای است که بخش های حاوی گفتار را در یک سیگنال صوتی شناسایی کرده و از بخش های بدون گفتار تفکیک میکند "
              }
            />
            <VADbody/>
          </div>
        </div>
      );
 
}
