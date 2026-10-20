/**
 * Rutas bajo /public — añade los PDFs/imágenes reales con estos nombres o ajusta `asset` / `thumb`.
 */
export type CertKind = 'pdf' | 'image';

export type CertProvider = 'Platzi' | 'Uneweb' | 'Samsung SIC' | 'Udemy' | 'Social Oplesk';

export interface Certificate {
  id: string;
  provider: CertProvider;
  title: string;
  /** Etiqueta legible de fecha */
  dateLabel: string;
  hours?: number;
  /** Enterprise → magenta · Labs / cursos → cian */
  tier: 'enterprise' | 'labs';
  asset: string;
  kind: CertKind;
  /** Miniatura opcional; si falla la carga, el vault muestra fallback */
  thumb?: string;
  /** 'done' = completado (default) · 'pending' = en curso */
  status?: 'done' | 'pending';
  /** Para certificados pending: fecha estimada de finalización */
  eta?: string;
  /** Skills/temas destacados */
  highlights?: string[];
}

export const CERTIFICATES: Certificate[] = [
  // ─── Social Oplesk (más recientes primero) ────────────────────────────────
  {
    id: 'social-oplesk-devsecops-2027',
    provider: 'Social Oplesk',
    title: 'Diplomado DevSecOps',
    dateLabel: '3 Nov 2026',
    hours: 150,
    tier: 'enterprise',
    asset: '',
    kind: 'pdf',
    thumb: '/certs/social-oplesk-2026-thumb.png',
    status: 'pending',
    eta: 'Abr 2027',
    highlights: ['DevSecOps', 'CI/CD Security', 'Cloud Security'],
  },
  {
    id: 'social-oplesk-cybersec-2026',
    provider: 'Social Oplesk',
    title: 'Programa Básico · Ciberseguridad & Hacking Ético',
    dateLabel: 'Oct 2026',
    tier: 'enterprise',
    asset: '/certs/social-oplesk-2026.pdf',
    kind: 'pdf',
    thumb: '/certs/social-oplesk-2026-thumb.png',
    status: 'done',
    highlights: ['Firewall WAF', 'FFUF', 'Hacking Ético'],
  },
  // ─── Samsung ──────────────────────────────────────────────────────────────
  {
    id: 'samsung-sic-2025',
    provider: 'Samsung SIC',
    title: 'Samsung Innovation Campus · IA & Python',
    dateLabel: 'Mar 2025',
    hours: 240,
    tier: 'enterprise',
    asset: '/certs/samsung-sic-2025.pdf',
    kind: 'pdf',
    thumb: '/certs/samsung-sic-thumb.png',
  },
  // ─── Udemy ────────────────────────────────────────────────────────────────
  {
    id: 'udemy-webdev',
    provider: 'Udemy',
    title: 'The Web Developer Bootcamp',
    dateLabel: 'Udemy',
    tier: 'labs',
    asset: '/certs/udemy-webdev.pdf',
    kind: 'pdf',
    thumb: '/certs/udemy-webdev-thumb.jpg',
  },
  {
    id: 'udemy-react',
    provider: 'Udemy',
    title: 'React · The Complete Guide',
    dateLabel: 'Udemy',
    tier: 'labs',
    asset: '/certs/udemy-react.pdf',
    kind: 'pdf',
    thumb: '/certs/udemy-react-thumb.jpg',
  },
  {
    id: 'udemy-laravel',
    provider: 'Udemy',
    title: 'Laravel · API & Eloquent',
    dateLabel: 'Udemy',
    tier: 'labs',
    asset: '/certs/udemy-laravel.pdf',
    kind: 'pdf',
    thumb: '/certs/udemy-laravel-thumb.jpg',
  },
  // ─── Anteriores ───────────────────────────────────────────────────────────
  {
    id: 'uneweb-2022',
    provider: 'Uneweb',
    title: 'Programa académico Uneweb',
    dateLabel: 'Ago 2022',
    hours: 20,
    tier: 'labs',
    asset: '/certs/uneweb-2022.pdf',
    kind: 'pdf',
    thumb: '/certs/uneweb-2022-thumb.png',
  },
  {
    id: 'platzi-2021',
    provider: 'Platzi',
    title: 'Formación Platzi · Escuela Web',
    dateLabel: 'Oct 2021',
    tier: 'labs',
    asset: '/certs/platzi-2021.pdf',
    kind: 'pdf',
    thumb: '/certs/platzi-2021-thumb.png',
  },
];

export const CV_PDF_PATH = '/Christian%20Paez%20CV%20-%20devWeb-1.pdf';
