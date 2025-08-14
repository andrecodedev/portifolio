import { useEffect, useRef } from 'react';

import htmlIcon from '../img/skills/html.svg';
import cssIcon from '../img/skills/css.svg';
import javascriptIcon from '../img/skills/javascript.svg';
import javaIcon from '../img/skills/java.svg';
import sqlIcon from '../img/skills/sql.svg';
import gitIcon from '../img/skills/git.svg';
import reactIcon from '../img/skills/react.svg';
import nodeJsIcon from '../img/skills/nodejs.svg'; 
import AIStudioGoogleIcon from '../img/skills/AIStudioGoogle.svg'; 
import tailwindIcon from '../img/skills/tailwind.svg'; 
import typescriptIcon from '../img/skills/typescript.svg'; 
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

import cIcon from '../img/skills/c.svg';
import cmaismaisIcon from '../img/skills/c++.svg';
import sassIcon from '../img/skills/sass.svg';
import netbeensIcon from '../img/skills/netbeens.svg';
import arduinoIcon from '../img/skills/arduino.svg';
import csharpIcon from '../img/skills/csharp.svg';    

// Agrupando por categoria

const languages = [
  { name: 'HTML5', icon: htmlIcon },
  { name: 'CSS3', icon: cssIcon },
  { name: 'JavaScript', icon: javascriptIcon },
  { name: 'TypeScript', icon: typescriptIcon },
  { name: 'Java', icon: javaIcon },
  { name: 'C', icon: cIcon },
  { name: 'C++', icon: cmaismaisIcon },
  { name: 'C#', icon: csharpIcon },
  { name: 'SQL', icon: sqlIcon },
];

const frameworksAndLibs = [
  { name: 'React', icon: reactIcon },
  { name: 'Nodejs', icon: nodeJsIcon },
  { name: 'Tailwind CSS', icon: tailwindIcon },
  { name: 'Bootstrap', icon: bootstrapIcon },
  { name: 'Sass', icon: sassIcon },
];

const tools = [
  { name: 'Git', icon: gitIcon },
  { name: 'GitHub Copilot', icon: gitHubCopilotIcon },
  { name: 'Figma', icon: figmaIcon },
  { name: 'Postman', icon: postmanIcon },
  { name: 'Trello', icon: trelloIcon },
  { name: 'Jira', icon: jiraIcon },
  { name: 'Office', icon: officeIcon },
  { name: 'Canva', icon: canvaIcon },
  { name: 'GIMP', icon: gimpIcon },
  { name: 'VSCode', icon: vscodeIcon },
  { name: 'Visual Studio', icon: visualstudyIcon },
  { name: 'Eclipse', icon: eclipseIcon },
  { name: 'IntelliJ', icon: intellijIcon },
  { name: 'NetBeans', icon: netbeensIcon },
  { name: 'Arduino', icon: arduinoIcon },
  { name: 'AI Studio Google', icon: AIStudioGoogleIcon },
];

const methodologies = [
  { name: 'Scrum', icon: scrumIcon },
  { name: 'Kanban', icon: kanbanIcon },
];

const databases = [
  { name: 'MySQL', icon: mysqlIcon },
  { name: 'SQL Server', icon: sqlServerIcon },
];

const languagesSpoken = [
  { name: 'Português', icon: portuguesIcon },
  { name: 'Inglês (EUA)', icon: euaIcon },
  { name: 'Espanhol', icon: spanishIcon },
];

const aiTools = [
  { name: 'ChatGPT', icon: chatgptIcon },
  { name: 'Gemini', icon: geminiIcon },
];

// Juntando tudo em uma lista final para o slider
const skills = [
  ...languages,
  ...frameworksAndLibs,
  ...tools,
  ...methodologies,
  ...databases,
  ...languagesSpoken,
  ...aiTools,
];

const SkillsSlider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const items = slider.querySelectorAll('.skill-item');
    const clones = Array.from(items).map(item => item.cloneNode(true));
    clones.forEach(clone => slider.appendChild(clone));

    // Aumentei a duração para 300 segundos (5 minutos) para diminuir a velocidade
    const duration = 300 * 1000;
    let startTime: number | null = null;
    let animationId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / duration;

      if (progress >= 1) {
        startTime = timestamp;
        slider.style.transition = 'none';
        slider.style.transform = 'translateX(0)';
        requestAnimationFrame(() => {
          slider.style.transition = 'transform 0.1s linear';
        });
      } else {
        const translateX = -progress * (items.length * 250);
        slider.style.transform = `translateX(${translateX}px)`;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section className="bg-transparent overflow-hidden select-none pointer-events-none">
      <div className="w-full overflow-hidden relative">
        <div
          ref={sliderRef}
          className="flex w-max will-change-transform py-4"
        >
          {[...skills, ...skills].map((skill, index) => (
            <div
              key={`${skill.name}-${index}`}
              className={`
                skill-item flex flex-col items-center justify-center transition-transform duration-300 hover:scale-110
                w-[220px] px-6
                lg:w-[190px] lg:px-4
                md:w-[150px] md:px-3
                sm:w-[60px] sm:px-0
              `}
              style={{ minWidth: 'auto' }}
            >
              <img
                src={skill.icon}
                alt={skill.name}
                loading="lazy"
                className={`
                  h-[80px] w-[80px] max-w-full aspect-square object-contain p-1 drop-shadow-md transition-all duration-300
                  lg:h-[70px] lg:w-[70px] lg:p-1
                  md:h-[60px] md:w-[60px] md:p-0.5
                  sm:h-[28px] sm:w-[28px] sm:p-0
                `}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSlider;
