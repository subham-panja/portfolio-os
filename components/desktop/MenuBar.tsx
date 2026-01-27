"use client";

import { useState, useEffect } from "react";
import { Battery, Wifi, Search, Command } from "lucide-react";

// Simple Apple Logo component since Lucide doesn't have one
const Apple = ({
  size = 16,
  fill = "currentColor",
}: {
  size?: number;
  fill?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 14 17"
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.7706 5.86016C11.7215 4.31885 12.9691 3.23842 13 3.2185C12.9818 3.20977 11.9686 2.8542 10.8711 3.32815C10.0278 3.66551 9.42083 4.22543 9.42083 4.22543C9.42083 4.22543 8.78917 3.51854 7.625 3.51854C6.46797 3.51854 5.37877 4.19553 4.88789 4.19553C4.39453 4.19553 3.25703 3.42885 2.12747 4.93557C0.165234 7.55018 1.6375 11.4588 3.54284 14.2374C4.47513 15.597 5.5681 16.9493 7.0224 16.9493C8.43464 16.9493 8.74753 16.0399 10.428 16.0399C12.1134 16.0399 12.4418 16.9493 13.916 16.9493C15.4293 16.9493 16.3686 15.5671 17.2947 14.1975C17.9626 13.2084 18.2392 12.5693 18.2392 12.5693C18.2392 12.5693 15.3444 11.465 15.3444 8.71008C15.3444 6.39833 17.3308 5.25354 17.4093 5.21243C17.4018 5.20744 15.658 3.36427 13.1207 4.54966L11.7706 5.86016Z"
      clipRule="evenodd"
      transform="scale(0.7) translate(1, 1)"
    />
    <path d="M11.9079 2.4568C12.6366 1.57018 12.4821 0.655883 12.4821 0.655883C12.4821 0.655883 11.7719 0.675805 10.9701 1.62624C10.2241 2.50284 10.4284 3.48684 10.4284 3.48684C10.4284 3.48684 11.2319 3.29253 11.9079 2.4568Z" />
  </svg>
);

interface MenuBarProps {
  activeApp: string;
  onControlCenterClick?: () => void;
  onNotificationCenterClick?: () => void;
}

export default function MenuBar({
  activeApp,
  onControlCenterClick,
  onNotificationCenterClick,
}: MenuBarProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Format date similar to macOS: "Tue 9 Jan 9:41 AM"
  const dateString = time.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const timeString = time.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <header className="fixed top-0 left-0 right-0 h-7 glass-menubar z-[100] px-4 flex items-center justify-between text-xs select-none">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <button className="text-white hover:text-white/80 transition-colors">
          <Apple size={14} fill="white" />
        </button>
        <span className="font-semibold text-white">{activeApp}</span>

        {/* Simplified Menu Items - just visual for now */}
        <div className="hidden sm:flex items-center gap-4 text-white/90">
          <span className="hover:text-white cursor-default">File</span>
          <span className="hover:text-white cursor-default">Edit</span>
          <span className="hover:text-white cursor-default">View</span>
          <span className="hover:text-white cursor-default">Go</span>
          <span className="hover:text-white cursor-default">Window</span>
          <span className="hover:text-white cursor-default">Help</span>
        </div>
      </div>

      {/* Right side - System Tray */}
      <div className="flex items-center gap-3">
        {/* Control Center Toggle Area */}
        <button
          onClick={onControlCenterClick}
          className="flex items-center gap-3 px-2 py-0.5 rounded hover:bg-white/10 transition-colors"
        >
          <Battery size={16} className="text-white transform rotate-90" />
          <Wifi size={14} className="text-white" />
          <Search size={14} className="text-white" />
        </button>

        {/* Clock / Notification Center Toggle */}
        <button
          onClick={onNotificationCenterClick}
          className="flex items-center gap-2 px-2 py-0.5 rounded hover:bg-white/10 transition-colors text-white font-medium"
        >
          <span>{dateString}</span>
          <span>{timeString}</span>
        </button>
      </div>
    </header>
  );
}
