"use client";

import { motion } from "framer-motion";
import { profileData } from "@/lib/data";

export default function AboutApp() {
  return (
    <div className="p-6 space-y-8">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        {/* Avatar */}
        <div className="w-28 h-28 mx-auto mb-4 rounded-full bg-gradient-to-br from-accent to-accent-purple flex items-center justify-center text-5xl shadow-lg glow-blue">
          👨‍💻
        </div>

        <h1 className="text-2xl font-bold text-white mb-1">
          {profileData.name}
        </h1>
        <p className="text-accent text-base font-medium">{profileData.title}</p>
      </motion.div>

      {/* Bio */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-5"
      >
        <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">
          About
        </h2>
        <p className="text-white/90 leading-relaxed">{profileData.bio}</p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-3 gap-3"
      >
        {profileData.stats.map((stat, index) => (
          <div key={index} className="glass rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gradient mb-1">
              {stat.value}
            </div>
            <div className="text-xs text-white/60">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Contact Quick Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-2xl p-5 space-y-4"
      >
        <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider">
          Connect
        </h2>

        <a
          href={`mailto:${profileData.email}`}
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-xl">
            📧
          </div>
          <div>
            <div className="text-white font-medium">Email</div>
            <div className="text-white/60 text-sm">{profileData.email}</div>
          </div>
        </a>

        <a
          href={profileData.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-xl">
            💼
          </div>
          <div>
            <div className="text-white font-medium">LinkedIn</div>
            <div className="text-white/60 text-sm">/in/subhampanja</div>
          </div>
        </a>

        <a
          href={profileData.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-xl">
            🐙
          </div>
          <div>
            <div className="text-white font-medium">GitHub</div>
            <div className="text-white/60 text-sm">/subham-panja</div>
          </div>
        </a>

        <a
          href="https://drive.google.com/file/d/1lmHsg8JQ9AZmO3fFjh41Wlq8SOGpifOr/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-xl">
            📄
          </div>
          <div>
            <div className="text-white font-medium">Resume</div>
            <div className="text-white/60 text-sm">View Resume</div>
          </div>
        </a>
      </motion.div>
    </div>
  );
}
