"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import MeshBackground from "@/components/shared/MeshBackground";
import TrackarooLogo from "@/../public/logo.jpg";

export default function Hero() {
  const holoPanelRef = useRef<HTMLDivElement>(null);
  const holoContainerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Array<{ id: number; left: number; delay: number; duration: number }>>([]);
  const dataBarsRef = useRef<Array<HTMLDivElement | null>>([]);
  const toggleDemoModal = (open: boolean) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("demo-modal-toggle", {
          detail: { open },
        })
      );
    }
  };

  // Generate floating particles (reduced for performance)
  useEffect(() => {
    const particleCount = 30;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: Math.random() * 5 + 5,
    }));
    setParticles(newParticles);
  }, []);

  // Initial fade-in animation for the panel
  useEffect(() => {
    const container = holoContainerRef.current;
    const panel = holoPanelRef.current;

    if (!container || !panel) return;

    // Set initial state - invisible and slightly scaled
    gsap.set(container, {
      opacity: 0,
      scale: 0.95,
    });

    // Animate in with dissolve effect
    gsap.to(container, {
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: "power2.out",
      delay: 0.3,
    });
  }, []);

  // 3D tilt effect on holographic panel
  useEffect(() => {
    const container = holoContainerRef.current;
    const panel = holoPanelRef.current;

    if (!container || !panel) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      gsap.to(panel, {
        transform: `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(panel, {
        transform: "",
        duration: 0.8,
        ease: "power2.out",
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);


  // Animate data bars on load and random updates
  useEffect(() => {
    const animateBars = () => {
      dataBarsRef.current.forEach((bar) => {
        if (bar) {
          const randomHeight = Math.floor(Math.random() * 40 + 50);
          bar.style.setProperty("--bar-height", `${randomHeight}%`);
          bar.style.animation = "none";
          setTimeout(() => {
            if (bar) {
              bar.style.animation = "barGrow 2s ease-out forwards";
            }
          }, 10);
        }
      });
    };

    // Initial animation
    setTimeout(animateBars, 500);

    // Random updates every 4 seconds
    const interval = setInterval(animateBars, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-x-hidden pt-24 md:pt-28 bg-[#0a0e27]">
      {/* Shared mesh background */}
      <div className="absolute inset-0 z-0">
        <MeshBackground />
      </div>

      {/* Floating particles */}
      <div ref={particlesRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-[1]">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-0.5 h-0.5 bg-cyan-400/60 rounded-full"
            style={{
              left: `${particle.left}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
              animation: "float 8s infinite",
              boxShadow: "0 0 4px rgba(0, 255, 255, 0.8)",
            }}
          />
        ))}
      </div>

      {/* Main container */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-5 py-10">
        {/* Hero Section */}
        <div className="text-center mb-16" style={{ animation: "fadeInDown 1s ease-out" }}>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-black italic tracking-wider mb-5 text-white relative"
            style={{
              textShadow: "0 0 30px rgba(0, 255, 255, 0.5), 0 0 60px rgba(0, 255, 255, 0.3)",
              animation: "titleGlow 3s ease-in-out infinite, textGlitch 3s ease-in-out infinite",
            }}
          >
            <span className="relative z-10 inline-block">ONE PLATFORM. COMPLETE CONTROL.</span>
            {/* Glitch layers for depth effect */}
            <span
              className="absolute top-0 left-0 w-full text-4xl md:text-5xl lg:text-6xl font-black italic tracking-wider text-cyan-400 opacity-0 pointer-events-none"
              style={{
                textShadow: "2px 0 0 rgba(255, 0, 0, 0.5), -2px 0 0 rgba(0, 255, 255, 0.5)",
                animation: "glitchLayer1 3s ease-in-out infinite",
                clipPath: "inset(0 0 0 0)",
              }}
            >
              ONE PLATFORM. COMPLETE CONTROL.
            </span>
            <span
              className="absolute top-0 left-0 w-full text-4xl md:text-5xl lg:text-6xl font-black italic tracking-wider text-red-400 opacity-0 pointer-events-none"
              style={{
                textShadow: "-2px 0 0 rgba(0, 255, 255, 0.5), 2px 0 0 rgba(255, 0, 0, 0.5)",
                animation: "glitchLayer2 3s ease-in-out infinite",
                clipPath: "inset(0 0 0 0)",
              }}
            >
              ONE PLATFORM. COMPLETE CONTROL.
            </span>
          </h1>
          <p className="text-lg md:text-xl tracking-[5px] text-gray-400 uppercase" style={{ textShadow: "0 0 10px rgba(255, 255, 255, 0.3)" }}>
            Eliminate operational chaos with a unified, cloud-based dealership OS
          </p>
        </div>

        {/* Holographic Panel Container */}
        <div
          ref={holoContainerRef}
          className="relative w-full max-w-6xl"
          style={{
            perspective: "1500px",
          }}
        >
          {/* Main Holographic Panel */}
          <div
            ref={holoPanelRef}
            className="relative bg-[rgba(10,20,30,0.4)] border-2 border-cyan-400/50 rounded-[20px] p-8 md:p-10 backdrop-blur-[20px] overflow-hidden"
            style={{
              boxShadow: "0 0 40px rgba(0, 255, 255, 0.3), 0 0 80px rgba(0, 255, 255, 0.1), inset 0 0 40px rgba(0, 255, 255, 0.05)",
              transformStyle: "preserve-3d",
              animation: "panelFloat 4s ease-in-out infinite, borderPulse 3s ease-in-out infinite",
            }}
          >
            {/* Scanning line effect */}
            <div
              className="absolute -top-full left-0 w-full h-full pointer-events-none"
              style={{
                background: "linear-gradient(to bottom, transparent 0%, rgba(0, 255, 255, 0.1) 50%, transparent 100%)",
                animation: "scanVertical 4s linear infinite",
              }}
            />

            {/* Corner decorations */}
            <div className="absolute top-[-2px] left-[-2px] w-10 h-10 border-2 border-cyan-400/60 border-r-0 border-b-0 rounded-tl-[20px] pointer-events-none">
              <div
                className="absolute -top-1 -left-1 w-2 h-2 bg-cyan-400 rounded-full"
                style={{
                  boxShadow: "0 0 10px #00ffff",
                  animation: "cornerBlink 2s ease-in-out infinite",
                }}
              />
            </div>
            <div className="absolute top-[-2px] right-[-2px] w-10 h-10 border-2 border-cyan-400/60 border-l-0 border-b-0 rounded-tr-[20px] pointer-events-none">
              <div
                className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full"
                style={{
                  boxShadow: "0 0 10px #00ffff",
                  animation: "cornerBlink 2s ease-in-out infinite",
                }}
              />
            </div>
            <div className="absolute bottom-[-2px] left-[-2px] w-10 h-10 border-2 border-cyan-400/60 border-r-0 border-t-0 rounded-bl-[20px] pointer-events-none">
              <div
                className="absolute -bottom-1 -left-1 w-2 h-2 bg-cyan-400 rounded-full"
                style={{
                  boxShadow: "0 0 10px #00ffff",
                  animation: "cornerBlink 2s ease-in-out infinite",
                }}
              />
            </div>
            <div className="absolute bottom-[-2px] right-[-2px] w-10 h-10 border-2 border-cyan-400/60 border-l-0 border-t-0 rounded-br-[20px] pointer-events-none">
              <div
                className="absolute -bottom-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full"
                style={{
                  boxShadow: "0 0 10px #00ffff",
                  animation: "cornerBlink 2s ease-in-out infinite",
                }}
              />
            </div>

            {/* Center Display with side panels */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-12 md:gap-16 my-10">
              {/* Left Panel */}
              <div className="flex-1 max-w-[350px] w-full space-y-5">
                <HoloCard
                  icon={
                    <svg className="w-12 h-12 mb-4" viewBox="0 0 50 50" fill="none" stroke="#00ffff" strokeWidth="2" style={{ filter: "drop-shadow(0 0 10px #00ffff)", animation: "iconFloat 3s ease-in-out infinite" }}>
                      <rect x="10" y="15" width="12" height="12" rx="2" />
                      <rect x="28" y="15" width="12" height="12" rx="2" />
                      <rect x="10" y="32" width="12" height="8" rx="2" />
                      <circle cx="34" cy="36" r="4" />
                    </svg>
                  }
                  title="Real-Time Tracking"
                  desc="Monitor all operations live with instant data sync"
                  status="ACTIVE"
                />
                <HoloCard
                  icon={
                    <svg className="w-12 h-12 mb-4" viewBox="0 0 50 50" fill="none" stroke="#00ffff" strokeWidth="2" style={{ filter: "drop-shadow(0 0 10px #00ffff)", animation: "iconFloat 3s ease-in-out infinite" }}>
                      <circle cx="25" cy="20" r="8" />
                      <path d="M 10,38 Q 25,32 40,38" />
                    </svg>
                  }
                  title="Automated Workflows"
                  desc="Streamline processes with intelligent automation"
                  status="OPTIMIZED"
                />
                <HoloCard
                  icon={
                    <svg className="w-12 h-12 mb-4" viewBox="0 0 50 50" fill="none" stroke="#00ffff" strokeWidth="2" style={{ filter: "drop-shadow(0 0 10px #00ffff)", animation: "iconFloat 3s ease-in-out infinite" }}>
                      <circle cx="25" cy="20" r="6" />
                      <path d="M 25,14 L 25,26 M 19,20 L 31,20" strokeWidth="2" strokeLinecap="round" />
                      <path d="M 15,35 Q 25,30 35,35" strokeWidth="1.5" />
                      <circle cx="20" cy="38" r="2" fill="#00ffff" />
                      <circle cx="25" cy="40" r="2" fill="#00ffff" />
                      <circle cx="30" cy="38" r="2" fill="#00ffff" />
                    </svg>
                  }
                  title="Smart Notifications"
                  desc="Stay updated with automated alerts for critical events"
                  status="NOTIFYING"
                />
              </div>

              {/* Central Rotating Hologram */}
              <div className="relative w-[200px] h-[200px] md:w-[250px] md:h-[250px] group" style={{ animation: "holoRotate 8s linear infinite" }}>
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[3px] border-cyan-400/60 rounded-full"
                  style={{
                    width: "200px",
                    height: "200px",
                    animation: "circlePulse 2s ease-in-out infinite",
                    animationDelay: "0s",
                  }}
                />
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[3px] border-cyan-400/60 rounded-full"
                  style={{
                    width: "160px",
                    height: "160px",
                    animation: "circlePulse 2s ease-in-out infinite",
                    animationDelay: "0.3s",
                  }}
                />
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[3px] border-cyan-400/60 rounded-full"
                  style={{
                    width: "120px",
                    height: "120px",
                    animation: "circlePulse 2s ease-in-out infinite",
                    animationDelay: "0.6s",
                  }}
                />
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ perspective: "1200px" }}
                >
                  <div
                    className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border border-cyan-300/70 bg-[#031125] shadow-[0_0_30px_rgba(0,255,255,0.35)] transition-[transform,box-shadow] duration-700 [transform:rotateX(12deg)_rotateY(-6deg)] group-hover:[transform:rotateX(2deg)_rotateY(4deg)_scale(1.08)] group-hover:shadow-[0_0_44px_rgba(0,255,255,0.65)]"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cyan-900/40" />
                    <Image
                      src={TrackarooLogo}
                      alt="Trackaroo kangaroo emblem"
                      fill
                      sizes="(max-width: 768px) 112px, 144px"
                      priority
                      className="object-cover scale-[1.55] -translate-y-1"
                      style={{ objectPosition: "50% 34%" }}
                    />
                    <div className="absolute inset-0 rounded-full border border-white/25 mix-blend-soft-light" />
                    <div className="absolute inset-0 rounded-full shadow-[inset_0_0_22px_rgba(0,0,0,0.65)]" />
                    <div className="absolute -inset-5 rounded-full bg-cyan-400/25 blur-3xl opacity-60" aria-hidden />
                  </div>
                </div>
              </div>

              {/* Right Panel */}
              <div className="flex-1 max-w-[350px] w-full space-y-5">
                <HoloCard
                  icon={
                    <svg className="w-12 h-12 mb-4" viewBox="0 0 50 50" fill="none" stroke="#00ffff" strokeWidth="2" style={{ filter: "drop-shadow(0 0 10px #00ffff)", animation: "iconFloat 3s ease-in-out infinite" }}>
                      <path d="M 25,10 L 30,20 L 40,22 L 32,30 L 34,40 L 25,35 L 16,40 L 18,30 L 10,22 L 20,20 Z" />
                    </svg>
                  }
                  title="Advanced Analytics"
                  desc="Make data-driven decisions with AI insights"
                  status="ANALYZING"
                />
                <HoloCard
                  icon={
                    <svg className="w-12 h-12 mb-4" viewBox="0 0 50 50" fill="none" stroke="#00ffff" strokeWidth="2" style={{ filter: "drop-shadow(0 0 10px #00ffff)", animation: "iconFloat 3s ease-in-out infinite" }}>
                      {/* Bar Chart */}
                      <rect x="10" y="30" width="8" height="15" />
                      <rect x="21" y="20" width="8" height="25" />
                      <rect x="32" y="25" width="8" height="20" />
                      {/* Base line */}
                      <line x1="8" y1="45" x2="42" y2="45" strokeWidth="1.5" />
                      {/* Trend line overlay */}
                      <path d="M 14,30 Q 25,20 38,25" strokeWidth="1.5" strokeDasharray="2,2" opacity="0.6" />
                      {/* Data points */}
                      <circle cx="14" cy="30" r="2" fill="#00ffff" />
                      <circle cx="25" cy="20" r="2" fill="#00ffff" />
                      <circle cx="38" cy="25" r="2" fill="#00ffff" />
                    </svg>
                  }
                  title="Performance Metrics"
                  desc="Track KPIs and improve operations efficiency"
                  status="MONITORING"
                />
                <HoloCard
                  icon={
                    <svg className="w-12 h-12 mb-4" viewBox="0 0 50 50" fill="none" stroke="#00ffff" strokeWidth="2" style={{ filter: "drop-shadow(0 0 10px #00ffff)", animation: "iconFloat 3s ease-in-out infinite" }}>
                      <rect x="12" y="12" width="26" height="26" rx="2" />
                      <path d="M 20,25 L 22,27 L 30,19" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="25" cy="35" r="4" />
                      <path d="M 25,39 L 25,42 M 25,39 L 22,41 M 25,39 L 28,41" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  }
                  title="Data Security & Compliance"
                  desc="Protect business data with secure, compliant storage and access controls"
                  status="SECURED"
                />
              </div>
            </div>

          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-16 flex items-center justify-center">
          <button
            onClick={() => toggleDemoModal(true)}
            className="group relative flex w-full max-w-[460px] items-center gap-6 rounded-[32px] border border-cyan-400/50 bg-gradient-to-r from-[#041228]/90 via-[#071c34]/80 to-[#041228]/90 px-8 py-5 text-left text-white shadow-[0_0_35px_rgba(0,255,255,0.25)] transition-all duration-500 hover:border-cyan-200/80 hover:shadow-[0_0_55px_rgba(0,255,255,0.45)]"
            style={{ backdropFilter: "blur(18px)" }}
            aria-label="Start your engine"
          >
            <span className="pointer-events-none absolute inset-0 rounded-[32px] bg-[radial-gradient(circle_at_30%_20%,rgba(0,255,255,0.25),transparent_55%)] opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
            {/* Engine dial */}
            <span className="relative flex h-16 w-16 items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-gradient-to-b from-cyan-500/40 to-blue-900/60 blur-lg opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="relative flex h-full w-full items-center justify-center rounded-full border border-cyan-300/70 bg-black/60 shadow-[inset_0_0_25px_rgba(0,0,0,0.8)]">
                <span className="absolute inset-[6px] rounded-full border border-cyan-400/60 opacity-70" />
                <span className="absolute inset-[12px] rounded-full border border-cyan-200/30" />
                <span className="absolute inset-[18px] rounded-full border border-cyan-200/20" />
                <span className="absolute bottom-3 left-1/2 h-6 w-0.5 origin-bottom -translate-x-1/2 rounded-full bg-gradient-to-b from-white to-cyan-400 transition-transform duration-500 group-hover:-rotate-45" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-cyan-100">Start</span>
              </span>
            </span>
            {/* Text */}
            <div className="relative flex flex-col">
              <span className="text-xs uppercase tracking-[0.5em] text-cyan-300/80"> ignition </span>
              <span className="font-heading text-2xl uppercase tracking-[0.2em]">Start your engine</span>
              <span className="text-[11px] uppercase tracking-[0.6em] text-cyan-200/80"> launch demo </span>
            </div>
            {/* Motion trails */}
            <div className="ml-auto flex h-14 w-28 flex-col justify-between">
              <span className="h-1 w-full origin-left scale-x-75 rounded-full bg-gradient-to-r from-transparent via-cyan-300/70 to-cyan-200/0 transition-all duration-500 group-hover:scale-x-100 group-hover:translate-x-2" />
              <span className="h-1 w-4/5 origin-left scale-x-50 rounded-full bg-gradient-to-r from-transparent via-cyan-300/70 to-cyan-200/0 transition-all duration-500 group-hover:scale-x-100 group-hover:translate-x-4 delay-75" />
              <span className="h-1 w-1/2 origin-left scale-x-50 rounded-full bg-gradient-to-r from-transparent via-cyan-300/70 to-cyan-200/0 transition-all duration-500 group-hover:scale-x-100 group-hover:translate-x-6 delay-150" />
            </div>
          </button>
        </div>
      </div>

    </section>
  );
}

