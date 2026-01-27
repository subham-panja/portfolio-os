"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import MenuBar from "./MenuBar";
import Dock from "./Dock";
import Window from "./Window";
import DesktopIcon from "./DesktopIcon";
import Spotlight from "./Spotlight";
import ControlCenter from "./ControlCenter";
import MissionControl from "./MissionControl";
import ClockWidget from "./ClockWidget";
import ContextMenu from "./ContextMenu";
import NotificationCenter from "./NotificationCenter";
import { apps, AppDefinition } from "@/lib/data";

// App content components
import AboutApp from "../apps/AboutApp";
import ExperienceApp from "../apps/ExperienceApp";
import ProjectsApp from "../apps/ProjectsApp";
import TechStackApp from "../apps/TechStackApp";
import ContactApp from "../apps/ContactApp";

interface OpenWindow {
  app: AppDefinition;
  position: { x: number; y: number };
}

export default function Desktop() {
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);
  const [minimizedWindows, setMinimizedWindows] = useState<string[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [windowCounter, setWindowCounter] = useState(0);
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] =
    useState(false);
  const [isMissionControlOpen, setIsMissionControlOpen] = useState(false);

  // Context Menu State
  const [contextMenu, setContextMenu] = useState({
    isOpen: false,
    position: { x: 0, y: 0 },
  });

  // Calculate centered window position
  const getCenteredPosition = (offset: number) => {
    const windowWidth = 700;
    const windowHeight = 500;
    const menuBarHeight = 28;

    const centerX =
      (typeof window !== "undefined" ? window.innerWidth : 1200) / 2 -
      windowWidth / 2;
    const centerY =
      ((typeof window !== "undefined" ? window.innerHeight : 800) -
        menuBarHeight) /
        2 -
      windowHeight / 2 +
      menuBarHeight;

    return {
      x: centerX + offset,
      y: centerY + offset,
    };
  };

  const handleAppClick = (app: AppDefinition) => {
    // Check if window is minimized
    if (minimizedWindows.includes(app.id)) {
      setMinimizedWindows((prev) => prev.filter((id) => id !== app.id));
      setActiveWindowId(app.id);
      return;
    }

    // Check if window is already open
    const existingWindow = openWindows.find((w) => w.app.id === app.id);
    if (existingWindow) {
      setActiveWindowId(app.id);
      return;
    }

    // Calculate centered position with stagger offset
    const offset = windowCounter * 20;
    const newWindow: OpenWindow = {
      app,
      position: getCenteredPosition(offset),
    };

    setOpenWindows((prev) => [...prev, newWindow]);
    setActiveWindowId(app.id);
    setWindowCounter((prev) => (prev + 1) % 10);
  };

  const handleMinimizeWindow = (appId: string) => {
    setMinimizedWindows((prev) => [...prev, appId]);
    setActiveWindowId(null);
  };

  const handleCloseWindow = (appId: string) => {
    setOpenWindows((prev) => prev.filter((w) => w.app.id !== appId));
    if (activeWindowId === appId) {
      const remaining = openWindows.filter((w) => w.app.id !== appId);
      setActiveWindowId(
        remaining.length > 0 ? remaining[remaining.length - 1].app.id : null,
      );
    }
  };

  // Keyboard shortcuts
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Cmd/Ctrl + K to open Spotlight
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSpotlightOpen(true);
        return;
      }
      // F3 to toggle Mission Control
      if (e.key === "F3") {
        e.preventDefault();
        setIsMissionControlOpen((prev) => !prev);
        return;
      }
      // Esc to close overlays or active window
      if (e.key === "Escape") {
        if (contextMenu.isOpen) {
          setContextMenu({ ...contextMenu, isOpen: false });
        } else if (isMissionControlOpen) {
          setIsMissionControlOpen(false);
        } else if (isControlCenterOpen) {
          setIsControlCenterOpen(false);
        } else if (isNotificationCenterOpen) {
          setIsNotificationCenterOpen(false);
        } else if (isSpotlightOpen) {
          setIsSpotlightOpen(false);
        } else if (activeWindowId) {
          handleCloseWindow(activeWindowId);
        }
      }
    },
    [
      activeWindowId,
      openWindows,
      isSpotlightOpen,
      isControlCenterOpen,
      isMissionControlOpen,
      contextMenu,
      isNotificationCenterOpen,
    ],
  );

  // Handle Right Click
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      isOpen: true,
      position: { x: e.clientX, y: e.clientY },
    });
  }, []);

  // Close context menu on click
  const handleDesktopClick = () => {
    if (contextMenu.isOpen) {
      setContextMenu({ ...contextMenu, isOpen: false });
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const renderAppContent = (app: AppDefinition) => {
    switch (app.type) {
      case "about":
        return <AboutApp />;
      case "experience":
        return <ExperienceApp />;
      case "projects":
        return <ProjectsApp />;
      case "techstack":
        return <TechStackApp />;
      case "contact":
        return <ContactApp />;
      default:
        return <div className="p-8 text-white/70">Coming soon...</div>;
    }
  };

  const activeAppName =
    openWindows.find((w) => w.app.id === activeWindowId)?.app.name || "Finder";

  return (
    <div
      className="h-screen w-screen overflow-hidden"
      style={{
        backgroundImage: "url('/wallpaper-desktop.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onContextMenu={handleContextMenu}
      onClick={handleDesktopClick}
    >
      {/* Menu Bar */}
      <MenuBar
        activeApp={activeAppName}
        onControlCenterClick={() =>
          setIsControlCenterOpen(!isControlCenterOpen)
        }
        onNotificationCenterClick={() =>
          setIsNotificationCenterOpen(!isNotificationCenterOpen)
        }
      />

      {/* Clock Widget - positioned top-left */}
      <div className="absolute top-10 left-4 pt-4">
        <ClockWidget />
      </div>

      {/* Desktop Icons - positioned top-right like macOS */}
      <div className="absolute top-10 right-4 flex flex-col items-end gap-1 pt-4">
        {apps.map((app, index) => (
          <DesktopIcon
            key={app.id}
            app={app}
            onClick={() => handleAppClick(app)}
            index={index}
          />
        ))}
      </div>

      {/* Windows */}
      <AnimatePresence>
        {openWindows.map((window) => (
          <Window
            key={window.app.id}
            id={window.app.id}
            title={window.app.name}
            icon={window.app.icon}
            onClose={() => handleCloseWindow(window.app.id)}
            onMinimize={() => handleMinimizeWindow(window.app.id)}
            isActive={activeWindowId === window.app.id}
            isMinimized={minimizedWindows.includes(window.app.id)}
            onFocus={() => {
              if (!minimizedWindows.includes(window.app.id)) {
                setActiveWindowId(window.app.id);
              }
            }}
            initialPosition={window.position}
          >
            {renderAppContent(window.app)}
          </Window>
        ))}
      </AnimatePresence>

      {/* Dock */}
      <Dock
        apps={apps}
        onAppClick={handleAppClick}
        openApps={openWindows.map((w) => w.app.id)}
      />

      {/* Spotlight Search */}
      <Spotlight
        isOpen={isSpotlightOpen}
        onClose={() => setIsSpotlightOpen(false)}
        onAppClick={handleAppClick}
      />

      {/* Control Center */}
      <ControlCenter
        isOpen={isControlCenterOpen}
        onClose={() => setIsControlCenterOpen(false)}
      />

      {/* Notification Center */}
      <NotificationCenter
        isOpen={isNotificationCenterOpen}
        onClose={() => setIsNotificationCenterOpen(false)}
      />

      {/* Mission Control */}
      <MissionControl
        isOpen={isMissionControlOpen}
        onClose={() => setIsMissionControlOpen(false)}
        openWindows={openWindows.map((w) => ({
          id: w.app.id,
          title: w.app.name,
          icon: w.app.icon,
          color: w.app.color,
        }))}
        onWindowSelect={(id) => setActiveWindowId(id)}
      />

      {/* Context Menu */}
      <ContextMenu
        isOpen={contextMenu.isOpen}
        position={contextMenu.position}
        onClose={() => setContextMenu({ ...contextMenu, isOpen: false })}
      />
    </div>
  );
}
