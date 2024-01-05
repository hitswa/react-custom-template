import i18n from 'i18next';
import ICU from 'i18next-icu';
import { initReactI18next  } from 'react-i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import i18nHttpBackend,  { HttpBackendOptions } from 'i18next-http-backend';

import * as languages from './languages/index';

let objResource: Record<string, { translation: Record<string, string> }> = {};

(Object.keys(languages) as Array<keyof typeof languages>)
    .forEach((lang: keyof typeof languages) => {
        objResource[lang] = { translation: languages[lang] };
    });


i18n
    .use(ICU)   // for International Components for Unicode standard
    .use(i18nHttpBackend)
    .use(I18nextBrowserLanguageDetector)
    .use(initReactI18next)  // passes i18n down to react-i18next
    .init<HttpBackendOptions>({
        resources: {
            ...objResource,
            // "en": { translation: languages.en }, 
            // "hi": { translation: languages.hi }, 
        },
        fallbackLng: 'en',
        debug: false,
        interpolation: {
            escapeValue: false  // react already safes from cross-site-scripting (xss)
        },
        // react i18next special options (optional)
        react: {
            bindI18n: 'languageChanged loaded',
            bindI18nStore: 'added removed',
            transEmptyNodeValue: '',
            transSupportBasicHtmlNodes: true,
            transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
            useSuspense: true,
            keyPrefix: undefined,
            nsMode: 'default',
        }
    });

export default i18n;