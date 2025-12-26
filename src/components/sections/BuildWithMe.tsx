'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function BuildWithMe() {
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
        staggerChildren: 0.1,
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

  return (
    <section id="build" className="section bg-charcoal py-section">
      <div className="container-max">
        {/* Header */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-20 text-center"
        >
          <motion.h2 variants={itemVariants} className="text-h2 font-display font-bold mb-6">
            Build with me
          </motion.h2>
          <motion.p variants={itemVariants} className="text-body-lg text-stone max-w-2xl mx-auto">
            Interested in collaborating on innovative projects? Let&apos;s create something remarkable together.
          </motion.p>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center"
        >
          <motion.div
            variants={itemVariants}
            className="glass p-12 rounded-xl hover:border-stone/60 transition-all inline-block max-w-md"
            whileHover={{ y: -4 }}
          >
            <a 
              href="https://www.instagram.com/sneakin4u/" 
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer"
            >
              <h3 className="text-h3 font-display font-bold hover:text-ivory transition-colors">
                sneakin4u
              </h3>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
