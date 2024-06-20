import i18next, { TOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/translations';
import pt from './locales/pt/translations';

export const defaultLanguage = 'pt';

export const translation = (key: string, options?: TOptions) =>
  i18next.t(key, options);

if (!i18next.isInitialized) {
  i18next.use(initReactI18next).init({
    resources: {
      en,
      pt,
    },
    lng: defaultLanguage,
    fallbackLng: ['pt', 'en'],
    debug: Boolean(process.env.DEBUG),
  });
}

export default i18next;
