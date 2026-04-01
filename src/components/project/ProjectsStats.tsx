import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { ProjectData } from '../../data/projectsData';
import CountUp from '../ui/CountUp';
import { likesService } from '../../services/likesService';
import PixelHeart from '../ui/PixelHeart';
import PixelRocket from '../ui/PixelRocket';
import PixelProject from '../ui/PixelProject';
import PixelUser from '../ui/PixelUser';
import PixelBriefcase from '../ui/PixelBriefcase';
import PixelLayers from '../ui/PixelLayers';
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

    const statsData = [
        {
            labelKey: 'ProjectsStats.totalProjects',
            labelDefault: 'Total Projetos',
            value: totalProjects,
            isHighlight: true,
            highlightColor: 'text-[var(--text-primary)]',
            icon: <PixelProject className="w-6 h-6 md:w-8 md:h-8" />,
            tooltipKey: 'ProjectsStats.tooltip1',
            tooltipDefault: 'Construindo o futuro!'
        },
        {
            labelKey: 'ProjectsStats.personalProjects',
            labelDefault: 'Projetos Pessoais',
            value: personalProjects,
            isHighlight: true,
            highlightColor: 'text-[var(--text-primary)]',
            icon: <PixelUser className="w-6 h-6 md:w-8 md:h-8" />,
            tooltipKey: 'ProjectsStats.tooltipPersonal',
            tooltipDefault: 'Criações exclusivas!'
        },
        {
            labelKey: 'ProjectsStats.workProjects',
            labelDefault: 'Projetos de Trabalho',
            value: workProjects,
            isHighlight: true,
            highlightColor: 'text-[var(--text-primary)]',
            icon: <PixelBriefcase className="w-6 h-6 md:w-8 md:h-8" />,
            tooltipKey: 'ProjectsStats.tooltipWork',
            tooltipDefault: 'Experiência de mercado!'
        },
        {
            labelKey: 'ProjectsStats.techUsed',
            labelDefault: 'Tecnologias',
            value: uniqueTechs,
            isHighlight: true,
            highlightColor: 'text-[var(--text-primary)]',
            icon: <PixelLayers className="w-6 h-6 md:w-8 md:h-8" />,
            tooltipKey: 'ProjectsStats.tooltipTech',
            tooltipDefault: 'Stack polivalente!'
        },
        {
            labelKey: 'ProjectsStats.deployments',
            labelDefault: 'Deploys Realizados',
            value: deploymentsCount,
            isHighlight: true,
            highlightColor: 'text-[var(--text-primary)]',
            icon: <PixelRocket className="w-6 h-6 md:w-8 md:h-8" />,
            tooltipKey: 'ProjectsStats.tooltip2',
            tooltipDefault: 'Rumo ao infinito!'
        },
        {
            labelKey: 'ProjectsStats.totalLikes',
            labelDefault: 'Amei nos Projetos',
            value: totalLikes,
            isHighlight: true,
            highlightColor: 'text-red-500',
            icon: <PixelHeart filled className="w-6 h-6 md:w-8 md:h-8" />,
            tooltipKey: 'ProjectsStats.thanks',
            tooltipDefault: 'Obrigado pelo carinho!'
        },
    ];

    return (
        <section className="w-full mb-8 lg:mb-12">
            <div className="font-jet max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-[1.5rem] text-center p-5 sm:px-6">
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
                            {stat.isHighlight && typeof stat.value === 'number' && stat.value >= 1000 ? (
                                <span>{formatLikes(stat.value)}+</span>
                            ) : (
                                <CountUp end={stat.value as number} suffix="+" />
                            )}
                        </h5>
                        <p className={`text-[11px] md:text-xs leading-[1.4] transition-colors duration-300 ${stat.isHighlight && stat.highlightColor !== 'text-[var(--text-primary)]' ? `${stat.highlightColor} font-bold` : 'text-[var(--text-terceiro)]'} ${stat.isHighlight ? 'font-bold' : ''}`}>
                            {t(stat.labelKey, stat.labelDefault)}
                            {stat.isHighlight && stat.tooltipKey && (
                                <span className={`block text-[10px] opacity-0 group-hover:opacity-100 group-active:opacity-100 group-focus:opacity-100 transition-opacity mt-1 italic ${stat.highlightColor === 'text-red-500' ? 'text-red-500' : 'text-[var(--text-terceiro)]'}`}>
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
