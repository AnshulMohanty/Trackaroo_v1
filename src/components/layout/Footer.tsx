"use client";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-[#050810] to-black py-32">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-8">
          Ready to Transform?
        </h2>
        <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto">
          Join the dealerships already running at peak performance with
          Trackaroo.
        </p>

        {/* Massive Circular CTA Button */}
        <div className="flex justify-center">
          <button className="relative group">
            {/* Outer Glow */}
            <div className="absolute -inset-8 bg-cyan-400/30 rounded-full blur-2xl group-hover:bg-cyan-400/50 transition-all duration-500 animate-pulse" />

            {/* Button Circle */}
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full border-2 border-cyan-400/70 bg-black/60 backdrop-blur-sm flex items-center justify-center overflow-hidden group-hover:border-cyan-400 group-hover:scale-110 transition-all duration-500">
              {/* Inner Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Text */}
              <div className="relative z-10 text-center">
                <div className="font-heading font-bold text-cyan-400 uppercase tracking-widest text-sm md:text-base mb-1">
                  START
                </div>
                <div className="font-heading font-bold text-cyan-400 uppercase tracking-widest text-sm md:text-base">
                  ENGINE
                </div>
              </div>

              {/* Animated Ring */}
              <div
                className="absolute inset-0 rounded-full border-2 border-cyan-400/30"
                style={{
                  animation: "spin 20s linear infinite",
                }}
              />
            </div>
          </button>
        </div>

        {/* Footer Text */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <p className="text-slate-500 text-sm">
            © 2025 Trackaroo Inc. All Systems Nominal.
          </p>
        </div>
      </div>
    </footer>
  );
}
