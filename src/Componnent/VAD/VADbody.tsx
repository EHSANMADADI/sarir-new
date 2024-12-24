import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDeleteForever, MdDeleteSweep } from "react-icons/md";
import VoiceRecorder from "../Share/VoiceRecorder";
import WavesurferPlayer from "@wavesurfer/react";
import { FaRegCirclePlay } from "react-icons/fa6";

import { FaPauseCircle } from "react-icons/fa";

export default function VADBody() {
  const [savedRecordings, setSavedRecordings] = useState(() => {
    const storage = JSON.parse(localStorage.getItem("VAD") || "[]");
    return storage;
  });
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  // نگهداری وضعیت پخش هر فایل
  const [isPlayingMap, setIsPlayingMap] = useState<{ [key: number]: boolean }>({});
  const [wavesurfers, setWavesurfers] = useState<any>({});

  const onReady = (ws: any, index: number) => {
    setWavesurfers((prev: any) => ({
      ...prev,
      [index]: ws, // ذخیره wavesurfer برای هر فایل با استفاده از ایندکس
    }));
    setIsPlayingMap((prev) => ({
      ...prev,
      [index]: false,
    }));
  };

  const onPlayPause = (index: number) => {
    setIsPlayingMap((prev) => {
      const newMap = { ...prev };

      // اگر یک فایل در حال پخش است، آن را متوقف کنید
      Object.keys(newMap).forEach((key) => {
        const keyIndex = parseInt(key); // تبدیل کلید به عدد
        if (keyIndex !== index) {
          newMap[keyIndex] = false;
        }
      });

      // وضعیت فایل فعلی را تغییر دهید
      newMap[index] = !newMap[index];
      return newMap;
    });

    if (wavesurfers[index]) {
      wavesurfers[index].playPause();
    }
  };

  const deleteItem = (index: number) => {
    const updatedRecordings = savedRecordings.filter(
      (_: any, i: number) => i !== index
    );
    setSavedRecordings(updatedRecordings);
  };

  const handleNewRecording = (recording: { name: string; audio: string }) => {
    setSavedRecordings((prev: any) => [...prev, recording]);
  };

  const handleButtonClick = () => {
    document.getElementById("dropzone-file")?.click();
  };

  useEffect(() => {
    localStorage.setItem("VAD", JSON.stringify(savedRecordings));
  }, [savedRecordings]);

  return (
    <div className="bg-blue-50 max-h-screen h-auto flex font-Byekan mt-20 justify-around">
      <div className="extended-file">
        {savedRecordings.length > 0 ? (
          <>
            <div className="flex justify-end">
              <span className="text-gray-500 font-Byekan text-lg">
                : فایل های موجود برای حذف قسمت های سکوت
              </span>
            </div>
            <div className="border-b-2 border-gray-600">
              {savedRecordings.map(
                (item: { name: string; audio: string }, index: number) => (
                  <div className="mt-2 mb-3" key={index}>
                    <span>{item.name}:</span>
                    <div className="flex items-center w-full border rounded-full px-3 mb-2">
                      <button className="text-lg mx-2" onClick={() => onPlayPause(index)}>
                        {isPlayingMap[index] ? (
                          <span className="text-red-500 text-3xl">
                            <FaPauseCircle />
                          </span>
                        ) : (
                          <span className="text-blue-500 text-3xl">
                            <FaRegCirclePlay />
                          </span>
                        )}
                      </button>
                      <div className="w-5/6 ">
                        <WavesurferPlayer
                          height={50}
                          waveColor="blue"
                          url={item.audio}
                          onReady={(ws) => onReady(ws, index)}
                          onPlay={() => setIsPlayingMap((prev) => ({ ...prev, [index]: true }))}
                          onPause={() => setIsPlayingMap((prev) => ({ ...prev, [index]: false }))}
                        />
                      </div>
                    </div>

                    <div className="flex items-center">
                      <span
                        onClick={() => deleteItem(index)}
                        className="text-white text-xl bg-gradient-to-r px-6 py-2 cursor-pointer rounded-2xl hover:scale-105 duration-200 from-red-600 to-red-950"
                      >
                        <MdDeleteForever />
                      </span>

                      <span className="text-white text-base mx-2 bg-gradient-to-r px-16 py-2 cursor-pointer hover:scale-105 duration-200 rounded-2xl from-blue-600 to-blue-950">
                        {" "}
                        تبدیل
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>
          </>
        ) : (
          <span className="text-xl font-bold text-gray-600">
            فایلی برای نمایش وجود ندارد
          </span>
        )}
      </div>
      <div className="input-div">
        <input
          id="dropzone-file"
          type="file"
          accept=".mp3"
          className="hidden"
          onChange={handleFileChange}
        />
        <div className="flex justify-end mb-5">
          <span className="text-gray-500 font-Byekan font-bold text-lg">
            : انتخاب فایل از سیستم
          </span>
        </div>

        <div className="mb-16 flex" dir="rtl">
          <button
            onClick={handleButtonClick}
            className="flex items-center px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-950 opacity-80 rounded-xl font-black text-xl shadow-2xl hover:opacity-100 border-[3px] border-blue-200 text-white"
          >
            انتخاب فایل ها
            <span className="mr-2">
              <FaCloudUploadAlt />
            </span>
          </button>
          {file && (
            <div className="flex items-center mx-2">
              <span className="text-red-700 cursor-pointer">
                <MdDeleteSweep />
              </span>
              <span className="ml-4 text-gray-700">{file.name} </span>
            </div>
          )}
        </div>
        <VoiceRecorder
          nameComponent="VAD"
          onRecordingComplete={handleNewRecording}
        />
      </div>
    </div>
  );
}
