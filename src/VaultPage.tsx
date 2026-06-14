import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Database, Cpu, MonitorPlay } from 'lucide-react';
import StarField from './components/StarField';
import TronBackground from './components/TronBackground';

const TypewriterMessage = ({ onComplete }: { onComplete: () => void }) => {
  const [displayedText, setDisplayedText] = useState("");
  const name = localStorage.getItem('vault_firstName') || 'Operative';
  const message = `UPLINK ESTABLISHED... WELCOME TO THE MISSION, ${name.toUpperCase()}.\nDECRYPTION SCHEMES SUCCESSFUL. PREPARING DATA STREAM...`;
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
    }, 45);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="font-mono-jb text-[13px] md:text-sm text-steel-blue tracking-wider flex items-start leading-relaxed">
      <span className="mr-2 opacity-50">{">"}</span>
      <span className="whitespace-pre-wrap">
        {displayedText}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-2.5 h-[15px] bg-steel-blue ml-1 translate-y-0.5"
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
    const duration = 2500;
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
    <div className="mt-6 font-mono-jb space-y-2">
      <div className="flex justify-between text-[11px] text-steel-blue/80 uppercase tracking-widest">
        <span>Transmitting Access Tokens...</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="w-full h-3.5 bg-ink-black/80 border border-steel-blue/40 rounded-full overflow-hidden relative p-[2px]">
        <motion.div
          className="h-full bg-steel-blue rounded-full shadow-[0_0_10px_rgba(61,122,184,0.8)]"
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
        x: phase === 'crashing' ? [0, -6, 6, -3, 3, 0] : 0,
        y: phase === 'crashing' ? [0, 3, -3, 1, -1, 0] : 0,
        filter: phase === 'crashing' ? "brightness(1.5) contrast(1.2)" : "none"
      }}
      transition={{
        x: { duration: 0.1, repeat: phase === 'crashing' ? Infinity : 0 },
        y: { duration: 0.1, repeat: phase === 'crashing' ? Infinity : 0 }
      }}
      className="fixed inset-0 z-[100] bg-ink-black flex items-center justify-center p-4 md:p-12 overflow-hidden"
    >
      {/* Cyber line overlay */}
      <div className="absolute inset-0 pointer-events-none z-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(61,122,184,0.02),rgba(0,0,0,0),rgba(61,122,184,0.02))] bg-[length:100%_4px,3px_100%]" />
      
      <div className="relative w-full max-w-xl border-2 border-steel-blue/80 bg-ink-black/95 p-1 rounded-2xl shadow-[0_0_40px_rgba(61,122,184,0.25)]">
        {/* Decorative background grid inside overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04] z-0 bg-[linear-gradient(rgba(61,122,184,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(61,122,184,0.18)_1px,transparent_1px)] bg-[size:24px_24px] rounded-2xl" />

        <div className="w-full border border-steel-blue/30 rounded-xl flex flex-col relative z-10 bg-black/40">
          <div className="border-b border-steel-blue/40 p-3.5 flex justify-between items-center bg-steel-blue/10">
            <div className="font-display text-steel-blue uppercase tracking-widest text-lg px-1 flex items-center gap-2">
              <Cpu className="w-4 h-4 animate-spin text-steel-blue shrink-0" />
              <span>Decryption Key Authorized</span>
            </div>
            <div className="flex space-x-2.5 px-1 font-mono-jb text-steel-blue/70 text-xs">
              <span>_</span>
              <span>[ ]</span>
              <span>X</span>
            </div>
          </div>
          <div className="flex-1 p-6 md:p-8 font-mono-jb relative overflow-hidden">
            <TypewriterMessage onComplete={() => setPhase('loading')} />
            {(phase === 'loading' || phase === 'crashing') && (
              <ProtocolProgressBar
                onCrashTrigger={() => setPhase('crashing')}
                onComplete={handleComplete}
              />
            )}
            <div className="absolute inset-0 bg-steel-blue/5 animate-pulse pointer-events-none" />
          </div>
          {phase === 'crashing' && (
            <div className="absolute inset-0 z-30 bg-steel-blue/20 flex flex-col items-center justify-center pointer-events-none gap-2">
              <span className="font-mono-jb text-steel-blue text-sm uppercase animate-bounce tracking-widest">
                UPLINK READY // INITIALIZING GUEST MATRIX
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default function VaultPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Save to localStorage for persistence across pages
    localStorage.setItem('vault_firstName', formData.firstName);
    localStorage.setItem('vault_lastName', formData.lastName);
    localStorage.setItem('vault_email', formData.email);
    localStorage.setItem('from_vault', 'true');

    // Simulate decrypting delay
    setTimeout(() => {
      setIsSubmitted(true);
      setIsSubmitting(false);
    }, 1400);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (isSubmitted) return <GlitchOverlay />;

  return (
    <main className="min-h-screen bg-ink-black flex flex-col items-center justify-center p-4 md:p-6 relative overflow-x-hidden text-mint-cream font-sans selection:bg-steel-blue/30">
      {/* Grid Pattern Background - Identical to Main Website */}
      <TronBackground opacity={0.16} />
      
      {/* StarField Ambient Overlay */}
      <div className="absolute inset-0 z-[1] opacity-35 pointer-events-none">
        <StarField />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-4xl w-full text-center space-y-4 md:space-y-6 py-4 md:py-8">
        
        {/* Header Branding Panel (Region Locked Treatment from Homepage) */}
        <div className="w-full flex flex-col items-center">
          <h1
            className="text-[12vw] sm:text-6xl md:text-7xl lg:text-8xl font-display font-normal tracking-[0.08em] text-white leading-[0.85] uppercase flex flex-col sm:flex-row items-center justify-center gap-y-0 gap-x-[0.1em] select-none pointer-events-none"
            style={{ textShadow: '0 0 40px rgba(0, 0, 0, 0.4), 0 0 80px rgba(61, 122, 184, 0.2)' }}
          >
            <span>REGION</span>
            <span className="-mt-[0.02em] sm:mt-0">
              L
              <span className="relative inline-flex items-center justify-center">
                O
                <svg 
                  viewBox="7 2 10 20" 
                  fill="currentColor" 
                  className="absolute h-[0.51em] w-auto text-[#050505] pointer-events-none top-[42%] left-[40%] -translate-x-1/2 -translate-y-1/2 scale-y-110"
                >
                  <path d="M12 2C9.24 2 7 4.24 7 7C7 8.83 8 10.42 9.5 11.25L7 22H17L14.5 11.25C16 10.42 17 8.83 17 7C17 4.24 14.76 2 12 2C9.24 2 7 4.24 7 7C7 8.83 8 10.42 9.5 11.25L7 22H17L14.5 11.25C16 10.42 17 8.83 17 7C17 4.24 14.76 2 12 2Z" />
                </svg>
              </span>
              CKED
              <span className="text-[0.5em] tracking-tighter inline-block align-middle ml-[-0.1em] relative bottom-[0.02em] opacity-60">:</span>
            </span>
          </h1>
          
          <p className="mt-3.5 text-xs md:text-sm text-steel-blue font-mono-jb uppercase tracking-[0.45em] pl-[0.45em]">
            view our trailer:
          </p>
        </div>

        {/* Compact Layout for Youtube and Form (No enclosing device panels) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 items-center pt-2 max-w-3xl md:max-w-4xl">
          
          {/* Left Block: Embedded YouTube Video Trailer directly onto grid */}
          <div className="md:col-span-7 flex flex-col relative w-full">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black border border-steel-blue/25 shadow-[0_0_30px_rgba(61,122,184,0.15)]">
              <iframe
                src="https://www.youtube.com/embed/hrsfSl_Dil4?rel=0"
                title="Region Locked YouTube Player"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          {/* Right Block: Decryption Access Form directly onto grid */}
          <div className="md:col-span-5 flex flex-col relative justify-center w-full">
            <form
              onSubmit={handleSubmit}
              className="space-y-3.5 text-left w-full"
            >
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[8px] md:text-[9px] font-mono-jb text-steel-blue/80 uppercase tracking-widest pl-1">
                    FIRST NAME:
                  </label>
                  <input 
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="FIRST" 
                    required 
                    className="w-full bg-ink-black/70 border border-steel-blue/30 focus:border-steel-blue text-mint-cream placeholder:text-sky-400 placeholder:font-bold font-mono-jb text-xs sm:text-sm uppercase rounded-xl py-3 px-4 focus:ring-1 focus:ring-steel-blue/50 outline-none transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[8px] md:text-[9px] font-mono-jb text-steel-blue/80 uppercase tracking-widest pl-1">
                    LAST NAME:
                  </label>
                  <input 
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="LAST" 
                    required 
                    className="w-full bg-ink-black/70 border border-steel-blue/30 focus:border-steel-blue text-mint-cream placeholder:text-sky-400 placeholder:font-bold font-mono-jb text-xs sm:text-sm uppercase rounded-xl py-3 px-4 focus:ring-1 focus:ring-steel-blue/50 outline-none transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]" 
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="block text-[8px] md:text-[9px] font-mono-jb text-steel-blue/80 uppercase tracking-widest pl-1">
                  EMAIL ADDRESS:
                </label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="EMAIL" 
                  required 
                  className="w-full bg-ink-black/70 border border-steel-blue/30 focus:border-steel-blue text-mint-cream placeholder:text-sky-400 placeholder:font-bold font-mono-jb text-xs sm:text-sm uppercase rounded-xl py-3 px-4 focus:ring-1 focus:ring-steel-blue/50 outline-none transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]" 
                />
              </div>
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-[#1b344d]/30 hover:bg-steel-blue text-white hover:text-ink-black border border-steel-blue/80 hover:border-steel-blue font-display text-lg uppercase tracking-wider py-3 px-6 rounded-xl transition-all font-bold shadow-[0_0_15px_rgba(61,122,184,0.15)] hover:shadow-[0_0_25px_rgba(61,122,184,0.35)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                <Database className="w-4.5 h-4.5" />
                <span>{isSubmitting ? "Submitting..." : "submit to find out more..."}</span>
              </button>
            </form>
          </div>

        </div>

        {/* Small footer clearance indicator */}
        <div className="pt-2 text-[8px] font-mono-jb uppercase tracking-widest text-[#3d7ab8]/35 select-none pointer-events-none">
          Secure Encryption Protocol // Vault v2.04
        </div>
      </div>
    </main>
  );
}
