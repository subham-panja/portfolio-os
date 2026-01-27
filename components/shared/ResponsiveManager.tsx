"use client";

import { useEffect, useState } from "react";
import Desktop from "@/components/desktop/Desktop";
import HomeScreen from "@/components/mobile/HomeScreen";
import TabletScreen from "@/components/tablet/TabletScreen";

type DeviceType = "mobile" | "tablet" | "desktop";

interface ResponsiveManagerProps {
  initialDeviceType: DeviceType;
}

export default function ResponsiveManager({
  initialDeviceType,
}: ResponsiveManagerProps) {
  // Initialize with server-detected device type
  const [deviceType, setDeviceType] = useState<DeviceType>(initialDeviceType);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      // Update device type based on breakpoints matching hooks/useDeviceDetect.ts
      if (width < 768) {
        setDeviceType("mobile");
      } else if (width >= 768 && width < 1024) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    };

    // Add listner
    window.addEventListener("resize", handleResize);

    // Initial check (in case window size changed between server render and hydration)
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
