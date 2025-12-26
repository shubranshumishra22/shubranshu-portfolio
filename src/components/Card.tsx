'use client';

import { motion, MotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps extends MotionProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
}

export default function Card({
  children,
  className = '',
  hoverable = true,
  ...motionProps
}: CardProps) {
  return (
    <motion.div
      className={`glass p-8 rounded-xl ${hoverable ? 'hover:border-stone/60' : ''} transition-all ${className}`}
      whileHover={hoverable ? { y: -8 } : undefined}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}
