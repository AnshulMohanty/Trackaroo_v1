"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import MeshBackground from "@/components/shared/MeshBackground";

const modules = [
  {
    id: 1,
    title: "Stockyard Management",
    description: "Complete vehicle inventory control, transfers, and delivery tracking across all locations.",
    color: "from-cyan-400/20 to-teal-400/20",
    borderColor: "border-cyan-400/40",
    glowColor: "rgba(0, 243, 255, 0.5)",
    size: "col-span-1 row-span-1",
    animation: "float1",
    icon: "map",
    iconAnimation: "rotate360",
    internalAnimation: "mapView",
  },
  {
    id: 2,
    title: "Master Data",
    description: "Centralized management of vehicle configurations, pricing, and discount schemes.",
    color: "from-blue-400/20 to-indigo-400/20",
    borderColor: "border-blue-400/40",
    glowColor: "rgba(96, 165, 250, 0.5)",
    size: "col-span-1 row-span-1",
    animation: "float2",
    icon: "database",
    iconAnimation: "pulseScale",
    internalAnimation: "dataFlow",
  },
  {
    id: 3,
    title: "Post Delivery Inspection",
    description: "Quality control and inspection management system for delivered vehicles.",
    color: "from-red-400/20 to-pink-400/20",
    borderColor: "border-red-400/40",
    glowColor: "rgba(248, 113, 113, 0.5)",
    size: "col-span-1 row-span-1",
    animation: "float3",
    icon: "checklist",
    iconAnimation: "bounce",
    internalAnimation: "checklist",
  },
  {
    id: 4,
    title: "Expense Tracking",
    description: "Multi-branch expense management with detailed reporting and analytics.",
    color: "from-teal-400/20 to-cyan-400/20",
    borderColor: "border-teal-400/40",
    glowColor: "rgba(20, 184, 166, 0.5)",
    size: "col-span-1 row-span-1",
    animation: "float4",
    icon: "chart",
    iconAnimation: "wave",
    internalAnimation: "lineChart",
  },
  {
    id: 5,
    title: "Field Staff Management",
    description: "Real-time location tracking and activity monitoring for field personnel.",
    color: "from-yellow-400/20 to-amber-400/20",
    borderColor: "border-yellow-400/40",
    glowColor: "rgba(250, 204, 21, 0.5)",
    size: "col-span-1 row-span-1",
    animation: "float5",
    icon: "gps",
    iconAnimation: "pulseGlow",
    internalAnimation: "gpsTrack",
  },
  {
    id: 6,
    title: "Task Management",
    description: "Project management with Kanban boards for streamlined workflow organization.",
    color: "from-purple-400/20 to-violet-400/20",
    borderColor: "border-purple-400/40",
    glowColor: "rgba(168, 85, 247, 0.5)",
    size: "col-span-1 row-span-1",
    animation: "float6",
    icon: "kanban",
    iconAnimation: "slide",
    internalAnimation: "kanban",
  },
  {
    id: 7,
    title: "User Management",
    description: "Comprehensive user administration and role-based access control system.",
    color: "from-green-400/20 to-emerald-400/20",
    borderColor: "border-green-400/40",
    glowColor: "rgba(74, 222, 128, 0.5)",
    size: "col-span-1 row-span-1",
    animation: "float7",
    icon: "users",
    iconAnimation: "swing",
    internalAnimation: "attendance",
  },
  {
    id: 8,
    title: "Salary Management",
    description: "Complete payroll system with attendance tracking and automated payslip generation.",
    color: "from-cyan-400/20 to-blue-400/20",
    borderColor: "border-cyan-400/40",
    glowColor: "rgba(0, 243, 255, 0.5)",
    size: "col-span-1 row-span-1",
    animation: "float8",
    icon: "payroll",
    iconAnimation: "shimmer",
    internalAnimation: "payroll",
  },
  {
    id: 9,
    title: "Payment Reconciliation",
    description: "Advanced financial tracking and payment reconciliation for all transactions.",
    color: "from-indigo-400/20 to-purple-400/20",
    borderColor: "border-indigo-400/40",
    glowColor: "rgba(129, 140, 248, 0.5)",
    size: "col-span-1 row-span-1",
    animation: "float9",
    icon: "payment",
    iconAnimation: "rotate360",
    internalAnimation: "coins",
  },
  {
    id: 10,
    title: "Reports & Analytics",
    description: "Comprehensive business intelligence with customizable reports and insights.",
    color: "from-pink-400/20 to-rose-400/20",
    borderColor: "border-pink-400/40",
    glowColor: "rgba(244, 114, 182, 0.5)",
    size: "col-span-1 row-span-1",
    animation: "float10",
    icon: "analytics",
    iconAnimation: "pulseScale",
    internalAnimation: "pieChart",
  },
  {
    id: 11,
    title: "Fuel Management",
    description: "Track analysis and create fuel slip for company vehicle.",
    color: "from-orange-400/20 to-amber-400/20",
    borderColor: "border-orange-400/40",
    glowColor: "rgba(251, 146, 60, 0.5)",
    size: "col-span-1 row-span-1",
    animation: "float11",
    icon: "fuel",
    iconAnimation: "bounce",
    internalAnimation: "progress",
  },
];

