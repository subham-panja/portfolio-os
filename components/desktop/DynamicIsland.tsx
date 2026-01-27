"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useDynamicIslandStore } from "@/lib/store/useDynamicIslandStore";
import { useMusicStore } from "@/lib/store/useMusicStore";
import { useNotificationStore } from "@/lib/store/useNotificationStore";
import { useEffect, useState } from "react";

export default function DynamicIsland() {
  const { size, content, isExpanded, expand, collapse, setContent, setSize } =
    useDynamicIslandStore();
  const { isPlaying, playlist, currentTrackIndex } = useMusicStore();
  const { notifications, removeNotification } = useNotificationStore();

  // Internal state for music visualizer
  const [bars, setBars] = useState<number[]>([10, 15, 8, 12, 5]);

  // Handle new notifications
  useEffect(() => {
    if (notifications.length > 0) {
      const latest = notifications[0];
      setContent(
        <div className="flex items-center gap-3 w-full">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-xl">
            {latest.appId === "mail" ? "📧" : "🔔"}
          </div>
          <div className="flex-1 min-w-0 text-left">
            <h4 className="font-semibold text-sm truncate">{latest.title}</h4>
            <p className="text-white/60 text-xs truncate">{latest.message}</p>
          </div>
        </div>,
      );
      setSize("compact");

      const timer = setTimeout(() => {
        removeNotification(latest.id);
        collapse();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [notifications, setContent, setSize, removeNotification, collapse]);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setBars((prev) => prev.map(() => Math.random() * 15 + 5));
      }, 200);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const currentTrack = playlist[currentTrackIndex];

  // Variants for different sizes
  const variants = {
    default: { width: 120, height: 35, borderRadius: 20 },
    compact: { width: 200, height: 35, borderRadius: 20 },
    expanded: { width: 350, height: 180, borderRadius: 32 },
    ultra: { width: 380, height: 80, borderRadius: 32 },
  };

  return (
    <div className="fixed top-2 left-1/2 -translate-x-1/2 z-50 flex justify-center items-start">
      <motion.div
        layout
        initial="default"
        animate={size}
        variants={variants}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="bg-black text-white overflow-hidden shadow-2xl relative"
        onHoverStart={() => {
          if (isPlaying && size === "default") expand();
        }}
        onHoverEnd={() => {
          // Optional: Auto collapse on mouse leave if it was just a quick peek
        }}
      >
        <AnimatePresence mode="wait">
          {/* Default State: Just the black pill, maybe small indicators */}
          {size === "default" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full flex items-center justify-between px-3"
            >
              {/* Fake Camera Lens */}
              <div className="w-16 h-full" />

              {/* Music Activity Indicatior */}
              {isPlaying && (
                <div className="flex gap-0.5 items-end h-3 mb-1">
                  {bars.map((h, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: h }}
                      className="w-1 bg-green-400 rounded-full"
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Expanded State: Music Player or Notifications */}
          {size === "expanded" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="p-6 w-full h-full flex flex-col justify-between"
            >
              {content ? (
                content
              ) : (
                <>
                  <div className="flex items-center gap-4">
                    <img
                      src={currentTrack.cover}
                      alt="Album Art"
                      className="w-12 h-12 rounded-xl"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate text-sm">
                        {currentTrack.title}
                      </h3>
                      <p className="text-white/50 text-xs truncate">
                        {currentTrack.artist}
                      </p>
                    </div>
                    <div className="flex gap-1 h-4 items-end">
                      {bars.map((h, i) => (
                        <motion.div
                          key={i}
                          animate={{ height: h * 1.5 }}
                          className="w-1.5 bg-green-400 rounded-full"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={collapse}
                      className="p-2 hover:bg-white/10 rounded-full transition-colors relative"
                    >
                      <span className="text-xs text-white/50">Collapse</span>
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          )}

          {/* Compact State (Notification Popup) */}
          {size === "compact" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full flex items-center px-4"
            >
              {content}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
