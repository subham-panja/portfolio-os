"use client";

import { motion } from "framer-motion";
import { AppDefinition } from "@/lib/data";

interface MobileDockProps {
  apps: AppDefinition[];
  onAppClick: (app: AppDefinition) => void;
}

export default function MobileDock({ apps, onAppClick }: MobileDockProps) {
  // Take only first 4 apps for the dock
  const dockApps = apps.slice(0, 4);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 20 }}
      className="fixed bottom-6 left-4 right-4 z-40"
    >
      <div className="glass-ios rounded-3xl p-3 flex items-center justify-around">
        {dockApps.map((app) => (
          <motion.button
            key={app.id}
            onClick={() => onAppClick(app)}
            whileTap={{ scale: 0.85 }}
            className="flex flex-col items-center"
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
              style={{ backgroundColor: app.color }}
            >
              {app.icon}
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
