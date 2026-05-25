const fs = require('fs');

const adminPt = {
  auth: {
    title: "Painel Restrito",
    subtitle: "Acesso exclusivo para o administrador",
    email: "Email",
    password: "Senha",
    submit: "Entrar no Cofre",
    error: "Credenciais inválidas. Tente novamente.",
    back: "Voltar ao Portfólio"
  },
  dashboard: {
    title: "Painel de Controle",
    subtitle: "Custom CMS Headless",
    logout: "Sair do Painel",
    modules: "Módulos do Site",
    hero_title: "Hero Section",
    hero_desc: "Título e subtítulo da página inicial",
    about_title: "About",
    soon: "EM BREVE",
    about_desc: "Biografia e foto de perfil",
    skills_title: "Skills",
    skills_desc: "Linguagens e ferramentas",
    waiting: "AGUARDANDO SELEÇÃO...",
    empty_title: "Selecione um Módulo",
    empty_desc: "Escolha uma seção no menu lateral esquerdo para visualizar e editar o conteúdo em tempo real.",
    back: "< VOLTAR",
    edit_hero: "Editar Hero",
    publish: "Publicar",
    tab_pt: "PORTUGUÊS (PT-BR)",
    tab_en: "INGLÊS (EN)",
    tab_es: "ESPANHOL (ES)",
    input_title: "TÍTULO DA INTRO",
    input_desc: "SUB-DESCRIÇÃO",
    preview_badge: "PREVIEW EM TEMPO REAL (LIVE STATE)",
    logout_title: "Deseja fechar o cofre?",
    logout_desc: "Sua sessão atual será encerrada e você precisará fazer login novamente.",
    cancel: "Cancelar",
    confirm_logout: "Sim, deslogar"
  }
};

const adminEn = {
  auth: {
    title: "Restricted Panel",
    subtitle: "Exclusive access for the administrator",
    email: "Email",
    password: "Password",
    submit: "Enter the Vault",
    error: "Invalid credentials. Try again.",
    back: "Back to Portfolio"
  },
  dashboard: {
    title: "Control Panel",
    subtitle: "Custom CMS Headless",
    logout: "Logout",
    modules: "Site Modules",
    hero_title: "Hero Section",
    hero_desc: "Home page title and subtitle",
    about_title: "About",
    soon: "SOON",
    about_desc: "Biography and profile picture",
    skills_title: "Skills",
    skills_desc: "Languages and tools",
    waiting: "WAITING FOR SELECTION...",
    empty_title: "Select a Module",
    empty_desc: "Choose a section in the left sidebar to view and edit content in real time.",
    back: "< BACK",
    edit_hero: "Edit Hero",
    publish: "Publish",
    tab_pt: "PORTUGUESE (PT-BR)",
    tab_en: "ENGLISH (EN)",
    tab_es: "SPANISH (ES)",
    input_title: "INTRO TITLE",
    input_desc: "SUB-DESCRIPTION",
    preview_badge: "REAL-TIME PREVIEW (LIVE STATE)",
    logout_title: "Close the vault?",
    logout_desc: "Your current session will be terminated and you will need to login again.",
    cancel: "Cancel",
    confirm_logout: "Yes, logout"
  }
};

const adminEs = {
  auth: {
    title: "Panel Restringido",
    subtitle: "Acceso exclusivo para el administrador",
    email: "Email",
    password: "Contraseña",
    submit: "Entrar a la Bóveda",
    error: "Credenciales inválidas. Inténtelo de nuevo.",
    back: "Volver al Portafolio"
  },
  dashboard: {
    title: "Panel de Control",
    subtitle: "Custom CMS Headless",
    logout: "Cerrar Sesión",
    modules: "Módulos del Sitio",
    hero_title: "Hero Section",
    hero_desc: "Título y subtítulo de la página de inicio",
    about_title: "About",
    soon: "PRONTO",
    about_desc: "Biografía y foto de perfil",
    skills_title: "Skills",
    skills_desc: "Lenguajes y herramientas",
    waiting: "ESPERANDO SELECCIÓN...",
    empty_title: "Seleccione un Módulo",
    empty_desc: "Elija una sección en el menú izquierdo para ver y editar el contenido en tiempo real.",
    back: "< VOLVER",
    edit_hero: "Editar Hero",
    publish: "Publicar",
    tab_pt: "PORTUGUÉS (PT-BR)",
    tab_en: "INGLÉS (EN)",
    tab_es: "ESPAÑOL (ES)",
    input_title: "TÍTULO DE LA INTRO",
    input_desc: "SUB-DESCRIPCIÓN",
    preview_badge: "VISTA PREVIA EN TIEMPO REAL (LIVE STATE)",
    logout_title: "¿Desea cerrar la bóveda?",
    logout_desc: "Su sesión actual terminará y deberá iniciar sesión nuevamente.",
    cancel: "Cancelar",
    confirm_logout: "Sí, cerrar sesión"
  }
};

function updateFile(path, adminData) {
  const data = JSON.parse(fs.readFileSync(path, 'utf8'));
  data.admin = adminData;
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
  console.log(`Updated ${path}`);
}

updateFile('./public/locales/pt/translation.json', adminPt);
updateFile('./public/locales/en/translation.json', adminEn);
updateFile('./public/locales/es/translation.json', adminEs);

