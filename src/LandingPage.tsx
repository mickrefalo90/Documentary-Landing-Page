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
import HeaderForm from "./components/HeaderForm";
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
  { key: 'narrative', label: 'Narrative', id: '#narrative' },
  { key: 'roster', label: 'Roster', id: '#roster' },
  { key: 'about', label: 'About', id: '#about' },
  { key: 'team', label: 'Team', id: '#team' },
  { key: 'follow', label: 'Follow', id: '#follow' },
  { key: 'faq', label: 'FAQ', id: '#faq' },
];

const ROSTER_GAMES = [
  {
    title: "The Hobbit",
    developer: "Beam Software",
    publisher: "Melbourne House",
    year: "1983",
    genre: "Adventure",
    overview: "Relive Tolkien's The Hobbit as Bilbo Baggins. A piece of Interactive fiction (with graphics to illustrate locations), you follow the plot of Tolkien's book (before the Lord of the Rings trilogy), starting with an encounter with Gandalf and Thorin. The other characters can make their own moves independently of the player and their actions can sometimes result in a situation where it is not possible to complete the game. Also, gameplay happens in realtime, uncommon for interactive fiction.",
    talents: ["Veronika Megler - Programmer", "Russel Comte - Art", "Neil Brennan - Music"],
    image: "https://images.launchbox-app.com//c71997e7-bf6e-41ba-8efa-4319e9837a41.jpg"
  },
  {
    title: "The Way of the Exploding Fist",
    developer: "Beam Software",
    publisher: "Melbourne House",
    year: "1985",
    genre: "Fighting",
    overview: "A combat simulation where players participate in karate matches. Winning matches requires scoring two points (one solid hit) against an opponent. The game set a high standard for martial arts games at the time with its fluid animation and deep mechanics.",
    talents: ["Greg Barnett - Designer and Programmer", "Neil Brennan - Music"],
    image: "https://images.launchbox-app.com//b072ac15-f83f-4d53-b1b0-7d4832363bf3.jpg"
  },
  {
    title: "The Dame was Loaded",
    developer: "Beam Software",
    publisher: "Ziggurat Interactive",
    year: "1996",
    genre: "Adventure / Puzzle",
    overview: "The Dame Was Loaded is a detective mystery adventure game reminiscent of private eye movies of the 1940's. The player controls detective Scott Anger, a Sam Spade type of character, who is hired by a mysterious woman to find her missing brother, Dan. What at first appears to be just another missing persons case, Anger's investigation soon reveals that Dan was somehow involved in some much larger crimes including several murders and a bank robbery.",
    talents: ["Marshall Parker - Sound", "David Giles - Producer", "Craig Duturbure - Co-writer"],
    image: "https://images.launchbox-app.com//7154084e-64a4-477a-93ea-4c65a9016e44.jpg"
  },
  {
    title: "Ty the Tasmanian Tiger",
    developer: "Krome Studios",
    publisher: "Krome Studios",
    year: "2002",
    genre: "Platformer",
    overview: "Explore the wilds of Australia with TY the Tasmanian Tiger, the charming Aussie platformer. Join TY on an exciting new adventure in the great Aussie Outback. Use your wits and boomerangs to find hidden treasures, help the colorful locals, and uncover the mysteries of the land Down Under.",
    talents: ["John Passfield - Development Director", "Steven Stamatiadis - Creative Director"],
    image: "https://images.launchbox-app.com//cde3aa98-c416-4988-9565-4989061e7a6e.png"
  },
  {
    title: "Destroy All Humans",
    developer: "Pandemic Studios",
    publisher: "THQ",
    year: "2005",
    genre: "Action",
    overview: "Destroy All Humans! is an action-adventure game developed by Pandemic Studios and published by THQ. Set in 1959 in the U.S., it parodies the lifestyles, pop culture, and politics of this time period. The player controls Cryptosporidium 137, a member of the fictional Furon race of alien life, who has come to Earth to harvest DNA from humans to continue the cloning process of his species.",
    talents: ["Matt Harding - Creator", "Brad Welch - Director", "Tom Abernathy - Writer"],
    image: "https://images.launchbox-app.com//c1ddc0fd-2f29-434d-9814-235b324045e3.jpg"
  },
  {
    title: "Crossy Road",
    developer: "Hipster Whale",
    publisher: "Hipster Whale",
    year: "2014",
    genre: "Action",
    overview: "Crossy Road is a mobile game developed by Hipster Whale. The concept stems from the joke 'Why did the chicken cross the road?', although it is also described as 'endless Frogger'. Guide a mascot around obstacles such as rivers, trees, boulders and moving vehicles as many steps as possible.",
    talents: ["Clara Reeves - President of Hipster Whale"],
    image: "https://images.launchbox-app.com//860abd97-134f-486b-9f13-c8d534880f3e.png"
  }
];

