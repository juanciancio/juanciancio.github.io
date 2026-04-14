import type { ReactNode } from 'react';

interface PhoneMockupProps {
  children: ReactNode;
  className?: string;
}

export function PhoneMockup({ children, className = '' }: PhoneMockupProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative w-[220px] md:w-[260px]">
        {/* Phone body */}
        <div className="relative bg-surface-elevated rounded-[2rem] border-[3px] border-border-strong p-2 shadow-card-hover">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-surface-elevated rounded-b-xl z-10 flex items-center justify-center">
            <div className="w-10 h-1 bg-border rounded-full" />
          </div>

          {/* Screen */}
          <div className="relative rounded-[1.5rem] overflow-hidden bg-base aspect-[9/19.5]">
            {children}
          </div>

          {/* Home indicator */}
          <div className="flex justify-center mt-1.5 mb-0.5">
            <div className="w-16 h-1 bg-border-strong rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