// Holographic Card Component
function HoloCard({
  icon,
  title,
  desc,
  status,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  status: string;
}) {
  return (
    <div
      className="relative bg-[rgba(0,30,50,0.3)] border border-cyan-400/30 rounded-[15px] p-6 backdrop-blur-[10px] transition-all duration-400 overflow-hidden group cursor-pointer"
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateZ(20px) scale(1.05)";
        e.currentTarget.style.borderColor = "rgba(0, 255, 255, 0.8)";
        e.currentTarget.style.boxShadow = "0 0 30px rgba(0, 255, 255, 0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.borderColor = "rgba(0, 255, 255, 0.3)";
        e.currentTarget.style.boxShadow = "";
      }}
    >
      {/* Shimmer effect */}
      <div
        className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] pointer-events-none"
        style={{
          background: "linear-gradient(45deg, transparent, rgba(0, 255, 255, 0.1), transparent)",
          transform: "rotate(45deg)",
          animation: "shimmerCard 3s linear infinite",
        }}
      />
      {icon}
      <h3 className="text-lg font-bold text-cyan-400 mb-2.5" style={{ textShadow: "0 0 10px rgba(0, 255, 255, 0.5)" }}>
        {title}
      </h3>
      <p className="text-sm text-gray-400 leading-relaxed mb-2.5">{desc}</p>
      <div className="flex items-center gap-2 text-sm text-cyan-400">
        <div
          className="w-2 h-2 bg-cyan-400 rounded-full"
          style={{
            boxShadow: "0 0 10px #00ffff",
            animation: "blink 1.5s ease-in-out infinite",
          }}
        />
        <span>{status}</span>
      </div>
    </div>
  );
}

// Data Bar Component
const DataBar = React.forwardRef<HTMLDivElement, { height: number; delay: number }>(({ height, delay }, ref) => {
  return (
    <div
      ref={ref}
      className="w-[60px] h-20 bg-cyan-400/10 border border-cyan-400/30 rounded-[5px] relative overflow-hidden"
      style={{
        "--bar-height": `${height}%`,
      } as React.CSSProperties}
    >
      <div
        className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-cyan-400 to-cyan-400/40 rounded-[5px]"
        style={{
          boxShadow: "0 0 20px #00ffff",
          animation: `barGrow 2s ease-out forwards`,
          animationDelay: `${delay}s`,
        }}
      />
    </div>
  );
});

DataBar.displayName = "DataBar";
