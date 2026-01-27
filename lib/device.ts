import { headers } from "next/headers";

export type DeviceType = "mobile" | "tablet" | "desktop";

export function getDeviceType(): DeviceType {
  const headersList = headers();
  const userAgent = headersList.get("user-agent") || "";

  const isMobile =
    /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      userAgent,
    );
  const isTablet = /ipad|android(?!.*mobile)/i.test(userAgent);

  if (isTablet) return "tablet";
  if (isMobile) return "mobile";
  return "desktop";
}
