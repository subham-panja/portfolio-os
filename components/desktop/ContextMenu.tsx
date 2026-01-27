"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MenuItem {
  label: string;
  icon?: string;
  shortcut?: string;
  divider?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

interface ContextMenuProps {
  isOpen: boolean;
  position: { x: number; y: number };
  onClose: () => void;
  items?: MenuItem[];
}

const defaultMenuItems: MenuItem[] = [
  { label: "New Folder", icon: "📁", shortcut: "⇧⌘N" },
  { label: "divider", divider: true },
  { label: "Get Info", icon: "ℹ️", shortcut: "⌘I" },
  { label: "divider", divider: true },
  { label: "Change Desktop Background...", icon: "🖼️" },
  { label: "divider", divider: true },
  { label: "Use Stacks", icon: "📚" },
  { label: "Sort By", icon: "↕️" },
  { label: "Clean Up", icon: "✨" },
  { label: "Clean Up By", icon: "🧹" },
  { label: "divider", divider: true },
  { label: "Show View Options", icon: "⚙️", shortcut: "⌘J" },
];

export default function ContextMenu({
  isOpen,
  position,
  onClose,
  items = defaultMenuItems,
}: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  // Calculate adjusted position to keep menu in viewport
  const getAdjustedPosition = () => {
    if (typeof window === "undefined") return position;

    const menuWidth = 220;
    const menuHeight = items.length * 28 + 16; // Approximate height

    let adjustedX = position.x;
    let adjustedY = position.y;

    // Adjust X if menu would overflow right edge
    if (position.x + menuWidth > window.innerWidth) {
      adjustedX = window.innerWidth - menuWidth - 10;
    }

    // Adjust Y if menu would overflow bottom edge
    if (position.y + menuHeight > window.innerHeight) {
      adjustedY = window.innerHeight - menuHeight - 10;
    }

    return { x: adjustedX, y: adjustedY };
  };

  const adjustedPosition = getAdjustedPosition();

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleScroll = () => onClose();

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("scroll", handleScroll, true);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("scroll", handleScroll, true);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.1 }}
          className="fixed z-[9999]"
          style={{
            left: adjustedPosition.x,
            top: adjustedPosition.y,
          }}
        >
          <div className="bg-gray-800/95 backdrop-blur-xl rounded-lg shadow-2xl border border-white/20 py-1 min-w-[220px] overflow-hidden">
            {items.map((item, index) => {
              if (item.divider) {
                return (
                  <div
                    key={`divider-${index}`}
                    className="my-1 h-px bg-white/10"
                  />
                );
              }

              return (
                <button
                  key={item.label}
                  onClick={() => {
                    item.onClick?.();
                    onClose();
                  }}
                  disabled={item.disabled}
                  className={`
                                        w-full px-3 py-1.5 flex items-center justify-between gap-3
                                        text-left text-sm transition-colors
                                        ${
                                          item.disabled
                                            ? "text-white/30 cursor-not-allowed"
                                            : "text-white/90 hover:bg-blue-500 hover:text-white"
                                        }
                                    `}
                >
                  <div className="flex items-center gap-2">
                    {item.icon && (
                      <span className="text-xs w-4 text-center">
                        {item.icon}
                      </span>
                    )}
                    <span>{item.label}</span>
                  </div>
                  {item.shortcut && (
                    <span className="text-white/40 text-xs">
                      {item.shortcut}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
