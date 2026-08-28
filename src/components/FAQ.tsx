import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

const faqs: FAQItem[] = [
  {
    question: "What is 'Region Locked'?",
    answer: "Region Locked is a documentary series of large cinematic scale, exploring the hidden history of the Australian video game industry, from the early 70s to the turn of the millennium."
  },
  {
    question: "What games will be featured?",
    answer: "We are charting a course through decades of digital triumph and creative defiance—unearthing the code, the stories, and the pixels that defined generations of players. Prepare to journey from the legendary text-adventure prose of The Hobbit (1983) and the pioneering combat mechanics of The Way of the Exploding Fist (1985), to the gritty FMV detective alleys of The Dame was Loaded (1996). We'll trace the lineage upward through the vibrant platforming heights of Ty the Tasmanian Tiger (2002), the irreverent alien chaos of Destroy All Humans! (2005), the global viral phenomenon of Crossy Road (2014), and many more."
  },
  {
    question: "Who are you interviewing?",
    answer: "We have over 60 industry legends lined up to participate in interviews. Artists, developers, musicians and management from Micro Forte, Beam Software, SSG, Team Bondi, Hipster Whale and more!"
  },
  {
    question: "How can I participate or share my story?",
    answer: (
      <div className="space-y-6">
        <p className="text-left">We are always looking for unique stories, rare archival footage, or insights from those who were part of the Aussie gaming scene. If you would like to participate, share content and design documents, concept art or footage; please reach out to <strong>David</strong> or <strong>Michael</strong> to see how you can be a part of the journey.</p>
        <div className="flex justify-center">
          <a 
            href="mailto:regionlocked.doco@gmail.com"
            className="inline-flex items-center gap-2 bg-steel-blue text-ink-black px-6 py-3 rounded-lg font-bold hover:bg-mint-cream transition-all text-sm"
          >
            Email the Team
          </a>
        </div>
      </div>
    )
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border border-white/10 rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-white/5 transition-colors"
          >
            <span className="text-xl font-medium text-white/90">{faq.question}</span>
            <motion.div
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-5 h-5 text-steel-blue" />
            </motion.div>
          </button>
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="px-6 pt-5 pb-5 text-mint-cream/60 leading-relaxed font-light text-lg">
                  {faq.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
