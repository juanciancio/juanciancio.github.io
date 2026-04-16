import type { ReactNode } from 'react';
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiPython,
  SiRust,
  SiDocker,
  SiNginx,
  SiGit,
  SiPostgresql,
  SiMysql,
  SiSqlite,
  SiTailwindcss,
  SiNextdotjs,
  SiAstro,
  SiFlutter,
  SiAngular,
  SiSpring,
  SiJest,
  SiTauri,
  SiAnthropic,
  SiLangchain,
  SiOpenai,
} from 'react-icons/si';
import { FaJava, FaDatabase } from 'react-icons/fa6';
import { DiMsqlServer } from 'react-icons/di';

export interface TechIconMeta {
  icon: ReactNode;
  color: string;
  primary?: boolean;
}

const iconSize = 13;

// Color-coded by brand, fallback to accent
export const TECH_ICONS: Record<string, TechIconMeta> = {
  React: { icon: <SiReact size={iconSize} />, color: '#61DAFB', primary: true },
  'React Native': { icon: <SiReact size={iconSize} />, color: '#61DAFB' },
  Angular: { icon: <SiAngular size={iconSize} />, color: '#DD0031' },
  TypeScript: { icon: <SiTypescript size={iconSize} />, color: '#3178C6', primary: true },
  JavaScript: { icon: <SiJavascript size={iconSize} />, color: '#F7DF1E' },
  'Next.js': { icon: <SiNextdotjs size={iconSize} />, color: '#FFFFFF' },
  Astro: { icon: <SiAstro size={iconSize} />, color: '#BC52EE' },
  Flutter: { icon: <SiFlutter size={iconSize} />, color: '#02569B' },
  'Tailwind CSS': { icon: <SiTailwindcss size={iconSize} />, color: '#38BDF8' },

  'Node.js': { icon: <SiNodedotjs size={iconSize} />, color: '#8CC84B', primary: true },
  Python: { icon: <SiPython size={iconSize} />, color: '#3776AB', primary: true },
  Java: { icon: <FaJava size={iconSize} />, color: '#EA2D2E' },
  'Spring Boot': { icon: <SiSpring size={iconSize} />, color: '#6DB33F' },
  Rust: { icon: <SiRust size={iconSize} />, color: '#DEA584' },

  PostgreSQL: { icon: <SiPostgresql size={iconSize} />, color: '#336791' },
  MySQL: { icon: <SiMysql size={iconSize} />, color: '#00758F' },
  'SQL Server': { icon: <DiMsqlServer size={iconSize} />, color: '#CC2927' },
  SQLite: { icon: <SiSqlite size={iconSize} />, color: '#003B57' },

  JUnit: { icon: <FaDatabase size={iconSize} />, color: '#25A162' },
  Jest: { icon: <SiJest size={iconSize} />, color: '#C21325' },

  Docker: { icon: <SiDocker size={iconSize} />, color: '#2496ED' },
  Nginx: { icon: <SiNginx size={iconSize} />, color: '#009639' },
  Git: { icon: <SiGit size={iconSize} />, color: '#F05032' },
  'CI/CD': { icon: <FaDatabase size={iconSize} />, color: '#2DD4BF' },
  Tauri: { icon: <SiTauri size={iconSize} />, color: '#FFC131' },

  'Claude AI': { icon: <SiAnthropic size={iconSize} />, color: '#D97757', primary: true },
  OpenRouter: { icon: <SiOpenai size={iconSize} />, color: '#FFFFFF' },
  LangChain: { icon: <SiLangchain size={iconSize} />, color: '#1C3C3C' },
  RAG: { icon: <FaDatabase size={iconSize} />, color: '#2DD4BF' },
};

export function getTechIcon(name: string): TechIconMeta | undefined {
  return TECH_ICONS[name];
}
