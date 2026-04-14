import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { useTranslation } from '../../i18n/useTranslation';
import type { Locale } from '../../i18n/LanguageContext';

const NAV_ITEMS = ['about', 'projects', 'experience', 'services', 'contact'] as const;

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const activeSection = useScrollSpy();
  const { t, locale, setLocale } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
    }
  };

  const navLabels: Record<string, string> = {
    about: t.nav.about,
    projects: t.nav.projects,
    experience: t.nav.experience,
    services: t.nav.services,
    contact: t.nav.contact,
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-base/80 backdrop-blur-md shadow-nav'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 md:px-12 lg:px-24 h-16" style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}>
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-heading text-base font-bold tracking-tight hover:opacity-80 transition-opacity"
          >
            <span className="text-text-primary">JC</span>
            <span className="text-accent">_</span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className={`relative text-sm font-medium transition-colors duration-200 ${
                  activeSection === item
                    ? 'text-accent'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {navLabels[item]}
                {activeSection === item && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-accent"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={() => setLocale(locale === 'es' ? 'en' : 'es' as Locale)}
              className="font-mono text-xs tracking-wider text-text-secondary hover:text-accent transition-colors px-1"
              aria-label="Toggle language"
            >
              <span className={locale === 'es' ? 'text-accent' : ''}>ES</span>
              <span className="text-text-muted mx-1">/</span>
              <span className={locale === 'en' ? 'text-accent' : ''}>EN</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-text-secondary hover:text-accent transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-text-secondary hover:text-accent transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-30 bg-base/95 backdrop-blur-md flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={item}
                onClick={() => scrollTo(item)}
                className={`text-lg font-medium transition-colors ${
                  activeSection === item ? 'text-accent' : 'text-text-secondary'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.3 }}
              >
                <span className="text-accent mr-2 text-sm font-mono">0{i + 1}.</span>
                {navLabels[item]}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
