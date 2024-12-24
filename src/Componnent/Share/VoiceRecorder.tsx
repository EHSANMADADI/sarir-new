import React, { useState, useRef, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import { IoPauseOutline } from "react-icons/io5";
import { MdRectangle } from "react-icons/md";
import { CiMicrophoneOn } from "react-icons/ci";
import { useStore } from "../../Store/Store";


interface VoiceRecorderProps {
  nameComponent: string;
  onRecordingComplete: (recording: { name: string; audio: string, language: string; }) => void;
}

export default function VoiceRecorder({
  nameComponent,
  onRecordingComplete,
}: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<any | null>(null);

  // Zustand store
  const { addRecording,audioURLs,lang } = useStore();

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Audio = reader.result as string;
          const recording = { name: fileName, audio: base64Audio, language:lang };

          // Save to Zustand
          addRecording(recording);

          // Update parent state
          onRecordingComplete(recording);

          audioChunksRef.current = [];
          setFileName("");
        };
        reader.readAsDataURL(audioBlob);
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setIsPaused(false);

      // Start timer
      setRecordingTime(0);
      timerRef.current = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const handlePauseRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const handleResumeRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "paused"
    ) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      timerRef.current = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    setIsPaused(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  console.log('audioURLs',audioURLs);
  

  return (
    <div>
      <div className="my-5 flex justify-center ">
        <input
          placeholder="اسم فایل رکورد ..."
          type="text"
          dir="rtl"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          className="bg-white focus:outline-blue-600 focus:outline-4 border border-gray-100 rounded px-5 py-1"
        />
      </div>
      <div className="flex items-center justify-center my-5">
        {!isRecording && (
          <div
            onClick={fileName ? handleStartRecording : undefined}
            className={`${
              fileName
                ? "bg-blue-500 cursor-pointer"
                : "bg-blue-700 cursor-not-allowed"
            } p-3 rounded-full mx-1`}
          >
            <span className="text-white text-6xl">
              <CiMicrophoneOn />
            </span>
          </div>
        )}
        {isPaused && (
          <div
            onClick={handleResumeRecording}
            className="bg-gray-200 cursor-pointer p-3 rounded-full mx-1"
          >
            <span className="text-blue-600 text-xl">
              <FaPlay />
            </span>
          </div>
        )}
        {!isPaused && isRecording && (
          <div
            onClick={handlePauseRecording}
            className="bg-gray-200 cursor-pointer p-3 rounded-full mx-1"
          >
            <span className="text-blue-500 text-xl">
              <IoPauseOutline />
            </span>
          </div>
        )}
        {isRecording && (
          <div
            onClick={handleStopRecording}
            className="bg-gray-200 cursor-pointer p-3 rounded-full mx-1"
          >
            <span className="text-yellow-500 text-xl">
              <MdRectangle />
            </span>
          </div>
        )}
      </div>
      {isRecording && (
        <div className="text-center text-gray-700 font-bold text-lg">
          {recordingTime}s
        </div>
      )}
    </div>
  );
}
