"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

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

  // auto-rotate like a carousel
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, 2800);
    return () => clearInterval(id);
  }, [items.length]);

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      <motion.div
        className="flex gap-6"
        animate={{ x: -index * 260 }}
        transition={{ ease: "easeInOut", duration: 0.8 }}
        style={{ touchAction: "pan-y" }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="w-[240px] h-[340px] rounded-2xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20"
          >
            <img
              src={item.image}
              className="w-full h-[70%] object-cover"
              alt={item.breed}
            />
            <div className="p-4 text-white text-sm">
              <p><span className="opacity-60">Breed:</span> {item.breed}</p>
              <p><span className="opacity-60">Age:</span> {item.age}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
