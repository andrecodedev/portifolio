import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Importe a configuração do i18n que acabamos de criar
import './i18n';
import { applyTheme, getSavedTheme } from './utils/theme';

applyTheme(getSavedTheme());

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <App />
  </StrictMode>
);