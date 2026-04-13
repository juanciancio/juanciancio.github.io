import type { ReactNode } from 'react';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  variant?: 'base' | 'surface';
}

export function Section({ id, children, className = '', variant = 'base' }: SectionProps) {
  const bg = variant === 'surface' ? 'bg-surface border-t border-b border-border' : '';

  return (
    <section
      id={id}
      className={`py-24 md:py-32 px-6 md:px-12 lg:px-24 ${bg} ${className}`}
    >
      <div className="max-w-5xl mx-auto">
        {children}
      </div>
    </section>
  );
}
