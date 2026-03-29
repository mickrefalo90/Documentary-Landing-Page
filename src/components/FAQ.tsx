import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is 'Region Locked'?",
    answer: "Region Locked is a feature-length documentary exploring the hidden history of the Australian video game industry, from the early 70s to the turn of the millennium."
  },
  {
    question: "When does the Kickstarter launch?",
    answer: "The campaign officially goes live on July 1. Sign up for our newsletter to be notified the second we launch."
  },
  {
    question: "What are the pledge tiers?",
    answer: "Tiers will start at $20 AUD. Rewards include digital copies of the film, exclusive behind-the-scenes content, physical memorabilia, and even producer credits."
  },
  {
    question: "Why $750,000?",
    answer: "This goal covers high-end production costs, archival footage licensing, interviews across the country, and post-production to ensure this history is preserved in the highest quality possible."
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
