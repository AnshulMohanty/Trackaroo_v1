"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  LinkedinLogo, 
  InstagramLogo,
  Envelope,
  Phone,
  X
} from "@phosphor-icons/react";
import Logo from "@/components/shared/Logo";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [particles, setParticles] = useState<Array<{ left: number; top: number; duration: number; delay: number }>>([]);
  const footerRef = useRef<HTMLElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const socialIconsRef = useRef<HTMLDivElement>(null);
  const bottomSectionRef = useRef<HTMLDivElement>(null);
  const comingSoonPopupRef = useRef<HTMLDivElement>(null);
  const comingSoonOverlayRef = useRef<HTMLDivElement>(null);

  // Generate particles only on client side to avoid hydration mismatch
  useEffect(() => {
    setParticles(
      Array.from({ length: 6 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 5 + Math.random() * 5,
        delay: Math.random() * 2,
      }))
    );
  }, []);

  useEffect(() => {
    if (showComingSoon) {
      document.body.style.overflow = "hidden";
      
      // Animate popup entrance
      if (comingSoonOverlayRef.current && comingSoonPopupRef.current) {
        gsap.fromTo(
          comingSoonOverlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3 }
        );
        gsap.fromTo(
          comingSoonPopupRef.current,
          { opacity: 0, scale: 0.9, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power3.out" }
        );
      }
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showComingSoon]);

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate columns on scroll
      const columns = columnsRef.current?.children;
      if (columns) {
        gsap.fromTo(
          Array.from(columns),
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 80%",
              end: "top 50%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Logo animation
      if (logoRef.current) {
        gsap.fromTo(
          logoRef.current,
          {
            scale: 0.8,
            opacity: 0,
            rotation: -10,
          },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: logoRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Social icons animation
      const socialIcons = socialIconsRef.current?.children;
      if (socialIcons) {
        gsap.fromTo(
          Array.from(socialIcons),
          {
            scale: 0,
            rotation: -180,
            opacity: 0,
          },
          {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "elastic.out(1, 0.5)",
            scrollTrigger: {
              trigger: socialIconsRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Bottom section slide up
      if (bottomSectionRef.current) {
        gsap.fromTo(
          bottomSectionRef.current,
          {
            y: 30,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bottomSectionRef.current,
              start: "top 90%",
            },
          }
        );
      }

      // Continuous glow pulse on logo
      if (logoRef.current) {
        gsap.to(logoRef.current.querySelector(".logo-glow"), {
          opacity: 0.3,
          scale: 1.1,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Hover animations for links
      if (!footerRef.current) return;
      const links = footerRef.current.querySelectorAll("a");
      links.forEach((link) => {
        link.addEventListener("mouseenter", () => {
          gsap.to(link, {
            x: 5,
            color: "#00f3ff",
            duration: 0.3,
            ease: "power2.out",
          });
        });
        link.addEventListener("mouseleave", () => {
          gsap.to(link, {
            x: 0,
            color: "#ffffff",
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });

      // Social icons hover glow
      if (socialIcons) {
        Array.from(socialIcons).forEach((icon) => {
          icon.addEventListener("mouseenter", () => {
            gsap.to(icon, {
              scale: 1.2,
              rotation: 360,
              boxShadow: "0 0 20px rgba(0, 243, 255, 0.8)",
              duration: 0.4,
              ease: "back.out(1.7)",
            });
          });
          icon.addEventListener("mouseleave", () => {
            gsap.to(icon, {
              scale: 1,
              rotation: 0,
              boxShadow: "0 0 0px rgba(0, 243, 255, 0)",
              duration: 0.4,
              ease: "power2.out",
            });
          });
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <footer
        ref={footerRef}
        className="relative w-full bg-gradient-to-b from-[#0B1120] via-[#0a0e27] to-[#050810] border-t border-cyan-500/20 overflow-hidden"
      >
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 243, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 243, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
              animation: "gridMove 20s linear infinite",
            }}
          />
        </div>

        {/* Scanning line effect */}
        <div
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"
          style={{
            animation: "scanLine 3s linear infinite",
          }}
        />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          {/* Main Footer Content */}
          <div ref={columnsRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 mb-12 items-start">
            {/* Column 1: Trackaroo Branding */}
            <div className="space-y-6 md:space-y-8">
              {/* Logo */}
              <div ref={logoRef} className="flex items-center gap-4">
                <Logo size={48} showGlow={true} className="transition-transform duration-300 hover:scale-110" />
                <h3 className="font-heading font-bold text-3xl md:text-4xl text-white tracking-tight">
                  Trackaroo
                </h3>
              </div>

              {/* Description */}
              <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-md">
                The complete automotive business management platform trusted by 500+ dealerships worldwide.
              </p>

              {/* Social Media Icons */}
              <div ref={socialIconsRef} className="flex items-center gap-5">
                <button
                  onClick={() => setShowComingSoon(true)}
                  className="w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all duration-300 group"
                  aria-label="X (Twitter)"
                >
                  <X size={22} weight="bold" className="text-white group-hover:text-cyan-400 transition-colors" />
                </button>
                <a
                  href="https://www.linkedin.com/company/trackaroo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all duration-300 group"
                  aria-label="LinkedIn"
                >
                  <LinkedinLogo size={22} weight="fill" className="text-white group-hover:text-cyan-400 transition-colors" />
                </a>
                <a
                  href="https://www.instagram.com/trackaroo_official?igsh=MTI5ZWMybnlrazEwaw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all duration-300 group"
                  aria-label="Instagram"
                >
                  <InstagramLogo size={22} weight="fill" className="text-white group-hover:text-cyan-400 transition-colors" />
                </a>
              </div>
            </div>

            {/* Column 2: Get in Touch */}
            <div className="space-y-6 md:space-y-8">
              <h4 className="font-heading font-bold text-white text-xl md:text-2xl mb-6 relative">
                Get in Touch
                <span className="absolute bottom-0 left-0 w-16 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent" />
              </h4>
              <ul className="space-y-5">
                <li className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-lg bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center group-hover:bg-cyan-400/20 group-hover:border-cyan-400/50 transition-all duration-300 flex-shrink-0">
                    <Envelope size={22} weight="fill" className="text-cyan-400" />
                  </div>
                  <a
                    href="mailto:pratyushm704@gmail.com"
                    className="text-slate-300 hover:text-cyan-400 transition-colors duration-300 text-base md:text-lg break-all"
                  >
                    pratyushm704@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-lg bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center group-hover:bg-cyan-400/20 group-hover:border-cyan-400/50 transition-all duration-300 flex-shrink-0">
                    <Phone size={22} weight="fill" className="text-cyan-400" />
                  </div>
                  <a
                    href="tel:+919424640286"
                    className="text-slate-300 hover:text-cyan-400 transition-colors duration-300 text-base md:text-lg"
                  >
                    +91 9424640286
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div
            ref={bottomSectionRef}
            className="pt-10 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-6"
          >
            <p className="text-slate-400 text-base">
              © 2024 Trackaroo. All rights reserved.
            </p>
            <div className="flex items-center gap-8">
              <a
                href="#privacy"
                className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 text-base"
              >
                Privacy Policy
              </a>
              <a
                href="#terms"
                className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 text-base"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        {/* Floating particles - Only render on client to avoid hydration mismatch */}
        {particles.length > 0 && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {particles.map((particle, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  animation: `floatParticle ${particle.duration}s ease-in-out infinite`,
                  animationDelay: `${particle.delay}s`,
                }}
              />
            ))}
          </div>
        )}
      </footer>

      
      {/* Coming Soon Popup */}
      {showComingSoon && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          onClick={() => setShowComingSoon(false)}
        >
          {/* Overlay */}
          <div ref={comingSoonOverlayRef} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          
          {/* Popup */}
          <div
            ref={comingSoonPopupRef}
            className="relative bg-gradient-to-br from-[#0a0e27] to-[#050810] border-2 border-cyan-400/50 rounded-2xl p-8 max-w-md w-full shadow-[0_0_40px_rgba(0,255,255,0.3)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowComingSoon(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all duration-300 group"
              aria-label="Close"
            >
              <X size={16} weight="bold" className="text-white group-hover:text-cyan-400 transition-colors" />
            </button>

            {/* Content */}
            <div className="text-center">
              <div className="mb-6">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-cyan-400 to-teal-400 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(0,255,255,0.5)]">
                  <X size={40} weight="bold" className="text-white" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-white mb-2">
                  Coming Soon
                </h3>
                <p className="text-slate-400 text-sm">
                  We're working on something exciting! Follow us on Instagram and LinkedIn to stay updated.
                </p>
              </div>
              
              {/* Social links */}
              <div className="flex items-center justify-center gap-4 mt-6">
                <a
                  href="https://www.instagram.com/trackaroo_official?igsh=MTI5ZWMybnlrazEwaw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-cyan-400/30 bg-cyan-400/10 hover:bg-cyan-400/20 hover:border-cyan-400/50 transition-all duration-300 text-cyan-400 text-sm font-medium"
                >
                  <InstagramLogo size={18} weight="fill" />
                  Instagram
                </a>
                <a
                  href="https://www.linkedin.com/company/trackaroo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-cyan-400/30 bg-cyan-400/10 hover:bg-cyan-400/20 hover:border-cyan-400/50 transition-all duration-300 text-cyan-400 text-sm font-medium"
                >
                  <LinkedinLogo size={18} weight="fill" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
