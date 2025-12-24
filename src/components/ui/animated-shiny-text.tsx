import { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedShinyTextProps {
  children: ReactNode;
  className?: string;
  shimmerWidth?: number;
}

export function AnimatedShinyText({
  children,
  className,
  shimmerWidth = 100,
}: AnimatedShinyTextProps) {
  return (
    <span className={cn("relative inline-block", className)}>
      {/* Base text (always visible) */}
      <span className="text-[#7a4a1f]">
        {children}
      </span>

      {/* Shimmer overlay */}
      <span
        style={
          {
            "--shiny-width": `${shimmerWidth}px`,
          } as CSSProperties
        }
        className={cn(
          "pointer-events-none absolute inset-0",
          "bg-clip-text text-transparent",
          "animate-shiny-text bg-no-repeat",
          "[background-size:var(--shiny-width)_100%]",
          "bg-gradient-to-r from-transparent via-[#F4A259] to-transparent"
        )}
      >
        {children}
      </span>
    </span>
  );
}
