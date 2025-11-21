"use client";

import { useState, useRef, useEffect } from "react";
import { SpeakerHigh, SpeakerSlash } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import MeshBackground from "@/components/shared/MeshBackground";

export default function TestDrive() {
  const [audioOn, setAudioOn] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = !audioOn;
    }
  }, [audioOn]);


  return (
    <section ref={sectionRef} className="w-full py-20 flex justify-center items-center relative overflow-hidden bg-[#0a0e27]">
      {/* Shared mesh background */}
      <div className="absolute inset-0 z-0">
        <MeshBackground />
      </div>
      {/* Smooth fade transition overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#0a0e27] pointer-events-none z-10" />
      <div className="relative w-full max-w-6xl px-4">
        {/* HUD Frame */}
        <div className="relative w-full aspect-video rounded-2xl border border-white/10 bg-black/50 overflow-hidden shadow-2xl shadow-cyan-900/20 group">
          
          {/* Top Left: Recording Indicator */}
          <div className="absolute top-6 left-8 z-20 flex items-center gap-3 pointer-events-none">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_red]" />
            <span className="font-mono text-xs text-red-500 tracking-widest uppercase font-bold">REC • LIVE FEED</span>
          </div>

          {/* Video Player */}
          <video 
            ref={videoRef}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
            autoPlay 
            loop 
            muted 
            playsInline
          >
            <source src="https://res.cloudinary.com/demo/video/upload/v1691498063/car-dashboard-ui.mp4" type="video/mp4" />
          </video>

          {/* Scanline Overlay */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]" />

          {/* Bottom Right: Audio Toggle */}
          <div className="absolute bottom-6 right-6 z-20">
            <button
              onClick={() => setAudioOn(!audioOn)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full",
                "bg-black/40 backdrop-blur-md border border-white/10",
                "hover:bg-cyan-500/20 hover:border-cyan-500/50 hover:text-cyan-400 transition-all duration-300",
                "text-white font-mono text-xs tracking-wider uppercase"
              )}
            >
              {audioOn ? (
                <>
                  <SpeakerHigh size={16} weight="fill" />
                  <span>Audio On</span>
                </>
              ) : (
                <>
                  <SpeakerSlash size={16} weight="fill" />
                  <span>Audio Off</span>
                </>
              )}
            </button>
          </div>

          {/* Decorative Corners */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-white/20 rounded-tl-2xl pointer-events-none" />
          <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-white/20 rounded-tr-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-white/20 rounded-bl-2xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-white/20 rounded-br-2xl pointer-events-none" />
        </div>
      </div>
    </section>
  );
}