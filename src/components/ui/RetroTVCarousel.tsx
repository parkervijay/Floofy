"use client"

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, PanInfo, useMotionValue, useTransform, MotionValue } from "framer-motion";
import './RetroTVCarousel-standalone.css';

// API-ready interface - can be populated from any data source
export interface PetCarouselItem {
  id: number | string;
  image: string;      // Image URL from API
  breed: string;      // Pet breed from API
  age: string;        // Pet age from API
  status: "Available" | "Adopted";
}

export interface RetroTVCarouselProps {
  pets: PetCarouselItem[];
  baseWidth?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
}

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 32;
const SPRING_OPTIONS = { type: 'spring' as const, stiffness: 280, damping: 28 };

interface PetCardProps {
  pet: PetCarouselItem;
  index: number;
  itemWidth: number;
  trackItemOffset: number;
  x: MotionValue<number>;
  transition: typeof SPRING_OPTIONS | { duration: number };
}

function PetCard({ pet, index, itemWidth, trackItemOffset, x, transition }: PetCardProps): React.ReactElement {
  const range = [-(index + 1) * trackItemOffset, -index * trackItemOffset, -(index - 1) * trackItemOffset];
  const outputRange = [12, 0, -12];
  const rotateY = useTransform(x, range, outputRange, { clamp: false });
  const scale = useTransform(x, range, [0.92, 1, 0.92], { clamp: false });

  return (
    <motion.div
      className="retro-pet-card"
      style={{
        width: itemWidth,
        height: '100%',
        rotateY: rotateY,
        scale: scale,
      }}
      transition={transition}
    >
      {/* Pet Image - Optimized for any size */}
      <div className="retro-pet-image-container">
        <img 
          src={pet.image} 
          alt={pet.breed}
          className="retro-pet-image"
          loading="lazy"
        />
      </div>

      {/* Pet Info Overlay - API Data */}
      <div className="retro-pet-info">
        <div className="retro-pet-info-content">
          <div className="retro-pet-breed">{pet.breed}</div>
          <div className="retro-pet-age">{pet.age}</div>
          <div className={`retro-pet-status ${pet.status === "Available" ? 'available' : 'adopted'}`}>
            <span className="retro-status-dot" />
            {pet.status}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function RetroTVCarousel({
  pets,
  baseWidth = 720,
  autoplay = true,
  autoplayDelay = 5000,
  pauseOnHover = true,
  loop = true
}: RetroTVCarouselProps): React.ReactElement {
  const containerPadding = 32;
  const [itemWidth, setItemWidth] = useState<number>(baseWidth - containerPadding * 2);
  const trackItemOffset = itemWidth + GAP;
  
  const itemsForRender = useMemo(() => {
    if (!loop) return pets;
    if (pets.length === 0) return [];
    return [pets[pets.length - 1], ...pets, pets[0]];
  }, [pets, loop]);

  const [position, setPosition] = useState<number>(loop ? 1 : 0);
  const x = useMotionValue<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isJumping, setIsJumping] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);

  // Measure the inner screen width so each card perfectly fills it,
  // and recompute on resize for full responsiveness.
  useEffect(() => {
    const measure = () => {
      if (!screenRef.current) return;
      const width = screenRef.current.clientWidth;
      if (width > 0) {
        setItemWidth(width);
      }
    };

    measure();

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', measure);
      return () => window.removeEventListener('resize', measure);
    }
  }, []);
  
  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = (): void => setIsHovered(true);
      const handleMouseLeave = (): void => setIsHovered(false);
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (!autoplay || itemsForRender.length <= 1) return undefined;
    if (pauseOnHover && isHovered) return undefined;

    const timer = setInterval(() => {
      setPosition(prev => Math.min(prev + 1, itemsForRender.length - 1));
    }, autoplayDelay);

    return () => clearInterval(timer);
  }, [autoplay, autoplayDelay, isHovered, pauseOnHover, itemsForRender.length]);

  useEffect(() => {
    const startingPosition = loop ? 1 : 0;
    setPosition(startingPosition);
    x.set(-startingPosition * trackItemOffset);
  }, [pets.length, loop, trackItemOffset, x]);

  useEffect(() => {
    if (!loop && position > itemsForRender.length - 1) {
      setPosition(Math.max(0, itemsForRender.length - 1));
    }
  }, [itemsForRender.length, loop, position]);

  const effectiveTransition = isJumping ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationStart = (): void => {
    setIsAnimating(true);
  };

  const handleAnimationComplete = (): void => {
    if (!loop || itemsForRender.length <= 1) {
      setIsAnimating(false);
      return;
    }
    const lastCloneIndex = itemsForRender.length - 1;

    if (position === lastCloneIndex) {
      setIsJumping(true);
      const target = 1;
      setPosition(target);
      x.set(-target * trackItemOffset);
      requestAnimationFrame(() => {
        setIsJumping(false);
        setIsAnimating(false);
      });
      return;
    }

    if (position === 0) {
      setIsJumping(true);
      const target = pets.length;
      setPosition(target);
      x.set(-target * trackItemOffset);
      requestAnimationFrame(() => {
        setIsJumping(false);
        setIsAnimating(false);
      });
      return;
    }

    setIsAnimating(false);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void => {
    const { offset, velocity } = info;
    const direction =
      offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD
        ? 1
        : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD
          ? -1
          : 0;

    if (direction === 0) return;

    setPosition(prev => {
      const next = prev + direction;
      const max = itemsForRender.length - 1;
      return Math.max(0, Math.min(next, max));
    });
  };

  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * Math.max(itemsForRender.length - 1, 0),
          right: 0
        }
      };

  const activeIndex =
    pets.length === 0 ? 0 : loop ? (position - 1 + pets.length) % pets.length : Math.min(position, pets.length - 1);

  // Navigation handlers
  const goToPrevious = (): void => {
    if (isAnimating) return;
    setPosition(prev => {
      const next = prev - 1;
      return Math.max(0, next);
    });
  };

  const goToNext = (): void => {
    if (isAnimating) return;
    setPosition(prev => {
      const next = prev + 1;
      const max = itemsForRender.length - 1;
      return Math.min(next, max);
    });
  };

  // Check if navigation buttons should be disabled
  const canGoLeft = loop || position > (loop ? 1 : 0);
  const canGoRight = loop || position < (loop ? itemsForRender.length - 2 : itemsForRender.length - 1);

  return (
    <div className="retro-tv-wrapper">
      {/* Vintage TV Frame */}
      <div
        ref={containerRef}
        className="retro-tv-container"
        style={{
          width: '100%',
          maxWidth: `${baseWidth}px`,
        }}
      >
        {/* TV Screen Bezel */}
        <div className="retro-tv-bezel">
          {/* Corner Screws */}
          <div className="retro-screw top-left" />
          <div className="retro-screw top-right" />
          <div className="retro-screw bottom-left" />
          <div className="retro-screw bottom-right" />
          
          {/* Brand Logo */}
          <div className="retro-brand">FLOOFY TV</div>
          
          {/* Channel Number Display */}
          <div className="retro-channel">CH {activeIndex + 1}</div>

          {/* Navigation Buttons - Left */}
          <button 
            className="retro-nav-button retro-nav-left"
            onClick={goToPrevious}
            disabled={!canGoLeft || isAnimating}
            aria-label="Previous pet"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={3} 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Navigation Buttons - Right */}
          <button 
            className="retro-nav-button retro-nav-right"
            onClick={goToNext}
            disabled={!canGoRight || isAnimating}
            aria-label="Next pet"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={3} 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        {/* Screen Content */}
        <div ref={screenRef} className="retro-tv-screen">
          <motion.div
            className="retro-carousel-track"
            drag={isAnimating ? false : 'x'}
            {...dragProps}
            style={{
              gap: `${GAP}px`,
              perspective: 1200,
              perspectiveOrigin: `${position * trackItemOffset + itemWidth / 2}px 50%`,
              x
            }}
            onDragEnd={handleDragEnd}
            animate={{ x: -(position * trackItemOffset) }}
            transition={effectiveTransition}
            onAnimationStart={handleAnimationStart}
            onAnimationComplete={handleAnimationComplete}
          >
            {itemsForRender.map((pet, index) => (
              <PetCard
                key={`${pet.id}-${index}`}
                pet={pet}
                index={index}
                itemWidth={itemWidth}
                trackItemOffset={trackItemOffset}
                x={x}
                transition={effectiveTransition}
              />
            ))}
          </motion.div>
        </div>

        {/* Bottom Control Panel */}
        <div className="retro-control-panel">
          {/* Indicator Dots */}
          <div className="retro-indicators">
            {pets.map((_, index) => (
              <motion.div
                key={index}
                className={`retro-indicator ${activeIndex === index ? 'active' : 'inactive'}`}
                animate={{
                  scale: activeIndex === index ? 1.3 : 1,
                  opacity: activeIndex === index ? 1 : 0.4
                }}
                onClick={() => setPosition(loop ? index + 1 : index)}
                transition={{ duration: 0.2 }}
              />
            ))}
          </div>

          {/* Decorative Knobs */}
          <div className="retro-knobs">
            <div className="retro-knob">
              <div className="retro-knob-marker" />
            </div>
            <div className="retro-knob">
              <div className="retro-knob-marker" />
            </div>
          </div>
        </div>

        {/* TV Stand */}
        <div className="retro-tv-stand" />
      </div>
    </div>
  );
}