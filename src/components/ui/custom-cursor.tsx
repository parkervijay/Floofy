"use client";

import { useEffect, useState } from "react";

interface Pos {
  x: number;
  y: number;
}

export default function CustomCursor() {
  const [pos, setPos] = useState<Pos>({ x: 0, y: 0 });
  const [visible, setVisible] = useState(true); // Start visible
  const [active, setActive] = useState(false);

  // Whether we should show the custom cursor at all
  const [enabled, setEnabled] = useState(false);

  // 1) Detect device type AFTER mount (client only)
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // Skip on mobile to prevent hydration mismatch
    if (window.innerWidth < 768) {
      document.body.classList.add("no-custom-cursor");
      return;
    }

    const isTouch = window.matchMedia(
      "(hover: none) and (pointer: coarse)"
    ).matches;

    // Only enable cursor on non-touch (desktop / laptop)
    if (!isTouch) {
      setEnabled(true);
      document.body.classList.add("has-custom-cursor");
      document.body.classList.remove("no-custom-cursor");
    } else {
      document.body.classList.add("no-custom-cursor");
      document.body.classList.remove("has-custom-cursor");
    }

    return () => {
      document.body.classList.remove("has-custom-cursor", "no-custom-cursor");
    };
  }, []);

  // 2) Only attach mouse listeners when enabled === true
  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // 🔥 If inside native cursor zone, disable custom cursor
      if (target.closest("[data-native-cursor]")) {
        setVisible(false);
        return;
      }

      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };


    const handleMouseEnter = () => setVisible(true);
    const handleMouseLeave = () => setVisible(false);

    const handleMouseDown = () => setActive(true);
    const handleMouseUp = () => setActive(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [enabled]);

  // 3) While we’re not sure (SSR or touch device) render nothing
  if (!enabled) {
    return null;
  }

  return (
    <div
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        opacity: visible ? 1 : 0,
        pointerEvents: "none",
      }}
      className={`custom-cursor fixed z-[9999] transition-opacity duration-150 ${
        active ? "scale-90" : "scale-100"
      }`}
    >
      {/* Orange paw cursor (uses existing CSS in globals.css) */}
      <div className="cursor-paw" />
    </div>
  );
}
