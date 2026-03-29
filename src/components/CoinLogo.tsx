import React from "react";
import { motion } from "motion/react";

interface CoinLogoProps {
  animated?: boolean;
  className?: string;
}

export default function CoinLogo({ animated = true, className = "w-24 h-24 md:w-32 md:h-32" }: CoinLogoProps) {
  const coinContent = (
    <>
      {/* Coin Depth (The Edge) - Multiple layers for thickness */}
      {[...Array(10)].map((_, i) => (
        <div 
          key={i}
          className="absolute inset-0 rounded-full bg-gradient-to-r from-[#B8860B] via-[#FFD700] to-[#B8860B] border border-[#DAA520]/20" 
          style={{ transform: `translateZ(${i * 0.4 - 2}px)` }}
        />
      ))}

      {/* Front of the coin */}
      <div 
        className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FFD700] via-[#DAA520] to-[#B8860B] border-[3px] border-[#FFFACD]/50 flex items-center justify-center shadow-[0_0_15px_rgba(218,165,32,0.4)]" 
        style={{ 
          transform: "translateZ(2px)",
          backfaceVisibility: "hidden",
          boxShadow: "inset 0 0 10px rgba(0,0,0,0.2), 0 0 20px rgba(218,165,32,0.3)"
        }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute inset-2 rounded-full border border-[#FFFACD]/30 shadow-[inset_0_0_5px_rgba(0,0,0,0.2)]" />
          <StarIcon className="w-1/2 h-1/2 text-[#FFFACD] drop-shadow-[1px_1px_1px_rgba(0,0,0,0.3)]" />
        </div>
      </div>

      {/* Back of the coin */}
      <div 
        className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FFD700] via-[#DAA520] to-[#B8860B] border-[3px] border-[#FFFACD]/50 flex items-center justify-center shadow-[0_0_15px_rgba(218,165,32,0.4)]" 
        style={{ 
          transform: "translateZ(-2px) rotateY(180deg)", 
          backfaceVisibility: "hidden",
          boxShadow: "inset 0 0 10px rgba(0,0,0,0.2), 0 0 20px rgba(218,165,32,0.3)"
        }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute inset-2 rounded-full border border-[#FFFACD]/30 shadow-[inset_0_0_5px_rgba(0,0,0,0.2)]" />
          <StarIcon className="w-1/2 h-1/2 text-[#FFFACD] drop-shadow-[1px_1px_1px_rgba(0,0,0,0.3)]" />
        </div>
      </div>
    </>
  );

  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="w-full h-full"
        animate={animated ? { 
          rotateY: [0, 360],
          y: [0, -4, 0] 
        } : {}}
        transition={animated ? { 
          rotateY: { duration: 4, repeat: Infinity, ease: "linear" },
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        } : {}}
        style={{ 
          transformStyle: "preserve-3d",
        }}
      >
        {coinContent}
      </motion.div>
    </div>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
  );
}
