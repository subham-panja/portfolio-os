"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useNotificationStore } from "@/lib/store/useNotificationStore";

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationCenter({
  isOpen,
  onClose,
}: NotificationCenterProps) {
  const { notifications, removeNotification, addNotification, clearAll } =
    useNotificationStore();

  const handleTest = () => {
    addNotification({
      title: "Test Notification",
      message: "This is a test notification from the Notification Center.",
      appId: "mail",
    });
  };

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
              <div className="flex items-center gap-2">
                {notifications.length > 0 && (
                  <button
                    onClick={clearAll}
                    className="text-xs text-white/50 hover:text-white mr-2"
                  >
                    Clear All
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-1 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X size={16} className="text-white/50" />
                </button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="space-y-3">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-white/30 space-y-4 border border-dashed border-white/10 rounded-xl">
                  <p className="text-sm">No new notifications</p>
                  <button
                    onClick={handleTest}
                    className="px-3 py-1.5 bg-white/10 rounded-lg text-xs hover:bg-white/20 transition-colors text-white/70"
                  >
                    Test Push
                  </button>
                </div>
              ) : (
                notifications.map((notif) => (
                  <motion.div
                    key={notif.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    layout
                    className="bg-gray-800/40 backdrop-blur-md rounded-2xl p-3 border border-white/5 hover:bg-gray-800/60 transition-colors relative group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shadow-sm bg-blue-500/20">
                        {notif.appId === "mail" ? "📧" : "🔔"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline mb-0.5">
                          <span className="text-white font-semibold text-sm truncate">
                            {notif.title}
                          </span>
                          <span className="text-white/40 text-xs whitespace-nowrap ml-2">
                            {new Date(notif.timestamp).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        <p className="text-white/70 text-sm leading-snug line-clamp-2">
                          {notif.message}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeNotification(notif.id);
                      }}
                      className="absolute -top-1 -right-1 bg-gray-700 rounded-full p-0.5 text-white/40 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={12} />
                    </button>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
