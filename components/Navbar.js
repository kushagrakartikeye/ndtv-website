'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import PageTransition from './PageTransition';

export default function Navbar() {
  const router = useRouter();
  const [transitioning, setTransitioning] = useState(false);
  const [target, setTarget] = useState('/');

  const handleNav = (path) => (e) => {
    e.preventDefault();
    setTarget(path);
    setTransitioning(true);
  };

  const handleTransitionEnd = () => {
    router.push(target);
    setTransitioning(false);
  };

  return (
    <>
      <nav style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '32px 0 24px 0',
        fontSize: '1.2rem',
        letterSpacing: '0.02em'
      }}>
        <Link href="/" onClick={handleNav('/')}>Home</Link>
        <span style={{color:'#888'}}>|</span>
        <Link href="/about" onClick={handleNav('/about')}>About</Link>
        <span style={{color:'#888'}}>|</span>
        <Link href="/services" onClick={handleNav('/services')}>Services</Link>
        <span style={{color:'#888'}}>|</span>
        <Link href="/contact" onClick={handleNav('/contact')}>Contact</Link>
        <span style={{color:'#888'}}>|</span>
        <Link href="/admin/login" onClick={handleNav('/admin/login')}>Admin</Link>
      </nav>
      <PageTransition show={transitioning} onComplete={handleTransitionEnd} />
    </>
  );
}
