"use client";

import React, { useState, useEffect } from 'react';
import { Play, Calendar, Clock, User, Newspaper, Globe, Map, Building2, BookOpen, Eye, Sparkles, GraduationCap } from 'lucide-react';
import { fetchYouTubeVideos, fetchPetNews, fetchArticles, SAMPLE_VIDEOS, SAMPLE_ARTICLES, SAMPLE_STORIES } from '@/lib/education-api';
import { VideoCarousel } from "@/components/ui/video-carousel";
import type { Video, Article, Story } from "@/lib/education-api";




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
      {/* Hero Section */}
      <header className="page-header">
        <div className="container">
          <div className="relative inline-block">
            <h1>Pet Education Hub</h1>
          </div>
          <p className="mt-4">
            Everything you need to know about caring for your furry friends
          </p>
        </div>
      </header>

      {/* Videos Section */}
      {/* Videos Section */}
<section className="py-12 px-6">
  <div className="container">
    <div className="text-center mb-10">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Play size={28} className="text-[#F4A259] relative -top-[28px]" />
        <h2 className="section-title leading-tight">
          Educational <span>Videos</span>
        </h2>
      </div>
      <p className="text-lg text-[var(--grey-medium)]">
        Learn from expert pet care tutorials and guides
      </p>
    </div>

    <VideoCarousel videos={videos} />
  </div>
</section>

      {/* Articles Section */}
      <section className="py-12 px-6">
        <div className="container">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <BookOpen className="text-[#F4A259] relative -top-[26.7px]" size={36} />
              <h2 className="section-title inline-block mb-0">
                Pet Care <span>Articles</span>
              </h2>
            </div>
            <p className="text-lg text-[var(--grey-medium)]">
              Expert advice and tips for happy, healthy pets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <div
                key={article.id}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 border-[#F4A259]/20 hover:border-[#F4A259]/40"
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#F4A259] text-white text-xs px-4 py-1.5 rounded-full font-medium shadow-lg">
                      {article.category}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-[var(--charcoal)] mb-3 line-clamp-2 group-hover:text-[#F4A259] transition-all">
                    {article.title}
                  </h3>
                  <p className="text-[var(--grey-medium)] mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-sm text-[var(--grey-medium)] pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <User size={16} />
                      <span className="font-medium">{article.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[var(--grey-medium)] mt-2">
                    <Calendar size={16} />
                    <span>{article.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FurryFeed Section */}
      <section className="py-12 px-6">
        <div className="container">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Newspaper className="text-[#F4A259] relative -top-[29px]" size={40} />
              <h2 className="section-title inline-block mb-0">
                <span>FurryFeed</span>
              </h2>
            </div>
            <p className="text-lg text-[var(--grey-medium)] mb-6">
              Weekly heartwarming stories from around the world
            </p>

            <div className="flex items-center justify-center gap-3 flex-wrap">
              <button
                onClick={() => setStoryFilter('all')}
                className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 shadow-md ${
                  storyFilter === 'all'
                    ? 'bg-[#F4A259] text-white shadow-lg scale-105'
                    : 'bg-white text-[var(--charcoal)] hover:bg-gray-50 hover:shadow-lg border border-[#F4A259]/20'
                }`}
              >
                All Stories
              </button>
              <button
                onClick={() => setStoryFilter('Bangalore')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-medium transition-all duration-300 shadow-md ${
                  storyFilter === 'Bangalore'
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-white text-[var(--charcoal)] hover:bg-gray-50 hover:shadow-lg border border-[#F4A259]/20'
                }`}
              >
                <Building2 size={18} />
                Bangalore
              </button>
              <button
                onClick={() => setStoryFilter('India')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-medium transition-all duration-300 shadow-md ${
                  storyFilter === 'India'
                    ? 'bg-orange-600 text-white shadow-lg scale-105'
                    : 'bg-white text-[var(--charcoal)] hover:bg-gray-50 hover:shadow-lg border border-[#F4A259]/20'
                }`}
              >
                <Map size={18} />
                India
              </button>
              <button
                onClick={() => setStoryFilter('World')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-medium transition-all duration-300 shadow-md ${
                  storyFilter === 'World'
                    ? 'bg-[#F4A259] text-white shadow-lg scale-105'
                    : 'bg-white text-[var(--charcoal)] hover:bg-gray-50 hover:shadow-lg border border-[#F4A259]/20'
                }`}
              >
                <Globe size={18} />
                World
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStories.map((story) => (
              <div
                key={story.id}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 border-[#F4A259]/20 hover:border-[#F4A259]/40"
              >
                <div className="relative overflow-hidden h-56">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
            ))}
          </div>

          {filteredStories.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[var(--grey-medium)] text-lg">No stories found for this location.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}