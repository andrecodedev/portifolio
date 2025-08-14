import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend) // Carrega traduções de um servidor (nossa pasta public)
  .use(LanguageDetector) // Detecta o idioma do usuário
  .use(initReactI18next) // Integra com o React
  .init({
    fallbackLng: 'pt', // Idioma padrão se a detecção falhar
    debug: true, // Mostra logs no console para ajudar a depurar
    interpolation: {
      escapeValue: false, // O React já protege contra XSS
    },
    backend: {
      // Caminho para encontrar nossos arquivos de tradução
      loadPath: '/locales/{{lng}}/translation.json',
    },
  });

export default i18n;