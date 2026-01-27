import { create } from "zustand";

export type IslandSize = "default" | "compact" | "expanded" | "ultra";

interface DynamicIslandState {
  size: IslandSize;
  content: React.ReactNode | null;
  isExpanded: boolean;
  setSize: (size: IslandSize) => void;
  setContent: (content: React.ReactNode | null) => void;
  expand: () => void;
  collapse: () => void;
}

export const useDynamicIslandStore = create<DynamicIslandState>((set) => ({
  size: "default",
  content: null,
  isExpanded: false,
  setSize: (size) => set({ size }),
  setContent: (content) => set({ content }),
  expand: () => set({ size: "expanded", isExpanded: true }),
  collapse: () => set({ size: "default", isExpanded: false, content: null }),
}));
