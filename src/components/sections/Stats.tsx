"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const stats = [
  { value: 1000, suffix: "+", label: "Active Users", duration: 2000 },
  { value: 90, suffix: "%", label: "Time Saved", duration: 1500 },
  { value: 10, suffix: "+", label: "Dealer Groups", duration: 1000 },
  { value: 24, suffix: "/7", label: "Support Available", duration: 1200 },
];

function CountUp({
  end,
  suffix,
  duration,
  isInView,
}: {
  end: number;
  suffix: string;
  duration: number;
  isInView: boolean;
}) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);

  useEffect(() => {
    if (!isInView) return;

    const startTime = Date.now();
    const startValue = 0;

    const updateCount = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(startValue + (end - startValue) * easeOutQuart);

      setCount(current);
      countRef.current = current;

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(updateCount);
  }, [end, duration, isInView]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="w-full bg-gradient-to-b from-[#0B1120] to-[#050810] py-24 relative z-20"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            The Telemetry
          </h2>
          <p className="text-slate-400 text-lg">
            Real numbers from real dealerships running at peak performance
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-cyan-400/30 transition-all duration-500"
            >
              <div className="font-mono text-5xl md:text-6xl font-bold text-cyan-400 mb-4 tabular-nums">
                <CountUp
                  end={stat.value}
                  suffix={stat.suffix}
                  duration={stat.duration}
                  isInView={isInView}
                />
              </div>
              <div className="font-heading text-slate-400 text-sm uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

