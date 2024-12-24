import React, { useEffect, useRef } from 'react'

export default function CoustomAudioVisulaizer({ audioSrc }: { audioSrc: string }) {
   

    
      const canvasRef = useRef<HTMLCanvasElement>(null);
      const audioRef = useRef<HTMLAudioElement>(null);
    
      useEffect(() => {
        const canvas = canvasRef.current;
        const audio = audioRef.current;
        if (!canvas || !audio) return;
    
        const ctx = canvas.getContext("2d");
        const audioCtx = new AudioContext();
        const analyser = audioCtx.createAnalyser();
        const source = audioCtx.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(audioCtx.destination);
    
        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
    
        const draw = () => {
          if (!ctx) return;
    
          analyser.getByteFrequencyData(dataArray);
    
          ctx.fillStyle = "#000";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
    
          const barWidth = (canvas.width / bufferLength) * 2.5;
          let barHeight;
          let x = 0;
    
          for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i];
    
            ctx.fillStyle = `rgb(${barHeight + 100}, 50, 50)`;
            ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);
    
            x += barWidth + 1;
          }
    
          requestAnimationFrame(draw);
        };
    
        audio.onplay = () => {
          audioCtx.resume();
          draw();
        };
    
        return () => {
          audioCtx.close();
        };
      }, []);
    
      return (
        <div>
          <audio controls ref={audioRef} src={audioSrc} />
          <canvas ref={canvasRef} width="500" height="100" className="border" />
        </div>
      );
   
    
   
    
}
