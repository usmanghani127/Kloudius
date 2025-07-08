import i18n from 'i18next';
import { useEffect, useRef } from 'react';
import { initReactI18next } from 'react-i18next';
import * as English from './en.json';

export const useLocalization = () => {
  const isInitialized = useRef(false);

  const language = 'en';

  if (!isInitialized.current) {
    i18n.use(initReactI18next).init({
      resources: {
        en: {
          translation: English,
        },
      },
      lng: 'en',
      fallbackLng: 'en',

      interpolation: {
        escapeValue: false,
      },
    });
    isInitialized.current = true;
  }

  useEffect(() => {
    if (language && isInitialized.current) {
      i18n.changeLanguage(language);
    }
  }, [language]);
};
