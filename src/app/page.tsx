'use client';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Logo from '../../components/Logo';
import Navbar from '../../components/Navbar';
import FAQ from '../../components/FAQ';
import SplashScreen from '../../components/SplashScreen';
import { useNDTVRss } from '../../components/useNDTVRss';
import Link from 'next/link';
import RecommendationPopup from '../../components/RecommendationPopup';
import TrendingSearches from '../../components/TrendingSearches';

// Default images for empty cards
const defaultImages = [
  '/headlines/default1.png',
  '/headlines/default2.png',
  '/headlines/default3.png',
  '/headlines/default4.png',
  '/headlines/default5.png'
];

// Static headlines (fallback)
const staticHeadlines = [
  {
    title: `"We Are Ready": Mamata Banerjee's 'Poll Battle' Dare For PM After Criticism`,
    url: "https://www.ndtv.com/india-news/we-are-ready-mamata-banerjees-poll-battle-dare-for-pm-after-criticism-8537296",
    image: "/headlines/we-are-ready.png",
    isLive: false
  },
  {
    title: "इजरायल ने ही मारा था हानिया को, काट्ज ने मान लिया, जानिए नासा के पार्कर से लेकर दुनिया की 10 बड़ी खबरें",
    url: "https://ndtv.in/topic/top-headlines",
    image: "/headlines/israel-news.png",
    isLive: false
  },
  {
    title: "Top 25 Headlines Today : प्रयागराज में UPPSC कार्यालय के बाहर छात्रों का प्रदर्शन, दिल्ली मेट्रो ने शुरू की बाइक टैक्सी सेवा",
    url: "https://ndtv.in/topic/top-headlines",
    image: "/headlines/uppsc-protest.png",
    isLive: false
  },
  {
    title: "Breaking News : लेबनान में इजरायली बमबारी में मरने वालों की संख्या हुई 274, हिज्बुल्लाह के 800 ठिकाने बने निशाना",
    url: "https://ndtv.in/topic/top-headlines",
    image: "/headlines/lebanon-bombing.png",
    isLive: false
  },
  {
    title: "TOP HINDI NEWS: शिवसेना नेता संजय राऊत की ED हिरासत 8 अगस्त तक बढ़ी.",
    url: "https://ndtv.in/india/top-headlines-live-updates-big-breaking-stories-china-taiwan-tiranga-rally-updates-3222993",
    image: "/headlines/weird.png",
    isLive: false
  }
];

// Aggressive emotion filtering configuration
const aggressiveKeywords = {
  positive: {
    include: [
      'success', 'win', 'achievement', 'celebration', 'good', 'positive', 'growth', 
      'victory', 'boost', 'improve', 'launch', 'new', 'advance', 'record', 'breakthrough',
      'award', 'honor', 'triumph', 'milestone', 'innovation'
    ],
    exclude: [
      'death', 'kill', 'murder', 'terror', 'crisis', 'accident', 'arrest', 'attack',
      'protest', 'riot', 'clash', 'emergency', 'fire', 'crash', 'disaster'
    ]
  },
  calm: {
    include: [
      'health', 'education', 'culture', 'art', 'science', 'research', 'study', 
      'development', 'environment', 'peace', 'community', 'support', 'charity',
      'help', 'relief', 'nature', 'meditation', 'wellness', 'yoga'
    ],
    exclude: [
      'breaking', 'urgent', 'protest', 'violence', 'riot', 'clash', 'emergency',
      'terror', 'murder', 'death', 'attack', 'disaster', 'war', 'conflict', 'crash'
    ]
  },
  neutral: {
    include: [],
    exclude: []
  }
};

