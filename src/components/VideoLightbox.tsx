import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

interface VideoLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title?: string;
}

/**
 * Formats YouTube / Vimeo / Drive links into embed-ready URLs.
 */
function getEmbedUrl(url: string): string {
  if (!url) return "";

  // YouTube short url: https://youtu.be/5HvrRLYcm8E?si=...
  const youtuBeMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (youtuBeMatch && youtuBeMatch[1]) {
    return `https://www.youtube.com/embed/${youtuBeMatch[1]}?autoplay=1&rel=0`;
  }

  // YouTube shorts url: https://youtube.com/shorts/uN4fXaY8NyY
  const shortsMatch = url.match(/shorts\/([a-zA-Z0-9_-]+)/);
  if (shortsMatch && shortsMatch[1]) {
    return `https://www.youtube.com/embed/${shortsMatch[1]}?autoplay=1&rel=0`;
  }

  // Standard YouTube watch url: https://www.youtube.com/watch?v=...
  const youtubeWatchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (youtubeWatchMatch && youtubeWatchMatch[1]) {
    return `https://www.youtube.com/embed/${youtubeWatchMatch[1]}?autoplay=1&rel=0`;
  }

  // Already embed url: add autoplay if not present
  if (url.includes("youtube.com/embed/")) {
    if (!url.includes("autoplay=")) {
      const delimiter = url.includes("?") ? "&" : "?";
      return `${url}${delimiter}autoplay=1&rel=0`;
    }
    return url;
  }

  // Google Drive: change /view to /preview
  if (url.includes("drive.google.com") && url.includes("/view")) {
    return url.replace("/view", "/preview");
  }

  return url;
}

export default function VideoLightbox({ isOpen, onClose, videoUrl, title }: VideoLightboxProps) {
  const embedUrl = getEmbedUrl(videoUrl);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

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
              className="absolute top-4 right-4 z-20 p-2.5 bg-black/60 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md border border-white/10"
              aria-label="Close video"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video Title Header */}
            {title && (
              <div className="absolute top-4 left-4 z-20 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/10 max-w-[70%] truncate">
                <span className="text-xs font-mono tracking-wider text-mint-cream uppercase">{title}</span>
              </div>
            )}

            {/* Video Iframe */}
            <iframe
              src={embedUrl}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              title={title || "Video Player"}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
