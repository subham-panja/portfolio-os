"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Notification {
  id: string;
  app: string;
  icon: string;
  title: string;
  description: string;
  time: string;
  color: string;
}

const notifications: Notification[] = [
  {
    id: "1",
    app: "Messages",
    icon: "💬",
    title: "Sarah Jenkins",
    description: "Hey! Are we still on for the design review later?",
    time: "Now",
    color: "#30D158",
  },
  {
    id: "2",
    app: "Calendar",
    icon: "📅",
    title: "Team Sync",
    description: "Starts in 10 minutes",
    time: "10m ago",
    color: "#FF375F",
  },
  {
    id: "3",
    app: "Mail",
    icon: "📧",
    title: "Job Application Update",
    description: "We would like to schedule an interview...",
    time: "1h ago",
    color: "#0A84FF",
  },
  {
    id: "4",
    app: "Home",
    icon: "🏠",
    title: "Front Door",
    description: "Motion detected at the front door.",
    time: "2h ago",
    color: "#FF9F0A",
  },
];

export default function NotificationCenter({
  isOpen,
  onClose,
}: NotificationCenterProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-transparent"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-[350px] bg-black/20 backdrop-blur-3xl shadow-2xl z-50 border-l border-white/10 pt-12 px-4 pb-4 overflow-y-auto"
          >
            {/* Widgets Section */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Calendar Widget */}
              <div className="bg-gray-800/50 rounded-2xl p-4 flex flex-col justify-between aspect-square border border-white/5">
                <span className="text-red-500 font-semibold uppercase text-xs">
                  {new Date().toLocaleDateString("en-US", { weekday: "long" })}
                </span>
                <span className="text-4xl font-light text-white">
                  {new Date().getDate()}
                </span>
                <span className="text-white/60 text-sm">
                  No more events today
                </span>
              </div>

              {/* Weather Widget */}
              <div className="bg-blue-500/80 rounded-2xl p-4 flex flex-col justify-between aspect-square text-white">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-semibold">Bengaluru</span>
                  <span>☀️</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-light">28°</span>
                  <span className="text-xs opacity-80">Sunny</span>
                </div>
                <div className="text-xs opacity-60">H:32° L:24°</div>
              </div>
            </div>

            {/* Notifications Header */}
            <div className="flex items-center justify-between mb-4 pl-2">
              <h3 className="text-white/50 text-xs font-semibold uppercase tracking-wider">
                Notifications
              </h3>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-white/10 transition-colors"
              >
                <X size={16} className="text-white/50" />
              </button>
            </div>

            {/* Notifications List */}
            <div className="space-y-3">
              {notifications.map((notif, i) => (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className="bg-gray-800/40 backdrop-blur-md rounded-2xl p-3 border border-white/5 hover:bg-gray-800/60 transition-colors cursor-default"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shadow-sm"
                      style={{ backgroundColor: notif.color }}
                    >
                      {notif.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <span className="text-white font-semibold text-sm truncate">
                          {notif.title}
                        </span>
                        <span className="text-white/40 text-xs whitespace-nowrap ml-2">
                          {notif.time}
                        </span>
                      </div>
                      <p className="text-white/70 text-sm leading-snug line-clamp-2">
                        {notif.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
