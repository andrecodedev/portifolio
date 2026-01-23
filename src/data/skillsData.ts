import htmlIcon from '../img/skills/html.svg';
import cssIcon from '../img/skills/css.svg';
import javascriptIcon from '../img/skills/javascript.svg';
import typescriptIcon from '../img/skills/typescript.svg';
import javaIcon from '../img/skills/java.svg';
import sqlIcon from '../img/skills/sql.svg';
import gitIcon from '../img/skills/git.svg';
import reactIcon from '../img/skills/react.svg';
import nodeJsIcon from '../img/skills/nodejs.svg';
import AIStudioGoogleIcon from '../img/skills/AIStudioGoogle.svg';
import tailwindIcon from '../img/skills/tailwind.svg';
import figmaIcon from '../img/skills/figma.svg';
import postmanIcon from '../img/skills/postman.svg';
import trelloIcon from '../img/skills/trello.svg';
import jiraIcon from '../img/skills/jira.svg';
import officeIcon from '../img/skills/office.svg';
import canvaIcon from '../img/skills/canva.svg';
import gimpIcon from '../img/skills/gimp.svg';
import chatgptIcon from '../img/skills/chatgpt.svg';
import geminiIcon from '../img/skills/gemini.svg';
import gitHubCopilotIcon from '../img/skills/gitHubCopilot.svg';
import scrumIcon from '../img/skills/scrum.svg';
import kanbanIcon from '../img/skills/kanban.svg';
import bootstrapIcon from '../img/skills/bootstrap.svg';
import sqlServerIcon from '../img/skills/sqlServer.svg';
import mysqlIcon from '../img/skills/mysql.svg';
import portuguesIcon from '../img/skills/portugues.svg';
import euaIcon from '../img/skills/eua.svg';
import spanishIcon from '../img/skills/spanish.svg';
import vscodeIcon from '../img/skills/vscode.svg';
import visualstudyIcon from '../img/skills/visualstudy.svg';
import eclipseIcon from '../img/skills/eclipse.svg';
import intellijIcon from '../img/skills/intellij.svg';
import clickupIcon from '../img/skills/ClickUp.svg';
import cIcon from '../img/skills/c.svg';
import cmaismaisIcon from '../img/skills/c++.svg';
import sassIcon from '../img/skills/sass.svg';
import netbeensIcon from '../img/skills/netbeens.svg';
import arduinoIcon from '../img/skills/arduino.svg';
import csharpIcon from '../img/skills/csharp.svg';
import antigravityIcon from '../img/skills/antigravity.svg';
import fileZillaIcon from '../img/skills/FileZilla.svg';
import twigIcon from '../img/skills/Twig.svg';
import nuvemshopIcon from '../img/skills/nuvemshop.svg';

export interface Skill {
  name: string;
  icon: string;
  category: string;
}

export const skillsData: Skill[] = [
  // Linguagens
  { name: 'HTML5', icon: htmlIcon, category: 'linguagens' },
  { name: 'CSS3', icon: cssIcon, category: 'linguagens' },
  { name: 'JavaScript', icon: javascriptIcon, category: 'linguagens' },
  { name: 'TypeScript', icon: typescriptIcon, category: 'linguagens' },
  { name: 'Java', icon: javaIcon, category: 'linguagens' },
  { name: 'C', icon: cIcon, category: 'linguagens' },
  { name: 'C++', icon: cmaismaisIcon, category: 'linguagens' },
  { name: 'C#', icon: csharpIcon, category: 'linguagens' },
  { name: 'SQL', icon: sqlIcon, category: 'linguagens' },
  { name: 'Twig', icon: twigIcon, category: 'linguagens' },

  // Frameworks
  { name: 'React', icon: reactIcon, category: 'frameworks' },
  { name: 'Nodejs', icon: nodeJsIcon, category: 'frameworks' },
  { name: 'Tailwind CSS', icon: tailwindIcon, category: 'frameworks' },
  { name: 'Bootstrap', icon: bootstrapIcon, category: 'frameworks' },
  { name: 'Sass', icon: sassIcon, category: 'frameworks' },

  // Ferramentas
  { name: 'Git', icon: gitIcon, category: 'ferramentas' },
  { name: 'GitHub Copilot', icon: gitHubCopilotIcon, category: 'ias' },
  { name: 'Figma', icon: figmaIcon, category: 'ferramentas' },
  { name: 'Postman', icon: postmanIcon, category: 'ferramentas' },
  { name: 'Trello', icon: trelloIcon, category: 'ferramentas' },
  { name: 'Jira', icon: jiraIcon, category: 'ferramentas' },
  { name: 'Office', icon: officeIcon, category: 'ferramentas' },
  { name: 'Canva', icon: canvaIcon, category: 'ferramentas' },
  { name: 'GIMP', icon: gimpIcon, category: 'ferramentas' },
  { name: 'Arduino', icon: arduinoIcon, category: 'ferramentas' },
  { name: 'AI Studio Google', icon: AIStudioGoogleIcon, category: 'ias' },
  { name: 'FileZilla', icon: fileZillaIcon, category: 'ferramentas' },
  { name: 'ClickUp', icon: clickupIcon, category: 'ferramentas' },
  { name: 'Nuvemshop', icon: nuvemshopIcon, category: 'ferramentas' },

  // IDEs
  { name: 'VSCode', icon: vscodeIcon, category: 'ides' },
  { name: 'Visual Studio', icon: visualstudyIcon, category: 'ides' },
  { name: 'Eclipse', icon: eclipseIcon, category: 'ides' },
  { name: 'IntelliJ', icon: intellijIcon, category: 'ides' },
  { name: 'NetBeans', icon: netbeensIcon, category: 'ides' },
  { name: 'Antigravity', icon: antigravityIcon, category: 'ides' },

  // Metodologias
  { name: 'Scrum', icon: scrumIcon, category: 'metodologias' },
  { name: 'Kanban', icon: kanbanIcon, category: 'metodologias' },

  // Banco de Dados
  { name: 'MySQL', icon: mysqlIcon, category: 'banco-dados' },
  { name: 'SQL Server', icon: sqlServerIcon, category: 'banco-dados' },

  // Idiomas
  { name: 'Português', icon: portuguesIcon, category: 'idioma' },
  { name: 'Inglês (EUA)', icon: euaIcon, category: 'idioma' },
  { name: 'Espanhol', icon: spanishIcon, category: 'idioma' },

  // IAs
  { name: 'ChatGPT', icon: chatgptIcon, category: 'ias' },
  { name: 'Gemini', icon: geminiIcon, category: 'ias' },
];

export const allSkills = skillsData;

export const getSkillName = (iconPath: string): string => {
  const skill = allSkills.find(s => s.icon === iconPath);
  return skill ? skill.name : '';
};

export default skillsData;