// Exact mesh connectivity matching the image pattern
const connections = [
  // Horizontal connections
  { from: 1, to: 2 },
  { from: 4, to: 5 },
  { from: 4, to: 6 },
  { from: 7, to: 8 },
  { from: 8, to: 9 },
  { from: 7, to: 10 },
  { from: 8, to: 11 },
  // Vertical connections
  { from: 1, to: 4 },
  { from: 2, to: 5 },
  { from: 3, to: 6 },
  { from: 4, to: 7 },
  { from: 5, to: 8 },
  { from: 6, to: 9 },
  // Diagonal connections for mesh
  { from: 1, to: 5 },
  { from: 2, to: 6 },
  { from: 4, to: 8 },
  { from: 5, to: 9 },
  { from: 7, to: 8 },
  { from: 8, to: 10 },
];

// Icon Components
function MapIcon() {
  return (
    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 7L9 4L15 7L21 4V17L15 20L9 17L3 20V7Z"
        stroke="currentColor"
        strokeWidth="2"
        className="text-cyan-400"
      />
      <circle cx="9" cy="10" r="2" fill="currentColor" className="text-cyan-400" />
      <circle cx="15" cy="12" r="2" fill="currentColor" className="text-cyan-400" />
    </svg>
  );
}

function DatabaseIcon() {
  return (
    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="5" rx="9" ry="3" stroke="currentColor" strokeWidth="2" className="text-blue-400" />
      <path d="M3 5V19C3 20.6569 7.02944 22 12 22C16.9706 22 21 20.6569 21 19V5" stroke="currentColor" strokeWidth="2" className="text-blue-400" />
      <ellipse cx="12" cy="12" rx="9" ry="3" stroke="currentColor" strokeWidth="2" className="text-blue-400" />
    </svg>
  );
}

function ChecklistIcon() {
  return (
    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
      <path d="M9 5H5C4.44772 5 4 5.44772 4 6V20C4 20.5523 4.44772 21 5 21H19C19.5523 21 20 20.5523 20 20V6C20 5.44772 19.5523 5 19 5H15" stroke="currentColor" strokeWidth="2" className="text-red-400" />
      <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5" stroke="currentColor" strokeWidth="2" className="text-red-400" />
      <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-red-400" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
      <path d="M3 3V21H21" stroke="currentColor" strokeWidth="2" className="text-teal-400" />
      <path d="M7 16L11 12L15 8L21 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-teal-400" />
    </svg>
  );
}

function GpsIcon() {
  return (
    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
      <path d="M12 2V6M12 18V22M2 12H6M18 12H22" stroke="currentColor" strokeWidth="2" className="text-yellow-400" />
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" className="text-yellow-400" />
      <circle cx="12" cy="12" r="3" fill="currentColor" className="text-yellow-400" />
    </svg>
  );
}

