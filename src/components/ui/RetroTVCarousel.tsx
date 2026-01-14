"use client"

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, PanInfo, useMotionValue, useTransform, MotionValue } from 'motion/react';
import './RetroTVCarousel-standalone.css';

export interface PetCarouselItem {
  image: string;
  breed: string;
  age: string;
  status: "Available" | "Adopted";
  id: number;
}

export interface RetroTVCarouselProps {
  pets: PetCarouselItem[];
  /**
   * Optional async loader so you can plug in an API later.
   * If provided, its result will override the static `pets` prop when resolved.
   */
  fetchPets?: () => Promise<PetCarouselItem[]>;
  baseWidth?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
}

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 24;
const SPRING_OPTIONS = { type: 'spring' as const, stiffness: 280, damping: 28 };

interface PetCardProps {
  pet: PetCarouselItem;
  index: number;
  itemWidth: number;
  trackItemOffset: number;
  x: MotionValue<number>;
  transition: any;
}

function PetCard({ pet, index, itemWidth, trackItemOffset, x, transition }: PetCardProps) {
  const range = [-(index + 1) * trackItemOffset, -index * trackItemOffset, -(index - 1) * trackItemOffset];
  const outputRange = [15, 0, -15];
  const rotateY = useTransform(x, range, outputRange, { clamp: false });
  const scale = useTransform(x, range, [0.88, 1, 0.88], { clamp: false });

  return (
    <motion.div
      key={`${pet.id}-${index}`}
      className="retro-pet-card"
      style={{
        width: itemWidth,
        height: '100%',
        rotateY: rotateY,
        scale: scale,
      }}
      transition={transition}
    >
      {/* Pet Image */}
      <div className="retro-pet-image-container">
        <img 
          src={pet.image} 
          alt={pet.breed}
          className="retro-pet-image"
        />
        <div className="retro-vignette" />
        <div className="retro-scanlines" />
      </div>

      {/* Pet Info Overlay - Bottom placement for aesthetics */}
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
  fetchPets,
  baseWidth = 720,
  autoplay = true,
  autoplayDelay = 5000,
  pauseOnHover = true,
  loop = true
}: RetroTVCarouselProps): React.JSX.Element {
  const containerPadding = 32;
  const itemWidth = baseWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;
  const [resolvedPets, setResolvedPets] = useState<PetCarouselItem[]>(pets);

  // Keep local pets in sync with prop changes
  useEffect(() => {
    setResolvedPets(pets);
  }, [pets]);

  // Optional API hook – when provided, it replaces the local pets
  useEffect(() => {
    if (!fetchPets) return;
    let cancelled = false;

    fetchPets()
      .then((data) => {
        if (!cancelled && Array.isArray(data)) {
          setResolvedPets(data);
        }
      })
      .catch(() => {
        // Swallow errors – you can handle logging where you call the component.
      });

    return () => {
      cancelled = true;
    };
  }, [fetchPets]);

  const itemsForRender = useMemo(() => {
    if (!loop) return resolvedPets;
    if (resolvedPets.length === 0) return [];
    return [resolvedPets[resolvedPets.length - 1], ...resolvedPets, resolvedPets[0]];
  }, [resolvedPets, loop]);

  const [position, setPosition] = useState<number>(loop ? 1 : 0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isJumping, setIsJumping] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
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
  }, [resolvedPets.length, loop, trackItemOffset, x]);

  useEffect(() => {
    if (!loop && position > itemsForRender.length - 1) {
      setPosition(Math.max(0, itemsForRender.length - 1));
    }
  }, [itemsForRender.length, loop, position]);

  const effectiveTransition = isJumping ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationStart = () => {
    setIsAnimating(true);
  };

  const handleAnimationComplete = () => {
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

  const goToByDirection = (direction: 1 | -1) => {
    if (itemsForRender.length <= 1) return;
    setPosition(prev => {
      const next = prev + direction;
      const max = itemsForRender.length - 1;
      return Math.max(0, Math.min(next, max));
    });
  };

  const handleNext = () => goToByDirection(1);
  const handlePrev = () => goToByDirection(-1);

  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * Math.max(itemsForRender.length - 1, 0),
          right: 0
        }
      };

  const activeIndex =
    resolvedPets.length === 0
      ? 0
      : loop
        ? (position - 1 + resolvedPets.length) % resolvedPets.length
        : Math.min(position, resolvedPets.length - 1);

  return (
    <div className="retro-tv-wrapper">
      {/* Vintage TV Frame */}
      <div
        ref={containerRef}
        className="retro-tv-container"
        style={{
          width: `${baseWidth}px`,
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
        </div>

        {/* Screen Content */}
        <div className="retro-tv-screen">
          <motion.div
            className="retro-carousel-track"
            drag={isAnimating ? false : 'x'}
            {...dragProps}
            style={{
              width: itemWidth,
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

          {/* CRT Screen Effect */}
          <div className="retro-crt-overlay" />
        </div>

        {/* Bottom Control Panel */}
        <div className="retro-control-panel">
          {/* Indicator Dots */}
          <div className="retro-indicators">
            {resolvedPets.map((_, index) => (
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
            <div
              className="retro-knob"
              role="button"
              tabIndex={0}
              onClick={handlePrev}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handlePrev();
                }
              }}
            >
              <div className="retro-knob-marker" />
            </div>
            <div
              className="retro-knob"
              role="button"
              tabIndex={0}
              onClick={handleNext}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleNext();
                }
              }}
            >
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