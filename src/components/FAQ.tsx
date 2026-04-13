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
    answer: "Region Locked is a feature-length documentary exploring the hidden history of the Australian video game industry, from the early 70s to the turn of the millennium."
  },
  {
    question: "What games will be featured?",
    answer: "We're diving deep into the archives to cover everything from the early text-adventure era (like The Hobbit) to the 90s boom and the modern indie revolution. Expect to see classics, cult hits, and the stories behind games you never knew were made in Australia."
  },
  {
    question: "Who are you interviewing?",
    answer: "We are speaking with the original pioneers, studio founders, and developers who were on the front lines. Our goal is to capture the raw, first-hand accounts of the people who built this industry from the ground up."
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
            <span className="text-lg font-medium text-white/90">{faq.question}</span>
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
                <div className="px-6 pb-5 text-white/60 leading-relaxed font-light">
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
