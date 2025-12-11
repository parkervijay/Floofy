"use client";

import { useEffect, useState } from "react";

interface Pos {
  x: number;
  y: number;
}

export default function CustomCursor() {
  const [pos, setPos] = useState<Pos>({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);

  // Whether we should show the custom cursor at all
  const [enabled, setEnabled] = useState(false);

  // 1) Detect device type AFTER mount (client only)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const isTouch = window.matchMedia(
      "(hover: none) and (pointer: coarse)"
    ).matches;

    // Only enable cursor on non-touch (desktop / laptop)
    if (!isTouch) {
      setEnabled(true);
    }
  }, []);

  // 2) Only attach mouse listeners when enabled === true
  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
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
      }}
      className="pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-150"
    >
      {/* soft glow */}
      <div
        className={`h-10 w-10 rounded-full bg-blue-500/20 blur-[6px] transition-transform duration-100 ${
          active ? "scale-75" : "scale-100"
        }`}
      />

      {/* main dot */}
      <div
        className={`absolute inset-0 m-auto flex h-4 w-4 items-center justify-center rounded-full bg-white shadow-lg transition-transform duration-100 ${
          active ? "scale-75" : "scale-100"
        }`}
      />
    </div>
  );
}
