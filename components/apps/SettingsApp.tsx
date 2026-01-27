"use client";

import { useThemeStore } from "@/lib/store/useThemeStore";

const wallpapers = [
  { name: "Default", url: "/wallpaper-desktop.png" },
  {
    name: "Midnight",
    url: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?q=80&w=2071&auto=format&fit=crop",
  },
  {
    name: "Sunset",
    url: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2070&auto=format&fit=crop",
  },
  {
    name: "Forest",
    url: "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=3274&auto=format&fit=crop",
  },
];

const accentColors = [
  "#0A84FF", // Blue
  "#30D158", // Green
  "#FF9F0A", // Orange
  "#FF375F", // Pink
  "#BF5AF2", // Purple
  "#FFD60A", // Yellow
];

export default function SettingsApp() {
  const { wallpaper, setWallpaper, accentColor, setAccentColor } =
    useThemeStore();

  return (
    <div className="h-full bg-white/5 p-6 overflow-auto text-white">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      {/* Wallpaper Section */}
      <section className="mb-8">
        <h2 className="text-lg font-medium mb-4">Wallpaper</h2>
        <div className="grid grid-cols-2 gap-4">
          {wallpapers.map((wp) => (
            <button
              key={wp.name}
              onClick={() => setWallpaper(wp.url)}
              className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all ${
                wallpaper === wp.url ? "border-blue-500" : "border-transparent"
              }`}
            >
              <img
                src={wp.url}
                alt={wp.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 text-xs font-medium">
                {wp.name}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Accent Color Section */}
      <section>
        <h2 className="text-lg font-medium mb-4">Accent Color</h2>
        <div className="flex gap-4">
          {accentColors.map((color) => (
            <button
              key={color}
              onClick={() => setAccentColor(color)}
              className={`w-10 h-10 rounded-full border-2 transition-all ${
                accentColor === color
                  ? "border-white scale-110"
                  : "border-transparent"
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