function KanbanIcon() {
  return (
    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="5" height="18" rx="1" stroke="currentColor" strokeWidth="2" className="text-purple-400" />
      <rect x="10" y="3" width="5" height="18" rx="1" stroke="currentColor" strokeWidth="2" className="text-purple-400" />
      <rect x="17" y="3" width="4" height="18" rx="1" stroke="currentColor" strokeWidth="2" className="text-purple-400" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" className="text-green-400" />
      <path d="M3 21C3 17.134 6.13401 14 10 14C13.866 14 17 17.134 17 21" stroke="currentColor" strokeWidth="2" className="text-green-400" />
      <circle cx="17" cy="7" r="4" stroke="currentColor" strokeWidth="2" className="text-green-400" />
    </svg>
  );
}

function PayrollIcon() {
  return (
    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" className="text-cyan-400" />
      <path d="M7 8H17M7 12H17M7 16H13" stroke="currentColor" strokeWidth="2" className="text-cyan-400" />
    </svg>
  );
}

function PaymentIcon() {
  return (
    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="2" className="text-indigo-400" />
      <path d="M2 10H22" stroke="currentColor" strokeWidth="2" className="text-indigo-400" />
    </svg>
  );
}

function AnalyticsIcon() {
  return (
    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
      <path d="M3 3V21H21" stroke="currentColor" strokeWidth="2" className="text-pink-400" />
      <path d="M7 16L12 11L16 7L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-pink-400" />
    </svg>
  );
}

function FuelIcon() {
  return (
    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
      <path d="M3 20L5 4H19L21 20H3Z" stroke="currentColor" strokeWidth="2" className="text-orange-400" />
      <path d="M7 8H17M7 12H17" stroke="currentColor" strokeWidth="2" className="text-orange-400" />
    </svg>
  );
}

const iconMap: Record<string, React.ComponentType> = {
  map: MapIcon,
  database: DatabaseIcon,
  checklist: ChecklistIcon,
  chart: ChartIcon,
  gps: GpsIcon,
  kanban: KanbanIcon,
  users: UsersIcon,
  payroll: PayrollIcon,
  payment: PaymentIcon,
  analytics: AnalyticsIcon,
  fuel: FuelIcon,
};

// Internal Animation Components
function MapViewAnimation() {
  return (
    <div className="absolute inset-0 p-2 opacity-40">
      <svg viewBox="0 0 100 60" className="w-full h-full">
        <rect x="10" y="10" width="80" height="40" fill="none" stroke="rgba(0, 243, 255, 0.3)" strokeWidth="0.5" />
        <circle cx="30" cy="25" r="3" fill="rgba(0, 243, 255, 0.6)" style={{ animation: "pulse 2s infinite" }} />
        <circle cx="50" cy="30" r="3" fill="rgba(0, 243, 255, 0.6)" style={{ animation: "pulse 2s infinite 0.3s" }} />
        <circle cx="70" cy="35" r="3" fill="rgba(0, 243, 255, 0.6)" style={{ animation: "pulse 2s infinite 0.6s" }} />
      </svg>
    </div>
  );
}

function DataFlowAnimation() {
  return (
    <div className="absolute inset-0 p-2 opacity-40">
      <svg viewBox="0 0 100 60" className="w-full h-full">
        <circle cx="20" cy="30" r="4" fill="rgba(96, 165, 250, 0.6)" />
        <path d="M24 30 L40 30" stroke="rgba(96, 165, 250, 0.6)" strokeWidth="1" strokeDasharray="2,2">
          <animate attributeName="stroke-dashoffset" values="0;4" dur="1s" repeatCount="indefinite" />
        </path>
        <circle cx="50" cy="30" r="4" fill="rgba(96, 165, 250, 0.6)" />
        <path d="M54 30 L70 30" stroke="rgba(96, 165, 250, 0.6)" strokeWidth="1" strokeDasharray="2,2">
          <animate attributeName="stroke-dashoffset" values="0;4" dur="1s" repeatCount="indefinite" begin="0.5s" />
        </path>
        <circle cx="80" cy="30" r="4" fill="rgba(96, 165, 250, 0.6)" />
      </svg>
    </div>
  );
}

