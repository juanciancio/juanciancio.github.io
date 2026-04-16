import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Layers, Play, Smartphone, Hand, ExternalLink } from 'lucide-react';
import { AppleIcon, PlayStoreIcon, GithubIcon } from '../ui/SocialIcons';
import { useTranslation } from '../../i18n/useTranslation';
import { Section } from '../layout/Section';
import { ImageCarousel } from '../ui/ImageCarousel';
import { PhoneMockup } from '../ui/PhoneMockup';
import { SectionHeader } from '../shared/SectionHeader';
import { projects, type Project } from '../../data/projects';

const CATEGORY_LABEL: Record<Project['category'], { es: string; en: string; color: string }> = {
  ai: { es: 'AI & Automation', en: 'AI & Automation', color: 'bg-accent-warm-muted text-accent-warm border-accent-warm/30' },
  app: { es: 'Aplicación', en: 'Application', color: 'bg-accent-muted text-accent border-accent/30' },
};

export function Projects() {
  const { t, locale } = useTranslation();
  const navigate = useNavigate();
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window;
    const dismissed = localStorage.getItem('longpress-hint-dismissed');
    if (isTouchDevice && !dismissed) {
      setShowHint(true);
    }
  }, []);

  const dismissHint = () => {
    setShowHint(false);
    localStorage.setItem('longpress-hint-dismissed', '1');
  };

  return (
    <Section id="projects" variant="surface">
      <SectionHeader title={t.projects.title} />

      {/* Long press hint — mobile only */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3 mb-6 px-4 py-3 bg-accent-muted border border-accent/20 rounded-lg"
          >
            <Hand size={18} className="text-accent shrink-0" />
            <p className="text-xs text-text-secondary flex-1">
              {locale === 'es'
                ? 'Mantené presionado en un proyecto para ver el preview'
                : 'Long press on a project to see the preview'}
            </p>
            <button
              onClick={dismissHint}
              className="text-text-muted hover:text-text-primary text-xs shrink-0"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <ProjectCard
                project={project}
                locale={locale}
                label={t.projects.viewDetails}
                onClick={() => navigate(`/project/${project.id}`)}
                onLongPressUsed={dismissHint}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Section>
  );
}

