import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { ProjectData } from '../../data/projectsData';
import CountUp from '../ui/CountUp';
import { likesService } from '../../services/likesService';
import PixelHeart from '../ui/PixelHeart';
import PixelRocket from '../ui/PixelRocket';
import PixelProject from '../ui/PixelProject';
import { formatLikes } from '../../utils/formatters';

interface ProjectsStatsProps {
    projectsData: ProjectData[];
}

export default function ProjectsStats({ projectsData }: ProjectsStatsProps) {
    const { t } = useTranslation();
    const [totalLikes, setTotalLikes] = useState<number>(0);

    useEffect(() => {
        const fetchGlobalLikes = async () => {
            const likes = await likesService.getTotalLikes();
            setTotalLikes(likes);
        };
        fetchGlobalLikes();
    }, []);

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
        {
            label: t('ProjectsStats.totalProjects', 'Total Projetos'),
            value: totalProjects,
            isHighlight: true,
            highlightColor: 'text-amber-400',
            icon: <PixelProject glow className="w-4 h-4 md:w-5 md:h-5 inline-block mr-2 align-middle -mt-1" />,
            tooltip: t('ProjectsStats.tooltip1', 'Construindo o futuro!')
        },
        { label: t('ProjectsStats.personalProjects', 'Projetos Pessoais'), value: personalProjects },
        { label: t('ProjectsStats.workProjects', 'Projetos de Trabalho'), value: workProjects },
        { label: t('ProjectsStats.techUsed', 'Tecnologias'), value: uniqueTechs },
        {
            label: t('ProjectsStats.deployments', 'Deploys Realizados'),
            value: deploymentsCount,
            isHighlight: true,
            highlightColor: 'text-blue-400',
            icon: <PixelRocket glow className="w-4 h-4 md:w-5 md:h-5 inline-block mr-2 align-middle -mt-1" />,
            tooltip: t('ProjectsStats.tooltip2', 'Rumo ao infinito!')
        },
        {
            label: t('ProjectsStats.totalLikes', 'Amei nos Projetos'),
            value: totalLikes,
            isHighlight: true,
            highlightColor: 'text-red-500',
            icon: <PixelHeart filled className="w-4 h-4 md:w-5 md:h-5 inline-block mr-2 align-middle -mt-1" />,
            tooltip: t('ProjectsStats.thanks', 'Obrigado pelo carinho!')
        },
    ];

    return (
        <section className="w-full mb-8 lg:mb-12">
            <div className="font-jet max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-[1.5rem] text-center p-5 sm:px-6">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className={`relative px-4 group after:content-[''] after:absolute after:top-[20%] after:bottom-[20%] after:right-[-0.5rem] after:w-[1px] after:bg-[var(--text-primary)] after:opacity-60 after:hidden lg:after:block last:after:hidden`}
                    >
                        <h5 className={`text-[1.875rem] md:text-3xl font-bold mb-2 transition-all duration-300 ${stat.isHighlight ? `${stat.highlightColor}` : 'text-[var(--text-primary)]'}`}>
                            {stat.icon && stat.icon}
                            {stat.isHighlight && typeof stat.value === 'number' && stat.value >= 1000 ? (
                                <span>{formatLikes(stat.value)}+</span>
                            ) : (
                                <CountUp end={stat.value as number} suffix="+" />
                            )}
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
