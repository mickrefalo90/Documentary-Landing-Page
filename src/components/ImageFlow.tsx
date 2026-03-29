import React from "react";
import { motion } from "motion/react";
import TronBackground from "./TronBackground";

const images = [
  "https://acmi-website-media-prod.s3.amazonaws.com/media/images/The_Hobbit_-_Smaug.original.png",
  "https://cdn.sanity.io/images/dhoneoxg/production/cf3c522251097822738b977f816e77a52f85f416-1600x775.jpg/Video-Games-CC_GooseGame.jpg?rect=288,0,1025,775&w=320&h=242&fit=min&auto=format",
  "https://acmi-website-media-prod.s3.amazonaws.com/media/images/ARC000025-1_WayOfTheExplodingFist.jpg.1200x1.max-525x525.jpg",
];

export default function ImageFlow() {
  return (
    <div className="relative w-full overflow-hidden py-12 bg-oxford-navy/20 border-y border-steel-blue/10">
      <TronBackground opacity={0.2} />
      <motion.div
        className="relative z-10 flex gap-8"
        animate={{
          x: [0, -800],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 25,
            ease: "linear",
          },
        }}
      >
        {[...images, ...images, ...images].map((src, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-80 h-48 rounded-2xl overflow-hidden border border-steel-blue/20 hover:scale-105 transition-all duration-500 shadow-[0_0_20px_rgba(61,122,184,0.1)]"
          >
            <img
              src={src}
              alt={`Retro Game ${i}`}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
