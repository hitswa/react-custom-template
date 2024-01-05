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

## References

- [How To Automatically Generate A Helpful Changelog From Your Git Commit Messages](https://mokkapps.de/blog/how-to-automatically-generate-a-helpful-changelog-from-your-git-commit-messages)
- [React-i18next documentation](https://react.i18next.com/)
