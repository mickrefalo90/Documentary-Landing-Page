import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, animate } from "motion/react";
import ReactGA from "react-ga4";
import CoinLogo from "./components/CoinLogo";
import StarField from "./components/StarField";
import GoalTracker from "./components/GoalTracker";
import FAQ from "./components/FAQ";
import ImageFlow from "./components/ImageFlow";
import VideoLightbox from "./components/VideoLightbox";
import TronBackground from "./components/TronBackground";
import BrevoForm from "./components/BrevoForm";
import { Link } from "react-router-dom";
import { Gamepad2, History, Cpu, Sparkles, ArrowRight, Instagram, MessageSquare, Linkedin, ExternalLink, User, Disc, Shirt, BookOpen, Star, Crown, Layers, Menu, X, ChevronDown, Briefcase, Facebook, Youtube, Database } from "lucide-react";
import sectionsConfig from "./config/sections.json";

function BlueskyIcon({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 600 530" 
      fill="currentColor" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m135.72 44.03c66.496 49.921 138.02 151.14 164.28 205.46 26.262-54.316 97.782-155.54 164.28-205.46 47.98-36.021 125.72-63.892 125.72 24.795 0 17.712-10.155 148.79-16.111 170.07-20.703 73.984-96.144 92.854-163.25 81.433 117.3 19.964 147.14 86.092 82.697 152.22-122.39 125.59-175.91-31.511-189.63-71.766-2.514-7.3797-3.6904-10.832-3.7077-7.8964-0.0174-2.9357-1.1937 0.51669-3.7077 7.8964-13.714 40.255-67.233 197.36-189.63 71.766-64.444-66.128-34.605-132.26 82.697-152.22-67.108 11.421-142.55-7.4491-163.25-81.433-5.9562-21.282-16.111-152.36-16.111-170.07 0-88.687 77.742-60.816 125.72-24.795z" />
    </svg>
  );
}

const NAV_ITEMS = [
  { key: 'hero', label: 'Home', id: '#' },
  { key: 'mission', label: 'Mission', id: '#goal' },
  { key: 'about', label: 'About', id: '#about' },
  { key: 'roster', label: 'Roster', id: '#roster' },
  { key: 'narrative', label: 'Narrative', id: '#narrative' },
  { key: 'team', label: 'Team', id: '#team' },
  { key: 'follow', label: 'Follow', id: '#follow' },
  { key: 'faq', label: 'FAQ', id: '#faq' },
];

const ROSTER_GAMES = [
  {
    title: "The Hobbit",
    developer: "Beam Software",
    year: "1982",
    talents: ["Veronika Megler - Programmer", "Russel Comte - Art"],
    image: "https://images.launchbox-app.com//c71997e7-bf6e-41ba-8efa-4319e9837a41.jpg"
  },
  {
    title: "The Way of the Exploding Fist",
    developer: "Beam Software",
    year: "1985",
    talents: ["Greg Barnett - Designer and Programmer"],
    image: "https://images.launchbox-app.com//b072ac15-f83f-4d53-b1b0-7d4832363bf3.jpg"
  },
  {
    title: "The Dame was Loaded",
    developer: "Beam Software",
    year: "1996",
    talents: ["Marshall Parker - Sound"],
    image: "https://images.launchbox-app.com//7154084e-64a4-477a-93ea-4c65a9016e44.jpg"
  },
  {
    title: "Ty the Tasmanian Tiger",
    developer: "Krome Studios",
    year: "2002",
    talents: ["John Passfield - Development Director"],
    image: "https://images.launchbox-app.com//cde3aa98-c416-4988-9565-4989061e7a6e.png"
  }
];

const NARRATIVE_ACTS = [
  {
    id: "act-1",
    act: "Act I",
    title: "The Technical Innovators",
    year: "1980s – 1990s",
    theme: "The raw ingenuity that drove the Australian developers to innovate their way onto the global stage.",
    moments: [
      "Imaginative storytelling.",
      "Innovative solutions.", 
      "Risky and rewarding leaps of faith."
    ],
    color: "steel-blue"
  },
  {
    id: "act-2",
    act: "Act II",
    title: "The Outsourcing Machine",
    year: "1990s – Late 2000s",
    theme: "The navigation of global integration. The rise of work-for-hire and the grind that led to the eventual collapse of a thriving industry.",
    moments: [
      "Global recognition of skill and grit.",
      "Cinematic conversions for international fame.",
      "The grind that put on the brakes."
    ],
    color: "red-500"
  },
  {
    id: "act-3",
    act: "Act III",
    title: "Unlocked & Unleashed",
    year: "2000 – 2015+",
    theme: "Rising from the ashes, bypassing the gatekeepers, and the explosion of the global indie powerhouse.",
    moments: [
      "Gaming in the real world.",
      "Putting a finger on digital chicken and fruit.",
      "Indie rises from the ashes of legends."
    ],
    color: "emerald-500"
  }
];

const ACT_LABELS = ["Act One", "Act Two", "Act Three"];

