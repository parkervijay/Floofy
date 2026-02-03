"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, PawPrint, MapPin, Sparkles } from "lucide-react";

type PetStatus = "Available" | "Adopted" | "On Hold";

interface Pet {
  id: string;
  name: string;
  breed: string;
  age: string;
  status: PetStatus;
  location?: string;
  images: string[];
  description?: string;
}

const pets: Pet[] = [
  {
    id: "floofy-001",
    name: "Bruno",
    breed: "Golden Retriever",
    age: "2 years",
    status: "Available",
    location: "Mumbai Shelter",
    images: [
      "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800&h=1000&fit=crop&crop=face",
    ],
    description: "Energetic and loving companion",
  },
  {
    id: "floofy-002",
    name: "Luna",
    breed: "Indie Mix",
    age: "8 months",
    status: "On Hold",
    location: "Bangalore Rescue",
    images: [
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&h=1000&fit=crop&crop=center",
    ],
    description: "Playful and curious explorer",
  },
  {
    id: "floofy-003",
    name: "Max",
    breed: "Beagle",
    age: "3 years",
    status: "Available",
    location: "Delhi Center",
    images: [
      "https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=800&h=1000&fit=crop&crop=center",
    ],
    description: "Gentle soul with lots of love",
  },
  {
    id: "floofy-004",
    name: "Bella",
    breed: "Labrador",
    age: "1.5 years",
    status: "Available",
    location: "Pune Shelter",
    images: [
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=1000&fit=crop&crop=center",
    ],
    description: "Sweet and affectionate friend",
  },
  {
    id: "floofy-005",
    name: "Charlie",
    breed: "German Shepherd",
    age: "4 years",
    status: "Available",
    location: "Chennai Rescue",
    images: [
      "https://images.unsplash.com/photo-1568572933382-74d440642117?w=800&h=1000&fit=crop&crop=center",
    ],
    description: "Loyal and protective companion",
  },
];

