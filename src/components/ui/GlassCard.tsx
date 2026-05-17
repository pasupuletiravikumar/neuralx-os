import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: 'cyan' | 'violet' | 'emerald' | 'amber' | 'rose' | 'none';
  onClick?: () => void;
  padding?: string;
}

export default function GlassCard({ children, className = '', hover = true, glow = 'none', onClick, padding = 'p-5' }: GlassCardProps) {
  const glowStyles: Record<string, string> = {
    none: '',
    cyan: 'shadow-[0_0_20px_rgba(0,240,255,0.08)] hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]',
    violet: 'shadow-[0_0_20px_rgba(139,92,246,0.08)] hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]',
    emerald: 'shadow-[0_0_20px_rgba(16,185,129,0.08)] hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]',
    amber: 'shadow-[0_0_20px_rgba(245,158,11,0.08)] hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]',
    rose: 'shadow-[0_0_20px_rgba(244,63,94,0.08)] hover:shadow-[0_0_30px_rgba(244,63,94,0.15)]',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={hover ? { y: -2, transition: { duration: 0.2 } } : undefined}
      onClick={onClick}
      className={`
        bg-bg-surface/70 backdrop-blur-xl border border-white/[0.06]
        rounded-2xl ${padding} transition-all duration-300
        ${hover ? 'cursor-pointer' : ''}
        ${glowStyles[glow]}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
