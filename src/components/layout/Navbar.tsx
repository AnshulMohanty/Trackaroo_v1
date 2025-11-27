"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Logo from "@/components/shared/Logo";
import DemoRequestModal from "@/components/shared/DemoRequestModal";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleDemoModal = (open: boolean) => {
    setIsModalOpen(open);
    // Only dispatch event for other components, not for our own state changes
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("demo-modal-toggle", {
          detail: { open },
        })
      );
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Listen to demo-modal-toggle event from other components (Hero, Stats)
  useEffect(() => {
    const handleModalToggle = (e: Event) => {
      const customEvent = e as CustomEvent<{ open: boolean }>;
      if (customEvent.detail) {
        setIsModalOpen(customEvent.detail.open);
      }
    };

    window.addEventListener("demo-modal-toggle", handleModalToggle as EventListener);
    return () => {
      window.removeEventListener("demo-modal-toggle", handleModalToggle as EventListener);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl transition-all duration-500 ease-out rounded-full",
          "border border-white/10",
          scrolled
            ? "py-3 px-6 bg-[#0B1120]/40 backdrop-blur-2xl shadow-2xl shadow-cyan-500/20"
            : "py-4 px-8 bg-[#0B1120]/30 backdrop-blur-md",
          isModalOpen && "opacity-0 -translate-y-4"
        )}
      >
        <div className="relative flex items-center justify-between">
          <Link
            href="/"
            className="font-heading font-bold text-xl md:text-2xl tracking-tight text-white flex items-center gap-3 hover:text-cyan-400 transition-colors group"
          >
            <Logo size={32} showGlow={true} className="group-hover:scale-110 transition-transform duration-300" />
            <span className="hidden sm:inline">TRACKAROO</span>
          </Link>

          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {[
              { label: "Features", id: "features" },
              { label: "Demo", id: "demo" },
              { label: "Compare", id: "compare" },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className="text-xs font-medium text-slate-300 hover:text-cyan-400 transition-colors uppercase tracking-widest relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            
            <button
              onClick={() => toggleDemoModal(true)}
              className="group relative px-5 py-2 text-xs font-medium text-slate-300 hover:text-white rounded-full border border-cyan-400/30 bg-cyan-400/5 backdrop-blur-sm transition-all duration-300 uppercase tracking-widest hover:border-cyan-400/50 hover:bg-cyan-400/10"
            >
              <span className="relative z-10">Request Demo</span>
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-cyan-400 group-hover:w-3/4 transition-all duration-300" />
            </button>
          </div>
        </div>
      </nav>
      
      <DemoRequestModal isOpen={isModalOpen} onClose={() => toggleDemoModal(false)} />
    </>
  );
}
