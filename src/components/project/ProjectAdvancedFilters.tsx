import { useMemo, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { HiSearch, HiAdjustments, HiCode, HiCalendar, HiSortDescending } from "react-icons/hi";
import { getSkillName } from "../../data/skillsData";
import { projectsData } from "../../data/projectsData";
import Modal from "../ui/Modal";

interface AdvancedFiltersProps {
    isVisible: boolean;
    onClose: () => void;
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

export default function ProjectAdvancedFilters({ isVisible, onClose, activeType, onFilterCategory, filters, setFilters, onClear }: AdvancedFiltersProps) {
    const { t } = useTranslation();

    // Estado local para permitir "Aplicar"
    const [localFilters, setLocalFilters] = useState(filters);
    const [localType, setLocalType] = useState(activeType);

    // Sincronizar quando abrir
    useEffect(() => {
        if (isVisible) {
            setLocalFilters(filters);
            setLocalType(activeType);
        }
    }, [isVisible, filters, activeType]);

    const handleApply = () => {
        setFilters(localFilters);
        onFilterCategory(localType);
        onClose();
    };

    const handleReset = () => {
        onClear();
        onClose();
    };

    const categories = [
        { key: "all", label: t("ProjectFilter.todos", "Todos") },
        { key: "personal", label: t("ProjectFilter.pessoais", "Pessoais") },
        { key: "work", label: t("ProjectFilter.trabalho", "Trabalho") },
    ];

    // Extrair anos únicos dos projetos
    const availableYears = useMemo(() => (Array.from(
        new Set(projectsData.map((p) => p.date?.split("-")[0]).filter(Boolean))
    ).sort((a, b) => (b || "").localeCompare(a || ""))) as string[], []);

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
        const currentTechs = Array.isArray(localFilters.techs) ? localFilters.techs : [];
        const newTechs = currentTechs.includes(techUrl)
            ? currentTechs.filter((t) => t !== techUrl)
            : [...currentTechs, techUrl];
        setLocalFilters({ ...localFilters, techs: newTechs });
    };

    const handleYearToggle = (year: string) => {
        const currentYears = Array.isArray(localFilters.years) ? localFilters.years : [];
        const newYears = currentYears.includes(year)
            ? currentYears.filter((y) => y !== year)
            : [...currentYears, year];
        setLocalFilters({ ...localFilters, years: newYears });
    };

    return (
        <Modal
            isOpen={isVisible}
            onClose={onClose}
            title={t("AdvancedFilters.title")}
            footer={
                <>
                    <button
                        onClick={handleReset}
                        className="px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest text-[var(--text-terceiro)] hover:text-[var(--text-primary)] transition-all border border-[var(--border)]"
                    >
                        {t("AdvancedFilters.reset", "Limpar tudo")}
                    </button>
                    <button
                        onClick={handleApply}
                        className="px-8 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest bg-[var(--text-primary)] text-[var(--bg-primary)] hover:opacity-90 transition-all shadow-lg"
                    >
                        {t("AdvancedFilters.apply", "Aplicar Filtros")}
                    </button>
                </>
            }
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-2">
                {/* Coluna 1: Busca e Categoria */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="space-y-4">
                        <label className="text-[11px] uppercase font-bold text-[var(--text-terceiro)] tracking-[0.2em] opacity-80 flex items-center gap-2">
                            <HiSearch className="text-[var(--text-primary)]/40" /> {t("AdvancedFilters.search_label")}
                        </label>
                        <div className="relative group/input">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[color-mix(in_srgb,var(--text-terceiro)_60%,transparent)] group-focus-within/input:text-[var(--text-primary)] transition-colors">
                                <HiSearch size={18} />
                            </div>
                            <input
                                type="text"
                                value={localFilters.search}
                                onChange={(e) => setLocalFilters({ ...localFilters, search: e.target.value })}
                                placeholder={t("AdvancedFilters.search")}
                                className="w-full h-[54px] bg-[color-mix(in_srgb,var(--bg-primary)_70%,transparent)] border border-[color-mix(in_srgb,var(--text-primary)_12%,transparent)] rounded-2xl px-4 pl-12 pr-10 text-sm text-[var(--text-primary)] placeholder:text-[color-mix(in_srgb,var(--text-terceiro)_70%,transparent)] focus:outline-none focus:border-[color-mix(in_srgb,var(--text-primary)_30%,transparent)] transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-[11px] uppercase font-bold text-[var(--text-terceiro)] tracking-[0.2em] opacity-80 flex items-center gap-2">
                            <HiAdjustments className="text-[var(--text-primary)]/40" /> {t("AdvancedFilters.type_label")}
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat) => {
                                const isActive = localType === cat.key;
                                return (
                                    <button
                                        key={cat.key}
                                        onClick={() => setLocalType(cat.key)}
                                        className={`px-4 py-2 rounded-xl text-[11px] font-bold transition-all border ${isActive
                                            ? "bg-[var(--text-primary)] text-[var(--bg-primary)] border-transparent shadow-md"
                                            : "bg-[var(--button-bg)] text-[var(--text-terceiro)] border-[var(--border)] hover:bg-[var(--button-hover)]"
                                            }`}
                                    >
                                        {cat.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Coluna 2: Tempo & Ordem */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    <div className="space-y-4">
                        <label className="text-[11px] uppercase font-bold text-[var(--text-terceiro)] tracking-[0.2em] opacity-80 flex items-center gap-2">
                            <HiCalendar className="text-[var(--text-primary)]/40" /> {t("AdvancedFilters.year")}
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {availableYears.map((year) => {
                                const isActive = localFilters.years.includes(year);
                                return (
                                    <button
                                        key={year}
                                        onClick={() => handleYearToggle(year)}
                                        className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all border ${isActive
                                            ? "bg-[var(--text-primary)] text-[var(--bg-primary)] border-transparent shadow-md"
                                            : "bg-[var(--button-bg)] text-[var(--text-terceiro)] border-[var(--border)] hover:bg-[var(--button-hover)]"
                                            }`}
                                    >
                                        {year}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-[11px] uppercase font-bold text-[var(--text-terceiro)] tracking-[0.2em] opacity-80 flex items-center gap-2">
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
                                    onClick={() => setLocalFilters({ ...localFilters, sortBy: sort.id })}
                                    className={`px-3 py-2 rounded-lg text-[10px] font-bold transition-all border text-center uppercase tracking-wider ${localFilters.sortBy === sort.id
                                        ? "bg-[var(--text-primary)] text-[var(--bg-primary)] border-transparent shadow-md"
                                        : "bg-[var(--button-bg)] text-[var(--text-terceiro)] border-[var(--border)] hover:bg-[var(--button-hover)]"
                                        }`}
                                >
                                    {sort.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Coluna 3: Techs */}
                <div className="lg:col-span-4 space-y-4">
                    <label className="text-[11px] uppercase font-bold text-[var(--text-terceiro)] tracking-[0.2em] opacity-80 flex items-center gap-2">
                        <HiCode className="text-[var(--text-primary)]/40" /> {t("AdvancedFilters.tech")}
                    </label>
                    <div className="bg-[color-mix(in_srgb,var(--bg-primary)_30%,transparent)] rounded-2xl p-4 border border-[var(--border)] max-h-[220px] overflow-y-auto custom-scrollbar grid grid-cols-4 gap-3">
                        {availableTechs.map((tech) => {
                            const isActive = localFilters.techs.includes(tech.url);
                            return (
                                <button
                                    key={tech.url}
                                    onClick={() => handleTechToggle(tech.url)}
                                    className={`flex items-center justify-center p-2 rounded-xl border transition-all ${isActive
                                        ? "bg-[var(--text-primary)]/10 border-[var(--text-primary)]/40"
                                        : "bg-transparent border-transparent hover:bg-white/5"
                                        }`}
                                    title={t(tech.name!)}
                                >
                                    <img
                                        src={tech.url}
                                        alt={t(tech.name!)}
                                        className={`w-6 h-6 object-contain transition-all ${isActive ? "opacity-100 scale-110" : "opacity-40 grayscale group-hover:opacity-100"}`}
                                    />
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Modal>
    );
}
