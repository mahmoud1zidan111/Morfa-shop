import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./Languages/en/translation.json";
import ar from "./Languages/ar/translation.json";
import zh from "./Languages/zh/translation.json";

const savedLang = localStorage.getItem("preferredLanguage") || "en";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
    zh: { translation: zh },
  },
  lng: savedLang,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
