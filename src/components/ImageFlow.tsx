import React from "react";
import { motion } from "motion/react";
import TronBackground from "./TronBackground";

const images = [
  "https://acmi-website-media-prod.s3.amazonaws.com/media/images/The_Hobbit_-_Smaug.original.png",
  "https://cdn.sanity.io/images/dhoneoxg/production/cf3c522251097822738b977f816e77a52f85f416-1600x775.jpg/Video-Games-CC_GooseGame.jpg?rect=288,0,1025,775&w=320&h=242&fit=min&auto=format",
  "https://acmi-website-media-prod.s3.amazonaws.com/media/images/ARC000025-1_WayOfTheExplodingFist.jpg.1200x1.max-525x525.jpg",
  "https://playitagainproject.com/wp-content/uploads/2021/11/Aussie-Game-Aussie-Metre-LR.jpg",
  "https://playitagainproject.com/wp-content/uploads/2021/11/cw1.png",
  "https://playitagainproject.com/wp-content/uploads/2023/05/thelionking-gameboy-1.png",
  "https://playitagainproject.com/wp-content/uploads/2023/07/DH2-e1689144708676.jpeg",
  "https://images.squarespace-cdn.com/content/v1/606d159a953867291018f801/1617763599729-KB821M5EQA818FABUXO3/lake_of_unn.jpg",
  "https://cdn.prod.website-files.com/5fa23905123118739c5e21e2/64dd8b3179072e161e7695d4_Screenshot1.jpg",
  "https://i.ytimg.com/vi/bQsvfrZ4-Ww/mqdefault.jpg",
  "https://playitagainproject.com/wp-content/uploads/2021/12/Untitled.jpeg",
  "https://i.ytimg.com/vi/wsfSPbTWIoo/maxresdefault.jpg",
  "https://www.pluggedin.com/wp-content/uploads/2020/01/destroy-all-humans-review-image-1200x688.jpg"
];

export default function ImageFlow() {
  return (
    <div className="relative w-full overflow-hidden py-12 bg-oxford-navy/20 border-y border-steel-blue/10">
      <TronBackground opacity={0.2} />
      <motion.div
        className="relative z-10 flex gap-8 px-4"
        animate={{
          x: [0, -4576], // 13 images * (320px width + 32px gap) = 4576px
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 65,
            ease: "linear",
          },
        }}
      >
        {[...images, ...images].map((src, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-80 h-48 rounded-2xl overflow-hidden border border-steel-blue/20 hover:scale-105 transition-all duration-500 shadow-[0_0_20px_rgba(61,122,184,0.1)] group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img
              src={src}
              alt={`Historical Game ${i}`}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
