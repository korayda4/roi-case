import { en } from './translations/en';
import { tr } from './translations/tr';

export const translations = { en, tr } as const;

export type Lang = keyof typeof translations;
export type Translations = typeof en;

export function getT(lang: string): Translations {
  return translations[lang === 'tr' ? 'tr' : 'en'] as unknown as Translations;
}