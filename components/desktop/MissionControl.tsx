"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface MissionControlProps {
  isOpen: boolean;
  onClose: () => void;
  openWindows: {
    id: string;
    title: string;
    icon: string;
    color: string;
  }[];
  onWindowSelect: (id: string) => void;
}

export default function MissionControl({
  isOpen,
  onClose,
  openWindows,
  onWindowSelect,
}: MissionControlProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60]"
          onClick={onClose}
        >
          {/* Blurred background */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-xl" />

          {/* Content */}
          <div className="relative h-full flex flex-col">
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="pt-16 pb-8 text-center"
            >
              <h2 className="text-2xl font-light text-white/80">
                Mission Control
              </h2>
              <p className="text-sm text-white/40 mt-1">
                Press F3 or swipe up with three fingers
              </p>
            </motion.div>

            {/* Desktop Spaces */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="px-8 mb-8"
            >
              <div className="flex justify-center gap-4">
                {[1, 2, 3].map((desktop) => (
                  <button
                    key={desktop}
                    className={`w-32 h-20 rounded-lg border-2 transition-colors ${
                      desktop === 1
                        ? "border-blue-500 bg-blue-500/20"
                        : "border-white/20 bg-white/5 hover:border-white/40"
                    }`}
                  >
                    <span className="text-white/70 text-sm">
                      Desktop {desktop}
                    </span>
                  </button>
                ))}
                <button className="w-10 h-20 rounded-lg border-2 border-dashed border-white/20 flex items-center justify-center hover:border-white/40 transition-colors">
                  <span className="text-white/40 text-2xl">+</span>
                </button>
              </div>
            </motion.div>

            {/* Windows Grid */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex-1 px-16 pb-8 overflow-auto"
            >
              {openWindows.length > 0 ? (
                <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto">
                  {openWindows.map((window, index) => (
                    <motion.button
                      key={window.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onWindowSelect(window.id);
                        onClose();
                      }}
                      className="group"
                    >
                      {/* Window Preview */}
                      <div className="aspect-video bg-gray-800/80 rounded-xl border border-white/10 group-hover:border-blue-500 transition-colors shadow-2xl overflow-hidden">
                        <div className="h-full flex items-center justify-center">
                          <span
                            className="text-5xl"
                            style={{
                              filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.3))",
                            }}
                          >
                            {window.icon}
                          </span>
                        </div>
                      </div>
                      {/* Window Title */}
                      <div className="mt-3 text-center">
                        <span className="text-white/80 text-sm font-medium group-hover:text-white transition-colors">
                          {window.title}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📭</div>
                    <p className="text-white/50 text-lg">No open windows</p>
                    <p className="text-white/30 text-sm mt-2">
                      Click on an app to open it
                    </p>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Close hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="pb-8 text-center"
            >
              <kbd className="px-3 py-1.5 bg-white/10 rounded-lg text-white/40 text-sm">
                Click anywhere or press Esc to close
              </kbd>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
