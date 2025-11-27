"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import MeshBackground from "@/components/shared/MeshBackground";

// Main cards with their color schemes and sub-cards
const mainCards = [
  {
    id: 1,
    title: "Sales & Operations",
    description: "Manage stock, PDI, bookings, retail, and fuel",
    colorScheme: {
      primary: "#00F3FF", // Cyan
      secondary: "#14B8A6", // Teal
      bgGradient: "from-cyan-400/20 to-teal-400/20",
      borderColor: "border-cyan-400/50",
      glowColor: "rgba(0, 243, 255, 0.6)",
    },
    subCards: [
      { title: "Stock Management", description: "Manage vehicle inventory, transfers, and deliveries", status: "Available" },
      { title: "Pre Delivery Inspection", description: "Manage vehicle inspections before delivery", status: "Available" },
      { title: "Booking List", description: "Manage customer bookings and reservations", status: "Available" },
      { title: "Retail Management", description: "Handle retail sales and customer delivery process", status: "Available" },
      { title: "Fuel Management", description: "Track and manage fuel consumption and expenses", status: "Available" },
    ],
    animation: "float1",
    popupDirection: "down", // down or up
  },
  {
    id: 2,
    title: "HR Module",
    description: "Manage salaries, expenses, field staff, users, and tasks",
    colorScheme: {
      primary: "#A855F7", // Purple
      secondary: "#9333EA", // Violet
      bgGradient: "from-purple-400/20 to-violet-400/20",
      borderColor: "border-purple-400/50",
      glowColor: "rgba(168, 85, 247, 0.6)",
    },
    subCards: [
      { title: "Salary Management", description: "Manage employee salaries, attendance, and payslips", status: "Available" },
      { title: "Expense Tracking", description: "Manage and track expenses across branches", status: "Available" },
      { title: "Field Staff", description: "Track and manage field staff locations and activities", status: "Available" },
      { title: "User Management", description: "Add, edit, and manage users within your company", status: "Available" },
      { title: "Task Management", description: "Create projects and manage tasks with Kanban boards", status: "Available" },
    ],
    animation: "float2",
    popupDirection: "down",
  },
  {
    id: 3,
    title: "Accounts",
    description: "Payment reconciliation and financial management",
    colorScheme: {
      primary: "#10B981", // Green
      secondary: "#059669", // Emerald
      bgGradient: "from-green-400/20 to-emerald-400/20",
      borderColor: "border-green-400/50",
      glowColor: "rgba(16, 185, 129, 0.6)",
    },
    subCards: [
      { title: "Payment Reconciliation", description: "Reconcile payments and manage financial transactions", status: "Available" },
    ],
    animation: "float3",
    popupDirection: "down",
    isSmall: true, // Smaller popup for single card
  },
  {
    id: 4,
    title: "Reports",
    description: "Generate scheme claim reports and business analytics",
    colorScheme: {
      primary: "#F59E0B", // Amber
      secondary: "#D97706", // Orange
      bgGradient: "from-amber-400/20 to-orange-400/20",
      borderColor: "border-amber-400/50",
      glowColor: "rgba(245, 158, 11, 0.6)",
    },
    subCards: [], // No sub-cards, just highlight
    animation: "float4",
    popupDirection: "down",
  },
  {
    id: 5,
    title: "Master Data",
    description: "Manage vehicle lists, discount schemes, and insurance companies",
    colorScheme: {
      primary: "#3B82F6", // Blue
      secondary: "#2563EB", // Indigo
      bgGradient: "from-blue-400/20 to-indigo-400/20",
      borderColor: "border-blue-400/50",
      glowColor: "rgba(59, 130, 246, 0.6)",
    },
    subCards: [
      { title: "Vehicle Master", description: "Manage vehicle configurations, pricing, and upload processes", status: "Available" },
      { title: "Discount Schemes", description: "Configure company-specific discount schemes and pricing rules", status: "Available" },
      { title: "Insurance Partners", description: "Maintain insurance company data and partnership details", status: "Coming Soon" },
    ],
    animation: "float5",
    popupDirection: "down", // Always popup downward
  },
];

// Icon Components for main cards
function SalesIcon() {
  return (
    <svg className="w-14 h-14" viewBox="0 0 24 24" fill="none">
      <path d="M3 3V21H21" stroke="currentColor" strokeWidth="2" className="text-cyan-400" />
      <path d="M7 16L12 11L16 7L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-cyan-400" />
      <circle cx="7" cy="16" r="2" fill="currentColor" className="text-cyan-400" />
      <circle cx="12" cy="11" r="2" fill="currentColor" className="text-cyan-400" />
      <circle cx="16" cy="7" r="2" fill="currentColor" className="text-cyan-400" />
    </svg>
  );
}

