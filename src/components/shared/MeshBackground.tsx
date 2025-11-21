// Shared Mesh Network Background Component
export default function MeshBackground() {
  // Predefined stable coordinates for mesh
  const nodes = [
    [10, 15], [25, 20], [40, 12], [55, 25], [70, 18], [85, 22],
    [15, 35], [30, 40], [45, 38], [60, 42], [75, 35], [90, 40],
    [12, 55], [28, 60], [42, 58], [58, 62], [72, 55], [88, 60],
    [18, 75], [35, 80], [50, 78], [65, 82], [80, 75], [95, 80],
    [8, 30], [22, 45], [38, 50], [52, 48], [68, 52], [82, 45],
    [20, 10], [48, 15], [78, 28], [32, 65], [62, 70], [85, 72],
  ];

  const connections = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
    [6, 7], [7, 8], [8, 9], [9, 10], [10, 11],
    [12, 13], [13, 14], [14, 15], [15, 16], [16, 17],
    [18, 19], [19, 20], [20, 21], [21, 22], [22, 23],
    [0, 6], [1, 7], [2, 8], [3, 9], [4, 10], [5, 11],
    [6, 12], [7, 13], [8, 14], [9, 15], [10, 16], [11, 17],
    [12, 18], [13, 19], [14, 20], [15, 21], [16, 22], [17, 23],
    [24, 25], [25, 26], [26, 27], [27, 28], [28, 29],
    [0, 24], [3, 26], [6, 25], [9, 27], [12, 28], [15, 29],
  ];

  return (
    <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: "#0a0e27" }}>
      {/* Diagonal stripe pattern overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(0, 0, 0, 0.1) 10px,
            rgba(0, 0, 0, 0.1) 20px
          )`,
          opacity: 0.3,
        }}
      />
      {/* Static mesh network structure */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.5 }}
      >
        <defs>
          <linearGradient id="meshLineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(0, 255, 255, 0.6)" />
            <stop offset="100%" stopColor="rgba(0, 255, 255, 0.2)" />
          </linearGradient>
        </defs>
        {/* Mesh lines - creating interconnected network */}
        {connections.map(([start, end], i) => {
          const [x1, y1] = nodes[start];
          const [x2, y2] = nodes[end];
          return (
            <line
              key={`mesh-line-${i}`}
              x1={`${x1}%`}
              y1={`${y1}%`}
              x2={`${x2}%`}
              y2={`${y2}%`}
              stroke="url(#meshLineGradient)"
              strokeWidth="1.5"
              opacity="0.6"
            />
          );
        })}
        {/* Mesh nodes */}
        {nodes.map(([cx, cy], i) => (
          <circle
            key={`mesh-node-${i}`}
            cx={`${cx}%`}
            cy={`${cy}%`}
            r="2.5"
            fill="rgba(0, 255, 255, 0.9)"
            style={{
              filter: "drop-shadow(0 0 6px rgba(0, 255, 255, 0.9))",
            }}
          />
        ))}
      </svg>
      {/* Static radial gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at center, rgba(0, 243, 255, 0.05) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

