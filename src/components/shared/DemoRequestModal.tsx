"use client";

import { useState, useEffect, useRef } from "react";
import { X, Users, Rocket, Shield, TrendUp } from "@phosphor-icons/react";
import { gsap } from "gsap";

interface DemoRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const demoReasons = [
  "General Inquiry",
  "Inventory Management",
  "Customer Relations",
  "Staff Management",
  "Expense Tracking",
  "Sales Analytics",
];

const floatingElements = [
  {
    icon: Rocket,
    title: "Quick Setup",
    description: "Get started in minutes with our easy setup process",
    color: "from-cyan-400 to-teal-400",
  },
  {
    icon: Users,
    title: "Expert Support",
    description: "Dedicated support team to help you succeed",
    color: "from-blue-400 to-indigo-400",
  },
  {
    icon: TrendUp,
    title: "Proven Results",
    description: "Join 500+ successful automotive businesses",
    color: "from-green-400 to-emerald-400",
  },
  {
    icon: Shield,
    title: "Secure Platform",
    description: "Enterprise-grade security for your data",
    color: "from-purple-400 to-pink-400",
  },
];

export default function DemoRequestModal({ isOpen, onClose }: DemoRequestModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+1",
    phone: "",
    company: "",
    reason: "",
    message: "",
  });
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const isClosingRef = useRef(false);

  useEffect(() => {
    if (isOpen) {
      isClosingRef.current = false;
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
      
      // Set initial states immediately to prevent jitter
      if (overlayRef.current) {
        gsap.set(overlayRef.current, { 
          opacity: 0,
          immediateRender: true
        });
      }
      if (modalRef.current) {
        gsap.set(modalRef.current, { 
          opacity: 0, 
          scale: 0.95, 
          y: 30,
          transformOrigin: "center center",
          immediateRender: true,
          force3D: true
        });
      }
      
      // Use triple requestAnimationFrame to ensure DOM is fully ready
      const rafId1 = requestAnimationFrame(() => {
        const rafId2 = requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            // Animate overlay
            if (overlayRef.current) {
              gsap.to(overlayRef.current, {
                opacity: 1,
                duration: 0.35,
                ease: "power2.out",
                force3D: true
              });
            }
            
            // Animate modal with smooth entrance
            if (modalRef.current) {
              gsap.to(modalRef.current, {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.5,
                ease: "back.out(1.1)",
                force3D: true
              });
            }
          });
        });
      });

      // Enable smooth scrolling with momentum
      const scrollContainer = modalRef.current?.querySelector('.modal-scrollbar') as HTMLElement;
      if (scrollContainer) {
        scrollContainer.style.scrollBehavior = "smooth";
        (scrollContainer.style as any).webkitOverflowScrolling = "touch";
      }

      return () => {
        cancelAnimationFrame(rafId1);
      };
    } else {
      // Animate out before closing
      if (overlayRef.current && modalRef.current && !isClosingRef.current) {
        isClosingRef.current = true;
        gsap.to([overlayRef.current, modalRef.current], {
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
          force3D: true,
          onComplete: () => {
            document.body.style.overflow = "auto";
            isClosingRef.current = false;
          }
        });
        gsap.to(modalRef.current, {
          scale: 0.95,
          y: 20,
          duration: 0.2,
          ease: "power2.in",
          force3D: true
        });
      } else {
        document.body.style.overflow = "auto";
      }
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // You can add API call here
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isClosingRef.current) {
          onClose();
        }
      }}
      style={{
        willChange: "opacity",
        pointerEvents: isOpen ? "auto" : "none",
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative w-full max-w-6xl max-h-[95vh] overflow-hidden bg-gradient-to-br from-[#0a0e27] via-[#1a1a2e] to-[#0a0e27] border-2 border-cyan-400/40 rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: "0 0 80px rgba(0, 243, 255, 0.4), inset 0 0 60px rgba(0, 243, 255, 0.08)",
          willChange: "transform, opacity",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(0, 243, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 243, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }} />
        </div>

        {/* Scanning Line Effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent 0%, rgba(0, 243, 255, 0.05) 50%, transparent 100%)",
            animation: "scanVertical 4s linear infinite",
          }}
        />

        {/* Close Button - positioned at top-right of modal */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            if (!isClosingRef.current) {
              onClose();
            }
          }}
          className="absolute top-4 right-4 z-[60] w-12 h-12 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-md border border-cyan-400/30 hover:bg-cyan-400/20 hover:border-cyan-400/60 transition-all duration-300 group"
          type="button"
          disabled={isClosingRef.current}
        >
          <X size={22} className="text-white group-hover:text-cyan-400 transition-colors" weight="bold" />
        </button>

        {/* Grid Layout */}
        <div className="grid lg:grid-cols-3 gap-0 relative z-10">
          {/* Left Side - Form (2 columns) */}
          <div className="lg:col-span-2 p-8 md:p-12 overflow-y-auto max-h-[95vh] modal-scrollbar scroll-smooth" style={{ scrollBehavior: "smooth" }}>
            <div className="mb-8">
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-white">
                Demo Request Form
              </h2>
              <div className="mt-5 w-64">
                <div className="relative h-0.5 rounded-full overflow-hidden bg-slate-700/50">
                  {/* Minimal flowing gradient */}
                  <span
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(0, 243, 255, 0.6), rgba(0, 243, 255, 0.8), rgba(0, 243, 255, 0.6), transparent)",
                      backgroundSize: "200% 100%",
                      animation: "underlineFlowMinimal 3s ease-in-out infinite",
                    }}
                  />
                  {/* Subtle glow */}
                  <span
                    className="absolute inset-0 rounded-full bg-cyan-400/20 blur-sm"
                    style={{ animation: "underlinePulseMinimal 2s ease-in-out infinite" }}
                  />
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Phone with Country Code */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Contact Number *
                </label>
                <div className="flex gap-2">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    className="px-3 py-3 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2300f3ff' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 0.75rem center",
                      backgroundSize: "12px",
                      paddingRight: "2.5rem",
                    }}
                  >
                    <option value="+1" className="bg-[#0a0e27] text-white">+1 (US/CA)</option>
                    <option value="+44" className="bg-[#0a0e27] text-white">+44 (UK)</option>
                    <option value="+91" className="bg-[#0a0e27] text-white">+91 (India)</option>
                    <option value="+61" className="bg-[#0a0e27] text-white">+61 (Australia)</option>
                    <option value="+49" className="bg-[#0a0e27] text-white">+49 (Germany)</option>
                    <option value="+33" className="bg-[#0a0e27] text-white">+33 (France)</option>
                    <option value="+81" className="bg-[#0a0e27] text-white">+81 (Japan)</option>
                    <option value="+86" className="bg-[#0a0e27] text-white">+86 (China)</option>
                  </select>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="flex-1 px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                    placeholder="123-456-7890"
                  />
                </div>
              </div>

              {/* Company/Institute */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Company / Institute Name *
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  placeholder="Your company or institute name"
                />
              </div>

              {/* Reason for Demo */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Reason for Demo *
                </label>
                <select
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2300f3ff' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 1rem center",
                    backgroundSize: "12px",
                  }}
                >
                  <option value="" className="bg-[#0a0e27] text-white">Select a reason...</option>
                  {demoReasons.map((reason) => (
                    <option key={reason} value={reason} className="bg-[#0a0e27] text-white">
                      {reason}
                    </option>
                  ))}
                </select>
              </div>

              {/* Custom Message */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Additional Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all resize-none"
                  placeholder="Tell us more about your requirements or any specific questions..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-cyan-400 to-teal-400 text-black font-heading font-bold uppercase tracking-wider rounded-lg hover:from-cyan-300 hover:to-teal-300 transition-all duration-300 shadow-lg shadow-cyan-400/30 hover:shadow-cyan-400/50 hover:scale-[1.02] relative overflow-hidden group"
              >
                <span className="relative z-10">Schedule Demo</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 to-teal-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </form>
          </div>

          {/* Right Side - Floating Elements */}
          <div className="hidden lg:block relative p-8 md:p-12 bg-gradient-to-br from-cyan-400/5 via-transparent to-teal-400/5 border-l border-cyan-400/20 overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-400/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-20 right-10 w-40 h-40 bg-teal-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
              backgroundImage: `linear-gradient(rgba(0, 243, 255, 0.2) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 243, 255, 0.2) 1px, transparent 1px)`,
              backgroundSize: "25px 25px",
            }} />

            {/* Floating Elements */}
            <div className="relative z-10 space-y-6 mt-4">
              {floatingElements.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <FloatingCard
                    key={index}
                    icon={IconComponent}
                    title={item.title}
                    description={item.description}
                    color={item.color}
                    delay={index * 0.15}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Floating Card Component
function FloatingCard({
  icon: Icon,
  title,
  description,
  color,
  delay,
}: {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  color: string;
  delay: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      // Floating animation
      gsap.to(cardRef.current, {
        y: -12,
        duration: 3 + delay,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        delay: delay,
      });

      // Icon rotation
      if (iconRef.current) {
        gsap.to(iconRef.current, {
          rotation: 360,
          duration: 20,
          repeat: -1,
          ease: "none",
        });
      }
    }
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className="relative bg-black/40 backdrop-blur-md border border-cyan-400/30 rounded-xl p-6 hover:border-cyan-400/60 transition-all duration-500 group cursor-pointer"
      style={{
        boxShadow: "0 0 30px rgba(0, 243, 255, 0.15), inset 0 0 20px rgba(0, 243, 255, 0.05)",
        isolation: "isolate",
      }}
      onMouseEnter={(e) => {
        gsap.to(e.currentTarget, {
          scale: 1.05,
          boxShadow: "0 0 50px rgba(0, 243, 255, 0.3), inset 0 0 30px rgba(0, 243, 255, 0.1)",
          duration: 0.3,
        });
      }}
      onMouseLeave={(e) => {
        gsap.to(e.currentTarget, {
          scale: 1,
          boxShadow: "0 0 30px rgba(0, 243, 255, 0.15), inset 0 0 20px rgba(0, 243, 255, 0.05)",
          duration: 0.3,
        });
      }}
    >
      {/* Glow Effect */}
      <div
        className={`absolute -inset-1 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-20 rounded-xl blur-xl transition-opacity duration-500`}
      />

      {/* Shimmer Effect */}
      <div
        className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(0, 243, 255, 0.1), transparent)",
          transform: "translateX(-100%)",
          animation: "shimmerCard 3s linear infinite",
        }}
      />

      <div className="flex items-start gap-4 relative z-10">
        <div
          ref={iconRef}
          className={`flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br ${color} border-2 border-cyan-400/40 flex items-center justify-center shadow-lg`}
          style={{
            boxShadow: "0 0 20px rgba(0, 243, 255, 0.4)",
          }}
        >
          <Icon size={28} className="text-white" weight="fill" />
        </div>
        <div className="flex-1">
          <h3 className="font-heading text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
            {title}
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

