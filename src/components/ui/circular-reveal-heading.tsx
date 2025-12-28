"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from "@/lib/utils"

interface TextItem {
    text: string;
    image: string;
}

interface CircularRevealHeadingProps {
    items: TextItem[];
    centerText: React.ReactNode;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    onCenterClick?: () => void;
}

const sizeConfig = {
    sm: {
        container: 'h-[320px] w-[320px]',
        fontSize: 'text-sm',
        tracking: 'tracking-[0.25em]',
        radius: 136,
        gap: 35,
        imageSize: 'w-[70%] h-[70%]',
        textStyle: 'font-semibold',
        centerPadding: 'p-6',
        centerRadius: 'rounded-2xl'
    },
    md: {
        container: 'h-[400px] w-[400px]',
        fontSize: 'text-base',
        tracking: 'tracking-[0.28em]',
        radius: 170,
        gap: 32,
        imageSize: 'w-[70%] h-[70%]',
        textStyle: 'font-semibold',
        centerPadding: 'p-8',
        centerRadius: 'rounded-3xl'
    },
    lg: {
        container: 'h-[480px] w-[480px]',
        fontSize: 'text-lg',
        tracking: 'tracking-[0.3em]',
        radius: 204,
        gap: 30,
        imageSize: 'w-[70%] h-[70%]',
        textStyle: 'font-semibold',
        centerPadding: 'p-10',
        centerRadius: 'rounded-3xl'
    }
};

const usePreloadImages = (images: string[]) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const loadImage = (url: string): Promise<void> =>
            new Promise((resolve, reject) => {
                const img = new Image();
                img.src = url;
                img.onload = () => resolve();
                img.onerror = reject;
            });

        Promise.all(images.map(loadImage))
            .then(() => setLoaded(true))
            .catch(err => console.error('Error preloading images:', err));
    }, [images]);

    return loaded;
};

const ImagePreloader = ({ images }: { images: string[] }) => (
    <div className="hidden" aria-hidden="true">
        {images.map((src, index) => (
            <img key={index} src={src} alt="" />
        ))}
    </div>
);

const ImageOverlay = ({ image, size = 'md' }: { image: string, size?: 'sm' | 'md' | 'lg' }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
    >
        <motion.img
            src={image}
            alt=""
            className={cn(
                sizeConfig[size].imageSize,
                "object-cover rounded-full"
            )}
            style={{ filter: 'brightness(0.9)' }}
        />
    </motion.div>
);

export const CircularRevealHeading = ({
    items,
    centerText,
    className,
    size = 'md',
    onCenterClick
}: CircularRevealHeadingProps) => {
    const [activeImage, setActiveImage] = useState<string | null>(null);
    const config = sizeConfig[size];
    const imagesLoaded = usePreloadImages(items.map(item => item.image));

    const createTextSegments = () => {
        const totalItems = items.length;
        const totalGapDegrees = config.gap * totalItems;
        const availableDegrees = 360 - totalGapDegrees;
        const segmentDegrees = availableDegrees / totalItems;
        
        return items.map((item, index) => {
            const startPosition = index * (segmentDegrees + config.gap);
            const startOffset = `${(startPosition / 360) * 100}%`;
            return (
                <g key={index}>
                    <text
                        className={cn(
                            config.fontSize,
                            config.tracking,
                            config.textStyle,
                            "uppercase cursor-pointer transition-all duration-300"
                        )}
                        onMouseEnter={() => imagesLoaded && setActiveImage(item.image)}
                        onMouseLeave={() => setActiveImage(null)}
                        style={{
                            filter: 'url(#textShadow)',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <textPath
                            href="#curve"
                            className="fill-[url(#textGradient)] hover:fill-[#ea580c]"
                            startOffset={startOffset}
                            textLength={`${segmentDegrees * 1.8}`}
                            lengthAdjust="spacingAndGlyphs"
                        >
                            {item.text}
                        </textPath>
                    </text>
                </g>
            );
        });
    };

    return (
        <>
            <ImagePreloader images={items.map(item => item.image)} />
            <motion.div
                whileHover={{
                    boxShadow: "10px 10px 20px rgba(244,162,89,0.3), -10px -10px 20px rgba(255,255,255,0.9)"
                }}
                whileTap={{ scale: 0.98 }}
                animate={{ y: [0, -5, 0] }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className={cn(
                    "relative overflow-hidden",
                    config.container,
                    "rounded-full bg-gradient-to-br from-orange-100/90 via-amber-50/80 to-orange-50/90",
                    "shadow-[8px_8px_16px_rgba(244,162,89,0.2),-8px_-8px_16px_rgba(255,255,255,0.9)]",
                    "transition-all duration-500 ease-out",
                    className
                )}
            >
                <AnimatePresence>
                    {activeImage && imagesLoaded && (
                        <ImageOverlay image={activeImage} size={size} />
                    )}
                </AnimatePresence>

                {/* Inner neomorphic layers */}
                <motion.div
                    className="absolute inset-[2px] rounded-full bg-gradient-to-br from-orange-100/80 via-amber-50/70 to-orange-50/80"
                    style={{
                        boxShadow: "inset 3px 3px 6px rgba(244,162,89,0.15), inset -3px -3px 6px rgba(255,255,255,0.8)"
                    }}
                />

                <motion.div
                    className="absolute inset-[8px] rounded-full bg-gradient-to-br from-orange-100/70 via-amber-50/60 to-orange-50/70"
                    style={{
                        boxShadow: "inset 2px 2px 4px rgba(244,162,89,0.1), inset -2px -2px 4px rgba(255,255,255,0.7)"
                    }}
                />

                {/* Center text with click handler */}
                <motion.div className="absolute inset-0 flex items-center justify-center">
                    <AnimatePresence>
                        {!activeImage && (
                            <motion.div
                                initial={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className={cn(
                                    "relative z-10",
                                    config.centerPadding,
                                    config.centerRadius,
                                    "bg-gradient-to-br from-orange-100/95 to-amber-100/95 backdrop-blur-sm",
                                    "cursor-pointer"
                                )}
                                onClick={onCenterClick}
                                whileHover={{
                                    boxShadow: "inset 2px 2px 4px rgba(244,162,89,0.2), inset -2px -2px 4px rgba(255,255,255,0.8)",
                                    scale: 1.05
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {centerText}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Rotating text */}
                <motion.div
                    className="absolute inset-0"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 35,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    <svg viewBox="0 0 400 400" className="w-full h-full">
                        <defs>
                            <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#d97706" />
                                <stop offset="50%" stopColor="#ea580c" />
                                <stop offset="100%" stopColor="#dc2626" />
                            </linearGradient>
                            <filter id="textShadow" x="-50%" y="-50%" width="200%" height="200%">
                                <feDropShadow dx="0" dy="0.5" stdDeviation="0.5" floodColor="rgba(0,0,0,0.1)" />
                            </filter>
                        </defs>
                        <path
                            id="curve"
                            fill="none"
                            d={`M 200,200 m -${config.radius},0 a ${config.radius},${config.radius} 0 1,1 ${config.radius * 2},0 a ${config.radius},${config.radius} 0 1,1 -${config.radius * 2},0`}
                        />
                        {createTextSegments()}
                    </svg>
                </motion.div>
            </motion.div>
        </>
    );
};