export function FloofyPremiumCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentPet = pets[currentIndex];

  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % pets.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1200 : -1200,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1200 : -1200,
      opacity: 0,
    }),
  };

  const infoVariants = {
    enter: {
      opacity: 0,
      x: 50,
    },
    center: {
      opacity: 1,
      x: 0,
    },
    exit: {
      opacity: 0,
      x: -50,
    },
  };

  const nextPet = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % pets.length);
  };

  const prevPet = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + pets.length) % pets.length);
  };

  const goToPetProfile = (petId: string) => {
    // Navigate to pet detail page
    window.location.href = `/pets/${petId}`;
  };

  const getStatusColor = (status: PetStatus) => {
    switch (status) {
      case "Available":
        return "text-emerald-400 bg-emerald-400/20 border-emerald-400/30";
      case "On Hold":
        return "text-amber-400 bg-amber-400/20 border-amber-400/30";
      case "Adopted":
        return "text-rose-400 bg-rose-400/20 border-rose-400/30";
      default:
        return "text-white/60 bg-white/10 border-white/20";
    }
  };

  return (
    <section className="relative w-full py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Background ambient effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 -left-20 w-96 h-96 bg-[#F4A259]/10 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 -right-20 w-96 h-96 bg-rose-400/10 rounded-full blur-3xl"
            animate={{
              x: [0, -80, 0],
              y: [0, -40, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Main carousel container */}
        <div 
          className="relative h-[600px] md:h-[500px] rounded-3xl overflow-visible group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          style={{ minHeight: '500px' }}
        >
          {/* Inner container with overflow-hidden for content clipping */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            {/* Solid background - no transparent overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 to-gray-800/95" />

          <AnimatePresence initial={false} custom={direction} mode="sync">
            <motion.div
              key={currentPet.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.1, ease: "easeInOut" },
              }}
              className="absolute inset-0 grid grid-cols-1 md:grid-cols-10 gap-0 h-full"
              style={{ willChange: 'transform, opacity' }}
            >
              {/* Left side - Pet Image (70%) */}
              <div className="md:col-span-7 relative cursor-pointer h-full">
                <div 
                  className="relative w-full h-full overflow-hidden bg-black"
                  onClick={() => {
  window.dispatchEvent(new Event("floofy-open-app-alert"));
}}              >
                  {/* Image with perfect fitting - always auto-fits container */}
                  <motion.img
                    src={currentPet.images[0]}
                    alt={currentPet.name}
                    className="w-full h-full"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    style={{ 
                      objectFit: 'contain',
                      objectPosition: 'center center',
                    }}
                  />

                  {/* Gradient overlay only at bottom for pet name readability */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

                  {/* Pet name overlay at bottom */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="flex-shrink-0"
                      >
                        <PawPrint className="w-6 h-6 text-[#F4A259]" />
                      </motion.div>
                      <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight break-words min-w-0 flex-1">
                        {currentPet.name}
                      </h3>
                    </div>
                    {currentPet.location && (
                      <div className="flex items-center gap-2 text-white/90 mt-2">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm break-words">{currentPet.location}</span>
                      </div>
                    )}
                  </motion.div>

                  {/* Sparkle effect on hover */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Sparkles className="w-12 h-12 text-[#F4A259]/30" />
                  </motion.div>
                </div>
              </div>

              {/* Right side - Pet Info (30%) */}
              <motion.div
                className="md:col-span-3 h-full flex flex-col justify-start p-6 md:p-8 lg:p-10 bg-gradient-to-br from-gray-800/95 to-gray-900/95 relative z-20 pt-10"
                variants={infoVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, delay: 0.05 }}
              >
                {/* Solid background - no transparent overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800/95 to-gray-900/95 rounded-r-3xl" />

                <div className="relative z-10 space-y-6">
                  {/* Status Badge */}
                  <motion.div
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm ${getStatusColor(
                      currentPet.status
                    )}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                    <span className="text-sm font-semibold">{currentPet.status}</span>
                  </motion.div>

                  {/* Pet Details */}
                  <div className="space-y-4">
                    <motion.div
                      className="space-y-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm text-white/50 font-medium mb-1">Breed</p>
                          <p className="text-lg md:text-xl text-white font-semibold">
                            {currentPet.breed}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm text-white/50 font-medium mb-1">Age</p>
                          <p className="text-lg md:text-xl text-white font-semibold">
                            {currentPet.age}
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Description */}
                    {currentPet.description && (
                      <motion.p
                        className="text-sm text-white/70 leading-relaxed italic"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        "{currentPet.description}"
                      </motion.p>
                    )}
                  </div>

                  {/* CTA Button */}
                  <motion.button
  onClick={() => {
    window.dispatchEvent(new Event("floofy-open-app-alert"));
  }}
  className="w-full mt-6 rounded-2xl bg-gradient-to-r from-[#F4A259] to-[#F4A259]/80 px-6 py-4 text-white font-semibold shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      View Full Profile
                      <motion.span
                        className="inline-block"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                  </motion.button>

                  {/* Quick stats */}
                  <motion.div
                    className="pt-4 border-t border-white/10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <p className="text-xs text-white/50 text-center">
                      Multiple photos available in profile
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
          </div> {/* End inner overflow-hidden container */}

           {/* Navigation Controls - Show on hover outside the carousel */}
           <motion.button
             onClick={prevPet}
             className="absolute -left-20 top-[45%] -translate-y-1/2 p-3 md:p-4 rounded-full bg-[#F4A259] border border-[#F4A259] text-white hover:bg-[#F49B4A] transition-all shadow-lg z-30 opacity-0 group-hover:opacity-100"
             style={{ transition: 'opacity 0.3s ease-in-out' }}
             whileHover={{ scale: 1.1 }}
             whileTap={{ scale: 0.95 }}
           >
             <ArrowLeft className="w-5 h-5" />
           </motion.button>

           <motion.button
             onClick={nextPet}
             className="absolute -right-20 top-[45%] -translate-y-1/2 p-3 md:p-4 rounded-full bg-[#F4A259] border border-[#F4A259] text-white hover:bg-[#F49B4A] transition-all shadow-lg z-30 opacity-0 group-hover:opacity-100"
             style={{ transition: 'opacity 0.3s ease-in-out' }}
             whileHover={{ scale: 1.1 }}
             whileTap={{ scale: 0.95 }}
           >
             <ArrowRight className="w-5 h-5" />
           </motion.button>

           {/* Dots Indicator - Always visible at bottom */}
           <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
             {pets.map((_, index) => (
               <motion.button
                 key={index}
                 onClick={() => {
                   setDirection(index > currentIndex ? 1 : -1);
                   setCurrentIndex(index);
                 }}
                 className={`transition-all duration-300 rounded-full ${
                   index === currentIndex
                     ? "w-8 h-3 bg-[#F4A259]"
                     : "w-3 h-3 bg-white/80 hover:bg-white"
                 }`}
                 whileHover={{ scale: 1.2 }}
                 whileTap={{ scale: 0.9 }}
               />
             ))}
           </div>
        </div>
      </div>
    </section>
  );
}