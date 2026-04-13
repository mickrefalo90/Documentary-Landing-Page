import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import CoinLogo from "./components/CoinLogo";
import StarField from "./components/StarField";
import GoalTracker from "./components/GoalTracker";
import FAQ from "./components/FAQ";
import ContactForm from "./components/ContactForm";
import ImageFlow from "./components/ImageFlow";
import VideoLightbox from "./components/VideoLightbox";
import TronBackground from "./components/TronBackground";
import { Gamepad2, History, Cpu, Sparkles, ArrowRight, Twitter, Instagram, MessageSquare, Linkedin, ExternalLink, User, Disc, Shirt, BookOpen, Star, Crown, Layers, Menu, X, ChevronDown } from "lucide-react";
import sectionsConfig from "./config/sections.json";

const NAV_ITEMS = [
  { key: 'hero', label: 'Home', id: '#' },
  { key: 'mission', label: 'Mission', id: '#goal' },
  { key: 'about', label: 'About', id: '#about' },
  { key: 'team', label: 'Team', id: '#team' },
  { key: 'pledge', label: 'Pledge', id: '#pledge' },
  { key: 'faq', label: 'FAQ', id: '#faq' },
  { key: 'contact', label: 'Notify Me', id: '#contact' },
];

const PLEDGE_TIERS = [
  {
    level: "01",
    title: "Your Name in Pixels",
    price: "25",
    perks: ["Film + Name in Credits"],
    icon: User,
    intensity: 0.05
  },
  {
    level: "02",
    title: "In Your Hands",
    price: "60",
    perks: ["Blu-ray/DVD"],
    icon: Disc,
    intensity: 0.1,
    includesLowerTiers: true
  },
  {
    level: "03",
    title: "Wear the Doco",
    price: "120",
    perks: ["Exclusive Shirt"],
    icon: Shirt,
    intensity: 0.15,
    includesLowerTiers: true
  },
  {
    level: "04",
    title: "Collector's Tome",
    price: "550",
    perks: ["Hardcover Book (Limit 50)"],
    icon: BookOpen,
    intensity: 0.2,
    featured: true,
    includesLowerTiers: true
  },
  {
    level: "05",
    title: "Assoc. Producer Credit",
    price: "1,000",
    perks: ["Higher Screen Credit", "Additional benefits to be revealed soon"],
    icon: Star,
    intensity: 0.3,
    includesLowerTiers: true
  },
  {
    level: "06",
    title: "Exec. Producer Credit",
    price: "2,500",
    perks: ["Executive Producer Credit (Limit 4)", "Additional benefits to be revealed soon"],
    icon: Crown,
    intensity: 0.4,
    includesLowerTiers: true
  },
];

