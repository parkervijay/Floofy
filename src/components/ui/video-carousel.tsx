"use client";

import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Play, Clock, Eye } from "lucide-react";
import type { Video } from "@/lib/education-api";

interface VideoCarouselProps {
  videos: Video[];
}

export function VideoCarousel({ videos }: VideoCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    skipSnaps: false,
  });
  const [current, setCurrent] = useState(0);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  // Auto-scroll effect
  useEffect(() => {
    if (!emblaApi) return;

    const autoplay = setInterval(() => {
      scrollNext();
    }, 4000); // Change this number to adjust timing (4000ms = 4 seconds)

    return () => clearInterval(autoplay);
  }, [emblaApi, scrollNext]);

  // Track current slide
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCurrent(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  const handleVideoClick = (youtubeId: string) => {
    window.open(`https://www.youtube.com/watch?v=${youtubeId}`, '_blank');
  };

  return (
    <div className="relative">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              className="min-w-0 shrink-0 grow-0 basis-full md:basis-1/2 lg:basis-1/3"
            >
              <div
                onClick={() => handleVideoClick(video.youtubeId)}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 border-[#F4A259]/20 hover:border-[#F4A259]/40"
              >
                <div className="relative overflow-hidden h-56">
                  <img
                    src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                    alt={video.title}
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=480&h=360&fit=crop';
                    }}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <div className="bg-[#F4A259] rounded-full p-4 transform group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                      <Play size={32} className="text-white fill-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full font-medium flex items-center gap-1">
                    <Clock size={14} />
                    {video.duration}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-[var(--charcoal)] mb-2 line-clamp-2 group-hover:text-[#F4A259] transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-sm text-[var(--grey-medium)] mb-3 line-clamp-2">
                    {video.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-[var(--grey-medium)]">
                    <Eye size={16} />
                    <span>{video.views} views</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === current 
                ? 'w-8 bg-[#F4A259]' 
                : 'w-2 bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}