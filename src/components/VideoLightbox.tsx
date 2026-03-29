import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

interface VideoLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
}

/**
 * INSTRUCTIONS TO REPLACE THE VIDEO:
 * 1. Find the 'videoUrl' prop being passed to this component in App.tsx.
 * 2. For Google Drive videos:
 *    - Get the share link (e.g., https://drive.google.com/file/d/12345/view)
 *    - Change '/view' to '/preview' at the end.
 * 3. For YouTube videos:
 *    - Use the embed format: https://www.youtube.com/embed/VIDEO_ID
 * 4. For Vimeo videos:
 *    - Use the embed format: https://player.vimeo.com/video/VIDEO_ID
 */

export default function VideoLightbox({ isOpen, onClose, videoUrl }: VideoLightboxProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-ink-black/95 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md"
              aria-label="Close video"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Video Iframe */}
            <iframe
              src={videoUrl}
              className="w-full h-full border-0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Region Locked Trailer"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