function ChecklistAnimation() {
  return (
    <div className="absolute inset-0 p-2 opacity-40">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 border border-red-400/60 rounded" style={{ animation: "checkAppear 2s infinite" }} />
          <div className="h-1 bg-red-400/40 rounded flex-1" style={{ width: "60%" }} />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 border border-red-400/60 rounded" style={{ animation: "checkAppear 2s infinite 0.3s" }} />
          <div className="h-1 bg-red-400/40 rounded flex-1" style={{ width: "80%" }} />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 border border-red-400/60 rounded" style={{ animation: "checkAppear 2s infinite 0.6s" }} />
          <div className="h-1 bg-red-400/40 rounded flex-1" style={{ width: "40%" }} />
        </div>
      </div>
    </div>
  );
}

function LineChartAnimation() {
  return (
    <div className="absolute inset-0 p-2 opacity-40">
      <svg viewBox="0 0 100 40" className="w-full h-full">
        <polyline
          points="0,35 15,30 30,25 45,20 60,15 75,10 90,5"
          fill="none"
          stroke="rgba(20, 184, 166, 0.6)"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <animate attributeName="stroke-dasharray" values="0,200;200,0" dur="3s" repeatCount="indefinite" />
        </polyline>
      </svg>
    </div>
  );
}

function GpsTrackAnimation() {
  return (
    <div className="absolute inset-0 p-2 opacity-40">
      <svg viewBox="0 0 100 60" className="w-full h-full">
        <circle cx="50" cy="30" r="15" fill="none" stroke="rgba(250, 204, 21, 0.4)" strokeWidth="1" />
        <circle cx="50" cy="30" r="8" fill="rgba(250, 204, 21, 0.6)" style={{ animation: "pulse 2s infinite" }} />
        <circle cx="50" cy="30" r="3" fill="rgba(250, 204, 21, 1)" />
      </svg>
    </div>
  );
}

function KanbanAnimation() {
  return (
    <div className="absolute inset-0 p-2 opacity-40">
      <div className="flex gap-2 h-full">
        <div className="flex-1 flex flex-col gap-1">
          <div className="h-2 bg-purple-400/40 rounded" style={{ width: "70%" }} />
          <div className="h-2 bg-purple-400/40 rounded" style={{ width: "50%" }} />
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <div className="h-2 bg-purple-400/40 rounded" style={{ width: "90%" }} />
          <div className="h-2 bg-purple-400/40 rounded" style={{ width: "60%" }} />
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <div className="h-2 bg-purple-400/40 rounded" style={{ width: "40%" }} />
        </div>
      </div>
    </div>
  );
}

function AttendanceAnimation() {
  return (
    <div className="absolute inset-0 p-2 opacity-40">
      <svg viewBox="0 0 100 60" className="w-full h-full">
        <rect x="10" y="20" width="15" height="20" fill="rgba(74, 222, 128, 0.4)" />
        <rect x="30" y="15" width="15" height="25" fill="rgba(74, 222, 128, 0.4)" />
        <rect x="50" y="10" width="15" height="30" fill="rgba(74, 222, 128, 0.4)" />
        <rect x="70" y="18" width="15" height="22" fill="rgba(74, 222, 128, 0.4)" />
        <line x1="10" y1="45" x2="85" y2="45" stroke="rgba(74, 222, 128, 0.6)" strokeWidth="1" />
      </svg>
    </div>
  );
}

function PayrollAnimation() {
  return (
    <div className="absolute inset-0 p-2 opacity-40">
      <svg viewBox="0 0 100 60" className="w-full h-full">
        <path
          d="M10 50 Q30 30, 50 35 T90 25"
          fill="none"
          stroke="rgba(0, 243, 255, 0.6)"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <animate attributeName="stroke-dasharray" values="0,200;200,0" dur="3s" repeatCount="indefinite" />
        </path>
      </svg>
    </div>
  );
}

