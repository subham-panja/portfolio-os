"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";

export default function TechStackApp() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <h2 className="text-lg font-semibold text-white mb-2">
        Technical Skills
      </h2>

      {skills.map((category, catIndex) => (
        <motion.div
          key={category.category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: catIndex * 0.1 }}
          className="glass rounded-xl p-4"
        >
          {/* Category Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-accent-purple/20 flex items-center justify-center text-xl">
              {category.icon}
            </div>
            <h3 className="font-semibold text-white">{category.category}</h3>
          </div>

          {/* Skills Grid */}
          <div className="flex flex-wrap gap-2">
            {category.items.map((skill, skillIndex) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: catIndex * 0.1 + skillIndex * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-accent/20 to-accent-purple/20 text-white/90 text-sm font-medium border border-white/10 hover:border-accent/50 transition-colors cursor-default"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
