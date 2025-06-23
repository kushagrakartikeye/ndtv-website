'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();
      if (res.ok) {
        localStorage.setItem('adminToken', json.token);
        router.push('/admin/dashboard');
      } else {
        setError(json.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', padding: '20px', background: '#1a1a1a', borderRadius: 12 }}>
      <h1 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: 24 }}>Admin Login</h1>
      {error && <p style={{ color: '#ff6b6b', marginBottom: 16 }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 8, color: '#fff' }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: 6, border: '1px solid #444' }}
            required
          />
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', marginBottom: 8, color: '#fff' }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: 6, border: '1px solid #444' }}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            background: '#e53935',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            fontWeight: 600
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
