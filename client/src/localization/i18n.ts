import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en, kk, ru } from "./translations";

const resources = {
  en: {
    translation: en,
  },
  ru: {
    translation: ru,
  },
  kk: {
    translation: kk,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
