"use client";

import { motion } from "framer-motion";
import { experiences } from "@/lib/data";
import { useState } from "react";

export default function ExperienceApp() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="flex h-full">
      {/* Finder-style Sidebar */}
      <div className="w-48 bg-black/30 border-r border-white/10 p-3 hidden md:block">
        <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3 px-2">
          Locations
        </h3>
        <div className="space-y-1">
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-accent/20 text-accent text-sm">
            <span>📁</span> Experience
          </div>
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-md text-white/70 text-sm hover:bg-white/10">
            <span>⭐</span> Highlights
          </div>
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-md text-white/70 text-sm hover:bg-white/10">
            <span>📅</span> Timeline
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 overflow-auto space-y-4">
        <h2 className="text-lg font-semibold text-white mb-4">
          Work Experience
        </h2>

        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelectedId(selectedId === exp.id ? null : exp.id)}
            className={`glass rounded-xl p-4 cursor-pointer transition-all ${
              selectedId === exp.id ? "ring-2 ring-accent" : ""
            }`}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent-orange/20 flex items-center justify-center text-xl">
                  💼
                </div>
                <div>
                  <h3 className="font-semibold text-white">{exp.company}</h3>
                  <p className="text-sm text-accent">{exp.role}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-white/60">{exp.period}</div>
                <div className="text-xs text-white/40">{exp.location}</div>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-white/70 mb-3">{exp.description}</p>

            {/* Expandable Highlights */}
            <motion.div
              initial={false}
              animate={{ height: selectedId === exp.id ? "auto" : 0 }}
              className="overflow-hidden"
            >
              <div className="pt-3 border-t border-white/10 space-y-2">
                <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                  Key Achievements
                </h4>
                <ul className="space-y-1.5">
                  {exp.highlights.map((highlight, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-white/80"
                    >
                      <span className="text-accent mt-0.5">▸</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Expand indicator */}
            <div className="flex justify-center mt-2">
              <motion.div
                animate={{ rotate: selectedId === exp.id ? 180 : 0 }}
                className="text-white/40 text-xs"
              >
                ▼
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
