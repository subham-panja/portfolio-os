"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BootAnimationProps {
  onComplete: () => void;
}

export default function BootAnimation({ onComplete }: BootAnimationProps) {
  const [phase, setPhase] = useState<"logo" | "loading" | "done">("logo");

  useEffect(() => {
    // Phase 1: Show logo (1s)
    const logoTimer = setTimeout(() => {
      setPhase("loading");
    }, 1000);

    // Phase 2: Loading bar (1.5s)
    const loadingTimer = setTimeout(() => {
      setPhase("done");
    }, 2500);

    // Phase 3: Complete
    const doneTimer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(loadingTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center"
        >
          {/* Apple-style logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="mb-16"
          >
            {/* Custom logo - stylized "SP" */}
            <div className="relative">
              <motion.div
                animate={{
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-6xl font-bold text-white tracking-tight"
              >
                <span className="bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
                  SP
                </span>
              </motion.div>
              {/* Glow effect */}
              <div className="absolute inset-0 blur-2xl opacity-30 bg-white rounded-full" />
            </div>
          </motion.div>

          {/* Loading bar */}
          <AnimatePresence>
            {phase === "loading" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-32"
              >
                <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="h-full bg-white rounded-full"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
