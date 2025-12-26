'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import ContactModal from './ContactModal';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Engineer', href: '#engineer' },
    { label: 'Projects', href: '#projects' },
    { label: 'Gym & Sports', href: '#gym' },
    { label: 'Media', href: '#media' },
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'bg-charcoal/90 backdrop-blur-md border-b border-graphite/30' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container-max flex items-center justify-between h-20 px-4 md:px-8">
          <motion.div
            className="text-h4 font-display font-bold"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-ivory">shub.</span><span className="text-green-400">dev</span>
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="text-body-sm font-medium text-stone hover:text-ivory transition-colors"
                whileHover={{ y: -2 }}
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          <motion.button
            onClick={() => setIsContactOpen(true)}
            className="btn btn-primary text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get in Touch
          </motion.button>
        </div>
      </motion.nav>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
