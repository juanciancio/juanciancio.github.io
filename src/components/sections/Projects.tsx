import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Layers, Play, Smartphone } from 'lucide-react';
import { useTranslation } from '../../i18n/useTranslation';
import { Section } from '../layout/Section';
import { Tag } from '../ui/Tag';
import { ImageCarousel } from '../ui/ImageCarousel';
import { PhoneMockup } from '../ui/PhoneMockup';
import { AnimatedSection } from '../shared/AnimatedSection';
import { projects, type Project } from '../../data/projects';

type Filter = 'all' | 'ai' | 'app';

export function Projects() {
  const { t, locale } = useTranslation();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<Filter>('all');

  const filtered =
    filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: t.projects.filterAll },
    { key: 'ai', label: t.projects.filterAI },
    { key: 'app', label: t.projects.filterApp },
  ];

  return (
    <Section id="projects" variant="surface">
      <AnimatedSection>
        <h2 className="text-sm font-semibold tracking-wide uppercase text-accent mb-2">
          {t.projects.title}
        </h2>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map((f) => (
            <Tag key={f.key} active={filter === f.key} onClick={() => setFilter(f.key)}>
              {f.label}
            </Tag>
          ))}
        </div>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <ProjectCard
                project={project}
                locale={locale}
                label={t.projects.viewDetails}
                onClick={() => navigate(`/project/${project.id}`)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Section>
  );
}

function ProjectCard({
  project, locale, label, onClick,
}: {
  project: Project; locale: 'es' | 'en'; label: string; onClick: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovering, setHovering] = useState(false);

  const handleMouseEnter = () => {
    setHovering(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setHovering(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const hasVideo = !!project.video;
  const hasImages = project.images.length > 0;
  const isMobile = project.displayType === 'mobile';

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
          <div className="absolute inset-0 flex items-center justify-center bg-base/30 group-hover:bg-transparent transition-colors duration-300 pointer-events-none">
            <div className="w-10 h-10 rounded-full bg-base/60 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-300">
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

    // Placeholder
    if (isMobile) {
      return <Smartphone size={28} className="text-text-muted" />;
    }
    return <Layers size={28} className="text-text-muted" />;
  };

  return (
    <motion.div
      className="group bg-surface-elevated border border-border rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-accent/30 hover:shadow-card-hover"
      whileHover={{ y: -4 }}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      onKeyDown={(e: React.KeyboardEvent) => e.key === 'Enter' && onClick()}
    >
      <div className="aspect-[16/9] bg-base/50 flex items-center justify-center relative overflow-hidden">
        {renderMedia()}
        {/* Hover label */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-base/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
          <span className="text-xs font-medium text-accent flex items-center gap-1">
            {label} <ArrowUpRight size={14} />
          </span>
        </div>
      </div>

      <div className="p-6 space-y-3">
        <h3 className="font-heading text-lg font-semibold text-text-primary">
          {project.title[locale]}
        </h3>
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
