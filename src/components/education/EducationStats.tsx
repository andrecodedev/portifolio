import { useTranslation } from 'react-i18next';
import type { EducationData } from '../../data/educationData';
import CountUp from '../ui/CountUp';

interface EducationStatsProps {
    educationData: EducationData[];
}

/**
 * Parses workload strings like "2.400h", "163,5h", "8h" into numbers.
 * Handles both dot and comma as thousand/decimal separators.
 */
const parseHours = (h: string) => {
    if (!h) return 0;
    // Remove spaces and 'h'
    let cleaned = h.toLowerCase().replace(/h/g, '').trim();

    if (cleaned.includes('.') && cleaned.includes(',')) {
        // Both separators: e.g. 2.400,50 or 2,400.50
        const lastDot = cleaned.lastIndexOf('.');
        const lastComma = cleaned.lastIndexOf(',');
        if (lastDot > lastComma) {
            // Dot is decimal (EN style)
            cleaned = cleaned.replace(/,/g, '');
        } else {
            // Comma is decimal (PT style)
            cleaned = cleaned.replace(/\./g, '').replace(',', '.');
        }
    } else if (cleaned.includes('.') || cleaned.includes(',')) {
        // Only one type of separator
        const separator = cleaned.includes('.') ? '.' : ',';
        const parts = cleaned.split(separator);
        // In this specific dataset, "2.400" has 3 digits after the dot (thousand separator)
        // and "163,5" has 1 digit after the comma (decimal separator).
        if (parts[parts.length - 1].length === 3) {
            // Likely a thousand separator for values like 1.000, 2.400
            cleaned = cleaned.replace(/[.,]/g, '');
        } else {
            // Likely a decimal separator for values like 163,5
            cleaned = cleaned.replace(/[.,]/g, '.');
        }
    }

    return parseFloat(cleaned) || 0;
};

export default function EducationStats({ educationData }: EducationStatsProps) {
    const { t, i18n } = useTranslation();

    // We use the base language (Portuguese) for all internal calculations 
    // to ensure that counters are consistent regardless of the current UI language.
    const baseLng = 'pt';

    // Calculate total hours
    const totalHours = educationData.reduce((acc, item) => {
        // We access the raw translation from i18n instance
        const hoursStr = i18n.t(item.cargaHoraria || '', { lng: baseLng });
        return acc + parseHours(hoursStr);
    }, 0);

    const totalCourses = educationData.length;

    // Count completed courses based on the PT status
    const completedCourses = educationData.filter(item => {
        const status = i18n.t(item.status, { lng: baseLng }).toLowerCase();
        return status.includes('concluído');
    }).length;

    // Unique schools based on their PT names
    const uniqueSchools = new Set(
        educationData.map(item => i18n.t(item.escola, { lng: baseLng }))
    ).size;

    // Count ongoing courses based on the PT status
    const ongoingCourses = educationData.filter(item => {
        const status = i18n.t(item.status, { lng: baseLng }).toLowerCase();
        return status.includes('cursando');
    }).length;

    const stats = [
        {
            label: t('EducationStats.totalHours', 'Horas de Estudo'),
            value: totalHours >= 1000 ? totalHours / 1000 : totalHours,
            decimals: totalHours >= 1000 ? 1 : 0,
            suffix: totalHours >= 1000 ? 'K+' : '+'
        },
        { label: t('EducationStats.totalCourses', 'Cursos & Formações'), value: totalCourses, suffix: '+' },
        { label: t('EducationStats.completedCourses', 'Certificados Obtidos'), value: completedCourses, suffix: '+' },
        { label: t('EducationStats.uniqueSchools', 'Instituições'), value: uniqueSchools, suffix: '+' },
        { label: t('EducationStats.ongoingCourses', 'Cursos em Andamento'), value: ongoingCourses, suffix: '+' },
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
                            <CountUp
                                end={stat.value as number}
                                decimals={stat.decimals || 0}
                                suffix={stat.suffix}
                            />
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
