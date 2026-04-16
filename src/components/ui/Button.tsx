import { motion } from 'motion/react';
import type { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  children: ReactNode;
  href?: string;
  shimmer?: boolean;
}

export function Button({
  variant = 'primary',
  children,
  href,
  shimmer,
  className = '',
  ...props
}: ButtonProps) {
  const base =
    'relative inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 overflow-hidden';

  const variants = {
    primary:
      'bg-accent text-base hover:bg-accent-hover hover:shadow-glow',
    outline:
      'border border-border text-text-primary hover:border-accent hover:text-accent hover:bg-accent-muted',
  };

  const applyShimmer = shimmer ?? variant === 'primary';

  const classes = `group ${base} ${variants[variant]} ${className}`;

  const inner = (
    <>
      {applyShimmer && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[900ms] ease-out"
          style={{
            background:
              'linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)',
          }}
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.2 }}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={classes}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2 }}
      {...(props as any)}
    >
      {inner}
    </motion.button>
  );
}
