import { motion } from "motion/react";

interface GoalTrackerProps {
  current: number;
  goal: number;
}

export default function GoalTracker({ current, goal }: GoalTrackerProps) {
  const percentage = Math.min((current / goal) * 100, 100);

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl">
      <div className="flex justify-between items-end mb-4">
        <div>
          <p className="text-sm font-mono uppercase tracking-widest text-steel-blue mb-1">Kickstarter Goal</p>
          <h3 className="text-2xl sm:text-4xl font-sans font-bold text-white flex flex-wrap items-baseline gap-x-2">
            ${current.toLocaleString()} <span className="text-lg sm:text-xl font-sans font-normal text-white/40">/ ${goal.toLocaleString()} AUD</span>
          </h3>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-steel-blue">{percentage.toFixed(1)}%</p>
        </div>
      </div>

      <div className="relative h-4 w-full bg-white/10 rounded-full overflow-hidden border border-white/5">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-steel-blue to-mint-cream shadow-[0_0_15px_rgba(61,122,184,0.5)]"
        />
      </div>

      <div className="mt-6 flex justify-between items-center text-xs font-mono uppercase tracking-widest text-white/40">
        <span>Launching Q1 FY27</span>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-steel-blue rounded-full animate-pulse" />
          <span>Live Tracking Soon</span>
        </div>
      </div>
    </div>
  );
}
