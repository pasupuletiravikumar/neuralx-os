import { motion } from 'framer-motion';

interface StatusIndicatorProps {
  status: 'active' | 'idle' | 'warning' | 'error' | 'processing';
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

const statusColors = {
  active: { bg: '#10b981', glow: 'rgba(16, 185, 129, 0.4)' },
  idle: { bg: '#64748b', glow: 'rgba(100, 116, 139, 0.4)' },
  warning: { bg: '#f59e0b', glow: 'rgba(245, 158, 11, 0.4)' },
  error: { bg: '#f43f5e', glow: 'rgba(244, 63, 94, 0.4)' },
  processing: { bg: '#00f0ff', glow: 'rgba(0, 240, 255, 0.4)' },
};

const sizes = { sm: 6, md: 8, lg: 10 };

export default function StatusIndicator({ status, label, size = 'sm' }: StatusIndicatorProps) {
  const color = statusColors[status];
  const s = sizes[size];

  return (
    <div className="flex items-center gap-2">
      <div className="relative" style={{ width: s, height: s }}>
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ background: color.bg, boxShadow: `0 0 8px ${color.glow}` }}
          className="absolute inset-0 rounded-full"
        />
        <div
          style={{ background: color.bg, boxShadow: `0 0 6px ${color.glow}` }}
          className="absolute inset-0 rounded-full"
        />
      </div>
      {label && <span className="text-xs text-text-secondary capitalize">{label}</span>}
    </div>
  );
}
