import { motion } from 'motion/react';
import { useTranslation } from '../../i18n/useTranslation';
import { Section } from '../layout/Section';
import { Tag } from '../ui/Tag';
import { AnimateOnScroll, StaggerChildren, staggerItemVariants } from '../shared/AnimateOnScroll';
import { SectionHeader } from '../shared/SectionHeader';
import { AnimatedCounter } from '../shared/AnimatedCounter';

const SKILLS = {
  frontend: ['React', 'React Native', 'Flutter', 'Angular', 'Next.js', 'Astro', 'Tailwind CSS'],
  backend: ['Node.js', 'Java', 'Spring Boot', 'Rust', 'Python'],
  databases: ['PostgreSQL', 'MySQL', 'SQL Server', 'SQLite'],
  testing: ['JUnit', 'Jest'],
  infra: ['Docker', 'Nginx', 'Git', 'CI/CD'],
  aiml: ['Claude AI', 'OpenRouter', 'LangChain', 'RAG'],
};

export function About() {
  const { t } = useTranslation();

  const categories = [
    { key: 'frontend' as const, label: t.about.categories.web },
    { key: 'backend' as const, label: t.about.categories.backend },
    { key: 'databases' as const, label: t.about.categories.databases },
    { key: 'testing' as const, label: t.about.categories.testing },
    { key: 'infra' as const, label: t.about.categories.infra },
    { key: 'aiml' as const, label: t.about.categories.aiml },
  ];

  const metrics = [
    { value: 6, suffix: '+', label: t.about.metrics.years },
    { value: 20, suffix: '+', label: t.about.metrics.projects },
    { value: 25, suffix: '+', label: t.about.metrics.techs },
  ];

  return (
    <Section id="about">
      <SectionHeader title={t.about.title} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <div className="space-y-6">
          <AnimateOnScroll delay={0.1}>
            <p className="text-base md:text-lg text-text-primary leading-relaxed">
              {t.about.bio}
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll delay={0.2}>
            <p className="text-base text-text-secondary leading-relaxed">
              {t.about.bio2}
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll delay={0.3}>
            <p className="text-sm text-text-secondary leading-relaxed italic">
              {t.about.bio3}
            </p>
          </AnimateOnScroll>

          {/* Metrics */}
          <AnimateOnScroll delay={0.4}>
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/60">
              {metrics.map((m) => (
                <div key={m.label}>
                  <div className="font-heading text-2xl md:text-3xl font-bold text-accent">
                    <AnimatedCounter value={m.value} suffix={m.suffix} />
                  </div>
                  <div className="text-[11px] uppercase tracking-wide text-text-muted mt-1">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>

        <div>
          <AnimateOnScroll delay={0.2}>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-text-secondary mb-8">
              {t.about.skillsTitle}
            </h3>
          </AnimateOnScroll>

          <div className="space-y-6">
            {categories.map((cat, catIndex) => (
              <AnimateOnScroll key={cat.key} delay={0.3 + catIndex * 0.07}>
                <div>
                  <span className="text-[11px] font-medium uppercase tracking-wide text-text-muted block mb-3">
                    {cat.label}
                  </span>
                  <StaggerChildren staggerDelay={0.04} className="flex flex-wrap gap-2">
                    {SKILLS[cat.key].map((skill) => (
                      <motion.div key={skill} variants={staggerItemVariants}>
                        <Tag withIcon>{skill}</Tag>
                      </motion.div>
                    ))}
                  </StaggerChildren>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
