"use client";

import { useEffect, useRef } from "react";
import { Check, X } from "@phosphor-icons/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MeshBackground from "@/components/shared/MeshBackground";

gsap.registerPlugin(ScrollTrigger);

const features = [
  { name: "Mobile First", trackaroo: true, competitor: false },
  { name: "Unified Dashboard", trackaroo: true, competitor: false },
  { name: "Real-time Sync", trackaroo: true, competitor: false },
  { name: "AI Pricing Engine", trackaroo: true, competitor: false },
  { name: "Cloud-Based", trackaroo: true, competitor: false },
  { name: "Multi-Branch Support", trackaroo: true, competitor: true },
  { name: "Automated Stock Reconciliation", trackaroo: true, competitor: false },
  { name: "PDI Automation", trackaroo: true, competitor: false },
  { name: "Insurance Renewal Management", trackaroo: true, competitor: false },
  { name: "Field Staff Tracking", trackaroo: true, competitor: false },
  { name: "Tally Integration", trackaroo: true, competitor: false },
];

export default function Comparison() {
  const sectionRef = useRef<HTMLElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTriggerRef = useRef<ReturnType<typeof ScrollTrigger.create> | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const table = tableRef.current;
    if (!section || !table) return;

    // Clean up any existing ScrollTrigger
    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.kill();
      scrollTriggerRef.current = null;
    }

    // Set initial state - hide all checkmarks and X marks
    const trackarooIcons = Array.from(table.querySelectorAll(".trackaroo-icon")) as HTMLElement[];
    const trackarooTexts = Array.from(table.querySelectorAll(".trackaroo-text")) as HTMLElement[];
    const competitorIcons = Array.from(table.querySelectorAll(".competitor-icon")) as HTMLElement[];
    const competitorTexts = Array.from(table.querySelectorAll(".competitor-text")) as HTMLElement[];

    // Check if elements exist before animating
    const allElements = [...trackarooIcons, ...trackarooTexts, ...competitorIcons, ...competitorTexts].filter(Boolean);
    if (allElements.length === 0) return;

    gsap.set(allElements, {
      opacity: 0,
      scale: 0,
    });

    // Create scroll trigger animation
    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: section,
      start: "top 70%",
      end: "bottom 30%",
      onEnter: () => {
        // Check if elements still exist before animating
        if (!section || !table || !sectionRef.current || !tableRef.current) return;

        // Animate Trackaroo checkmarks with staggered effect and glow
        if (trackarooIcons.length > 0) {
          gsap.to(trackarooIcons, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(1.7)",
            onComplete: () => {
              // Add continuous pulsing glow effect to Trackaroo icons (green)
              trackarooIcons.forEach((icon) => {
                if (icon && icon.isConnected) {
                  gsap.to(icon, {
                    filter: "drop-shadow(0 0 12px rgba(34, 197, 94, 1)) drop-shadow(0 0 24px rgba(34, 197, 94, 0.6))",
                    duration: 1.5,
                    yoyo: true,
                    repeat: -1,
                    ease: "power2.inOut",
                  });
                }
              });
            },
          });
        }

        if (trackarooTexts.length > 0) {
          gsap.to(trackarooTexts, {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            stagger: 0.1,
            delay: 0.1,
            ease: "power2.out",
          });
        }

        // Animate competitor icons (slower, dimmer)
        if (competitorIcons.length > 0) {
          gsap.to(competitorIcons, {
            opacity: 0.5,
            scale: 1,
            duration: 0.4,
            stagger: 0.08,
            delay: 0.3,
            ease: "power2.out",
          });
        }

        if (competitorTexts.length > 0) {
          gsap.to(competitorTexts, {
            opacity: 0.5,
            scale: 1,
            duration: 0.3,
            stagger: 0.08,
            delay: 0.4,
            ease: "power2.out",
          });
        }

        // Animate rows appearing
        rowsRef.current.forEach((row, index) => {
          if (row && row.isConnected) {
            gsap.from(row, {
              opacity: 0,
              y: 20,
              duration: 0.5,
              delay: index * 0.08,
              ease: "power2.out",
            });
          }
        });
      },
      onEnterBack: () => {
        // Check if elements still exist before animating
        if (!section || !table || !sectionRef.current || !tableRef.current) return;

        if (trackarooIcons.length > 0) {
          gsap.to(trackarooIcons, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            stagger: 0.05,
          });
        }
        if (trackarooTexts.length > 0) {
          gsap.to(trackarooTexts, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            stagger: 0.05,
          });
        }
        if (competitorIcons.length > 0) {
          gsap.to(competitorIcons, {
            opacity: 0.5,
            scale: 1,
            duration: 0.3,
            stagger: 0.05,
          });
        }
        if (competitorTexts.length > 0) {
          gsap.to(competitorTexts, {
            opacity: 0.5,
            scale: 1,
            duration: 0.3,
            stagger: 0.05,
          });
        }
      },
    });

    return () => {
      // Kill all GSAP animations on elements
      allElements.forEach((el) => {
        if (el && el.isConnected) {
          gsap.killTweensOf(el);
        }
      });
      
      // Kill ScrollTrigger from ref
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
      
      // Clean up any remaining ScrollTriggers for this section
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars && trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section id="compare" ref={sectionRef} className="w-full py-16 relative bg-[#0a0e27]">
      {/* Shared mesh background */}
      <div className="absolute inset-0 z-0">
        <MeshBackground />
      </div>
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16 relative z-10">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            The Spec Sheet
          </h2>
          {/* Decorative heading line */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-400/50" />
            <div className="h-px w-24 bg-cyan-400/70" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-400/50" />
          </div>
          <p className="text-slate-400 text-lg">
            Trackaroo vs Traditional DMS
          </p>
        </div>

        <div className="relative">
          {/* Racing Leaderboard Table */}
          <div ref={tableRef} className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-3 gap-4 p-6 border-b border-white/10">
              <div className="font-heading font-bold text-slate-400 uppercase tracking-wider text-sm">
                Feature
              </div>
              <div className="relative flex items-center justify-center">
                <div className="font-heading font-bold text-cyan-400 uppercase tracking-wider text-sm">
                  Trackaroo
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/20 via-cyan-400/10 to-transparent rounded-lg blur-xl -z-10" />
              </div>
              <div className="font-heading font-bold text-slate-300 uppercase tracking-wider text-sm text-center flex items-center justify-center">
                Traditional DMS
              </div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-white/5">
              {features.map((feature, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    rowsRef.current[index] = el;
                  }}
                  className="grid grid-cols-3 gap-4 p-6 hover:bg-white/5 transition-colors"
                >
                  <div className="font-sans text-white font-medium flex items-center">
                    {feature.name}
                  </div>
                  <div className="flex items-center justify-center">
                    {feature.trackaroo ? (
                      <div className="flex items-center gap-2 text-green-400">
                        <Check
                          className="trackaroo-icon"
                          size={24}
                          weight="fill"
                          style={{
                            filter: "drop-shadow(0 0 8px rgba(34, 197, 94, 0.8)) drop-shadow(0 0 16px rgba(34, 197, 94, 0.4))",
                          }}
                        />
                        <span className="font-heading font-bold trackaroo-text uppercase tracking-wider text-sm">YES</span>
                      </div>
                    ) : (
                      <X size={24} className="text-red-500" weight="fill" />
                    )}
                  </div>
                  <div className="flex items-center justify-center">
                    {feature.competitor ? (
                      <div className="flex items-center gap-2 text-green-400/50">
                        <Check className="competitor-icon" size={24} weight="fill" style={{ opacity: 0.5 }} />
                        <span className="font-heading competitor-text uppercase tracking-wider text-sm text-green-400/50">YES</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-red-500">
                        <X className="competitor-icon" size={24} weight="fill" style={{ filter: "drop-shadow(0 0 4px rgba(239, 68, 68, 0.6))" }} />
                        <span className="font-heading competitor-text uppercase tracking-wider text-sm text-red-500">NO</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