function HRIcon() {
  return (
    <svg className="w-14 h-14" viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" className="text-purple-400" />
      <path d="M3 21C3 17.134 6.13401 14 10 14C13.866 14 17 17.134 17 21" stroke="currentColor" strokeWidth="2" className="text-purple-400" />
      <circle cx="17" cy="7" r="4" stroke="currentColor" strokeWidth="2" className="text-purple-400" />
      <path d="M17 11L21 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-purple-400" />
    </svg>
  );
}

function AccountsIcon() {
  return (
    <svg className="w-14 h-14" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="2" className="text-green-400" />
      <path d="M2 10H22" stroke="currentColor" strokeWidth="2" className="text-green-400" />
      <circle cx="8" cy="14" r="1.5" fill="currentColor" className="text-green-400" />
      <circle cx="12" cy="14" r="1.5" fill="currentColor" className="text-green-400" />
      <circle cx="16" cy="14" r="1.5" fill="currentColor" className="text-green-400" />
    </svg>
  );
}

function ReportsIcon() {
  return (
    <svg className="w-14 h-14" viewBox="0 0 24 24" fill="none">
      <path d="M3 3V21H21" stroke="currentColor" strokeWidth="2" className="text-amber-400" />
      <rect x="7" y="12" width="3" height="6" fill="currentColor" className="text-amber-400" />
      <rect x="12" y="8" width="3" height="10" fill="currentColor" className="text-amber-400" />
      <rect x="17" y="5" width="3" height="13" fill="currentColor" className="text-amber-400" />
    </svg>
  );
}

function MasterDataIcon() {
  return (
    <svg className="w-14 h-14" viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="5" rx="9" ry="3" stroke="currentColor" strokeWidth="2" className="text-blue-400" />
      <path d="M3 5V19C3 20.6569 7.02944 22 12 22C16.9706 22 21 20.6569 21 19V5" stroke="currentColor" strokeWidth="2" className="text-blue-400" />
      <ellipse cx="12" cy="12" rx="9" ry="3" stroke="currentColor" strokeWidth="2" className="text-blue-400" />
      <circle cx="12" cy="5" r="1.5" fill="currentColor" className="text-blue-400" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" className="text-blue-400" />
      <circle cx="12" cy="19" r="1.5" fill="currentColor" className="text-blue-400" />
    </svg>
  );
}

const iconMap: Record<number, React.ComponentType> = {
  1: SalesIcon,
  2: HRIcon,
  3: AccountsIcon,
  4: ReportsIcon,
  5: MasterDataIcon,
};

// Animation Components for Sub-Cards
function StockAnimation({ color }: { color: string }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 100 60" style={{ opacity: 0.6 }}>
      <rect x="10" y="20" width="20" height="20" fill="none" stroke={color} strokeWidth="1" />
      <rect x="40" y="15" width="20" height="25" fill="none" stroke={color} strokeWidth="1" />
      <rect x="70" y="25" width="20" height="15" fill="none" stroke={color} strokeWidth="1" />
      <circle cx="20" cy="30" r="2" fill={color} style={{ animation: "pulse 2s infinite" }} />
      <circle cx="50" cy="27" r="2" fill={color} style={{ animation: "pulse 2s infinite 0.3s" }} />
      <circle cx="80" cy="32" r="2" fill={color} style={{ animation: "pulse 2s infinite 0.6s" }} />
    </svg>
  );
}

function InspectionAnimation({ color }: { color: string }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 100 60" style={{ opacity: 0.6 }}>
      <rect x="20" y="15" width="60" height="30" fill="none" stroke={color} strokeWidth="1" />
      <path d="M30 25 L40 35 L70 10" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" style={{ animation: "drawLine 1.5s ease-in-out infinite" }} />
      <circle cx="50" cy="30" r="3" fill={color} style={{ animation: "pulse 1.5s infinite" }} />
    </svg>
  );
}

function BookingAnimation({ color }: { color: string }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 100 60" style={{ opacity: 0.6 }}>
      <rect x="15" y="10" width="70" height="40" rx="2" fill="none" stroke={color} strokeWidth="1" />
      <line x1="15" y1="25" x2="85" y2="25" stroke={color} strokeWidth="1" />
      <line x1="15" y1="35" x2="85" y2="35" stroke={color} strokeWidth="1" />
      <circle cx="30" cy="20" r="1.5" fill={color} style={{ animation: "pulse 1.5s infinite" }} />
      <circle cx="50" cy="30" r="1.5" fill={color} style={{ animation: "pulse 1.5s infinite 0.3s" }} />
      <circle cx="70" cy="40" r="1.5" fill={color} style={{ animation: "pulse 1.5s infinite 0.6s" }} />
    </svg>
  );
}

function RetailAnimation({ color }: { color: string }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 100 60" style={{ opacity: 0.6 }}>
      <path d="M20 40 L30 20 L50 25 L70 15 L80 35" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" style={{ animation: "drawLine 2s ease-in-out infinite" }} />
      <circle cx="30" cy="20" r="2" fill={color} style={{ animation: "pulse 2s infinite" }} />
      <circle cx="50" cy="25" r="2" fill={color} style={{ animation: "pulse 2s infinite 0.4s" }} />
      <circle cx="70" cy="15" r="2" fill={color} style={{ animation: "pulse 2s infinite 0.8s" }} />
    </svg>
  );
}

