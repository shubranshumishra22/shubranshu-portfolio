'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import ContactModal from './ContactModal';

export default function Footer() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <>
      <footer className="bg-charcoal border-t border-graphite/30 py-16">
        <div className="container-max px-4 md:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Main footer content */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              {/* Brand */}
              <motion.div variants={itemVariants}>
                <h3 className="text-h4 font-display font-bold mb-4"><span className="text-ivory">shub.</span><span className="text-green-400">dev</span></h3>
                <p className="text-body-sm text-stone">
                Software Developer · Athlete · Cinematic Creator
                </p>
              </motion.div>

              {/* Navigation */}
              <motion.div variants={itemVariants}>
                <h4 className="text-body font-semibold mb-4 text-ivory">Navigation</h4>
                <ul className="space-y-2">
                  {['Home', 'Engineer', 'Projects', 'Gym', 'Media'].map((item) => (
                    <li key={item}>
                      <a
                        href={`#${item.toLowerCase()}`}
                        className="text-body-sm text-stone hover:text-ivory transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Links */}
              <motion.div variants={itemVariants}>
                <h4 className="text-body font-semibold mb-4 text-ivory">Social</h4>
                <ul className="space-y-2">
                  {[
                    { label: 'GitHub', href: 'https://github.com/shubranshumishra22' },
                    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/shubranshu-shekhar-633192299/' },
                    { label: 'Twitter', href: 'https://x.com/Shubranshu4u' },
                    { label: 'Instagram', href: 'https://www.instagram.com/shubranshu4u/' },
                  ].map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-body-sm text-stone hover:text-ivory transition-colors"
                      >
                        {link.label} →
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Contact */}
              <motion.div variants={itemVariants}>
                <h4 className="text-body font-semibold mb-4 text-ivory">Get in Touch</h4>
                <p className="text-body-sm text-stone mb-4">
                  shubranshumishra22@gmail.com
                </p>
                <motion.button
                  onClick={() => setIsContactOpen(true)}
                  className="btn btn-primary w-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Me
                </motion.button>
              </motion.div>
            </div>

            {/* Divider */}
            <motion.div
              className="h-px bg-gradient-to-r from-transparent via-stone to-transparent my-8"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />

            {/* Bottom section */}
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-body-sm text-stone mb-4 md:mb-0">
                © {currentYear} <span className="text-ivory">shub.</span><span className="text-green-400">dev</span> All rights reserved.
              </p>
              <div className="flex gap-6 items-center">
                <p className="text-body-sm text-stone">📍 Bangalore, India</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </footer>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
