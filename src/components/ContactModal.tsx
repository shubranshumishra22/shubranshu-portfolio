'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const linkedInProfile = 'https://www.linkedin.com/in/shubranshu-shekhar-633192299/';
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  
  const suggestedMessages = [
    {
      title: 'Collaboration',
      message: "Hi Shubranshu! I'd like to discuss a potential collaboration opportunity.",
      emoji: '🤝',
    },
    {
      title: 'Job Opportunity',
      message: "Hi Shubranshu! I think you'd be a great fit for our team. Let's talk!",
      emoji: '💼',
    },
    {
      title: 'Project Discussion',
      message: "Hi Shubranshu! I loved your work. Let's discuss your projects in detail.",
      emoji: '🚀',
    },
    {
      title: 'General Inquiry',
      message: "Hi Shubranshu! I'd love to connect and learn more about your work.",
      emoji: '👋',
    },
  ];

  const handleCopyMessage = (message: string, index: number) => {
    navigator.clipboard.writeText(message);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 20 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="bg-charcoal rounded-xl border border-graphite/30 max-w-md w-full shadow-2xl"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="border-b border-graphite/30 p-6">
              <h2 className="text-h3 font-display font-bold text-ivory">Get in Touch</h2>
              <p className="text-body-sm text-stone mt-2">
                Copy a message and send it to me on LinkedIn
              </p>
            </div>

            {/* Messages */}
            <div className="p-6 space-y-3 max-h-96 overflow-y-auto">
              {suggestedMessages.map((msg, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => handleCopyMessage(msg.message, idx)}
                  className="w-full p-4 rounded-lg bg-graphite/20 border border-graphite/30 hover:border-stone/50 hover:bg-graphite/40 transition-all text-left group"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xl flex-shrink-0">{msg.emoji}</span>
                    <div className="flex-1">
                      <p className="text-body font-semibold text-ivory">{msg.title}</p>
                      <p className="text-body-sm text-stone mt-1">{msg.message}</p>
                      <p className="text-body-sm text-cloud mt-2 font-medium">
                        {copiedIndex === idx ? '✓ Copied!' : 'Click to copy'}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-graphite/30 p-6 flex gap-3">
              <motion.button
                onClick={onClose}
                className="flex-1 py-2 rounded-lg text-body-sm font-medium text-ivory border border-graphite/30 hover:bg-graphite/20 transition-colors"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Close
              </motion.button>
              <motion.a
                href={linkedInProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 rounded-lg text-body-sm font-medium bg-cloud text-midnight hover:bg-ivory transition-colors text-center"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Open LinkedIn →
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
