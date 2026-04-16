import { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';

type TerminalLineKind = 'command' | 'success' | 'info' | 'text' | 'highlight';

interface TerminalLine {
  text: string;
  kind: TerminalLineKind;
  delay?: number;
}

const LINES: TerminalLine[] = [
  { text: '> deploying AI agent orchestrator...', kind: 'command' },
  { text: '> connecting to Claude API', kind: 'command' },
  { text: '  ✓ connection established', kind: 'success' },
  { text: '> training pipeline initialized', kind: 'command' },
  { text: '  ✓ 6 years of experience loaded', kind: 'success' },
  { text: '> autonomous trading bot: ', kind: 'command' },
  { text: '  LIVE', kind: 'highlight' },
  { text: '> status: building the future 🚀', kind: 'info' },
];

const TYPE_SPEED = 22;
const LINE_PAUSE = 280;
const LOOP_PAUSE = 3200;

const kindClasses: Record<TerminalLineKind, string> = {
  command: 'text-accent',
  success: 'text-emerald-400',
  info: 'text-text-secondary',
  text: 'text-text-secondary',
  highlight: 'text-accent-warm font-semibold',
};

export function AnimatedTerminal() {
  const [lines, setLines] = useState<{ text: string; kind: TerminalLineKind }[]>([]);
  const [typingText, setTypingText] = useState('');
  const [typingKind, setTypingKind] = useState<TerminalLineKind>('command');
  const reducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    if (reducedMotion.current) {
      setLines(LINES.map(l => ({ text: l.text, kind: l.kind })));
      return;
    }

    let cancelled = false;
    let timeouts: ReturnType<typeof setTimeout>[] = [];

    const runCycle = async () => {
      while (!cancelled) {
        setLines([]);
        setTypingText('');

        for (let i = 0; i < LINES.length; i++) {
          if (cancelled) return;
          const line = LINES[i];
          setTypingKind(line.kind);

          // Type characters
          for (let c = 0; c <= line.text.length; c++) {
            if (cancelled) return;
            setTypingText(line.text.slice(0, c));
            await new Promise<void>((resolve) => {
              const t = setTimeout(resolve, TYPE_SPEED);
              timeouts.push(t);
            });
          }

          // Commit line and clear typing buffer
          setLines(prev => [...prev, { text: line.text, kind: line.kind }]);
          setTypingText('');

          await new Promise<void>((resolve) => {
            const t = setTimeout(resolve, LINE_PAUSE);
            timeouts.push(t);
          });
        }

        await new Promise<void>((resolve) => {
          const t = setTimeout(resolve, LOOP_PAUSE);
          timeouts.push(t);
        });
      }
    };

    runCycle();

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <motion.div
      className="relative w-full rounded-xl overflow-hidden border border-border/60 bg-[#0a0b0e]/90 backdrop-blur-sm shadow-card-hover font-mono text-xs md:text-[13px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-[#131418]/80">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-3 text-[11px] text-text-muted">~/juan/portfolio</span>
      </div>

      {/* Body */}
      <div className="p-5 min-h-[220px] md:min-h-[260px] space-y-1.5 leading-relaxed">
        {lines.map((line, i) => (
          <div key={i} className={kindClasses[line.kind]}>
            {line.text}
          </div>
        ))}
        {!reducedMotion.current && (
          <div className={kindClasses[typingKind]}>
            {typingText}
            <motion.span
              className="inline-block w-[7px] h-[13px] bg-accent ml-0.5 -mb-[1px] align-middle"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}
