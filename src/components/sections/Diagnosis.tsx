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
    title: "Boost Operational Efficiency by 40%",
    description: "Automate repetitive tasks and streamline processes to focus on growing your business instead of managing paperwork.",
    stat: "Average efficiency improvement measured across workflows",
    icon: "efficiency",
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
  {
    title: "Faster Decision-Making with AI Insights",
    description: "Get instant analytics and actionable insights to make smarter, quicker operational decisions.",
    stat: "AI-powered metrics for clearer and faster business direction",
    icon: "ai",
  },
  {
    title: "Reduce Inventory Loss by 25%",
    description: "Track stock movement accurately, minimise shrinkage, and maintain optimal inventory levels.",
    stat: "Data based on customer-reported reductions in errors and wastage.",
    icon: "inventory",
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

function EfficiencyIcon() {
  return (
    <div className="relative w-12 h-12 flex items-center justify-center">
      <div className="absolute inset-0 bg-cyan-400/20 rounded-lg rotate-45" />
      <svg className="relative w-8 h-8" viewBox="0 0 24 24" fill="none">
        <path
          d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
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

function AIIcon() {
  return (
    <div className="relative w-12 h-12 flex items-center justify-center">
      <div className="absolute inset-0 bg-cyan-400/20 rounded-lg" />
      <svg className="relative w-8 h-8" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="2" className="text-cyan-400" />
        <path
          d="M12 11V14M12 14L9 17M12 14L15 17"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-cyan-400"
        />
        <path
          d="M3 21C3 17.134 6.13401 14 10 14C13.866 14 17 17.134 17 21"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-cyan-400"
        />
        <circle cx="19" cy="5" r="2" fill="currentColor" className="text-cyan-400" />
        <circle cx="5" cy="5" r="2" fill="currentColor" className="text-cyan-400" />
      </svg>
    </div>
  );
}

function InventoryIcon() {
  return (
    <div className="relative w-12 h-12 flex items-center justify-center">
      <div className="absolute inset-0 bg-cyan-400/20 rounded-lg" />
      <svg className="relative w-8 h-8" viewBox="0 0 24 24" fill="none">
        <rect
          x="3"
          y="7"
          width="18"
          height="14"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
          className="text-cyan-400"
        />
        <path
          d="M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7"
          stroke="currentColor"
          strokeWidth="2"
          className="text-cyan-400"
        />
        <path
          d="M12 11V17M9 14H15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-cyan-400"
        />
        <circle cx="8" cy="19" r="1" fill="currentColor" className="text-cyan-400" />
        <circle cx="16" cy="19" r="1" fill="currentColor" className="text-cyan-400" />
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
  efficiency: EfficiencyIcon,
  security: SecurityIcon,
  productivity: ProductivityIcon,
  ai: AIIcon,
  inventory: InventoryIcon,
};

export default function Diagnosis() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;

    if (!container || !content) return;

    const cards = Array.from(content.querySelectorAll(".benefit-card")) as HTMLElement[];

    // Ensure section is visible initially
    gsap.set(container, { opacity: 1, visibility: "visible" });

    // Calculate card positions for centering
    const calculateCardPositions = () => {
      const viewportWidth = window.innerWidth;
      const viewportCenter = viewportWidth / 2;
      const rightOffset = 200; // Start cards more to the right
      
      return cards.map((card) => {
        const cardLeftRelative = card.offsetLeft;
        const cardWidth = card.offsetWidth;
        const cardCenterRelative = cardLeftRelative + cardWidth / 2;
        const targetX = viewportCenter - cardCenterRelative + rightOffset;
        return targetX;
      });
    };

    // Enhanced highlight function with smooth popup and glow
    const highlightCard = (card: HTMLElement) => {
      if (!card || !card.isConnected) return;
      card.classList.remove("opacity-50");
      card.classList.add("opacity-100", "card-highlighted");
      
      // Smooth popup effect with gentle scale
      gsap.to(card, {
        scale: 1.06,
        duration: 0.6,
        ease: "power2.out",
        force3D: true,
        overwrite: true
      });

      // Smooth animated border glow
      gsap.to(card, {
        boxShadow: "0 0 30px rgba(0, 255, 255, 0.6), 0 0 60px rgba(0, 255, 255, 0.3), inset 0 0 20px rgba(0, 255, 255, 0.1)",
        borderColor: "rgba(0, 255, 255, 0.8)",
        duration: 0.6,
        ease: "power2.out",
        force3D: true,
        overwrite: true
      });
    };

    // Smooth dim card function
    const dimCard = (card: HTMLElement) => {
      if (!card || !card.isConnected) return;
      card.classList.add("opacity-50");
      card.classList.remove("opacity-100", "card-highlighted");
      
      gsap.to(card, {
        scale: 1,
        boxShadow: "none",
        borderColor: "rgba(255, 255, 255, 0.1)",
        duration: 0.5,
        ease: "power2.out",
        force3D: true,
        overwrite: true
      });
    };

    let scrollTrigger: ScrollTrigger | null = null;
    let lastHighlightedCard: HTMLElement | null = null;

    // Initialize positions and highlight first card
    const initializePositions = () => {
      // Wait for layout to be complete
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const positions = calculateCardPositions();
          if (positions.length > 0 && positions[0] !== undefined && !isNaN(positions[0])) {
            // Start first card more to the right (add extra offset)
            const initialOffset = positions[0] + 150; // Start 150px more to the right
            gsap.set(content, { 
              x: initialOffset,
              immediateRender: true
            });
          }
          // Dim all cards first
          cards.forEach((card) => {
            card.classList.add("opacity-50");
            card.classList.remove("opacity-100", "card-highlighted");
            gsap.set(card, { scale: 1, boxShadow: "none", borderColor: "rgba(255, 255, 255, 0.1)" });
          });
          // Highlight first card initially
          if (cards.length > 0) {
            highlightCard(cards[0]);
            lastHighlightedCard = cards[0];
          }
        });
      });
    };

    // Setup scroll trigger
    const setupScrollTrigger = () => {
      const positions = calculateCardPositions();
      
      if (positions.length === 0) return;

      const firstCardX = positions[0] + 150; // Account for initial right offset
      const lastCardX = positions[positions.length - 1];
      const scrollDistance = Math.abs(lastCardX - firstCardX);
      const totalCards = cards.length;
      
      scrollTrigger = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: `+=${scrollDistance + window.innerHeight * 0.5}`,
        pin: true,
        pinSpacing: true,
        scrub: 1.5,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        markers: false,
        onEnter: () => {
          gsap.set(container, { opacity: 1, visibility: "visible" });
          // Ensure first card starts more to the right
          const positions = calculateCardPositions();
          if (positions.length > 0 && positions[0] !== undefined) {
            const initialOffset = positions[0] + 150; // Start 150px more to the right
            gsap.set(content, { x: initialOffset });
          }
          // Dim all cards first
          cards.forEach((card) => {
            dimCard(card);
          });
          // Highlight first card
          if (cards.length > 0) {
            highlightCard(cards[0]);
            lastHighlightedCard = cards[0];
          }
        },
        onUpdate: (self) => {
          const progress = self.progress;
          const currentPositions = calculateCardPositions();
          
          if (totalCards === 0 || currentPositions.length === 0) return;
          
          // Handle initial state - ensure first card starts more to the right when progress is 0
          if (progress <= 0.01) {
            const firstCardX = currentPositions[0] ?? 0;
            const initialOffset = firstCardX + 150; // Start 150px more to the right
            gsap.set(content, { x: initialOffset, force3D: true });
            if (lastHighlightedCard !== cards[0]) {
              if (lastHighlightedCard) {
                dimCard(lastHighlightedCard);
              }
              highlightCard(cards[0]);
              lastHighlightedCard = cards[0];
            }
            return;
          }
          
          // Calculate which card should be centered based on progress
          // Adjust progress to account for initial left offset of first card
          const adjustedProgress = progress;
          const cardProgress = adjustedProgress * (totalCards - 1);
          const currentIndex = Math.min(Math.floor(cardProgress), totalCards - 1);
          const nextIndex = Math.min(currentIndex + 1, totalCards - 1);
          const localProgress = cardProgress - currentIndex;
          
          // Smooth interpolation between card positions
          let currentX = currentPositions[currentIndex] ?? 0;
          let nextX = currentIndex === nextIndex ? currentX : (currentPositions[nextIndex] ?? 0);
          
          // If we're transitioning from first card's right position to center
          if (currentIndex === 0) {
            const initialOffset = currentX + 150;
            // Smoothly transition from right offset to center over first 25% of scroll with easing
            if (progress < 0.25) {
              const transitionProgress = progress / 0.25;
              // Use easing function for smoother transition
              const easedProgress = 1 - Math.pow(1 - transitionProgress, 3); // ease-out cubic
              currentX = initialOffset + (currentX - initialOffset) * easedProgress;
            }
          }
          
          const translateX = currentX + (nextX - currentX) * localProgress;

          // Use smooth animation with easing for relaxed feel
          gsap.to(content, {
            x: translateX,
            duration: 0.3,
            ease: "power1.out",
            force3D: true,
            overwrite: true
          });

          // Find the card closest to center for highlighting
          let closestCard: HTMLElement | null = null;
          let minDistance = Infinity;
          let closestIndex = 0;

          cards.forEach((card, index) => {
            const cardRect = card.getBoundingClientRect();
            const viewportCenter = window.innerWidth / 2;
            const cardCenter = cardRect.left + cardRect.width / 2;
            const distanceFromCenter = Math.abs(viewportCenter - cardCenter);

            if (distanceFromCenter < minDistance) {
              minDistance = distanceFromCenter;
              closestCard = card;
              closestIndex = index;
            }
          });

          // Highlight the closest card if it's within threshold (with hysteresis to prevent jitter)
          const highlightThreshold = 350;
          if (closestCard && minDistance < highlightThreshold) {
            // Only update if card changed or if significantly closer to avoid jitter
            const shouldUpdate = lastHighlightedCard !== closestCard || 
                                 (lastHighlightedCard && minDistance < 200);
            
            if (shouldUpdate) {
              // Dim previous card smoothly
              if (lastHighlightedCard && lastHighlightedCard !== closestCard) {
                dimCard(lastHighlightedCard);
              }
              // Highlight new card smoothly
              if (lastHighlightedCard !== closestCard) {
                highlightCard(closestCard);
                lastHighlightedCard = closestCard;
              }
            }
          }

          // Dim all other cards smoothly
          cards.forEach((card, index) => {
            if (card !== closestCard || minDistance >= highlightThreshold) {
              if (card !== lastHighlightedCard) {
                dimCard(card);
              }
            }
          });

          // At the end (progress > 0.95), ensure last card is highlighted
          if (progress > 0.95 && totalCards > 0) {
            const lastCard = cards[totalCards - 1];
            if (lastHighlightedCard !== lastCard) {
              if (lastHighlightedCard) {
                dimCard(lastHighlightedCard);
              }
              highlightCard(lastCard);
              lastHighlightedCard = lastCard;
            }
          }
        },
        onLeave: () => {
          // When leaving section, ensure smooth transition
          if (lastHighlightedCard) {
            dimCard(lastHighlightedCard);
          }
        },
      });
    };

    // Wait for layout before setting up
    let initTimeout: NodeJS.Timeout;
    initTimeout = setTimeout(() => {
      initializePositions();
      requestAnimationFrame(() => {
        setupScrollTrigger();
        ScrollTrigger.refresh();
      });
    }, 100);

    // Throttled resize handler
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (scrollTrigger) {
          scrollTrigger.kill();
          scrollTrigger = null;
        }
        lastHighlightedCard = null;
        initializePositions();
        requestAnimationFrame(() => {
          setupScrollTrigger();
          ScrollTrigger.refresh();
        });
      }, 250);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      if (initTimeout) {
        clearTimeout(initTimeout);
      }
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
      window.removeEventListener("resize", handleResize);
      if (scrollTrigger) {
        scrollTrigger.kill();
        scrollTrigger = null;
      }
      cards.forEach((card) => {
        if (card && card.isConnected) {
          gsap.killTweensOf(card);
        }
      });
      if (content) {
        gsap.killTweensOf(content);
      }
    };
  }, []);

  return (
    <section
      id="about"
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
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pt-56 z-20 overflow-visible">
        <div
          ref={contentRef}
          className="flex items-center gap-6 md:gap-8 px-4 md:px-8"
          style={{ 
            width: "max-content", 
            willChange: "transform",
            transform: "translateZ(0)",
            backfaceVisibility: "hidden"
          }}
        >
          {benefits.map((benefit, index) => {
            const IconComponent = iconMap[benefit.icon];
            return (
              <div
                key={index}
                className={`benefit-card flex-shrink-0 w-[320px] md:w-[400px] bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 transition-all duration-500 ease-out z-20 hover:border-cyan-400/30 relative ${
                  index === 0 ? "opacity-100" : "opacity-50"
                }`}
                style={{ 
                  transformOrigin: "center center",
                  willChange: "transform, opacity",
                  transform: "translateZ(0)"
                }}
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
