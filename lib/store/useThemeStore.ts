import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeState {
  wallpaper: string;
  brightness: number;
  isDarkMode: boolean;
  accentColor: string;
  setWallpaper: (wallpaper: string) => void;
  setBrightness: (brightness: number) => void;
  toggleDarkMode: () => void;
  setAccentColor: (color: string) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      wallpaper: "/wallpaper-desktop.png",
      brightness: 100,
      isDarkMode: true,
      accentColor: "#0A84FF",
      setWallpaper: (wallpaper) => set({ wallpaper }),
      setBrightness: (brightness) => set({ brightness }),
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      setAccentColor: (accentColor) => set({ accentColor }),
    }),
    {
      name: "theme-storage",
    },
  ),
);
