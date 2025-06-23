'use client';
import { useState, useEffect } from 'react';

export function useNDTVRss() {
  const [headlines, setHeadlines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRSSHeadlines = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // NDTV RSS feeds
      const rssFeeds = [
        'https://feeds.feedburner.com/ndtvnews-latest',
        'https://feeds.feedburner.com/ndtvnews-india-news',
        'https://feeds.feedburner.com/NDTV-Business'
      ];

      // Use CORS proxy to fetch RSS feeds
      const corsProxy = 'https://api.rss2json.com/v1/api.json?rss_url=';
      
      const promises = rssFeeds.map(async (feedUrl) => {
        try {
          const response = await fetch(corsProxy + encodeURIComponent(feedUrl));
          const data = await response.json();
          
          if (data.status === 'ok' && data.items) {
            return data.items.slice(0, 5); // Get 5 items from each feed
          }
          return [];
        } catch (err) {
          console.error(`Failed to fetch ${feedUrl}:`, err);
          return [];
        }
      });

      const results = await Promise.all(promises);
      
      // Combine all articles
      const allArticles = results.flat();
      
      // Transform to match our card format
      const transformedHeadlines = allArticles.map((item, index) => ({
        title: item.title,
        url: item.link,
        image: extractImageFromContent(item.content) || '/headlines/default-news.png',
        headline: item.title,
        description: item.description || '',
        pubDate: item.pubDate,
        isLive: true // Mark as live content
      }));

      // Remove duplicates and sort by date
      const uniqueHeadlines = transformedHeadlines
        .filter((item, index, self) => 
          index === self.findIndex((t) => t.title === item.title)
        )
        .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
        .slice(0, 12); // Limit to 12 most recent

      setHeadlines(uniqueHeadlines);
    } catch (err) {
      console.error('Error fetching RSS headlines:', err);
      setError('Failed to load live headlines');
      setHeadlines([]);
    } finally {
      setLoading(false);
    }
  };

  // Extract image from RSS content
  const extractImageFromContent = (content) => {
    if (!content) return null;
    
    const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
    return imgMatch ? imgMatch[1] : null;
  };

  useEffect(() => {
    fetchRSSHeadlines();
    
    // Refresh every 10 minutes
    const interval = setInterval(fetchRSSHeadlines, 600000);
    return () => clearInterval(interval);
  }, []);

  return { headlines, loading, error, refresh: fetchRSSHeadlines };
}
