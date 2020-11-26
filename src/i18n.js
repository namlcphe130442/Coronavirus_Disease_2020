import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { reactI18nextModule } from "react-i18next";

import translationEN from './locales/en/translation.json';
import translationVN from './locales/vn/translation.json';
import translationJP from './locales/jp/translation.json';

// the translations
const resources = {
  en: {
    translation: translationEN
  },
  vn: {
    translation: translationVN
  },
  jp: {
    translation: translationJP
  }
};

const dataLocal = localStorage.getItem('languageOfProjectCovid');
const language = dataLocal !== null ? JSON.parse(dataLocal) : 'jp';

i18n
  .use(detector)
  .use(reactI18nextModule) // passes i18n down to react-i18next
  .init({
    resources,
    lng: language,
    fallbackLng: language, // use en if detected lng is not available

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;