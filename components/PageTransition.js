'use client';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageTransition({ show, onComplete }) {
  useEffect(() => {
    if (show) {
      const timeout = setTimeout(() => {
        onComplete && onComplete();
      }, 900); // match animation duration
      return () => clearTimeout(timeout);
    }
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ height: '80px', opacity: 1 }}
          animate={{ height: '100vh', opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            background: '#9b0002',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <motion.img
            src="/logo.png"
            alt="NDTV Logo"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            style={{ width: 180, height: 100 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
