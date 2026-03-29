import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import CoinLogo from "./components/CoinLogo";
import StarField from "./components/StarField";
import GoalTracker from "./components/GoalTracker";
import FAQ from "./components/FAQ";
import ContactForm from "./components/ContactForm";
import ImageFlow from "./components/ImageFlow";
import VideoLightbox from "./components/VideoLightbox";
import TronBackground from "./components/TronBackground";
import PledgeModal from "./components/PledgeModal";
import { Gamepad2, History, Cpu, Sparkles, ArrowRight, Twitter, Instagram, MessageSquare } from "lucide-react";

/**
 * 🛠️ DEVELOPER GUIDE: HOW TO ADD REWARDS LATER
 * -------------------------------------------
 * 1. Locate the 'PLEDGE_TIERS' array below.
 * 2. Add strings to the 'perks' array for each tier (e.g., perks: ["Digital Copy", "Poster"]).
 * 3. In 'PledgeModal.tsx', uncomment the perks mapping section to display them in the lightbox.
 * 4. In 'TierCard' (at the bottom of this file), you can re-add the perks preview if desired.
 */

const PLEDGE_TIERS = [
  {
    title: "Supporter",
    price: "20",
    perks: [], // Add rewards here later
  },
  {
    title: "Collector",
    price: "75",
    featured: true,
    perks: [], // Add rewards here later
  },
  {
    title: "Producer",
    price: "250",
    perks: [], // Add rewards here later
  },
];

