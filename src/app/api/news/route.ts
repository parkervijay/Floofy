import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Cache for 1 hour

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
  content: string;
}

function determineLocation(text: string): 'Bangalore' | 'India' | 'World' {
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('bangalore') || lowerText.includes('bengaluru')) {
    return 'Bangalore';
  }
  if (lowerText.includes('india') || lowerText.includes('delhi') || 
      lowerText.includes('mumbai') || lowerText.includes('chennai') ||
      lowerText.includes('kolkata') || lowerText.includes('hyderabad')) {
    return 'India';
  }
  return 'World';
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
}

function cleanContent(content: string | null, description: string): string {
  if (!content) return description;
  
  // Remove "... [+xxx chars]" from NewsAPI
  const cleaned = content.replace(/\[\+\d+\s+chars\]$/, '').trim();
  
  // If content is too short, use description
  if (cleaned.length < 100) return description;
  
  return cleaned;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get('location') || 'all';

  try {
    const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'News API key not configured' },
        { status: 500 }
      );
    }

    // Build search query based on location
    let query = '(pets OR dogs OR cats OR animals OR rescue OR adoption OR shelter OR wildlife)';
    
    if (location === 'Bangalore') {
      query += ' AND (Bangalore OR Bengaluru)';
    } else if (location === 'India') {
      query += ' AND India';
    }

    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=publishedAt&language=en&pageSize=50&apiKey=${apiKey}`;

    const response = await fetch(url, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }

    const data = await response.json();

    // Transform and filter articles
    const stories = data.articles
      .filter((article: NewsArticle) => 
        article.title && 
        article.description && 
        article.urlToImage &&
        !article.title.includes('[Removed]') &&
        article.urlToImage.startsWith('http')
      )
      .map((article: NewsArticle, index: number) => ({
        id: `news-${Date.now()}-${index}`,
        title: article.title,
        summary: article.description,
        content: cleanContent(article.content, article.description),
        image: article.urlToImage,
        date: formatDate(article.publishedAt),
        source: article.source.name,
        sourceUrl: article.url,
        location: determineLocation(article.title + ' ' + article.description),
      }))
      .slice(0, 30); // Limit to 30 stories

    return NextResponse.json({
      success: true,
      stories,
      count: stories.length,
      lastUpdated: new Date().toISOString()
    });

  } catch (error) {
    console.error('News API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news', details: error },
      { status: 500 }
    );
  }
}