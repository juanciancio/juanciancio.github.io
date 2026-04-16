import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { useTranslation } from '../../i18n/useTranslation';
import { Section } from '../layout/Section';
import { SectionHeader } from '../shared/SectionHeader';
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
      <SectionHeader title={t.experience.title} className="mb-14" />

      <div ref={containerRef} className="relative">
        {/* Timeline line track */}
        <div className="absolute left-4 md:left-1/2 md:-translate-x-[0.5px] top-0 bottom-0 w-[1px] bg-border">
          <motion.div
            className="w-full bg-accent origin-top"
            style={{ height: lineHeight, boxShadow: '0 0 10px rgba(45,212,191,0.4)' }}
          />
        </div>

        <div className="space-y-16">
          {experiences.map((exp, i) => (
            <TimelineEntry
              key={exp.id}
              index={i}
              period={exp.period}
              isCurrent={exp.isCurrent}
              presentLabel={t.experience.present}
              role={exp.role[locale]}
              company={exp.company[locale]}
              description={exp.description[locale]}
              tags={exp.tags}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}

function TimelineEntry({
  index,
  period,
  isCurrent,
  presentLabel,
  role,
  company,
  description,
  tags,
}: {
  index: number;
  period: string;
  isCurrent: boolean;
  presentLabel: string;
  role: string;
  company: string;
  description: string[];
  tags: string[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35, margin: '0px 0px -80px 0px' });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="relative grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Node dot */}
      <motion.div
        className="absolute left-4 md:left-1/2 -translate-x-1/2 top-1.5 w-3.5 h-3.5 border-2 border-accent bg-base rounded-full z-10"
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 18, delay: 0.15 }}
      >
        {isCurrent && (
          <motion.span
            className="absolute inset-0 rounded-full bg-accent/50"
            animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
          />
        )}
      </motion.div>

      <motion.div
        className={`pl-12 md:pl-0 ${isLeft ? 'md:pr-14 md:text-right' : 'md:col-start-2 md:pl-14'}`}
        initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -30 : 30 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.25 }}
      >
        <div className="space-y-3">
          <span className="text-xs font-medium text-accent">
            {period}
            {isCurrent && ` — ${presentLabel}`}
          </span>
          <div>
            <h3 className="font-heading text-lg font-semibold text-text-primary">{role}</h3>
            <p className="text-sm text-text-secondary mt-1">{company}</p>
          </div>
          <ul className="space-y-2">
            {description.map((item, j) => (
              <li key={j} className="text-sm text-text-secondary leading-relaxed flex items-start gap-2">
                <span className="text-accent mt-0.5 shrink-0">&mdash;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className={`flex flex-wrap gap-2 pt-1 ${isLeft ? 'md:justify-end' : ''}`}>
            {tags.map((tag) => <Tag key={tag} withIcon>{tag}</Tag>)}
          </div>
        </div>
      </motion.div>

      {isLeft ? <div className="hidden md:block" /> : <div className="hidden md:block md:col-start-1 md:row-start-1" />}
    </div>
  );
}
