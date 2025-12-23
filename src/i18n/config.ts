import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import en from "./en.json"
import fr from "./fr.json"

export const defaultNS = "translation";
export const resources = {
    fr,
    en
}

i18n
    .use(initReactI18next)
    .init({
        lng:         "en",
        fallbackLng: "en",
        
        debug: true,
        interpolation: {
            escapeValue: true
        },

        defaultNS,
        resources
    });