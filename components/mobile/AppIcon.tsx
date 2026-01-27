"use client";

import { motion } from "framer-motion";
import { AppDefinition } from "@/lib/data";

interface AppIconProps {
  app: AppDefinition;
  onClick: () => void;
  index: number;
}

export default function AppIcon({ app, onClick, index }: AppIconProps) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.08 + 0.2 }}
      onClick={onClick}
      className="flex flex-col items-center gap-1.5"
    >
      <motion.div
        whileTap={{ scale: 0.85 }}
        className="ios-app-icon w-16 h-16 flex items-center justify-center text-3xl shadow-lg"
        style={{ backgroundColor: app.color }}
      >
        {app.icon}
      </motion.div>
      <span className="text-[11px] text-white/90 font-medium text-center line-clamp-1 max-w-[72px]">
        {app.name}
      </span>
    </motion.button>
  );
}
