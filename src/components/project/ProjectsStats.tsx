import { useTranslation } from 'react-i18next';
import type { ProjectData } from '../../data/projectsData';
import CountUp from '../ui/CountUp';

interface ProjectsStatsProps {
    projectsData: ProjectData[];
}

export default function ProjectsStats({ projectsData }: ProjectsStatsProps) {
    const { t } = useTranslation();

    const totalProjects = projectsData.length;
    const personalProjects = projectsData.filter(p => p.type === 'personal').length;
    const workProjects = projectsData.filter(p => p.type === 'work').length;

    // Tecnologias únicas usadas nos projetos
    const allSkills = projectsData.reduce((acc, p) => {
        return acc.concat(p.skills || []);
    }, [] as string[]);
    const uniqueTechs = new Set(allSkills).size;

    // Contagem de deploys (projetos que possuem siteUrl)
    const deploymentsCount = projectsData.filter(p => p.siteUrl && p.siteUrl.trim() !== '').length;

    const stats = [
        { label: t('ProjectsStats.totalProjects', 'Total Projetos'), value: totalProjects },
        { label: t('ProjectsStats.personalProjects', 'Projetos Pessoais'), value: personalProjects },
        { label: t('ProjectsStats.workProjects', 'Projetos de Trabalho'), value: workProjects },
        { label: t('ProjectsStats.techUsed', 'Tecnologias'), value: uniqueTechs },
        { label: t('ProjectsStats.deployments', 'Deploys Realizados'), value: deploymentsCount },
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
