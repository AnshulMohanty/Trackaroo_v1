"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MeshBackground from "@/components/shared/MeshBackground";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    title: "Increase Revenue by 35%",
    description: "Optimize your operations and reduce waste with intelligent inventory management and automated workflows.",
    stat: "Average revenue increase reported by customers",
    icon: "revenue",
  },
  {
    title: "Save 20+ Hours Weekly",
    description: "Automate repetitive tasks and streamline processes to focus on growing your business instead of managing paperwork.",
    stat: "Time saved per week on administrative tasks",
    icon: "time",
  },
  {
    title: "99.9% Data Security",
    description: "Enterprise-grade security with encrypted data storage, regular backups, and compliance with industry standards.",
    stat: "Uptime guarantee with bank-level security",
    icon: "security",
  },
  {
    title: "Improve Team Productivity",
    description: "Real-time collaboration tools and mobile access keep your team connected and productive from anywhere.",
    stat: "Better coordination across all departments",
    icon: "productivity",
  },
];

// Custom Icon Components
function RevenueIcon() {
  return (
    <div className="relative w-12 h-12 flex items-center justify-center">
      <div className="absolute inset-0 bg-cyan-400/20 rounded-lg rotate-45" />
      <svg className="relative w-8 h-8" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L2 7L12 12L22 7L12 2Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-cyan-400"
        />
        <path
          d="M2 17L12 22L22 17"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-cyan-400"
        />
        <path
          d="M2 12L12 17L22 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-cyan-400"
        />
        <circle cx="12" cy="7" r="2" fill="currentColor" className="text-cyan-400" />
      </svg>
    </div>
  );
}

function TimeIcon() {
  return (
    <div className="relative w-12 h-12 flex items-center justify-center">
      <div className="absolute inset-0 bg-cyan-400/20 rounded-full" />
      <svg className="relative w-8 h-8" viewBox="0 0 24 24" fill="none">
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2"
          className="text-cyan-400"
        />
        <path
          d="M12 6V12L16 14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-cyan-400"
        />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" className="text-cyan-400" />
      </svg>
    </div>
  );
}

function SecurityIcon() {
  return (
    <div className="relative w-12 h-12 flex items-center justify-center">
      <div className="absolute inset-0 bg-cyan-400/20 rounded-lg" />
      <svg className="relative w-8 h-8" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-cyan-400"
        />
        <path
          d="M9 12L11 14L15 10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-cyan-400"
        />
      </svg>
    </div>
  );
}

function ProductivityIcon() {
  return (
    <div className="relative w-12 h-12 flex items-center justify-center">
      <div className="absolute inset-0 bg-cyan-400/20 rounded-lg" />
      <svg className="relative w-8 h-8" viewBox="0 0 24 24" fill="none">
        <path
          d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-cyan-400"
        />
        <path
          d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-cyan-400"
        />
        <path
          d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-cyan-400"
        />
        <path
          d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-cyan-400"
        />
      </svg>
    </div>
  );
}

const iconMap: Record<string, React.ComponentType> = {
  revenue: RevenueIcon,
  time: TimeIcon,
  security: SecurityIcon,
  productivity: ProductivityIcon,
};

export default function Diagnosis() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;

    if (!container || !content) return;

    const cards = content.querySelectorAll(".benefit-card");

    // Ensure section is visible initially
    gsap.set(container, { opacity: 1, visibility: "visible" });

    ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: () => `+=${Math.max(300, content.scrollWidth - window.innerWidth + 200)}`,
      pin: true,
      pinSpacing: true,
      scrub: 0.5,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onEnter: () => {
        // Ensure visibility on enter
        gsap.set(container, { opacity: 1, visibility: "visible" });
      },
      onUpdate: (self) => {
        const progress = self.progress;
        const maxScroll = Math.max(0, content.scrollWidth - window.innerWidth);
        const translateX = -progress * maxScroll;

        gsap.to(content, {
          x: translateX,
          duration: 0.1,
          ease: "none",
        });

        // Animate cards on scroll
        cards.forEach((card, index) => {
          const threshold = index * 0.25;

          if (progress > threshold) {
            card.classList.remove("opacity-50");
            card.classList.add("opacity-100", "scale-105");
          } else {
            card.classList.add("opacity-50");
            card.classList.remove("opacity-100", "scale-105");
          }
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden bg-[#0a0e27]"
      style={{ opacity: 1, visibility: "visible" }}
    >
      {/* Shared mesh background */}
      <div className="absolute inset-0 z-0">
        <MeshBackground />
      </div>
      {/* Smooth fade transition overlay at top */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0a0e27] to-transparent pointer-events-none z-30" />
      {/* Fixed Header - Always visible at top */}
      <div className="absolute top-0 left-0 right-0 z-50 pt-32 pb-8">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-gradient-to-b from-[#0a0e27] via-[#0a0e27]/98 to-transparent pb-8 -mx-4 px-4">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              Why Automotive Businesses Choose Trackaroo
            </h2>
            {/* Decorative heading line */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-400/50" />
              <div className="h-px w-24 bg-cyan-400/70" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-400/50" />
            </div>
            <p className="text-slate-400 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
              Join hundreds of successful dealerships and automotive businesses that have transformed
              their operations with our comprehensive platform.
            </p>
          </div>
        </div>
      </div>

      {/* Scrollable Cards Container */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center pt-56 z-20">
        <div
          ref={contentRef}
          className="flex items-center gap-6 md:gap-8 px-8 md:px-16"
          style={{ width: "max-content" }}
        >
          {benefits.map((benefit, index) => {
            const IconComponent = iconMap[benefit.icon];
            return (
              <div
                key={index}
                className="benefit-card flex-shrink-0 w-[320px] md:w-[400px] bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 transition-all duration-500 opacity-50 z-20 hover:border-cyan-400/30"
              >
                <div className="flex items-start gap-4 mb-4">
                  {IconComponent && <IconComponent />}
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-white leading-tight flex-1">
                    {benefit.title}
                  </h3>
                </div>
                <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-4">
                  {benefit.description}
                </p>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-cyan-400/70 text-xs md:text-sm font-mono">
                    {benefit.stat}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
