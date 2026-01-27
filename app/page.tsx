"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useDeviceDetect } from "@/hooks/useDeviceDetect";
import Desktop from "@/components/desktop/Desktop";
import HomeScreen from "@/components/mobile/HomeScreen";
import TabletScreen from "@/components/tablet/TabletScreen";
import BootAnimation from "@/components/shared/BootAnimation";

export default function Home() {
  const { deviceType, isLoaded } = useDeviceDetect();
  const [isBooted, setIsBooted] = useState(false);

  // Show boot animation first
  if (!isBooted) {
    return (
      <AnimatePresence>
        <BootAnimation onComplete={() => setIsBooted(true)} />
      </AnimatePresence>
    );
  }

  // Show loading state while detecting device
  if (!isLoaded) {
    return (
      <div className="h-screen w-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent-purple flex items-center justify-center text-3xl animate-pulse">
            💻
          </div>
          <div className="text-white/60 text-sm">Loading Portfolio OS...</div>
        </div>
      </div>
    );
  }

  // Render based on device type
  switch (deviceType) {
    case "mobile":
      return <HomeScreen />;
    case "tablet":
      return <TabletScreen />;
    case "desktop":
    default:
      return <Desktop />;
  }
}
