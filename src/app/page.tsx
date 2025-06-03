'use client';
import Logo from '../../components/Logo';
import Navbar from '../../components/Navbar';
import FAQ from '../../components/FAQ';
import Link from 'next/link';

const headlines = [
  {
    title: `"We Are Ready": Mamata Banerjee's 'Poll Battle' Dare For PM After Criticism`,
    url: "https://www.ndtv.com/india-news/we-are-ready-mamata-banerjees-poll-battle-dare-for-pm-after-criticism-8537296",
    image: "/headlines/we-are-ready.png"
  },
  {
    title: "इजरायल ने ही मारा था हानिया को, काट्ज ने मान लिया, जानिए नासा के पार्कर से लेकर दुनिया की 10 बड़ी खबरें",
    url: "https://ndtv.in/topic/top-headlines",
    image: "/headlines/israel-news.png"
  },
  {
    title: "Top 25 Headlines Today : प्रयागराज में UPPSC कार्यालय के बाहर छात्रों का प्रदर्शन, दिल्ली मेट्रो ने शुरू की बाइक टैक्सी सेवा",
    url: "https://ndtv.in/topic/top-headlines",
    image: "/headlines/uppsc-protest.png"
  },
  {
    title: "Breaking News : लेबनान में इजरायली बमबारी में मरने वालों की संख्या हुई 274, हिज्बुल्लाह के 800 ठिकाने बने निशाना",
    url: "https://ndtv.in/topic/top-headlines",
    image: "/headlines/lebanon-bombing.png"
  },
  {
    title: "TOP HINDI NEWS: शिवसेना नेता संजय राऊत की ED हिरासत 8 अगस्त तक बढ़ी.",
    url: "https://ndtv.in/india/top-headlines-live-updates-big-breaking-stories-china-taiwan-tiranga-rally-updates-3222993",
    image: "/headlines/weird.png"
  }
];

export default function Home() {
  return (
    <>
      <Logo />
      <Navbar />
      <main>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 700,
          margin: '32px 0 12px 0',
          letterSpacing: '0.01em'
        }}>
          Welcome to NDTV
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#bbb', maxWidth: 700, margin: '0 0 18px 0' }}>
          Here are NDTV's Top headlines!
        </p>

        {/* Headline Cards Section */}
        <section style={{
          maxWidth: 1100,
          margin: '18px auto 14px auto',
          display: 'flex',
          gap: 6,  // reduced gap for tighter layout
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {headlines.map((headline, idx) => (
            <Link
              key={idx}
              href={headline.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                position: 'relative',
                width: 200,
                height: 320,
                borderRadius: 8,
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: '0 3px 8px rgba(0,0,0,0.18)',
                transition: 'transform 0.22s cubic-bezier(.4,2,.6,1)',
                display: 'flex',
                alignItems: 'flex-end',
                color: '#fff',
                textDecoration: 'none',
                backgroundColor: '#000',
                margin: 0 // ensure no extra margin
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.035)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
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
              />
              <div style={{
                position: 'relative',
                width: '100%',
                padding: '8px 8px 12px 8px',
                fontWeight: '600',
                fontSize: '1.01rem',
                zIndex: 2,
                textShadow: '0 0 6px rgba(0,0,0,0.8)',
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

        <FAQ />
      </main>
    </>
  );
}
