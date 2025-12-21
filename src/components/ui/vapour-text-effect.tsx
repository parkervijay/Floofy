"use client";

import React, {
  useRef,
  useEffect,
  useState,
  createElement,
  useMemo,
  memo,
} from "react";

export enum Tag {
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
  P = "p",
}

type VaporizeTextCycleProps = {
  texts: string[];
  font?: {
    fontFamily?: string;
    fontSize?: string;
    fontWeight?: number;
  };
  spread?: number;
  animation?: {
    vaporizeDuration?: number;
    fadeInDuration?: number;
    waitDuration?: number;
  };
  direction?: "left-to-right" | "right-to-left";
  alignment?: "left" | "center" | "right";
  tag?: Tag;
};

type Particle = {
  x: number;
  y: number;
  originalX: number;
  originalY: number;
  color: string;
  opacity: number;
  originalAlpha: number;
  velocityX: number;
  velocityY: number;
  angle: number;
  speed: number;
};

type TextBoundaries = {
  left: number;
  right: number;
  width: number;
};

declare global {
  interface HTMLCanvasElement {
    textBoundaries?: TextBoundaries;
  }
}

function VaporizeTextCycle({
  texts,
  font = {
    fontFamily: "sans-serif",
    fontSize: "50px",
    fontWeight: 400,
  },
  spread = 4,
  animation = {
    vaporizeDuration: 2,
    fadeInDuration: 1,
    waitDuration: 3,
  },
  direction = "left-to-right",
  alignment = "center",
  tag = Tag.H1,
}: VaporizeTextCycleProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const isInView = useIsInView(wrapperRef as React.RefObject<HTMLElement>);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startTimeRef = useRef<number>(0);

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [animationState, setAnimationState] =
    useState<"waiting" | "vaporizing" | "fadingIn">("waiting");

  const [wrapperSize, setWrapperSize] = useState({ width: 0, height: 0 });

  const globalDpr = useMemo(() => {
    if (typeof window !== "undefined") {
      return window.devicePixelRatio || 1;
    }
    return 1;
  }, []);

  const animationDurations = useMemo(() => ({
    VAPORIZE_DURATION: (animation.vaporizeDuration ?? 2) * 1000,
    FADE_IN_DURATION: (animation.fadeInDuration ?? 1) * 1000,
    WAIT_DURATION: (animation.waitDuration ?? 3) * 1000,
  }), [animation]);

  // Initialize canvas when size or text changes
  useEffect(() => {
    if (wrapperSize.width > 0 && wrapperSize.height > 0) {
      renderCanvas(
        texts[currentTextIndex],
        canvasRef,
        wrapperSize,
        particlesRef,
        font,
        alignment,
        globalDpr
      );
    }
  }, [currentTextIndex, wrapperSize, texts, font, alignment, globalDpr]);

  // Start the cycle when in view
  useEffect(() => {
    if (!isInView) return;
    
    if (animationState === "waiting" && startTimeRef.current === 0) {
      timeoutRef.current = setTimeout(() => {
        startTimeRef.current = performance.now();
        setAnimationState("vaporizing");
      }, animationDurations.WAIT_DURATION);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isInView, animationState, animationDurations.WAIT_DURATION]);

  // Main animation loop
  useEffect(() => {
    if (!isInView) return;

    const animate = (currentTime: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (animationState === "vaporizing") {
        const elapsed = currentTime - startTimeRef.current;
        const progress = Math.min(elapsed / animationDurations.VAPORIZE_DURATION, 1);

        const boundaries = canvas.textBoundaries;
        if (boundaries) {
          const vaporizeX =
            direction === "left-to-right"
              ? boundaries.left + boundaries.width * progress
              : boundaries.right - boundaries.width * progress;

          // Update particles based on vaporize position with smooth easing
          particlesRef.current.forEach((p) => {
  const shouldMove =
    direction === "left-to-right"
      ? p.originalX <= vaporizeX
      : p.originalX >= vaporizeX;

  if (!shouldMove) return;

  // initialize motion once
  if (p.speed === 0) {
    p.speed = Math.random() * 0.5 + 0.3;

    // move ONLY to the left
    p.velocityX = isMobile ? -p.speed * 1.0 : -p.speed * 1.4;
    // minimal vertical jitter
    p.velocityY = (Math.random() - 0.5) * 0.25;
  }

  // apply motion
  p.x += p.velocityX;
  p.y += p.velocityY;

  // keep particles within tight vertical band
  const topLimit = canvas.height * 0.25;
  const bottomLimit = canvas.height * 0.75;

  if (p.y < topLimit) p.y = topLimit;
  if (p.y > bottomLimit) p.y = bottomLimit;

  // smooth disintegration
 const fadeFactor = isMobile ? 0.012 : 0.02;
p.opacity -= fadeFactor;
});


          if (progress >= 1) {
            startTimeRef.current = performance.now();
            setAnimationState("fadingIn");
            setCurrentTextIndex((i) => (i + 1) % texts.length);
          }
        }
      } else if (animationState === "fadingIn") {
        const elapsed = currentTime - startTimeRef.current;
        const progress = Math.min(elapsed / animationDurations.FADE_IN_DURATION, 1);

        if (progress >= 1) {
  resetParticles(particlesRef.current);

  // immediately prepare next cycle
  startTimeRef.current = performance.now();
  setAnimationState("vaporizing");
}
      }

      // Render all particles
      renderParticles(ctx, particlesRef.current, globalDpr);
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animationState, isInView, animationDurations, direction, spread, globalDpr, texts.length]);

  // Handle resize
  useEffect(() => {
    if (!wrapperRef.current) return;

    const ro = new ResizeObserver(([entry]) => {
      setWrapperSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });

    ro.observe(wrapperRef.current);
    return () => ro.disconnect();
  }, []);

  // ✅ MOVE THIS ABOVE return
const isMobile = wrapperSize.width < 480;

return (
  <div
    ref={wrapperRef}
    style={{
      width: "100%",
      height: isMobile ? "90px" : "160px", // mobile tighter
      pointerEvents: "none",
      marginTop: isMobile ? "1.5rem" : "0px",
    }}
    className="relative flex items-center justify-center"
    >
      <canvas 
        ref={canvasRef} 
        style={{
          minWidth: "30px",
          minHeight: "20px",
          pointerEvents: "none",
        }} 
      />
      <SeoElement tag={tag} texts={texts} />
    </div>
  );
}

const SeoElement = memo(({ tag, texts }: { tag: Tag; texts: string[] }) => {
  return createElement(
    tag,
    {
      style: {
        position: "absolute",
        width: 0,
        height: 0,
        overflow: "hidden",
      },
    },
    texts.join(" ")
  );
});

/* Helper Functions */

function renderCanvas(
  text: string,
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  wrapperSize: { width: number; height: number },
  particlesRef: React.MutableRefObject<Particle[]>,
  font: any,
  alignment: "left" | "center" | "right",
  dpr: number
) {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const isMobile = wrapperSize.width < 480;

  const dpx = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(wrapperSize.width * dpx);
  canvas.height = Math.floor(wrapperSize.height * dpx);
  canvas.style.width = `${wrapperSize.width}px`;
  canvas.style.height = `${wrapperSize.height}px`;

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpx, dpx);
  ctx.clearRect(0, 0, wrapperSize.width, wrapperSize.height);

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  // 🔹 FONT SIZE (mobile only)
  let effectiveFontSize = font.fontSize;

if (isMobile) {
  // Start large
  let testFontSize = 90;

  ctx.font = `${font.fontWeight} ${testFontSize}px ${font.fontFamily}`;

  const adopt = "Adopt";
  const comma = ", ";
  const dontBuy = "Don't Buy";

  let textWidth =
    ctx.measureText(adopt).width +
    ctx.measureText(comma).width +
    ctx.measureText(dontBuy).width;

  // Reduce font size until it fits screen (with padding)
  const maxWidth = wrapperSize.width * 0.9;

  while (textWidth > maxWidth && testFontSize > 48) {
    testFontSize -= 2;
    ctx.font = `${font.fontWeight} ${testFontSize}px ${font.fontFamily}`;

    textWidth =
      ctx.measureText(adopt).width +
      ctx.measureText(comma).width +
      ctx.measureText(dontBuy).width;
  }

  effectiveFontSize = `${testFontSize}px`;
}

ctx.font = `${font.fontWeight} ${effectiveFontSize} ${font.fontFamily}`;


  ctx.font = `${font.fontWeight} ${effectiveFontSize} ${font.fontFamily}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";

  const y = wrapperSize.height / 2;
  const isAdoptText = text.toLowerCase().includes("adopt");

  if (isAdoptText) {
    // 🔹 SAME rendering for mobile + desktop
    const adopt = "Adopt";
    const comma = ", ";
    const dontBuy = "Don't Buy";

    const m1 = ctx.measureText(adopt);
    const m2 = ctx.measureText(comma);
    const m3 = ctx.measureText(dontBuy);

    const totalWidth = m1.width + m2.width + m3.width;
    const startX = wrapperSize.width / 2 - totalWidth / 2;

    ctx.fillStyle = "rgb(244, 162, 89)";
    ctx.fillText(adopt, startX, y);

    ctx.fillStyle = "rgb(20, 20, 20)";
    ctx.fillText(comma, startX + m1.width, y);
    ctx.fillText(dontBuy, startX + m1.width + m2.width, y);

    canvas.textBoundaries = {
      left: startX * dpr,
      right: (startX + totalWidth) * dpr,
      width: totalWidth * dpr,
    };
  } else {
    // 🔹 NORMAL TEXT (Floofy)
    ctx.fillStyle = "rgb(20, 20, 20)";
    const metrics = ctx.measureText(text);
    const x = wrapperSize.width / 2 - metrics.width / 2;

    ctx.fillText(text, x, y);

    canvas.textBoundaries = {
      left: x * dpr,
      right: (x + metrics.width) * dpr,
      width: metrics.width * dpr,
    };
  }

  particlesRef.current = sampleParticles(ctx, canvas);
}


function sampleParticles(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
): Particle[] {
  const img = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  const particles: Particle[] = [];

  // Sample with slightly larger spacing for smoother performance
  for (let y = 0; y < canvas.height; y += 2) {
  for (let x = 0; x < canvas.width; x += 2) {
      const idx = (y * canvas.width + x) * 4;
      if (img[idx + 3] > 128) {
        particles.push({
          x,
          y,
          originalX: x,
          originalY: y,
          color: `rgba(${img[idx]},${img[idx + 1]},${img[idx + 2]},1)`,
          opacity: 1,
          originalAlpha: 1,
          velocityX: 0,
          velocityY: 0,
          angle: 0,
          speed: 0,
        });
      }
    }
  }

  return particles;
}

function renderParticles(
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  dpr: number
) {
  particles.forEach((p) => {
    if (p.opacity > 0) {
      const rgba = p.color.replace("1)", `${Math.max(0, p.opacity)})`);
      ctx.fillStyle = rgba;
      // Slightly larger particles for smoother visual
      ctx.fillRect(
  Math.round(p.x / dpr),
  Math.round(p.y / dpr),
  2,
  2
);
    }
  });
}

function resetParticles(particles: Particle[]) {
  particles.forEach((p) => {
    p.x = p.originalX;
    p.y = p.originalY;
    p.opacity = p.originalAlpha;
    p.velocityX = 0;
    p.velocityY = 0;
    p.speed = 0;
    p.angle = 0;
  });
}

function useIsInView(ref: React.RefObject<HTMLElement>) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  return inView;
}

export const FloofyVapourHero = () => {
  return (
 <div className="w-full h-full flex justify-center items-center bg-transparent">
    <VaporizeTextCycle
      texts={["Floofy", "Adopt, Don't Buy"]}
      font={{
  fontFamily: "Playfair Display, serif",
  fontSize: "clamp(40px, 8vw, 96px)",
  fontWeight: 600,
}}
      spread={5}
      animation={{
        vaporizeDuration: 2.2,
        fadeInDuration: 1.0,
        waitDuration: 2.4,
      }}
      direction="left-to-right"
      alignment="center"
      tag={Tag.H1}
    />
  </div>
);
};

export default FloofyVapourHero;