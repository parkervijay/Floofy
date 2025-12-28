"use client";

import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Newspaper, Calendar, Globe, Map, Building2, X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import type { NewsStory } from "@/lib/news-types";

// News Modal Component
function NewsModal({ story, onClose }: { story: NewsStory; onClose: () => void }) {
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = 'hidden';
    return () => {
      if (typeof document !== "undefined") {
        document.body.style.overflow = 'unset';
      }
    };
  }, []);

  const getLocationColor = (location: NewsStory['location']) => {
    switch (location) {
      case 'Bangalore': return 'bg-blue-500';
      case 'India': return 'bg-orange-500';
      case 'World': return 'bg-[#F4A259]';
    }
  };

  const getLocationIcon = (location: NewsStory['location']) => {
    switch (location) {
      case 'Bangalore': return <Building2 size={16} />;
      case 'India': return <Map size={16} />;
      case 'World': return <Globe size={16} />;
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-white/30 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Newspaper className="text-[#F4A259]" size={28} />
            <span className={`${getLocationColor(story.location)} text-white text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1`}>
              {getLocationIcon(story.location)}
              {story.location}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close story"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-88px)] p-8 bg-white/70 backdrop-blur-lg">
          {/* Featured Image */}
          <img
            src={story.image}
            alt={story.title}
            className="w-full h-64 object-cover rounded-xl mb-6"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&h=400&fit=crop';
            }}
          />

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--charcoal)] mb-4">
            {story.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--grey-medium)] mb-8 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Newspaper size={16} />
              <span className="font-medium">{story.source}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{story.date}</span>
            </div>
          </div>

          {/* Story Content */}
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-[var(--grey-medium)] leading-relaxed mb-6">
              {story.content}
            </p>
          </div>

          {/* Read Full Article Button */}
          <a
            href={story.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#F4A259] text-white px-6 py-3 rounded-full font-medium hover:bg-[#e69449] transition-colors mt-6"
          >
            Read Full Article
            <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </div>
  );
}

// News Carousel Component
interface NewsCarouselProps {
  location?: 'all' | 'Bangalore' | 'India' | 'World';
}

export function NewsCarousel({ location = 'all' }: NewsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    skipSnaps: false,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedStory, setSelectedStory] = useState<NewsStory | null>(null);
  const [stories, setStories] = useState<NewsStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  // Fetch news
  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      setError(null);
      try {
        const url = location === 'all' 
          ? '/api/news'
          : `/api/news?location=${location}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }

        const data = await response.json();
        setStories(data.stories || []);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Failed to load news. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, [location]);

  const getLocationColor = (loc: NewsStory['location']) => {
    switch (loc) {
      case 'Bangalore': return 'bg-blue-500';
      case 'India': return 'bg-orange-500';
      case 'World': return 'bg-[#F4A259]';
    }
  };

  const getLocationIcon = (loc: NewsStory['location']) => {
    switch (loc) {
      case 'Bangalore': return <Building2 size={16} />;
      case 'India': return <Map size={16} />;
      case 'World': return <Globe size={16} />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F4A259] mx-auto mb-4"></div>
          <p className="text-[var(--grey-medium)]">Loading latest pet news...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-[#F4A259] text-white px-6 py-2 rounded-full hover:bg-[#e69449] transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (stories.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-[var(--grey-medium)] text-lg">No stories found for this location.</p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop: arrows outside, Mobile: arrows inside with padding */}
      <div className="relative px-6 md:px-0">
        {/* Navigation Buttons */}
        {canScrollPrev && (
          <button
            onClick={scrollPrev}
            className="absolute left-4 md:-left-16 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[#F4A259]/20 hidden md:flex items-center justify-center"
            aria-label="Previous stories"
          >
            <ChevronLeft size={24} className="text-[#F4A259]" />
          </button>
        )}

        {canScrollNext && (
          <button
            onClick={scrollNext}
            className="absolute right-4 md:-right-16 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[#F4A259]/20 hidden md:flex items-center justify-center"
            aria-label="Next stories"
          >
            <ChevronRight size={24} className="text-[#F4A259]" />
          </button>
        )}

        {/* Carousel */}
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex gap-6 md:gap-4">
            {stories.map((story) => (
              <div
                key={story.id}
                className="min-w-0 shrink-0 grow-0 basis-full sm:basis-[70%] md:basis-[calc(33.333%-0.667rem)]"
              >
                <div
                  onClick={() => setSelectedStory(story)}
                  className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 border-[#F4A259]/20 hover:border-[#F4A259]/40 h-full"
                >
                  <div className="relative overflow-hidden h-56">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400&h=300&fit=crop';
                      }}
                    />
                    <div className="absolute top-3 right-3">
                      <span className={`${getLocationColor(story.location)} text-white text-xs px-3 py-1.5 rounded-full font-medium flex items-center gap-1 shadow-lg`}>
                        {getLocationIcon(story.location)}
                        {story.location}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[var(--charcoal)] mb-3 line-clamp-2 group-hover:text-[#F4A259] transition-all">
                      {story.title}
                    </h3>
                    <p className="text-[var(--grey-medium)] mb-4 line-clamp-3">
                      {story.summary}
                    </p>

                    <div className="flex items-center justify-between text-sm text-[var(--grey-medium)] pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{story.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Newspaper size={16} />
                        <span className="font-medium">{story.source}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* News Modal */}
      {selectedStory && (
        <NewsModal
          story={selectedStory}
          onClose={() => setSelectedStory(null)}
        />
      )}
    </>
  );
}