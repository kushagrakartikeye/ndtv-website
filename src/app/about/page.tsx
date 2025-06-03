"use client";
import Navbar from '../../../components/Navbar';
import Image from 'next/image';

export default function About() {
  return (
      
    <>  
      <Navbar />
       <main
      style={{
        maxWidth: 1100,
        margin: '60px auto 0 auto',
        padding: '40px',
        background: 'rgba(53, 45, 45, 0.9)',
        borderRadius: 18,
        boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px'
        }}
      >
        {/* LinkedIn clickable image with red background circle */}
        <a
          href="https://www.linkedin.com/in/kushagra-kartikeye-06a270278/"
          target="_blank"
          rel="noopener noreferrer"
          className="about-image-link"
          tabIndex={0}
          style={{
            display: 'inline-block',
            borderRadius: '50%',
            transition: 'all 0.3s cubic-bezier(.4,2,.6,1)',
            backgroundColor: '#b71c1c',
            padding: 16,
            marginBottom: 4,
          }}
        >
          <Image
            src="/image.png"
            alt="Kushagra Kartikeye"
            width={150}
            height={150}
            className="about-image"
            style={{
              borderRadius: '50%',
              objectFit: 'cover',
              display: 'block',
              transition: 'all 0.3s cubic-bezier(.4,2,.6,1)',
            }}
          />
        </a>
        <span
          style={{
            color: '#b71c1c',
            fontWeight: 600,
            fontSize: '1rem',
            marginBottom: 24,
          }}
        >
          Visit Kushagra&apos;s LinkedIn
        </span>
        <div
          style={{
            maxWidth: 900,
            color: '#eee',
            fontSize: '1.13rem',
            lineHeight: 1.6,
            textAlign: 'center'
          }}
        >
          <h1 style={{ fontSize: '2.2rem', fontWeight: 700, marginBottom: 16 }}>
            About the developer
          </h1>
          <p>
            This website is created by Kushagra Kartikeye during his summer internship program at NDTV. Kushagra Kartikeye is an undergraduate electronics and telecommunication student and embedded systems enthusiast, with a passion for innovation in electronics and blockchain technology. He has hands-on experience with microcontrollers such as ATMEGA328p, NodeMCU, and ARM LPC2148, and is proficient in designing IoT and HTTPS-enabled applications. Kushagra's interests span embedded development, secure hardware, and decentralized systems, which led him to develop and implement the ESP32-RFID blockchain voting platform described in this paper. He is committed to bridging the gap between hardware and blockchain for real-world, transparent applications.
          </p>
        </div>
      </div>
      <style jsx>{`
        .about-image-link,
        .about-image-link .about-image {
          transition: all 0.3s cubic-bezier(.4,2,.6,1);
        }
        .about-image-link:hover,
        .about-image-link:focus {
          padding: 32px !important;
          background:rgb(152, 34, 34);
        }
        .about-image-link:hover .about-image,
        .about-image-link:focus .about-image {
          transform: scale(1.10);
        }
      `}</style>
    </main>
    </>
  );
}
