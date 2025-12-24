"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export interface MobileGalleryItem {
  image: string;
  breed: string;
  age: string;
}

interface Props {
  items: MobileGalleryItem[];
}

export default function CircularGalleryMobile({ items }: Props) {
  const [index, setIndex] = useState(0);

  // Auto-rotate to match desktop rhythm
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, 3200);
    return () => clearInterval(id);
  }, [items.length]);

  const getItem = (offset: number) =>
    items[(index + offset + items.length) % items.length];

  return (
    <div
  className="relative w-full h-full flex items-center justify-center overflow-visible"
  style={{
    perspective: "900px",
    transform:
      typeof window !== "undefined" && window.innerWidth < 768
        ? "translateY(-1.25rem)"
        : "none",
  }}
>
      <AnimatePresence initial={false}>
        {/* LEFT CARD */}
        <motion.div
          key={`left-${index}`}
          className="absolute"
          initial={{ opacity: 0 }}
          animate={{
            x: "-36vw",
            scale: 0.78,
            rotateY: 42,
            z: -260,
            opacity: 0.45,
          }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <Card item={getItem(-1)} />
        </motion.div>

        {/* CENTER CARD */}
        <motion.div
          key={`center-${index}`}
          className="absolute z-10"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(_, info) => {
            if (info.offset.x < -70) {
              setIndex((i) => (i + 1) % items.length);
            }
            if (info.offset.x > 70) {
              setIndex((i) => (i - 1 + items.length) % items.length);
            }
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            x: 0,
            scale: 1,
            rotateY: 0,
            z: 0,
            opacity: 1,
          }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <Card item={getItem(0)} active />
        </motion.div>

        {/* RIGHT CARD */}
        <motion.div
          key={`right-${index}`}
          className="absolute"
          initial={{ opacity: 0 }}
          animate={{
            x: "36vw",
            scale: 0.78,
            rotateY: -42,
            z: -260,
            opacity: 0.45,
          }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <Card item={getItem(1)} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* CARD COMPONENT */
function Card({
  item,
  active = false,
}: {
  item: MobileGalleryItem;
  active?: boolean;
}) {
  return (
    <div
      className="
        w-[200px] h-[280px]
        rounded-2xl overflow-hidden
        bg-white/10 backdrop-blur-xl
        border border-white/20
        shadow-2xl
        relative
      "
    >
      {/* IMAGE */}
      <div className="relative w-full h-[70%]">
        <img
          src={item.image}
          alt={item.breed}
          className="w-full h-full object-cover"
        />

        {/* Contrast overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      {/* TEXT */}
      <div className="p-3 text-white text-xs relative z-10">
        <p className="font-semibold tracking-wide">
          <span className="opacity-70">Breed:</span>{" "}
          <span className="opacity-100">{item.breed}</span>
        </p>
        <p className="mt-1 font-medium">
          <span className="opacity-70">Age:</span>{" "}
          <span className="opacity-100">{item.age}</span>
        </p>
      </div>
    </div>
  );
}