import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['it', 'en'],
  defaultLocale: 'it',
  localeDetection: true,
  localePrefix: 'as-needed'
});

export type Locale = (typeof routing.locales)[number];
