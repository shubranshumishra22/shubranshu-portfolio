'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseY((e.clientY - window.innerHeight / 2) * 0.05);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const words = ['High-Performing', 'Deep-Thinking', 'Consistent'];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-graphite rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ x: mouseY, y: -mouseY }}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-slate rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ x: -mouseY, y: mouseY }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Content */}
      <div className="container-max relative z-10 px-4 md:px-8">
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Opening statement */}
          <motion.div variants={itemVariants} className="mb-8">
            <p className="text-body-sm text-stone uppercase tracking-widest">
              Software Developer · Athlete · Cinematic Creator
            </p>
          </motion.div>

          {/* Main headline with animated words */}
          <motion.div variants={itemVariants} className="mb-8">
            <h1 className="text-h1 font-display font-bold leading-tight">
              <span className="block text-ivory">Building</span>
              <div className="h-24 flex items-center justify-center relative">
                {words.map((word, i) => (
                  <motion.span
                    key={word}
                    className="absolute whitespace-nowrap font-semibold tracking-wide"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: [0, 1, 1, 0],
                      y: [20, 0, 0, -20],
                      color: ['rgb(148, 163, 184)', 'rgb(255, 255, 255)', 'rgb(255, 255, 255)', 'rgb(148, 163, 184)'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 6,
                      delay: i * 3,
                      times: [0, 0.15, 0.85, 1],
                    }}
                    style={{
                      letterSpacing: '0.05em',
                      textShadow: '0 0 10px rgba(255, 255, 255, 0.3), 0 0 20px rgba(255, 255, 255, 0.2), 0 0 30px rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
              <span className="block text-ivory">Systems That Matter</span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-body-lg text-stone max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            I build software with discipline, train for endurance, and capture stories through motion and visuals.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <motion.a
              href="#projects"
              className="btn btn-primary inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.a>
            <motion.a
              href="https://drive.google.com/file/d/1zaISo_U3OkHTm0OsMqGoWn2a-ZQuRSun/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download Resume
            </motion.a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center gap-2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <p className="text-body-sm text-stone">Scroll to explore</p>
            <svg
              className="w-5 h-5 text-stone"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* Accent lines */}
      <motion.div
        className="absolute top-20 right-10 w-64 h-px bg-gradient-to-r from-transparent via-stone to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-64 h-px bg-gradient-to-r from-transparent via-stone to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      />
    </section>
  );
}
