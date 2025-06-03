'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        // Set token in localStorage
        localStorage.setItem('adminToken', data.token);
        router.push('/admin/dashboard');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <div style={{
      maxWidth: 400,
      margin: '100px auto',
      padding: '40px',
      background: 'rgba(20,20,20,0.9)',
      borderRadius: 18,
      boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
    }}>
      <h1 style={{ fontSize: '1.8rem', marginBottom: 24 }}>Admin Login</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <label style={{ display: 'block', marginBottom: 8 }}>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: 6,
              border: '1px solid #333',
              background: '#111',
              color: '#fff'
            }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 8 }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: 6,
              border: '1px solid #333',
              background: '#111',
              color: '#fff'
            }}
          />
        </div>
        {error && <div style={{ color: '#e53935' }}>{error}</div>}
        <button
          type="submit"
          style={{
            padding: '12px 24px',
            background: '#e53935',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 600,
            transition: 'background 0.2s'
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
