"use client";

export default function SectionSeparator() {
  return (
    <div className="relative w-full h-1 overflow-hidden">
      {/* Continuous Scanning Line Effect */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60"
        style={{
          animation: "scanLine 3s linear infinite",
        }}
      />
    </div>
  );
}

