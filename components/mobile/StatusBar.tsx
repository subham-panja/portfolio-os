"use client";

import { useState, useEffect } from "react";

export default function StatusBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: false,
        }),
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-6 pt-3 pb-2">
      {/* Status bar content */}
      <div className="flex items-center justify-between text-white text-sm font-semibold">
        {/* Left - Time */}
        <span className="w-16">{time}</span>

        {/* Center - Dynamic Island */}
        <div className="dynamic-island w-28 h-8 flex items-center justify-center">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
          </div>
        </div>

        {/* Right - Icons */}
        <div className="flex items-center gap-1 w-16 justify-end">
          {/* Signal */}
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M2 22h2V12H2v10zm4 0h2V9H6v13zm4 0h2V6h-2v16zm4 0h2V3h-2v19zm4 0h2V0h-2v22z" />
          </svg>
          {/* Wifi */}
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 3C6.95 3 3.15 4.85 0 7.23L12 22 24 7.25C20.85 4.87 17.05 3 12 3Z" />
          </svg>
          {/* Battery */}
          <div className="flex items-center">
            <div className="w-6 h-3 border border-white/80 rounded-sm relative">
              <div
                className="absolute inset-0.5 bg-green-500 rounded-sm"
                style={{ width: "80%" }}
              />
            </div>
            <div className="w-0.5 h-1.5 bg-white/80 rounded-r-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}
