"use client";

import { Check } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "Base Model",
    tagline: "Essential Operations",
    price: "Starting at",
    features: [
      "Inventory Management",
      "Billing & Invoicing",
      "Basic Reporting",
      "Single Branch",
      "Email Support",
    ],
    highlighted: false,
  },
  {
    name: "GT Sport",
    tagline: "Recommended",
    price: "Most Popular",
    features: [
      "Everything in Base",
      "HRMS & Payroll",
      "Field Staff App",
      "PDI Automation",
      "Multi-Branch (Up to 3)",
      "Priority Support",
      "Advanced Analytics",
    ],
    highlighted: true,
  },
  {
    name: "Pro Tuned",
    tagline: "Enterprise Power",
    price: "Custom Pricing",
    features: [
      "Everything in GT Sport",
      "Full ERP Suite",
      "Unlimited Branches",
      "White-Label Option",
      "Dedicated Account Manager",
      "Custom Integrations",
      "24/7 Support",
    ],
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section className="w-full bg-gradient-to-b from-[#050810] to-[#0B1120] py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            The Trims
          </h2>
          <p className="text-slate-400 text-lg">
            Choose your performance level. All models include lifetime updates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={cn(
                "relative bg-gradient-to-b from-black/60 to-black/40 backdrop-blur-sm border rounded-2xl p-8 transition-all duration-500",
                tier.highlighted
                  ? "border-cyan-400/50 shadow-[0_0_40px_rgba(0,243,255,0.4)] scale-105"
                  : "border-white/10 hover:border-white/20"
              )}
            >
              {/* Glow effect for highlighted */}
              {tier.highlighted && (
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/30 via-cyan-400/20 to-transparent rounded-2xl blur-2xl -z-10" />
              )}

              {/* Badge */}
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-cyan-400/20 border border-cyan-400/50 rounded-full">
                  <span className="font-heading text-cyan-400 text-xs font-bold uppercase tracking-wider">
                    {tier.tagline}
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="font-heading text-2xl font-bold text-white mb-2">
                  {tier.name}
                </h3>
                <p className="text-slate-400 text-sm mb-4">{tier.tagline}</p>
                <div className="font-mono text-lg text-cyan-400 font-bold">
                  {tier.price}
                </div>
              </div>

              {/* Tech Specs List */}
              <ul className="space-y-4">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check
                      size={20}
                      weight="fill"
                      className={cn(
                        "flex-shrink-0 mt-0.5",
                        tier.highlighted ? "text-cyan-400" : "text-slate-400"
                      )}
                    />
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className={cn(
                  "w-full mt-8 py-3 rounded-full font-heading font-bold uppercase tracking-wider text-sm transition-all duration-300",
                  tier.highlighted
                    ? "bg-cyan-400 text-black hover:bg-cyan-300 shadow-[0_0_20px_rgba(0,243,255,0.5)]"
                    : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                )}
              >
                Select {tier.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