export default function LandingPage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showVaultPopup, setShowVaultPopup] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    // Safely check localStorage
    const getStorageItem = (key: string) => {
      try {
        return localStorage.getItem(key);
      } catch (e) {
        console.warn(`Local storage access denied for key: ${key}`, e);
        return null;
      }
    };

    const removeStorageItem = (key: string) => {
      try {
        localStorage.removeItem(key);
      } catch (e) {
        // ignore
      }
    };

    const setStorageItem = (key: string, value: string) => {
      try {
        localStorage.setItem(key, value);
      } catch (e) {
        // ignore
      }
    };

    // Check if user came from vault
    const fromVault = getStorageItem('from_vault');
    if (fromVault === 'true') {
      setShowVaultPopup(true);
      // Remove flag so it doesn't show on every refresh
      removeStorageItem('from_vault');
    }

    // Check if first time for signup popup
    const hasSeenSignup = getStorageItem('has_seen_signup_popup_v3');
    if (!hasSeenSignup) {
      const timer = setTimeout(() => {
        setShowSignupPopup(true);
      }, 2000);
      return () => clearTimeout(timer);
    }

    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (measurementId) {
      ReactGA.initialize(measurementId);
      ReactGA.send({ hitType: "pageview", page: window.location.pathname });
    }
  }, []);
  const [bannerIndex, setBannerIndex] = useState(0);
  const bannerMessages = ["Sign up for updates!", "Follow our Kickstarter"];

  useEffect(() => {
    const timer = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % bannerMessages.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  const handlePopupClose = () => {
    setShowVaultPopup(false);
  };

  const visibleNavItems = NAV_ITEMS.filter(item => (sectionsConfig as any)[item.key]);

  const smoothScrollTo = (targetId: string) => {
    if (!targetId || targetId === '#') {
      const startPosition = window.scrollY;
      const animation = animate(startPosition, 0, {
        duration: 1.5,
        ease: [0.32, 0.23, 0, 1],
        onUpdate: (value) => window.scrollTo(0, value),
      });
      animation.then(() => {}, () => {});
      return;
    }

    try {
      const target = document.querySelector(targetId);
      if (!target) return;

      const targetPosition = target.getBoundingClientRect().top + window.scrollY - 80;
      const startPosition = window.scrollY;

      const animation = animate(startPosition, targetPosition, {
        duration: 1.5,
        ease: [0.32, 0.23, 0, 1],
        onUpdate: (value) => window.scrollTo(0, value),
      });

      // Handle promise rejection (interrupted animations)
      animation.then(() => {}, () => {});
    } catch (e) {
      console.error(`Failed to scroll to ${targetId}:`, e);
    }
  };

  return (
    <div ref={targetRef} className="min-h-screen bg-ink-black text-mint-cream selection:bg-steel-blue selection:text-ink-black overflow-x-hidden">
      <AnimatePresence>
        {showSignupPopup && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[200] w-full max-w-[calc(100%-3rem)] md:max-w-sm"
          >
            <div className="bg-oxford-navy/80 backdrop-blur-xl border border-steel-blue/30 p-6 md:p-8 relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-3xl overflow-hidden">
              {/* Subtle background glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-steel-blue/10 blur-[60px] rounded-full pointer-events-none" />
              
              {/* Close Button */}
              <button 
                onClick={() => {
                  setShowSignupPopup(false);
                  try {
                    localStorage.setItem('has_seen_signup_popup_v3', 'true');
                  } catch (e) { /* ignore */ }
                }}
                className="absolute top-2 right-2 text-white/40 hover:text-white transition-colors p-4 cursor-pointer z-20 group"
                aria-label="Close popup"
              >
                <X className="w-6 h-6 group-active:scale-95 transition-transform" />
              </button>

              <div className="text-center space-y-4 relative z-10">
                <div className="w-12 h-12 bg-steel-blue/20 rounded-full flex items-center justify-center mx-auto mb-2 border border-steel-blue/10">
                  <Sparkles className="w-6 h-6 text-steel-blue" />
                </div>
                
                <h2 className="text-xl font-display text-white uppercase tracking-widest leading-tight">
                  Join the Mission
                </h2>
                
                <p className="text-sm text-mint-cream/80 font-light leading-relaxed">
                  Sign up for updates on the documentary's progress and campaign news.
                </p>

                <div className="pt-2 flex flex-col gap-3">
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      setShowSignupPopup(false);
                      try {
                        localStorage.setItem('has_seen_signup_popup_v3', 'true');
                      } catch (e) { /* ignore */ }
                      smoothScrollTo('#follow');
                    }}
                    className="w-full bg-steel-blue hover:bg-steel-blue/90 text-white py-3 rounded-xl font-display uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 group text-xs cursor-pointer shadow-lg shadow-steel-blue/20"
                  >
                    Click Here to Sign Up
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  <button 
                    onClick={() => {
                      setShowSignupPopup(false);
                      try {
                        localStorage.setItem('has_seen_signup_popup_v3', 'true');
                      } catch (e) { /* ignore */ }
                    }}
                    className="text-[10px] font-mono text-mint-cream/30 hover:text-mint-cream/60 uppercase tracking-widest transition-colors py-1 cursor-pointer"
                  >
                    Maybe later
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {showVaultPopup && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-black border-2 border-yellow-600/50 p-8 max-w-md w-full relative shadow-[0_0_50px_rgba(202,138,4,0.3)]"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-600/50 to-transparent" />
              
              <h2 className="text-2xl font-retro text-yellow-500 uppercase tracking-widest mb-4">
                Transmission Received
              </h2>
              
              <p className="font-mono text-sm text-yellow-100/80 leading-relaxed mb-8">
                Thank you for joining the mission. 
                <br /><br />
                If you are interested in following the project development,{" "}
                <a 
                  href="#follow" 
                  onClick={(e) => {
                    e.preventDefault();
                    handlePopupClose();
                    smoothScrollTo('#follow');
                  }}
                  className="text-yellow-500 underline underline-offset-4 hover:text-yellow-400 transition-colors cursor-pointer"
                >
                  click here
                </a>.
              </p>

              <button 
                onClick={handlePopupClose}
                className="w-full border border-yellow-600/30 py-3 text-[10px] font-pixel text-yellow-600/60 hover:bg-yellow-600/10 transition-all uppercase"
              >
                Close Connection
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Banner */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div 
          onClick={() => {
            smoothScrollTo('#follow');
          }}
          className="relative block w-full bg-steel-blue text-white py-2.5 text-center text-xs md:text-sm font-bold uppercase tracking-[0.2em] hover:brightness-110 transition-all duration-300 cursor-pointer overflow-hidden group shadow-[0_2px_15px_rgba(61,122,184,0.3)]"
        >
          {/* Subtle Shine Effect */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shine pointer-events-none" />
          
          <span className="relative flex items-center justify-center gap-2 overflow-hidden" style={{ fontSize: "16px" }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={bannerIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="flex items-center gap-2"
              >
                {bannerMessages[bannerIndex]}
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </motion.span>
            </AnimatePresence>
          </span>
        </div>
      </div>

      {/* Floating Menu Trigger - Top Left */}
      <button 
        onClick={() => setIsMenuOpen(true)}
        className="fixed top-20 left-6 md:top-24 md:left-10 lg:left-12 z-[60] flex items-center gap-4 group cursor-pointer drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
      >
        <div className="p-2 border border-white/20 rounded-full group-hover:border-steel-blue transition-all duration-300 bg-ink-black/40 backdrop-blur-md md:hidden">
          <Menu className="w-7 h-7 text-white group-hover:text-steel-blue transition-colors" />
        </div>
        <span className="hidden md:block font-display text-xl tracking-[0.4em] uppercase text-white group-hover:text-steel-blue transition-all duration-300 relative">
          Menu
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-steel-blue group-hover:w-full transition-all duration-300"></span>
        </span>
      </button>

      {/* Full-Screen Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-ink-black flex flex-col glitch-overlay"
          >
            {/* Header Area */}
            <div className="fixed top-20 left-6 md:top-24 md:left-10 lg:left-12 z-[150]">
              <button 
                className="text-mint-cream p-3 border border-white/10 rounded-full hover:border-steel-blue hover:text-steel-blue transition-all group bg-ink-black/60 backdrop-blur-xl active:scale-90"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close Menu"
              >
                <X className="w-7 h-7 md:w-8 md:h-8 group-hover:rotate-90 transition-transform duration-500" />
              </button>
            </div>

            {/* Central Navigation */}
            <nav className="flex-1 flex flex-col items-center justify-center relative z-[110] px-6 py-20 md:py-32">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 md:gap-y-4 max-w-6xl w-full">
                {visibleNavItems.map((item, i) => (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className="text-center md:text-left"
                  >
                    <a 
                      href={item.id} 
                      onClick={() => setIsMenuOpen(false)}
                      className="text-4xl md:text-6xl lg:text-7xl font-display uppercase tracking-tight text-white hover:text-steel-blue transition-all duration-300 hover:translate-x-4 inline-block"
                    >
                      {item.label}
                    </a>
                  </motion.div>
                ))}
              </div>
            </nav>

            {/* Socials - Centered on mobile, Bottom Right on desktop */}
            <div className="fixed bottom-12 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:bottom-12 md:right-12 z-[150] flex gap-8">
              {[
                { icon: Facebook, href: "https://www.facebook.com/regionlocked.doco/", title: "Facebook" },
                { icon: Instagram, href: "https://www.instagram.com/regionlocked.doco/", title: "Instagram" },
                { icon: Youtube, href: "https://www.youtube.com/@RegionLocked-doco", title: "YouTube" },
                { icon: BlueskyIcon, href: "https://bsky.app/profile/regionlocked-doco.bsky.social", title: "BlueSky" }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-steel-blue transition-all duration-300 hover:scale-125"
                  title={social.title}
                >
                  <social.icon className="w-6 h-6 md:w-7 md:h-7" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10">
        {/* Hero Section */}
        {sectionsConfig.hero && (
          <section className="relative min-h-screen flex flex-col items-center justify-center py-32 px-8 overflow-hidden text-center">
            <TronBackground opacity={0.3} />
            <div className="absolute inset-0 z-0 opacity-20">
              <StarField />
            </div>
            <motion.div
              style={{ opacity, scale }}
              className="relative z-10 w-full max-w-5xl mx-auto space-y-12 flex flex-col items-center"
            >
              <div className="flex justify-center mb-8">
                <CoinLogo className="w-24 h-24 md:w-32 md:h-32" />
              </div>
              <div className="space-y-6">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-steel-blue font-mono text-sm tracking-[0.5em] uppercase"
                >
                  Launching Q1 FY27 on Kickstarter
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-7xl md:text-[10rem] font-display font-normal tracking-[0.1em] text-white leading-[0.85] uppercase flex items-center justify-center flex-wrap gap-x-[0.15em]"
                >
                  <span>REGION</span>
                  <span>L<span className="relative inline-flex items-center justify-center">O<svg viewBox="7 2 10 20" fill="currentColor" className="absolute h-[0.51em] w-auto text-[#050505] pointer-events-none top-[42%] left-[40%] -translate-x-1/2 -translate-y-1/2 scale-y-110"><path d="M12 2C9.24 2 7 4.24 7 7C7 8.83 8 10.42 9.5 11.25L7 22H17L14.5 11.25C16 10.42 17 8.83 17 7C17 4.24 14.76 2 12 2Z" /></svg></span>CKED<span className="text-[0.5em] tracking-tighter inline-block align-middle ml-[-0.1em] relative bottom-[0.02em] opacity-60">:</span></span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl md:text-2xl text-mint-cream/70 font-normal max-w-xl mx-auto leading-relaxed"
                >
                  Unlocking the History of Australian Video Games
                </motion.p>
              </div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                onClick={() => {
                  ReactGA.event({
                    category: "Navigation",
                    action: "Scroll to Mission",
                    label: "Ready to join?"
                  });
                  smoothScrollTo('#goal');
                }}
                className="flex flex-col items-center justify-center gap-4 pt-12 group cursor-pointer mx-auto"
              >
                <p className="text-steel-blue font-mono text-xs uppercase tracking-[0.3em] group-hover:text-mint-cream transition-colors">Ready to join?</p>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="text-mint-cream/40 group-hover:text-steel-blue transition-colors"
                >
                  <ChevronDown className="w-6 h-6" />
                </motion.div>
              </motion.button>
            </motion.div>

            {/* Floating Image Flow Elements */}
            <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: [0.1, 0.3, 0.1],
                    scale: [1, 1.1, 1],
                    x: [0, Math.random() * 100 - 50, 0],
                    y: [0, Math.random() * 100 - 50, 0],
                  }}
                  transition={{
                    duration: 10 + i * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute w-64 h-64 rounded-2xl bg-gradient-to-br from-steel-blue/10 to-transparent border border-steel-blue/5 backdrop-blur-3xl"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                />
              ))}
            </div>
          </section>
        )}

        {sectionsConfig.hero && <ImageFlow />}

        {/* Goal Tracker Section */}
        {sectionsConfig.mission && (
          <section id="goal" className="py-16 md:py-24 px-6 bg-gradient-to-b from-transparent to-oxford-navy/20 scroll-mt-20">
            <div className="max-w-7xl mx-auto text-center space-y-12">
              <div className="space-y-6">
                <h2 className="text-5xl md:text-7xl font-display font-normal tracking-widest uppercase">Our Mission</h2>
                <div className="max-w-3xl mx-auto space-y-8">
                  <p className="text-mint-cream/90 text-2xl font-light leading-relaxed">
                    Video games are portals to another reality. Worlds where you can traverse perilous dungeons, create civilisations that span decades, or chart unknown planets across the universe. They entertain, educate, and inspire us. But behind the pixels and polygons lies an untold story of resilience. 
                  </p>
                  <p className="text-mint-cream/70 text-lg font-light leading-relaxed italic">
                    In the early days of video games, when technology was restrictive and the global market felt lightyears away, Australian developers were quietly changing the game. They were innovating, hacking, and pushing the boundaries of early hardware to make the impossible a reality.
                  </p>
                  <p className="text-mint-cream/80 text-xl font-normal leading-relaxed">
                    We are making this documentary to tell their story, and to prove that while Aussie developers may have been remote... their talent and passion was never <span className="font-bold italic text-white underline underline-offset-8 decoration-steel-blue/40">Region Locked</span>.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Topics Section */}
        {sectionsConfig.about && (
          <section id="about" className="py-16 md:py-24 px-6 scroll-mt-20">
            <div className="max-w-7xl mx-auto">
              <div className="max-w-4xl mx-auto">
                <div className="space-y-12">
                  <h2 className="text-5xl md:text-7xl font-display font-normal tracking-widest leading-tight uppercase text-center">
                    The Legends of <span className="text-steel-blue">Aussie Games</span> <br />
                    <span className="text-2xl md:text-4xl opacity-80">Unlock the History of Australian Video Games</span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                    <TopicItem
                      icon={<MessageSquare className="w-6 h-6" />}
                      title="The Legends' Perspective"
                      description="Direct conversations with the pioneers who built the Aussie industry from the ground up, sharing their raw truth of creating global hits."
                    />
                    <TopicItem
                      icon={<History className="w-6 h-6" />}
                      title="Preserve the Oral History"
                      description="Preserve, document, and champion the events and history that made Australian video games legendary, ensuring our impact is not lost to time."
                    />
                    <TopicItem
                      icon={<Briefcase className="w-6 h-6" />}
                      title="From Bits to Business"
                      description="The hustle, challenges, and hurdles that gave Aussie devs' momentum; fuelling their passion and making Australian games some of the most innovative in the world."
                    />
                    <TopicItem
                      icon={<Sparkles className="w-6 h-6" />}
                      title="Resilience & Legacy"
                      description="The stories behind the studios that continue to this day, and the ones that dwindled away... Highlighting the ever-enduring spirit of the people that created the games we love today."
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* The Roster Section */}
        {sectionsConfig.roster && (
          <section id="roster" className="py-16 md:py-24 px-6 relative overflow-hidden bg-oxford-navy/5 scroll-mt-20">
            <TronBackground opacity={0.05} />
            <div className="max-w-7xl mx-auto space-y-16 relative z-10">
              <div className="text-center space-y-4">
                <h2 className="text-5xl md:text-7xl font-display font-normal tracking-widest uppercase text-white">The Roster</h2>
                <div className="w-12 h-1 bg-steel-blue mx-auto" />
                <p className="text-mint-cream/70 max-w-xl mx-auto font-normal">
                  A selection of the legendary titles being immortalised in our documentary.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {ROSTER_GAMES.map((game, i) => (
                  <RosterCard 
                    key={i} 
                    game={game} 
                    className={i === ROSTER_GAMES.length - 1 && ROSTER_GAMES.length % 2 !== 0 ? 'md:col-span-2' : 'col-span-1'}
                  />
                ))}
              </div>

              <div className="pt-6 text-center flex flex-col items-center gap-4">
                <span className="text-4xl md:text-6xl text-white font-display leading-none select-none">
                  +
                </span>
                <h3 className="text-xl md:text-3xl font-display font-normal tracking-[0.2em] text-white uppercase">
                  Plus many more Australian classics
                </h3>
              </div>
            </div>
          </section>
        )}

        {/* The Narrative Section */}
        {sectionsConfig.narrative && (
          <section id="narrative" className="py-16 md:py-24 px-6 relative overflow-hidden bg-ink-black scroll-mt-20">
            {/* Background elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-steel-blue to-transparent" />
            </div>

            <div className="max-w-7xl mx-auto space-y-20 relative z-10">
              <div className="text-center space-y-4">
                <h2 className="text-5xl md:text-7xl font-display font-normal tracking-widest uppercase text-white">The Narrative</h2>
                <div className="w-12 h-1 bg-steel-blue mx-auto" />
              </div>

              {/* Timeline Graphic Container */}
              <div className="relative pt-12 md:pt-24 pb-12 overflow-hidden">
                {/* Horizontal Progress Track (Desktop) */}
                <div className="absolute top-[88px] left-0 w-full h-1 bg-white/5 hidden md:block rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="h-full bg-gradient-to-r from-steel-blue via-emerald-500 to-red-500 opacity-60"
                  />
                </div>
                
                {/* Vertical Progress Track (Mobile Rainbow Scroll) */}
                <div className="absolute top-0 left-8 w-1 h-full bg-white/5 md:hidden rounded-full" />
                <RainbowScrollLine />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative">
                  {NARRATIVE_ACTS.map((act, i) => (
                    <NarrativeAct key={act.id} act={act} index={i} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* The Team Section */}
        {sectionsConfig.team && (
          <section id="team" className="py-16 md:py-24 px-6 bg-oxford-navy/5 scroll-mt-20">
            <div className="max-w-7xl mx-auto space-y-16">
              <div className="text-center space-y-4">
                <h2 className="text-5xl md:text-7xl font-display font-normal tracking-widest uppercase">The Team</h2>
                <p className="text-mint-cream/70 max-w-xl mx-auto font-normal">
                  The visionaries behind the lens, dedicated to preserving Australia's digital heritage.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <TeamMember 
                  name="David Tucker"
                  role="Director / Executive Producer"
                  bio="Dave is a true titan of the entertainment industry, bringing nearly three decades of unparalleled expertise to the table. During his tenure at the ABC, he was a driving force behind the success of the iconic television series' Good Game and Spawn Point, showcasing his dynamic talents as a writer, producer, and editor. Having honed his craft on a multitude of compelling documentaries, Dave possesses the perfect, proven skills to transform any subject matter, especially history, into an unforgettable, engaging, and genuinely fun learning experience."
                  firstGame="Space Invaders"
                  favGame="Rocket League"
                  linkedin="https://www.linkedin.com/in/david-tucker-a4670356"
                  imdb="https://m.imdb.com/name/nm5198731/?ref_=fn_t_8"
                  credits={[
                    "Good Game & Good Game Spawn Point (Writer / Producer / Editor)",
                    "Catalyst (Producer / Editor)",
                    "At The Movies (Producer / Editor)"
                  ]}
                />
                <TeamMember 
                  name="Michael Refalo"
                  role="Creative Lead / Executive Producer"
                  bio="Michael is a versatile visionary whose career defines innovation in visual communications and audience engagement. Sharpening his expertise as a creative leader at Toys 'R' Us Australia, he mastered the mechanics of visual storytelling—specifically framing, emotional pacing, and guiding a unified creative vision. Translating his proven ability to construct compelling, immersive narratives across dynamic visual mediums, Michael now directs creative projects designed to ignite the imaginations of the next generation."
                  firstGame="Final Fantasy: Mystic Quest"
                  favGame="Half Life: Alyx"
                  linkedin="https://www.linkedin.com/in/michael-refalo"
                  imdb="https://www.imdb.com/name/nm15881952/?ref_=ra_sb_ln"
                  credits={[
                    "iiNet's 'Business Help Hub' (Campaign and Creative Director)",
                    "Toys 'R' Us Australia (Art Direction and Manager)",
                    "The Wiggles - Various Projects (Creative Lead)"
                  ]}
                />
              </div>
            </div>
          </section>
        )}



        {/* Follow The Project Section */}
        {sectionsConfig.follow && (
          <section id="follow" className="py-16 md:py-24 px-6 relative bg-steel-blue/5 overflow-hidden scroll-mt-20">
            <TronBackground opacity={0.1} />
            <div className="max-w-7xl mx-auto relative z-10">
              <div className="text-center mb-8 space-y-4">
                <h2 className="text-5xl md:text-7xl font-display font-normal tracking-widest uppercase">Follow The Project</h2>
                <div className="w-12 h-1 bg-steel-blue mx-auto" />
              </div>
              
              <div className="relative max-w-4xl mx-auto py-6">
                <BrevoForm />
              </div>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        {sectionsConfig.faq && (
          <section id="faq" className="py-16 md:py-24 px-6 relative overflow-hidden scroll-mt-20">
            <TronBackground opacity={0.1} />
            <div className="max-w-7xl mx-auto relative z-10">
              <div className="text-center mb-16 space-y-4">
                <h2 className="text-5xl md:text-7xl font-display font-normal tracking-widest uppercase">Frequently Asked</h2>
                <p className="text-mint-cream/70 font-normal" style={{ fontSize: "18px" }}>Everything you need to know about the project.</p>
              </div>
              <FAQ />
            </div>
          </section>
        )}


      </main>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-steel-blue/10 bg-ink-black/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-10">
          <div className="flex flex-col items-center gap-4">
            <CoinLogo animated={false} className="w-12 h-12" />
            <span className="font-display text-2xl tracking-[0.2em] uppercase text-white">
              Region Locked
            </span>
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-steel-blue/60">
              Unlocking the History of Australian Video Games
            </p>
          </div>

          <div className="flex gap-8">
            <a 
              href="https://www.facebook.com/regionlocked.doco/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                ReactGA.event({
                  category: "Social",
                  action: "Click Facebook"
                });
              }}
              className="text-white hover:text-steel-blue transition-colors p-2 rounded-full border border-white/10 hover:border-steel-blue/50 cursor-pointer"
              title="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a 
              href="https://www.instagram.com/regionlocked.doco/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                ReactGA.event({
                  category: "Social",
                  action: "Click Instagram"
                });
              }}
              className="text-white hover:text-steel-blue transition-colors p-2 rounded-full border border-white/10 hover:border-steel-blue/50 cursor-pointer"
              title="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="https://www.youtube.com/@RegionLocked-doco"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                ReactGA.event({
                  category: "Social",
                  action: "Click YouTube"
                });
              }}
              className="text-white hover:text-steel-blue transition-colors p-2 rounded-full border border-white/10 hover:border-steel-blue/50 cursor-pointer"
              title="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
            <a 
              href="https://bsky.app/profile/regionlocked-doco.bsky.social"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                ReactGA.event({
                  category: "Social",
                  action: "Click BlueSky"
                });
              }}
              className="text-white hover:text-steel-blue transition-colors p-2 rounded-full border border-white/10 hover:border-steel-blue/50 cursor-pointer"
              title="BlueSky"
            >
              <BlueskyIcon className="w-5 h-5" />
            </a>
          </div>

          <div className="space-y-6 max-w-4xl">
            <p className="text-[11px] font-sans font-normal uppercase tracking-[0.2em] text-white/90">
              © 2026 David Tucker and Michael Refalo. All rights reserved.
            </p>
            <p className="text-[10px] font-sans font-light leading-relaxed text-white/60">
              Third-party imagery and intellectual property used on this site are for illustrative purposes only and remain the property of their respective owners. No official endorsement or affiliation is implied.
            </p>
            <div className="pt-4 flex justify-center">
              <Link 
                to="/vault" 
                className="text-[9px] font-mono uppercase tracking-[0.4em] text-white/5 hover:text-steel-blue/40 transition-all duration-700 cursor-pointer"
              >
                vault
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <VideoLightbox 
        isOpen={isVideoOpen} 
        onClose={() => setIsVideoOpen(false)} 
        videoUrl="https://drive.google.com/file/d/1YY8LJ4elGmu220-l-upVu1oOdpEDU0Yv/preview"
      />

      <style dangerouslySetInnerHTML={{ __html: `
        .glitch-overlay {
          background-image: 
            linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%),
            linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03));
          background-size: 100% 2px, 3px 100%;
        }
        @keyframes shine {
          to { transform: translateX(100%); }
        }
        .animate-shine {
          animation: shine 3s infinite;
        }

        /* Slimy Pug Inspired Card */
        .slimy-card {
          position: relative;
          background-color: rgba(61, 122, 184, 0.05);
          padding: 2px;
          transition: all 0.3s ease;
          overflow: hidden;
        }
        .slimy-card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: conic-gradient(transparent, #3d7ab8, transparent, transparent, #3d7ab8, transparent);
          animation: slimy-rotate 4s linear infinite;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .slimy-card:hover::before {
          opacity: 1;
        }
        .slimy-inner {
          position: relative;
          z-index: 10;
        }
        @keyframes slimy-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      ` }} />
    </div>
  );
}

