import { motion } from 'motion/react';
import { Monitor, Bot, Lightbulb, Check } from 'lucide-react';
import { useTranslation } from '../../i18n/useTranslation';
import { Section } from '../layout/Section';
import { AnimatedSection } from '../shared/AnimatedSection';
import { services } from '../../data/services';

const ICON_MAP: Record<string, React.ElementType> = { Monitor, Bot, Lightbulb };

export function Services() {
  const { t, locale } = useTranslation();

  return (
    <Section id="services" variant="surface">
      <AnimatedSection>
        <h2 className="text-sm font-semibold tracking-wide uppercase text-accent mb-3">
          {t.services.title}
        </h2>
        <p className="text-base text-text-secondary mb-12 max-w-xl leading-relaxed">
          {t.services.subtitle}
        </p>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service, i) => {
          const Icon = ICON_MAP[service.icon] || Monitor;
          return (
            <AnimatedSection key={service.id} delay={0.1 + i * 0.12}>
              <motion.div
                className="group bg-base border border-border rounded-xl p-7 space-y-5 transition-all duration-300 h-full hover:border-accent/30 hover:shadow-card-hover"
                whileHover={{ y: -4 }}
              >
                <div className="w-12 h-12 rounded-lg bg-accent-muted flex items-center justify-center text-accent group-hover:scale-110 transition-transform duration-300">
                  <Icon size={24} strokeWidth={1.5} />
                </div>

                <h3 className="font-heading text-base font-semibold text-text-primary">
                  {service.title[locale]}
                </h3>

                <p className="text-sm text-text-secondary leading-relaxed">
                  {service.description[locale]}
                </p>

                <ul className="space-y-2.5 pt-1">
                  {service.features[locale].map((feature, j) => (
                    <li key={j} className="text-xs text-text-secondary flex items-start gap-2.5">
                      <Check size={14} className="text-accent mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatedSection>
          );
        })}
      </div>
    </Section>
  );
}
