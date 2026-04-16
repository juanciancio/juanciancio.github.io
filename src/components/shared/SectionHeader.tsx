import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({ title, subtitle, className = '' }: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className={`mb-10 ${className}`}>
      <div className="flex items-center gap-4">
        <motion.div
          className="h-px bg-accent origin-left"
          initial={{ width: 0 }}
          animate={inView ? { width: 48 } : { width: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
        />
        <motion.h2
          className="text-sm font-semibold tracking-wide uppercase text-accent"
          initial={{ opacity: 0, x: -12 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
        >
          {title}
        </motion.h2>
      </div>
      {subtitle && (
        <motion.p
          className="text-base text-text-secondary mt-4 max-w-xl leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.35 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
