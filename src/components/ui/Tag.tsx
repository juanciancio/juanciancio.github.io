interface TagProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export function Tag({ children, active = false, onClick }: TagProps) {
  const base =
    'inline-flex items-center px-3 py-1 text-xs font-medium rounded-md transition-all duration-200';

  const style = active
    ? 'bg-accent text-base'
    : 'bg-accent-muted text-accent';

  const interactive = onClick
    ? 'cursor-pointer hover:bg-accent hover:text-base'
    : '';

  return (
    <span
      className={`${base} ${style} ${interactive}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      {children}
    </span>
  );
}
