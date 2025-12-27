export interface NewsStory {
  id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  date: string;
  source: string;
  sourceUrl: string;
  location: 'Bangalore' | 'India' | 'World';
}