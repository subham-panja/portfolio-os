"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { apps, AppDefinition } from "@/lib/data";
import TabletLockScreen from "./TabletLockScreen";

// App content components
import AboutApp from "../apps/AboutApp";
import ExperienceApp from "../apps/ExperienceApp";
import ProjectsApp from "../apps/ProjectsApp";
import TechStackApp from "../apps/TechStackApp";
import ContactApp from "../apps/ContactApp";
import TerminalApp from "../apps/TerminalApp";
import SettingsApp from "../apps/SettingsApp";
import CalendarApp from "../apps/CalendarApp";
import NotesApp from "../apps/NotesApp";
import MailApp from "../apps/MailApp";
import PhotosApp from "../apps/PhotosApp";
import CalculatorApp from "../apps/CalculatorApp";
import WeatherApp from "../apps/WeatherApp";
import GameCenterApp from "../apps/GameCenterApp";
import { useThemeStore } from "@/lib/store/useThemeStore";

export default function TabletScreen() {
  const [isLocked, setIsLocked] = useState(true);
  const [openApp, setOpenApp] = useState<AppDefinition | null>(null);
  const { wallpaper } = useThemeStore();

  const handleAppClick = (app: AppDefinition) => {
    setOpenApp(app);
  };

  const handleCloseApp = () => {
    setOpenApp(null);
  };

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
      case "terminal":
        return <TerminalApp />;
      case "settings":
        return <SettingsApp />;
      case "calendar":
        return <CalendarApp />;
      case "notes":
        return <NotesApp />;
      case "mail":
        return <MailApp />;
      case "photos":
        return <PhotosApp />;
      case "calculator":
        return <CalculatorApp />;
      case "weather":
        return <WeatherApp />;
      case "game":
        return <GameCenterApp />;
      default:
        return <div className="p-8 text-white/70">Coming soon...</div>;
    }
  };

  return (
    <>
      {/* Lock Screen */}
      <AnimatePresence>
        {isLocked && <TabletLockScreen onUnlock={() => setIsLocked(false)} />}
      </AnimatePresence>

      <div
        className="h-screen w-screen overflow-hidden relative"
        style={{
          backgroundImage: `url('${wallpaper}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* iPadOS Status Bar */}
        <div className="fixed top-0 left-0 right-0 z-50 px-8 py-3 flex items-center justify-between">
          {/* Left - Time */}
          <div className="text-white text-sm font-semibold">
            {new Date().toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </div>

          {/* Center - Date (iPad style) */}
          <div className="text-white/80 text-sm">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </div>

          {/* Right - Status Icons */}
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
              <path d="M12 3C6.95 3 3.15 4.85 0 7.23L12 22 24 7.25C20.85 4.87 17.05 3 12 3Z" />
            </svg>
            <div className="flex items-center">
              <div className="w-7 h-3.5 border-2 border-white rounded-sm relative">
                <div
                  className="absolute inset-0.5 bg-green-500 rounded-sm"
                  style={{ width: "85%" }}
                />
              </div>
              <div className="w-0.5 h-2 bg-white rounded-r-sm ml-0.5" />
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="pt-16 pb-32 px-12 h-full overflow-auto">
          {/* Welcome Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
              Subham Panja
            </h1>
            <p className="text-white/70 text-lg">
              Senior Software Engineer & Technical Lead
            </p>
          </motion.div>

          {/* iPad App Grid - 5 columns for tablet */}
          <div className="grid grid-cols-5 gap-8 max-w-3xl mx-auto">
            {apps.map((app, index) => (
              <motion.button
                key={app.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.08 }}
                onClick={() => handleAppClick(app)}
                className="flex flex-col items-center gap-2"
              >
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  className="w-20 h-20 rounded-[22px] flex items-center justify-center text-4xl shadow-xl"
                  style={{ backgroundColor: app.color }}
                >
                  {app.icon}
                </motion.div>
                <span className="text-sm text-white/90 font-medium drop-shadow">
                  {app.name}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Page Indicator */}
          <div className="flex justify-center gap-2 mt-10">
            <div className="w-2 h-2 rounded-full bg-white" />
            <div className="w-2 h-2 rounded-full bg-white/30" />
          </div>
        </div>

        {/* iPadOS Dock */}
        <div className="fixed bottom-6 left-0 right-0 z-40 flex justify-center">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.3,
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
          >
            <div className="glass-dock rounded-3xl px-4 py-3 flex items-center gap-4">
              {apps.slice(0, 4).map((app) => (
                <motion.button
                  key={app.id}
                  onClick={() => handleAppClick(app)}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg"
                  style={{ backgroundColor: app.color }}
                >
                  {app.icon}
                </motion.button>
              ))}

              {/* Separator */}
              <div className="w-px h-12 bg-white/20" />

              {/* Recent App */}
              <motion.button
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg bg-gray-600"
              >
                📁
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Open App Screen - Split View Style for iPad */}
        <AnimatePresence>
          {openApp && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-4 z-50 glass-window rounded-3xl overflow-hidden flex flex-col shadow-2xl"
            >
              {/* App Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <button
                  onClick={handleCloseApp}
                  className="text-accent text-base font-medium flex items-center gap-1"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Home
                </button>
                <div className="flex items-center gap-3">
                  <span
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-lg"
                    style={{ backgroundColor: openApp.color }}
                  >
                    {openApp.icon}
                  </span>
                  <span className="font-semibold text-white text-lg">
                    {openApp.name}
                  </span>
                </div>
                <div className="w-16" />
              </div>

              {/* App Content */}
              <div className="flex-1 overflow-auto">
                {renderAppContent(openApp)}
              </div>

              {/* Home Indicator */}
              <div className="py-3">
                <div className="w-36 h-1 bg-white/30 rounded-full mx-auto" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
