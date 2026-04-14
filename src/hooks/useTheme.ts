import { useState, useEffect } from 'react';

type Theme = 'dark' | 'light';

const THEME_COLORS: Record<Theme, string> = {
  dark: '#0C0D10',
  light: '#FAFAF9',
};

function getInitialTheme(): Theme {
  const stored = localStorage.getItem('theme');
  if (stored === 'dark' || stored === 'light') return stored;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function updateThemeColor(t: Theme) {
  const color = THEME_COLORS[t];
  document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
    meta.setAttribute('content', color);
  });
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem('theme', t);
    document.documentElement.setAttribute('data-theme', t);
    updateThemeColor(t);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeColor(theme);
  }, [theme]);

  return { theme, toggleTheme };
}
