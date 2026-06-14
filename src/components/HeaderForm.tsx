import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Mail } from "lucide-react";

const HeaderForm: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    try {
      localStorage.setItem("vault_email", email);
    } catch (e) {
      console.warn("Storage write failed:", e);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8 }}
      className="w-full max-w-xl mx-auto mt-2 px-4 flex flex-col items-center select-none"
    >
      {/* Form Content */}
      <div className="w-full space-y-3 text-center">
        <p className="text-sm md:text-base text-mint-cream/80 font-normal tracking-wide max-w-md mx-auto leading-relaxed">
          Sign up now to be the first to know when we launch.
        </p>

        <form 
          method="POST" 
          action="https://b8804975.sibforms.com/serve/MUIFACvMwoAVNzSECkaRBDPzAdsI8ogjopZoYRb9MtrW7xvTuS7-FBROgTNpbiiLOcZ8NMNFOROxgRWjlvYm93NatFHdhSD_hSg1v85ATkXUJa9Uaof8-JYFaU7nb3vtfwzgwcffrEYPsFcOTp3xJARxOYJZ8hqhOgdZpEex0H31C-JBxad2JAENi-EM1CIBo9dyOlyT6-pKsmU-3A==" 
          onSubmit={handleSubmit}
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
              placeholder="Enter your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-ink-black/85 border border-steel-blue/30 hover:border-steel-blue/60 focus:border-steel-blue rounded-xl pl-11 pr-4 py-2.5 md:py-3 text-white placeholder-mint-cream/30 focus:outline-none focus:ring-1 focus:ring-steel-blue transition-all font-sans text-sm md:text-base font-normal shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]"
            />
          </div>

          <button 
            type="submit"
            className="w-full sm:w-auto px-8 md:px-10 bg-steel-blue hover:bg-mint-cream text-ink-black font-display uppercase tracking-widest text-lg sm:text-xl md:text-2xl py-3 md:py-4 rounded-xl transition-all transform active:scale-95 flex items-center justify-center gap-3 shrink-0 cursor-pointer shadow-[0_4px_15px_rgba(61,122,184,0.25)] hover:shadow-[0_4px_20px_rgba(238,243,239,0.3)] font-extrabold"
          >
            <span>Join the mission</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Hidden spam protection & system parameters */}
          <input type="text" name="email_address_check" defaultValue="" className="hidden" />
          <input type="hidden" name="locale" value="en" />
        </form>
      </div>
    </motion.div>
  );
};

export default HeaderForm;
