"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { AppDefinition } from "@/lib/data";

interface AppScreenProps {
  app: AppDefinition;
  children: ReactNode;
  onClose: () => void;
}

export default function AppScreen({ app, children, onClose }: AppScreenProps) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0, borderRadius: 50 }}
      animate={{ scale: 1, opacity: 1, borderRadius: 0 }}
      exit={{ scale: 0.8, opacity: 0, borderRadius: 50 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed inset-0 z-50 bg-[#1c1c1e] flex flex-col"
      drag="y"
      dragDirectionLock
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={{ top: 0, bottom: 0.5 }}
      onDragEnd={(_, info) => {
        if (info.offset.y > 100) {
          onClose();
        }
      }}
    >
      {/* App Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <button
          onClick={onClose}
          className="text-accent text-base flex items-center gap-1"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>
        <div className="flex items-center gap-2">
          <span
            className="w-7 h-7 rounded-lg flex items-center justify-center text-sm"
            style={{ backgroundColor: app.color }}
          >
            {app.icon}
          </span>
          <span className="font-semibold text-white">{app.name}</span>
        </div>
        <div className="w-16" />
      </div>

      {/* App Content */}
      <div className="flex-1 overflow-auto">{children}</div>

      {/* Home Indicator */}
      <div className="pb-2 pt-4">
        <div className="home-indicator" />
      </div>
    </motion.div>
  );
}
