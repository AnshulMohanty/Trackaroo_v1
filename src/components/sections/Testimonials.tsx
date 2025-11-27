"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MeshBackground from "@/components/shared/MeshBackground";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Shobit Mighlani",
    role: "Automotive DMS",
    initials: "SM",
    quote: "Trackaroo transformed how we manage our inventory. We've reduced time waste by 40% and increased our profit margins significantly.",
  },
  {
    name: "Akshay Patni",
    role: "Field Staff Tracking",
    initials: "AP",
    quote: "The field staff tracking feature is amazing. We can monitor our team in real-time and improve customer service delivery.",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLElement[];

    // Set initial state
    gsap.set(cards, {
      opacity: 0,
      y: 50,
      scale: 0.95,
    });

    // Create scroll trigger
    const scrollTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top 70%",
      onEnter: () => {
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: "power3.out",
        });
      },
    });

    return () => {
      if (scrollTrigger) {
        scrollTrigger.kill();
      }
      cards.forEach((card) => {
        if (card && card.isConnected) {
          gsap.killTweensOf(card);
        }
      });
    };
  }, []);

  return (
    <section id="testimonials" ref={sectionRef} className="w-full py-16 relative bg-[#0a0e27]">
      {/* Shared mesh background */}
      <div className="absolute inset-0 z-0">
        <MeshBackground />
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Trusted by Industry Leaders
          </h2>
          {/* Decorative heading line */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-400/50" />
            <div className="h-px w-24 bg-cyan-400/70" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-400/50" />
          </div>
          <p className="text-slate-400 text-lg">
            See what automotive business owners are saying about Trackaroo
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="relative bg-black/40 backdrop-blur-sm rounded-2xl p-8 group overflow-hidden"
              style={{
                boxShadow: "0 0 30px rgba(0, 255, 255, 0.1), inset 0 0 20px rgba(0, 255, 255, 0.05)",
              }}
            >
              {/* Futuristic animated border */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none">
                {/* Base border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-cyan-400/20" />
                
                {/* Animated gradient border */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                  style={{
                    backgroundImage: "linear-gradient(45deg, rgba(0, 255, 255, 0.3), rgba(0, 212, 255, 0.25), rgba(0, 184, 255, 0.3), rgba(0, 255, 255, 0.3))",
                    backgroundSize: "300% 300%",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundClip: "padding-box",
                    animation: "flowGradientMove 3s linear infinite",
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                    padding: "2px",
                  } as React.CSSProperties}
                />
                
                {/* Pulsing glow border */}
                <div 
                  className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                  style={{
                    backgroundImage: "linear-gradient(45deg, rgba(0, 255, 255, 0.2), rgba(0, 212, 255, 0.15), rgba(0, 184, 255, 0.2), rgba(0, 255, 255, 0.2))",
                    backgroundSize: "200% 200%",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundClip: "padding-box",
                    animation: "pulseGlow 2s ease-in-out infinite",
                    filter: "blur(8px)",
                    zIndex: -1,
                  } as React.CSSProperties}
                />

                {/* Scanning border effect */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                  style={{
                    backgroundImage: "linear-gradient(90deg, transparent 0%, rgba(0, 255, 255, 0.15) 50%, transparent 100%)",
                    backgroundSize: "200% 100%",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundClip: "padding-box",
                    animation: "underlineFlow 2s linear infinite",
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                    padding: "2px",
                  } as React.CSSProperties}
                />

                {/* Corner glow dots */}
                <div className="absolute top-0 left-0 w-2.5 h-2.5 bg-cyan-400/60 rounded-full opacity-0 group-hover:opacity-70 transition-opacity duration-500 shadow-[0_0_8px_rgba(0,255,255,0.5)] animate-pulse" style={{ transform: "translate(-50%, -50%)" }} />
                <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-cyan-400/60 rounded-full opacity-0 group-hover:opacity-70 transition-opacity duration-500 shadow-[0_0_8px_rgba(0,255,255,0.5)] animate-pulse" style={{ transform: "translate(50%, -50%)" }} />
                <div className="absolute bottom-0 left-0 w-2.5 h-2.5 bg-cyan-400/60 rounded-full opacity-0 group-hover:opacity-70 transition-opacity duration-500 shadow-[0_0_8px_rgba(0,255,255,0.5)] animate-pulse" style={{ transform: "translate(-50%, 50%)" }} />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-cyan-400/60 rounded-full opacity-0 group-hover:opacity-70 transition-opacity duration-500 shadow-[0_0_8px_rgba(0,255,255,0.5)] animate-pulse" style={{ transform: "translate(50%, 50%)" }} />
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Avatar and Name */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-teal-400 flex items-center justify-center text-white font-bold text-lg shadow-[0_0_20px_rgba(0,255,255,0.5)]">
                      {testimonial.initials}
                    </div>
                    <div className="absolute inset-0 rounded-full bg-cyan-400/30 blur-xl animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-white mb-1">
                      {testimonial.name}
                    </h3>
                    <p className="text-slate-400 text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                {/* Quote */}
                <div className="relative">
                  <div className="absolute -left-2 top-0 text-cyan-400/20 text-6xl font-serif leading-none">"</div>
                  <p className="text-slate-300 text-base leading-relaxed italic relative z-10 pl-6">
                    {testimonial.quote}
                  </p>
                  <div className="absolute -right-2 bottom-0 text-cyan-400/20 text-6xl font-serif leading-none">"</div>
                </div>

                {/* Glow indicator */}
                <div className="mt-6 flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(0,255,255,0.8)]" />
                  <span className="text-cyan-400/70 text-xs font-mono uppercase tracking-wider">
                    Verified User
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

