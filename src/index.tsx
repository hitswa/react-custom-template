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
