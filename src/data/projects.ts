export interface Project {
  id: string;
  title: { es: string; en: string };
  category: 'ai' | 'app';
  description: { es: string; en: string };
  longDescription: { es: string; en: string };
  stack: string[];
  features: { es: string[]; en: string[] };
  image: string | null;
  links: { demo: string | null; repo: string | null };
}

export const projects: Project[] = [
  {
    id: 'barbershop-app',
    title: {
      es: 'Sistema de Gesti\u00f3n para Barber\u00eda',
      en: 'Barbershop Management System',
    },
    category: 'app',
    description: {
      es: 'Aplicaci\u00f3n de escritorio completa para gesti\u00f3n de barber\u00edas: registro de cortes, historial de clientes, m\u00e9tricas del negocio y reportes.',
      en: 'Full-featured desktop application for barbershop management: haircut logging, client history, business metrics and reports.',
    },
    longDescription: {
      es: 'Una aplicaci\u00f3n de escritorio nativa construida con Tauri que permite a las barber\u00edas digitalizar toda su operaci\u00f3n. Desde el registro de cada corte con detalles del servicio hasta dashboards con m\u00e9tricas de rendimiento del negocio. Funciona completamente offline con base de datos local.',
      en: 'A native desktop application built with Tauri that enables barbershops to digitize their entire operation. From logging each haircut with service details to dashboards with business performance metrics. Works completely offline with a local database.',
    },
    stack: ['Tauri', 'React', 'TypeScript', 'SQLite'],
    features: {
      es: [
        'Registro completo de cortes con detalles del servicio',
        'Historial por cliente con b\u00fasqueda avanzada',
        'Dashboard de m\u00e9tricas del negocio',
        'Base de datos local \u2014 funciona sin internet',
      ],
      en: [
        'Complete haircut logging with service details',
        'Per-client history with advanced search',
        'Business metrics dashboard',
        'Local database \u2014 works without internet',
      ],
    },
    image: null,
    links: { demo: null, repo: null },
  },
  {
    id: 'trading-bot',
    title: {
      es: 'Bot de Trading Aut\u00f3nomo con AI',
      en: 'Autonomous AI Trading Bot',
    },
    category: 'ai',
    description: {
      es: 'Sistema de trading automatizado que combina an\u00e1lisis t\u00e9cnico con inteligencia artificial para operar en mercados de criptomonedas.',
      en: 'Automated trading system combining technical analysis with artificial intelligence to operate in cryptocurrency markets.',
    },
    longDescription: {
      es: 'Un sistema de trading de alta frecuencia escrito en Rust que combina indicadores t\u00e9cnicos cl\u00e1sicos con modelos de AI para tomar decisiones de entrada y salida. Opera en m\u00faltiples timeframes simult\u00e1neamente y gestiona el riesgo de forma aut\u00f3noma con trailing stops din\u00e1micos.',
      en: 'A high-frequency trading system written in Rust that combines classic technical indicators with AI models for entry and exit decisions. Operates across multiple timeframes simultaneously and manages risk autonomously with dynamic trailing stops.',
    },
    stack: ['Rust', 'Claude AI', 'OpenRouter API', 'WebSocket'],
    features: {
      es: [
        'An\u00e1lisis multi-timeframe (15min + 5min)',
        'Se\u00f1ales combinadas: EMA, VWAP, RSI, MACD, volumen',
        'Trailing stop din\u00e1mico para maximizar ganancias',
        'Gesti\u00f3n de riesgo automatizada',
      ],
      en: [
        'Multi-timeframe analysis (15min + 5min)',
        'Combined signals: EMA, VWAP, RSI, MACD, volume',
        'Dynamic trailing stop to maximize profits',
        'Automated risk management',
      ],
    },
    image: null,
    links: { demo: null, repo: null },
  },
  {
    id: 'sports-analytics',
    title: {
      es: 'Suite de An\u00e1lisis Deportivo con AI',
      en: 'AI Sports Analytics Suite',
    },
    category: 'ai',
    description: {
      es: 'Sistema de an\u00e1lisis estad\u00edstico potenciado por AI para identificar valor en mercados deportivos de NBA, MLB y f\u00fatbol europeo.',
      en: 'AI-powered statistical analysis system to identify value in NBA, MLB, and European football sports markets.',
    },
    longDescription: {
      es: 'Una suite completa de an\u00e1lisis que usa modelos estad\u00edsticos avanzados por deporte combinados con AI para contextualizaci\u00f3n. Incluye scanners autom\u00e1ticos de valor, modelado de redistribuci\u00f3n por ausencias y un sistema de tiers de confiabilidad visual.',
      en: 'A comprehensive analytics suite using advanced sport-specific statistical models combined with AI for contextualization. Includes automatic value scanners, absence redistribution modeling, and a visual reliability tier system.',
    },
    stack: ['Python', 'Claude AI', 'FBref API', 'ESPN API'],
    features: {
      es: [
        'Modelos estad\u00edsticos avanzados por deporte (xG, wOBA, eFG%)',
        'Scanner autom\u00e1tico de valor con motor de contexto',
        'Sistema de confiabilidad con tiers visuales',
        'Modelado de redistribuci\u00f3n por ausencias',
      ],
      en: [
        'Advanced sport-specific statistical models (xG, wOBA, eFG%)',
        'Automatic value scanner with context engine',
        'Visual reliability tier system',
        'Absence redistribution modeling',
      ],
    },
    image: null,
    links: { demo: null, repo: null },
  },
];
