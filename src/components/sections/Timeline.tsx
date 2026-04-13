import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useTranslation } from '../../i18n/useTranslation';
import { Section } from '../layout/Section';
import { AnimatedSection } from '../shared/AnimatedSection';
import { experiences } from '../../data/experience';
import { Tag } from '../ui/Tag';

export function Timeline() {
  const { t, locale } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.8'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <Section id="experience">
      <AnimatedSection>
        <h2 className="text-sm font-semibold tracking-wide uppercase text-accent mb-14">
          {t.experience.title}
        </h2>
      </AnimatedSection>

      <div ref={containerRef} className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 md:left-1/2 md:-translate-x-[0.5px] top-0 bottom-0 w-[1px] bg-border">
          <motion.div className="w-full bg-accent origin-top" style={{ height: lineHeight }} />
        </div>

        <div className="space-y-16">
          {experiences.map((exp, i) => {
            const isLeft = i % 2 === 0;
            return (
              <AnimatedSection key={exp.id} delay={i * 0.08} direction={isLeft ? 'left' : 'right'}>
                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-1.5 w-3 h-3 border-2 border-accent bg-base rounded-full z-10" />

                  <div className={`pl-12 md:pl-0 ${isLeft ? 'md:pr-14 md:text-right' : 'md:col-start-2 md:pl-14'}`}>
                    <div className="space-y-3">
                      <span className="text-xs font-medium text-accent">
                        {exp.period}{exp.isCurrent && ` — ${t.experience.present}`}
                      </span>
                      <div>
                        <h3 className="font-heading text-lg font-semibold text-text-primary">{exp.role[locale]}</h3>
                        <p className="text-sm text-text-secondary mt-1">{exp.company[locale]}</p>
                      </div>
                      <ul className="space-y-2">
                        {exp.description[locale].map((item, j) => (
                          <li key={j} className="text-sm text-text-secondary leading-relaxed flex items-start gap-2">
                            <span className="text-accent mt-0.5 shrink-0">&mdash;</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <div className={`flex flex-wrap gap-2 pt-1 ${isLeft ? 'md:justify-end' : ''}`}>
                        {exp.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
                      </div>
                    </div>
                  </div>

                  {isLeft ? <div className="hidden md:block" /> : <div className="hidden md:block md:col-start-1 md:row-start-1" />}
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
