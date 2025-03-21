import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en";
import id from "./id";
import Cookies from "js-cookie";

const LANGUAGES = { en, id };

i18n.use(initReactI18next).init({
  resources: LANGUAGES,
  lng: Cookies.get(import.meta.env.VITE_APP_COOKIE_LANGUAGE) ?? "id",
  fallbackLng: "id",
  react: { useSuspense: false },
  interpolation: { escapeValue: false },
});

export default i18n;
