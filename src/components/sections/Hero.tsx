import { motion } from 'motion/react';
import { Mail, ArrowDown } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons';
import { useTranslation } from '../../i18n/useTranslation';
import { Button } from '../ui/Button';

function GradientBlobs() {
  return (
    <div className="relative w-full h-full min-h-[300px] lg:min-h-[400px]">
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] md:w-[350px] md:h-[350px] rounded-full bg-accent/20 blur-[100px]"
        animate={{ scale: [1, 1.15, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute top-1/3 left-1/3 w-[180px] h-[180px] md:w-[250px] md:h-[250px] rounded-full bg-accent-warm/15 blur-[80px]"
        animate={{ scale: [1, 0.85, 1], x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[120px] h-[120px] rounded-full bg-accent/10 blur-[60px]"
        animate={{ scale: [1, 1.3, 1], x: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />
      <div className="absolute inset-0 bg-dotgrid opacity-20" />
    </div>
  );
}

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="min-h-[90vh] flex items-center px-6 md:px-12 lg:px-24 pt-20 pb-12">
      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
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

          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <p className="text-lg text-text-secondary">{t.hero.greeting}</p>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-[1] tracking-tight">
              {t.hero.name}
            </h1>
          </motion.div>

          <motion.p
            className="text-base md:text-lg text-text-secondary max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
          >
            {t.hero.tagline}
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 pt-2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
              {t.hero.cta}
            </Button>
            <Button variant="outline" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              {t.hero.contactCta}
            </Button>
          </motion.div>

          <motion.div
            className="flex items-center gap-5 pt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            {[
              { href: 'https://github.com/juanciancio', label: 'GitHub', icon: <GithubIcon size={18} /> },
              { href: 'https://linkedin.com/in/juanciancio', label: 'LinkedIn', icon: <LinkedinIcon size={18} /> },
              { href: 'mailto:juanciancio@gmail.com', label: 'Email', icon: <Mail size={18} /> },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="text-text-muted hover:text-accent transition-colors"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </motion.div>
        </div>

        {/* Gradient Blobs */}
        <motion.div
          className="hidden lg:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          <GradientBlobs />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
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
