import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star } from 'lucide-react';
import StarField from './components/StarField';

const TypewriterMessage = ({ onComplete }: { onComplete: () => void }) => {
  const [displayedText, setDisplayedText] = useState("");
  const message = "Welcome to the mission.\nOur Journey Starts Now...";
  const indexRef = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const currentIndex = indexRef.current;
      if (currentIndex < message.length) {
        setDisplayedText((prev) => prev + message[currentIndex]);
        indexRef.current = currentIndex + 1;
      } else {
        clearInterval(timer);
        onComplete();
      }
    }, 60);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="font-mono-jb text-lg md:text-xl text-emerald-400 tracking-tight flex items-start">
      <span className="mr-2 opacity-50">{">"}</span>
      <span className="whitespace-pre-wrap">
        {displayedText}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-2 h-5 bg-emerald-400 ml-1 translate-y-1"
        />
      </span>
    </div>
  );
};

const ProtocolProgressBar = ({ onCrashTrigger, onComplete }: { onCrashTrigger: () => void, onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const crashTriggered = useRef(false);

  useEffect(() => {
    const start = Date.now();
    const duration = 3000;
    const update = () => {
      const now = Date.now();
      const elapsed = now - start;
      const currentProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(currentProgress);
      if (currentProgress >= 80 && !crashTriggered.current) {
        crashTriggered.current = true;
        onCrashTrigger();
      }
      if (currentProgress < 100) {
        requestAnimationFrame(update);
      } else {
        onComplete();
      }
    };
    requestAnimationFrame(update);
  }, [onCrashTrigger, onComplete]);

  return (
    <div className="mt-8 font-mono space-y-2">
      <div className="flex justify-between text-[10px] text-emerald-500/80 uppercase tracking-widest">
        <span>Initiating...</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="w-full h-4 border-2 border-emerald-500/40 relative">
        <motion.div
          className="absolute inset-x-0 inset-y-0 bg-emerald-500/60"
          style={{ width: progress + "%" }}
        />
      </div>
    </div>
  );
};

const GlitchOverlay = () => {
  const [phase, setPhase] = useState<'typing' | 'loading' | 'crashing'>('typing');
  
  const handleComplete = () => {
    window.location.href = "/";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        x: phase === 'crashing' ? [0, -10, 10, -5, 5, 0] : 0,
        y: phase === 'crashing' ? [0, 5, -5, 2, -2, 0] : 0,
        filter: phase === 'crashing' ? "invert(1) hue-rotate(90deg) contrast(2)" : "none"
      }}
      transition={{
        x: { duration: 0.1, repeat: phase === 'crashing' ? Infinity : 0 },
        y: { duration: 0.1, repeat: phase === 'crashing' ? Infinity : 0 }
      }}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-4 md:p-12 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none z-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(0,255,0,0.02),rgba(0,0,0,0),rgba(0,255,0,0.02))] bg-[length:100%_4px,3px_100%]" />
      <div className="relative w-full max-w-2xl aspect-video border-2 border-emerald-500/80 bg-black p-1 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
        <div className="w-full h-full border-2 border-emerald-500/40 flex flex-col relative">
          <div className="border-b-2 border-emerald-500/40 p-2 flex justify-between items-center bg-emerald-500/10">
            <div className="font-retro text-emerald-500 uppercase tracking-widest text-sm px-2">Region Locked Protocol v1.0</div>
            <div className="flex space-x-3 px-2 font-mono text-emerald-500 text-xs">
              <span>_</span>
              <span>[ ]</span>
              <span>X</span>
            </div>
          </div>
          <div className="flex-1 p-6 font-mono relative overflow-hidden">
            <TypewriterMessage onComplete={() => setPhase('loading')} />
            {(phase === 'loading' || phase === 'crashing') && (
              <ProtocolProgressBar
                onCrashTrigger={() => setPhase('crashing')}
                onComplete={handleComplete}
              />
            )}
            <div className="absolute inset-0 bg-emerald-500/5 animate-pulse pointer-events-none" />
          </div>
          {phase === 'crashing' && (
            <div className="absolute inset-0 z-30 bg-red-600/20 flex items-center justify-center pointer-events-none">
              <span className="font-pixel text-red-500 text-[8px] animate-bounce">SYSTEM FAILURE // CONTACT ADMIN</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Coin = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => setIsFlipped(v => !v), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="perspective-1000 mb-12">
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{ transformStyle: 'preserve-3d' }}
        className="w-36 h-36 relative"
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-[#ffd700] via-[#b8860b] to-[#8b4513] border-4 border-[#ffec8b] shadow-[inset_0_0_25px_rgba(255,255,255,0.6)] flex items-center justify-center backface-hidden"
          style={{ transform: 'translateZ(6px)' }}
        >
          <div className="absolute inset-2 rounded-full border-2 border-[#daa520]/40" />
          <Star className="w-18 h-18 text-[#fffacd] fill-[#fffacd]" />
        </div>
        {/* Back */}
        <div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-[#8b4513] via-[#b8860b] to-[#ffd700] border-4 border-[#ffec8b] shadow-[inset_0_0_25px_rgba(255,255,255,0.6)] flex items-center justify-center backface-hidden"
          style={{ transform: 'rotateY(180deg) translateZ(6px)' }}
        >
          <div className="absolute inset-2 rounded-full border-2 border-[#daa520]/40" />
          <Star className="w-18 h-18 text-[#fffacd] fill-[#fffacd]" />
        </div>
      </motion.div>
    </div>
  );
};

export default function VaultPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Brevo Configuration
    window.REQUIRED_CODE_ERROR_MESSAGE = 'Please choose a country code';
    window.LOCALE = 'en';
    window.EMAIL_INVALID_MESSAGE = window.SMS_INVALID_MESSAGE = "The information provided is invalid. Please review the field format and try again.";
    window.REQUIRED_ERROR_MESSAGE = "This field cannot be left blank. ";
    window.GENERIC_INVALID_MESSAGE = "The information provided is invalid. Please review the field format and try again.";
    window.AUTOHIDE = false;
    window.translation = {
      common: {
        selectedList: '{quantity} list selected',
        selectedLists: '{quantity} lists selected',
        selectedOption: '{quantity} selected',
        selectedOptions: '{quantity} selected',
      }
    };

    // Global Captcha Handler
    window.handleCaptchaResponse = function() {
      const captchaEl = document.getElementById('sib-captcha');
      if (captchaEl) {
        const event = new Event('captchaChange');
        captchaEl.dispatchEvent(event);
      }
    };

    // Load Scripts (official Brevo scripts)
    const loadScript = (src: string, isAsync = false, defer = false) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = isAsync;
      script.defer = defer;
      document.body.appendChild(script);
      return script;
    };

    const mainScript = loadScript("https://sibforms.com/forms/end-form/build/main.js", false, true);
    const recaptchaScript = loadScript("https://www.google.com/recaptcha/api.js?render=6LdU0M0sAAAAAGDWgRryotUmGdCTTku8c0un_WUc&hl=en", true, true);

    // Watch for success message to trigger glitch overlay
    const observer = new MutationObserver((mutations) => {
      const successMsg = document.getElementById('success-message');
      if (successMsg && !successMsg.classList.contains('hidden')) {
        setIsSubmitted(true);
        setIsSubmitting(false);
      }
    });

    observer.observe(document.body, { attributes: true, subtree: true, childList: true });

    return () => {
      if (document.body.contains(mainScript)) document.body.removeChild(mainScript);
      if (document.body.contains(recaptchaScript)) document.body.removeChild(recaptchaScript);
      observer.disconnect();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    setIsSubmitting(true);
  };

  if (isSubmitted) return <GlitchOverlay />;

  return (
    <main className="min-h-screen bg-[#030711] flex flex-col items-center justify-center p-6 relative overflow-hidden text-white font-sans selection:bg-yellow-500/30">
      <div className="absolute inset-0 z-0 opacity-20">
        <StarField />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#0d1932_0%,#030711_100%)] pointer-events-none" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0" 
           style={{ 
             backgroundImage: 'linear-gradient(rgba(100, 150, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(100, 150, 255, 0.2) 1px, transparent 1px)',
             backgroundSize: '50px 50px'
           }} />

      <div id="sib-form-container" className="relative z-10 flex flex-col items-center max-w-2xl w-full text-center">
        <Coin />
        
        <h1 className="text-2xl md:text-5xl font-retro tracking-widest mb-4 text-yellow-50/90 uppercase leading-snug">
          The Australian Video Game history is <br className="hidden md:block" /> being lost to time.
        </h1>
        
        <p className="text-white font-mono-jb text-[10px] md:text-xs uppercase tracking-[0.4em] mb-12 opacity-80 animate-pulse">
          Unlock the Vault
        </p>

        <div className="w-full max-w-sm">
          <div id="sib-container">
            <form
              id="sib-form"
              method="POST"
              action="https://b8804975.sibforms.com/serve/MUIFACvMwoAVNzSECkaRBDPzAdsI8ogjopZoYRb9MtrW7xvTuS7-FBROgTNpbiiLOcZ8NMNFOROxgRWjlvYm93NatFHdhSD_hSg1v85ATkXUJa9Uaof8-JYFaU7nb3vtfwzgwcffrEYPsFcOTp3xJARxOYJZ8hqhOgdZpEex0H31C-JBxad2JAENi-EM1CIBo9dyOlyT6-pKsmU-3A=="
              data-type="subscription"
              onSubmit={handleSubmit}
              className="space-y-3"
            >
              <div className="grid grid-cols-2 gap-3">
                <div className="sib-input">
                  <div className="form__entry">
                    <input 
                      id="FIRSTNAME"
                      name="FIRSTNAME" 
                      placeholder="FIRST NAME" 
                      required 
                      data-required="true"
                      className="bg-black/40 border border-yellow-900/30 p-3 w-full text-yellow-100 placeholder:text-yellow-600/60 font-mono-jb text-[10px] uppercase focus:outline-none focus:border-yellow-600/50 transition-colors" 
                    />
                    <label className="entry__error entry__error--primary hidden mt-2 text-[8px] text-red-500 font-mono uppercase"></label>
                  </div>
                </div>
                <div className="sib-input">
                  <div className="form__entry">
                    <input 
                      id="LASTNAME"
                      name="LASTNAME" 
                      placeholder="LAST NAME" 
                      required 
                      data-required="true"
                      className="bg-black/40 border border-yellow-900/30 p-3 w-full text-yellow-100 placeholder:text-yellow-600/60 font-mono-jb text-[10px] uppercase focus:outline-none focus:border-yellow-600/50 transition-colors" 
                    />
                    <label className="entry__error entry__error--primary hidden mt-2 text-[8px] text-red-500 font-mono uppercase"></label>
                  </div>
                </div>
              </div>
              <div className="sib-input">
                <div className="form__entry">
                  <input 
                    id="EMAIL"
                    name="EMAIL" 
                    type="email" 
                    placeholder="ENTER YOUR EMAIL:" 
                    required 
                    data-required="true"
                    className="w-full bg-black/40 border border-yellow-900/30 p-3 text-yellow-100 placeholder:text-yellow-600/60 font-mono-jb text-[10px] uppercase focus:outline-none focus:border-yellow-600/50 transition-colors" 
                  />
                  <label className="entry__error entry__error--primary hidden mt-2 text-[8px] text-red-500 font-mono uppercase"></label>
                </div>
              </div>

              {/* Hidden Captcha Section for v3 */}
              <div className="hidden">
                <div className="g-recaptcha-v3" data-sitekey="6LdU0M0sAAAAAGDWgRryotUmGdCTTku8c0un_WUc"></div>
              </div>

              <button 
                type="submit" 
                form="sib-form"
                disabled={isSubmitting}
                className="w-full bg-yellow-600/10 border border-yellow-600/30 p-3 text-yellow-600 font-pixel text-[10px] uppercase hover:bg-yellow-600/20 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "DECRYPTING..." : "SUBMIT"}
              </button>
              
              <input type="text" name="email_address_check" defaultValue="" className="hidden" />
              <input type="hidden" name="locale" value="en" />
            </form>

            {/* Success/Error Panels (Script will toggle hidden class) */}
            <div id="success-message" className="hidden sib-form-message-panel mt-6 p-4 border border-green-500/30 bg-green-500/5 text-green-400 font-mono text-[10px] uppercase tracking-widest">
              Success. Data sequence initiated.
            </div>
            <div id="error-message" className="hidden sib-form-message-panel mt-6 p-4 border border-red-500/30 bg-red-500/5 text-red-400 font-mono text-[10px] uppercase tracking-widest">
              Failure. Encryption error detected.
            </div>
            
            <div className="mt-8 text-[8px] font-mono uppercase tracking-widest text-white/20">
              Secure Encryption Protocol // Vault v2.04
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .perspective-1000 { perspective: 1000px; }
        /* Hide Sib Default Styles that might leak */
        #sib-container .sib-form-block { margin: 0 !important; }
        #sib-container .form__entry { margin-bottom: 0 !important; }
      ` }} />
    </main>
  );
}
