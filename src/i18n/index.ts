// ─── Language store + helpers ──────────────────────────────────────────────

import { es } from './es';
import { en } from './en';
import type { Dict } from './es';

export type Lang = 'es' | 'en';

export const dictionaries: Record<Lang, Dict> = { es, en };

/** Get dictionary for a given lang code */
export function getDict(lang: Lang): Dict {
  return dictionaries[lang];
}

/** Toggle between ES / EN */
export function toggleLang(current: Lang): Lang {
  return current === 'es' ? 'en' : 'es';
}

export { es, en };
export type { Dict };
