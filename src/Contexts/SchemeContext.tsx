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
