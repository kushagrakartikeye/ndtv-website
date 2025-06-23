'use client';
import { useEffect, useRef, useState } from 'react';

const GoogleTrendsWidget = ({ keywords = ["India Election","Cricket World Cup","Bollywood News","Stock Market"], type = 'TIMESERIES' }) => {
  const widgetRef = useRef(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Don't render if no keywords provided
  if (!keywords || keywords.length === 0) {
    return (
      <div style={{
        width: '100%',
        height: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        color: '#666'
      }}>
        <div style={{ textAlign: 'center' }}>
          <p>🔍 No trending topics available</p>
          <p style={{ fontSize: '0.9rem' }}>Keywords needed to display trends</p>
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (scriptLoaded) return;
    
    const script = document.createElement('script');
    script.src = 'https://ssl.gstatic.com/trends_nrtr/3620_RC01/embed_loader.js';
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);
  }, [scriptLoaded]);

  useEffect(() => {
    if (!scriptLoaded || !widgetRef.current) return;
    
    widgetRef.current.innerHTML = '';
    
    const comparisonItems = keywords.map(keyword => ({
      keyword: keyword,
      geo: 'IN',
      time: 'today 3-m'
    }));

    try {
      window.trends.embed.renderExploreWidgetTo(
        widgetRef.current,
        type,
        {
          comparisonItem: comparisonItems,
          category: 0,
          property: ''
        },
        {
          exploreQuery: `q=${keywords.map(k => encodeURIComponent(k)).join(',')}&geo=IN&date=today 3-m`,
          guestPath: 'https://trends.google.com:443/trends/embed/'
        }
      );
    } catch (error) {
      console.error('Google Trends widget failed to load:', error);
      widgetRef.current.innerHTML = '<p style="color: #666; text-align: center; padding: 20px;">Unable to load trends data</p>';
    }
  }, [scriptLoaded, keywords, type]);

  return (
    <div style={{
      width: '100%',
      height: '400px',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      border: '1px solid #e0e0e0'
    }} ref={widgetRef} />
  );
};

export default GoogleTrendsWidget;
