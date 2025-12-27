// Create this file: lib/education-api.ts
// This file contains all the API integration functions for your education page

// ============================================
// API Configuration
// ============================================
export const API_CONFIG = {
  // YouTube Data API v3
  youtube: {
    apiKey: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || '',
    channelId: process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID || '',
    baseUrl: 'https://www.googleapis.com/youtube/v3',
  },
  
  // News API for pet stories
  news: {
    apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY || '',
    baseUrl: 'https://newsapi.org/v2',
  },
  
  // Your custom articles API (when you build it)
  articles: {
    baseUrl: process.env.NEXT_PUBLIC_ARTICLES_API_URL || '/api/articles',
  },
};

// ============================================
// Type Definitions
// ============================================
export interface Video {
  id: string;
  title: string;
  youtubeId: string;
  duration: string;
  views: string;
  description: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
}

export interface Story {
  id: string;
  title: string;
  summary: string;
  image: string;
  date: string;
  source: string;
  location: 'Bangalore' | 'India' | 'World';
}

// ============================================
// YouTube API Integration
// ============================================
export async function fetchYouTubeVideos(): Promise<Video[]> {
  const { apiKey, channelId, baseUrl } = API_CONFIG.youtube;
  
  if (!apiKey || !channelId) {
    console.warn('YouTube API credentials not configured');
    return [];
  }

  try {
    // Fetch channel's latest videos
    const searchResponse = await fetch(
      `${baseUrl}/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=10&type=video`
    );

    if (!searchResponse.ok) {
      throw new Error('Failed to fetch YouTube videos');
    }

    const searchData = await searchResponse.json();
    const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',');

    // Fetch video details (duration, views, etc.)
    const detailsResponse = await fetch(
      `${baseUrl}/videos?key=${apiKey}&id=${videoIds}&part=contentDetails,statistics,snippet`
    );

    if (!detailsResponse.ok) {
      throw new Error('Failed to fetch video details');
    }

    const detailsData = await detailsResponse.json();

    // Transform to your Video format
    return detailsData.items.map((item: any) => ({
      id: item.id,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.high.url,
      youtubeId: item.id,
      duration: formatDuration(item.contentDetails.duration),
      views: formatViews(item.statistics.viewCount),
      description: item.snippet.description.substring(0, 150),
    }));
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return [];
  }
}

