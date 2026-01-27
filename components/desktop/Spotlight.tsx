"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { apps, skills, projects, experiences, AppDefinition } from "@/lib/data";

interface SpotlightProps {
  isOpen: boolean;
  onClose: () => void;
  onAppClick: (app: AppDefinition) => void;
}

interface SearchResult {
  type: "app" | "skill" | "project" | "experience" | "action";
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  color?: string;
  action?: () => void;
}

export default function Spotlight({
  isOpen,
  onClose,
  onAppClick,
}: SpotlightProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Build search results
  const getSearchResults = (): SearchResult[] => {
    if (!query.trim()) {
      // Show recent apps when no query
      return apps.map((app) => ({
        type: "app" as const,
        id: app.id,
        title: app.name,
        subtitle: "App",
        icon: app.icon,
        color: app.color,
        action: () => {
          onAppClick(app);
          onClose();
        },
      }));
    }

    const q = query.toLowerCase();
    const results: SearchResult[] = [];

    // Search apps
    apps.forEach((app) => {
      if (app.name.toLowerCase().includes(q)) {
        results.push({
          type: "app",
          id: app.id,
          title: app.name,
          subtitle: "App",
          icon: app.icon,
          color: app.color,
          action: () => {
            onAppClick(app);
            onClose();
          },
        });
      }
    });

    // Search skills
    skills.forEach((skillCategory) => {
      skillCategory.items.forEach((skill) => {
        if (skill.toLowerCase().includes(q)) {
          results.push({
            type: "skill",
            id: `skill-${skill}`,
            title: skill,
            subtitle: skillCategory.category,
            icon: skillCategory.icon,
            action: () => {
              const techStackApp = apps.find((a) => a.type === "techstack");
              if (techStackApp) onAppClick(techStackApp);
              onClose();
            },
          });
        }
      });
    });

    // Search projects
    projects.forEach((project) => {
      if (
        project.name.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q)
      ) {
        results.push({
          type: "project",
          id: project.id,
          title: project.name,
          subtitle: project.impact,
          icon: project.icon,
          color: project.color,
          action: () => {
            const projectsApp = apps.find((a) => a.type === "projects");
            if (projectsApp) onAppClick(projectsApp);
            onClose();
          },
        });
      }
    });

    // Search experiences
    experiences.forEach((exp) => {
      if (
        exp.company.toLowerCase().includes(q) ||
        exp.role.toLowerCase().includes(q)
      ) {
        results.push({
          type: "experience",
          id: exp.id,
          title: exp.company,
          subtitle: exp.role,
          icon: "💼",
          action: () => {
            const expApp = apps.find((a) => a.type === "experience");
            if (expApp) onAppClick(expApp);
            onClose();
          },
        });
      }
    });

    return results.slice(0, 8); // Limit results
  };

  const results = getSearchResults();

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        results[selectedIndex]?.action?.();
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose]);

  // Reset selection when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: "-50%", y: "-60%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, scale: 0.95, x: "-50%", y: "-60%" }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            style={{ x: "-50%", y: "-50%" }}
            className="fixed top-1/2 left-1/2 w-[600px] max-w-[90vw] z-50"
          >
            <div className="bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
                <svg
                  className="w-5 h-5 text-white/50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search apps, skills, projects..."
                  className="flex-1 bg-transparent text-white text-lg outline-none placeholder:text-white/40"
                />
                <kbd className="px-2 py-1 bg-white/10 rounded text-xs text-white/50">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-[400px] overflow-auto">
                {results.length > 0 ? (
                  <div className="p-2">
                    {results.map((result, index) => (
                      <motion.button
                        key={result.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                        onClick={result.action}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left ${
                          selectedIndex === index
                            ? "bg-white/10"
                            : "hover:bg-white/5"
                        }`}
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                          style={{
                            backgroundColor: result.color || "#666",
                          }}
                        >
                          {result.icon}
                        </div>
                        <div className="flex-1">
                          <div className="text-white font-medium">
                            {result.title}
                          </div>
                          {result.subtitle && (
                            <div className="text-white/50 text-sm">
                              {result.subtitle}
                            </div>
                          )}
                        </div>
                        <div className="text-white/30 text-xs uppercase">
                          {result.type}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-white/40">
                    No results found for &quot;{query}&quot;
                  </div>
                )}
              </div>

              {/* Footer hint */}
              <div className="px-5 py-3 border-t border-white/10 flex items-center justify-between text-xs text-white/40">
                <span>
                  <kbd className="px-1.5 py-0.5 bg-white/10 rounded mr-1">
                    ↑
                  </kbd>
                  <kbd className="px-1.5 py-0.5 bg-white/10 rounded">↓</kbd> to
                  navigate
                </span>
                <span>
                  <kbd className="px-1.5 py-0.5 bg-white/10 rounded">↵</kbd> to
                  open
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
