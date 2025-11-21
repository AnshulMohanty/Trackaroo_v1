"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import MeshBackground from "@/components/shared/MeshBackground";

export default function Hero() {
  const holoPanelRef = useRef<HTMLDivElement>(null);
  const holoContainerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Array<{ id: number; left: number; delay: number; duration: number }>>([]);
  const dataBarsRef = useRef<Array<HTMLDivElement | null>>([]);

  // Generate 80 floating particles
  useEffect(() => {
    const particleCount = 80;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: Math.random() * 5 + 5,
    }));
    setParticles(newParticles);
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
            className="text-4xl md:text-5xl lg:text-6xl font-black italic tracking-wider mb-5 text-white"
            style={{
              textShadow: "0 0 30px rgba(0, 255, 255, 0.5), 0 0 60px rgba(0, 255, 255, 0.3)",
              animation: "titleGlow 3s ease-in-out infinite",
            }}
          >
            ONE PLATFORM. COMPLETE CONTROL.
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
            animation: "floatIn 1.5s ease-out",
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
              </div>

              {/* Central Rotating Hologram */}
              <div className="relative w-[200px] h-[200px] md:w-[250px] md:h-[250px]" style={{ animation: "holoRotate 8s linear infinite" }}>
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
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl md:text-2xl font-bold text-cyan-400 text-center"
                  style={{
                    textShadow: "0 0 20px #00ffff",
                    letterSpacing: "2px",
                  }}
                >
                  TRACKAROO
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
                      <rect x="10" y="30" width="8" height="15" />
                      <rect x="21" y="20" width="8" height="25" />
                      <rect x="32" y="25" width="8" height="20" />
                    </svg>
                  }
                  title="Performance Metrics"
                  desc="Track KPIs and improve efficiency continuously"
                  status="MONITORING"
                />
              </div>
            </div>

            {/* Vehicle Display */}
            <div className="mt-10 text-center">
              <svg
                className="w-[200px] h-[100px] mx-auto mb-5"
                viewBox="0 0 200 100"
                fill="none"
                stroke="#00ffff"
                strokeWidth="2"
                style={{
                  filter: "drop-shadow(0 0 20px #00ffff)",
                  animation: "vehiclePulse 3s ease-in-out infinite",
                }}
              >
                <path d="M 20,60 L 40,40 L 80,40 L 100,60 Z" />
                <path d="M 100,60 L 120,40 L 160,40 L 180,60 Z" />
                <line x1="20" y1="60" x2="180" y2="60" strokeWidth="3" />
                <circle cx="50" cy="60" r="12" />
                <circle cx="50" cy="60" r="8" />
                <circle cx="150" cy="60" r="12" />
                <circle cx="150" cy="60" r="8" />
                <rect x="45" y="45" width="10" height="10" />
                <rect x="80" y="45" width="10" height="10" />
                <rect x="130" y="45" width="10" height="10" />
              </svg>
              <div className="flex gap-2.5 justify-center mt-5">
                <DataBar ref={(el) => { dataBarsRef.current[0] = el; }} height={70} delay={0.1} />
                <DataBar ref={(el) => { dataBarsRef.current[1] = el; }} height={85} delay={0.3} />
                <DataBar ref={(el) => { dataBarsRef.current[2] = el; }} height={60} delay={0.5} />
                <DataBar ref={(el) => { dataBarsRef.current[3] = el; }} height={90} delay={0.7} />
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-16 text-center">
          <a
            href="#"
            className="inline-flex items-center justify-center px-12 py-5 bg-cyan-400/10 border-[3px] border-cyan-400 rounded-[50px] text-cyan-400 text-lg md:text-xl font-bold uppercase tracking-[2px] cursor-pointer relative overflow-hidden transition-all duration-400"
            style={{
              boxShadow: "0 0 30px rgba(0, 255, 255, 0.3), inset 0 0 20px rgba(0, 255, 255, 0.05)",
              animation: "buttonPulse 2s ease-in-out infinite",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(0, 255, 255, 0.2)";
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 0 60px rgba(0, 255, 255, 0.6), inset 0 0 40px rgba(0, 255, 255, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(0, 255, 255, 0.1)";
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 0 30px rgba(0, 255, 255, 0.3), inset 0 0 20px rgba(0, 255, 255, 0.05)";
            }}
          >
            <span className="relative z-10">TURN THE ENGINE ON</span>
          </a>
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