// Helper: Convert ISO 8601 duration to readable format
function formatDuration(isoDuration: string): string {
  const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return '0:00';

  const hours = (match[1] || '').replace('H', '');
  const minutes = (match[2] || '').replace('M', '');
  const seconds = (match[3] || '0').replace('S', '');

  if (hours) {
    return `${hours}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
  }
  return `${minutes || '0'}:${seconds.padStart(2, '0')}`;
}

// Helper: Format view count
function formatViews(views: string): string {
  const num = parseInt(views);
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

// ============================================
// News API Integration
// ============================================
export async function fetchPetNews(): Promise<Story[]> {
  const { apiKey, baseUrl } = API_CONFIG.news;
  
  if (!apiKey) {
    console.warn('News API key not configured');
    return [];
  }

  try {
    // Search for pet-related news
    const response = await fetch(
      `${baseUrl}/everything?q=(pets OR animals OR dogs OR cats OR rescue OR adoption) AND (India OR Bangalore)&sortBy=publishedAt&language=en&apiKey=${apiKey}&pageSize=20`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }

    const data = await response.json();

    // Transform to your Story format
    return data.articles
      .filter((article: any) => article.title && article.description && article.urlToImage)
      .map((article: any, index: number) => ({
        id: `news-${index}`,
        title: article.title,
        summary: article.description.substring(0, 150),
        image: article.urlToImage,
        date: formatDate(article.publishedAt),
        source: article.source.name,
        location: determineLocation(article.title + ' ' + article.description),
      }))
      .slice(0, 12);
  } catch (error) {
    console.error('Error fetching pet news:', error);
    return [];
  }
}

// Helper: Determine location based on content
function determineLocation(content: string): 'Bangalore' | 'India' | 'World' {
  const lowerContent = content.toLowerCase();
  
  if (lowerContent.includes('bangalore') || lowerContent.includes('bengaluru')) {
    return 'Bangalore';
  }
  if (lowerContent.includes('india') || lowerContent.includes('delhi') || 
      lowerContent.includes('mumbai') || lowerContent.includes('chennai')) {
    return 'India';
  }
  return 'World';
}

// Helper: Format date
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

// ============================================
// Custom Articles API Integration
// ============================================
export async function fetchArticles(): Promise<Article[]> {
  const { baseUrl } = API_CONFIG.articles;

  try {
    const response = await fetch(baseUrl);

    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

// ============================================
// Environment Setup Instructions
// ============================================
/*
TO SET UP YOUR APIs:

1. Create a .env.local file in your project root:

NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_api_key_here
NEXT_PUBLIC_YOUTUBE_CHANNEL_ID=your_channel_id_here
NEXT_PUBLIC_NEWS_API_KEY=your_news_api_key_here
NEXT_PUBLIC_ARTICLES_API_URL=http://localhost:3000/api/articles

2. Get YouTube API Key:
   - Go to https://console.cloud.google.com/
   - Create a new project
   - Enable YouTube Data API v3
   - Create credentials (API Key)
   - Copy your channel ID from your YouTube channel URL

3. Get News API Key:
   - Go to https://newsapi.org/
   - Sign up for a free account
   - Copy your API key

4. Build Your Articles API:
   - Create app/api/articles/route.ts
   - Return your custom articles in JSON format

USAGE IN YOUR EDUCATION PAGE:

import { fetchYouTubeVideos, fetchPetNews, fetchArticles } from '@/lib/education-api';

useEffect(() => {
  async function loadData() {
    const [videos, news, articles] = await Promise.all([
      fetchYouTubeVideos(),
      fetchPetNews(),
      fetchArticles(),
    ]);
    
    if (videos.length > 0) setVideos(videos);
    if (news.length > 0) setStories(news);
    if (articles.length > 0) setArticles(articles);
  }
  
  loadData();
}, []);
*/

// ============================================
// Sample Data (Fallback)
// ============================================
export const SAMPLE_VIDEOS: Video[] = [
  {
    id: '1',
    title: 'Complete Guide to Puppy Training',
    youtubeId: 'sample1',
    duration: '15:30',
    views: '2.5M',
    description: 'Learn essential puppy training techniques from professional dog trainers'
  },
  {
    id: '2',
    title: 'Cat Behavior Explained',
    youtubeId: 'sample2',
    duration: '12:45',
    views: '1.8M',
    description: 'Understanding your cat\'s body language and behavior patterns'
  },
  {
    id: '3',
    title: 'Pet Nutrition 101',
    youtubeId: 'sample3',
    duration: '18:20',
    views: '3.2M',
    description: 'Everything you need to know about feeding your pets properly'
  },
  {
    id: '4',
    title: 'Grooming Tips for Long-Haired Pets',
     youtubeId: 'sample4',
    duration: '10:15',
    views: '950K',
    description: 'Professional grooming techniques you can do at home'
  }
];

export const SAMPLE_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'The Ultimate Guide to Pet Adoption',
    excerpt: 'Everything you need to know before bringing a new furry friend home. From preparation to the first few weeks.',
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop',
    author: 'Dr. Sarah Johnson',
    date: 'March 15, 2024',
    readTime: '8 min',
    category: 'Adoption'
  },
  {
    id: '2',
    title: 'Understanding Pet Anxiety and Stress',
    excerpt: 'Learn to recognize signs of anxiety in your pets and discover effective ways to help them feel calm and secure.',
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=300&fit=crop',
    author: 'Dr. Michael Chen',
    date: 'March 12, 2024',
    readTime: '6 min',
    category: 'Health'
  },
  {
    id: '3',
    title: 'Best Indoor Activities for Your Dog',
    excerpt: 'Keep your dog entertained and mentally stimulated with these fun indoor activities perfect for rainy days.',
    image: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?w=400&h=300&fit=crop',
    author: 'Emma Williams',
    date: 'March 10, 2024',
    readTime: '5 min',
    category: 'Activities'
  },
  {
    id: '4',
    title: 'Senior Pet Care: What You Need to Know',
    excerpt: 'As pets age, their needs change. Discover how to provide the best care for your senior companion.',
    image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=400&h=300&fit=crop',
    author: 'Dr. Lisa Anderson',
    date: 'March 8, 2024',
    readTime: '7 min',
    category: 'Health'
  },
  {
    id: '5',
    title: 'Creating a Pet-Friendly Home',
    excerpt: 'Transform your living space into a safe and comfortable haven for your pets with these practical tips.',
    image: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=400&h=300&fit=crop',
    author: 'James Miller',
    date: 'March 5, 2024',
    readTime: '6 min',
    category: 'Lifestyle'
  },
  {
    id: '6',
    title: 'The Benefits of Regular Vet Checkups',
    excerpt: 'Preventive care is key to keeping your pet healthy. Learn why regular vet visits are essential.',
    image: 'https://images.unsplash.com/photo-1530041539828-114de669390e?w=400&h=300&fit=crop',
    author: 'Dr. Rachel Green',
    date: 'March 3, 2024',
    readTime: '5 min',
    category: 'Health'
  }
];

export const SAMPLE_STORIES: Story[] = [
  {
    id: '1',
    title: 'Local Shelter Saves 50 Stray Dogs in Bangalore',
    summary: 'A heartwarming rescue operation by volunteers who worked tirelessly to provide medical care and shelter.',
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop',
    date: 'Dec 20, 2024',
    source: 'Times of India',
    location: 'Bangalore'
  },
  {
    id: '2',
    title: 'Community Comes Together for Animal Welfare',
    summary: 'Residents organize fundraiser to support local animal rescue center and adoption programs.',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    date: 'Dec 18, 2024',
    source: 'The Hindu',
    location: 'India'
  },
  {
    id: '3',
    title: 'Therapy Dogs Bring Joy to Hospital Patients',
    summary: 'Specially trained therapy dogs visit children\'s hospital, spreading smiles and comfort.',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    date: 'Dec 15, 2024',
    source: 'BBC News',
    location: 'World'
  },
  {
    id: '4',
    title: 'Street Dog Becomes Hero After Alerting Family',
    summary: 'A stray dog alerted a family to a gas leak, saving lives and earning a forever home.',
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=300&fit=crop',
    date: 'Dec 12, 2024',
    source: 'India Today',
    location: 'India'
  },
  {
    id: '5',
    title: 'Tech Startup Launches Pet Adoption App',
    summary: 'New app connects shelter animals with potential adopters using AI matching technology.',
    image: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=400&h=300&fit=crop',
    date: 'Dec 10, 2024',
    source: 'Deccan Herald',
    location: 'Bangalore'
  },
  {
    id: '6',
    title: 'International Pet Rescue Organization Expands',
    summary: 'Global initiative reaches 100 countries, helping millions of animals find loving homes.',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=225&fit=crop',
    date: 'Dec 8, 2024',
    source: 'Reuters',
    location: 'World'
  }
];