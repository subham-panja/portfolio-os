"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/data";

export default function ProjectsApp() {
  return (
    <div className="p-4 md:p-6">
      <h2 className="text-lg font-semibold text-white mb-4">
        Featured Projects
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="glass rounded-xl overflow-hidden cursor-pointer group"
          >
            {/* Project Header with gradient */}
            <div
              className="h-24 flex items-center justify-center text-5xl relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${project.color}40, ${project.color}20)`,
              }}
            >
              <motion.span
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {project.icon}
              </motion.span>

              {/* Impact badge */}
              <div
                className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold text-white"
                style={{ backgroundColor: project.color }}
              >
                {project.impact}
              </div>
            </div>

            {/* Project Details */}
            <div className="p-4 space-y-3">
              <h3 className="text-lg font-semibold text-white group-hover:text-accent transition-colors">
                {project.name}
              </h3>

              <p className="text-sm text-white/70 line-clamp-2">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded-full text-xs bg-white/10 text-white/70"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
