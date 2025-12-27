// lib/articles-data.ts
export interface FullArticle {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  content: string;
}

export const FULL_ARTICLES: FullArticle[] = [
  // Copy all the article objects from the artifact here
  {
    id: '1',
    title: 'The Ultimate Guide to Pet Adoption',
    excerpt: 'Everything you need to know...',
    // ... rest of article data
  },
  // Add more articles here in the future
];