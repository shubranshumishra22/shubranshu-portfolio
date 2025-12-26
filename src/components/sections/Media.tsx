'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface MediaItem {
  id: number;
  type: 'image' | 'video';
  title: string;
  category: string;
  image: string;
  description: string;
}

export default function Media() {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const selectedCategory = 'all';
  const [selectedMedia, setSelectedMedia] = useState<number | null>(null);

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

  const mediaItems: MediaItem[] = [
    {
      id: 1,
      type: 'image',
      title: 'Landscape Photography',
      category: 'training',
      image: 'https://i.postimg.cc/SR4vyqNZ/Whats-App-Image-2025-06-02-at-10-34-15.jpg',
      description: 'Quiet moments of mental clarity before intense training sessions',
    },
    {
      id: 2,
      type: 'image',
      title: 'Aviation Display',
      category: 'athletic-performance',
      image: 'https://i.postimg.cc/x1NyFhnB/Whats-App-Image-2025-06-02-at-10-34-16-(3).jpg',
      description: 'Perfect alignment of precision, balance, and engineering mindset',
    },
    {
      id: 3,
      type: 'image',
      title: 'Street Photography',
      category: 'conditioning',
      image: 'https://i.postimg.cc/TwtDPJTJ/Whats-App-Image-2025-06-02-at-10-34-17-(2).jpg',
      description: 'Grounded strength built through experience and relentless practice',
    },
    {
      id: 4,
      type: 'image',
      title: 'Night Photography',
      category: 'training',
      image: 'https://i.postimg.cc/zB2yNDkh/Whats-App-Image-2025-06-02-at-10-34-16-(5).jpg',
      description: 'Training that happens when others rest — true commitment',
    },
    {
      id: 5,
      type: 'image',
      title: 'Architectural Photography',
      category: 'sports',
      image: 'https://i.postimg.cc/j2hk29Lz/Whats-App-Image-2025-06-02-at-10-34-16-(1).jpg',
      description: 'Discipline compounds over years — the architecture of excellence',
    },
    {
      id: 6,
      type: 'image',
      title: 'Outdoor Court',
      category: 'sports',
      image: 'https://i.postimg.cc/d1fVXHss/Whats-App-Image-2025-06-02-at-10-34-17-(3).jpg',
      description: 'Showing up repeatedly — the process of continuous improvement',
    },
  ];

  const filteredItems =
    selectedCategory === 'all'
      ? mediaItems
      : mediaItems.filter((item) => item.category === selectedCategory);

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
    <section id="media" className="section bg-midnight py-section">
      <div className="container-max">
        {/* Header */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-h2 font-display font-bold mb-6">
            Media & Highlights
          </motion.h2>
        </motion.div>

        {/* Media Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              layoutId={`media-${item.id}`}
              className="group cursor-pointer h-80 rounded-xl overflow-hidden glass hover:border-stone/60 transition-all"
              onClick={() => setSelectedMedia(item.id)}
              whileHover={{ y: -8 }}
            >
              {/* Image Background */}
              <motion.div
                className="w-full h-full relative overflow-hidden"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />

                {/* Overlay on hover */}
                <motion.div
                  className="absolute inset-0 bg-midnight/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-h4 font-display font-bold mb-3">{item.title}</h3>
                  <p className="text-body-sm text-stone">{item.description}</p>
                </motion.div>
              </motion.div>

              {/* Info at bottom */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal to-transparent p-4">
                <p className="text-body-sm font-semibold text-cloud truncate">{item.title}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Modal for selected media */}
        {selectedMedia && (
          <motion.div
            className="fixed inset-0 bg-midnight/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMedia(null)}
          >
            <motion.div
              className="bg-charcoal rounded-2xl max-w-2xl w-full p-8 glass"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const item = mediaItems.find((m) => m.id === selectedMedia);
                return (
                  <>
                    <div className="relative w-full h-96 rounded-xl mb-6 overflow-hidden">
                      <img
                        src={item?.image}
                        alt={item?.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h2 className="text-h2 font-display font-bold mb-3">{item?.title}</h2>
                    <p className="text-body text-stone mb-6">{item?.description}</p>
                    <div className="flex gap-3 justify-between">
                      <span className="px-4 py-2 bg-graphite/50 rounded-lg text-body-sm text-cloud capitalize">
                        {item?.category}
                      </span>
                      <motion.button
                        className="btn btn-primary"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedMedia(null)}
                      >
                        Close
                      </motion.button>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
