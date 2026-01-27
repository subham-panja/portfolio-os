import BootOverlay from "@/components/shared/BootOverlay";
import ResponsiveManager from "@/components/shared/ResponsiveManager";

export default function Home() {
  // Static export cannot use headers()
  // We default to desktop and let client-side hydration handle resize
  const deviceType = "desktop";

  return (
    <main>
      <BootOverlay />
      <ResponsiveManager initialDeviceType={deviceType} />
    </main>
  );
}
