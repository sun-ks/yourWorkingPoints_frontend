import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    supportedLngs: ['en', 'ua', 'ro'],
    interpolation: { escapeValue: false },
    react: {
      useSuspense: false,
      bindI18n: 'languageChanged loaded',
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json?v=' + new Date().getTime(),
      requestOptions: {
        cache: 'no-store',
      },
    },
  });

export default i18n as typeof i18n & { t: (key: string) => string };
