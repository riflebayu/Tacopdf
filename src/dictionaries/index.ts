import 'server-only';

const dictionaries = {
  en: () => import('./en.json').then((module) => module.default),
  id: () => import('./id.json').then((module) => module.default),
  es: () => import('./en.json').then((module) => module.default), // Fallbacks for now
  fr: () => import('./en.json').then((module) => module.default),
  de: () => import('./en.json').then((module) => module.default),
  pt: () => import('./en.json').then((module) => module.default),
  ja: () => import('./en.json').then((module) => module.default),
};

export const getDictionary = async (locale: keyof typeof dictionaries) => {
  return dictionaries[locale]?.() ?? dictionaries.en();
};
