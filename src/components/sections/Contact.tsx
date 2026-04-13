import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Send } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons';
import { useTranslation } from '../../i18n/useTranslation';
import { Section } from '../layout/Section';
import { AnimatedSection } from '../shared/AnimatedSection';
import { Button } from '../ui/Button';

export function Contact() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <Section id="contact">
      <AnimatedSection>
        <h2 className="text-sm font-semibold tracking-wide uppercase text-accent mb-10">
          {t.contact.title}
        </h2>
      </AnimatedSection>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-6">
          <AnimatedSection delay={0.1}>
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-text-primary leading-snug">
              {t.contact.subtitle}
            </h3>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="text-sm text-text-secondary leading-relaxed max-w-md">
              {t.contact.description}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="space-y-4 pt-4">
              {[
                { href: 'mailto:juanciancio@gmail.com', icon: <Mail size={16} />, text: 'juanciancio@gmail.com' },
                { href: 'https://github.com/juanciancio', icon: <GithubIcon size={16} />, text: 'github.com/juanciancio', external: true },
                { href: 'https://linkedin.com/in/juanciancio', icon: <LinkedinIcon size={16} />, text: 'linkedin.com/in/juanciancio', external: true },
              ].map((link) => (
                <a
                  key={link.text}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-3 text-text-secondary hover:text-accent transition-colors group"
                >
                  <span className="group-hover:text-accent">{link.icon}</span>
                  <span className="font-mono text-xs">{link.text}</span>
                </a>
              ))}
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.2}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              { id: 'name', label: t.contact.name, type: 'text', placeholder: t.contact.namePlaceholder },
              { id: 'email', label: t.contact.email, type: 'email', placeholder: t.contact.emailPlaceholder },
            ].map((field) => (
              <div key={field.id}>
                <label htmlFor={field.id} className="text-[11px] font-medium uppercase tracking-wide text-text-muted block mb-2">
                  {field.label}
                </label>
                <input
                  id={field.id}
                  type={field.type}
                  required
                  placeholder={field.placeholder}
                  className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm text-text-primary outline-none transition-all focus:border-accent focus:ring-1 focus:ring-accent/30 placeholder:text-text-muted"
                />
              </div>
            ))}

            <div>
              <label htmlFor="message" className="text-[11px] font-medium uppercase tracking-wide text-text-muted block mb-2">
                {t.contact.message}
              </label>
              <textarea
                id="message"
                required
                rows={5}
                placeholder={t.contact.messagePlaceholder}
                className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm text-text-primary outline-none transition-all focus:border-accent focus:ring-1 focus:ring-accent/30 resize-none placeholder:text-text-muted"
              />
            </div>

            <div className="relative">
              <Button type="submit">
                <Send size={14} />
                {t.contact.send}
              </Button>
              <AnimatePresence>
                {submitted && (
                  <motion.p
                    className="absolute top-full mt-3 text-xs text-accent font-medium"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    {t.contact.success}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </AnimatedSection>
      </div>
    </Section>
  );
}
