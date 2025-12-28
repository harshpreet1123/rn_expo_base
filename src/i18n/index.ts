import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import en from './locales/en.json';
import es from './locales/es.json';
import de from './locales/de.json';
import hi from './locales/hi.json';
import pa from './locales/pa.json';
import ja from './locales/ja.json';
import ko from './locales/ko.json';
import ar from './locales/ar.json';

const resources = {
  en: { translation: en },
  es: { translation: es },
  de: { translation: de },
  hi: { translation: hi },
  pa: { translation: pa },
  ja: { translation: ja },
  ko: { translation: ko },
  ar: { translation: ar },
};

// Detect the language code safely
const getLocale = () => {
    try {
        const locales = Localization.getLocales();
        if (locales && locales.length > 0) {
            return locales[0].languageCode ?? 'en';
        }
    } catch (e) {
        console.warn('Error getting locale', e);
    }
    return 'en';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getLocale(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    compatibilityJSON: 'v4', // Required for Android
  });

export default i18n;
