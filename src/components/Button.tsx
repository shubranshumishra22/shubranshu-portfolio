'use client';

import { motion, MotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface ButtonProps extends MotionProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  onClick,
  ...motionProps
}: ButtonProps) {
  const baseStyles =
    'rounded-lg font-semibold transition-all focus-ring disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2';

  const variantStyles = {
    primary: 'bg-ivory text-midnight hover:bg-cloud',
    secondary: 'bg-graphite text-cloud hover:bg-slate border border-stone',
    ghost: 'text-cloud hover:text-ivory border border-transparent hover:border-stone',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-body-sm',
    md: 'px-6 py-3 text-body',
    lg: 'px-8 py-4 text-body-lg',
  };

  return (
    <motion.button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled}
      onClick={onClick}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      transition={{ duration: 0.2 }}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
