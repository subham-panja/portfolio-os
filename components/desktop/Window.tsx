"use client";

import {
  motion,
  useDragControls,
  PanInfo,
  AnimatePresence,
} from "framer-motion";
import { useState, useRef, ReactNode } from "react";

interface WindowProps {
  id: string;
  title: string;
  icon: string;
  children: ReactNode;
  onClose: () => void;
  onMinimize?: () => void;
  isActive: boolean;
  onFocus: () => void;
  isMinimized?: boolean;
  initialPosition?: { x: number; y: number };
  initialSize?: { width: number; height: number };
}

export default function Window({
  id,
  title,
  icon,
  children,
  onClose,
  onMinimize,
  isActive,
  onFocus,
  isMinimized = false,
  initialPosition = { x: 100, y: 80 },
  initialSize = { width: 700, height: 500 },
}: WindowProps) {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const [isMaximized, setIsMaximized] = useState(false);
  const [snapPreview, setSnapPreview] = useState<
    "left" | "right" | "top" | null
  >(null);
  const dragControls = useDragControls();
  const constraintsRef = useRef<HTMLDivElement>(null);

  const handleMaximize = () => {
    if (isMaximized) {
      setPosition(initialPosition);
      setSize(initialSize);
    } else {
      setPosition({ x: 0, y: 28 });
      setSize({ width: window.innerWidth, height: window.innerHeight - 28 });
    }
    setIsMaximized(!isMaximized);
  };

  return (
    <>
      {/* Drag constraints container */}
      <div
        ref={constraintsRef}
        className="fixed inset-0 pointer-events-none"
        style={{ top: 28 }}
      />

      {/* Snap Preview Overlay */}
      <AnimatePresence>
        {snapPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-2xl z-10 pointer-events-none"
            style={{
              top: snapPreview === "top" ? 36 : 36,
              left: snapPreview === "right" ? "50%" : 8,
              right: snapPreview === "left" ? "50%" : 8,
              bottom: 8,
              width: snapPreview === "top" ? "auto" : "calc(50% - 12px)",
            }}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={
          isMinimized
            ? {
                scale: 0,
                opacity: 0,
                x: "50%",
                y: "100%",
                transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }, // Apple-like ease
              }
            : {
                scale: 1,
                opacity: 1,
                x: position.x,
                y: position.y,
                width: size.width,
                height: size.height,
              }
        }
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        drag={!isMaximized && !isMinimized}
        dragControls={dragControls}
        dragListener={false}
        dragMomentum={false}
        dragElastic={0}
        onDrag={(_, info) => {
          if (isMaximized) return;

          const { x, y } = info.point;
          const screenWidth = window.innerWidth;
          const threshold = 20;

          if (y < 40) {
            setSnapPreview("top");
          } else if (x < threshold) {
            setSnapPreview("left");
          } else if (x > screenWidth - threshold) {
            setSnapPreview("right");
          } else {
            setSnapPreview(null);
          }
        }}
        onDragEnd={(_, info: PanInfo) => {
          if (snapPreview) {
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;
            const menuBarHeight = 28;
            const gap = 8;

            if (snapPreview === "top") {
              setPosition({ x: gap, y: menuBarHeight + gap });
              setSize({
                width: screenWidth - gap * 2,
                height: screenHeight - menuBarHeight - gap * 2,
              });
              setIsMaximized(true);
            } else if (snapPreview === "left") {
              setPosition({ x: gap, y: menuBarHeight + gap });
              setSize({
                width: screenWidth / 2 - gap * 1.5,
                height: screenHeight - menuBarHeight - gap * 2,
              });
              setIsMaximized(false);
            } else if (snapPreview === "right") {
              setPosition({
                x: screenWidth / 2 + gap * 0.5,
                y: menuBarHeight + gap,
              });
              setSize({
                width: screenWidth / 2 - gap * 1.5,
                height: screenHeight - menuBarHeight - gap * 2,
              });
              setIsMaximized(false);
            }
            setSnapPreview(null);
          } else {
            setPosition((prev) => ({
              x: prev.x + info.offset.x,
              y: prev.y + info.offset.y,
            }));
          }
        }}
        onClick={onFocus}
        className={`fixed glass-window rounded-xl overflow-hidden shadow-2xl flex flex-col ${
          isActive ? "z-30" : "z-20"
        }`}
        style={{
          boxShadow: isActive
            ? "0 25px 50px -12px rgba(0, 0, 0, 0.7)"
            : "0 10px 30px -15px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Window Header */}
        <div
          className="window-header h-12 flex items-center justify-between px-4 bg-black/20 border-b border-white/10"
          onPointerDown={(e) => {
            if (!isMaximized) {
              dragControls.start(e);
            }
          }}
        >
          {/* Traffic lights */}
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="traffic-light traffic-light-red hover:brightness-110 transition-all group relative"
            >
              <span className="absolute inset-0 flex items-center justify-center text-[8px] text-black/70 opacity-0 group-hover:opacity-100">
                ✕
              </span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMinimize?.();
              }}
              className="traffic-light traffic-light-yellow hover:brightness-110 transition-all group relative"
            >
              <span className="absolute inset-0 flex items-center justify-center text-[8px] text-black/70 opacity-0 group-hover:opacity-100">
                −
              </span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleMaximize();
              }}
              className="traffic-light traffic-light-green hover:brightness-110 transition-all group relative"
            >
              <span className="absolute inset-0 flex items-center justify-center text-[8px] text-black/70 opacity-0 group-hover:opacity-100">
                ⤢
              </span>
            </button>
          </div>

          {/* Window title */}
          <div className="flex items-center gap-2 text-sm text-white/90">
            <span>{icon}</span>
            <span>{title}</span>
          </div>

          {/* Spacer */}
          <div className="w-16" />
        </div>

        {/* Window Content */}
        <div className="flex-1 overflow-auto">{children}</div>
      </motion.div>
    </>
  );
}
