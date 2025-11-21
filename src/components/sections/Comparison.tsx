"use client";

import { Check, X } from "@phosphor-icons/react";
import MeshBackground from "@/components/shared/MeshBackground";

const features = [
  { name: "Real-time Sync", trackaroo: true, competitor: false },
  { name: "Mobile First", trackaroo: true, competitor: false },
  { name: "PDI Automation", trackaroo: true, competitor: false },
  { name: "Cloud-Based", trackaroo: true, competitor: false },
  { name: "Multi-Branch Support", trackaroo: true, competitor: true },
  { name: "AI Pricing Engine", trackaroo: true, competitor: false },
  { name: "Field Staff Tracking", trackaroo: true, competitor: false },
  { name: "Unified Dashboard", trackaroo: true, competitor: false },
];

export default function Comparison() {
  return (
    <section className="w-full py-24 relative bg-[#0a0e27]">
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
            Trackaroo vs Legacy DMS (Excellon/Wipro)
          </p>
        </div>

        <div className="relative">
          {/* Racing Leaderboard Table */}
          <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-3 gap-4 p-6 border-b border-white/10">
              <div className="font-heading font-bold text-slate-400 uppercase tracking-wider text-sm">
                Feature
              </div>
              <div className="relative">
                <div className="font-heading font-bold text-cyan-400 uppercase tracking-wider text-sm">
                  Trackaroo
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/20 via-cyan-400/10 to-transparent rounded-lg blur-xl -z-10" />
              </div>
              <div className="font-heading font-bold text-slate-500 uppercase tracking-wider text-sm opacity-50">
                Legacy DMS
              </div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-white/5">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="grid grid-cols-3 gap-4 p-6 hover:bg-white/5 transition-colors"
                >
                  <div className="font-sans text-white font-medium">
                    {feature.name}
                  </div>
                  <div className="flex items-center justify-center">
                    {feature.trackaroo ? (
                      <div className="flex items-center gap-2 text-cyan-400">
                        <Check size={24} weight="fill" />
                        <span className="font-heading font-bold">YES</span>
                      </div>
                    ) : (
                      <X size={24} className="text-red-500" weight="fill" />
                    )}
                  </div>
                  <div className="flex items-center justify-center opacity-30">
                    {feature.competitor ? (
                      <div className="flex items-center gap-2 text-slate-500">
                        <Check size={24} weight="fill" />
                        <span className="font-heading">YES</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-slate-500">
                        <X size={24} weight="fill" />
                        <span className="font-heading">NO</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Winner Badge */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-cyan-400/10 border border-cyan-400/30 rounded-full">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <span className="font-heading text-cyan-400 font-bold uppercase tracking-wider text-sm">
                Trackaroo: Complete Feature Set
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

