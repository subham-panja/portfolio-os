"use client";

import { motion } from "framer-motion";
import { AppDefinition } from "@/lib/data";

interface DockProps {
  apps: AppDefinition[];
  onAppClick: (app: AppDefinition) => void;
  openApps: string[];
}

export default function Dock({ apps, onAppClick, openApps }: DockProps) {
  return (
    <div className="fixed bottom-3 left-0 right-0 z-40 flex justify-center">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 20 }}
      >
        <div className="glass-dock rounded-2xl px-3 py-2 flex items-end gap-2">
          {apps.map((app) => (
            <motion.button
              key={app.id}
              onClick={() => onAppClick(app)}
              className="dock-icon relative group flex flex-col items-center"
              whileHover={{ scale: 1.3, y: -12 }}
              whileTap={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {/* App Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-lg"
                style={{ backgroundColor: app.color }}
              >
                {app.icon}
              </div>

              {/* App name tooltip */}
              <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                {app.name}
              </div>

              {/* Open indicator dot */}
              {openApps.includes(app.id) && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -bottom-1.5 w-1 h-1 bg-white/70 rounded-full"
                />
              )}
            </motion.button>
          ))}

          {/* Separator */}
          <div className="w-px h-12 bg-white/20 mx-1" />

          {/* Trash */}
          <motion.button
            className="dock-icon relative group flex flex-col items-center"
            whileHover={{ scale: 1.3, y: -12 }}
            whileTap={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-gray-600 shadow-lg">
              🗑️
            </div>
            <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              Trash
            </div>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
