import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Mail, CheckCircle2 } from "lucide-react";

const HeaderForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    
    try {
      localStorage.setItem("vault_email", email);
    } catch (err) {
      console.warn("Storage write failed:", err);
    }

    // Dispatch the custom event to the master BrevoForm to trigger official submission with Google reCAPTCHA
    window.dispatchEvent(
      new CustomEvent("submit-header-subscription", {
        detail: { email: email }
      })
    );

    // Smooth inline transition after simulating successful submission
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8 }}
      className="w-full max-w-xl mx-auto mt-2 px-4 flex flex-col items-center select-none"
    >
      {/* Hidden iframe to capture the native form submission and avoid redirecting */}
      <iframe
        name="header-form-target-frame"
        className="hidden"
        style={{ display: "none" }}
      />

      {/* Form Content */}
      <div className="w-full space-y-3 text-center">
        <p className="text-sm md:text-base text-mint-cream/80 font-normal tracking-wide max-w-md mx-auto leading-relaxed">
          Sign up now for updates on our mission.
        </p>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success-message"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg mx-auto bg-mint-cream/5 border border-steel-blue/30 rounded-2xl p-6 text-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center justify-center gap-3.5 mt-2"
            >
              <CheckCircle2 className="w-8 h-8 text-steel-blue shrink-0 animate-pulse" />
              <span className="font-sans text-sm md:text-base font-normal text-mint-cream/90 tracking-wide text-left leading-relaxed">
                Thank you for following our project! Please keep an eye out for progression and updates.
              </span>
            </motion.div>
          ) : (
            <motion.form 
              key="subscription-form"
              method="POST" 
              action="https://b8804975.sibforms.com/serve/MUIFACvMwoAVNzSECkaRBDPzAdsI8ogjopZoYRb9MtrW7xvTuS7-FBROgTNpbiiLOcZ8NMNFOROxgRWjlvYm93NatFHdhSD_hSg1v85ATkXUJa9Uaof8-JYFaU7nb3vtfwzgwcffrEYPsFcOTp3xJARxOYJZ8hqhOgdZpEex0H31C-JBxad2JAENi-EM1CIBo9dyOlyT6-pKsmU-3A==" 
              onSubmit={handleSubmit}
              target="header-form-target-frame"
              className="flex flex-col sm:flex-row gap-2.5 items-stretch w-full max-w-lg mx-auto mt-2"
            >
              <div className="relative group/field flex-1">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-steel-blue group-focus-within/field:text-mint-cream transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <input 
                  type="email" 
                  name="EMAIL" 
                  required
                  disabled={status === "submitting"}
                  placeholder="Enter your email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-ink-black/85 border border-steel-blue/30 hover:border-steel-blue/60 focus:border-steel-blue rounded-xl pl-11 pr-4 py-2.5 md:py-3 text-white placeholder-mint-cream/30 focus:outline-none focus:ring-1 focus:ring-steel-blue transition-all font-sans text-sm md:text-base font-normal shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] disabled:opacity-50"
                />
              </div>

              <button 
                type="submit"
                disabled={status === "submitting"}
                className="w-full sm:w-auto px-8 md:px-10 bg-steel-blue hover:bg-mint-cream text-ink-black font-display uppercase tracking-widest text-lg sm:text-xl md:text-2xl py-3 md:py-4 rounded-xl transition-all transform active:scale-95 flex items-center justify-center gap-3 shrink-0 cursor-pointer shadow-[0_4px_15px_rgba(61,122,184,0.25)] hover:shadow-[0_4px_20px_rgba(238,243,239,0.3)] font-extrabold disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed group"
              >
                {status === "submitting" ? (
                  <>
                    <svg className="w-6 h-6 animate-spin text-ink-black" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Join the mission</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              {/* Hidden spam protection, default name attributes, & system parameters */}
              <input type="hidden" name="FIRSTNAME" value="Supporter" />
              <input type="hidden" name="LASTNAME" value="Friend" />
              <input type="text" name="email_address_check" defaultValue="" className="hidden" />
              <input type="hidden" name="locale" value="en" />
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default HeaderForm;