function CoinsAnimation() {
  return (
    <div className="absolute inset-0 p-2 opacity-40 flex items-center justify-center gap-1">
      <div className="w-4 h-4 bg-indigo-400/40 rounded-full" style={{ animation: "coinStack 2s infinite" }} />
      <div className="w-4 h-4 bg-indigo-400/40 rounded-full" style={{ animation: "coinStack 2s infinite 0.2s" }} />
      <div className="w-4 h-4 bg-indigo-400/40 rounded-full" style={{ animation: "coinStack 2s infinite 0.4s" }} />
    </div>
  );
}

function PieChartAnimation() {
  return (
    <div className="absolute inset-0 p-2 opacity-40">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="20" fill="none" stroke="rgba(244, 114, 182, 0.3)" strokeWidth="8" />
        <circle
          cx="50"
          cy="50"
          r="20"
          fill="none"
          stroke="rgba(244, 114, 182, 0.8)"
          strokeWidth="8"
          strokeDasharray="62.8 188.4"
          strokeDashoffset="0"
          transform="rotate(-90 50 50)"
        >
          <animate attributeName="stroke-dasharray" values="0 251.2;62.8 188.4" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}

function ProgressAnimation() {
  return (
    <div className="absolute inset-0 p-2 opacity-40">
      <div className="h-2 bg-orange-400/20 rounded-full overflow-hidden">
        <div
          className="h-full bg-orange-400/60 rounded-full"
          style={{
            width: "0%",
            animation: "progressFill 3s ease-in-out infinite",
          }}
        />
      </div>
    </div>
  );
}

const internalAnimationMap: Record<string, React.ComponentType> = {
  mapView: MapViewAnimation,
  dataFlow: DataFlowAnimation,
  checklist: ChecklistAnimation,
  lineChart: LineChartAnimation,
  gpsTrack: GpsTrackAnimation,
  kanban: KanbanAnimation,
  attendance: AttendanceAnimation,
  payroll: PayrollAnimation,
  coins: CoinsAnimation,
  pieChart: PieChartAnimation,
  progress: ProgressAnimation,
};

export default function Modules() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [connectionPaths, setConnectionPaths] = useState<Array<{ x1: number; y1: number; x2: number; y2: number }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const moduleRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  useEffect(() => {
    const updateConnections = () => {
      const paths = connections.map((conn) => {
        const fromEl = moduleRefs.current.get(conn.from);
        const toEl = moduleRefs.current.get(conn.to);
        const container = containerRef.current;

        if (!fromEl || !toEl || !container) {
          return { x1: 0, y1: 0, x2: 0, y2: 0 };
        }

        const containerRect = container.getBoundingClientRect();
        const fromRect = fromEl.getBoundingClientRect();
        const toRect = toEl.getBoundingClientRect();

        return {
          x1: fromRect.left - containerRect.left + fromRect.width / 2,
          y1: fromRect.top - containerRect.top + fromRect.height / 2,
          x2: toRect.left - containerRect.left + toRect.width / 2,
          y2: toRect.top - containerRect.top + toRect.height / 2,
        };
      });

      setConnectionPaths(paths);
    };

    setTimeout(updateConnections, 200);
    window.addEventListener("resize", updateConnections);
    return () => window.removeEventListener("resize", updateConnections);
  }, []);

  return (
    <section className="w-full py-24 relative overflow-hidden bg-[#0a0e27]">
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
          <p className="text-cyan-400 text-sm md:text-base uppercase tracking-widest mb-2 font-heading">
            MODULAR. INTERCONNECTED. ALIVE.
          </p>
          <p className="text-slate-400 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            From inventory management to financial tracking, Trackaroo provides all the tools you
            need to run a successful automotive business efficiently.
          </p>
        </div>

        {/* Grid Container with Exact Mesh Connectivity */}
        <div ref={containerRef} className="relative min-h-[900px]">
          {/* Enhanced SVG for Glowing Mesh Connections */}
          <svg
            className="connections-svg absolute inset-0 w-full h-full pointer-events-none z-0"
            style={{ height: "100%" }}
          >
            <defs>
              <linearGradient id="meshGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(0, 243, 255, 0.9)" />
                <stop offset="50%" stopColor="rgba(0, 243, 255, 1)" />
                <stop offset="100%" stopColor="rgba(0, 243, 255, 0.9)" />
              </linearGradient>
              <filter id="meshGlow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {connectionPaths.map((path, index) => (
              <g key={index}>
                {/* Outer glow layer */}
                <line
                  x1={path.x1}
                  y1={path.y1}
                  x2={path.x2}
                  y2={path.y2}
                  stroke="rgba(0, 243, 255, 0.4)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  filter="url(#meshGlow)"
                  opacity="0.6"
                />
                {/* Main glowing mesh line */}
                <line
                  x1={path.x1}
                  y1={path.y1}
                  x2={path.x2}
                  y2={path.y2}
                  stroke="url(#meshGradient)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  opacity="1"
                  style={{
                    filter: "drop-shadow(0 0 6px rgba(0, 243, 255, 1))",
                    animation: `drawLine 2s ease-out ${index * 0.08}s forwards, flowPulse 2s ease-in-out ${index * 0.08 + 2}s infinite`,
                  }}
                />
              </g>
            ))}
          </svg>

          {/* Smaller Asymmetrical Modules Grid */}
          <div className="grid grid-cols-3 gap-4 md:gap-5 relative z-10">
            {modules.map((module, index) => {
              const IconComponent = iconMap[module.icon];
              const InternalAnimation = internalAnimationMap[module.internalAnimation];
              return (
                <div
                  key={module.id}
                  ref={(el) => {
                    if (el) moduleRefs.current.set(module.id, el);
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={cn(
                    "relative bg-gradient-to-br backdrop-blur-md border rounded-xl p-4 transition-all duration-500 group min-h-[160px] overflow-hidden",
                    module.color,
                    module.borderColor,
                    module.size,
                    hoveredIndex === index
                      ? "scale-105 shadow-2xl border-opacity-100 z-20"
                      : "hover:border-opacity-70"
                  )}
                  style={{
                    boxShadow:
                      hoveredIndex === index
                        ? `0 0 40px ${module.glowColor}, 0 0 80px ${module.glowColor}, inset 0 0 20px ${module.glowColor}`
                        : `0 0 12px ${module.glowColor}`,
                    animation: `${module.animation} 4s ease-in-out infinite`,
                  }}
                >
                  {/* Animated Background Glow */}
                  <div
                    className="absolute -inset-1 rounded-xl blur-lg -z-10"
                    style={{
                      background: `radial-gradient(circle, ${module.glowColor}, transparent 70%)`,
                      animation: "pulseGlow 3s ease-in-out infinite",
                      opacity: hoveredIndex === index ? 0.7 : 0.3,
                    }}
                  />

                  {/* Internal Animation */}
                  {InternalAnimation && <InternalAnimation />}

                  {/* Animated Scan Line on Hover */}
                  {hoveredIndex === index && (
                    <div
                      className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none"
                      style={{
                        background: "linear-gradient(90deg, transparent, rgba(0, 243, 255, 0.4), transparent)",
                        animation: "scanLine 1.5s ease-in-out infinite",
                      }}
                    />
                  )}

                  {/* Animated Icon */}
                  <div className="mb-2 flex justify-center relative z-10">
                    {IconComponent && (
                      <div
                        className="opacity-90 group-hover:opacity-100 transition-opacity"
                        style={{
                          animation: `${module.iconAnimation} 3s ease-in-out infinite`,
                          animationDelay: `${index * 0.1}s`,
                        }}
                      >
                        <IconComponent />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="font-heading text-base md:text-lg font-bold text-white mb-1.5">
                      {module.title}
                    </h3>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      {module.description}
                    </p>
                  </div>

                  {/* Hover Effect - Expanding Border */}
                  {hoveredIndex === index && (
                    <div
                      className="absolute inset-0 rounded-xl border-2 pointer-events-none"
                      style={{
                        borderColor: module.glowColor.replace("0.5", "1"),
                        animation: "borderExpand 0.6s ease-out forwards",
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
