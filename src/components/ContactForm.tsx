import React, { useState } from "react";
import { motion } from "motion/react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    // Simulate submission
    setTimeout(() => setStatus("success"), 1500);
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 text-center border border-steel-blue/30 rounded-2xl bg-steel-blue/5"
      >
        <h3 className="text-2xl font-bold text-steel-blue mb-2">You're on the list!</h3>
        <p className="text-white/60">We'll notify you when the Kickstarter goes live on July 1.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-mono uppercase tracking-widest text-white/40 ml-1">Name</label>
          <input
            required
            type="text"
            placeholder="Your Name"
            className="w-full bg-ink-black border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/80 focus:outline-none focus:border-steel-blue/50 transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-mono uppercase tracking-widest text-white/40 ml-1">Email</label>
          <input
            required
            type="email"
            placeholder="your@email.com"
            className="w-full bg-ink-black border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/80 focus:outline-none focus:border-steel-blue/50 transition-colors"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-mono uppercase tracking-widest text-white/40 ml-1">Message (Optional)</label>
        <textarea
          rows={4}
          placeholder="Tell us why you're excited about the project..."
          className="w-full bg-ink-black border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/80 focus:outline-none focus:border-steel-blue/50 transition-colors resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-steel-blue hover:bg-mint-cream text-ink-black font-bold py-4 rounded-xl transition-all transform active:scale-[0.98] disabled:opacity-50"
      >
        {status === "submitting" ? "Registering..." : "Notify Me at Launch"}
      </button>
    </form>
  );
}
