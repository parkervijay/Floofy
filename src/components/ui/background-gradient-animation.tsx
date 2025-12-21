"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export const BackgroundGradientAnimation = ({
  gradientBackgroundStart = "rgb(255, 244, 235)",
  gradientBackgroundEnd = "rgb(255, 255, 255)",
  firstColor = "244, 162, 89",
  secondColor = "255, 200, 150",
  thirdColor = "255, 180, 120",
  fourthColor = "255, 160, 100",
  fifthColor = "255, 210, 170",
  pointerColor = "244, 162, 89",
  size = "70%",
  blendingValue = "soft-light",
  children,
  className,
  containerClassName,
  interactive = false,
}: {
  gradientBackgroundStart?: string;
  gradientBackgroundEnd?: string;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  pointerColor?: string;
  size?: string;
  blendingValue?: string;
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  interactive?: boolean;
}) => {
  const interactiveRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // ✅ Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ Apply CSS variables AFTER mount
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    root.style.setProperty("--gradient-background-start", gradientBackgroundStart);
    root.style.setProperty("--gradient-background-end", gradientBackgroundEnd);

    root.style.setProperty("--first-color", firstColor);
    root.style.setProperty("--second-color", secondColor);
    root.style.setProperty("--third-color", thirdColor);
    root.style.setProperty("--fourth-color", fourthColor);
    root.style.setProperty("--fifth-color", fifthColor);
    root.style.setProperty("--pointer-color", pointerColor);

    root.style.setProperty("--size", size);
    root.style.setProperty("--blending-value", blendingValue);
  }, [
    mounted,
    gradientBackgroundStart,
    gradientBackgroundEnd,
    firstColor,
    secondColor,
    thirdColor,
    fourthColor,
    fifthColor,
    pointerColor,
    size,
    blendingValue,
  ]);

  if (!mounted) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 min-h-[100dvh] w-full overflow-hidden -z-10",
        containerClassName
      )}
    >
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]" />

      {/* Animated gradient blobs */}
      <div className="absolute inset-0 blur-2xl pointer-events-none">
        <div
          className="
            absolute w-[55%] h-[55%] top-[5%] left-[10%]
            bg-[radial-gradient(circle,rgba(var(--first-color),0.65)_0%,transparent_65%)]
            animate-first
          "
        />
        <div
          className="
            absolute w-[50%] h-[50%] top-[25%] left-[55%]
            bg-[radial-gradient(circle,rgba(var(--second-color),0.55)_0%,transparent_65%)]
            animate-second
          "
        />
        <div
          className="
            absolute w-[45%] h-[45%] top-[55%] left-[20%]
            bg-[radial-gradient(circle,rgba(var(--third-color),0.45)_0%,transparent_65%)]
            animate-third
          "
        />
        <div
          className="
            absolute w-[40%] h-[40%] top-[60%] left-[60%]
            bg-[radial-gradient(circle,rgba(var(--fourth-color),0.4)_0%,transparent_65%)]
            animate-fourth
          "
        />
        <div
          className="
            absolute w-[35%] h-[35%] top-[15%] left-[70%]
            bg-[radial-gradient(circle,rgba(var(--fifth-color),0.35)_0%,transparent_65%)]
            animate-fifth
          "
        />
      </div>

      {/* App content */}
      <div className={cn("relative z-10", className)}>
        {children}
      </div>
    </div>
  );
};
