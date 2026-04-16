import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Mail, ArrowDown } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons';
import { useTranslation } from '../../i18n/useTranslation';
import { Button } from '../ui/Button';
import { AnimatedTerminal } from '../shared/AnimatedTerminal';

function useMouseParallax(strength = 12) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 80, damping: 20 });
  const springY = useSpring(y, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none)').matches;
    if (isTouch) return;

    const handler = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      x.set(((e.clientX - cx) / cx) * strength);
      y.set(((e.clientY - cy) / cy) * strength);
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, [x, y, strength]);

  return { x: springX, y: springY };
}

function GradientBackdrop() {
  const { x, y } = useMouseParallax(18);
  const blob1X = useTransform(x, (v) => v);
  const blob1Y = useTransform(y, (v) => v);
  const blob2X = useTransform(x, (v) => -v * 0.6);
  const blob2Y = useTransform(y, (v) => -v * 0.6);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-accent/20 blur-[120px]"
        style={{ x: blob1X, y: blob1Y }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-[20%] right-[25%] w-[260px] h-[260px] rounded-full bg-accent-warm/15 blur-[100px]"
        style={{ x: blob2X, y: blob2Y }}
        animate={{ scale: [1, 0.85, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[15%] right-[15%] w-[180px] h-[180px] rounded-full bg-accent/10 blur-[80px]"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 bg-dotgrid opacity-20" />
    </div>
  );
}

function AnimatedName({ name }: { name: string }) {
  const words = name.split(' ');
  let letterIdx = 0;
  return (
    <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-[1] tracking-tight">
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.split('').map((ch) => {
            const i = letterIdx++;
            return (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.4 + i * 0.035,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                {ch}
              </motion.span>
            );
          })}
          {wi < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </h1>
  );
}

export function Hero() {
  const { t } = useTranslation();
  const [showScroll, setShowScroll] = useState(true);

  useEffect(() => {
    const handler = () => setShowScroll(window.scrollY < 80);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <section className="relative min-h-dvh flex items-center px-6 md:px-12 lg:px-24 pt-20 pb-12 overflow-hidden">
      <GradientBackdrop />

      <div className="relative max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center z-10">
        {/* Text Content */}
        <div className="space-y-7">
          <motion.p
            className="text-sm font-medium text-accent tracking-wide"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t.hero.preTitle}
          </motion.p>

          <div className="space-y-3">
            <motion.p
              className="text-lg text-text-secondary"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.32 }}
            >
              {t.hero.greeting}
            </motion.p>
            <AnimatedName name={t.hero.name} />
          </div>

          <motion.p
            className="text-base md:text-lg text-text-secondary max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.85 }}
          >
            {t.hero.tagline}
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 pt-2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <Button
              shimmer
              onClick={() =>
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              {t.hero.cta}
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              {t.hero.contactCta}
            </Button>
          </motion.div>

          <motion.div
            className="flex items-center gap-5 pt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.15 }}
          >
            {[
              { href: 'https://github.com/juanciancio', label: 'GitHub', icon: <GithubIcon size={18} /> },
              { href: 'https://linkedin.com/in/juanciancio', label: 'LinkedIn', icon: <LinkedinIcon size={18} /> },
              { href: 'mailto:juan.ciancio02@gmail.com', label: 'Email', icon: <Mail size={18} /> },
            ].map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="text-text-muted hover:text-accent transition-colors"
                aria-label={link.label}
                whileHover={{ scale: 1.15, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {link.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Terminal */}
        <div className="hidden lg:block">
          <AnimatedTerminal />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: showScroll ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} className="text-text-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}
