import { motion } from 'motion/react';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export function Card({ children, onClick, className = '' }: CardProps) {
  return (
    <motion.div
      className={`relative bg-surface border border-border rounded-xl shadow-card overflow-hidden transition-colors duration-300 ${onClick ? 'cursor-pointer' : ''} ${className}`}
      whileHover={onClick ? {
        y: -4,
        boxShadow: 'var(--shadow-card-hover)',
      } : undefined}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e: React.KeyboardEvent) => e.key === 'Enter' && onClick() : undefined}
    >
      {children}
    </motion.div>
  );
}
