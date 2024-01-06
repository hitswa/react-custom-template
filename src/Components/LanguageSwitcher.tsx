import React, { ChangeEvent, useEffect, useState } from 'react';
import { useLanguage } from '../Contexts';
import supportedLanguages from '../Static/Language.json';
import i18n from '../Local/i18n';

import * as availableLanguage from '../Local/languages/index';

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
