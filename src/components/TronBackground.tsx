import React from "react";

interface TronBackgroundProps {
  className?: string;
  opacity?: number;
}

export default function TronBackground({ className = "", opacity = 0.4 }: TronBackgroundProps) {
  return (
    <div className={`absolute inset-0 z-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Perspective Floor */}
      <div className="tron-horizon absolute inset-0">
        <div className="tron-floor" />
        {/* Horizon Glow */}
        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-steel-blue/50 shadow-[0_0_20px_rgba(61,122,184,0.8)] z-10" />
      </div>
      {/* Vertical Grid Overlay */}
      <div className={`absolute inset-0 tron-grid`} style={{ opacity }} />
      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-black via-transparent to-ink-black" />
    </div>
  );
}
