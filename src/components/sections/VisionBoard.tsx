'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function VisionBoard() {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section id="vision" className="section bg-charcoal py-section overflow-hidden">
      <div className="container-max">
        {/* Header */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-16"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <p className="text-body-sm text-stone uppercase tracking-widest">
              Aspirations & Goals
            </p>
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-h2 font-display font-bold mb-6">
            2026 Vision Board
          </motion.h2>
          <motion.p variants={itemVariants} className="text-body text-stone max-w-2xl">
            My 2026 vision — a convergence of technical mastery, athletic excellence, creative brilliance, and personal evolution. Every element represents a commitment to becoming the best version of myself.
          </motion.p>
        </motion.div>

        {/* Vision Board Image with Glass effect */}
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="relative group"
        >
          <div className="relative rounded-2xl overflow-hidden glass hover:border-stone/60 transition-all shadow-2xl hover:shadow-3xl">
            <motion.img
              src="https://i.postimg.cc/8Pym0fsV/collage.jpg"
              alt="Vision Board - Aspirations and Goals"
              className="w-full h-auto object-contain"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            />

            {/* Subtle overlay gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-midnight/40 via-transparent to-transparent pointer-events-none" />

            {/* Floating insight cards */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-midnight via-midnight/80 to-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="text-body text-cloud max-w-xl">
                &quot;2026: Where technical excellence, athletic mastery, creative vision, and continuous growth converge into reality.&quot;
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
