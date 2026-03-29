import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle2, Sparkles } from "lucide-react";

interface PledgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  tier: {
    title: string;
    price: string;
    perks: string[];
    featured?: boolean;
  } | null;
}

/**
 * 🛠️ HOW TO EDIT REWARDS:
 * 1. Locate the 'App.tsx' file.
 * 2. Find the 'pledgeTiers' array (or where TierCard is called).
 * 3. Update the 'perks' array for each tier.
 * 4. To add more detailed descriptions here, modify the 'PledgeModal' content below.
 */

export default function PledgeModal({ isOpen, onClose, tier }: PledgeModalProps) {
  if (!tier) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-ink-black/95 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-oxford-navy/40 rounded-3xl overflow-hidden shadow-2xl border border-steel-blue/20 backdrop-blur-2xl p-8 md:p-12"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 p-2 bg-white/5 hover:bg-white/10 text-white rounded-full transition-colors backdrop-blur-md border border-white/10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-8">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-steel-blue" />
                  <span className="text-xs font-mono uppercase tracking-[0.3em] text-steel-blue/80">Pledge Tier Details</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-display font-normal tracking-widest uppercase text-white leading-none">
                  {tier.title}
                </h2>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-steel-blue">${tier.price}</span>
                  <span className="text-mint-cream/40 text-sm font-sans uppercase">AUD</span>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                  <h3 className="text-sm font-mono uppercase tracking-widest text-mint-cream/80 border-b border-white/10 pb-2">
                    Included Rewards
                  </h3>
                  
                  {/* 📝 REWARDS LIST - UNCOMMENT LATER TO SHOW REWARDS */}
                  <div className="flex items-center gap-3 text-mint-cream/50 py-4">
                    <Sparkles className="w-5 h-5 text-steel-blue/30" />
                    <span className="text-lg font-light italic">Rewards To Be Confirmed</span>
                  </div>

                  {/* 
                  <ul className="grid grid-cols-1 gap-4">
                    {tier.perks.map((perk, i) => (
                      <li key={i} className="flex items-start gap-3 text-mint-cream/70 group">
                        <CheckCircle2 className="w-5 h-5 text-steel-blue flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                        <span className="text-lg font-light leading-tight">{perk}</span>
                      </li>
                    ))}
                  </ul>
                  */}
                </div>

                <div className="p-6 rounded-2xl bg-steel-blue/5 border border-steel-blue/20">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-steel-blue mb-2">Status: To Be Confirmed</h4>
                  <p className="text-sm text-mint-cream/50 leading-relaxed italic">
                    "Final reward specifications and additional stretch goal bonuses are currently being finalized. All physical items will be produced to the highest archival standards."
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="w-full py-4 bg-steel-blue text-ink-black rounded-xl font-bold uppercase tracking-widest hover:bg-mint-cream transition-all transform active:scale-[0.98]"
                >
                  Back to Tiers
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
