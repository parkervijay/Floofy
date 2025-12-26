"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    // Small delay ensures new page DOM is mounted
    const timeout = setTimeout(() => {
      const elements = document.querySelectorAll(
        ".pet-card, .adoption-tile, .feature-card, .resource-card, .care-card, .phone-mockup"
      );

      elements.forEach((el) => {
        el.classList.add("visible");
      });
    }, 50);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
}
