export interface Project {
  id: string;
  title: { es: string; en: string };
  category: 'ai' | 'app';
  description: { es: string; en: string };
  longDescription: { es: string; en: string };
  stack: string[];
  features: { es: string[]; en: string[] };
  image: string | null;
  images: string[];
  video: string | null;
  displayType?: 'desktop' | 'mobile';
  links: { demo: string | null; repo: string | null; appStore: string | null; playStore: string | null };
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
    image: '/images/barbershop-app-thumb.jpg',
    images: [],
    video: '/videos/barbershop-app.mp4',
    displayType: 'desktop',
    links: { demo: null, repo: null, appStore: null, playStore: null },
  },
  {
    id: 'racing-club',
    title: {
      es: 'Racing Club de Olavarr\u00eda',
      en: 'Racing Club de Olavarr\u00eda',
    },
    category: 'app',
    description: {
      es: 'Aplicaci\u00f3n mobile para un club deportivo: beneficios, noticias, pago de cuotas y carnet digital.',
      en: 'Mobile app for a sports club: benefits, news, fee payments, and digital membership card.',
    },
    longDescription: {
      es: 'Una aplicaci\u00f3n mobile desarrollada para Racing Club de Olavarr\u00eda que centraliza toda la experiencia del socio. Permite acceder a beneficios exclusivos, leer noticias del club, pagar cuotas pendientes y llevar el carnet de socio en formato digital.',
      en: 'A mobile application developed for Racing Club de Olavarr\u00eda that centralizes the entire member experience. Allows access to exclusive benefits, reading club news, paying pending fees, and carrying a digital membership card.',
    },
    stack: ['React Native', 'Node.js', 'TypeScript'],
    features: {
      es: [
        'Beneficios exclusivos para socios',
        'Noticias y novedades del club',
        'Pago de cuotas pendientes',
        'Carnet digital de socio',
      ],
      en: [
        'Exclusive member benefits',
        'Club news and updates',
        'Pending fee payments',
        'Digital membership card',
      ],
    },
    image: '/images/racing-club/home.jpeg',
    images: [
      '/images/racing-club/home.jpeg',
      '/images/racing-club/beneficios.jpeg',
      '/images/racing-club/noticias.jpeg',
      '/images/racing-club/pagos.jpeg',
      '/images/racing-club/carnet.jpeg',
    ],
    video: null,
    displayType: 'mobile',
    links: { demo: null, repo: null, appStore: 'https://apps.apple.com/ar/app/racing-club-olavarria/id6745906037', playStore: null },
  },
];
