// ─── Milestone Data Model ────────────────────────────────────────────────────

export type MilestoneIdentity = 'executive' | 'ninja';

export interface Milestone {
  id: string;
  identity: MilestoneIdentity;       // 'executive' → magenta | 'ninja' → cyan
  account: string;                   // GitHub account display name
  status: string;                    // e.g. "Production", "98 Lighthouse"
  title: string;
  role: string;                      // e.g. "Lead Developer & PM"
  description: string;               // max 2 lines
  stack: string[];
  details: {
    challenge: string;
    solution: string;
  };
}

// ─── Accent map helper ───────────────────────────────────────────────────────

export const IDENTITY_ACCENT: Record<MilestoneIdentity, string> = {
  executive: '#ff00ff',
  ninja: '#00f2ff',
};

// ─── Projects (source of truth) ──────────────────────────────────────────────

export const MILESTONES: Milestone[] = [
  {
    id: 'credix_crm',
    identity: 'executive',
    account: 'tomas4211',
    status: 'Production',
    title: 'Multi-tenant CRM',
    role: 'Lead Frontend Developer & PM',
    description:
      'Migración crítica Angular 14 → 19 con arquitectura multi-tenant y SSO. Cero downtime en producción sobre plataforma fintech enterprise.',
    stack: ['Angular 19', 'NX Monorepo', 'NgRx Signals', 'Auth0', 'FastAPI', 'CI/CD'],
    details: {
      challenge:
        'Migrar 50+ componentes legacy de Angular 14 a 19 sin interrumpir el servicio en un CRM multi-tenant con flujos de autenticación SSO críticos y múltiples organizaciones activas simultáneamente.',
      solution:
        'Implementé un pipeline automático de migración por etapas usando NX migration executors + schematics personalizados. División del monorepo en micro-frontends estabilizados antes de cada upgrade. Feature flags para rollback instantáneo por tenant.',
    },
  },
  {
    id: 'mango_brains',
    identity: 'executive',
    account: 'tomas4211',
    status: 'Samsung SIC',
    title: 'Mango Brains',
    role: 'IA Architecture Lead',
    description:
      'Proyecto del Samsung Innovation Campus: sistema de análisis agrícola con visión por computadora para detectar enfermedades en cultivos de mango.',
    stack: ['Python', 'FastAPI', 'TensorFlow Lite', 'React Native', 'Node.js', 'MongoDB'],
    details: {
      challenge:
        'Diseñar un pipeline de inferencia de visión por computadora que funcionara en campo con conectividad limitada y dispositivos móviles de gama media sin GPU dedicada.',
      solution:
        'Modelo TFLite cuantizado a 8-bit con inferencia on-device vía React Native + TFLite bindings. API FastAPI para sincronización batch cuando hay conexión. Accuracy: 87% en detección de antracnosis y oidio.',
    },
  },
  {
    id: 'finanve_pwa',
    identity: 'ninja',
    account: 'RyuTsuki08',
    status: '98 Lighthouse',
    title: 'Finanve PWA',
    role: 'Automation Architect & Full-stack',
    description:
      'PWA offline-first para gestión financiera en Venezuela. Tasas BCV en tiempo real, parser de extractos bancarios y soporte multi-divisa.',
    stack: ['Astro 6', 'React 19', 'Tailwind 4', 'IndexedDB', 'Service Worker', 'Zod'],
    details: {
      challenge:
        'Construir una app financiera confiable para el mercado venezolano donde la conectividad es intermitente, las tasas cambian varias veces al día y los bancos no ofrecen APIs oficiales.',
      solution:
        'Arquitectura offline-first con CRUD completo en IndexedDB + sync background via Service Worker. Scraper BCV con fallback automático a API alternativa. Parser regex tuneable para TXT de extractos Banesco. Lighthouse 98/100.',
    },
  },
];
