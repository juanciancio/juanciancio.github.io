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
      <circle cx="120" cy="120" r="119" fill="none" stroke="#1a2332" strokeWidth="0.5" />
      <g transform="translate(120 120) scale(1.4) translate(-120 -120)">
        <text
          x="52"
          y="118"
          dominantBaseline="central"
          fill="#4aeabc"
          fontFamily="'JetBrains Mono', ui-monospace, monospace"
          fontWeight="400"
          fontSize="42"
        >
          &gt;
        </text>
        <text
          x="82"
          y="118"
          dominantBaseline="central"
          fill="#f0f6fc"
          fontFamily="Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif"
          fontWeight="800"
          fontSize="68"
          letterSpacing="-3"
        >
          JC
        </text>
        <rect x="82" y="148" width="38" height="6" rx="2" fill="#4aeabc" />
      </g>
    </svg>
  );
}
