'use client';
export default function RecommendationPopup({ recommendations, onClose }) {
  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: '#1a1a1a',
      borderRadius: 8,
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      padding: 16,
      zIndex: 10000,
      border: '2px solid #4CAF50',
      minWidth: 300,
      maxWidth: '80vw'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ marginBottom: 12, color: '#4CAF50', fontSize: '1.1rem' }}>
          Recommended Reads 🔍
        </h3>
        <button 
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '1.2rem',
            padding: '0 4px'
          }}
        >
          ×
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {recommendations.map((rec, idx) => (
          <a
            key={idx}
            href={rec.url}
            target="_blank"
            rel="noopener"
            style={{
              color: '#fff',
              textDecoration: 'none',
              padding: 8,
              borderRadius: 4,
              background: 'rgba(255,255,255,0.1)',
              transition: 'background 0.2s'
            }}
          >
            {rec.title}
          </a>
        ))}
      </div>
    </div>
  );
}
