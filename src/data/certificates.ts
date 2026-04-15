/**
 * Rutas bajo /public — añade los PDFs/imágenes reales con estos nombres o ajusta `asset` / `thumb`.
 */
export type CertKind = 'pdf' | 'image';

export type CertProvider = 'Platzi' | 'Uneweb' | 'Samsung SIC' | 'Udemy';

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
}

export const CERTIFICATES: Certificate[] = [
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
];

export const CV_PDF_PATH = '/Christian%20Paez%20CV%20-%20devWeb-1.pdf';
