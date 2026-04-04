import React, { useState } from "react";
import { motion } from "motion/react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("https://formspree.io/regionlocked.doco@gmail.com", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          _subject: "New Region Locked Lead",
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("success");
      } else {
        // Formspree returns specific errors if the email isn't verified
        if (result.error && result.error.includes("is not set up")) {
          throw new Error("Formspree setup incomplete: Please check regionlocked.doco@gmail.com for a confirmation email from Formspree and click the link to activate the form.");
        }
        throw new Error(result.error || "Form submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("idle");
      const message = error instanceof Error ? error.message : "Something went wrong. Please try again later.";
      alert(message);
    }
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
        {/* Hidden field for spam protection */}
        <input type="text" name="_gotcha" style={{ display: "none" }} />
        <div className="space-y-2">
          <label className="text-[10px] font-mono uppercase tracking-widest text-white/40 ml-1">Name</label>
          <input
            required
            name="name"
            type="text"
            placeholder="Your Name"
            className="w-full bg-ink-black border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/80 focus:outline-none focus:border-steel-blue/50 transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-mono uppercase tracking-widest text-white/40 ml-1">Email</label>
          <input
            required
            name="email"
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
          name="message"
          placeholder="Tell us why you're excited about the project..."
          className="w-full bg-ink-black border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/80 focus:outline-none focus:border-steel-blue/50 transition-colors resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-steel-blue hover:bg-mint-cream text-ink-black font-bold py-3 md:py-4 rounded-xl transition-all transform active:scale-[0.98] disabled:opacity-50 text-sm md:text-base"
      >
        {status === "submitting" ? "Registering..." : "Notify Me at Launch"}
      </button>
    </form>
  );
}
