"use client";

import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  PanInfo,
} from "framer-motion";

interface LockScreenProps {
  onUnlock: () => void;
}

export default function LockScreen({ onUnlock }: LockScreenProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isUnlocking, setIsUnlocking] = useState(false);

  const y = useMotionValue(0);
  const opacity = useTransform(y, [-100, 0], [0, 1]);
  const scale = useTransform(y, [-100, 0], [0.9, 1]);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (info.offset.y < -80) {
      setIsUnlocking(true);
      setTimeout(onUnlock, 400);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isUnlocking ? 0 : 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[100] overflow-hidden"
      style={{
        backgroundImage: "url('/wallpaper-mobile.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dim overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Top notch area / Dynamic Island */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <div className="flex justify-center pt-3">
          <div className="w-28 h-7 bg-black rounded-full" />
        </div>
      </div>

      {/* Lock content */}
      <motion.div
        style={{ opacity, scale }}
        className="h-full flex flex-col items-center justify-center pt-20"
      >
        {/* Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-2"
        >
          <div className="text-8xl font-thin text-white tracking-tight">
            {formatTime(currentTime)}
          </div>
        </motion.div>

        {/* Date */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-white/80 font-light"
        >
          {formatDate(currentTime)}
        </motion.div>

        {/* Notifications placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 w-[90%] max-w-sm"
        >
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center text-xl">
                👋
              </div>
              <div className="flex-1">
                <div className="text-white font-medium text-sm">Welcome</div>
                <div className="text-white/60 text-xs">
                  Swipe up to explore my portfolio
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Swipe up indicator */}
      <motion.div
        drag="y"
        dragConstraints={{ top: -150, bottom: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        style={{ y }}
        className="absolute bottom-0 left-0 right-0 pb-8 pt-20 cursor-grab active:cursor-grabbing"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col items-center gap-2"
        >
          {/* Swipe arrow animation */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              className="w-8 h-8 text-white/60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          </motion.div>
          <span className="text-white/60 text-sm font-medium">
            Swipe up to unlock
          </span>
        </motion.div>

        {/* Home indicator */}
        <div className="mt-6 flex justify-center">
          <div className="w-32 h-1 bg-white/40 rounded-full" />
        </div>
      </motion.div>

      {/* Face ID icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="absolute top-32 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg
            className="w-10 h-10 text-white/80"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M9 11.75A1.25 1.25 0 1 0 9 14.25A1.25 1.25 0 1 0 9 11.75ZM15 11.75A1.25 1.25 0 1 0 15 14.25A1.25 1.25 0 1 0 15 11.75Z" />
            <path d="M12 18c2.28 0 4.22-1.66 5-4h-2c-.55 1.22-1.56 2-3 2s-2.45-.78-3-2H7c.78 2.34 2.72 4 5 4z" />
            <path d="M7 4h2V2H7c-2.76 0-5 2.24-5 5v2h2V7c0-1.66 1.34-3 3-3zm10-2h-2v2h2c1.66 0 3 1.34 3 3v2h2V7c0-2.76-2.24-5-5-5zm0 20h-2v-2h2c1.66 0 3-1.34 3-3v-2h2v2c0 2.76-2.24 5-5 5zM7 22h2v-2H7c-1.66 0-3-1.34-3-3v-2H2v2c0 2.76 2.24 5 5 5z" />
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
