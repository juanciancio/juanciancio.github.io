import { useTranslation } from '../../i18n/useTranslation';
import { Section } from '../layout/Section';
import { Tag } from '../ui/Tag';
import { AnimatedSection } from '../shared/AnimatedSection';

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

  return (
    <Section id="about">
      <AnimatedSection>
        <h2 className="text-sm font-semibold tracking-wide uppercase text-accent mb-10">
          {t.about.title}
        </h2>
      </AnimatedSection>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-6">
          <AnimatedSection delay={0.1}>
            <p className="text-base md:text-lg text-text-primary leading-relaxed">
              {t.about.bio}
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-base text-text-secondary leading-relaxed">
              {t.about.bio2}
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <p className="text-sm text-text-secondary leading-relaxed italic">
              {t.about.bio3}
            </p>
          </AnimatedSection>
        </div>

        <div>
          <AnimatedSection delay={0.2}>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-text-secondary mb-8">
              {t.about.skillsTitle}
            </h3>
          </AnimatedSection>

          <div className="space-y-6">
            {categories.map((cat, catIndex) => (
              <AnimatedSection key={cat.key} delay={0.3 + catIndex * 0.08}>
                <div>
                  <span className="text-[11px] font-medium uppercase tracking-wide text-text-muted block mb-3">
                    {cat.label}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {SKILLS[cat.key].map((skill) => (
                      <Tag key={skill}>{skill}</Tag>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
