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