import { defineRouting } from 'next-intl/routing';

export type Locale = 'pt' | 'en';

export const routing = defineRouting({
  locales: ['pt', 'en'] satisfies Locale[],
  defaultLocale: 'pt',
  localeDetection: true,
});
