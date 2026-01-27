"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import StatusBar from "./StatusBar";
import MobileDock from "./MobileDock";
import AppIcon from "./AppIcon";
import AppScreen from "./AppScreen";
import LockScreen from "./LockScreen";
import { apps, AppDefinition } from "@/lib/data";

// App content components
import AboutApp from "../apps/AboutApp";
import ExperienceApp from "../apps/ExperienceApp";
import ProjectsApp from "../apps/ProjectsApp";
import TechStackApp from "../apps/TechStackApp";
import ContactApp from "../apps/ContactApp";

export default function HomeScreen() {
  const [isLocked, setIsLocked] = useState(true);
  const [openApp, setOpenApp] = useState<AppDefinition | null>(null);

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
      default:
        return <div className="p-8 text-white/70">Coming soon...</div>;
    }
  };

  return (
    <>
      {/* Lock Screen */}
      <AnimatePresence>
        {isLocked && <LockScreen onUnlock={() => setIsLocked(false)} />}
      </AnimatePresence>

      <div
        className="h-screen w-screen overflow-hidden"
        style={{
          backgroundImage: "url('/wallpaper-mobile.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Status Bar */}
        <StatusBar />

        {/* App Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="pt-20 px-6 pb-32 h-full overflow-auto"
        >
          {/* Welcome Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <h1 className="text-2xl font-bold text-white">Subham Panja</h1>
            <p className="text-white/60 text-sm">Senior Software Engineer</p>
          </motion.div>

          {/* App Grid - 4 columns */}
          <div className="grid grid-cols-4 gap-6 gap-y-6">
            {apps.map((app, index) => (
              <AppIcon
                key={app.id}
                app={app}
                onClick={() => handleAppClick(app)}
                index={index}
              />
            ))}
          </div>
        </motion.div>

        {/* Page Dots - Fixed position above dock */}
        <div className="fixed bottom-28 left-0 right-0 flex justify-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-white" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
        </div>

        {/* Mobile Dock */}
        <MobileDock apps={apps} onAppClick={handleAppClick} />

        {/* Open App Screen */}
        <AnimatePresence>
          {openApp && (
            <AppScreen app={openApp} onClose={handleCloseApp}>
              {renderAppContent(openApp)}
            </AppScreen>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
