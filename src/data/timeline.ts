// ─── Timeline Data Model ─────────────────────────────────────────────────────

export type TimelineIdentity = 'enterprise' | 'labs';

export interface TimelineNode {
  id: string;
  year: number;
  month: string;           // e.g. "Mar", "Sep"
  identity: TimelineIdentity;
  account: string;         // tomas4211 | RyuTsuki08
  actionLog: string;       // Terminal-style log of the milestone
  techTags: string[];
  isAcademic?: boolean;    // Renders academic badge
  academicLabel?: string;  // e.g. "IUJO · TSU Informática"
  isElite?: boolean;       // Renders "ELITE TRAINING" badge + oversized card
}

// ─── Identity accent colors ──────────────────────────────────────────────────

export const TIMELINE_ACCENT: Record<TimelineIdentity, string> = {
  enterprise: '#ff00ff', // magenta → tomas4211
  labs: '#00ffff', // cyan    → RyuTsuki08
};

export const TIMELINE_LABEL: Record<TimelineIdentity, string> = {
  enterprise: 'Enterprise // tomas4211',
  labs: 'Labs // RyuTsuki08',
};

// ─── Journey nodes (chronological) ──────────────────────────────────────────

export const TIMELINE_NODES: TimelineNode[] = [
  {
    id: 'system_init',
    year: 2020,
    month: 'Jan',
    identity: 'labs',
    account: 'RyuTsuki08',
    actionLog: 'INIT_SYSTEM: Comienzo autodidacta. Exploración de lógica y despliegue del primer sitio en GitHub Pages.',
    techTags: ['HTML5', 'CSS3', 'JS Vanilla', 'GitHub Pages'],
  },
  {
    id: 'logic_core_platzi',
    year: 2021,
    month: 'Oct',
    identity: 'labs',
    account: 'RyuTsuki08',
    actionLog: 'Aprobación "Curso de Programación Básica" en Platzi. Primeros pasos estructurados en desarrollo.',
    techTags: ['Canvas', 'DOM', 'Basic Algorithms'],
    isAcademic: true,
    academicLabel: 'Platzi · Certificado Online',
  },
  {
    id: 'prixelart_fullstack',
    year: 2022,
    month: 'Aug',
    identity: 'enterprise',
    account: 'tomas4211',
    actionLog: 'Desarrollador Full Stack: Creación e integración de APIs y servicios de gestión de medios (subida de imágenes) consumidos desde React.',
    techTags: ['NodeJS', 'MongoDB', 'React', 'Material UI'],
  },
  {
    id: 'currency_api_v1',
    year: 2022,
    month: 'Mar',
    identity: 'labs',
    account: 'RyuTsuki08',
    actionLog: 'Desarrollo de conversor monetario con API DolarToday. Primer encuentro con el consumo de APIs externas.',
    techTags: ['REST API', 'JSON', 'Fetch API'],
  },
  {
    id: 'uneweb_logic',
    year: 2022,
    month: 'Aug',
    identity: 'enterprise',
    account: 'tomas4211',
    actionLog: 'Culminación presencial de "Lógica de Programación" en Uneweb. Salto hacia el stack Full-stack.',
    techTags: ['NodeJS', 'React', 'CRUD Logic'],
    isAcademic: true,
    academicLabel: 'Uneweb · Caracas',
  },
  {
    id: 'iujo_acceleration',
    year: 2024,
    month: 'Apr',
    identity: 'enterprise',
    account: 'tomas4211',
    actionLog: 'Ingreso al IUJO. Estandarización de fundamentos académicos de ingeniería.',
    techTags: ['SQL', 'Data Structures', 'C++'],
    isAcademic: true,
    academicLabel: 'IUJO · TSU Informática',
  },
  {
    id: 'samsung_ai_track',
    year: 2025,
    month: 'Mar',
    identity: 'enterprise',
    account: 'tomas4211',
    actionLog: 'Especialización en Samsung Innovation Campus (240h). Desarrollo de pipelines de IA y Python avanzado.',
    techTags: ['Python', 'TensorFlow', 'AI Models', 'Data Science'],
    isAcademic: true,
    academicLabel: 'Samsung · AI Program (240h)',
    isElite: true,
  },
  {
    id: 'lead_dev_credix',
    year: 2026,
    month: 'Jan',
    identity: 'enterprise',
    account: 'tomas4211',
    actionLog: 'Consolidación como Lead Developer en Credix. Gestión de arquitectura multi-tenant y Angular 19.',
    techTags: ['Angular 19', 'Nx', 'PM', 'Agile'],
  },
];
