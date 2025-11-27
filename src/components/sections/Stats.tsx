"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const stats = [
  { value: 1000, suffix: "+", label: "Active Users", duration: 2000 },
  { value: 40, suffix: "%", label: "Faster Operations", duration: 1500 },
  { value: 25, suffix: "+", label: "Dealerships using Trackaroo", duration: 1000 },
  { value: 24, suffix: "/7", label: "Support Available", duration: 1200 },
];

function CountUp({
  end,
  suffix,
  duration,
  isInView,
}: {
  end: number;
  suffix: string;
  duration: number;
  isInView: boolean;
}) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);

  useEffect(() => {
    if (!isInView) return;

    const startTime = Date.now();
    const startValue = 0;

    const updateCount = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(startValue + (end - startValue) * easeOutQuart);

      setCount(current);
      countRef.current = current;

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(updateCount);
  }, [end, duration, isInView]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const toggleDemoModal = (open: boolean) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("demo-modal-toggle", {
          detail: { open },
        })
      );
    }
  };

  return (
    <section
      ref={ref}
      className="w-full bg-gradient-to-b from-[#0B1120] to-[#050810] py-16 relative z-20"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            The Telemetry
          </h2>
          <p className="text-slate-400 text-lg">
            Real numbers from real dealerships running at peak performance
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-cyan-400/30 transition-all duration-500"
            >
              <div className="font-mono text-5xl md:text-6xl font-bold text-cyan-400 mb-4 tabular-nums">
                <CountUp
                  end={stat.value}
                  suffix={stat.suffix}
                  duration={stat.duration}
                  isInView={isInView}
                />
              </div>
              <div className="font-heading text-slate-400 text-sm uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-4">
          <div className="relative">
            <button
              onClick={() => toggleDemoModal(true)}
              className="group relative flex items-center gap-5 px-10 py-5 rounded-full border border-cyan-400/60 bg-gradient-to-r from-cyan-500/10 via-sky-500/5 to-teal-400/10 text-white font-heading tracking-[0.3em] uppercase shadow-[0_0_40px_rgba(0,255,255,0.2)] transition-all duration-300 hover:shadow-[0_0_60px_rgba(0,255,255,0.4)] hover:border-cyan-300"
            >
              <span className="absolute inset-0 rounded-full bg-cyan-400/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative flex items-center gap-3 pr-3">
                <div className="relative w-14 h-8 rounded-full bg-gradient-to-r from-transparent to-cyan-400/30">
                  <span
                    className="absolute inset-y-[2px] left-1 w-12 rounded-full bg-black/40 border border-cyan-400/40"
                    style={{ animation: "pulseGlow 2.4s ease-in-out infinite" }}
                  />
                  <svg
                    viewBox="0 0 64 24"
                    className="absolute inset-0 text-cyan-300"
                    style={{ animation: "slide 2s ease-in-out infinite" }}
                  >
                    <rect x="6" y="8" width="44" height="10" rx="4" fill="currentColor" opacity="0.15" />
                    <path
                      d="M10 16C10 18.2091 8.20914 20 6 20C3.79086 20 2 18.2091 2 16C2 13.7909 3.79086 12 6 12C8.20914 12 10 13.7909 10 16Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M62 16C62 18.2091 60.2091 20 58 20C55.7909 20 54 18.2091 54 16C54 13.7909 55.7909 12 58 12C60.2091 12 62 13.7909 62 16Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M10 13L16 8H46C50 8 54 10 56 13"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M22 6H34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="20" cy="16" r="2" fill="currentColor" />
                    <circle cx="44" cy="16" r="2" fill="currentColor" />
                  </svg>
                </div>
                <div className="h-10 w-1 bg-gradient-to-b from-cyan-400/80 to-transparent rounded-full opacity-80 group-hover:opacity-100" />
              </div>
              <span className="relative z-10">Start Your Engine</span>
              <span className="relative z-10 text-cyan-200 text-sm tracking-widest flex items-center gap-1">
                GO
                <svg viewBox="0 0 12 12" className="w-3 h-3">
                  <path d="M2 2L10 6L2 10V2Z" fill="currentColor" />
                </svg>
              </span>
            </button>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-1 rounded-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60 animate-pulse" />
          </div>
          <p className="text-slate-400 text-sm text-center">
            Fire up a live demo and see Trackaroo&apos;s cockpit in action.
          </p>
        </div>
      </div>
    </section>
  );
}

