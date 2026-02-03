'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { PawPrint } from 'lucide-react';

export function FloofyNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <AnimatePresence mode="wait">
        <motion.div
          className="text-center max-w-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          {/* 404 Number */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <span className="text-[96px] md:text-[120px] font-bold text-[#222222] opacity-60">
              4
            </span>

            {/* Floofy Ghost */}
            <motion.div
              animate={{ y: [-6, 6] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            >
              <Image
  src="/floofy.png"
  alt="Floofy Ghost"
  width={120}
  height={120}
  className="w-[80px] h-[80px] md:w-[120px] md:h-[120px] object-contain select-none"
  draggable={false}
  priority
/>
            </motion.div>

            <span className="text-[96px] md:text-[120px] font-bold text-[#222222] opacity-60">
              4
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-5xl font-bold text-[#222222] mb-4">
            Uh-oh… this pet ran away
          </h1>

          {/* Description */}
          <p className="text-lg text-[#222222]/60 mb-10">
            The page you’re looking for doesn’t exist.  
            Let’s help you find a loving home instead.
          </p>

          {/* CTA */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#F4A259] text-white px-8 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition"
          >
            <PawPrint className="w-5 h-5" />
            Go back to Floofy
          </Link>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
