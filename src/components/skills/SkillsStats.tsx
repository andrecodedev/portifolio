import { useTranslation } from 'react-i18next';
import type { Skill } from '../../data/skillsData';
import CountUp from '../ui/CountUp';
import PixelCpu from '../ui/PixelCpu';
import PixelSkills from '../ui/PixelSkills';

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

    const stats = [
        {
            label: t('SkillsStats.totalSkills', 'Total Habilidades'),
            value: totalSkills,
            isHighlight: true,
            highlightColor: 'animate-matrix',
            icon: <PixelSkills className="w-4 h-4 md:w-5 md:h-5 inline-block mr-2 align-middle -mt-1 animate-matrix" />,
            tooltip: t('SkillsStats.tooltip1', 'Arsenal completo!')
        },
        {
            label: t('SkillsStats.techSkills', 'Tecnologias'),
            value: techSkills,
            isHighlight: true,
            highlightColor: 'text-lime-400',
            icon: <PixelCpu glow className="w-4 h-4 md:w-5 md:h-5 inline-block mr-2 align-middle -mt-1" />,
            tooltip: t('SkillsStats.tooltip2', 'Domínio técnico!')
        },
        { label: t('SkillsStats.toolsSkills', 'Ferramentas & IDEs'), value: toolsSkills },
        { label: t('SkillsStats.aiSkills', 'IAs & Metodologias'), value: aiSkills },
        { label: t('SkillsStats.systemSkills', 'Sistemas'), value: systemSkills },
        { label: t('SkillsStats.languageSkills', 'Idiomas'), value: langSkills },
    ];

    return (
        <section className="w-full mb-8 lg:mb-12">
            <div className="font-jet max-w-[1200px] mx-auto grid grid-cols-2 lg:grid-cols-6 gap-[1.5rem] text-center p-5 sm:px-6">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className={`relative px-4 group after:content-[''] after:absolute after:top-[20%] after:bottom-[20%] after:right-[-0.5rem] after:w-[1px] after:bg-[var(--text-primary)] after:opacity-60 after:hidden lg:after:block last:after:hidden`}
                    >
                        <h5 className={`text-[1.875rem] md:text-3xl font-bold mb-2 transition-all duration-300 ${stat.isHighlight ? `${stat.highlightColor}` : 'text-[var(--text-primary)]'}`}>
                            {stat.icon && stat.icon}
                            <CountUp end={stat.value} suffix="+" />
                        </h5>
                        <p className={`text-[11px] md:text-xs leading-[1.4] transition-colors duration-300 ${stat.isHighlight ? `${stat.highlightColor} font-bold` : 'text-[var(--text-terceiro)]'}`}>
                            {stat.label}
                            {stat.isHighlight && (stat as any).tooltip && (
                                <span className={`block text-[8px] opacity-0 group-hover:opacity-100 transition-opacity mt-1 italic ${stat.highlightColor}`}>{(stat as any).tooltip}</span>
                            )}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
