"use client";

import Image from "next/image";
import React from "react";
import TrackarooLogo from "@/../public/logo.jpg";

interface LogoProps {
  className?: string;
  size?: number;
  showGlow?: boolean;
}

export default function Logo({ className = "", size = 64, showGlow = true }: LogoProps) {
  const dimension = size;

  return (
    <div
      className={`group relative inline-flex items-center justify-center ${className}`}
      style={{ width: dimension * 1.1, height: dimension * 1.1 }}
      aria-label="Trackaroo"
    >
      {showGlow && (
        <>
          <div
            className="absolute inset-0 rounded-full opacity-70 blur-xl transition-all duration-500 group-hover:opacity-90"
            style={{
              background: "radial-gradient(circle, rgba(0,255,213,0.45), transparent 70%)",
            }}
          />
          <div
            className="absolute inset-0 rounded-full opacity-30 transition-all duration-500 group-hover:opacity-70"
            style={{
              background: "radial-gradient(circle, rgba(0,255,255,0.4), transparent 60%)",
              filter: "blur(22px)",
            }}
          />
        </>
      )}

      <div className="relative z-10 rounded-full overflow-hidden shadow-[0_0_22px_rgba(0,255,255,0.35)] group-hover:shadow-[0_0_40px_rgba(0,255,255,0.65)] transition-all duration-500 ease-out transform group-hover:scale-[1.15] group-hover:rotate-[4deg]">
        <Image
          src={TrackarooLogo}
          alt="Trackaroo logo"
          width={dimension}
          height={dimension}
          draggable={false}
          priority
          className="object-cover"
        />
      </div>

      {showGlow && (
        <span
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
          aria-hidden="true"
        >
          <span
            className="absolute left-1/2 top-1/2 h-[160%] w-[35%] -translate-x-1/2 -translate-y-full rotate-12 bg-gradient-to-b from-white/60 to-transparent opacity-0 transition duration-500 group-hover:opacity-60 group-hover:-translate-y-[20%]"
          />
        </span>
      )}
    </div>
  );
}

