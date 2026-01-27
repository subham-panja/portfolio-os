"use client";

import { motion } from "framer-motion";
import { AppDefinition } from "@/lib/data";

interface DesktopIconProps {
  app: AppDefinition;
  onClick: () => void;
  index: number;
}

export default function DesktopIcon({ app, onClick, index }: DesktopIconProps) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 + 0.2 }}
      onClick={onClick}
      onDoubleClick={onClick}
      className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/10 transition-colors group w-20"
    >
      {/* Icon */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl shadow-lg"
        style={{ backgroundColor: app.color }}
      >
        {app.icon}
      </motion.div>

      {/* Label */}
      <span className="text-xs text-white/90 text-center line-clamp-2 font-medium drop-shadow-md">
        {app.name}
      </span>
    </motion.button>
  );
}