function FuelAnimation({ color }: { color: string }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 100 60" style={{ opacity: 0.6 }}>
      <rect x="30" y="20" width="40" height="25" rx="2" fill="none" stroke={color} strokeWidth="1" />
      <line x1="35" y1="30" x2="65" y2="30" stroke={color} strokeWidth="1" />
      <rect x="40" y="35" width="20" height="8" fill={color} style={{ animation: "barGrow 2s ease-in-out infinite" }} />
    </svg>
  );
}

function SalaryAnimation({ color }: { color: string }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 100 60" style={{ opacity: 0.6 }}>
      <rect x="20" y="30" width="15" height="20" fill={color} opacity="0.5" />
      <rect x="40" y="20" width="15" height="30" fill={color} opacity="0.5" />
      <rect x="60" y="25" width="15" height="25" fill={color} opacity="0.5" />
      <line x1="20" y1="50" x2="75" y2="50" stroke={color} strokeWidth="1" />
    </svg>
  );
}

function ExpenseAnimation({ color }: { color: string }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 100 60" style={{ opacity: 0.6 }}>
      <circle cx="30" cy="30" r="8" fill="none" stroke={color} strokeWidth="1" />
      <circle cx="50" cy="30" r="8" fill="none" stroke={color} strokeWidth="1" />
      <circle cx="70" cy="30" r="8" fill="none" stroke={color} strokeWidth="1" />
      <path d="M30 30 L50 30 L70 30" stroke={color} strokeWidth="1" strokeDasharray="2 2" style={{ animation: "flowGradientMove 2s linear infinite" }} />
    </svg>
  );
}

function FieldStaffAnimation({ color }: { color: string }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 100 60" style={{ opacity: 0.6 }}>
      <circle cx="50" cy="30" r="15" fill="none" stroke={color} strokeWidth="1" />
      <circle cx="50" cy="30" r="5" fill={color} style={{ animation: "pulse 2s infinite" }} />
      <circle cx="30" cy="20" r="2" fill={color} style={{ animation: "pulse 1.5s infinite" }} />
      <circle cx="70" cy="25" r="2" fill={color} style={{ animation: "pulse 1.5s infinite 0.5s" }} />
    </svg>
  );
}

function UserAnimation({ color }: { color: string }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 100 60" style={{ opacity: 0.6 }}>
      <circle cx="25" cy="20" r="6" fill="none" stroke={color} strokeWidth="1" />
      <path d="M15 35 Q25 30 35 35" stroke={color} strokeWidth="1" fill="none" />
      <circle cx="50" cy="20" r="6" fill="none" stroke={color} strokeWidth="1" />
      <path d="M40 35 Q50 30 60 35" stroke={color} strokeWidth="1" fill="none" />
      <circle cx="75" cy="20" r="6" fill="none" stroke={color} strokeWidth="1" />
      <path d="M65 35 Q75 30 85 35" stroke={color} strokeWidth="1" fill="none" />
    </svg>
  );
}

function TaskAnimation({ color }: { color: string }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 100 60" style={{ opacity: 0.6 }}>
      <rect x="15" y="10" width="20" height="40" rx="1" fill="none" stroke={color} strokeWidth="1" />
      <rect x="40" y="10" width="20" height="40" rx="1" fill="none" stroke={color} strokeWidth="1" />
      <rect x="65" y="10" width="20" height="40" rx="1" fill="none" stroke={color} strokeWidth="1" />
      <rect x="18" y="15" width="14" height="8" fill={color} opacity="0.4" />
      <rect x="43" y="15" width="14" height="8" fill={color} opacity="0.4" />
    </svg>
  );
}

function PaymentAnimation({ color }: { color: string }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 100 60" style={{ opacity: 0.6 }}>
      <rect x="20" y="20" width="60" height="20" rx="2" fill="none" stroke={color} strokeWidth="1" />
      <line x1="20" y1="28" x2="80" y2="28" stroke={color} strokeWidth="1" />
      <circle cx="35" cy="30" r="2" fill={color} style={{ animation: "pulse 1.5s infinite" }} />
      <circle cx="50" cy="30" r="2" fill={color} style={{ animation: "pulse 1.5s infinite 0.3s" }} />
      <circle cx="65" cy="30" r="2" fill={color} style={{ animation: "pulse 1.5s infinite 0.6s" }} />
    </svg>
  );
}

function VehicleAnimation({ color }: { color: string }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 100 60" style={{ opacity: 0.6 }}>
      <rect x="20" y="25" width="60" height="20" rx="2" fill="none" stroke={color} strokeWidth="1" />
      <circle cx="35" cy="45" r="4" fill="none" stroke={color} strokeWidth="1" />
      <circle cx="65" cy="45" r="4" fill="none" stroke={color} strokeWidth="1" />
      <line x1="40" y1="25" x2="40" y2="45" stroke={color} strokeWidth="1" />
      <line x1="60" y1="25" x2="60" y2="45" stroke={color} strokeWidth="1" />
    </svg>
  );
}

