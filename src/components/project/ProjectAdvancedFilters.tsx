import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { HiSearch, HiX, HiAdjustments, HiCode, HiCalendar, HiSortDescending } from "react-icons/hi";
import { getSkillName } from "../../data/skillsData";
import { projectsData } from "../../data/projectsData";

interface AdvancedFiltersProps {
    isVisible: boolean;
    activeType: string;
    onFilterCategory: (type: string) => void;
    filters: {
        search: string;
        techs: string[];
        years: string[];
        sortBy: string;
    };
    setFilters: (filters: any) => void;
    onClear: () => void;
}

export default function ProjectAdvancedFilters({ isVisible, activeType, onFilterCategory, filters, setFilters, onClear }: AdvancedFiltersProps) {
    const { t } = useTranslation();

    const categories = [
        { key: "all", label: t("ProjectFilter.todos", "Todos") },
        { key: "personal", label: t("ProjectFilter.pessoais", "Pessoais") },
        { key: "work", label: t("ProjectFilter.trabalho", "Trabalho") },
    ];

    // Extrair anos únicos dos projetos
    const availableYears = (Array.from(
        new Set(projectsData.map((p) => p.date?.split("-")[0]).filter(Boolean))
    ).sort((a, b) => (b || "").localeCompare(a || ""))) as string[];

    // Extrair techs únicas (memoizado para performance)
    const availableTechs = useMemo(() => {
        return Array.from(
            new Set(projectsData.flatMap((p) => p.skills || []))
        )
            .map((url) => ({ url, name: getSkillName(url) }))
            .filter((tech) => tech.name)
            .sort((a, b) => t(a.name!).localeCompare(t(b.name!)));
    }, [t]);

    const handleTechToggle = (techUrl: string) => {
        const currentTechs = Array.isArray(filters.techs) ? filters.techs : [];
        const newTechs = currentTechs.includes(techUrl)
            ? currentTechs.filter((t) => t !== techUrl)
            : [...currentTechs, techUrl];
        setFilters({ ...filters, techs: newTechs });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    className="overflow-hidden w-full max-w-6xl mx-auto mb-10 px-4"
                >
                    <div className="bg-[var(--bg-secondary-transparent)] border border-[var(--border)] rounded-[20px] p-8 relative overflow-hidden group font-inter shadow-lg">
                        {/* Efeito de brilho sutil no fundo */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[color-mix(in_srgb,var(--text-primary)_3%,transparent)] to-transparent pointer-events-none" />

                        <div className="relative z-10">
                            {/* Header: Título e Reset */}
                            <div className="flex flex-row items-center justify-between mb-8 pb-4 border-b border-[color-mix(in_srgb,var(--text-primary)_5%,transparent)]">
                                <h3 className="text-[var(--text-primary)] font-bold text-xl lg:text-2xl flex items-center gap-3 font-inter">
                                    <div className="p-2 bg-[color-mix(in_srgb,var(--text-primary)_10%,transparent)] rounded-lg text-sm">
                                        <HiAdjustments />
                                    </div>
                                    <span className="tracking-tight">{t("AdvancedFilters.title")}</span>
                                </h3>
                            </div>


                            {/* Grid 3 Colunas: Busca | Tempo/Ordem | Tecnologias */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                                {/* Coluna 1: Busca (Lg: col-span-4) */}
                                <div className="lg:col-span-4 space-y-8">
                                    <div className="space-y-4">
                                        <label className="text-[11px] uppercase font-bold text-[var(--text-terceiro)] tracking-[0.2em] opacity-80 flex items-center gap-2 mb-4">
                                            <HiSearch className="text-[var(--text-primary)]/40" /> {t("AdvancedFilters.search_label")}
                                        </label>
                                        <div className="relative group/input">
                                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[color-mix(in_srgb,var(--text-terceiro)_60%,transparent)] group-focus-within/input:text-[var(--text-primary)] transition-colors">
                                                <HiSearch size={18} />
                                            </div>
                                            <input
                                                type="text"
                                                value={filters.search}
                                                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                                placeholder={t("AdvancedFilters.search")}
                                                className="w-full h-[54px] bg-[color-mix(in_srgb,var(--bg-primary)_70%,transparent)] border border-[color-mix(in_srgb,var(--text-primary)_12%,transparent)] rounded-2xl px-4 pl-12 pr-10 text-sm text-[var(--text-primary)] placeholder:text-[color-mix(in_srgb,var(--text-terceiro)_70%,transparent)] focus:outline-none focus:border-[color-mix(in_srgb,var(--text-primary)_30%,transparent)] focus:shadow-[0_0_20px_color-mix(in_srgb,var(--text-primary)_5%,transparent)] transition-all font-inter"
                                            />
                                            {filters.search && (
                                                <button
                                                    onClick={() => setFilters({ ...filters, search: "" })}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[color-mix(in_srgb,var(--text-terceiro)_40%,transparent)] hover:text-[var(--text-primary)] transition-colors p-2"
                                                >
                                                    <HiX size={16} />
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[11px] uppercase font-bold text-[var(--text-terceiro)] tracking-[0.2em] opacity-80 flex items-center gap-2 mb-4">
                                            <HiAdjustments className="text-[var(--text-primary)]/40" /> {t("AdvancedFilters.type_label")}
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {categories.map((cat) => {
                                                const isActive = activeType === cat.key;
                                                return (
                                                    <button
                                                        key={cat.key}
                                                        onClick={() => onFilterCategory(cat.key)}
                                                        className={`px-4 py-2 rounded-xl text-[11px] font-bold transition-all border font-inter ${isActive
                                                            ? "bg-[var(--text-primary)] text-[var(--bg-primary)] border-transparent shadow-[0_0_15px_color-mix(in_srgb,var(--text-primary)_30%,transparent)]"
                                                            : "bg-[var(--button-bg)] text-[var(--text-terceiro)] border-[color-mix(in_srgb,var(--text-primary)_10%,transparent)] hover:bg-[var(--button-hover)]"
                                                            }`}
                                                    >
                                                        {cat.label}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>


                                {/* Coluna 2: Tempo & Ordem (Lg: col-span-3) */}
                                <div className="lg:col-span-3 flex flex-col gap-6">
                                    {/* Timeline */}
                                    <div className="space-y-4">
                                        <label className="text-[11px] uppercase font-bold text-[var(--text-terceiro)] tracking-[0.2em] opacity-80 flex items-center gap-2 mb-4">
                                            <HiCalendar className="text-[var(--text-primary)]/40" /> {t("AdvancedFilters.year")}
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {availableYears.map((year) => {
                                                const isActive = filters.years.includes(year);
                                                return (
                                                    <button
                                                        key={year}
                                                        onClick={() => {
                                                            const newYears = isActive
                                                                ? filters.years.filter((y) => y !== year)
                                                                : [...filters.years, year];
                                                            setFilters({ ...filters, years: newYears });
                                                        }}
                                                        className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all border font-inter ${isActive
                                                            ? "bg-[var(--text-primary)] text-[var(--bg-primary)] border-transparent shadow-lg"
                                                            : "bg-[var(--button-bg)] text-[var(--text-terceiro)] border-[color-mix(in_srgb,var(--text-primary)_5%,transparent)] hover:border-[color-mix(in_srgb,var(--text-primary)_10%,transparent)] hover:bg-[var(--button-hover)]"
                                                            }`}
                                                    >
                                                        {year}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Sorting */}
                                    <div className="space-y-4">
                                        <label className="text-[11px] uppercase font-bold text-[var(--text-terceiro)] tracking-[0.2em] opacity-80 flex items-center gap-2 mb-4">
                                            <HiSortDescending className="text-[var(--text-primary)]/40" /> {t("AdvancedFilters.sort_title")}
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {[
                                                { id: 'newest', label: t("AdvancedFilters.sort_newest") },
                                                { id: 'oldest', label: t("AdvancedFilters.sort_oldest") },
                                                { id: 'most-loved', label: t("AdvancedFilters.sort_loved") },
                                            ].map((sort) => (
                                                <button
                                                    key={sort.id}
                                                    onClick={() => setFilters({ ...filters, sortBy: sort.id })}
                                                    className={`px-3 py-2 rounded-lg text-[10px] font-bold transition-all border text-center uppercase tracking-wider font-inter ${filters.sortBy === sort.id
                                                        ? "bg-[var(--text-primary)] text-[var(--bg-primary)] border-transparent shadow-[0_0_15px_color-mix(in_srgb,var(--text-primary)_30%,transparent)]"
                                                        : "bg-[var(--button-bg)] text-[var(--text-terceiro)] border-[color-mix(in_srgb,var(--text-primary)_5%,transparent)] hover:bg-[var(--button-hover)] hover:text-[var(--text-primary)]"
                                                        }`}
                                                >
                                                    {sort.label}
                                                </button>
                                            ))}
                                        </div>

                                    </div>
                                </div>

                                {/* Coluna 3: Techs (Lg: col-span-5) */}
                                <div className="lg:col-span-5 space-y-4">
                                    <label className="text-[11px] uppercase font-bold text-[var(--text-terceiro)] tracking-[0.2em] opacity-80 flex items-center gap-2">
                                        <HiCode className="text-[var(--text-primary)]/40" /> {t("AdvancedFilters.tech")}
                                    </label>
                                    <div
                                        className="bg-[color-mix(in_srgb,var(--bg-primary)_30%,transparent)] rounded-2xl p-4 sm:p-5 border border-[color-mix(in_srgb,var(--text-primary)_5%,transparent)] max-h-[220px] sm:max-h-[180px] overflow-y-auto custom-scrollbar-thin grid grid-cols-4 xs:grid-cols-5 sm:grid-cols-7 lg:grid-cols-6 gap-3 sm:gap-3 shadow-inner"
                                        data-lenis-prevent
                                    >
                                        {availableTechs.map((tech) => {
                                            const isActive = filters.techs.includes(tech.url);
                                            return (
                                                <button
                                                    key={tech.url}
                                                    onClick={() => handleTechToggle(tech.url)}
                                                    className={`group relative flex items-center justify-center aspect-square p-2 sm:p-2.5 rounded-xl border transition-all duration-300 ${isActive
                                                        ? "bg-[color-mix(in_srgb,var(--text-primary)_15%,transparent)] border-[color-mix(in_srgb,var(--text-primary)_25%,transparent)] shadow-[0_0_15px_color-mix(in_srgb,var(--text-primary)_5%,transparent)]"
                                                        : "bg-transparent border-transparent hover:bg-[color-mix(in_srgb,var(--text-primary)_5%,transparent)] hover:border-[color-mix(in_srgb,var(--text-primary)_10%,transparent)]"
                                                        }`}
                                                    title={t(tech.name!)}
                                                >
                                                    <img
                                                        src={tech.url}
                                                        alt={t(tech.name!)}
                                                        className={`w-7 h-7 sm:w-6 sm:h-6 lg:w-5.5 lg:h-5.5 object-contain transition-all duration-300 ${isActive
                                                            ? "opacity-100 scale-110 grayscale-0 brightness-110 drop-shadow-[0_0_8px_rgba(var(--text-primary-rgb),0.5)]"
                                                            : "opacity-[0.35] grayscale-[0.8] group-hover:opacity-100 group-hover:grayscale-0 scale-90 group-hover:scale-105"
                                                            }`}
                                                        style={{
                                                            filter: isActive
                                                                ? `drop-shadow(0 0 10px color-mix(in srgb, var(--text-primary) 20%, transparent))`
                                                                : undefined
                                                        }}
                                                    />
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>


                            </div>

                            {/* Footer: Limpar Tudo (Melhor no mobile) */}
                            <div className="mt-8 pt-6 border-t border-[color-mix(in_srgb,var(--text-primary)_5%,transparent)] flex justify-end">
                                <button
                                    onClick={onClear}
                                    className="text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--text-terceiro)] hover:text-[var(--text-primary)] transition-all px-6 py-3 rounded-xl border border-[color-mix(in_srgb,var(--text-primary)_10%,transparent)] hover:border-[color-mix(in_srgb,var(--text-primary)_20%,transparent)] bg-[var(--button-bg)] shadow-sm hover:shadow-md"
                                >
                                    {t("AdvancedFilters.clear")}
                                </button>
                            </div>
                        </div>


                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
