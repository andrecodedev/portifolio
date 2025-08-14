import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Importe a configuração do i18n que acabamos de criar
import './i18n';

// APLICA O TEMA SALVO NO LOCALSTORAGE ANTES DE MONTAR O APP
const savedTheme = localStorage.getItem('theme');
const isDark = savedTheme ? savedTheme === 'dark' : true;
document.body.className = isDark ? 'dark-theme' : 'light-theme';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <App />
  </StrictMode>
);