function DiscountAnimation({ color }: { color: string }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 100 60" style={{ opacity: 0.6 }}>
      <path d="M30 20 L70 40 M70 20 L30 40" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="20" r="3" fill={color} />
      <circle cx="70" cy="40" r="3" fill={color} />
      <text x="50" y="35" textAnchor="middle" fontSize="8" fill={color}>%</text>
    </svg>
  );
}

function InsuranceAnimation({ color }: { color: string }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 100 60" style={{ opacity: 0.6 }}>
      <path d="M50 15 L60 30 L50 40 L40 30 Z" fill="none" stroke={color} strokeWidth="1" />
      <circle cx="50" cy="30" r="2" fill={color} style={{ animation: "pulse 2s infinite" }} />
    </svg>
  );
}

function DefaultAnimation({ color }: { color: string }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 100 60" style={{ opacity: 0.6 }}>
      <circle cx="50" cy="30" r="10" fill="none" stroke={color} strokeWidth="1" style={{ animation: "pulseScale 2s infinite" }} />
      <circle cx="50" cy="30" r="5" fill={color} opacity="0.5" />
    </svg>
  );
}

// Connected Sub-Cards Component
function ConnectedSubCards({ subCards, colorScheme, isSmall = false, cardId }: { subCards: Array<{ title: string; description: string; status: string }>, colorScheme: any, isSmall?: boolean, cardId?: number }) {
  if (subCards.length === 0) return null;

  // Calculate positions for connected layout matching the image
  // Positions are adjusted to center cards properly within the popup
  const getSubCardPosition = (index: number, total: number) => {
    if (total === 1) {
      // Single card - perfectly centered
      return { x: 50, y: 50 };
    }

    if (cardId === 5 && total === 3) {
      // Custom layout for Master Data popup (Vehicle, Discount, Insurance)
      const positions = [
        { x: 35, y: 42 }, // Vehicle Master - moved slightly left
        { x: 95, y: 42 }, // Discount Schemes - moved further right
        { x: 62, y: 80 }, // Insurance Partners - moved a bit left
      ];
      return positions[index];
    }

    if (total === 3) {
      // Three cards - triangular pattern around center, adjusted for centering
      const positions = [
        { x: 32, y: 30 }, // Top left (moved right to center better)
        { x: 50, y: 70 }, // Center bottom (perfectly centered)
        { x: 68, y: 30 }, // Top right (moved left to center better)
      ];
      return positions[index];
    }
    // For 5 cards, PERFECTLY CENTERED with equal left/right spacing and NO OVERLAP
    // Calculated for symmetry: Container 800px, Cards 180px each (22.5% width, 11.25% half-width)
    // 
    // TOP ROW - Exact symmetry:
    // Stock Management at x: 20%:
    //   - Left edge: 20% - 11.25% = 8.75%
    //   - Gap from left boundary: 8.75%
    // 
    // Booking List should have EXACTLY SAME gap from right boundary (8.75%):
    //   - Gap from right: 8.75%
    //   - Right edge: 100% - 8.75% = 91.25%
    //   - Center: 91.25% - 11.25% = 80%
    //   - Left edge: 80% - 11.25% = 68.75% (well clear of center square at 50% ± 2.5%)
    //   Moving to 83% for extra clearance as user requested "a lot right"
    // 
    // BOTTOM ROW - Exact symmetry:
    // Retail Management at x: 30%:
    //   - Left edge: 30% - 11.25% = 18.75%
    //   - Gap from left boundary: 18.75%
    // 
    // Fuel Management should have EXACTLY SAME gap from right boundary (18.75%):
    //   - Gap from right: 18.75%
    //   - Right edge: 100% - 18.75% = 81.25%
    //   - Center: 81.25% - 11.25% = 70%
    //   - Left edge: 70% - 11.25% = 58.75% (well clear of center square)
    //   Moving to 73% for extra clearance as user requested it moved right
    if (total === 5) {
      const positions = [
        { x: 30, y: 28 }, // Stock Management - nudged further right for consistent spacing
        { x: 64, y: 18 }, // Pre Delivery Inspection - nudged further right while staying above hub
        { x: 98, y: 26 }, // Booking List - moved further right while aligned horizontally with Stock
        { x: 34, y: 75 }, // Retail Management - keeps bottom-left alignment
        { x: 92, y: 74 }, // Fuel Management - shifted further toward the right corner
      ];
      return positions[index];
    }
    // Default grid for other counts
    const cols = Math.ceil(Math.sqrt(total));
    const row = Math.floor(index / cols);
    const col = index % cols;
    return {
      x: (col + 0.5) * (100 / cols),
      y: (row + 0.5) * (100 / (Math.ceil(total / cols))),
    };
  };

  const isMasterData = cardId === 5 && subCards.length === 3;
  const centerPosition = { x: 50, y: isMasterData ? 44 : 50 };

  const containerSize = isSmall
    ? "min-h-[240px]"
    : isMasterData
      ? "min-h-[360px]"
      : "min-h-[580px]"; // Adjusted height for Master Data popup
  const cardWidth = isSmall ? "w-[240px]" : "w-[180px]"; // Adjusted for single card
  const isAccountsSingle = cardId === 3 && subCards.length === 1;

  // Animation components for each card type
  const getCardAnimation = (title: string) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes("stock") || titleLower.includes("inventory")) {
      return <StockAnimation color={colorScheme.primary} />;
    }
    if (titleLower.includes("inspection") || titleLower.includes("pdi")) {
      return <InspectionAnimation color={colorScheme.primary} />;
    }
    if (titleLower.includes("booking")) {
      return <BookingAnimation color={colorScheme.primary} />;
    }
    if (titleLower.includes("retail") || titleLower.includes("sales")) {
      return <RetailAnimation color={colorScheme.primary} />;
    }
    if (titleLower.includes("fuel")) {
      return <FuelAnimation color={colorScheme.primary} />;
    }
    if (titleLower.includes("salary") || titleLower.includes("payroll")) {
      return <SalaryAnimation color={colorScheme.primary} />;
    }
    if (titleLower.includes("expense")) {
      return <ExpenseAnimation color={colorScheme.primary} />;
    }
    if (titleLower.includes("field") || titleLower.includes("staff")) {
      return <FieldStaffAnimation color={colorScheme.primary} />;
    }
    if (titleLower.includes("user") || titleLower.includes("management")) {
      return <UserAnimation color={colorScheme.primary} />;
    }
    if (titleLower.includes("task") || titleLower.includes("kanban")) {
      return <TaskAnimation color={colorScheme.primary} />;
    }
    if (titleLower.includes("payment") || titleLower.includes("reconciliation")) {
      return <PaymentAnimation color={colorScheme.primary} />;
    }
    if (titleLower.includes("vehicle") || titleLower.includes("master")) {
      return <VehicleAnimation color={colorScheme.primary} />;
    }
    if (titleLower.includes("discount") || titleLower.includes("scheme")) {
      return <DiscountAnimation color={colorScheme.primary} />;
    }
    if (titleLower.includes("insurance")) {
      return <InsuranceAnimation color={colorScheme.primary} />;
    }
    return <DefaultAnimation color={colorScheme.primary} />;
  };

  return (
    <div className={cn("relative w-full h-full mx-auto overflow-visible flex items-center justify-center", containerSize)} style={{ maxWidth: isSmall ? "100%" : "800px" }}>
      {/* Connection Lines - Only show for multiple cards */}
      {subCards.length > 1 && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
          <defs>
            <linearGradient id={`subConnectionGradient-${colorScheme.primary}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colorScheme.primary} stopOpacity="0.6" />
              <stop offset="50%" stopColor={colorScheme.primary} stopOpacity="1" />
              <stop offset="100%" stopColor={colorScheme.primary} stopOpacity="0.6" />
            </linearGradient>
          </defs>
          {subCards.map((_, i) => {
            const pos1 = getSubCardPosition(i, subCards.length);
            return (
              <g key={`connections-${i}`}>
                {/* Line to center */}
                <line
                  x1={`${pos1.x}%`}
                  y1={`${pos1.y}%`}
                  x2={`${centerPosition.x}%`}
                  y2={`${centerPosition.y}%`}
                  stroke={`url(#subConnectionGradient-${colorScheme.primary})`}
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  style={{
                    animation: `flowGradientMove 3s linear infinite`,
                    animationDelay: `${i * 0.2}s`,
                    filter: `drop-shadow(0 0 4px ${colorScheme.primary})`,
                  }}
                />
              </g>
            );
          })}
        </svg>
      )}

      {/* Center Hub - Only show for multiple cards */}
      {subCards.length > 1 && (
        <div
          className="absolute w-20 h-20 border-2 flex items-center justify-center z-10"
          style={{
            top: `${centerPosition.y}%`,
            left: `${centerPosition.x}%`,
            transform: "translate(-50%, -50%)",
            borderColor: colorScheme.primary,
            background: `radial-gradient(circle, ${colorScheme.glowColor}, transparent)`,
            boxShadow: `0 0 25px ${colorScheme.glowColor}`,
            animation: "pulseScale 2s ease-in-out infinite",
          }}
        >
          {/* Cross pattern inside */}
          <div className="relative w-full h-full">
            <div
              className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2"
              style={{
                background: colorScheme.primary,
                boxShadow: `0 0 8px ${colorScheme.primary}`,
              }}
            />
            <div
              className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
              style={{
                background: colorScheme.primary,
                boxShadow: `0 0 8px ${colorScheme.primary}`,
              }}
            />
          </div>
        </div>
      )}

      {/* Sub-Cards */}
      {subCards.length === 1 ? (
        // Single card - use flexbox for perfect centering
        <div
          className={cn(
            "absolute inset-0 flex items-center z-20",
            isAccountsSingle ? "justify-end" : "justify-center"
          )}
          style={isAccountsSingle ? { paddingRight: 0 } : undefined}
        >
          <div
            className="transform"
            style={{
              animation: `floatIn 0.6s ease-out both`,
              marginRight: isAccountsSingle ? "-72px" : undefined,
            }}
          >
            {(() => {
              const subCard = subCards[0];
              return (
                <div
                  className={cn(
                    "bg-black/50 backdrop-blur-md border rounded-xl p-5 transition-all hover:scale-110",
                    cardWidth,
                    subCard.status === "Coming Soon" ? "border-white/20" : ""
                  )}
                  style={{
                    borderColor: subCard.status === "Coming Soon" 
                      ? "rgba(255, 255, 255, 0.2)" 
                      : `${colorScheme.primary}70`,
                    boxShadow: `0 0 20px ${colorScheme.glowColor}`,
                  }}
                >
                  {/* Status badge at top right */}
                  <div className="absolute top-3 right-3">
                    <span
                      className={cn(
                        "text-xs px-2 py-1 rounded flex items-center gap-1",
                        subCard.status === "Available"
                          ? "bg-green-500/20 text-green-400 border border-green-500/40"
                          : "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                      )}
                    >
                      {subCard.status === "Available" ? "✓" : "⏳"}
                    </span>
                  </div>
                  
                  <h5 className="font-heading text-sm font-bold text-white mb-1 pr-16 leading-tight tracking-wide uppercase">
                    {subCard.title}
                  </h5>
                  <div
                    className="mb-2 h-0.5 w-12 rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${colorScheme.primary}, transparent)`,
                      boxShadow: `0 0 8px ${colorScheme.primary}`,
                    }}
                  />
                  <p className="text-slate-300 text-xs leading-relaxed mb-3">
                    {subCard.description}
                  </p>
                  
                  {/* Internal Animation showing what the card does */}
                  <div className="relative h-16 mb-2 overflow-hidden rounded-lg bg-black/20">
                    {getCardAnimation(subCard.title)}
                  </div>
                  
                </div>
              );
            })()}
          </div>
        </div>
      ) : (
        // Multiple cards - use absolute positioning
        subCards.map((subCard, index) => {
          const position = getSubCardPosition(index, subCards.length);
          const lowerTitle = subCard.title.toLowerCase();
          const isMasterInsurance = cardId === 5 && lowerTitle.includes("insurance");
          const isMasterDiscount = cardId === 5 && lowerTitle.includes("discount");
          const isPreDelivery = cardId === 1 && lowerTitle.includes("pre delivery");
          return (
            <div
              key={index}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
                animation: `floatIn 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
            <div
              className={cn(
                "bg-black/50 backdrop-blur-md border rounded-xl p-5 transition-all hover:scale-110",
                cardWidth,
                subCard.status === "Coming Soon" ? "border-white/20" : ""
              )}
              style={{
                borderColor: subCard.status === "Coming Soon" 
                  ? "rgba(255, 255, 255, 0.2)" 
                  : `${colorScheme.primary}70`,
                boxShadow: `0 0 20px ${colorScheme.glowColor}`,
                width: isMasterInsurance
                  ? "140px"
                  : isPreDelivery
                    ? "160px"
                    : isMasterDiscount
                      ? "200px"
                      : undefined,
                minHeight: isMasterInsurance
                  ? "90px"
                  : isPreDelivery
                    ? "180px"
                    : isMasterDiscount
                      ? "220px"
                      : undefined,
                padding: isMasterInsurance
                  ? "12px"
                  : isPreDelivery
                    ? "18px"
                    : isMasterDiscount
                      ? "22px"
                      : undefined,
                borderRadius: isMasterInsurance ? "12px" : undefined,
              }}
            >
              {/* Status badge at top right */}
              <div className="absolute top-3 right-3">
                <span
                  className={cn(
                    "text-xs px-2 py-1 rounded flex items-center gap-1",
                    subCard.status === "Available"
                      ? "bg-green-500/20 text-green-400 border border-green-500/40"
                      : "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                  )}
                >
                  {subCard.status === "Available" ? "✓" : "⏳"}
                </span>
              </div>
              
              <h5
                className={cn(
                  "font-heading font-bold text-white leading-tight tracking-wide uppercase",
                  isMasterInsurance ? "text-xs mb-0.5 pr-12" : isPreDelivery ? "text-sm mb-1 pr-10" : "text-sm mb-1 pr-16"
                )}
              >
                {subCard.title}
              </h5>
              <div
                className={cn(
                  "h-0.5 rounded-full",
                  isMasterInsurance ? "mb-1 w-8" : isPreDelivery ? "mb-1.5 w-10" : "mb-2 w-12"
                )}
                style={{
                  background: `linear-gradient(90deg, ${colorScheme.primary}, transparent)`,
                  boxShadow: `0 0 8px ${colorScheme.primary}`,
                }}
              />
              <p
                className={cn(
                  "text-slate-300 leading-relaxed",
                  isMasterInsurance ? "text-[10px] mb-2" : isPreDelivery ? "text-[11px] mb-2.5" : "text-xs mb-3"
                )}
              >
                {subCard.description}
              </p>
              
              {/* Internal Animation showing what the card does */}
              <div
                className="relative mb-2 overflow-hidden rounded-lg bg-black/20"
                style={{ height: isMasterInsurance ? "40px" : isPreDelivery ? "56px" : "64px" }}
              >
                {getCardAnimation(subCard.title)}
              </div>
              
            </div>
          </div>
        );
      })
      )}
    </div>
  );
}

export default function Modules() {
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);
  const popupRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  // Ensure popups are fully visible in viewport using fixed positioning when needed
  useEffect(() => {
    if (hoveredCardId === null) return;

    const updatePopup = () => {
      const popup = popupRefs.current.get(hoveredCardId);
      if (!popup) return;

      const cardElement = popup.closest('.relative')?.querySelector('[class*="bg-gradient-to-br"]');
      if (!cardElement) return;

      // Wait for popup to render
      requestAnimationFrame(() => {
        const cardRect = cardElement.getBoundingClientRect();
        const popupRect = popup.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
        const padding = 20;

        const popupHeight = popupRect.height;
        const popupWidth = popupRect.width;

        // Check if popup fits below card
        const spaceBelow = viewportHeight - cardRect.bottom;
        const needsFixed = popupHeight + 24 > spaceBelow - padding;

        if (needsFixed) {
          // Use fixed positioning to ensure full visibility
          const cardCenterX = cardRect.left + cardRect.width / 2;
          let top = cardRect.bottom + 24;
          let left = cardCenterX;

          // Adjust if would go below viewport
          if (top + popupHeight > viewportHeight - padding) {
            top = Math.max(padding, viewportHeight - popupHeight - padding);
          }

          // Adjust horizontal if needed
          const halfWidth = popupWidth / 2;
          if (left - halfWidth < padding) {
            left = padding + halfWidth;
          } else if (left + halfWidth > viewportWidth - padding) {
            left = viewportWidth - padding - halfWidth;
          }

          popup.style.position = "fixed";
          popup.style.top = `${top}px`;
          popup.style.left = `${left}px`;
          popup.style.transform = "translateX(-50%)";
        } else {
          // Use normal absolute positioning
          popup.style.position = "absolute";
          popup.style.top = "";
          popup.style.left = "";
        }
      });
    };

    const timeoutId = setTimeout(updatePopup, 100);
    window.addEventListener('scroll', updatePopup, { passive: true });
    window.addEventListener('resize', updatePopup);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', updatePopup);
      window.removeEventListener('resize', updatePopup);
    };
  }, [hoveredCardId]);

  return (
    <section id="features" className="w-full py-32 relative overflow-visible bg-[#0a0e27] z-30">
      {/* Shared mesh background */}
      <div className="absolute inset-0 z-0">
        <MeshBackground />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center mb-16 relative z-10">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Under the Hood
          </h2>
          {/* Decorative heading line */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-400/50" />
            <div className="h-px w-24 bg-cyan-400/70" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-400/50" />
          </div>
          <p className="text-slate-400 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            From inventory management to financial tracking, Trackaroo provides all the tools you
            need to run a successful automotive business efficiently.
          </p>
        </div>

        {/* Horizontal Cards Layout */}
        <div className="relative z-30" style={{ isolation: "isolate", overflow: "visible" }}>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 relative z-10" style={{ overflow: "visible" }}>
            {mainCards.map((card, index) => {
              const IconComponent = iconMap[card.id];
              const isHovered = hoveredCardId === card.id;
              const hasSubCards = card.subCards.length > 0;
              const popupRef = popupRefs.current.get(card.id);

              return (
                <div key={card.id} className="relative" style={{ zIndex: isHovered ? 100 : 20, isolation: "isolate", overflow: "visible" }}>
                  {/* Main Card */}
                  <div
                    onMouseEnter={() => setHoveredCardId(card.id)}
                    onMouseLeave={(e) => {
                      // Fix: Check if relatedTarget is a Node before calling contains
                      const relatedTarget = e.relatedTarget;
                      if (relatedTarget && popupRef && relatedTarget instanceof Node) {
                        if (!popupRef.contains(relatedTarget)) {
                          setHoveredCardId(null);
                        }
                      } else {
                        setHoveredCardId(null);
                      }
                    }}
                    className={cn(
                      "bg-gradient-to-br backdrop-blur-md border rounded-2xl p-6 transition-all duration-500 cursor-pointer group",
                      "w-[280px] md:w-[300px] min-h-[280px] flex flex-col",
                      card.colorScheme.bgGradient,
                      card.colorScheme.borderColor,
                      isHovered
                        ? "scale-105 shadow-2xl border-opacity-100 z-30"
                        : "hover:scale-[1.02] hover:border-opacity-80 z-20"
                    )}
                    style={{
                      boxShadow: isHovered
                        ? `0 0 40px ${card.colorScheme.glowColor}, 0 0 80px ${card.colorScheme.glowColor}, inset 0 0 20px ${card.colorScheme.glowColor}`
                        : `0 0 20px ${card.colorScheme.glowColor}`,
                      animation: `${card.animation} 4s ease-in-out infinite`,
                      animationDelay: `${index * 0.2}s`,
                    }}
                  >
                    {/* Animated Background Glow */}
                    <div
                      className="absolute -inset-2 rounded-2xl blur-xl -z-10"
                      style={{
                        background: `radial-gradient(circle, ${card.colorScheme.glowColor}, transparent 70%)`,
                        animation: "pulseGlow 3s ease-in-out infinite",
                        opacity: isHovered ? 0.8 : 0.4,
                      }}
                    />

                    {/* Scan Line on Hover */}
                    {isHovered && (
                      <div
                        className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${card.colorScheme.glowColor}, transparent)`,
                          animation: "scanLine 1.5s ease-in-out infinite",
                        }}
                      />
                    )}

                    {/* Icon */}
                    <div className="mb-4 flex justify-center relative z-10">
                      {IconComponent && (
                        <div
                          className="opacity-90 group-hover:opacity-100 transition-opacity"
                          style={{
                            animation: "pulseScale 3s ease-in-out infinite",
                            animationDelay: `${index * 0.15}s`,
                          }}
                        >
                          <IconComponent />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="relative z-10 text-center flex-1 flex flex-col justify-center">
                      <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-2">
                        {card.title}
                      </h3>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {card.description}
                      </p>
                    </div>

                    {/* Hover Indicator */}
                    {hasSubCards && (
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        Hover to explore →
                      </div>
                    )}
                  </div>

                  {/* Sub-Cards Popup on Hover */}
                  {isHovered && hasSubCards && (
                    <div
                      ref={(el) => {
                        if (el) {
                          popupRefs.current.set(card.id, el);
                        }
                      }}
                      onMouseEnter={() => setHoveredCardId(card.id)}
                      onMouseLeave={() => setHoveredCardId(null)}
                      className={cn(
                        "absolute z-[100] transition-all duration-300 ease-out top-full mt-6"
                      )}
                      style={{
                        width: card.isSmall ? "360px" : "700px",
                        maxWidth: "calc(100vw - 2rem)",
                        left: "50%",
                        transform: "translateX(-50%)",
                        opacity: isHovered ? 1 : 0,
                        pointerEvents: isHovered ? "auto" : "none",
                      }}
                    >
                      <div
                        className={cn(
                          "bg-gradient-to-br backdrop-blur-xl border rounded-2xl p-6 shadow-2xl flex flex-col items-center",
                          card.colorScheme.bgGradient,
                          card.colorScheme.borderColor
                        )}
                        style={{
                          borderColor: card.colorScheme.primary,
                          boxShadow: `0 0 40px ${card.colorScheme.glowColor}, 0 0 80px ${card.colorScheme.glowColor}`,
                        }}
                      >
                        <div className="flex flex-col items-center gap-2 mb-4">
                          <h4 
                            className="font-heading text-xl md:text-2xl font-bold text-center relative z-50 pb-1 tracking-[0.15em] uppercase"
                            style={{ 
                              color: card.colorScheme.primary,
                              textShadow: `0 0 20px ${card.colorScheme.glowColor}, 0 0 40px ${card.colorScheme.glowColor}, 0 0 60px ${card.colorScheme.glowColor}`,
                              animation: "titleGlow 3s ease-in-out infinite",
                            }}
                          >
                            {card.title} Modules
                          </h4>
                          <div
                            className="w-32 h-1 rounded-full overflow-hidden shadow-lg"
                            style={{
                              background: `linear-gradient(90deg, transparent, ${card.colorScheme.primary}, transparent)`,
                              boxShadow: `0 0 20px ${card.colorScheme.glowColor}`,
                              animation: "flowGradientMove 3s linear infinite",
                            }}
                          />
                        </div>
                        <div className="w-full flex justify-center items-center overflow-visible pt-1">
                          <div className="relative w-full flex justify-center" style={{ maxWidth: "100%", overflow: "visible" }}>
                          <ConnectedSubCards subCards={card.subCards} colorScheme={card.colorScheme} isSmall={card.isSmall} cardId={card.id} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Highlight Effect for Reports (no sub-cards) */}
                  {isHovered && !hasSubCards && (
                    <div
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{
                        boxShadow: `0 0 60px ${card.colorScheme.glowColor}, 0 0 120px ${card.colorScheme.glowColor}, inset 0 0 30px ${card.colorScheme.glowColor}`,
                        animation: "pulseGlow 2s ease-in-out infinite",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
