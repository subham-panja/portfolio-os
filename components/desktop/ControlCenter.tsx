"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ControlCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ControlCenter({ isOpen, onClose }: ControlCenterProps) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [brightness, setBrightness] = useState(100);
  const [volume, setVolume] = useState(75);
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(true);
  const [airDrop, setAirDrop] = useState(false);
  const [focusMode, setFocusMode] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
            onClick={onClose}
          />

          {/* Control Center Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed top-10 right-4 w-80 z-50"
          >
            <div className="bg-gray-900/90 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/10">
              {/* Quick Toggles Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {/* Wi-Fi */}
                <button
                  onClick={() => setWifi(!wifi)}
                  className={`p-4 rounded-xl flex flex-col items-start gap-2 transition-colors ${
                    wifi ? "bg-blue-500" : "bg-white/10"
                  }`}
                >
                  <svg
                    className="w-6 h-6 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 3C6.95 3 3.15 4.85 0 7.23L12 22 24 7.25C20.85 4.87 17.05 3 12 3Z" />
                  </svg>
                  <div>
                    <div className="text-white text-sm font-medium">Wi-Fi</div>
                    <div className="text-white/60 text-xs">
                      {wifi ? "Home" : "Off"}
                    </div>
                  </div>
                </button>

                {/* Bluetooth */}
                <button
                  onClick={() => setBluetooth(!bluetooth)}
                  className={`p-4 rounded-xl flex flex-col items-start gap-2 transition-colors ${
                    bluetooth ? "bg-blue-500" : "bg-white/10"
                  }`}
                >
                  <svg
                    className="w-6 h-6 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M14.24 12.01l2.32 2.32c.28-.72.44-1.51.44-2.33s-.16-1.59-.43-2.31l-2.33 2.32zm5.29-5.3l-1.26 1.26c.63 1.21.98 2.57.98 4.02s-.36 2.82-.98 4.02l1.26 1.26a9.05 9.05 0 000-10.56zM7.76 12.01L5.44 9.69c-.28.72-.44 1.51-.44 2.33 0 .81.16 1.59.43 2.31l2.33-2.32zm-5.29 5.3l1.26-1.26A7.926 7.926 0 012.75 12c0-1.45.36-2.82.98-4.02L2.47 6.72a9.05 9.05 0 000 10.56zM12 6a5.98 5.98 0 00-4.24 1.76l1.42 1.42A3.99 3.99 0 0112 8c1.1 0 2.11.45 2.83 1.17l1.42-1.42A5.98 5.98 0 0012 6zm0 12a5.98 5.98 0 004.24-1.76l-1.42-1.42A3.99 3.99 0 0112 16c-1.1 0-2.11-.45-2.83-1.17l-1.42 1.42A5.98 5.98 0 0012 18z" />
                  </svg>
                  <div>
                    <div className="text-white text-sm font-medium">
                      Bluetooth
                    </div>
                    <div className="text-white/60 text-xs">
                      {bluetooth ? "On" : "Off"}
                    </div>
                  </div>
                </button>

                {/* AirDrop */}
                <button
                  onClick={() => setAirDrop(!airDrop)}
                  className={`p-4 rounded-xl flex flex-col items-start gap-2 transition-colors ${
                    airDrop ? "bg-blue-500" : "bg-white/10"
                  }`}
                >
                  <svg
                    className="w-6 h-6 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <circle cx="12" cy="12" r="3" />
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
                      opacity="0.5"
                    />
                  </svg>
                  <div>
                    <div className="text-white text-sm font-medium">
                      AirDrop
                    </div>
                    <div className="text-white/60 text-xs">
                      {airDrop ? "Everyone" : "Off"}
                    </div>
                  </div>
                </button>

                {/* Focus Mode */}
                <button
                  onClick={() => setFocusMode(!focusMode)}
                  className={`p-4 rounded-xl flex flex-col items-start gap-2 transition-colors ${
                    focusMode ? "bg-purple-500" : "bg-white/10"
                  }`}
                >
                  <svg
                    className="w-6 h-6 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  <div>
                    <div className="text-white text-sm font-medium">Focus</div>
                    <div className="text-white/60 text-xs">
                      {focusMode ? "On" : "Off"}
                    </div>
                  </div>
                </button>
              </div>

              {/* Dark Mode Toggle */}
              <div className="bg-white/10 rounded-xl p-4 mb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{isDarkMode ? "🌙" : "☀️"}</div>
                    <div>
                      <div className="text-white text-sm font-medium">
                        {isDarkMode ? "Dark Mode" : "Light Mode"}
                      </div>
                      <div className="text-white/60 text-xs">Appearance</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className={`w-12 h-7 rounded-full relative transition-colors ${
                      isDarkMode ? "bg-blue-500" : "bg-gray-500"
                    }`}
                  >
                    <motion.div
                      animate={{ x: isDarkMode ? 20 : 2 }}
                      className="absolute top-1 w-5 h-5 bg-white rounded-full shadow"
                    />
                  </button>
                </div>
              </div>

              {/* Brightness Slider */}
              <div className="bg-white/10 rounded-xl p-4 mb-3">
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-white/70"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 000-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z" />
                  </svg>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={brightness}
                    onChange={(e) => setBrightness(Number(e.target.value))}
                    className="flex-1 h-6 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow"
                  />
                  <svg
                    className="w-6 h-6 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1z" />
                  </svg>
                </div>
              </div>

              {/* Volume Slider */}
              <div className="bg-white/10 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-white/70"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3 9v6h4l5 5V4L7 9H3z" />
                  </svg>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="flex-1 h-6 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow"
                  />
                  <svg
                    className="w-6 h-6 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
