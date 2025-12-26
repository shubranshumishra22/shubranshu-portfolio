'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'featured' | 'accent';
  className?: string;
}

export default function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variantStyles = {
    default: 'bg-graphite/50 text-cloud border border-slate/30',
    featured: 'bg-stone/30 text-ivory border border-stone/60',
    accent: 'bg-graphite text-ivory border border-slate',
  };

  return (
    <motion.span
      className={`inline-block px-3 py-1 rounded-full text-body-sm font-medium ${variantStyles[variant]} ${className}`}
      whileHover={{ scale: 1.05 }}
    >
      {children}
    </motion.span>
  );
}