// Recommendation tracking hook
function useRecommendation() {
  const [interactions, setInteractions] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('ndtvInteractions');
    setInteractions(saved ? JSON.parse(saved) : []);
  }, []);

  const trackInteraction = useCallback((type, data) => {
    const newInteraction = { type, data, timestamp: Date.now() };
    setInteractions(prev => {
      const updated = [...prev, newInteraction].slice(-50);
      localStorage.setItem('ndtvInteractions', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const getRecommendations = useCallback((headlines) => {
    const keywords = interactions.flatMap(interaction => {
      if (interaction.type === 'search') return interaction.data.toLowerCase().split(' ');
      if (interaction.type === 'click') return interaction.data.title.toLowerCase().match(/\b\w+\b/g) || [];
      return [];
    });

    const keywordCounts = keywords.reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {});

    return headlines
      .filter(headline => {
        const titleWords = headline.title.toLowerCase().match(/\b\w+\b/g) || [];
        return titleWords.some(word => keywordCounts[word] > 0);
      })
      .slice(0, 5);
  }, [interactions]);

  return { trackInteraction, getRecommendations, showPopup, setShowPopup, interactions };
}

// Emotion filtering function
const getFilteredHeadlines = (liveHeadlines, staticHeadlines, emotion) => {
  const allHeadlines = [...liveHeadlines, ...staticHeadlines];
  const withImages = allHeadlines.map((h, index) => ({
    ...h,
    image: h.image || defaultImages[index % defaultImages.length]
  }));

  if (!emotion) return withImages.slice(0, 15);

  const config = aggressiveKeywords[emotion.newsType] || aggressiveKeywords.neutral;
  
  return withImages.filter(headline => {
    const text = `${headline.title} ${headline.description || ''}`.toLowerCase();
    if (config.exclude.some(kw => text.includes(kw))) return false;
    return config.include.length === 0 || config.include.some(kw => text.includes(kw));
  }).slice(0, 15);
};

// Google Trends Widget Component
function GoogleTrendsChart() {
  const trendsRef = useRef(null);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);

  useEffect(() => {
    // Load Google Trends script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://ssl.gstatic.com/trends_nrtr/4116_RC01/embed_loader.js';
    script.onload = () => setScriptsLoaded(true);
    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (scriptsLoaded && trendsRef.current && window.trends) {
      // Clear previous content
      trendsRef.current.innerHTML = '';
      
      // Render the Google Trends widget
      window.trends.embed.renderExploreWidgetTo(
        trendsRef.current,
        "TIMESERIES",
        {
          "comparisonItem": [
            {"keyword": "India Election", "geo": "IN", "time": "today 3-m"},
            {"keyword": "Cricket World Cup", "geo": "IN", "time": "today 3-m"},
            {"keyword": "Bollywood News", "geo": "IN", "time": "today 3-m"},
            {"keyword": "Stock Market", "geo": "IN", "time": "today 3-m"}
          ],
          "category": 0,
          "property": ""
        },
        {
          "exploreQuery": "q=India%20Election,Cricket%20World%20Cup,Bollywood%20News,Stock%20Market&geo=IN&date=today%203-m",
          "guestPath": "https://trends.google.com:443/trends/embed/"
        }
      );
    }
  }, [scriptsLoaded]);

  return (
    <div 
      ref={trendsRef}
      style={{
        width: '100%',
        height: '400px',
        background: 'white',
        borderRadius: '8px',
        overflow: 'hidden'
      }}
    />
  );
}

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [userEmotion, setUserEmotion] = useState(null);
  const [showContent, setShowContent] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  
  const { trackInteraction, getRecommendations, showPopup, setShowPopup, interactions } = useRecommendation();
  const { headlines: liveHeadlines, loading, error, refresh } = useNDTVRss();

  const allHeadlines = useMemo(
    () => [...liveHeadlines, ...staticHeadlines],
    [liveHeadlines]
  );

  const filteredHeadlines = getFilteredHeadlines(liveHeadlines, staticHeadlines, userEmotion);

  useEffect(() => {
    setRecommendations(getRecommendations(allHeadlines));
  }, [interactions, getRecommendations, allHeadlines]);

  const handleSearchInput = (e) => {
    const query = e.target.value;
    setSearchInput(query);
    if (query.length > 2) trackInteraction('search', query);
  };

  const handleCardClick = (headline) => {
    trackInteraction('click', headline);
    if (!showPopup) setShowPopup(true);
  };

  const handleSplashComplete = (emotion) => {
    setUserEmotion(emotion);
    setShowSplash(false);
    setTimeout(() => setShowContent(true), 100);
  };

  const handleRefresh = () => {
    refresh();
    setRecommendations(getRecommendations(allHeadlines));
  };

  if (showSplash) return <SplashScreen onComplete={handleSplashComplete} />;

  return (
    <div style={{
      opacity: showContent ? 1 : 0,
      transform: showContent ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
      <Logo />
      <Navbar />
      <main style={{
        paddingTop: showContent ? '0' : '60px',
        transition: 'padding-top 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 700,
          margin: '32px 0 12px 0',
          letterSpacing: '0.01em',
          opacity: showContent ? 1 : 0,
          transform: showContent ? 'translateY(0)' : 'translateY(10px)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s'
        }}>
          Welcome to NDTV
        </h1>

        {userEmotion && (
          <p style={{
            fontSize: '1rem',
            color: '#4CAF50',
            marginBottom: 16,
            fontStyle: 'italic',
            opacity: showContent ? 1 : 0,
            transform: showContent ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s'
          }}>
            Showing {userEmotion.description} for you ✨
          </p>
        )}

        <div style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          margin: '24px 0',
          opacity: showContent ? 1 : 0,
          transform: showContent ? 'translateY(0)' : 'translateY(15px)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s'
        }}>
          <form
            action="https://www.ndtv.com/search"
            method="GET"
            target="_blank"
            style={{ maxWidth: '600px', width: '100%' }}
          >
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                name="searchtext"
                placeholder="Search NDTV News..."
                value={searchInput}
                onChange={handleSearchInput}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '4px',
                  border: '1px solid #9a0102',
                  fontSize: '16px'
                }}
                required
              />
              <button
                type="submit"
                style={{
                  backgroundColor: '#e53935',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Search
              </button>
            </div>
          </form>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: 700,
          margin: '0 0 18px 0',
          opacity: showContent ? 1 : 0,
          transform: showContent ? 'translateY(0)' : 'translateY(10px)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.5s'
        }}>
          <p style={{ fontSize: '1.1rem', color: '#bbb', margin: 0 }}>
            Here are NDTV's Top headlines! <b>({filteredHeadlines.length})</b>
          </p>
          
          {loading && <span style={{ color: '#4CAF50', fontSize: '0.9rem' }}>Loading...</span>}
          
          <button
            onClick={handleRefresh}
            disabled={loading}
            style={{
              padding: '6px 12px',
              background: 'transparent',
              border: '1px solid #666',
              borderRadius: 4,
              color: '#ccc',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '0.8rem',
              opacity: loading ? 0.5 : 1
            }}
          >
            🔄 Refresh
          </button>
        </div>

        <section style={{
          maxWidth: 1100,
          margin: '18px auto 14px auto',
          display: 'flex',
          gap: 6,
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {filteredHeadlines.map((headline, idx) => (
            <Link
              key={`${headline.url}-${idx}`}
              href={headline.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleCardClick(headline)}
              style={{
                position: 'relative',
                width: 200,
                height: 320,
                borderRadius: 8,
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: headline.isLive ? '0 3px 8px rgba(76,175,80,0.3)' : '0 3px 8px rgba(0,0,0,0.18)',
                transition: `transform 0.22s cubic-bezier(.4,2,.6,1), 
                            opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${0.6 + idx * 0.1}s, 
                            transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${0.6 + idx * 0.1}s`,
                display: 'flex',
                alignItems: 'flex-end',
                color: '#fff',
                textDecoration: 'none',
                backgroundColor: '#000',
                margin: 0,
                opacity: showContent ? 1 : 0,
                transform: showContent ? 'translateY(0)' : 'translateY(30px)',
                border: headline.isLive ? '2px solid #4CAF50' : 'none'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.035)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              {headline.isLive && (
                <div style={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  background: '#4CAF50',
                  color: 'white',
                  padding: '2px 6px',
                  borderRadius: 4,
                  fontSize: '0.7rem',
                  fontWeight: 'bold',
                  zIndex: 3
                }}>
                  LIVE
                </div>
              )}
              <img
                src={headline.image}
                alt={headline.title}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'brightness(0.65)'
                }}
                onError={(e) => {
                  e.target.src = defaultImages[idx % defaultImages.length];
                }}
              />
              <div style={{
                position: 'relative',
                width: '100%',
                padding: '12px 8px',
                fontWeight: '600',
                fontSize: '1.01rem',
                zIndex: 2,
                textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                background: 'linear-gradient(0deg, rgba(0,0,0,0.65) 40%, rgba(0,0,0,0.15) 100%)',
                borderBottomLeftRadius: 8,
                borderBottomRightRadius: 8,
                minHeight: 54,
                maxHeight: 80,
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'flex-end'
              }}>
                {headline.title}
              </div>
            </Link>
          ))}
        </section>

        {recommendations.length > 0 && (
          <div style={{ 
            marginTop: 40,
            opacity: showContent ? 1 : 0,
            transform: showContent ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
          }}>
            <h2 style={{ fontSize: '1.5rem', color: '#4CAF50', marginBottom: 20, fontWeight: 500 }}>
              Recommended for You
            </h2>
            <div style={{ 
              display: 'flex', 
              gap: 20, 
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              {recommendations.map((headline, idx) => (
                <Link
                  key={`rec-${idx}`}
                  href={headline.url}
                  target="_blank"
                  rel="noopener"
                  style={{ 
                    width: 300,
                    border: '2px solid #4CAF50',
                    borderRadius: 8,
                    padding: 12,
                    background: '#000',
                    color: '#fff',
                    textDecoration: 'none',
                    transition: 'transform 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  {headline.title}
                </Link>
              ))}
            </div>
          </div>
        )}

        <section style={{
          maxWidth: 1100,
          margin: '40px auto',
          opacity: showContent ? 1 : 0,
          transform: showContent ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
          <TrendingSearches />
        </section>

        <section style={{
          maxWidth: 1100,
          margin: '60px auto',
          opacity: showContent ? 1 : 0,
          transform: showContent ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
          <h2 style={{
            fontSize: '1.8rem',
            color: '#4CAF50',
            marginBottom: '24px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textAlign: 'center',
            justifyContent: 'center'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="#4CAF50">
              <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
            </svg>
            Trending News Topics
          </h2>
          
          <div style={{ 
            background: 'linear-gradient(135deg,rgb(36, 30, 30) 0%, rgb(186, 40, 27 100%)',
            borderRadius: '12px',
            padding: '24px',
            color: 'white',
            marginBottom: '20px'
          }}>
            <h3 style={{ 
              margin: '0 0 16px 0', 
              fontSize: '1.2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              🔥 Currently Trending in India
            </h3>
            <GoogleTrendsChart />
          </div>
        </section>

        <div style={{
          opacity: showContent ? 1 : 0,
          transform: showContent ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.7s'
        }}>
          <FAQ />
        </div>

        {showPopup && (
          <RecommendationPopup 
            recommendations={recommendations.slice(0, 3)} 
            onClose={() => setShowPopup(false)}
          />
        )}
      </main>
    </div>
  );
}
