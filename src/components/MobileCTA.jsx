"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { track, Events } from "../lib/analytics";

export default function MobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show after user has scrolled 300px
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 md:hidden z-50 px-4 pb-safe"
          style={{ paddingBottom: "max(16px, env(safe-area-inset-bottom))" }}
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "110%", opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href="/quote"
            onClick={() => track(Events.MOBILE_CTA_CLICKED)}
            className="flex items-center justify-center w-full py-4 rounded-2xl font-semibold text-sm transition-all active:scale-[0.98]"
            style={{
              background: "#2563eb",
              color: "#ffffff",
              boxShadow: "0 8px 32px rgba(37,99,235,0.35)",
            }}
          >
            Get an Instant Quote
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
