import { useEffect, useState } from "react";

/**
 * True only on actual desktops — wide viewport, hover-capable,
 * fine pointer. We gate framer-motion heavy effects behind this so
 * phones / tablets skip the cost entirely.
 */
export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia(
      "(min-width: 1024px) and (hover: hover) and (pointer: fine)"
    );
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  return isDesktop;
}