function ProjectCard({
  project, locale, label, onClick, onLongPressUsed,
}: {
  project: Project; locale: 'es' | 'en'; label: string; onClick: () => void; onLongPressUsed?: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [hovering, setHovering] = useState(false);
  const [pressing, setPressing] = useState(false);

  const activateHover = () => {
    setHovering(true);
    setPressing(true);
    onLongPressUsed?.();
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const deactivateHover = () => {
    setHovering(false);
    setPressing(false);
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
    if (videoRef.current) videoRef.current.pause();
  };

  const handleMouseEnter = () => {
    setHovering(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setHovering(false);
    if (videoRef.current) videoRef.current.pause();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    longPressTimer.current = setTimeout(() => {
      e.preventDefault();
      activateHover();
    }, 400);
  };

  const handleTouchEnd = () => {
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
    if (pressing) {
      deactivateHover();
    }
  };

  const handleTouchMove = () => {
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
  };

  const hasVideo = !!project.video;
  const hasImages = project.images.length > 0;
  const isMobile = project.displayType === 'mobile';
  const catMeta = CATEGORY_LABEL[project.category];

  const hasExternalLinks = !!(
    project.links.repo || project.links.demo || project.links.appStore || project.links.playStore
  );

  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  const renderMedia = () => {
    if (hasVideo) {
      return (
        <>
          {project.image && (
            <img src={project.image} alt={project.title[locale]} className="absolute inset-0 w-full h-full object-cover" />
          )}
          <video
            ref={videoRef}
            src={project.video!}
            muted playsInline loop preload="metadata"
            poster={project.image || undefined}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className={`absolute inset-0 flex items-center justify-center bg-base/30 group-hover:bg-transparent transition-all duration-300 pointer-events-none ${pressing ? 'bg-transparent' : ''}`}>
            <div className={`w-10 h-10 rounded-full bg-base/60 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-300 ${pressing ? 'opacity-0' : ''}`}>
              <Play size={16} className="text-text-primary ml-0.5" fill="currentColor" />
            </div>
          </div>
        </>
      );
    }

    if (hasImages) {
      if (isMobile) {
        return (
          <div className="absolute inset-0 flex items-center justify-center bg-base/30">
            <PhoneMockup className="scale-[0.42] md:scale-[0.45]">
              <ImageCarousel images={project.images} autoPlay={hovering} interval={2500} alt={project.title[locale]} />
            </PhoneMockup>
          </div>
        );
      }
      return (
        <ImageCarousel images={project.images} autoPlay={hovering} interval={2500} className="absolute inset-0" alt={project.title[locale]} />
      );
    }

    if (isMobile) {
      return <Smartphone size={28} className="text-text-muted" />;
    }
    return <Layers size={28} className="text-text-muted" />;
  };

  return (
    <motion.div
      className={`group relative bg-surface-elevated border rounded-xl overflow-hidden cursor-pointer transition-all duration-300 select-none ${
        pressing
          ? 'border-accent/40 shadow-[0_8px_30px_rgba(45,212,191,0.2)] scale-[0.98]'
          : 'border-border hover:border-accent/40 hover:shadow-[0_10px_30px_rgba(45,212,191,0.12)]'
      }`}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onClick={!pressing ? onClick : undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      role="button"
      tabIndex={0}
      onKeyDown={(e: React.KeyboardEvent) => e.key === 'Enter' && onClick()}
      style={{ WebkitUserSelect: 'none', WebkitTouchCallout: 'none' }}
    >
      {/* Category badge */}
      <div className="absolute top-3 left-3 z-20">
        <span className={`inline-flex items-center px-2.5 py-1 text-[10px] font-semibold tracking-wide uppercase rounded-md border backdrop-blur-sm ${catMeta.color}`}>
          {catMeta[locale]}
        </span>
      </div>

      <div className="aspect-[16/9] bg-base/50 flex items-center justify-center relative overflow-hidden">
        {renderMedia()}
        {/* Hover overlay label */}
        <div className={`absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-base/80 to-transparent transition-opacity duration-300 pointer-events-none z-10 ${
          pressing ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}>
          <span className="text-xs font-medium text-accent flex items-center gap-1">
            {label}{' '}
            <motion.span
              className="inline-flex"
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowUpRight size={14} />
            </motion.span>
          </span>
        </div>
      </div>

      <div className="p-6 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-heading text-lg font-semibold text-text-primary group-hover:text-accent transition-colors">
            {project.title[locale]}
          </h3>
          {hasExternalLinks && (
            <div className="flex items-center gap-2 shrink-0 mt-1">
              {project.links.repo && (
                <a
                  href={project.links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={stopPropagation}
                  aria-label="GitHub repo"
                  className="text-text-muted hover:text-accent transition-colors"
                >
                  <GithubIcon size={15} />
                </a>
              )}
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={stopPropagation}
                  aria-label="Live demo"
                  className="text-text-muted hover:text-accent transition-colors"
                >
                  <ExternalLink size={15} />
                </a>
              )}
              {project.links.appStore && (
                <a
                  href={project.links.appStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={stopPropagation}
                  aria-label="App Store"
                  className="text-text-muted hover:text-accent transition-colors"
                >
                  <AppleIcon size={15} />
                </a>
              )}
              {project.links.playStore && (
                <a
                  href={project.links.playStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={stopPropagation}
                  aria-label="Play Store"
                  className="text-text-muted hover:text-accent transition-colors"
                >
                  <PlayStoreIcon size={15} />
                </a>
              )}
            </div>
          )}
        </div>

        <p className="text-sm text-text-secondary leading-relaxed line-clamp-2">
          {project.description[locale]}
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          {project.stack.map((tech) => (
            <span key={tech} className="font-mono text-[10px] text-text-muted">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