function TeamMember({ name, role, bio, firstGame, favGame, linkedin, imdb, credits }: { 
  name: string; 
  role: string; 
  bio: string; 
  firstGame: string; 
  favGame: string;
  linkedin: string;
  imdb: string;
  credits: string[];
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative p-8 rounded-3xl border border-steel-blue/10 bg-oxford-navy/10 hover:border-steel-blue/30 transition-all duration-500"
    >
      <div className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-4xl font-display font-normal tracking-widest uppercase text-white group-hover:text-steel-blue transition-colors">
            {name}
          </h3>
          <div className="space-y-1">
            <p className="text-steel-blue font-mono text-sm uppercase tracking-[0.3em]">
              {role}
            </p>
            <div className="space-y-1 font-mono text-xs uppercase tracking-widest">
              <p className="text-mint-cream/40">
                <span className="font-bold text-steel-blue/60">First Game:</span> <span className="text-mint-cream/70">{firstGame}</span>
              </p>
              <p className="text-mint-cream/40">
                <span className="font-bold text-steel-blue/60">Favourite Game:</span> <span className="text-mint-cream/70">{favGame}</span>
              </p>
            </div>
          </div>
        </div>
        
        <p className="text-mint-cream/70 leading-relaxed font-light text-base">
          {bio}
        </p>

        <div className="space-y-3">
          <p className="text-xs font-mono text-steel-blue/40 uppercase tracking-[0.2em]">Key Credits</p>
          <ul className="space-y-1 text-sm font-mono text-mint-cream/60 uppercase tracking-wider">
            {credits.map((credit, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="w-1 h-1 bg-steel-blue/30 rounded-full" />
                {credit}
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-4 flex items-center gap-6">
          <a 
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-steel-blue hover:text-mint-cream transition-colors"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </a>
          <a 
            href={imdb}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-steel-blue hover:text-mint-cream transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            IMDb
          </a>
        </div>
      </div>
      
      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none overflow-hidden rounded-tr-3xl">
        <div className="absolute top-[-1px] right-[-1px] w-8 h-8 border-t border-r border-steel-blue/20" />
      </div>
    </motion.div>
  );
}

function RosterCard({ game, className }: { 
  game: {
    title: string;
    developer: string;
    year: string;
    talents: string[];
    image: string;
  }, 
  className?: string;
  key?: any;
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`slimy-card group rounded-2xl ${className}`}
    >
      <div className="slimy-inner bg-[#030711] rounded-[14px] overflow-hidden flex flex-col md:flex-row relative h-full">
        {/* Year Watermark */}
        <div className="absolute right-0 bottom-0 text-[100px] md:text-[180px] font-display font-black text-steel-blue/5 leading-none select-none pointer-events-none group-hover:text-steel-blue/15 transition-all duration-700 uppercase z-0 translate-x-8 translate-y-8">
          {game.year}
        </div>

        {/* Image Area */}
        <div className="w-full md:w-[35%] bg-black/40 flex items-center justify-center p-6 md:p-8 relative z-10 border-b md:border-b-0 md:border-r border-white/5">
          <img 
            src={game.image} 
            alt={game.title} 
            className="w-full h-48 md:h-64 object-contain drop-shadow-[0_0_20px_rgba(61,122,184,0.3)] transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Info Area */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between relative z-10 min-h-[220px]">
          <div className="space-y-2">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-medium tracking-widest text-white uppercase leading-tight line-clamp-2">
              {game.title}
            </h3>
            <p className="text-lg md:text-xl font-mono text-steel-blue uppercase tracking-widest">
              {game.developer}
            </p>
          </div>

          <div className="pt-6 md:pt-4">
            <p className="text-[10px] font-mono text-steel-blue/40 uppercase tracking-[0.2em] font-bold mb-2">Key Talent</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {game.talents.map((talent, idx) => (
                <span key={idx} className="text-xs md:text-sm font-mono text-mint-cream/70 uppercase tracking-tight">
                  {talent}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function RainbowScrollLine() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="absolute top-0 left-8 w-1 h-full md:hidden z-20 pointer-events-none">
      <motion.div 
        style={{ height }}
        className="w-full bg-gradient-to-b from-steel-blue via-emerald-500 to-red-500 rounded-full"
      />
    </div>
  );
}

function NarrativeAct({ act, index }: { 
  act: {
    id: string;
    act: string;
    title: string;
    year: string;
    theme: string;
    moments: string[];
    color: string;
  }, 
  index: number;
  key?: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.3 }}
      viewport={{ once: true }}
      onClick={() => setIsExpanded(!isExpanded)}
      className="relative pl-20 md:pl-0 md:text-center group"
    >
      {/* Node & Number */}
      <div className="absolute top-0 left-0 md:left-1/2 md:-translate-x-1/2 md:-top-16 z-30">
        <div className="relative">
          {/* Outer circle */}
          <div className={`w-16 h-16 rounded-full border-2 border-white/10 bg-ink-black flex items-center justify-center group-hover:border-${act.color} transition-all duration-500 shadow-[0_0_30px_rgba(3,7,17,1)]`}>
            {/* Inner act number */}
            <span className="text-2xl font-display text-white group-hover:text-steel-blue transition-colors">
              0{index + 1}
            </span>
          </div>
          
          {/* Active Glow */}
          <div className={`absolute -inset-2 bg-${act.color}/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
        </div>
      </div>

        {/* Content Card */}
        <div className={`space-y-6 pt-2 md:pt-8 flex flex-col transition-all duration-500 ${isExpanded ? 'min-h-[420px]' : 'min-h-[200px] md:min-h-[420px]'}`}>
          <div className="space-y-2">
            <span className="block text-steel-blue font-mono text-xs uppercase tracking-[0.3em] font-bold">
              {ACT_LABELS[index]}:
            </span>
            <h3 className="text-2xl md:text-3xl font-display uppercase tracking-widest text-white leading-tight px-0 md:px-4">
              {act.title}
            </h3>
          </div>

          {/* Theme text - always visible */}
          <div className="space-y-4">
            <p className="text-sm text-mint-cream/50 leading-relaxed italic max-w-sm mx-auto md:px-6">
              "{act.theme}"
            </p>

            {/* Interaction hint - Styled as a button */}
            <motion.div
              initial={false}
              animate={{ 
                opacity: isExpanded ? 0 : 1,
                y: isExpanded ? -10 : 0,
                height: isExpanded ? 0 : 'auto',
                scale: isExpanded ? 0.9 : 1
              }}
              transition={{ duration: 0.3 }}
              className="flex justify-center"
            >
              <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono text-white/60 uppercase tracking-[0.2em] group-hover:bg-steel-blue/20 group-hover:border-steel-blue/40 group-hover:text-white transition-all duration-300">
                <span className="text-steel-blue font-bold">+</span> Expand
              </div>
            </motion.div>
          </div>

          {/* Moments - Interactive reveal with stable layout */}
          <div className="relative flex-1">
            <motion.div 
              initial={false}
              animate={{ 
                opacity: isExpanded ? 1 : 0,
                y: isExpanded ? 0 : 10,
                height: isExpanded ? 'auto' : 0
              }}
              style={{
                visibility: isExpanded ? 'visible' : 'hidden',
                pointerEvents: isExpanded ? 'auto' : 'none'
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="pt-6 space-y-4 border-t border-white/5 mt-4 md:px-6"
            >
              <ul className="space-y-4">
                {act.moments.map((moment, i) => (
                  <li key={i} className="flex gap-4 items-start text-xs font-mono text-mint-cream/80 uppercase tracking-[0.1em] text-left">
                    <div className="flex-shrink-0 mt-1">
                      <span className="block w-1.5 h-1.5 bg-steel-blue rounded-full animate-pulse" />
                    </div>
                    <span className="flex-1 leading-relaxed">
                      {moment}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

      {/* Connection Line Mobile */}
      <div className="absolute top-8 left-8 w-px h-full bg-white/5 -z-10 md:hidden" />
    </motion.div>
  );
}

function TopicItem({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex gap-6 group">
      <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-oxford-navy/20 flex items-center justify-center border border-steel-blue/10 group-hover:border-steel-blue/50 transition-colors">
        <div className="text-steel-blue">{icon}</div>
      </div>
      <div className="space-y-2">
        <h3 className="text-2xl font-display font-normal tracking-widest uppercase">{title}</h3>
        <p className="text-mint-cream/60 leading-relaxed font-light text-base">{description}</p>
      </div>
    </div>
  );
}

