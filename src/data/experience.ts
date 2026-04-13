export interface Experience {
  id: string;
  company: { es: string; en: string };
  role: { es: string; en: string };
  period: string;
  isCurrent: boolean;
  description: { es: string[]; en: string[] };
  tags: string[];
}

export const experiences: Experience[] = [
  {
    id: 'independent',
    company: {
      es: 'Independiente',
      en: 'Independent',
    },
    role: {
      es: 'Desarrollador Full-Stack & Especialista AI',
      en: 'Full-Stack Developer & AI Specialist',
    },
    period: '2026',
    isCurrent: true,
    description: {
      es: [
        'Desarrollo de aplicaciones a medida con integración de inteligencia artificial',
        'Diseño e implementación de bots de trading autónomos y pipelines de análisis',
        'Consultoría técnica en arquitectura de sistemas y automatización de procesos',
      ],
      en: [
        'Custom application development with artificial intelligence integration',
        'Design and implementation of autonomous trading bots and analytics pipelines',
        'Technical consulting in systems architecture and process automation',
      ],
    },
    tags: ['React', 'TypeScript', 'Rust', 'Python', 'Claude AI', 'Tauri'],
  },
  {
    id: 'bision-2',
    company: {
      es: 'Bision IT Solutions',
      en: 'Bision IT Solutions',
    },
    role: {
      es: 'Desarrollador Full Stack',
      en: 'Full Stack Developer',
    },
    period: 'Sep 2023 — Dic 2025',
    isCurrent: false,
    description: {
      es: [
        'Desarrollo y evolución de aplicaciones web y móviles, aportando en frontend y backend',
        'Implementación de integraciones con APIs de terceros y pasarelas de pago externas',
        'Construcción de APKs, pruebas en dispositivos y optimización de funcionalidades',
      ],
      en: [
        'Development and evolution of web and mobile applications, contributing to frontend and backend',
        'Implementation of third-party API integrations and external payment gateways',
        'APK building, device testing, and feature optimization',
      ],
    },
    tags: ['React', 'React Native', 'Node.js', 'JavaScript', 'Docker'],
  },
  {
    id: 'baufest',
    company: {
      es: 'Baufest',
      en: 'Baufest',
    },
    role: {
      es: 'Desarrollador Full Stack',
      en: 'Full Stack Developer',
    },
    period: 'Mar 2023 — Dic 2023',
    isCurrent: false,
    description: {
      es: [
        'Análisis, diseño y desarrollo de requerimientos técnicos y funcionales para sistemas empresariales',
        'Desarrollo de pruebas unitarias y soporte técnico a distintos equipos',
      ],
      en: [
        'Analysis, design, and development of technical and functional requirements for enterprise systems',
        'Unit test development and technical support across multiple teams',
      ],
    },
    tags: ['React', 'Node.js', 'JavaScript', 'JUnit', 'Jest'],
  },
  {
    id: 'esolutions',
    company: {
      es: 'eSolutions S.A.',
      en: 'eSolutions S.A.',
    },
    role: {
      es: 'Desarrollador Full Stack',
      en: 'Full Stack Developer',
    },
    period: 'May 2022 — Mar 2023',
    isCurrent: false,
    description: {
      es: [
        'Desarrollo de soluciones web participando en el análisis técnico y funcional de requerimientos',
        'Implementación y mantenimiento de sistemas productivos',
      ],
      en: [
        'Web solution development with participation in technical and functional requirements analysis',
        'Implementation and maintenance of production systems',
      ],
    },
    tags: ['Java', 'React', 'JavaScript'],
  },
  {
    id: 'bision-1',
    company: {
      es: 'Bision IT Solutions',
      en: 'Bision IT Solutions',
    },
    role: {
      es: 'Desarrollador Java / Angular',
      en: 'Java / Angular Developer',
    },
    period: 'Abr 2019 — May 2022',
    isCurrent: false,
    description: {
      es: [
        'Análisis, diseño y desarrollo de sistemas web orientados a procesos empresariales',
        'Mantenimiento evolutivo y soporte técnico de aplicaciones existentes',
      ],
      en: [
        'Analysis, design, and development of web systems for enterprise business processes',
        'Evolutionary maintenance and technical support of existing applications',
      ],
    },
    tags: ['Java', 'Angular', 'Spring Boot'],
  },
];
