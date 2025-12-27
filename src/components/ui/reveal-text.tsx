"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface RevealTextProps {
  text: string;
  className?: string;
  fontSize?: string;
  letterDelay?: number;
  overlayDelay?: number;
  overlayDuration?: number;
  springDuration?: number;
  letterImages?: string[];
}

export function RevealText({
  text,
  className,
  fontSize = "text-[96px] md:text-[120px]",
  letterDelay = 0.06,
  overlayDelay = 0.04,
  overlayDuration = 0.35,
  springDuration = 500,
  letterImages = [
    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b",
    "https://images.unsplash.com/photo-1517849845537-4d257902454a",
    "https://images.unsplash.com/photo-1507149833265-60c372daea22",
    "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8",
  ],
}: RevealTextProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const totalDelay =
      (text.length - 1) * letterDelay * 1000 + springDuration;
    const timer = setTimeout(() => setShowOverlay(true), totalDelay);
    return () => clearTimeout(timer);
  }, [text.length, letterDelay, springDuration]);

  return (
    <div className={cn("flex justify-center", className)}>
      <div className="flex">
        {text.split("").map((letter, index) => (
          <motion.span
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={cn(
              fontSize,
              "font-semibold tracking-tight cursor-default relative overflow-hidden text-[var(--charcoal)]"
            )}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: index * letterDelay,
              type: "spring",
              damping: 10,
              stiffness: 180,
            }}
          >
            {/* Base letter */}
            <motion.span
              className="absolute inset-0"
              animate={{ opacity: hoveredIndex === index ? 0 : 1 }}
              transition={{ duration: 0.15 }}
            >
              {letter}
            </motion.span>

            {/* Image reveal on hover */}
            <motion.span
              className="text-transparent bg-clip-text bg-cover bg-center"
              animate={{
                opacity: hoveredIndex === index ? 1 : 0,
                backgroundPosition:
                  hoveredIndex === index ? "60% center" : "40% center",
              }}
              transition={{
                opacity: { duration: 0.15 },
                backgroundPosition: { duration: 2.5 },
              }}
              style={{
                backgroundImage: `url('${
                  letterImages[index % letterImages.length]
                }')`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {letter}
            </motion.span>

            {/* Soft orange sweep (Floofy touch) */}
            {showOverlay && (
              <motion.span
                className="absolute inset-0 text-[var(--primary)] pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.6, 0] }}
                transition={{
                  delay: index * overlayDelay,
                  duration: overlayDuration,
                  ease: "easeInOut",
                }}
              >
                {letter}
              </motion.span>
            )}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
