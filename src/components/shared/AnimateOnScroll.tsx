import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';
import type { ReactNode } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface AnimateOnScrollProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: Direction;
  amount?: number;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'span';
}

const offsets: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 24 },
  down: { y: -24 },
  left: { x: -30 },
  right: { x: 30 },
  none: {},
};

export function AnimateOnScroll({
  children,
  delay = 0,
  duration = 0.6,
  direction = 'up',
  amount = 0.15,
  className = '',
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    amount,
    margin: '0px 0px -80px 0px',
  });
  const [forceVisible, setForceVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isInView) setForceVisible(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, [isInView]);

  const visible = isInView || forceVisible;

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
      transition={{
        duration,
        ease: [0.25, 0.1, 0.25, 1],
        delay: visible ? delay : 0,
      }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerChildrenProps {
  children: ReactNode;
  staggerDelay?: number;
  initialDelay?: number;
  className?: string;
}

export function StaggerChildren({
  children,
  staggerDelay = 0.06,
  initialDelay = 0,
  className = '',
}: StaggerChildrenProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15, margin: '0px 0px -80px 0px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: initialDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};
