import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';
import type { ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'left' | 'right';
}

export function AnimatedSection({
  children,
  delay = 0,
  className = '',
  direction = 'up',
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.05,
    margin: '100px 0px',
  });
  const [forceVisible, setForceVisible] = useState(false);

  // Safety fallback: force visible after 2s if animation never triggered
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isInView) setForceVisible(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, [isInView]);

  const visible = isInView || forceVisible;

  const offsets = {
    up: { y: 24 },
    left: { x: -30 },
    right: { x: 30 },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={
        visible
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, ...offsets[direction] }
      }
      transition={{ duration: 0.6, ease: 'easeOut', delay: visible ? delay : 0 }}
    >
      {children}
    </motion.div>
  );
}
