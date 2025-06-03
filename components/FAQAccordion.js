'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqData = [
  {
    question: "What is NDTV Brand Studio?",
    answer: "NDTV Brand Studio is the creative hub for high-impact content, campaigns, and authentic storytelling, blending editorial integrity with brand objectives."
  },
  {
    question: "How can I collaborate with NDTV Brand Studio?",
    answer: "You can contact us through our website's contact form or email us directly to discuss collaboration opportunities."
  },
  {
    question: "What types of content does NDTV Brand Studio produce?",
    answer: "We produce branded content, documentaries, digital campaigns, and exclusive IPs tailored to client needs."
  },
  {
    question: "Where can I view NDTV Brand Studio's previous work?",
    answer: "Our portfolio and case studies are available on the Content page and our official NDTV website."
  },
  {
    question: "How do I subscribe for updates?",
    answer: "Use the email subscription form on our homepage to receive the latest news and updates."
  }
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section style={{ margin: '48px 0', maxWidth: 700 }}>
      <h2 style={{ fontSize: '1.6rem', marginBottom: '16px', fontWeight: 600 }}>Frequently Asked Questions</h2>
      <div>
        {faqData.map((item, idx) => (
          <div key={idx} style={{ marginBottom: 12, borderRadius: 8, overflow: 'hidden', background: '#181818' }}>
            <button
              onClick={() => toggleAccordion(idx)}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '18px 24px',
                fontSize: '1.1rem',
                background: '#232323',
                color: '#fff',
                border: 'none',
                outline: 'none',
                cursor: 'pointer',
                fontWeight: 500,
                borderBottom: openIndex === idx ? '1px solid #e53935' : '1px solid #222',
                transition: 'background 0.2s'
              }}
            >
              {item.question}
            </button>
            <AnimatePresence initial={false}>
              {openIndex === idx && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{ padding: '16px 24px', background: '#222', color: '#fff', fontSize: '1rem' }}>
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
