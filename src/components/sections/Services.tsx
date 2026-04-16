import { motion } from 'motion/react';
import { Monitor, Bot, Lightbulb, Check } from 'lucide-react';
import { useTranslation } from '../../i18n/useTranslation';
import { Section } from '../layout/Section';
import { SectionHeader } from '../shared/SectionHeader';
import { AnimateOnScroll } from '../shared/AnimateOnScroll';
import { services } from '../../data/services';

const ICON_MAP: Record<string, React.ElementType> = { Monitor, Bot, Lightbulb };

export function Services() {
  const { t, locale } = useTranslation();

  return (
    <Section id="services" variant="surface">
      <SectionHeader title={t.services.title} subtitle={t.services.subtitle} className="mb-12" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service, i) => {
          const Icon = ICON_MAP[service.icon] || Monitor;
          return (
            <AnimateOnScroll key={service.id} delay={0.1 + i * 0.12}>
              <motion.div
                className="group relative bg-base border border-border rounded-xl p-7 space-y-5 transition-all duration-300 h-full hover:border-accent/40 hover:shadow-[0_10px_30px_rgba(45,212,191,0.12)] overflow-hidden"
                whileHover={{ y: -6 }}
              >
                {/* Subtle corner glow on hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-24 -right-24 w-48 h-48 rounded-full bg-accent/0 group-hover:bg-accent/10 blur-3xl transition-colors duration-500"
                />

                <motion.div
                  className="relative w-12 h-12 rounded-lg bg-accent-muted flex items-center justify-center text-accent"
                  whileHover={{ rotate: 8, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  <Icon size={24} strokeWidth={1.5} />
                </motion.div>

                <h3 className="relative font-heading text-base font-semibold text-text-primary group-hover:text-accent transition-colors">
                  {service.title[locale]}
                </h3>

                <p className="relative text-sm text-text-secondary leading-relaxed">
                  {service.description[locale]}
                </p>

                <ul className="relative space-y-2.5 pt-1">
                  {service.features[locale].map((feature, j) => (
                    <li key={j} className="text-xs text-text-secondary flex items-start gap-2.5">
                      <Check size={14} className="text-accent mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimateOnScroll>
          );
        })}
      </div>
    </Section>
  );
}
