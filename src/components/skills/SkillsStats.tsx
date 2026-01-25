import { useTranslation } from 'react-i18next';
import type { Skill } from '../../data/skillsData';
import CountUp from '../ui/CountUp';

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

    // Idiomas
    const langSkills = skillsData.filter(s => s.category === 'idioma').length;

    const stats = [
        { label: t('SkillsStats.totalSkills', 'Total Habilidades'), value: totalSkills },
        { label: t('SkillsStats.techSkills', 'Tecnologias'), value: techSkills },
        { label: t('SkillsStats.toolsSkills', 'Ferramentas & IDEs'), value: toolsSkills },
        { label: t('SkillsStats.aiSkills', 'IAs & Metodologias'), value: aiSkills },
        { label: t('SkillsStats.languageSkills', 'Idiomas'), value: langSkills },
    ];

    return (
        <section className="w-full mb-8 lg:mb-12">
            <div className="font-jet max-w-[1200px] mx-auto grid grid-cols-2 lg:grid-cols-5 gap-[1.5rem] text-center p-5 sm:px-6">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className={`relative px-4 after:content-[''] after:absolute after:top-[20%] after:bottom-[20%] after:right-[-0.5rem] after:w-[1px] after:bg-[var(--text-primary)] after:opacity-60 after:hidden lg:after:block last:after:hidden ${index === 4 ? 'col-span-2 lg:col-span-1' : ''
                            }`}
                    >
                        <h5 className="text-[1.875rem] md:text-4xl font-bold text-[var(--text-primary)] mb-2">
                            <CountUp end={stat.value} suffix="+" />
                        </h5>
                        <p className="text-sm text-[var(--text-terceiro)] leading-[1.4]">
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
