import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  decimals?: number;
}

export default function AnimatedCounter({ value, prefix = '', suffix = '', duration = 2, className = '', decimals = 0 }: AnimatedCounterProps) {
  const [isVisible, setIsVisible] = useState(false);
  const spring = useSpring(0, { duration: duration * 1000, bounce: 0 });
  const display = useTransform(spring, (v) => {
    if (value >= 1000000000) return `${prefix}${(v / 1000000000).toFixed(1)}B${suffix}`;
    if (value >= 1000000) return `${prefix}${(v / 1000000).toFixed(1)}M${suffix}`;
    if (value >= 1000) return `${prefix}${(v / 1000).toFixed(decimals > 0 ? decimals : 1)}K${suffix}`;
    return `${prefix}${v.toFixed(decimals)}${suffix}`;
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible) spring.set(value);
  }, [isVisible, value, spring]);

  return <motion.span className={className}>{display}</motion.span>;
}
