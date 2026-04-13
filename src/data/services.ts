export interface Service {
  id: string;
  icon: string;
  title: { es: string; en: string };
  description: { es: string; en: string };
  features: { es: string[]; en: string[] };
}

export const services: Service[] = [
  {
    id: 'custom-apps',
    icon: 'Monitor',
    title: {
      es: 'Desarrollo de Aplicaciones a Medida',
      en: 'Custom Application Development',
    },
    description: {
      es: 'Apps desktop y web con arquitectura sólida, diseñadas para resolver problemas específicos de tu negocio.',
      en: 'Desktop and web apps with solid architecture, designed to solve your specific business problems.',
    },
    features: {
      es: [
        'Aplicaciones desktop nativas con Tauri',
        'Plataformas web full-stack',
        'Interfaces intuitivas y performantes',
        'Bases de datos optimizadas para tu caso de uso',
      ],
      en: [
        'Native desktop applications with Tauri',
        'Full-stack web platforms',
        'Intuitive and performant interfaces',
        'Databases optimized for your use case',
      ],
    },
  },
  {
    id: 'ai-automation',
    icon: 'Bot',
    title: {
      es: 'Automatización con AI',
      en: 'AI-Powered Automation',
    },
    description: {
      es: 'Bots, pipelines y herramientas que integran inteligencia artificial para automatizar procesos y generar insights.',
      en: 'Bots, pipelines, and tools that integrate artificial intelligence to automate processes and generate insights.',
    },
    features: {
      es: [
        'Bots autónomos con toma de decisiones AI',
        'Pipelines de análisis de datos inteligentes',
        'Integración con APIs de modelos de lenguaje',
        'Sistemas de monitoreo y alertas automatizados',
      ],
      en: [
        'Autonomous bots with AI decision-making',
        'Intelligent data analysis pipelines',
        'Language model API integration',
        'Automated monitoring and alert systems',
      ],
    },
  },
  {
    id: 'consulting',
    icon: 'Lightbulb',
    title: {
      es: 'Consultoría Técnica',
      en: 'Technical Consulting',
    },
    description: {
      es: 'Arquitectura de sistemas, elección de stack y estrategia para integrar AI en workflows existentes.',
      en: 'Systems architecture, stack selection, and strategy for integrating AI into existing workflows.',
    },
    features: {
      es: [
        'Auditoría y mejora de arquitectura existente',
        'Selección de tecnologías para tu proyecto',
        'Estrategia de integración de AI',
        'Optimización de procesos de desarrollo',
      ],
      en: [
        'Existing architecture audit and improvement',
        'Technology selection for your project',
        'AI integration strategy',
        'Development process optimization',
      ],
    },
  },
];
