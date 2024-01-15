# Project Setup

## Semantic Versioning

### Conventional commits

[Conventional commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/) is a commit message format [specification](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional) which one should follow while commiting code.

We will use [commit lint](https://commitlint.js.org/#/) library and will enforce this via [git hook](https://git-scm.com/docs/githooks) and for this we will use [husky](https://typicode.github.io/husky/)

Install and `husky` and `commitlint` libraries

```bash
npx husky-init && npm install
npm install @commitlint/{cli,config-conventional}
```

now create husky hook which will check the commit message format, which should be in the format of conventional commits. for this create a file `commit-msg` in `.husky` folder.

```bash
#!/bin/sh

. "$(dirname "$0")/_/husky.sh"


npx --no-install commitlint --edit "$1"
```

you can also create this file using `git add .husky/commit-msg` command.

now make this shell script executable (for linux/mac only)

```bash
chmod +x .husky/commit-msg
```

now create `commitlint.config.js` file in root directory which extends the rules from config-conventional

```json
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
```

This setup will ensure that developer will never be able to commit any change without following conventional commit specifications. To was the work you may use `conventional commit` extension in visual studio code. The Extension ID of the extension is `vivaxy.vscode-conventional-commits`.

### Versioning

There are various type of `silly` or `geeky` versioning as following

- build number versioning
- [calendar versioning](https://calver.org/)
- [sematic versioning](https://semver.org/) (<-- what we are using)
- marketing versioning
- milestone versioning
- random versioning

We are using [standard version](https://github.com/conventional-changelog/standard-version) package to implement [conventional changelog configuration spec](https://github.com/conventional-changelog/conventional-changelog-config-spec/blob/master/versions/2.2.0/README.md#premajor-boolean) in the project.

install `standard-version` library. This library uses conventional commit messages to extract messages to be added in `CHANGELOG.md` file. However, it is deprecated as per library readme but it is working fine specially if someone wish to implement versioning independently in code, i.e. without any external DevOps tool like GitOps etc.

```bash
npm i --save-dev standard-version
```

now, add scripts in `package.json` file.

```json
"scripts": {
    "release": "standard-version",
    "release:minor": "standard-version --release-as minor",
    "release:patch": "standard-version --release-as patch",
    "release:major": "standard-version --release-as major"
},
```

now create `.versionrc.json` file to setup changelog log settings. please read [conventional changelog configuration spec](https://github.com/conventional-changelog/conventional-changelog-config-spec/blob/master/versions/2.2.0/README.md#premajor-boolean) documentation to understand and customize these settings as per your need

```json
{
    "types": [
      { "type": "build", "section": "Features", "hidden": false },
      { "type": "chore", "section": "", "hidden": true },
      { "type": "ci", "section": "", "hidden": true }, 
      { "type": "docs", "section": "Document", "hidden": false },
      { "type": "feat", "section": "Features", "hidden": false },
      { "type": "fix", "section": "Fixes", "hidden": false }, 
      { "type": "perf", "section": "Fixes", "hidden": false }, 
      { "type": "refactor", "section": "Fixes", "hidden": false },
      { "type": "revert", "section": "Revert", "hidden": false } 
      { "type": "style", "section": "Style", "hidden": false },
      { "type": "test", "section": "", "hidden": true }
    ],
    "commitUrlFormat": "{{host}}/{{owner}}/{{repository}}/commit/{{hash}}",
    "compareUrlFormat": "{{host}}/{{owner}}/{{repository}}/compare/{{previousTag}}...{{currentTag}}",
    "issueUrlFormat": "{{host}}/{{owner}}/{{repository}}/issues/{{id}}",
    "userUrlFormat": "{{host}}/{{user}}"
}
```

Now, lets release your first version, this will create `CHANGELOG.md` file in your project root.

```bash
npm run release -- --first-release
```

```bash
# Following are the output of running the command
> template@0.1.0 release
> standard-version --first-release

✖ skip version bump on first release
✔ created CHANGELOG.md
✔ outputting changes to CHANGELOG.md
✔ committing CHANGELOG.md
✔ tagging release v0.1.0
ℹ Run `git push --follow-tags origin main` to publish
```

you can check version tag using `git tag` command

## Routing

for routing we are using [React Router DOM](https://reactrouter.com/en/main), let's install

```bash
npm install react-router-dom --save
npm install @types/react-router-dom --save-dev
```

Now implement following file system in your project

```text
📁 <project-root>
└📁 src
  └📁 Routes
    ├📁 Auth
    │ └📄 AuthRouter.tsx
    ├📁 Dashboard
    │ └📄 DashboardRouter.tsx
    ├📄 AppRouter.tsx
    └📄 index.tsx
```

The content of these files are as following

```typescript
// <project-root>/src/Routes/Auth/AuthRoutes.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";

const AuthRouter = () => {
    return (
        <Routes>
            <Route path="/"  element={<>AUTH</>} />
            <Route path="/login"  element={<>AUTH-LOGIN</>} />
            <Route path="/signup" element={<>AUTH-SIGNUP</>} />
            <Route path="/forget" element={<>AUTH-FORGET</>} />
            <Route path="/*" element={<>404</>} />
        </Routes>
    )
}

export default AuthRouter;
```

```typescript
// <project-root>/src/Routes/Dashboard/DashboardRoutes
import React from "react";
import { Routes, Route } from "react-router-dom";

const DashboardRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<>DASHBOARD-INDEX</>} />
            <Route path="/about" element={<>DASHBOARD-ABOUT</>} />
            <Route path="/contact" element={<>DASHBOARD-CONTACT</>} />
            <Route path="/*" element={<>404</>} />
        </Routes>
    )
}

export default DashboardRouter;
```

```typescript
// <project-root>/src/Routes/index.tsx
export { default as AppRouter } from './AppRouter';
export { default as AuthRouter } from './Auth/AuthRoutes';
export { default as DashboardRouter } from './Dashboard/DashboardRoutes';
```

```typescript
// <project-root>/src/Routes/AppRouter.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthRouter, DashboardRouter } from "../Routes";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<>HOME</>} />
                <Route path="/auth/*" element={<AuthRouter />} />
                <Route path="/dashboard/*" element={<DashboardRouter />} />
                <Route path="/*" element={<>404</>} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;
```

once you created these files, modify `<project-root>/src/index.tsx` file as following

```typescript
// <project-root>/src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { AppRouter } from './Routes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
```

You can implement as many nested separate route files as you wish using this method.

## Internationalization (i18n) / localization (l10n)

There are several standards of i18n or l10n, we are using International Components for Unicode (ICU).

Install all required services

```bash
npm install i18next-http-backend react-i18next i18next i18next-icu --save
npm install @types/i18next-browser-languagedetector @types/react-i18next @types/i18next --save-dev
```

No create following folder(s) and file(s). you can add as many language folders inside `languages` folder. Name of the folder can be either character or like `en` for english and `hi` for hindi language or you can add `<language>-<country>` based names e.g. `en-IN` for english india or `en-US` english united states. All these languages folder will include `translation.json` file having translation of that particular language. Once added developer need to add an entry in `<project-root>/src/Local/languages/index.tsx` file.

```text
📁 <project-root>
└📁 src
  ├📄 index.tsx <-- already exists
  ├📁 Components
  │  └📁 Local
  │     └📄 LanguageSwitcher.tsx
  ├📁 Contexts
  │     ├📄 index.tsx
  │     └📄 LanguageContext.tsx
  ├📁 Local
  │  ├📁 languages
  │  │  ├📁 en
  │  │  │  └📄 translation.json
  │  │  ├📁 hi
  │  │  │  └📄 translation.json
  │  │    ... <-- you can add more languages here
  │  │  │
  │  │  └📄 index.tsx
  │  └📄 i18n.tsx
  └📁 Static
     └📄 Language.json
```

translation file for english language

```JSON
// <project-root>/src/Local/languages/en/translation.json
{
    "hello": "hello"
}
```

translation file for hindi language

```JSON
// <project-root>/src/Local/languages/hi/translation.json
{
    "hello": "नमस्ते"
}
```

export all translation files to export from one file. We will use this export object to auto import resource in `i18n.tsx` file

```typescript
// <project-root>/src/Local/languages/index.tsx
import en from './en/translation.json';
import hi from './hi/translation.json';

export {
    en, // English
    hi, // Hindi
}
```

setup i18n configuration in `i18n.tsx`

```typescript
// <project-root>/src/Local/i18n.tsx
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
```

Let's create the language context now so that it can be accessed anywhere in the project.

```typescript
// <project-root>/src/Contexts/LanguageContext.tsx
import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import i18n from 'i18next';

/**
 * @typedef {Object} LanguageContextType
 * @property {string} language - The current language.
 * @property {(newLanguage: string) => void} changeLanguage - Function to change the language.
 */
interface LanguageContextType {
  language: string;
  changeLanguage: (newLanguage: string) => void;
}

/**
 * @type {React.Context<LanguageContextType | undefined>}
 */
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * @typedef {Object} LanguageProviderProps
 * @property {ReactNode} children - Child components to be wrapped by the LanguageProvider.
 */
interface LanguageProviderProps {
  children: ReactNode;
}

/**
 * Provider component that manages the current language state and provides the changeLanguage function.
 * @param {Object} props - Component props.
 * @param {ReactNode} props.children - Child components to be wrapped by the provider.
 * @returns {JSX.Element} JSX element representing the LanguageProvider.
 */
const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  useEffect(() => {
    // Set the initial language on startup
    const currentLanguage = i18n.language;
    i18n.changeLanguage(currentLanguage);

    // Set the lang attribute on the HTML element
    document.documentElement.lang = currentLanguage;
  }, []);

  /**
   * Change the current language.
   * @param {string} lang - The language code to change to.
   */
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language: i18n.language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

/**
 * Custom hook for accessing language-related functionality.
 * @returns {LanguageContextType} Language context data.
 * @throws Will throw an error if used outside of a LanguageProvider.
 */
const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};


export {
    LanguageContext,
    LanguageProvider,
    useLanguage
}
```

now add the entry in context export file as following

```typescript
// <project-root>/src/Contexts/index.tsx
export { LanguageContext, LanguageProvider, useLanguage  } from './LanguageContext';
```

finally wrap the react root component with Language provided so that it will available throwout the project.

```typescript
// <root-directory>/src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { AppRouter } from './Routes';
import i18n from './Local/i18n';
import { I18nextProvider } from 'react-i18next';
import { LanguageProvider } from './Contexts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n} defaultNS={'translation'}>
      <LanguageProvider>
        <AppRouter />
      </LanguageProvider>
    </I18nextProvider>
  </React.StrictMode>
);
```

Let's add a static file i.e. `Language.json` to be used for automation of available language list for LanguageSwitcher component.

```json
// <root-directory>/src/Static/Language.json
[
    { "code": "af", "label": "Afrikaans", "name": "Afrikaans" },
    { "code": "ak", "label": "Akan", "name": "Akan" },
    { "code": "sq", "label": "Albanian", "name": "Shqip" },
    { "code": "am", "label": "Amharic", "name": "አማርኛ" },
    { "code": "ar", "label": "Arabic", "name": "العربية" },
    { "code": "az", "label": "Azerbaijani", "name": "Azərbaycanca" },
    { "code": "be", "label": "Belarusian", "name": "Беларуская" },
    { "code": "bn", "label": "Bengali", "name": "বাংলা" },
    { "code": "bs", "label": "Bosnian", "name": "Bosanski" },
    { "code": "bg", "label": "Bulgarian", "name": "Български" },
    { "code": "ny", "label": "Chichewa", "name": "Chichewa" },
    { "code": "zh", "label": "Chinese", "name": "中文" },
    { "code": "hr", "label": "Croatian", "name": "Hrvatski" },
    { "code": "cs", "label": "Czech", "name": "Čeština" },
    { "code": "da", "label": "Danish", "name": "Dansk" },
    { "code": "nl", "label": "Dutch", "name": "Nederlands" },
    { "code": "dz", "label": "Dzongkha", "name": "རྫོང་ཁ" },
    { "code": "en", "label": "English", "name": "English" },
    { "code": "eo", "label": "Esperanto", "name": "Esperanto" },
    { "code": "et", "label": "Estonian", "name": "Eesti" },
    { "code": "fi", "label": "Finnish", "name": "Suomi" },
    { "code": "fr", "label": "French", "name": "Français" },
    { "code": "gl", "label": "Galician", "name": "Galego" },
    { "code": "de", "label": "German", "name": "Deutsch" },
    { "code": "el", "label": "Greek", "name": "Ελληνικά" },
    { "code": "kl", "label": "Greenlandic", "name": "Kalaallisut" },
    { "code": "gu", "label": "Gujarati", "name": "ગુજરાતી" },
    { "code": "ha", "label": "Hausa", "name": "Hausa" },
    { "code": "he", "label": "Hebrew", "name": "עברית" },
    { "code": "hi", "label": "Hindi", "name": "हिन्दी" },
    { "code": "hu", "label": "Hungarian", "name": "Magyar" },
    { "code": "is", "label": "Icelandic", "name": "Íslenska" },
    { "code": "ig", "label": "Igbo", "name": "Igbo" },
    { "code": "id", "label": "Indonesian", "name": "Bahasa Indonesia" },
    { "code": "ga", "label": "Irish", "name": "Gaeilge" },
    { "code": "it", "label": "Italian", "name": "Italiano" },
    { "code": "ja", "label": "Japanese", "name": "日本語" },
    { "code": "jv", "label": "Javanese", "name": "ꦧꦱꦗꦮ" },
    { "code": "kn", "label": "Kannada", "name": "ಕನ್ನಡ" },
    { "code": "kk", "label": "Kazakh", "name": "Қазақша" },
    { "code": "km", "label": "Khmer", "name": "ភាសាខ្មែរ" },
    { "code": "rw", "label": "Kinyarwanda", "name": "Kinyarwanda" },
    { "code": "ko", "label": "Korean", "name": "한국어" },
    { "code": "ky", "label": "Kyrgyz", "name": "Кыргызча" },
    { "code": "lo", "label": "Lao", "name": "ລາວ" },
    { "code": "lv", "label": "Latvian", "name": "Latviešu" },
    { "code": "lt", "label": "Lithuanian", "name": "Lietuvių" },
    { "code": "lb", "label": "Luxembourgish", "name": "Lëtzebuergesch" },
    { "code": "mk", "label": "Macedonian", "name": "Македонски" },
    { "code": "mg", "label": "Malagasy", "name": "Malagasy" },
    { "code": "ms", "label": "Malay", "name": "Bahasa Melayu" },
    { "code": "ml", "label": "Malayalam", "name": "മലയാളം" },
    { "code": "mt", "label": "Maltese", "name": "Malti" },
    { "code": "mr", "label": "Marathi", "name": "मराठी" },
    { "code": "mn", "label": "Mongolian", "name": "Монгол" },
    { "code": "ne", "label": "Nepali", "name": "नेपाली" },
    { "code": "no", "label": "Norwegian", "name": "Norsk" },
    { "code": "or", "label": "Odia", "name": "ଓଡ଼ିଆ" },
    { "code": "ps", "label": "Pashto", "name": "پښتو" },
    { "code": "pl", "label": "Polish", "name": "Polski" },
    { "code": "pt", "label": "Portuguese", "name": "Português" },
    { "code": "pa", "label": "Punjabi", "name": "ਪੰਜਾਬੀ" },
    { "code": "ro", "label": "Romanian", "name": "Română" },
    { "code": "ru", "label": "Russian", "name": "Русский" },
    { "code": "sa", "label": "Sanskrit", "name": "संस्कृतम्" },
    { "code": "gd", "label": "Scottish Gaelic", "name": "Gàidhlig" },
    { "code": "sr", "label": "Serbian", "name": "Српски" },
    { "code": "sn", "label": "Shona", "name": "Shona" },
    { "code": "sd", "label": "Sindhi", "name": "سنڌي" },
    { "code": "si", "label": "Sinhala", "name": "සිංහල" },
    { "code": "sk", "label": "Slovak", "name": "Slovenčina" },
    { "code": "sl", "label": "Slovenian", "name": "Slovenščina" },
    { "code": "st", "label": "Southern Sotho", "name": "Sesotho" },
    { "code": "es", "label": "Spanish", "name": "Español" },
    { "code": "sv", "label": "Swedish", "name": "Svenska" },
    { "code": "tg", "label": "Tajik", "name": "Тоҷикӣ" },
    { "code": "ta", "label": "Tamil", "name": "தமிழ்" },
    { "code": "tt", "label": "Tatar", "name": "Татарча" },
    { "code": "te", "label": "Telugu", "name": "తెలుగు" },
    { "code": "th", "label": "Thai", "name": "ไทย" },
    { "code": "bo", "label": "Tibetan", "name": "བོད་ཡིག" },
    { "code": "ts", "label": "Tsonga", "name": "Xitsonga" },
    { "code": "tn", "label": "Tswana", "name": "Setswana" },
    { "code": "tr", "label": "Turkish", "name": "Türkçe" },
    { "code": "tk", "label": "Turkmen", "name": "Türkmençe" },
    { "code": "ug", "label": "Uighur", "name": "ئۇيغۇرچە" },
    { "code": "uk", "label": "Ukrainian", "name": "Українська" },
    { "code": "ur", "label": "Urdu", "name": "اردو" },
    { "code": "uz", "label": "Uzbek", "name": "Oʻzbekcha" },
    { "code": "ve", "label": "Venda", "name": "Tshivenda" },
    { "code": "vi", "label": "Vietnamese", "name": "Tiếng Việt" },
    { "code": "cy", "label": "Welsh", "name": "Cymraeg" },
    { "code": "xh", "label": "Xhosa", "name": "isiXhosa" },
    { "code": "yi", "label": "Yiddish", "name": "ייִדיש" },
    { "code": "yo", "label": "Yoruba", "name": "Yorùbá" },
    { "code": "zu", "label": "Zulu", "name": "isiZulu"  }
]
```

Let's create language switcher component now

```typescript
// <root-directory>/src/Components/Local/LanguageSwitcher.tsx
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useLanguage } from '../../Contexts';
import supportedLanguages from '../../Static/Language.json';
import i18n from '../../Local/i18n';

import * as availableLanguage from '../../Local/languages/index';

const arrAvailableLanguages = Object.keys(availableLanguage);

/**
 * Represents the properties of a language.
 */
interface ILanguage {
  code: string;
  label: string;
  name: string;
}

/**
 * Represents the properties for the LanguageSwitcher component.
 */
interface ILanguageSwitcher {
  // Additional props, if any
}

/**
 * LanguageSwitcher component for changing the application language.
 * @component
 * @example
 * // Usage of LanguageSwitcher component
 * <LanguageSwitcher />
 */
const LanguageSwitcher: React.FC<ILanguageSwitcher> = () => {

  const { language, changeLanguage } = useLanguage();

  const [ availableLanguage, setAvailableLanguage ] = useState<ILanguage[]>([]);

  useEffect(()=>{
    let temp = supportedLanguages.filter((l: ILanguage) => arrAvailableLanguages.includes(l.code) )
    setAvailableLanguage(temp);
  },[])

  /**
   * Handles the change of language.
   * @param {string} newLanguage - The selected language code.
   * @returns {void}
   */
  const handleLanguageChange = (newLanguage: string): void => {
    changeLanguage(newLanguage);
  };

  return (
    <div>
      <p>Current Language: { availableLanguage.find((l: ILanguage) => l.code === i18n.language )?.label }</p>
      <label>
        <div>Select Language:</div>
        <select
            value={language}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => handleLanguageChange(e.target.value)}
        >
            {availableLanguage.map((lang: ILanguage, index: number) => (
                <option key={lang.code} value={lang.code} selected={language===lang.code}>
                    {lang.label} ({lang?.name})
                </option>
            ))}
        </select>
      </label>
    </div>
  );
};

export default LanguageSwitcher;

```

now following is the example code to use translation in the project.

```typescript
// Example usage
import React from 'react';
import i18n from "./Local/i18n.tsx"; // relative path of src/Local/i18n.tsx file

const ExampleComponent = () => {
    const { t } = i18n

    return (
        <>{t('hello')}</>
    )
}

export default ExampleComponent;
```

output of the component will be based on selected language.

```text
// output when english language is selected or when selected language or its translation text is missing

hello

// output for hindi language is selected and its translation is available. if translation is not available, you will see english text by default

नमस्ते
```

to change language use following code and pass the language code in it.

```typescript
i18n.changeLanguage('en-US');
```

## Adding language support to route (Optional)

Create a file called `LocalRouter.tsx` in `<project-root>/src/Routes` folder

```typescript
// <project-root>/src/Routes/LocalRouter.tsx
import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { AppRouter } from ".";
import { useLanguage } from "../Contexts";
import * as availableTranslationLanguage from "../Local/languages"

const LocalRouter = () => {

    let { language } = useLanguage();
    
    const navigate = useNavigate();
    const location = useLocation();

    // check and append language component to the route
    useEffect(()=>{
        let availableLanguage = Object.keys(availableTranslationLanguage);
        let path = location?.pathname;          // get the path
        let arrUrlParts = (path).split('/');    // splitting the path
        let langPart = arrUrlParts[1];          // language part

        if( !availableLanguage.includes(langPart) ) { // if language string is missing
            navigate(`/${language}${path}`);
        } else if( !availableLanguage.includes(langPart) && langPart!==language ) { // if language string is present but incorrect
            navigate(`/${language}${path.substring(3)}`);
        } else {
            // everything is fine
        }
    },[])
    

    return (
        <Routes>
            <Route path="/" element={<Navigate replace to={`/${language}/`} />} />
            <Route path="/:lang/*" element={<AppRouter />} />
            <Route path="/*" element={<>404</>} />
        </Routes>
    )
}

export default LocalRouter;
```

add the entry of newly created `LocalRouter.tsx` file to `<project-root>/src/Routes/index.tsx` file shown below

```typescript
// <project-root>/src/Routes/index.tsx
export { default as LocalRouter } from './LocalRouter';
export { default as AppRouter } from './AppRouter';
export { default as AuthRouter } from './Auth/AuthRouter';
export { default as DashboardRouter } from './Dashboard/DashboardRouter';
```

modify `AppRouter.tsx` file and remove `<BrowserRouter>` and move it to `<project-root>/src/index.tsx` file showing below.

```typescript
// <project-root>/src/Routes/AppRouter.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthRouter, DashboardRouter } from "../Routes";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<>HOME</>} />
            <Route path="/auth/*" element={<AuthRouter />} />
            <Route path="/dashboard/*" element={<DashboardRouter />} />
            <Route path="/*" element={<>404</>} />
        </Routes>
    );
};

export default AppRouter;
```

and following is updated content of `<project-root>/src/index.tsx` file

```typescript
// <project-root>/src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import i18n from './Local/i18n';
import { I18nextProvider } from 'react-i18next';
import { LanguageProvider } from './Contexts';
import { BrowserRouter } from 'react-router-dom';
import { LocalRouter } from './Routes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n} defaultNS={'translation'}>
      <LanguageProvider>
        <BrowserRouter>
          <LocalRouter />
        </BrowserRouter>
      </LanguageProvider>
    </I18nextProvider>
  </React.StrictMode>
);
```

## Theming the project

### Tailwind support

install and initiate tailwind

```bash
npm install -D tailwindcss
npx tailwindcss init
```

add add the paths to all of your template files in your `tailwind.config.js` file.

```typescript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,md,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

finally add the @tailwind directives for each of Tailwind's layers to your `/src/index.css` file.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Dark and Light Scheme

add meta color-scheme tag in `index.html` file in public folder.

```html
<!-- public/index.html -->
<head>
  <meta name="color-scheme" content="dark light">
</head>
```

add style code to `index.css` file

```css
/* <project-root>/src/index.css */
:root {
  --background-light: #f0f0f0;
  --text-light: #333;

  --background-dark: #333;
  --text-dark: #f0f0f0;
}

:root.meta-dark {
  --background-color: var(--background-dark);
  --text-color: var(--text-dark);
}

@media (prefers-color-scheme: dark) {
  :root:not(.meta-dark) {
    --background-color: var(--background-light);
    --text-color: var(--text-light);
  }
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--background-light);
  color: var(--text-light);
}

body {
  background-color: var(--background-color);
  color: var(--text-color);
}
```

now create `SchemeContect.tsx` file

```typescript
// <project-root>/src/Contexts/SchemeContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

/**
 * Type representing the color scheme of the application.
 */
export type Scheme = 'light' | 'dark';

/**
 * Props for the SchemeContextProvider component.
 */
interface ISchemeContext {
  scheme: Scheme;
  toggleScheme: () => void;
}

/**
 * Context for managing the color scheme of the application.
 */
const SchemeContext = createContext<ISchemeContext | undefined>(undefined);

/**
 * Props for the SchemeProvider component.
 */
interface ISchemeProvider {
    children: ReactNode | ReactNode[];
}

/**
 * Provides the color scheme context to the application.
 * @param children - The children components that will have access to the color scheme context.
 */
export const SchemeProvider: React.FC<ISchemeProvider> = ({ children }) => {
  const [scheme, setScheme] = useState<Scheme>('light');
  const metaTag = document.querySelector('meta[name="color-scheme"]');

  useEffect(() => {
    const systemScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    setScheme(systemScheme);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      setScheme(e.matches ? 'dark' : 'light');
      document.documentElement.classList.toggle('meta-dark', e.matches);
      if (metaTag) {
          metaTag.setAttribute('content', systemScheme);
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    // Update the meta tag content
    document.documentElement.classList.toggle('meta-dark', systemScheme === 'dark');
    if (metaTag) {
      metaTag.setAttribute('content', systemScheme);
    }

    return () => {
      mediaQuery.addEventListener('change', handleSystemThemeChange);
    };
  }, []);

  /**
   * Toggles the color scheme between light and dark.
   */
  const toggleScheme = () => {
    const newScheme = scheme === 'light' ? 'dark' : 'light';
    setScheme(newScheme);
    document.documentElement.classList.toggle('meta-dark', newScheme === 'dark');
    // Update the meta tag content
    const metaTag = document.querySelector('meta[name="color-scheme"]');
    if (metaTag) {
      metaTag.setAttribute('content', newScheme);
    }
  };

  return (
    <SchemeContext.Provider value={{ scheme, toggleScheme }}>
      {children}
    </SchemeContext.Provider>
  );
};

/**
 * Hook to access the color scheme context.
 * @returns The current color scheme and the toggle function.
 * @throws An error if used outside of a SchemeProvider.
 */
export const useScheme = (): ISchemeContext => {
  const context = useContext(SchemeContext);
  if (!context) {
    throw new Error('useScheme must be used within a SchemeProvider');
  }
  return context;
};

```

add entry of `SchemeContect.tsx` in `<project-root>/src/Contexts/index.tsx` file

```typescript
// <project-root>/src/Contexts/index.tsx
export { SchemeProvider, useScheme  } from './SchemeContext';
```

now wrap the main component in `src/index.tsx` file with SchemeProvider.

```typescript
// <project-root>/src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import i18n from './Local/i18n';
import { I18nextProvider } from 'react-i18next';
import { LanguageProvider, SchemeProvider } from './Contexts';
import { BrowserRouter } from 'react-router-dom';
import { LocalRouter } from './Routes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n} defaultNS={'translation'}>
      <LanguageProvider>
        <BrowserRouter>
          <SchemeProvider>
            <LocalRouter />
          </SchemeProvider>
        </BrowserRouter>
      </LanguageProvider>
    </I18nextProvider>
  </React.StrictMode>
);
```

#### How scheme switcher will work?

There are two way, one when system theme will change, it will change scheme accordingly. another way is by changing scheme manually and for this following is an example component SchemeSwitcher.tsx

```typescript
// <project-root>/src/Components/SchemeSwitcher.tsx
import React from "react";
import { useScheme } from "../Contexts";

const SchemeSwitcher:React.FC = () => {
    const { scheme, toggleScheme } = useScheme();
    
    return (
        <div className={`app ${scheme}`}>
            <h1>Responsive Theme Switcher</h1>
            <p>Current Theme: {scheme}</p>
            <button onClick={toggleScheme}>Toggle Theme</button>
        </div>
    )
}

export default SchemeSwitcher;
```

### Theme colors

Theme color setup happen in such a way that it will effect application on real time. There are two options set one via predefined colors another is via real time change or via pre defined settings.

Now, create file and folder structure as shown below.

```text
📁 <project-root>
└📁 src
  ├📄 index.tsx <-- already exists
  ├📁 Components
  │  └📄 ThemeSwitcher.tsx
  ├📁 Contexts
  │     ├📄 index.tsx <== already exists
  │     └📄 ThemeContext.tsx
  └📁 Static
     └📄 Theme.json
```

Following are the content of the files

```typescript
// <project-root>/src/Contexts/ThemeContext.tsx

import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode, useRef } from 'react';

/**
 * Interface defining the shape of the theme.
 * @typedef {Object} Theme
 * @property {string} primaryColor - The primary theme color.
 * @property {string} secondaryColor - The secondary theme color.
 */
interface Theme {
  primaryColor: string;
  secondaryColor: string;
  // Add more theme variables as needed
}

/**
 * Initial theme values.
 */
const interfaceColorTheme: Theme = {
  primaryColor: '#3490dc',
  secondaryColor: '#ffed4a',
  // Initialize more theme variables with default values
};

/**
 * Type defining the shape of the context value for the theme.
 * @typedef {Object} ThemeContextType
 * @property {Theme} theme - Theme values
 * @property {React.Dispatch<React.SetStateAction<Theme>>} setTheme
 */
interface ThemeContextType {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

/**
 * Context for managing the theme.
 * @type {React.Context<ThemeContextType | undefined>}
 */
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Props for the ThemeProvider component.
 * @typedef {Object} ThemeProviderProps
 * @property {ReactNode} children - Child components to be wrapped by the ThemeProviderProps.
 */
interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * ThemeProvider component to manage the theme context.
 * @param {ThemeProviderProps} props - The component props.
 * @returns {React.FC} - The ThemeProvider component.
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  /**
   * State to manage the current theme.
   */
  const [theme, setTheme] = useState<Theme>(interfaceColorTheme);

  /**
   * Memoized context value to avoid unnecessary re-renders.
   */
  const memoizedValue = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  /**
   * Memoized style tag string with dynamic CSS variables.
   */
  const styleTag = useMemo(() => {
    return `
      :root {
        --primary-color: ${theme.primaryColor};
        --secondary-color: ${theme.secondaryColor};
        // Add more CSS variables as needed
      }
      .bg-custom-primary {
        background-color: var(--primary-color)
      }
      .text-custom-primary {
        color: var(--primary-color)
      }
      .bg-custom-secondary {
        background-color: var(--secondary-color)
      }
      .text-custom-secondary {
        color: var(--secondary-color)
      }
      // you may add more classes to be use while developing actual theme
    `;
  }, [theme]);

  /**
   * Ref to track whether the style tag has been added.
   */
  const styleTagAdded = useRef<boolean>(false);

  /**
   * Effect to update the style tag in the index.html dynamically.
   */
  useEffect(() => {
    if (!styleTagAdded.current) {
      const newStyleTag = document.createElement('style');
      newStyleTag.id = 'global-theme-style';
      newStyleTag.innerHTML = styleTag;
      document.head.appendChild(newStyleTag);
      styleTagAdded.current = true;
    } else {
      const existingStyleTag = document.getElementById('global-theme-style');
      if (existingStyleTag) {
        existingStyleTag.innerHTML = styleTag;
      }
    }
  }, [styleTag]);

  return (
    <ThemeContext.Provider value={memoizedValue}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Custom hook for using the theme context.
 * @returns {ThemeContextType} - The context value for the theme.
 * @throws {Error} - Throws an error if used outside a ThemeProvider.
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};

```

```typescript
// <project-root>/src/Contexts/index.tsx
...
export { ThemeContext, ThemeProvider, useTheme } from './ThemeContext';
```

```json
// <project-root>/src/Static/Theme.json
[
    {
        "name": "Theme 1",
        "colors": {
            "primary": "#02343F",
            "secondary": "#F0EDCC"
        }
    },
    {
        "name": "Theme 2",
        "colors": {
            "primary": "#331B3F",
            "secondary": "#ACC7B4"
        }
    },
    {
        "name": "Theme 3",
        "colors": {
            "primary": "#07553B",
            "secondary": "#CED46A"
        }
    }
]
```

```typescript
// <project-root>/src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import i18n from './Local/i18n';
import { I18nextProvider } from 'react-i18next';
import { LanguageProvider, SchemeProvider, ThemeProvider } from './Contexts';
import { BrowserRouter } from 'react-router-dom';
import { LocalRouter } from './Routes';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n} defaultNS={'translation'}>
      <LanguageProvider>
        <BrowserRouter>
          <SchemeProvider>
            <ThemeProvider>
              <LocalRouter />
            </ThemeProvider>
          </SchemeProvider>
        </BrowserRouter>
      </LanguageProvider>
    </I18nextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

and here is the example component to change theme

```typescript
// <project-root>/src/Components/ThemeSwitcher.tsx
import React from "react";
import { useTheme } from "../Contexts";
import predefinedThemes from "../Static/Theme.json"

const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();

    return (
        <div className="bg-custom-primary text-custom-secondary">
            <div className="flex gap-4">
                <button
                    className="border border-gray-500 px-4 py-1 rounded-full"
                    onClick={()=>{
                        let currentTheme = predefinedThemes.find( t => t.name === 'Theme 1' )
                        setTheme(()=>{
                            return {
                                primaryColor: currentTheme?.colors?.primary || '',
                                secondaryColor: currentTheme?.colors?.secondary || ''
                            }
                        })
                    }}
                >
                    Theme1
                </button>
                <button
                    className="border border-gray-500 px-4 py-1 rounded-full"
                    onClick={()=>{
                        let currentTheme = predefinedThemes.find( t => t.name === 'Theme 2' )
                        setTheme(()=>{
                            return {
                                primaryColor: currentTheme?.colors?.primary || '',
                                secondaryColor: currentTheme?.colors?.secondary || ''
                            }
                        })
                    }}
                >
                    Theme2
                </button>
                <button
                    className="border border-gray-500 px-4 py-1 rounded-full"
                    onClick={()=>{
                        let currentTheme = predefinedThemes.find( t => t.name === 'Theme 3' )
                        setTheme(()=>{
                            return {
                                primaryColor: currentTheme?.colors?.primary || '',
                                secondaryColor: currentTheme?.colors?.secondary || ''
                            }
                        })
                    }}
                >
                    Theme3
                </button>
            </div>
            <div className="flex gap-2">
                <label>
                    <div className="text-lg font-medium">Select Primary Color:</div>
                    <div className="flex items-center border border-gray-500 w-fit bg-slate-100 px-2 rounded-md">
                        <input 
                            type="text"
                            value={theme.primaryColor}
                            className="bg-slate-100 h-8 outline-none uppercase text-custom-primary"
                            readOnly
                        />
                        <input 
                            type="color"
                            value={theme.primaryColor}
                            onChange={(e)=>{
                                setTheme((prevTheme)=>{
                                    return {
                                        ...prevTheme,
                                        primaryColor: e.target.value
                                    }
                                })
                            }}
                            className="w-6"
                        />
                    </div>
                </label>
                <label>
                    <div className="text-lg font-medium">Select Secondary Color:</div>
                    <div className="flex items-center border border-gray-500 w-fit bg-slate-100 px-2 rounded-md">
                        <input 
                            type="text"
                            value={theme.secondaryColor}
                            className="bg-slate-100 h-8 outline-none uppercase text-custom-secondary"
                            readOnly
                        />
                        <input 
                            type="color"
                            value={theme.secondaryColor}
                            onChange={(e)=>{
                                setTheme((prevTheme)=>{
                                    return {
                                        ...prevTheme,
                                        secondaryColor: e.target.value
                                    }
                                })
                            }}
                            className="w-6"
                        />
                    </div>
                </label>
            </div>
        </div>
    )
}

export default ThemeSwitcher;
```

## References

- [How To Automatically Generate A Helpful Changelog From Your Git Commit Messages](https://mokkapps.de/blog/how-to-automatically-generate-a-helpful-changelog-from-your-git-commit-messages)
- [React-i18next documentation](https://react.i18next.com/)
