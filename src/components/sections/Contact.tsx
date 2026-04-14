import { useState, useRef, type FormEvent } from 'react';
import { Mail, Send, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons';
import { useTranslation } from '../../i18n/useTranslation';
import { useToast } from '../../hooks/useToast';
import { Section } from '../layout/Section';
import { AnimatedSection } from '../shared/AnimatedSection';
import { Button } from '../ui/Button';

// EmailJS config — these are public keys, safe to expose
// TODO: Replace with your EmailJS credentials
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

export function Contact() {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current || sending) return;

    setSending(true);

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY,
      );
      showToast(t.contact.success, 'success');
      formRef.current.reset();
    } catch {
      showToast(t.contact.error, 'error');
    } finally {
      setSending(false);
    }
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
                { href: 'mailto:juan.ciancio02@gmail.com', icon: <Mail size={16} />, text: 'juan.ciancio02@gmail.com' },
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
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="from_name" className="text-[11px] font-medium uppercase tracking-wide text-text-muted block mb-2">
                {t.contact.name}
              </label>
              <input
                id="from_name"
                name="from_name"
                type="text"
                required
                placeholder={t.contact.namePlaceholder}
                className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm text-text-primary outline-none transition-all focus:border-accent focus:ring-1 focus:ring-accent/30 placeholder:text-text-muted"
              />
            </div>

            <div>
              <label htmlFor="from_email" className="text-[11px] font-medium uppercase tracking-wide text-text-muted block mb-2">
                {t.contact.email}
              </label>
              <input
                id="from_email"
                name="from_email"
                type="email"
                required
                placeholder={t.contact.emailPlaceholder}
                className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm text-text-primary outline-none transition-all focus:border-accent focus:ring-1 focus:ring-accent/30 placeholder:text-text-muted"
              />
            </div>

            <div>
              <label htmlFor="message" className="text-[11px] font-medium uppercase tracking-wide text-text-muted block mb-2">
                {t.contact.message}
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder={t.contact.messagePlaceholder}
                className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm text-text-primary outline-none transition-all focus:border-accent focus:ring-1 focus:ring-accent/30 resize-none placeholder:text-text-muted"
              />
            </div>

            <Button type="submit" className={sending ? 'opacity-70 pointer-events-none' : ''}>
              {sending ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Send size={14} />
              )}
              {sending ? t.contact.sending : t.contact.send}
            </Button>
          </form>
        </AnimatedSection>
      </div>
    </Section>
  );
}
