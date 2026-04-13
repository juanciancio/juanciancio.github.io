import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Layers } from 'lucide-react';
import { useTranslation } from '../../i18n/useTranslation';
import { Section } from '../layout/Section';
import { Tag } from '../ui/Tag';
import { Modal } from '../ui/Modal';
import { AnimatedSection } from '../shared/AnimatedSection';
import { projects, type Project } from '../../data/projects';

type Filter = 'all' | 'ai' | 'app';

export function Projects() {
  const { t, locale } = useTranslation();
  const [filter, setFilter] = useState<Filter>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
                onClick={() => setSelectedProject(project)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <Modal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)}>
        {selectedProject && (
          <ProjectDetail project={selectedProject} locale={locale} t={t.projects} />
        )}
      </Modal>
    </Section>
  );
}

function ProjectCard({
  project, locale, label, onClick,
}: {
  project: Project; locale: 'es' | 'en'; label: string; onClick: () => void;
}) {
  return (
    <motion.div
      className="group bg-surface-elevated border border-border rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-accent/30 hover:shadow-card-hover"
      whileHover={{ y: -4 }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e: React.KeyboardEvent) => e.key === 'Enter' && onClick()}
    >
      <div className="aspect-[16/9] bg-base/50 flex items-center justify-center relative overflow-hidden">
        <Layers size={28} className="text-text-muted" />
        <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-300 flex items-center justify-center">
          <span className="text-xs font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
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

function ProjectDetail({
  project, locale, t,
}: {
  project: Project; locale: 'es' | 'en'; t: { stack: string; features: string; close: string };
}) {
  return (
    <div className="p-8 space-y-6">
      <div className="space-y-2">
        <span className="text-xs font-medium text-accent">
          {project.category === 'ai' ? 'AI & Automation' : 'Application'}
        </span>
        <h3 className="font-heading text-2xl md:text-3xl font-bold text-text-primary">
          {project.title[locale]}
        </h3>
      </div>

      <p className="text-base text-text-secondary leading-relaxed">
        {project.longDescription[locale]}
      </p>

      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wide text-text-muted mb-3">{t.stack}</h4>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => <Tag key={tech}>{tech}</Tag>)}
        </div>
      </div>

      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wide text-text-muted mb-3">{t.features}</h4>
        <ul className="space-y-3">
          {project.features[locale].map((feature, i) => (
            <li key={i} className="text-sm text-text-secondary flex items-start gap-3">
              <span className="text-accent mt-0.5 shrink-0">&mdash;</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