export default function App() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<typeof PLEDGE_TIERS[0] | null>(null);
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  return (
    <div ref={targetRef} className="min-h-screen bg-ink-black text-mint-cream selection:bg-steel-blue selection:text-ink-black overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-md border-b border-steel-blue/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <CoinLogo animated={false} className="w-8 h-8" />
            <span className="font-mono text-xs font-bold tracking-[0.3em] uppercase hidden sm:block">
              Region Locked
            </span>
          </div>
          <div className="flex items-center gap-8 text-[10px] font-mono uppercase tracking-widest text-mint-cream/60">
            <a href="#about" className="hover:text-steel-blue transition-colors">About</a>
            <a href="#pledge" className="hover:text-steel-blue transition-colors">Pledge</a>
            <a href="#faq" className="hover:text-steel-blue transition-colors">FAQ</a>
            <a href="#contact" className="bg-steel-blue text-ink-black px-4 py-2 rounded-full font-bold hover:bg-mint-cream transition-all">
              Notify Me
            </a>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col items-center justify-center py-32 px-8 overflow-hidden text-center">
          <TronBackground opacity={0.3} />
          <div className="absolute inset-0 z-0 opacity-20">
            <StarField />
          </div>
          <motion.div
            style={{ opacity, scale }}
            className="relative z-10 w-full max-w-5xl mx-auto space-y-12"
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
                Launching July 1 on Kickstarter
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-7xl md:text-[10rem] font-display font-normal tracking-[0.1em] text-white leading-[0.85] uppercase flex items-center justify-center flex-wrap gap-x-[0.15em]"
              >
                <span>REGION</span>
                <span>L<span className="relative inline-flex items-center justify-center">O<svg viewBox="7 2 10 20" fill="currentColor" className="absolute h-[0.51em] w-auto text-[#050505] pointer-events-none top-[42%] left-[40%] -translate-x-1/2 -translate-y-1/2 scale-y-110"><path d="M12 2C9.24 2 7 4.24 7 7C7 8.83 8 10.42 9.5 11.25L7 22H17L14.5 11.25C16 10.42 17 8.83 17 7C17 4.24 14.76 2 12 2Z" /></svg></span>CKED</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl text-mint-cream/70 font-normal max-w-xl mx-auto leading-relaxed"
              >
                Unlocking the untold history of Australian video games.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
            >
              <a
                href="#contact"
                className="group flex items-center gap-2 bg-mint-cream text-ink-black px-8 py-4 rounded-full font-bold hover:bg-steel-blue transition-all"
              >
                Get Early Access
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <button
                onClick={() => setIsVideoOpen(true)}
                className="px-8 py-4 rounded-full border border-steel-blue/20 hover:bg-steel-blue/5 transition-all text-sm font-medium"
              >
                Watch Teaser
              </button>
            </motion.div>
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

        <ImageFlow />

        {/* Goal Tracker Section */}
        <section id="goal" className="py-24 px-6 bg-gradient-to-b from-transparent to-oxford-navy/20">
          <div className="max-w-7xl mx-auto text-center space-y-12">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-7xl font-display font-normal tracking-widest uppercase">The Mission</h2>
              <p className="text-mint-cream/70 max-w-xl mx-auto text-lg font-normal">
                We're aiming to raise $750k to bring this definitive history to life.
              </p>
            </div>
            <GoalTracker current={0} goal={750000} />
          </div>
        </section>

        {/* Topics Section */}
        <section id="about" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-6xl md:text-8xl font-display font-normal tracking-widest leading-tight uppercase">
                  A Legacy <br />
                  <span className="text-steel-blue">Waiting</span> to be Told.
                </h2>
                <div className="space-y-6">
                  <TopicItem
                    icon={<History className="w-6 h-6" />}
                    title="Lounge Room Revolution"
                    description="The introduction of commercial video games into Australian homes and how it changed everything."
                  />
                  <TopicItem
                    icon={<Gamepad2 className="w-6 h-6" />}
                    title="Golden Era (1970-2000)"
                    description="The explosive growth of Australian game development and the studios that paved the way."
                  />
                  <TopicItem
                    icon={<Cpu className="w-6 h-6" />}
                    title="Technical Innovation"
                    description="Significant advancements Australia contributed to global game development and mechanics."
                  />
                  <TopicItem
                    icon={<Sparkles className="w-6 h-6" />}
                    title="Unseen History"
                    description="Never before seen or heard history of Aussie games and video game dev/art."
                  />
                </div>
              </div>
              <div className="relative aspect-square rounded-3xl overflow-hidden border border-steel-blue/10 bg-oxford-navy/10 group">
                <div className="absolute inset-0 bg-gradient-to-br from-steel-blue/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4 p-8">
                    <div className="w-20 h-20 bg-steel-blue/10 rounded-full flex items-center justify-center mx-auto border border-steel-blue/20">
                      <History className="w-10 h-10 text-steel-blue" />
                    </div>
                    <p className="text-sm font-mono text-mint-cream/70 uppercase tracking-widest">Archive Preview</p>
                    <p className="text-lg font-light italic text-mint-cream/80">"Australia wasn't just playing games; we were building the future of them."</p>
                  </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute top-4 left-4 font-mono text-[8px] opacity-20">SYS_LOG: HISTORY_UNLOCKED</div>
                <div className="absolute bottom-4 right-4 font-mono text-[8px] opacity-20">REGION: PAL_AUS</div>
              </div>
            </div>
          </div>
        </section>

        {/* Pledge Tiers Preview */}
        <section id="pledge" className="py-24 px-6 bg-oxford-navy/10">
          <div className="max-w-7xl mx-auto text-center space-y-16">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-7xl font-display font-normal tracking-widest uppercase">Pledge Offerings</h2>
              <p className="text-mint-cream/70 max-w-xl mx-auto font-normal">
                Starting at just <span className="text-steel-blue font-bold">$20 AUD</span>. 
                Support the project and get exclusive rewards.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {PLEDGE_TIERS.map((tier, i) => (
                <TierCard
                  key={i}
                  title={tier.title}
                  price={tier.price}
                  perks={tier.perks}
                  featured={tier.featured}
                  onOpen={() => setSelectedTier(tier)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-5xl md:text-7xl font-display font-normal tracking-widest uppercase">Frequently Asked</h2>
              <p className="text-mint-cream/70 font-normal">Everything you need to know about the project.</p>
            </div>
            <FAQ />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="relative py-24 px-6 bg-gradient-to-t from-steel-blue/10 to-transparent">
          <TronBackground opacity={0.2} />
          <div className="relative z-10 max-w-3xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-5xl md:text-7xl font-display font-normal tracking-widest uppercase">Stay Updated</h2>
              <p className="text-mint-cream/70 font-normal">Be the first to know when we launch on July 1.</p>
            </div>
            <ContactForm />
          </div>
        </section>
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
              Unlocking the untold history of Australian video games
            </p>
          </div>

          <div className="flex gap-8">
            <a href="#" className="text-white hover:text-steel-blue transition-colors p-2 rounded-full border border-white/10 hover:border-steel-blue/50">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-white hover:text-steel-blue transition-colors p-2 rounded-full border border-white/10 hover:border-steel-blue/50">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-white hover:text-steel-blue transition-colors p-2 rounded-full border border-white/10 hover:border-steel-blue/50">
              <MessageSquare className="w-5 h-5" />
            </a>
          </div>

          <div className="space-y-6 max-w-4xl">
            <p className="text-[11px] font-sans font-normal uppercase tracking-[0.2em] text-white/90">
              © 2026 David Tucker and Michael Refalo. All rights reserved.
            </p>
            <p className="text-[10px] font-sans font-light leading-relaxed text-white/60">
              Third-party imagery and intellectual property used on this site are for illustrative purposes only and remain the property of their respective owners. No official endorsement or affiliation is implied.
            </p>
          </div>
        </div>
      </footer>

      <VideoLightbox 
        isOpen={isVideoOpen} 
        onClose={() => setIsVideoOpen(false)} 
        videoUrl="https://drive.google.com/file/d/1YY8LJ4elGmu220-l-upVu1oOdpEDU0Yv/preview"
      />
      <PledgeModal
        isOpen={!!selectedTier}
        onClose={() => setSelectedTier(null)}
        tier={selectedTier}
      />
    </div>
  );
}

function TopicItem({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex gap-6 group">
      <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-oxford-navy/20 flex items-center justify-center border border-steel-blue/10 group-hover:border-steel-blue/50 transition-colors">
        <div className="text-steel-blue">{icon}</div>
      </div>
      <div className="space-y-1">
        <h3 className="text-2xl font-display font-normal tracking-widest uppercase">{title}</h3>
        {/* Dummy summary section - uncomment to show */}
        {/* <p className="text-mint-cream/40 leading-relaxed font-light">{description}</p> */}
      </div>
    </div>
  );
}
interface TierCardProps {
  title: string;
  price: string;
  perks: string[];
  featured?: boolean;
  onOpen: () => void;
}

const TierCard: React.FC<TierCardProps> = ({ title, price, perks, featured = false, onOpen }) => {
  return (
    <div className={`relative p-8 rounded-3xl border ${featured ? 'border-steel-blue bg-steel-blue/5' : 'border-steel-blue/10 bg-oxford-navy/5'} text-left space-y-6 transition-transform hover:scale-[1.02]`}>
      {featured && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-steel-blue text-ink-black text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-widest">
          Most Popular
        </div>
      )}
      <div className="space-y-1">
        <h3 className="text-3xl font-display font-normal tracking-widest uppercase">{title}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-steel-blue">${price}</span>
          <span className="text-mint-cream/70 text-xs font-sans uppercase">AUD</span>
        </div>
      </div>
      
      {/* 📝 REWARDS LIST PREVIEW REMOVED PER REQUEST - RE-ENABLE HERE IF NEEDED */}

      <button 
        onClick={onOpen}
        className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${featured ? 'bg-steel-blue text-ink-black hover:bg-mint-cream' : 'bg-steel-blue/10 text-mint-cream hover:bg-steel-blue/20'}`}
      >
        Find Out More
      </button>
    </div>
  );
}

