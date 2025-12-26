'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

export default function CourtBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0.15, 0.15, 0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Abstract Motion Background */}
      <motion.svg
        viewBox="0 0 1000 1000"
        className="absolute w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        style={{ y, opacity }}
      >
        <defs>
          {/* Gradient for depth */}
          <linearGradient id="motionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0.1" />
            <stop offset="100%" stopColor="white" stopOpacity="0.02" />
          </linearGradient>

          {/* Filter for subtle blur */}
          <filter id="softGlow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>
        </defs>

        {/* Large circular accent - top right */}
        <motion.circle
          cx="850"
          cy="150"
          r="300"
          fill="none"
          stroke="white"
          strokeWidth="1"
          opacity="0.08"
          animate={isInView ? { r: [300, 320, 300] } : {}}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Large circular accent - bottom left */}
        <motion.circle
          cx="150"
          cy="850"
          r="280"
          fill="none"
          stroke="white"
          strokeWidth="1"
          opacity="0.08"
          animate={isInView ? { r: [280, 300, 280] } : {}}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Diagonal motion lines */}
        <g opacity="0.06" strokeLinecap="round">
          {[...Array(8)].map((_, i) => (
            <motion.line
              key={`diag-${i}`}
              x1={i * 120}
              y1="0"
              x2={i * 120 + 400}
              y2="1000"
              stroke="white"
              strokeWidth="2"
              animate={isInView ? { x1: i * 120 - 50, x2: i * 120 + 350 } : {}}
              transition={{ duration: 15 + i, repeat: Infinity, ease: 'linear' }}
            />
          ))}
        </g>

        {/* Counter diagonal motion lines */}
        <g opacity="0.05" strokeLinecap="round">
          {[...Array(8)].map((_, i) => (
            <motion.line
              key={`counter-${i}`}
              x1={1000 - i * 120}
              y1="0"
              x2={1000 - i * 120 - 400}
              y2="1000"
              stroke="white"
              strokeWidth="2"
              animate={isInView ? { x1: 1000 - i * 120 + 50, x2: 1000 - i * 120 - 350 } : {}}
              transition={{ duration: 15 + i, repeat: Infinity, ease: 'linear' }}
            />
          ))}
        </g>

        {/* Center accent circles with stagger */}
        <g opacity="0.04">
          {[200, 400, 600].map((radius, idx) => (
            <motion.circle
              key={`center-${idx}`}
              cx="500"
              cy="500"
              r={radius}
              fill="none"
              stroke="white"
              strokeWidth="1"
              animate={isInView ? { r: [radius, radius + 40, radius] } : {}}
              transition={{
                duration: 12 + idx * 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: idx * 1,
              }}
            />
          ))}
        </g>

        {/* Radial accent lines from center */}
        <g opacity="0.06" strokeLinecap="round">
          {[...Array(12)].map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            const x2 = 500 + Math.cos(angle) * 500;
            const y2 = 500 + Math.sin(angle) * 500;
            return (
              <motion.line
                key={`radial-${i}`}
                x1="500"
                y1="500"
                x2={x2}
                y2={y2}
                stroke="white"
                strokeWidth="2"
                animate={isInView ? { opacity: [0.06, 0.12, 0.06] } : {}}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.2,
                }}
              />
            );
          })}
        </g>

        {/* Flowing curves */}
        <g opacity="0.05" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
          <motion.path
            d="M 0 300 Q 250 200 500 250 T 1000 300"
            animate={isInView ? { d: 'M 0 350 Q 250 250 500 300 T 1000 350' } : {}}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.path
            d="M 0 700 Q 250 800 500 750 T 1000 700"
            animate={isInView ? { d: 'M 0 650 Q 250 750 500 700 T 1000 650' } : {}}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
        </g>

        {/* Gradient overlay */}
        <rect width="1000" height="1000" fill="url(#motionGradient)" />
      </motion.svg>

      {/* Vignette effect */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-charcoal/30 pointer-events-none" />
    </div>
  );
}
