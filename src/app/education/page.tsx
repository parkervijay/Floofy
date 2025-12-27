"use client";

import React, { useState, useEffect } from 'react';
import { Play, Calendar, Clock, User, Newspaper, Globe, Map, Building2, BookOpen, Eye, Sparkles, GraduationCap } from 'lucide-react';
import { fetchYouTubeVideos, fetchPetNews, fetchArticles, SAMPLE_VIDEOS, SAMPLE_ARTICLES, SAMPLE_STORIES } from '@/lib/education-api';
import { VideoCarousel } from "@/components/ui/video-carousel";
import type { Video, Article, Story } from "@/lib/education-api";
import { ArticleCarousel, FULL_ARTICLES } from "@/components/ui/article-carousel";
import { NewsCarousel } from "@/components/ui/news-carousel";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";
import { SectionTitle } from "@/components/ui/section-title";
import {RevealText}  from "@/components/ui/reveal-text";




// Configuration for future API integration
const CONFIG = {
  youtubeChannelId: 'YOUR_CHANNEL_ID', // Replace with your YouTube channel ID
  youtubeApiKey: 'YOUR_API_KEY', // Replace with your YouTube API key
  newsApiKey: 'YOUR_NEWS_API_KEY', // Replace with your News API key
  articlesApiEndpoint: '/api/articles', // Your future articles API endpoint
};

export default function EducationPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [storyFilter, setStoryFilter] = useState<'all' | 'Bangalore' | 'India' | 'World'>('all');

  useEffect(() => {
  loadData();
}, []);

const loadData = async () => {
  try {
    const apiVideos = await fetchYouTubeVideos();

    if (apiVideos.length > 0) {
      setVideos(apiVideos);
    } else {
      setVideos(SAMPLE_VIDEOS);
    }

    setArticles(SAMPLE_ARTICLES);
    setStories(SAMPLE_STORIES);
  } catch (error) {
    console.error("YouTube API failed, using fallback:", error);
    setVideos(SAMPLE_VIDEOS);
    setArticles(SAMPLE_ARTICLES);
    setStories(SAMPLE_STORIES);
  }
};



  const filteredStories = storyFilter === 'all' 
    ? stories 
    : stories.filter(story => story.location === storyFilter);

  const getLocationIcon = (location: Story['location']) => {
    switch (location) {
      case 'Bangalore':
        return <Building2 size={16} />;
      case 'India':
        return <Map size={16} />;
      case 'World':
        return <Globe size={16} />;
    }
  };

  const getLocationColor = (location: Story['location']) => {
    switch (location) {
      case 'Bangalore':
        return 'bg-blue-500';
      case 'India':
        return 'bg-orange-500';
      case 'World':
        return 'bg-[#F4A259]';
    }
  };

  return (
   <main className="min-h-screen">
  <section className="py-12 px-6">
    <div className="container">
      {/* Education Header */}
      
<div className="text-center mt-[calc(var(--nav-height)+3rem)] mb-16">
  <div data-native-cursor>
  <RevealText
    text="PetWise"
    className="mt-[calc(var(--nav-height)+3rem)] mb-8"
  />
</div>
</div>
      {/* Educational Videos */}
      <div className="text-center mb-10">
        <AnimatedText
          text="Educational Videos"
          textClassName="text-4xl md:text-5xl"
          underlineDuration={1.2}
        />
      </div>

      <VideoCarousel videos={videos} />
    </div>
  </section>
      {/* Articles */}
<section className="py-12 px-6">
  <div className="container">
    {/* Articles Title */}
    <div className="text-center mt-20 mb-10">
      <AnimatedText
        text="Pet Care Articles"
        textClassName="text-4xl md:text-5xl"
        underlineDuration={1.2}
      />
    </div>
    <div className="md:block">
  <ArticleCarousel articles={FULL_ARTICLES} />
</div>

  </div>
</section>

      {/* FurryFeed Section */}
     <section className="py-12 px-6">
  <div className="container">
    <div className="text-center mb-10">
      <AnimatedText
        text="FurryFeed"
        textClassName="text-4xl md:text-5xl"
        underlineDuration={1.2}
      />

      <div className="mt-7">
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <button
            onClick={() => setStoryFilter("all")}
            className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 shadow-md ${
              storyFilter === "all"
                ? "bg-[#F4A259] text-white shadow-lg scale-105"
                : "bg-white text-[var(--charcoal)] hover:bg-gray-50 hover:shadow-lg border border-[#F4A259]/20"
            }`}
          >
            All Stories
          </button>

          <button
            onClick={() => setStoryFilter("Bangalore")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-medium transition-all duration-300 shadow-md ${
              storyFilter === "Bangalore"
                ? "bg-blue-600 text-white shadow-lg scale-105"
                : "bg-white text-[var(--charcoal)] hover:bg-gray-50 hover:shadow-lg border border-[#F4A259]/20"
            }`}
          >
            <Building2 size={18} />
            Bangalore
          </button>

          <button
            onClick={() => setStoryFilter("India")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-medium transition-all duration-300 shadow-md ${
              storyFilter === "India"
                ? "bg-orange-600 text-white shadow-lg scale-105"
                : "bg-white text-[var(--charcoal)] hover:bg-gray-50 hover:shadow-lg border border-[#F4A259]/20"
            }`}
          >
            <Map size={18} />
            India
          </button>

          <button
            onClick={() => setStoryFilter("World")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-medium transition-all duration-300 shadow-md ${
              storyFilter === "World"
                ? "bg-[#F4A259] text-white shadow-lg scale-105"
                : "bg-white text-[var(--charcoal)] hover:bg-gray-50 hover:shadow-lg border border-[#F4A259]/20"
            }`}
          >
            <Globe size={18} />
            World
          </button>
        </div>
      </div>
    </div>

    <NewsCarousel location={storyFilter} />
  </div>
</section>
</main>
  );
}