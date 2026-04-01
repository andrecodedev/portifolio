import { useTranslation } from 'react-i18next';
import type { EducationData } from '../../data/educationData';
import CountUp from '../ui/CountUp';
import PixelBook from '../ui/PixelBook';
import PixelHourglass from '../ui/PixelHourglass';
import PixelCertificate from '../ui/PixelCertificate';
import PixelSchool from '../ui/PixelSchool';
import PixelOngoing from '../ui/PixelOngoing';

interface EducationStatsProps {
    educationData: EducationData[];
}

const parseHours = (h: string) => {
    if (!h) return 0;
    let cleaned = h.toLowerCase().replace(/h/g, '').trim();

    if (cleaned.includes('.') && cleaned.includes(',')) {
        const lastDot = cleaned.lastIndexOf('.');
        const lastComma = cleaned.lastIndexOf(',');
        if (lastDot > lastComma) {
            cleaned = cleaned.replace(/,/g, '');
        } else {
            cleaned = cleaned.replace(/\./g, '').replace(',', '.');
        }
    } else if (cleaned.includes('.') || cleaned.includes(',')) {
        const separator = cleaned.includes('.') ? '.' : ',';
        const parts = cleaned.split(separator);
        if (parts[parts.length - 1].length === 3) {
            cleaned = cleaned.replace(/[.,]/g, '');
        } else {
            cleaned = cleaned.replace(/[.,]/g, '.');
        }
    }

    return parseFloat(cleaned) || 0;
};

export default function EducationStats({ educationData }: EducationStatsProps) {
    const { t, i18n } = useTranslation();
    const baseLng = 'pt';

    const totalHours = educationData.reduce((acc, item) => {
        const hoursStr = i18n.t(item.cargaHoraria || '', { lng: baseLng });
        return acc + parseHours(hoursStr);
    }, 0);

    const totalCourses = educationData.length;

    const completedCourses = educationData.filter(item => {
        const status = i18n.t(item.status, { lng: baseLng }).toLowerCase();
        return status.includes('concluído');
    }).length;

    const uniqueSchools = new Set(
        educationData.map(item => i18n.t(item.escola, { lng: baseLng }))
    ).size;

    const ongoingCourses = educationData.filter(item => {
        const status = i18n.t(item.status, { lng: baseLng }).toLowerCase();
        return status.includes('cursando');
    }).length;

    const statsData = [
        {
            labelKey: 'EducationStats.totalHours',
            labelDefault: 'Horas de Estudo',
            value: totalHours >= 1000 ? totalHours / 1000 : totalHours,
            decimals: totalHours >= 1000 ? 1 : 0,
            suffix: totalHours >= 1000 ? 'K+' : '+',
            isHighlight: true,
            highlightColor: 'text-[var(--text-primary)]',
            icon: <PixelHourglass className="w-6 h-6 md:w-8 md:h-8" />,
            tooltipKey: 'EducationStats.tooltip1',
            tooltipDefault: 'Conhecimento é poder!'
        },
        {
            labelKey: 'EducationStats.totalCourses',
            labelDefault: 'Cursos & Formações',
            value: totalCourses,
            suffix: '+',
            isHighlight: true,
            highlightColor: 'text-[var(--text-primary)]',
            icon: <PixelBook className="w-6 h-6 md:w-8 md:h-8" />,
            tooltipKey: 'EducationStats.tooltip2',
            tooltipDefault: 'Aprendizado contínuo!'
        },
        {
            labelKey: 'EducationStats.completedCourses',
            labelDefault: 'Certificados Obtidos',
            value: completedCourses,
            suffix: '+',
            isHighlight: true,
            highlightColor: 'text-[var(--text-primary)]',
            icon: <PixelCertificate className="w-6 h-6 md:w-8 md:h-8" />,
            tooltipKey: 'EducationStats.tooltip3',
            tooltipDefault: 'Conquista desbloqueada!'
        },
        {
            labelKey: 'EducationStats.uniqueSchools',
            labelDefault: 'Instituições',
            value: uniqueSchools,
            suffix: '+',
            isHighlight: true,
            highlightColor: 'text-[var(--text-primary)]',
            icon: <PixelSchool className="w-6 h-6 md:w-8 md:h-8" />,
            tooltipKey: 'EducationStats.tooltip4',
            tooltipDefault: 'Onde tudo floresce!'
        },
        {
            labelKey: 'EducationStats.ongoingCourses',
            labelDefault: 'Cursos em Andamento',
            value: ongoingCourses,
            suffix: '+',
            isHighlight: true,
            highlightColor: 'text-[var(--text-primary)]',
            icon: <PixelOngoing className="w-6 h-6 md:w-8 md:h-8" />,
            tooltipKey: 'EducationStats.tooltip5',
            tooltipDefault: 'Sempre evoluindo!'
        },
    ];

    return (
        <section className="w-full mb-8 lg:mb-12">
            <div className="font-jet max-w-[1200px] mx-auto grid grid-cols-2 lg:grid-cols-5 gap-[1.5rem] text-center p-5 sm:px-6">
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
                            <CountUp
                                end={stat.value as number}
                                decimals={stat.decimals || 0}
                                suffix={stat.suffix}
                            />
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
