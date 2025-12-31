"use client"

import { useState, useEffect, useRef, useCallback, useMemo } from "react"

interface PetData {
  image: string
  breed: string
  age: string
  status: "Available" | "Adopted"
}

interface CarouselCircularImageGalleryProps {
  pets: PetData[]
}

export function CarouselCircularImageGallery({ pets }: CarouselCircularImageGalleryProps) {
  const [opened, setOpened] = useState(0)
  const [inPlace, setInPlace] = useState(0)
  const [disabled, setDisabled] = useState(false)
  const [gsapReady, setGsapReady] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const autoplayTimer = useRef<NodeJS.Timeout | null>(null)

  // Fix hydration errors - only render after mount
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Load GSAP scripts
  useEffect(() => {
    if (typeof window === "undefined") return

    const loadScripts = () => {
      if (window.gsap && window.MotionPathPlugin) {
        window.gsap.registerPlugin(window.MotionPathPlugin)
        setGsapReady(true)
        return
      }

      const gsapScript = document.createElement("script")
      gsapScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"
      gsapScript.async = true
      gsapScript.onload = () => {
        const motionPathScript = document.createElement("script")
        motionPathScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/MotionPathPlugin.min.js"
        motionPathScript.async = true
        motionPathScript.onload = () => {
          if (window.gsap && window.MotionPathPlugin) {
            window.gsap.registerPlugin(window.MotionPathPlugin)
            setGsapReady(true)
          }
        }
        document.body.appendChild(motionPathScript)
      }
      document.body.appendChild(gsapScript)
    }

    loadScripts()
  }, [])

  const onClick = useCallback((index: number) => {
    if (!disabled) setOpened(index)
  }, [disabled])

  const onInPlace = useCallback((index: number) => {
    setInPlace(index)
  }, [])

  const next = useCallback(() => {
    setOpened((currentOpened) => (currentOpened + 1) % pets.length)
  }, [pets.length])

  const prev = useCallback(() => {
    setOpened((currentOpened) => (currentOpened - 1 + pets.length) % pets.length)
  }, [pets.length])

  // Handle disabled state
  useEffect(() => {
    setDisabled(true)
  }, [opened])

  useEffect(() => {
    setDisabled(false)
  }, [inPlace])

  // Autoplay with 5 second interval
  useEffect(() => {
    if (!gsapReady || !isMounted) return

    if (autoplayTimer.current) {
      clearInterval(autoplayTimer.current)
    }

    autoplayTimer.current = setInterval(next, 5000)

    return () => {
      if (autoplayTimer.current) {
        clearInterval(autoplayTimer.current)
      }
    }
  }, [opened, gsapReady, isMounted, next])

  // Don't render until mounted to prevent hydration errors
  if (!isMounted) {
    return (
      <div className="flex items-center justify-center bg-transparent min-h-[800px]">
        <div className="relative h-[80vmin] w-[80vmin] max-h-[600px] max-w-[600px] rounded-[24px] bg-white/5 backdrop-blur-xl border border-white/10" />
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center bg-transparent min-h-[800px] font-sans relative">
      <div className="relative h-[80vmin] w-[80vmin] max-h-[600px] max-w-[600px] overflow-hidden rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.12),0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-xl bg-white/5 border border-white/10">
        {gsapReady &&
          pets.map((pet, i) => (
            <div
              key={`pet-${i}`}
              className="absolute inset-0"
              style={{ 
                zIndex: opened === i ? pets.length + 10 : (inPlace === i ? 5 : pets.length - i),
                pointerEvents: 'none'
              }}
            >
              <GalleryImage
                total={pets.length}
                id={i}
                url={pet.image}
                breed={pet.breed}
                age={pet.age}
                status={pet.status}
                open={opened === i}
                inPlace={inPlace === i}
                onInPlace={onInPlace}
              />
            </div>
          ))}
        
        {/* Navigation tabs overlay */}
        <div className="absolute inset-0 z-[100] pointer-events-none">
          <Tabs pets={pets} onSelect={onClick} currentIndex={opened} />
        </div>
      </div>

      {/* Previous Button */}
      <button
        className="absolute left-[calc(50%-40vmin-50px)] sm:left-[calc(50%-300px-70px)] top-1/2 z-[101] 
                   flex h-12 w-12 sm:h-14 sm:w-14 -translate-y-1/2 
                   items-center justify-center rounded-full 
                   bg-gradient-to-br from-[#F4A259] to-[#F49B4A]
                   shadow-[0_4px_20px_rgba(244,162,89,0.4)] 
                   transition-all duration-300 ease-out 
                   hover:scale-110 hover:shadow-[0_8px_30px_rgba(244,162,89,0.6)]
                   active:scale-95 
                   focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F4A259]/30 
                   disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
        onClick={prev}
        disabled={disabled}
        aria-label="Previous Pet"
        type="button"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-300"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Next Button */}
      <button
        className="absolute right-[calc(50%-40vmin-50px)] sm:right-[calc(50%-300px-70px)] top-1/2 z-[101] 
                   flex h-12 w-12 sm:h-14 sm:w-14 -translate-y-1/2 
                   items-center justify-center rounded-full 
                   bg-gradient-to-br from-[#F4A259] to-[#F49B4A]
                   shadow-[0_4px_20px_rgba(244,162,89,0.4)] 
                   transition-all duration-300 ease-out 
                   hover:scale-110 hover:shadow-[0_8px_30px_rgba(244,162,89,0.6)]
                   active:scale-95 
                   focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F4A259]/30 
                   disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
        onClick={next}
        disabled={disabled}
        aria-label="Next Pet"
        type="button"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-300"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  )
}

interface GalleryImageProps {
  url: string
  breed: string
  age: string
  status: "Available" | "Adopted"
  open: boolean
  inPlace: boolean
  id: number
  onInPlace: (id: number) => void
  total: number
}

function GalleryImage({ url, breed, age, status, open, inPlace, id, onInPlace, total }: GalleryImageProps) {
  const [firstLoad, setLoaded] = useState(true)
  const clip = useRef<SVGCircleElement>(null)

  // Animation constants
  const config = useMemo(() => ({
    gap: 10,
    circleRadius: 7,
    defaults: { transformOrigin: "center center" },
    duration: 0.4,
    width: 400,
    height: 400,
    scale: 700,
  }), [])

  const { gap, circleRadius, defaults, duration, width, height, scale } = config
  const bigSize = circleRadius * scale
  const overlap = 0

  // Position calculation functions
  const getPosSmall = useCallback(() => ({
    cx: width / 2 - (total * (circleRadius * 2 + gap) - gap) / 2 + id * (circleRadius * 2 + gap),
    cy: height - 30,
    r: circleRadius,
  }), [width, height, total, id, circleRadius, gap])

  const getPosSmallAbove = useCallback(() => ({
    cx: width / 2 - (total * (circleRadius * 2 + gap) - gap) / 2 + id * (circleRadius * 2 + gap),
    cy: height / 2,
    r: circleRadius * 2,
  }), [width, height, total, id, circleRadius, gap])

  const getPosCenter = useCallback(() => ({ 
    cx: width / 2, 
    cy: height / 2, 
    r: circleRadius * 7 
  }), [width, height, circleRadius])

  const getPosEnd = useCallback(() => ({ 
    cx: width / 2 - bigSize + overlap, 
    cy: height / 2, 
    r: bigSize 
  }), [width, height, bigSize, overlap])

  const getPosStart = useCallback(() => ({ 
    cx: width / 2 + bigSize - overlap, 
    cy: height / 2, 
    r: bigSize 
  }), [width, height, bigSize, overlap])

  // GSAP animation
  useEffect(() => {
    if (typeof window === "undefined") return
    
    const gsap = window.gsap
    if (!gsap || !clip.current) return

    setLoaded(false)
    
    const flipDuration = firstLoad ? 0 : duration
    const upDuration = firstLoad ? 0 : 0.2
    const bounceDuration = firstLoad ? 0.01 : 1
    const delay = firstLoad ? 0 : flipDuration + upDuration

    if (open) {
      gsap
        .timeline()
        .set(clip.current, { ...defaults, ...getPosSmall() })
        .to(clip.current, {
          ...defaults,
          ...getPosCenter(),
          duration: upDuration,
          ease: "power3.inOut",
        })
        .to(clip.current, {
          ...defaults,
          ...getPosEnd(),
          duration: flipDuration,
          ease: "power4.in",
          onComplete: () => onInPlace(id),
        })
    } else {
      gsap
        .timeline({ overwrite: true })
        .set(clip.current, { ...defaults, ...getPosStart() })
        .to(clip.current, {
          ...defaults,
          ...getPosCenter(),
          delay: delay,
          duration: flipDuration,
          ease: "power4.out",
        })
        .to(clip.current, {
          ...defaults,
          motionPath: {
            path: [getPosSmallAbove(), getPosSmall()],
            curviness: 1,
          },
          duration: bounceDuration,
          ease: "bounce.out",
        })
    }
  }, [open, firstLoad, duration, defaults, getPosSmall, getPosCenter, getPosEnd, getPosStart, getPosSmallAbove, onInPlace, id])

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      <defs>
        <clipPath id={`pet-${id}-circle`}>
          <circle ref={clip} cx="0" cy="0" r={circleRadius} />
        </clipPath>
        <clipPath id={`pet-${id}-square`}>
          <rect width={width} height={height} />
        </clipPath>
        <radialGradient id={`vignette-${id}`}>
          <stop offset="30%" stopColor="transparent" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.5)" />
        </radialGradient>
      </defs>
      
      <g clipPath={`url(#pet-${id}-${inPlace ? "square" : "circle"})`}>
        <image 
          width={width} 
          height={height} 
          href={url}
          preserveAspectRatio="xMidYMid slice"
        />
        
        {inPlace && (
          <rect
            width={width}
            height={height}
            fill={`url(#vignette-${id})`}
          />
        )}
      </g>
      
      {/* Pet Info Card - Only show when expanded */}
      {inPlace && (
        <g>
          {/* Card Background - Moved up to prevent overlap */}
          <rect
            x="24"
            y={height - 150}
            width="190"
            height="100"
            fill="rgba(0, 0, 0, 0.85)"
            rx="18"
          />
          
          {/* Orange Border */}
          <rect
            x="24"
            y={height - 150}
            width="190"
            height="100"
            fill="none"
            stroke="rgba(244, 162, 89, 0.5)"
            strokeWidth="2"
            rx="18"
          />
          
          {/* Orange Accent Bar - The effect you wanted back */}
          <rect
            x="32"
            y={height - 142}
            width="4"
            height="84"
            fill="#F4A259"
            rx="2"
          />
          
          {/* Breed Name */}
          <text
            x="44"
            y={height - 118}
            fill="white"
            fontSize="17"
            fontWeight="700"
            fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
          >
            {breed}
          </text>
          
          {/* Age */}
          <text
            x="44"
            y={height - 95}
            fill="rgba(255, 255, 255, 0.8)"
            fontSize="13"
            fontWeight="400"
            fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
          >
            {age}
          </text>
          
          {/* Status Badge */}
          <rect
            x="44"
            y={height - 77}
            width="90"
            height="22"
            rx="11"
            fill={status === "Available" ? "#10b981" : "#F4A259"}
          />
          
          <text
            x="85"
            y={height - 65}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize="10"
            fontWeight="600"
            letterSpacing="0.5"
            fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
          >
            {status === "Available" ? "● AVAILABLE" : "● ADOPTED"}
          </text>
        </g>
      )}
    </svg>
  )
}

