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
