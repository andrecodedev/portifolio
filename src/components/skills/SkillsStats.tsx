import { useTranslation } from 'react-i18next';
import type { Skill } from '../../data/skillsData';
import CountUp from '../ui/CountUp';
import PixelCpu from '../ui/PixelCpu';
import PixelSkills from '../ui/PixelSkills';
import PixelTool from '../ui/PixelTool';
import PixelMind from '../ui/PixelMind';
import PixelMonitor from '../ui/PixelMonitor';
import PixelGlobe from '../ui/PixelGlobe';

interface SkillsStatsProps {
    skillsData: Skill[];
}

export default function SkillsStats({ skillsData }: SkillsStatsProps) {
    const { t } = useTranslation();

    const totalSkills = skillsData.length;

    // Tecnologias (linguagens + frameworks + banco-dados)
    const techSkills = skillsData.filter(s =>
        s.category === 'linguagens' || s.category === 'frameworks' || s.category === 'banco-dados'
    ).length;

    // Ferramentas & IDEs
    const toolsSkills = skillsData.filter(s =>
        s.category === 'ferramentas' || s.category === 'ides'
    ).length;

    // IAs & Metodologias
    const aiSkills = skillsData.filter(s =>
        s.category === 'ias' || s.category === 'metodologias'
    ).length;

    // Sistemas Operacionais (Linux/Windows)
    const systemSkills = skillsData.filter(s => s.category === 'sistemas').length;

    // Idiomas
    const langSkills = skillsData.filter(s => s.category === 'idioma').length;

    const statsData = [
        {
            labelKey: 'SkillsStats.totalSkills',
            labelDefault: 'Total Habilidades',
            value: totalSkills,
            isHighlight: true,
            highlightColor: 'text-[var(--text-primary)]',
            icon: <PixelSkills className="w-6 h-6 md:w-8 md:h-8" />,
            tooltipKey: 'SkillsStats.tooltip1',
            tooltipDefault: 'Arsenal completo!'
        },
        {
            labelKey: 'SkillsStats.techSkills',
            labelDefault: 'Tecnologias',
            value: techSkills,
            isHighlight: true,
            highlightColor: 'text-[var(--text-primary)]',
            icon: <PixelCpu className="w-6 h-6 md:w-8 md:h-8" />,
            tooltipKey: 'SkillsStats.tooltip2',
            tooltipDefault: 'Domínio técnico!'
        },
        {
            labelKey: 'SkillsStats.toolsSkills',
            labelDefault: 'Ferramentas & IDEs',
            value: toolsSkills,
            isHighlight: true,
            highlightColor: 'text-[var(--text-primary)]',
            icon: <PixelTool className="w-6 h-6 md:w-8 md:h-8" />,
            tooltipKey: 'SkillsStats.tooltipTools',
            tooltipDefault: 'Produtividade total!'
        },
        {
            labelKey: 'SkillsStats.aiSkills',
            labelDefault: 'IAs & Metodologias',
            value: aiSkills,
            isHighlight: true,
            highlightColor: 'text-[var(--text-primary)]',
            icon: <PixelMind className="w-6 h-6 md:w-8 md:h-8" />,
            tooltipKey: 'SkillsStats.tooltipMind',
            tooltipDefault: 'Lógica e IA!'
        },
        {
            labelKey: 'SkillsStats.systemSkills',
            labelDefault: 'Sistemas',
            value: systemSkills,
            isHighlight: true,
            highlightColor: 'text-[var(--text-primary)]',
            icon: <PixelMonitor className="w-6 h-6 md:w-8 md:h-8" />,
            tooltipKey: 'SkillsStats.tooltipSystem',
            tooltipDefault: 'Base sólida!'
        },
        {
            labelKey: 'SkillsStats.languageSkills',
            labelDefault: 'Idiomas',
            value: langSkills,
            isHighlight: true,
            highlightColor: 'text-[var(--text-primary)]',
            icon: <PixelGlobe className="w-6 h-6 md:w-8 md:h-8" />,
            tooltipKey: 'SkillsStats.tooltipGlobe',
            tooltipDefault: 'Sem fronteira!'
        },
    ];

    return (
        <section className="w-full mb-8 lg:mb-12">
            <div className="font-jet max-w-[1200px] mx-auto grid grid-cols-2 lg:grid-cols-6 gap-[1.5rem] text-center p-5 sm:px-6">
                {statsData.map((stat, index) => (
                    <div
                        key={index}
                        tabIndex={0}
                        className={`relative px-4 group outline-none after:content-[''] after:absolute after:top-[20%] after:bottom-[20%] after:right-[-0.5rem] after:w-[1px] after:bg-[var(--text-primary)] after:opacity-60 after:hidden lg:after:block last:after:hidden`}
                    >
                        <h5 className={`text-[1.875rem] md:text-3xl font-bold mb-2 transition-all duration-300 flex items-center justify-center gap-2 ${stat.isHighlight ? `${stat.highlightColor}` : 'text-[var(--text-primary)]'}`}>
                            {stat.icon && (
                                <span className="flex-shrink-0">
                                    {stat.icon}
                                </span>
                            )}
                            <CountUp end={stat.value} suffix="+" />
                        </h5>
                        <p className={`text-[11px] md:text-xs leading-[1.4] transition-colors duration-300 text-[var(--text-terceiro)] ${stat.isHighlight ? 'font-bold' : ''}`}>
                            {t(stat.labelKey, stat.labelDefault)}
                            {stat.isHighlight && stat.tooltipKey && (
                                <span className={`block text-[8px] opacity-0 group-hover:opacity-100 group-active:opacity-100 group-focus:opacity-100 transition-opacity mt-1 italic text-[var(--text-terceiro)]`}>
                                    {t(stat.tooltipKey, stat.tooltipDefault)}
                                </span>
                            )}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