interface TabsProps {
  pets: PetData[]
  onSelect: (index: number) => void
  currentIndex: number
}

function Tabs({ pets, onSelect, currentIndex }: TabsProps) {
  const config = useMemo(() => ({
    gap: 10,
    circleRadius: 7,
    width: 400,
    height: 400,
  }), [])

  const { gap, circleRadius, width, height } = config

  const getPosX = useCallback((i: number) =>
    width / 2 - (pets.length * (circleRadius * 2 + gap) - gap) / 2 + i * (circleRadius * 2 + gap),
    [width, pets.length, circleRadius, gap]
  )

  const posY = height - 30

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      {pets.map((pet, i) => {
        const isActive = currentIndex === i
        const posX = getPosX(i)
        
        return (
          <g key={`tab-${i}`} className="pointer-events-auto">
            <defs>
              <clipPath id={`tab_${i}_clip`}>
                <circle cx={posX} cy={posY} r={circleRadius} />
              </clipPath>
            </defs>
            <image
              x={posX - circleRadius}
              y={posY - circleRadius}
              width={circleRadius * 2}
              height={circleRadius * 2}
              href={pet.image}
              clipPath={`url(#tab_${i}_clip)`}
              className="pointer-events-none"
              preserveAspectRatio="xMidYMid slice"
            />
            <circle
              onClick={() => onSelect(i)}
              className={`cursor-pointer transition-all duration-300 ${
                isActive 
                  ? 'fill-orange-400/10 stroke-orange-400' 
                  : 'fill-white/0 stroke-white/50 hover:stroke-white/90'
              }`}
              strokeWidth={isActive ? "3" : "2"}
              cx={posX}
              cy={posY}
              r={circleRadius + 2}
              style={{
                filter: isActive ? "drop-shadow(0 0 6px rgba(251,146,60,0.6))" : "none"
              }}
            />
          </g>
        )
      })}
    </svg>
  )
}

// Type declarations
declare global {
  interface Window {
    gsap: any
    MotionPathPlugin: any
  }
}