export default function App() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSocialToast, setShowSocialToast] = useState(false);
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  const visibleNavItems = NAV_ITEMS.filter(item => (sectionsConfig as any)[item.key]);

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
          
          {/* Menu Button (All screen sizes) */}
          <button 
            className="text-mint-cream p-2 hover:text-steel-blue transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </nav>

      {/* Full-Screen Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-ink-black flex flex-col items-center justify-center glitch-overlay"
          >
            <button 
              className="absolute top-6 right-6 text-mint-cream p-2 z-[110]"
              onClick={() => setIsMenuOpen(false)}
            >
              <X className="w-10 h-10" />
            </button>

            <div className="flex flex-col gap-4 text-center relative z-[110]">
              {visibleNavItems.map((item, i) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                >
                  <a 
                    href={item.id} 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-6xl md:text-9xl font-display uppercase tracking-tighter text-white hover:text-steel-blue transition-colors inline-block"
                  >
                    {item.label}
                  </a>
                </motion.div>
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
                  <span>L<span className="relative inline-flex items-center justify-center">O<svg viewBox="7 2 10 20" fill="currentColor" className="absolute h-[0.51em] w-auto text-[#050505] pointer-events-none top-[42%] left-[40%] -translate-x-1/2 -translate-y-1/2 scale-y-110"><path d="M12 2C9.24 2 7 4.24 7 7C7 8.83 8 10.42 9.5 11.25L7 22H17L14.5 11.25C16 10.42 17 8.83 17 7C17 4.24 14.76 2 12 2Z" /></svg></span>CKED</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg md:text-xl text-mint-cream/70 font-normal max-w-xl mx-auto leading-relaxed"
                >
                  Unlocking the History of Australian Video Games
                </motion.p>
              </div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                onClick={() => {
                  const missionSection = document.getElementById('goal');
                  missionSection?.scrollIntoView({ behavior: 'smooth' });
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
          <section id="goal" className="py-24 px-6 bg-gradient-to-b from-transparent to-oxford-navy/20">
            <div className="max-w-7xl mx-auto text-center space-y-12">
              <div className="space-y-6">
                <h2 className="text-5xl md:text-7xl font-display font-normal tracking-widest uppercase">The Mission</h2>
                <div className="max-w-3xl mx-auto space-y-4">
                  <p className="text-mint-cream/80 text-lg font-normal leading-relaxed">
                    We intend to create a detailed, cinematic and entertaining feature - showcasing the contributions that Australians have made to the video game industry, from the very early days.
                  </p>
                  <p className="text-mint-cream/60 text-base font-light leading-relaxed">
                    From The Hobbit, to Crossy Road and beyond, our documentary will focus on the developers and artists that gave Australia a spotlight in the industry, and the unfortunate situations that lead to a less productive landscape for Aussie game development.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Topics Section */}
        {sectionsConfig.about && (
          <section id="about" className="py-24 px-6">
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
                      description="Direct conversations with the pioneers who built the industry from the ground up, sharing the raw truth of creating global hits from the edge of the world."
                    />
                    <TopicItem
                      icon={<History className="w-6 h-6" />}
                      title="Preserve the Oral History"
                      description="Preserve, document, and champion the events and history that made Australian video games legendary, ensuring our impact is not lost to time."
                    />
                    <TopicItem
                      icon={<Cpu className="w-6 h-6" />}
                      title="The Funding Battle"
                      description="Uncovering the constant fight for legitimacy and financial backing in a landscape that was often decades behind the global curve."
                    />
                    <TopicItem
                      icon={<Sparkles className="w-6 h-6" />}
                      title="Resilience & Legacy"
                      description="The stories of the studios that survived, the ones that didn't, and the enduring spirit of the developers who put Australia on the map against all odds."
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* The Team Section */}
        {sectionsConfig.team && (
          <section id="team" className="py-24 px-6 bg-oxford-navy/5">
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
                  bio="Michael is a versatile and highly accomplished visionary whose sprawling career defines innovation across marketing, consumer products, retail, and visual merchandising. His expertise was sharpened as a creative leader at Toys 'R' Us Australia, where he developed the passion for designing dynamic, interactive spaces that instantly capture attention and drive deep consumer engagement. Fusing his lifelong enthusiasm for science, technology, storytelling, and entertainment, Michael now champions a powerful vision: to ignite the imaginations of the next generation of storytellers."
                  firstGame="Final Fantasy: Mystic Quest"
                  favGame="Half Life: Alyx"
                  linkedin="https://www.linkedin.com/in/michael-refalo"
                  imdb="https://www.imdb.com/name/nm15881952/?ref_=ra_sb_ln"
                  credits={[
                    "Wiggles Ready Steady Wiggle (Creative Lead)",
                    "Wiggle Up Giddy Up (Creative Lead)",
                    "iiNet's 'Business Help Hub' (Campaign Manager & Director)"
                  ]}
                />
              </div>
            </div>
          </section>
        )}

        {/* Pledge Tiers Preview */}
        {sectionsConfig.pledge && (
          <section id="pledge" className="py-24 px-6 bg-oxford-navy/10">
            <div className="max-w-4xl mx-auto space-y-16">
              <div className="text-center space-y-4">
                <h2 className="text-5xl md:text-7xl font-display font-normal tracking-widest uppercase">The Value Ladder</h2>
                <p className="text-mint-cream/70 max-w-xl mx-auto font-normal">
                  Unlock higher tiers to gain legendary status and exclusive physical rewards.
                </p>
              </div>
              
              <div className="space-y-4 relative">
                {/* Connecting Line */}
                <div className="absolute left-8 top-8 bottom-8 w-px bg-gradient-to-b from-steel-blue/0 via-steel-blue/20 to-steel-blue/0 hidden md:block" />
                
                {PLEDGE_TIERS.map((tier, i) => (
                  <PledgeRow key={i} tier={tier} />
                ))}
              </div>

              <div className="pt-12 text-center">
                <p className="text-steel-blue font-mono text-sm uppercase tracking-[0.3em] animate-pulse">
                  Stretch goals to be revealed soon
                </p>
              </div>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        {sectionsConfig.faq && (
          <section id="faq" className="py-24 px-6 relative overflow-hidden">
            <TronBackground opacity={0.1} />
            <div className="max-w-7xl mx-auto relative z-10">
              <div className="text-center mb-16 space-y-4">
                <h2 className="text-5xl md:text-7xl font-display font-normal tracking-widest uppercase">Frequently Asked</h2>
                <p className="text-mint-cream/70 font-normal">Everything you need to know about the project.</p>
              </div>
              <FAQ />
            </div>
          </section>
        )}

        {/* Contact Section */}
        {sectionsConfig.contact && (
          <section id="contact" className="relative py-24 px-6 bg-gradient-to-t from-steel-blue/10 to-transparent">
            <TronBackground opacity={0.2} />
            <div className="relative z-10 max-w-3xl mx-auto space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-5xl md:text-7xl font-display font-normal tracking-widest uppercase">Stay Updated</h2>
                <p className="text-mint-cream/70 font-normal">Be the first to know when we launch in Q1 FY27.</p>
              </div>
              <ContactForm />
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
            <button 
              onClick={() => {
                setShowSocialToast(true);
                setTimeout(() => setShowSocialToast(false), 3000);
              }}
              className="text-white hover:text-steel-blue transition-colors p-2 rounded-full border border-white/10 hover:border-steel-blue/50 cursor-pointer"
            >
              <Twitter className="w-5 h-5" />
            </button>
            <button 
              onClick={() => {
                setShowSocialToast(true);
                setTimeout(() => setShowSocialToast(false), 3000);
              }}
              className="text-white hover:text-steel-blue transition-colors p-2 rounded-full border border-white/10 hover:border-steel-blue/50 cursor-pointer"
            >
              <Instagram className="w-5 h-5" />
            </button>
            <button 
              onClick={() => {
                setShowSocialToast(true);
                setTimeout(() => setShowSocialToast(false), 3000);
              }}
              className="text-white hover:text-steel-blue transition-colors p-2 rounded-full border border-white/10 hover:border-steel-blue/50 cursor-pointer"
            >
              <MessageSquare className="w-5 h-5" />
            </button>
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

      {/* Social Media Coming Soon Toast */}
      <AnimatePresence>
        {showSocialToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] px-6 py-3 bg-steel-blue text-ink-black rounded-full font-mono text-xs font-bold uppercase tracking-widest shadow-[0_0_30px_rgba(61,122,184,0.4)] border border-mint-cream/20 text-center whitespace-nowrap"
          >
            Social Media Coming Soon
          </motion.div>
        )}
      </AnimatePresence>
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
            <p className="text-steel-blue font-mono text-xs uppercase tracking-[0.3em]">
              {role}
            </p>
            <div className="space-y-1 font-mono text-[10px] uppercase tracking-widest">
              <p className="text-mint-cream/40">
                <span className="font-bold text-steel-blue/60">First Game:</span> <span className="text-mint-cream/70">{firstGame}</span>
              </p>
              <p className="text-mint-cream/40">
                <span className="font-bold text-steel-blue/60">Favourite Game:</span> <span className="text-mint-cream/70">{favGame}</span>
              </p>
            </div>
          </div>
        </div>
        
        <p className="text-mint-cream/70 leading-relaxed font-light text-sm">
          {bio}
        </p>

        <div className="space-y-3">
          <p className="text-[10px] font-mono text-steel-blue/40 uppercase tracking-[0.2em]">Key Credits</p>
          <ul className="space-y-1 text-xs font-mono text-mint-cream/60 uppercase tracking-wider">
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

function TopicItem({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex gap-6 group">
      <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-oxford-navy/20 flex items-center justify-center border border-steel-blue/10 group-hover:border-steel-blue/50 transition-colors">
        <div className="text-steel-blue">{icon}</div>
      </div>
      <div className="space-y-2">
        <h3 className="text-2xl font-display font-normal tracking-widest uppercase">{title}</h3>
        <p className="text-mint-cream/60 leading-relaxed font-light text-sm">{description}</p>
      </div>
    </div>
  );
}
interface PledgeTier {
  level: string;
  title: string;
  price: string;
  perks: string[];
  icon: any;
  intensity: number;
  featured?: boolean;
  includesLowerTiers?: boolean;
}

const PledgeRow: React.FC<{ tier: PledgeTier }> = ({ tier }) => {
  const Icon = tier.icon;
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={`group relative flex flex-row items-start gap-4 md:gap-6 p-4 md:p-5 rounded-xl border transition-all duration-500 ${tier.featured ? 'border-steel-blue bg-steel-blue/5' : 'border-steel-blue/10 bg-oxford-navy/5 hover:border-steel-blue/30'}`}
    >
      {tier.featured && (
        <div className="absolute -top-2.5 right-4 bg-steel-blue text-ink-black text-[8px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-widest z-20 shadow-[0_0_15px_rgba(147,197,253,0.3)]">
          Most Popular
        </div>
      )}

      {/* Level Indicator */}
      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-oxford-navy/20 flex items-center justify-center border border-steel-blue/10 group-hover:border-steel-blue/50 transition-colors relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-steel-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <Icon className="w-5 h-5 text-steel-blue relative z-10" />
        <div className="absolute top-0.5 left-1 text-[7px] font-mono text-steel-blue/40 uppercase">LVL_{tier.level}</div>
      </div>

      {/* Content */}
      <div className="flex-grow text-left space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
          <h3 className="text-lg md:text-xl font-display font-normal tracking-widest uppercase leading-tight">{tier.title}</h3>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-steel-blue">${tier.price}</span>
            <span className="text-mint-cream/40 text-[9px] font-sans uppercase">AUD</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <ul className="flex flex-wrap gap-x-3 gap-y-1">
            {tier.perks.map((perk, idx) => (
              <li key={idx} className="text-[9px] md:text-[10px] font-mono text-mint-cream/60 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1 h-1 bg-steel-blue/30 rounded-full" />
                {perk}
              </li>
            ))}
          </ul>

          {tier.includesLowerTiers && (
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-steel-blue/10 border border-steel-blue/20 group-hover:border-steel-blue/40 transition-colors">
              <Layers className="w-2.5 h-2.5 text-steel-blue" />
              <span className="text-[8px] font-mono text-steel-blue uppercase tracking-widest font-bold">
                + All Lower Tiers
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Value Indicator (Glow) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{ 
          background: `radial-gradient(circle at center, rgba(147, 197, 253, ${tier.intensity / 2}) 0%, transparent 70%)` 
        }} 
      />
    </motion.div>
  );
}

