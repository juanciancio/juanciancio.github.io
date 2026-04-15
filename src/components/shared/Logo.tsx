interface LogoProps {
  size?: number;
  className?: string;
}

export function Logo({ size = 44, className }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 240 240"
      width={size}
      height={size}
      role="img"
      aria-label="Juan Ciancio"
      className={className}
    >
      <circle cx="120" cy="120" r="120" fill="#0d1117" />
      <text
        x="120"
        y="118"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#f0f6fc"
        fontFamily="Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif"
        fontWeight="800"
        fontSize="100"
        letterSpacing="-5"
      >
        JC
      </text>
      <rect x="70" y="170" width="36" height="9" rx="3" fill="#4aeabc" />
    </svg>
  );
}
