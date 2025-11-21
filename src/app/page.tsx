"use client";

import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import TestDrive from "@/components/sections/TestDrive";
import Diagnosis from "@/components/sections/Diagnosis";
import Modules from "@/components/sections/Modules";
import Comparison from "@/components/sections/Comparison";
import Stats from "@/components/sections/Stats";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full text-white overflow-x-hidden selection:bg-cyan-500/30 scroll-smooth bg-[#0a0e27]">
      <Navbar />
      <Hero />
      <TestDrive />
      <Diagnosis />
      <Modules />
      <Comparison />
      <Stats />
      <Footer />
    </main>
  );
}