import { motion } from 'motion/react';
import { getTechIcon } from '../../data/techIcons';

interface TagProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  withIcon?: boolean;
  size?: 'sm' | 'md';
}

export function Tag({ children, active = false, onClick, withIcon = false, size }: TagProps) {
  const name = typeof children === 'string' ? children : '';
  const meta = withIcon ? getTechIcon(name) : undefined;
  const effectiveSize = size ?? (meta?.primary ? 'md' : 'sm');

  const base =
    'inline-flex items-center gap-1.5 font-medium rounded-md transition-all duration-200 border';

  const sizing = effectiveSize === 'md'
    ? 'px-3 py-1.5 text-xs'
    : 'px-2.5 py-1 text-[11px]';

  const style = active
    ? 'bg-accent text-base border-accent'
    : meta?.primary
      ? 'bg-accent-muted text-accent border-accent/25 shadow-[0_0_0_1px_rgba(45,212,191,0.05)]'
      : 'bg-accent-muted/60 text-accent border-transparent';

  const interactive = onClick
    ? 'cursor-pointer hover:bg-accent hover:text-base'
    : '';

  const wrapperProps = {
    className: `${base} ${sizing} ${style} ${interactive}`,
    onClick,
    role: onClick ? 'button' : undefined,
    tabIndex: onClick ? 0 : undefined,
    onKeyDown: onClick ? (e: React.KeyboardEvent) => e.key === 'Enter' && onClick() : undefined,
  };

  return (
    <motion.span
      {...wrapperProps}
      whileHover={{ scale: 1.05, y: -1 }}
      transition={{ duration: 0.15 }}
    >
      {meta?.icon && (
        <span style={{ color: active ? undefined : meta.color }} className="shrink-0 flex">
          {meta.icon}
        </span>
      )}
      <span>{children}</span>
    </motion.span>
  );
}
