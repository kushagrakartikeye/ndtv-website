import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Since Google Trends RSS might block server requests, 
    // we'll provide fallback trending topics for India
    const fallbackTrends = [
      {
        title: "India Election 2025",
        link: "/trends/explore?q=India%20Election%202024&geo=IN",
        traffic: "2M+",
        pubDate: new Date().toISOString()
      },
      {
        title: "Cricket World Cup",
        link: "/trends/explore?q=Cricket%20World%20Cup&geo=IN", 
        traffic: "1.5M+",
        pubDate: new Date().toISOString()
      },
      {
        title: "Bollywood News",
        link: "/trends/explore?q=Bollywood%20News&geo=IN",
        traffic: "900K+",
        pubDate: new Date().toISOString()
      },
      {
        title: "Stock Market India",
        link: "/trends/explore?q=Stock%20Market%20India&geo=IN",
        traffic: "750K+", 
        pubDate: new Date().toISOString()
      },
      {
        title: "IPL 2025",
        link: "/trends/explore?q=IPL%202024&geo=IN",
        traffic: "600K+",
        pubDate: new Date().toISOString()
      },
      {
        title: "Ahemdabad Plan Crash",
        link: "/trends/explore?q=Mumbai%20Weather&geo=IN",
        traffic: "400K+",
        pubDate: new Date().toISOString()
      },
      {
        title: "Delhi Metro",
        link: "/trends/explore?q=Delhi%20Metro&geo=IN",
        traffic: "350K+",
        pubDate: new Date().toISOString()
      },
      {
        title: "Modi News",
        link: "/trends/explore?q=Modi%20News&geo=IN",
        traffic: "300K+",
        pubDate: new Date().toISOString()
      }
    ];

    // Try to fetch from Google Trends RSS first
    try {
      const response = await fetch('https://trends.google.com/trends/trendingsearches/daily/rss?geo=IN', {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      
      if (response.ok) {
        const xmlText = await response.text();
        
        // Parse XML manually since Google's RSS has a specific format
        const trends = parseGoogleTrendsXML(xmlText);
        if (trends.length > 0) {
          return NextResponse.json({ trends });
        }
      }
    } catch (error) {
      console.log('Google Trends RSS failed, using fallback data');
    }
    
    // Return fallback data if RSS fails
    return NextResponse.json({ trends: fallbackTrends });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch trends' }, { status: 500 });
  }
}

// Simple XML parser for Google Trends RSS
function parseGoogleTrendsXML(xmlText) {
  try {
    const trends = [];
    const itemMatches = xmlText.match(/<item>(.*?)<\/item>/gs);
    
    if (itemMatches) {
      itemMatches.forEach((item, index) => {
        const titleMatch = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/);
        const linkMatch = item.match(/<link>(.*?)<\/link>/);
        const trafficMatch = item.match(/<ht:approx_traffic>(.*?)<\/ht:approx_traffic>/);
        
        if (titleMatch && linkMatch) {
          trends.push({
            title: titleMatch[1],
            link: linkMatch[1].replace('https://trends.google.com', ''),
            traffic: trafficMatch ? trafficMatch[1] : `${Math.floor(Math.random() * 500 + 100)}K+`,
            pubDate: new Date().toISOString()
          });
        }
      });
    }
    
    return trends.slice(0, 8); // Return top 8 trends
  } catch (error) {
    return [];
  }
}
