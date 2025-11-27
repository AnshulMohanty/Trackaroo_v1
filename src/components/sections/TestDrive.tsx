"use client";

import { useState, useRef, useEffect } from "react";
import { SpeakerHigh, SpeakerSlash, Play } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import MeshBackground from "@/components/shared/MeshBackground";

export default function TestDrive() {
  const [audioOn, setAudioOn] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const [showOverlay, setShowOverlay] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = !audioOn;
    }
  }, [audioOn]);

  // Intersection Observer to track when section is in/out of view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const wasInView = isInView;
          setIsInView(entry.isIntersecting);

          // When section goes out of view: pause and reset video
          if (!entry.isIntersecting && wasInView) {
            if (videoRef.current) {
              videoRef.current.pause();
              videoRef.current.currentTime = 0; // Reset to beginning
              setIsVideoPlaying(false);
            }
          }

          // When section comes back into view: show initial overlay
          if (entry.isIntersecting && !wasInView) {
            if (videoRef.current) {
              videoRef.current.pause();
              videoRef.current.currentTime = 0; // Reset to beginning
              setIsVideoPlaying(false);
              setShowOverlay(true);
              // Reset hasPlayedOnce so it shows as initial state
              setHasPlayedOnce(false);
            }
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of section is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isInView]);

  // Determine if overlay should be shown
  useEffect(() => {
    // Show overlay if video hasn't been played yet (initial state)
    setShowOverlay(!hasPlayedOnce && !isVideoPlaying);
  }, [isVideoPlaying, hasPlayedOnce]);

  const handlePlayVideo = async () => {
    if (videoRef.current) {
      try {
        await videoRef.current.play();
        setIsVideoPlaying(true);
        setHasPlayedOnce(true);
        setShowOverlay(false);
      } catch (error) {
        console.error("Error playing video:", error);
      }
    }
  };


  return (
    <section id="demo" ref={sectionRef} className="w-full py-16 flex justify-center items-center relative overflow-hidden bg-[#0a0e27]">
      {/* Shared mesh background */}
      <div className="absolute inset-0 z-0">
        <MeshBackground />
      </div>
      {/* Smooth fade transition overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#0a0e27] pointer-events-none z-10" />
      <div className="relative w-full max-w-6xl px-4">
        {/* Section Header with Car Element */}
        <div className="text-center mb-12 relative">
          {/* Animated Car Icon */}
          <div className="relative inline-flex items-center justify-center mb-6">
            {/* Glowing background circle */}
            <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-2xl animate-pulse" />
            
            {/* Car SVG Icon */}
            <div className="relative w-20 h-20 md:w-24 md:h-24">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full text-cyan-400"
                style={{
                  filter: "drop-shadow(0 0 20px rgba(0, 255, 255, 0.8))",
                  animation: "iconFloat 3s ease-in-out infinite",
                }}
              >
                {/* Car body */}
                <path
                  d="M 20 50 L 25 35 L 35 30 L 65 30 L 75 35 L 80 50 L 80 60 L 75 65 L 70 65 L 70 70 L 65 75 L 35 75 L 30 70 L 30 65 L 25 65 L 20 60 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Windshield */}
                <path
                  d="M 35 35 L 45 32 L 55 32 L 65 35"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  opacity="0.7"
                />
                {/* Wheels */}
                <circle cx="35" cy="70" r="8" fill="none" stroke="currentColor" strokeWidth="2.5" />
                <circle cx="65" cy="70" r="8" fill="none" stroke="currentColor" strokeWidth="2.5" />
                <circle cx="35" cy="70" r="4" fill="currentColor" opacity="0.6" />
                <circle cx="65" cy="70" r="4" fill="currentColor" opacity="0.6" />
                {/* Speed lines */}
                <path
                  d="M 10 45 L 15 45 M 10 55 L 15 55"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.5"
                  style={{
                    animation: "dashMove 2s linear infinite",
                  }}
                />
              </svg>
              
              {/* Rotating rings around car */}
              <div
                className="absolute inset-0 rounded-full border-2 border-cyan-400/30"
                style={{
                  animation: "rotate360 4s linear infinite",
                }}
              />
              <div
                className="absolute inset-2 rounded-full border border-teal-400/40"
                style={{
                  animation: "rotate360 3s linear infinite reverse",
                }}
              />
            </div>
          </div>

          {/* Heading */}
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4 relative">
            <span className="relative z-10" style={{ textShadow: "0 0 30px rgba(0, 255, 255, 0.5)" }}>
              Demo Video
            </span>
            {/* Glowing effect behind text */}
            <span
              className="absolute inset-0 blur-xl opacity-50"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.4), transparent)",
                animation: "titleGlow 3s ease-in-out infinite",
              }}
            />
          </h2>

          {/* Decorative heading line with car tracks */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-400/50" />
            {/* Car track pattern */}
            <div className="relative flex items-center gap-2">
              <div className="h-px w-24 bg-cyan-400/70" />
              {/* Small car track dots */}
              <div className="absolute -top-1 left-2 w-1 h-1 bg-cyan-400 rounded-full animate-pulse" />
              <div className="absolute -top-1 right-2 w-1 h-1 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
            </div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-400/50" />
          </div>

          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
            Experience Trackaroo in action - See how our platform transforms automotive operations
          </p>
        </div>

        {/* HUD Frame */}
        <div className="relative w-full aspect-video rounded-2xl border border-white/10 bg-black/50 overflow-hidden shadow-2xl shadow-cyan-900/20 group">
          
          {/* Top Left: Recording Indicator */}
          <div className="absolute top-6 left-8 z-20 flex items-center gap-3 pointer-events-none">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_red]" />
            <span className="font-mono text-xs text-red-500 tracking-widest uppercase font-bold">REC • LIVE FEED</span>
          </div>

          {/* Top Right: Audio Toggle */}
          <div className="absolute top-6 right-6 z-20">
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

          {/* Video Player */}
          <video 
            ref={videoRef}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
            loop 
            muted={!audioOn}
            playsInline
            controls={hasPlayedOnce || isVideoPlaying}
            onPlay={() => {
              setIsVideoPlaying(true);
              if (!hasPlayedOnce) {
                setHasPlayedOnce(true);
              }
              setShowOverlay(false);
            }}
            onPause={() => {
              setIsVideoPlaying(false);
              // Don't show overlay on pause - let user scrub the video
              // Overlay will only show if they scroll away and come back
            }}
            onEnded={() => {
              setIsVideoPlaying(false);
              // Overlay will be shown by useEffect if conditions are met
            }}
          >
            <source src="/demo video.mp4" type="video/mp4" />
            <source src="/demo%20video.mp4" type="video/mp4" />
          </video>

          {/* Play Button Overlay */}
          {showOverlay && (
            <div 
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:bg-black/50 z-30"
              onClick={handlePlayVideo}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handlePlayVideo();
                }
              }}
              role="button"
              tabIndex={0}
            >
              <button 
                type="button"
                className="relative group/btn focus:outline-none"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlayVideo();
                }}
              >
                {/* Outer glow ring */}
                <div className="absolute inset-0 rounded-full bg-cyan-400/30 blur-xl animate-pulse" />
                
                {/* Main button */}
                <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400/90 to-teal-400/90 flex items-center justify-center border-2 border-white/30 shadow-[0_0_40px_rgba(0,255,255,0.6)] transition-all duration-300 group-hover/btn:scale-110 group-hover/btn:shadow-[0_0_60px_rgba(0,255,255,0.9)]">
                  <Play 
                    size={40} 
                    weight="fill" 
                    className="text-white ml-1" 
                  />
                </div>
                
                {/* Animated rings */}
                <div className="absolute inset-0 rounded-full border-2 border-cyan-300/50 animate-ping" style={{ animationDuration: "2s" }} />
                <div className="absolute inset-0 rounded-full border border-cyan-200/30 animate-pulse" />
              </button>
              
              {/* Play text */}
              <div className="mt-8 text-white/90 text-base uppercase tracking-wider font-medium">
                Click to Play Demo
              </div>
            </div>
          )}

          {/* Scanline Overlay */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]" />

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