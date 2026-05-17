import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glow?: 'cyan' | 'violet' | 'emerald' | 'none';
  onClick?: () => void;
  hover?: boolean;
}

export default function GlassCard({
  children,
  className = '',
  glow = 'none',
  onClick,
  hover = true
}: GlassCardProps) {
  const glowClass = 
    glow === 'cyan' ? 'glow-cyan' :
    glow === 'violet' ? 'glow-violet' :
    glow === 'emerald' ? 'glow-emerald' : '';

  return (
    <motion.div
      onClick={onClick}
      whileHover={hover ? { y: -2, scale: 1.005 } : undefined}
      transition={{ duration: 0.2 }}
      className={`glass-panel rounded-2xl p-5 relative overflow-hidden transition-all duration-300 ${
        onClick ? 'cursor-pointer' : ''
      } ${glowClass} ${className}`}
    >
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.015] to-transparent pointer-events-none" />
      {children}
    </motion.div>
  );
}
