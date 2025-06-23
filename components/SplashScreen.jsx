'use client';
import { useState, useEffect } from 'react';
import { useGlobalAudio } from "../components/GlobalAudioProvider";

export default function SplashScreen({ onComplete }) {
  const [showLogo, setShowLogo] = useState(false);
  const [moveLogoUp, setMoveLogoUp] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { changeMusic } = useGlobalAudio();

  const emotions = [
    { 
      name: 'cheery', 
      label: '😊 Cheery',
      newsType: 'positive',
      musicFile: '/audio/upbeat.mp3',
      description: 'Uplifting and positive news'
    },
    { 
      name: 'unhappy', 
      label: '😢 Unhappy',
      newsType: 'calm',
      musicFile: '/audio/calm.mp3',
      description: 'Gentle and soothing news'
    },
    { 
      name: 'frustrated', 
      label: '😤 Frustrated',
      newsType: 'neutral',
      musicFile: '/audio/ambient.mp3',
      description: 'Balanced and informative news'
    }
  ];

  useEffect(() => {
    setShowLogo(true);
    // Wait 5 seconds, then move logo up and show prompt/cards
    const timer = setTimeout(() => {
      setMoveLogoUp(true);
      setTimeout(() => setShowPrompt(true), 600); // allow logo to move up first
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleEmotionSelect = (emotion) => {
    setSelectedEmotion(emotion);
    changeMusic(emotion.musicFile);
    setTimeout(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        onComplete(emotion);
      }, 1500);
    }, 1200);
  };

  return (
    <div 
      className={`splash-container ${isTransitioning ? 'transitioning' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: '#9a0102',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: moveLogoUp ? 'flex-start' : 'center',
        zIndex: 9999,
        color: 'white',
        transition: 'justify-content 1s, transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {/* Logo */}
      <div 
        className={`logo-container ${moveLogoUp ? 'move-up' : ''} ${isTransitioning ? 'to-header' : ''}`}
        style={{
          opacity: showLogo ? 1 : 0,
          transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
          marginTop: moveLogoUp ? '7vh' : '0',
          marginBottom: moveLogoUp ? '2vh' : '0',
          position: isTransitioning ? 'fixed' : 'relative',
          top: isTransitioning ? '20px' : 'auto',
          left: isTransitioning ? '50%' : 'auto',
          zIndex: isTransitioning ? 10001 : 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100vw'
        }}
      >
        <img 
          src="/logo.png" 
          alt="NDTV Logo"
          style={{
            width: isTransitioning ? 120 : 180,
            height: 'auto',
            display: 'block',
            margin: '0 auto',
            transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1), transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />
      </div>

      {/* Prompt and Emotion Cards */}
      {showPrompt && !selectedEmotion && !isTransitioning && (
        <div 
          className="prompt-float"
          style={{
            marginTop: '7vh',
            textAlign: 'center',
            animation: 'float 3.5s ease-in-out infinite',
            opacity: showPrompt ? 1 : 0,
            transition: 'opacity 0.8s'
          }}>
          <h2 style={{ 
            fontSize: '1.2rem', 
            marginBottom: 22,
            fontWeight: 400,
            letterSpacing: '0.5px'
          }}>
            How are we feeling today?
          </h2>
          <div 
            className="emotions-float"
            style={{
              display: 'flex',
              gap: 18,
              flexWrap: 'wrap',
              justifyContent: 'center',
              animation: 'float 4.5s ease-in-out infinite',
            }}
          >
            {emotions.map((emotion) => (
              <button
                key={emotion.name}
                onClick={() => handleEmotionSelect(emotion)}
                style={{
                  background: 'rgba(255,255,255,0.13)',
                  border: '2px solid rgba(255,255,255,0.24)',
                  borderRadius: 13,
                  padding: '7px 18px',
                  color: 'white',
                  fontSize: '0.98rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  minWidth: 96,
                  boxShadow: '0 2px 10px rgba(0,0,0,0.06)'
                }}
                onMouseOver={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.22)';
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.13)';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }}
              >
                {emotion.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Selected Emotion Feedback */}
      {selectedEmotion && !isTransitioning && (
        <div style={{
          textAlign: 'center',
          animation: 'fadeIn 0.5s ease-out'
        }}>
          <h3 style={{
            fontSize: '1.2rem',
            marginBottom: 10,
            fontWeight: 300
          }}>
            Perfect! 
          </h3>
          <p style={{
            fontSize: '1rem',
            opacity: 0.9
          }}>
            We'll show you {selectedEmotion.description}
          </p>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        .splash-container.transitioning {
          transform: translateY(-100vh);
        }
        .logo-container.move-up {
          transition: margin-top 1s cubic-bezier(0.4,0,0.2,1), transform 1.2s cubic-bezier(0.4,0,0.2,1);
          margin-top: 7vh !important;
        }
        .logo-container.to-header {
          position: fixed !important;
          top: 20px !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          z-index: 10001 !important;
        }
        @keyframes float {
          0% { transform: translateY(0);}
          50% { transform: translateY(10px);}
          100% { transform: translateY(0);}
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
