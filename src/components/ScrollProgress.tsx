'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const percent = totalHeight > 0 ? (scrolled / totalHeight) * 100 : 0;
      setProgress(percent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 h-1 bg-gradient-to-r from-cloud via-stone to-slate z-50"
      style={{ width: `${progress}%` }}
      transition={{ duration: 0.1 }}
    />
  );
}
