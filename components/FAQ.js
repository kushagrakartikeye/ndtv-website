'use client';
import { useState } from 'react';

export default function FAQ() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateEmail(email)) {
    setMessage('Invalid email address.');
    return;
  }
  console.log('Sending email:', email);
  const res = await fetch('/api/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  const data = await res.json();
  console.log('API response:', data);
  setMessage(data.message);
  setEmail('');
};


  return (
    <section style={{margin: '48px 0'}}>
      <h2 style={{fontSize: '1.6rem', marginBottom: '16px', fontWeight: 600}}>subscribe to our news through your email</h2>
      <form onSubmit={handleSubmit} style={{display: 'flex', alignItems: 'center', gap: '0'}}>
        <input
          type="email"
          placeholder="Enter your email for updates"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button type="submit">Subscribe</button>
      </form>
      {message && <p style={{marginTop: '12px', color: '#e53935'}}>{message}</p>}
    </section>
  );
}
