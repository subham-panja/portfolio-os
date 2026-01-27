"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ClockWidget() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  // Calculate rotation angles
  const hourRotation = (hours % 12) * 30 + minutes * 0.5; // 360/12 = 30 degrees per hour
  const minuteRotation = minutes * 6 + seconds * 0.1; // 360/60 = 6 degrees per minute
  const secondRotation = seconds * 6; // 360/60 = 6 degrees per second

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gray-900/60 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-white/10 w-52"
    >
      {/* Analog Clock */}
      <div className="relative w-full aspect-square mb-3">
        {/* Clock face */}
        <div className="absolute inset-0 rounded-full bg-gray-800 border-2 border-white/10 shadow-inner">
          {/* Hour markers */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white/40"
              style={{
                width: "2px",
                height: "8px",
                left: "50%",
                top: "4px",
                transformOrigin: "50% calc(50% + (50% - 4px))", // Center pivot
                transform: `translateX(-50%) rotate(${i * 30}deg)`,
                marginTop: "0",
              }}
            />
          ))}

          {/* Clock center for hands pivot */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Hour hand */}
            <div
              className="absolute w-1.5 h-[30%] bg-white rounded-full origin-bottom"
              style={{
                bottom: "50%",
                transform: `rotate(${hourRotation}deg)`,
              }}
            />

            {/* Minute hand */}
            <div
              className="absolute w-1 h-[40%] bg-white rounded-full origin-bottom"
              style={{
                bottom: "50%",
                transform: `rotate(${minuteRotation}deg)`,
              }}
            />

            {/* Second hand */}
            <motion.div
              className="absolute w-0.5 h-[45%] bg-orange-500 rounded-full origin-bottom"
              style={{
                bottom: "50%",
                transform: `rotate(${secondRotation}deg)`,
              }}
            />

            {/* Center dot */}
            <div className="absolute w-3 h-3 bg-orange-500 rounded-full z-10 border-2 border-gray-800" />
          </div>
        </div>
      </div>

      {/* Digital time */}
      <div className="text-center">
        <div className="text-2xl font-light text-white tracking-wide">
          {time.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </div>
        <div className="text-sm text-white/60">
          {time.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          })}
        </div>
      </div>
    </motion.div>
  );
}
