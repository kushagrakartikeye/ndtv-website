'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const TrendingSearches = () => {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const response = await fetch('/api/trends');
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        setTrends(data.trends || []);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to load trends. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrends();
    const interval = setInterval(fetchTrends, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <div style={{
        maxWidth: 1100,
        margin: '40px auto',
        padding: '20px',
        background: '#1a1a1a',
        borderRadius: '12px',
        textAlign: 'center',
        color: '#ff6b6b'
      }}>
        {error}
      </div>
    );
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg,rgb(29, 30, 34) 0%,rgb(211, 38, 26) 100%)',
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
        🔥 Trending Searches in India
      </h3>
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <p style={{ color: 'white', marginTop: '10px' }}>Loading live trends...</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px'
        }}>
          {trends.map((trend, index) => (
            <div key={index} style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '12px',
              borderRadius: '8px',
              backdropFilter: 'blur(10px)',
              transition: 'transform 0.2s',
              cursor: 'pointer'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>
                {trend.title}
              </div>
              <div style={{ 
                fontSize: '0.8rem', 
                opacity: 0.8, 
                marginTop: '4px' 
              }}>
                {trend.traffic} searches
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrendingSearches;