const STUDIO_LOGOS = [
  { name: "BEAM SOFTWARE", logo: "/logos/Beam.png" },
  { name: "HIPSTER WHALE", logo: "/logos/Hipster_Whale.webp" },
  { name: "KROME STUDIOS", logo: "/logos/Krome.png" },
  { name: "MELBOURNE HOUSE", logo: "/logos/Melbourne_House.png" },
  { name: "PANDEMIC", logo: "/logos/Pandemic.svg" },
  { name: "BONDI", logo: "/logos/Bondi.png" },
  { name: "TANTALUS", logo: "/logos/Tantalus.png" },
  { name: "BND", logo: "/logos/bnd.png" },
  { name: "MF", logo: "/logos/MFlogo.png" }
];

const MARQUEE_ITEMS = (() => {
  const items: any[] = [];
  STUDIO_LOGOS.forEach((studio, index) => {
    items.push(studio);
    if ((index + 1) % 3 === 0) {
      items.push({ type: 'reveal' });
    }
  });
  return items;
})();

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
  const [selectedGame, setSelectedGame] = useState<typeof ROSTER_GAMES[0] | null>(null);
  const targetRef = useRef(null);

  const [showVaultPopup, setShowVaultPopup] = useState(false);
  const [vaultName, setVaultName] = useState("");
  const [vaultEmail, setVaultEmail] = useState("");

  const handleKeepUpToDate = () => {
    setShowVaultPopup(false);
    setTimeout(() => {
      const followSection = document.getElementById("follow");
      if (followSection) {
        followSection.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 150);
  };

  useEffect(() => {
    const isFromVault = localStorage.getItem("from_vault");
    if (isFromVault === "true") {
      const firstName = localStorage.getItem("vault_firstName") || "";
      const lastName = localStorage.getItem("vault_lastName") || "";
      const email = localStorage.getItem("vault_email") || "";
      
      setVaultName(`${firstName} ${lastName}`.trim() || "Operative");
      setVaultEmail(email);
      setShowVaultPopup(true);
      
      localStorage.removeItem("from_vault");
    }
  }, []);

  useEffect(() => {
    if (isMenuOpen || selectedGame || isVideoOpen || showVaultPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen, selectedGame, isVideoOpen, showVaultPopup]);

  useEffect(() => {
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
          <section className="relative min-h-screen flex flex-col items-center justify-center py-16 md:py-24 px-4 md:px-8 overflow-hidden text-center">
            <TronBackground opacity={0.3} />
            <div className="absolute inset-0 z-0 opacity-20">
              <StarField />
            </div>
            <motion.div
              style={{ opacity, scale }}
              className="relative z-10 w-full max-w-5xl mx-auto space-y-8 md:space-y-12 flex flex-col items-center"
            >
              <div className="flex justify-center mb-4 md:mb-6">
                <CoinLogo className="w-24 h-24 md:w-32 md:h-32" />
              </div>
              <div className="flex flex-col items-center">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-white font-mono text-xs sm:text-sm tracking-[0.22em] uppercase font-bold pl-[0.22em] mb-6 flex flex-col sm:flex-row items-center justify-center gap-y-1.5 sm:gap-x-2.5 text-center"
                >
                  <span>launching on</span>
                  <span className="flex items-center justify-center gap-x-2.5">
                    <img
                      src="https://i.kickstarter.com/d3rwhjkg-kickstarter-logo-white.png"
                      alt="Kickstarter"
                      referrerPolicy="no-referrer"
                      className="h-[0.95em] w-auto inline-block select-none pointer-events-none align-middle"
                    />
                    <span>July 2026</span>
                  </span>
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-[25vw] xs:text-[28vw] sm:text-7xl md:text-8xl lg:text-[10rem] font-display font-normal tracking-[0.1em] text-white leading-[0.8] sm:leading-[0.85] uppercase flex flex-col sm:flex-row items-center justify-center gap-y-0 sm:gap-y-0 gap-x-[0.15em] select-none"
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
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-3 text-[3vw] sm:text-xs md:text-sm lg:text-base xl:text-lg text-mint-cream/80 font-bold uppercase tracking-[0.22em] xs:tracking-[0.26em] sm:tracking-[0.34em] md:tracking-[0.44em] lg:tracking-[0.52em] xl:tracking-[0.62em] max-w-5xl mx-auto leading-[1.1] whitespace-nowrap pl-[0.22em] xs:pl-[0.26em] sm:pl-[0.34em] md:pl-[0.44em] lg:pl-[0.52em] xl:pl-[0.62em]"
                >
                  Unlocking Australian Video Games
                </motion.p>
              </div>

              <HeaderForm />

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
                className="flex flex-col items-center justify-center gap-2 pt-6 group cursor-pointer mx-auto"
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
          <section id="goal" className="py-16 md:py-24 px-6 bg-gradient-to-b from-transparent to-oxford-navy/20 scroll-mt-20 overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-steel-blue/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <div className="max-w-7xl mx-auto text-center space-y-12 relative z-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-steel-blue/10 border border-steel-blue/20 text-steel-blue font-mono text-[10px] uppercase tracking-[0.3em] mb-8"
              >
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                Time is Running Out
              </motion.div>

              <div className="space-y-6">
                <h2 className="text-5xl md:text-7xl font-display font-normal tracking-widest uppercase">Our Mission</h2>
                <div className="w-12 h-1 bg-steel-blue mx-auto" />
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

                {/* Embedded Cinematic Trailer */}
                <div className="max-w-4xl md:max-w-2xl mx-auto pt-8 relative group">
                  {/* Outer atmospheric neon blue/red glow behind the video card */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-steel-blue/40 to-red-500/20 rounded-2xl blur-xl opacity-40 group-hover:opacity-65 transition duration-1000" />
                  
                  {/* Glassmorphic border & container */}
                  <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-oxford-navy/45 shadow-2xl shadow-black/80 aspect-video">
                    {/* Retro line scanned overlay */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,4px_100%] z-10" />
                    <iframe
                      className="w-full h-full border-0 absolute inset-0"
                      src="https://www.youtube.com/embed/hrsfSl_Dil4?rel=0&autoplay=0"
                      title="Region Locked: Australian Video Games Documentary Trailer"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* The Narrative Section */}
        {sectionsConfig.narrative && (
          <section id="narrative" className="pt-16 md:pt-24 pb-8 md:pb-12 px-6 relative overflow-hidden bg-ink-black scroll-mt-20">
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

        {/* The Roster Section */}
        {sectionsConfig.roster && (
          <section id="roster" className="pt-8 md:pt-12 pb-16 md:pb-24 px-6 relative overflow-hidden bg-oxford-navy/5 scroll-mt-20">
            <TronBackground opacity={0.05} />
            <div className="max-w-7xl mx-auto space-y-16 relative z-10">
              <div className="text-center space-y-4">
                <h2 className="text-5xl md:text-7xl font-display font-normal tracking-widest uppercase text-white">The Roster</h2>
                <div className="w-12 h-1 bg-steel-blue mx-auto" />
                
                <p className="text-mint-cream/70 max-w-2xl mx-auto font-light text-sm md:text-base leading-relaxed pt-4">
                  Region Locked will focus on a wide variety of creators across the many disciplines of video game development. From veterans to professionals still working in the industry - we will tell their stories and highlight the classic titles that call Australia home.
                </p>

                {/* Logo Marquee */}
                <div className="pt-12 overflow-hidden relative">
                  <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink-black to-transparent z-10" />
                  <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink-black to-transparent z-10" />
                  <motion.div 
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ 
                      duration: 40, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                    className="flex gap-20 whitespace-nowrap items-center py-4 min-w-max"
                  >
                    {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
                      <div key={i} className="flex-shrink-0 flex items-center justify-center">
                        {item.type === 'reveal' ? (
                          <div className="text-center font-mono font-black text-steel-blue text-3xl leading-[0.8] tracking-tighter uppercase border-r border-steel-blue/10 pr-20 last:border-0 h-20 flex items-center justify-center">
                            <span>MORE TO BE<br />REVEALED</span>
                          </div>
                        ) : (
                          <div className="h-20 flex items-center border-r border-steel-blue/10 pr-20 last:border-0">
                            <img 
                              src={(item as any).logo} 
                              alt={(item as any).name} 
                              className="h-full w-auto object-contain" 
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
                {ROSTER_GAMES.map((game, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    viewport={{ once: true }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 17,
                      delay: i * 0.05 
                    }}
                    onClick={() => setSelectedGame(game)}
                    className="group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer border border-white/5 hover:border-steel-blue/50 transition-all shadow-xl hover:shadow-[0_0_40px_rgba(61,122,184,0.3)]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-black via-transparent to-transparent opacity-60 z-10 transition-opacity group-hover:opacity-40" />
                    <img 
                      src={game.image} 
                      alt={game.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    {/* Inner selective glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_center,rgba(61,122,184,0.1)_0%,transparent_70%)] z-15" />
                    
                    <div className="absolute inset-0 bg-steel-blue/10 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                      <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        whileHover={{ scale: 1.1 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="px-4 py-2 bg-ink-black/90 border border-steel-blue/40 text-[10px] font-mono text-steel-blue uppercase tracking-widest rounded-full shadow-[0_0_20px_rgba(61,122,184,0.3)]"
                      >
                        Unlock Data
                      </motion.span>
                    </div>
                  </motion.div>
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

        {/* Topics Section */}
        {sectionsConfig.about && (
          <section id="about" className="py-16 md:py-24 px-6 scroll-mt-20">
            <div className="max-w-7xl mx-auto">
              <div className="max-w-4xl mx-auto">
                <div className="space-y-12">
                  <h2 className="text-5xl md:text-7xl font-display font-normal tracking-widest leading-tight uppercase text-center">
                    The Legends of <span className="text-steel-blue">Aussie Games</span> <br />
                    <span className="text-2xl md:text-4xl opacity-80">UNLOCKING AUSTRALIAN VIDEO GAMES</span>
                  </h2>
                  <div className="w-12 h-1 bg-steel-blue mx-auto" />
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

        {/* The Team Section */}
        {sectionsConfig.team && (
          <section id="team" className="py-16 md:py-24 px-6 bg-oxford-navy/5 scroll-mt-20">
            <div className="max-w-7xl mx-auto space-y-16">
              <div className="text-center space-y-4">
                <h2 className="text-5xl md:text-7xl font-display font-normal tracking-widest uppercase">The Team</h2>
                <div className="w-12 h-1 bg-steel-blue mx-auto" />
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
                  role="Creative Director / Executive Producer"
                  bio="Michael is a versatile visionary whose career defines innovation in visual communications and audience engagement. Sharpening his expertise as a creative leader at Toys 'R' Us Australia, he mastered the mechanics of visual storytelling—specifically framing, emotional pacing, and guiding a unified creative vision. Translating his proven ability to construct compelling, immersive narratives across dynamic visual mediums, Michael now directs creative projects designed to ignite the imaginations of the next generation."
                  firstGame="Final Fantasy: Mystic Quest"
                  favGame="Half Life: Alyx"
                  linkedin="https://www.linkedin.com/in/michael-refalo"
                  imdb="https://www.imdb.com/name/nm15881952/?ref_=ra_sb_ln"
                  credits={[
                    "iiNet's 'Business Help Hub' (Campaign and Creative Director)",
                    "Toys 'R' Us Australia (Art Direction and Manager)",
                    "Indicia Worldwide (Unilever Agency) - (Creative Lead)"
                  ]}
                />
              </div>

              {/* Our Industry Advisors Section */}
              <div className="pt-16 border-t border-steel-blue/10 space-y-12">
                <div className="text-center space-y-4">
                  <h3 className="text-3xl md:text-5xl font-display font-normal tracking-widest uppercase text-white">Our Industry Advisors</h3>
                  <div className="w-12 h-1 bg-steel-blue mx-auto" />
                  <p className="text-mint-cream/70 max-w-2xl mx-auto font-normal text-sm md:text-base leading-relaxed">
                    Our advisory team are coming along on the journey to sense-check and review the content as we progress. We have gathered a team of veterans, journalists and archivists to ensure the story we tell is honest and genuine.
                  </p>
                </div>

                {SHOW_ADVISOR_CARDS ? (
                  <div className="space-y-12">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                      {INDUSTRY_ADVISORS.map((advisor, index) => (
                        <AdvisorCard 
                          key={index}
                          name={advisor.name}
                          industry={advisor.industry}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="pt-6 text-center flex flex-col items-center gap-4">
                    <span className="text-4xl md:text-6xl text-white font-display leading-none select-none">
                      +
                    </span>
                    <h3 className="text-xl md:text-3xl font-display font-normal tracking-[0.2em] text-white uppercase">
                      To be revealed soon
                    </h3>
                  </div>
                )}
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
                <div className="w-12 h-1 bg-steel-blue mx-auto" />
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
              UNLOCKING AUSTRALIAN VIDEO GAMES
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

      <AnimatePresence>
        {selectedGame && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-md"
            onClick={() => setSelectedGame(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-ink-black border border-white/10 rounded-3xl overflow-hidden max-w-5xl w-full max-h-[95vh] md:max-h-[90vh] flex flex-col md:flex-row shadow-[0_0_100px_rgba(61,122,184,0.2)] relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Scanline overlay for modal */}
              <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,4px_100%] z-50" />
              
              {/* Close Button Modal */}
              <button 
                onClick={() => setSelectedGame(null)}
                className="absolute top-6 right-6 text-white/40 hover:text-steel-blue transition-colors z-50 p-2 border border-white/10 rounded-full bg-ink-black/80 cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Image Rail */}
              <div className="w-full md:w-2/5 h-48 md:h-auto bg-black/40 p-6 md:p-12 flex items-center justify-center border-b md:border-b-0 md:border-r border-white/10 shrink-0">
                <img 
                  src={selectedGame.image} 
                  alt={selectedGame.title} 
                  className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(61,122,184,0.3)]"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Data Display */}
              <div className="flex-1 p-6 md:p-12 overflow-y-auto space-y-6 md:space-y-8 no-scrollbar">
                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-steel-blue/10 border border-steel-blue/30 text-[10px] font-mono text-steel-blue uppercase tracking-widest rounded-full">
                      Archive Entry #{ROSTER_GAMES.indexOf(selectedGame) + 1}
                    </span>
                    <span className="text-white/20 font-mono text-xs">|</span>
                    <span className="text-white/40 font-mono text-xs uppercase tracking-widest">{selectedGame.year}</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-display text-white uppercase tracking-wider leading-tight">
                    {selectedGame.title}
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-4 md:gap-8 border-y border-white/5 py-6 md:py-8">
                  <div className="space-y-1">
                    <p className="text-[10px] font-mono text-steel-blue/40 uppercase tracking-[0.2em] font-bold">Developer</p>
                    <p className="text-base text-mint-cream font-mono uppercase tracking-tight">{selectedGame.developer}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-mono text-steel-blue/40 uppercase tracking-[0.2em] font-bold">Publisher</p>
                    <p className="text-base text-mint-cream font-mono uppercase tracking-tight">{(selectedGame as any).publisher}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-mono text-steel-blue/40 uppercase tracking-[0.2em] font-bold">Genre</p>
                    <p className="text-base text-mint-cream font-mono uppercase tracking-tight">{(selectedGame as any).genre}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-mono text-steel-blue/40 uppercase tracking-[0.2em] font-bold">Location</p>
                    <p className="text-base text-mint-cream font-mono uppercase tracking-tight">Australia</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-[10px] font-mono text-steel-blue/40 uppercase tracking-[0.2em] font-bold">Overview</p>
                  <p className="text-mint-cream/70 text-sm md:text-base leading-relaxed font-light">
                    {(selectedGame as any).overview}
                  </p>
                </div>

                <div className="space-y-4">
                  <p className="text-[10px] font-mono text-steel-blue/40 uppercase tracking-[0.2em] font-bold">Key Talent</p>
                  <div className="flex flex-col gap-2">
                    {selectedGame.talents.map((talent, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-xs md:text-sm font-mono text-mint-cream/80 uppercase tracking-tight">
                        <div className="w-1.5 h-1.5 bg-steel-blue rounded-full opacity-40" />
                        {talent}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <VideoLightbox 
        isOpen={isVideoOpen} 
        onClose={() => setIsVideoOpen(false)} 
        videoUrl="https://www.youtube.com/embed/hrsfSl_Dil4?rel=0"
      />

      <AnimatePresence>
        {showVaultPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[400] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-md"
            onClick={() => setShowVaultPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-[#030711] border-[3px] border-transparent animate-rainbow-border rounded-2xl overflow-hidden max-w-xl w-full relative p-0.5"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Scanline overlay for modal */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.08] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,4px_100%] z-50" />
              
              {/* TRON style grid in the background */}
              <div className="absolute inset-0 pointer-events-none opacity-20 z-0 bg-[linear-gradient(rgba(61,122,184,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(61,122,184,0.18)_1px,transparent_1px)] bg-[size:32px_32px]" />

              <div className="p-6 md:p-8 bg-[#090e17]/95 relative z-10 flex flex-col space-y-6">
                <div className="flex justify-between items-center border-b border-steel-blue/30 pb-3">
                  <div className="flex items-center gap-2">
                    <Database className="w-5 h-5 text-steel-blue animate-pulse shrink-0" />
                    <span className="font-display text-[#3d7ab8] text-3xl uppercase tracking-widest leading-none">
                      Vault Access Authorized
                    </span>
                  </div>
                  <button 
                    onClick={() => setShowVaultPopup(false)}
                    className="text-steel-blue/60 hover:text-steel-blue transition-colors font-sans text-xl font-bold leading-none cursor-pointer p-1"
                  >
                    ✕
                  </button>
                </div>

                <div className="py-2 text-center">
                  <p className="font-display text-[#3d7ab8] text-2xl md:text-3.5xl leading-relaxed uppercase tracking-wider text-center">
                     Welcome to the mission. Please explore our website. Kickstarter launches July 2026.
                  </p>
                </div>

                <div className="pt-4 border-t border-steel-blue/20 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleKeepUpToDate}
                    className="flex-1 bg-steel-blue/15 hover:bg-steel-blue text-white hover:text-ink-black border border-steel-blue/65 font-display text-xl uppercase tracking-wider py-3.5 px-6 rounded-xl transition-all duration-300 active:scale-95 cursor-pointer text-center font-bold shadow-[0_0_15px_rgba(61,122,184,0.2)] hover:shadow-[0_0_25px_rgba(61,122,184,0.4)]"
                  >
                    Click here to keep up to date
                  </button>
                  <button
                    onClick={() => setShowVaultPopup(false)}
                    className="bg-[#141820] hover:bg-[#1e2430] text-steel-blue/80 hover:text-[#3d7ab8] border border-steel-blue/30 font-display text-lg uppercase tracking-wider py-3.5 px-6 rounded-xl transition-all duration-300 active:scale-95 cursor-pointer text-center font-medium"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes rainbow-border-pulse {
          0%, 100% {
            border-color: #3d7ab8;
            box-shadow: 0 0 25px rgba(61, 122, 184, 0.6);
          }
          14% {
            border-color: #ef4444;
            box-shadow: 0 0 25px rgba(239, 68, 68, 0.6);
          }
          28% {
            border-color: #f97316;
            box-shadow: 0 0 25px rgba(249, 115, 22, 0.6);
          }
          42% {
            border-color: #eab308;
            box-shadow: 0 0 25px rgba(234, 179, 8, 0.6);
          }
          56% {
            border-color: #22c55e;
            box-shadow: 0 0 25px rgba(34, 197, 94, 0.6);
          }
          70% {
            border-color: #06b6d4;
            box-shadow: 0 0 25px rgba(6, 182, 212, 0.6);
          }
          84% {
            border-color: #a855f7;
            box-shadow: 0 0 25px rgba(168, 85, 247, 0.6);
          }
        }
        .animate-rainbow-border {
          animation: rainbow-border-pulse 5s linear infinite;
        }

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


      </div>
      
      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none overflow-hidden rounded-tr-3xl">
        <div className="absolute top-[-1px] right-[-1px] w-8 h-8 border-t border-r border-steel-blue/20" />
      </div>
    </motion.div>
  );
}

const SHOW_ADVISOR_CARDS = true;

interface IndustryAdvisor {
  name: string;
  industry: string;
  bio: string;
  iconName: string;
  credits: string[];
}

const INDUSTRY_ADVISORS: IndustryAdvisor[] = [
  {
    name: "Luke Lancaster",
    industry: "Head of Melbourne International Games Week",
    bio: "Head of Melbourne International Games Week, delivering the premier games festival in the Asia-Pacific region.",
    iconName: "Crown",
    credits: []
  },
  {
    name: "Chloe Appleby",
    industry: "Games Curator",
    bio: "Exhibition developer, researcher, and games curator focusing on digital heritage, local play preservation, and creative exhibition design.",
    iconName: "Layers",
    credits: []
  },
  {
    name: "John De Margheriti",
    industry: "Founder, Micro Forte & AIE",
    bio: "A pioneering figure of Australian gaming, John founded Micro Forte in 1985—one of the nation's first major game development studios—and created the Academy of Interactive Entertainment (AIE) in 1996 to train future games and film talent.",
    iconName: "Crown",
    credits: ["Founder of Micro Forte", "Founder & CEO of AIE", "Former GDAA President"]
  },
  {
    name: "Dr. Helen Stuckey",
    industry: "Media Historian & Games Curator",
    bio: "Senior Lecturer in Media and Games at RMIT University. As the core games curator for ACMI from 2004 to 2009, she pioneered software preservation and curated historic exhibitions to safeguard Australia's digital play history.",
    iconName: "Layers",
    credits: ["RMIT Senior Lecturer", "Former ACMI Games Curator", "Play It Again Researcher"]
  },
  {
    name: "Simon Alty",
    industry: "Games Publishing Executive",
    bio: "A leader in regional distribution and global publishing. Simon founded Games People and subsequently established and led Bethesda Softworks' Australia & New Zealand operations as its Managing Director, driving massive regional franchise success.",
    iconName: "Briefcase",
    credits: ["Founder of Games People", "Ex-Managing Director Bethesda ANZ", "Global Publisher Specialist"]
  },
  {
    name: "John Passfield",
    industry: "Game Designer & Studio Co-founder",
    bio: "Co-founder of Krome Studios and legend of Australian retro game design. John is the creative mastermind behind landmark hits including Flight of the Amazon Queen, TY the Tasmanian Tiger, and the 90s classic Halloween Harry.",
    iconName: "Gamepad2",
    credits: ["Krome Studios Co-founder", "Halloween Harry Creator", "TY the Tasmanian Tiger Director"]
  },
  {
    name: "Chris Arneil",
    industry: "Digital Games Curator, NFSA",
    bio: "Digital Games Curator at the National Film and Sound Archive of Australia. Chris is at the forefront of national efforts to locate, preserve, and archive historic Australian games and their creative development source materials.",
    iconName: "History",
    credits: ["NFSA Games Curator", "Software Archivist Specialist", "Preservation Strategist"]
  },
  {
    name: "Andrew Bailey",
    industry: "Ex-Programmer & Co-founder",
    bio: "A core systems programmer who began his career at Beam Software, Australia's pioneer game developer, where he coded classic titles. Andrew later co-founded Tantalus Media, one of the nation's premier co-development and porting houses.",
    iconName: "Cpu",
    credits: ["Beam Software Programmer", "Tantalus Media Co-founder", "Way of the Exploding Fist Developer"]
  }
];

function AdvisorCard({ name, industry }: { name: string; industry: string; key?: any }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative p-6 rounded-2xl border border-steel-blue/10 bg-oxford-navy/20 hover:border-steel-blue/30 transition-all duration-300 flex flex-col justify-between space-y-4"
    >
      <div className="space-y-4">
        <div className="space-y-1">
          <h4 className="text-3xl md:text-4xl font-display font-medium text-white group-hover:text-steel-blue transition-colors leading-tight">
            {name}
          </h4>
          <p className="text-steel-blue font-mono text-[10px] uppercase tracking-wider leading-relaxed">
            {industry}
          </p>
        </div>
      </div>

      {/* Decorative Corner accent */}
      <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none overflow-hidden rounded-tr-2xl">
        <div className="absolute top-[-1px] right-[-1px] w-4 h-4 border-t border-r border-steel-blue/20" />
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
              className="flex justify-center md:hidden"
            >
              <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono text-white/60 uppercase tracking-[0.2em] group-hover:bg-steel-blue/20 group-hover:border-steel-blue/40 group-hover:text-white transition-all duration-300">
                <span className="text-steel-blue font-bold">+</span> Expand
              </div>
            </motion.div>
          </div>

          {/* Moments - Interactive reveal with stable layout on mobile, always visible on desktop */}
          <div className="relative flex-1">
            {/* Mobile View: Expandable */}
            <div className="md:hidden">
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
                className="pt-6 space-y-4 border-t border-white/5 mt-4"
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

            {/* Desktop View: Always Visible */}
            <div className="hidden md:block pt-6 space-y-4 border-t border-white/5 mt-4 px-6">
              <ul className="space-y-4">
                {act.moments.map((moment, i) => (
                  <li key={i} className="flex gap-4 items-start text-xs font-mono text-mint-cream/80 uppercase tracking-[0.1em] text-center md:text-left">
                    <div className="flex-shrink-0 mt-1">
                      <span className="block w-1.5 h-1.5 bg-steel-blue rounded-full animate-pulse" />
                    </div>
                    <span className="flex-1 leading-relaxed">
                      {moment}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
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

