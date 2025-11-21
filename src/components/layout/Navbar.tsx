"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl transition-all duration-500 ease-out rounded-full",
        "border border-white/10",
        scrolled
          ? "py-3 px-6 bg-[#0B1120]/40 backdrop-blur-2xl shadow-2xl shadow-cyan-500/20"
          : "py-4 px-8 bg-[#0B1120]/30 backdrop-blur-md"
      )}
    >
      {/* Content */}
      <div className="relative flex items-center justify-between">
        <Link
          href="/"
          className="font-heading font-bold text-xl md:text-2xl tracking-tight text-white flex items-center gap-2 hover:text-cyan-400 transition-colors"
        >
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_#22d3ee]" />
          TRACKAROO
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {["Features", "Compare", "Pricing"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-xs font-medium text-slate-300 hover:text-cyan-400 transition-colors uppercase tracking-widest relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

        <Button
          variant="ghost"
          className="text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-colors"
        >
          Login
        </Button>
      </div>
    </nav>
  );
}
