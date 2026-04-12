import React, { useState, useRef } from "react";
import { motion } from "motion/react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // NOTE: You need to replace these entry IDs with the actual ones from your Google Form.
  // To find them: 
  // 1. Open your Google Form in a browser.
  // 2. Right-click on a field and select "Inspect".
  // 3. Look for the 'name' attribute, which will be something like 'entry.123456789'.
  const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSd2XQdhXbh3TiIuyP4T3swwyV2Fp3k5Lxnkl9cKyr9IxAuy9Q/formResponse";
  const ENTRY_IDS = {
    name: "entry.105151515", // Placeholder: Replace with actual ID
    email: "entry.105151516", // Placeholder: Replace with actual ID
    message: "entry.105151517", // Placeholder: Replace with actual ID
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // We don't preventDefault here because we want the form to submit to the hidden iframe
    setStatus("submitting");
    
    // We'll use a timeout to show the success state since we can't easily detect 
    // the iframe's load event across origins for a Google Form response.
    setTimeout(() => {
      setStatus("success");
    }, 1000);
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
    <>
      {/* Hidden iframe to handle the form submission without page reload */}
      <iframe
        name="hidden_iframe"
        id="hidden_iframe"
        style={{ display: "none" }}
        ref={iframeRef}
      />
      
      <form 
        action={GOOGLE_FORM_URL}
        method="POST"
        target="hidden_iframe"
        onSubmit={handleSubmit} 
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-mono uppercase tracking-widest text-white/40 ml-1">Name</label>
            <input
              required
              name={ENTRY_IDS.name}
              type="text"
              placeholder="Your Name"
              className="w-full bg-ink-black border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/80 focus:outline-none focus:border-steel-blue/50 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-mono uppercase tracking-widest text-white/40 ml-1">Email</label>
            <input
              required
              name={ENTRY_IDS.email}
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
            name={ENTRY_IDS.message}
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
    </>
  );
}
