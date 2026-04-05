import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { HiSearch, HiAdjustments, HiCalendar, HiClock, HiAcademicCap, HiCheckCircle, HiCollection, HiX, HiMap } from "react-icons/hi";

// Importação dos ícones das instituições para o filtro
import facens from '../../img/formacoes/facens.svg';
import etec from '../../img/formacoes/etec.svg';
import senai from '../../img/formacoes/senai.svg';
import interativa from '../../img/formacoes/interativa.svg';
import soulBilingue from '../../img/formacoes/soulBilingue.svg';
import ccbeu from '../../img/formacoes/ccbeu.svg';
import onebitcode from '../../img/formacoes/onebitcode.svg';
import alura from '../../img/formacoes/alura.svg';

interface AdvFilters {
    search: string;
    status: string[];
    modality: string[];
    schools: string[];
    sortBy: "newest" | "oldest" | "hours";
}

interface EducationAdvancedFiltersProps {
    isOpen: boolean;
    filters: AdvFilters;
    setFilters: (filters: AdvFilters) => void;
    activeCategory: string;
    onFilterCategory: (cat: string) => void;
    onClear: () => void;
}

const institutions = [
    { id: 'alura', name: 'Alura', icon: alura },
    { id: 'onebitcode', name: 'OneBitCode', icon: onebitcode },
    { id: 'facens', name: 'Facens', icon: facens },
    { id: 'etec', name: 'ETEC', icon: etec },
    { id: 'senai', name: 'SENAI', icon: senai },
    { id: 'ccbeu', name: 'CCBEU', icon: ccbeu },
    { id: 'soulBilingue', name: 'Soul Bilíngue', icon: soulBilingue },
    { id: 'interativa', name: 'Interativa', icon: interativa },
];

export default function EducationAdvancedFilters({
    isOpen,
    filters,
    setFilters,
    activeCategory,
    onFilterCategory,
    onClear
}: EducationAdvancedFiltersProps) {
    const { t } = useTranslation();

    const categories = [
        { key: "all", label: t("EducationFilter.all") },
        { key: "superior", label: t("EducationAdvancedFilters.superior") },
        { key: "tecnologia", label: t("EducationAdvancedFilters.tecnologia") },
        { key: "profissionalizante", label: t("EducationAdvancedFilters.profissionalizante") },
        { key: "idioma", label: t("EducationAdvancedFilters.idioma") },
        { key: "certificacao", label: t("EducationAdvancedFilters.certificacao") },
    ];

    const statusOptions = [
        { key: "Concluído", label: t("EducationAdvancedFilters.status_completed") },
        { key: "Cursando", label: t("EducationAdvancedFilters.status_in_progress") },
        { key: "Trancado", label: t("EducationAdvancedFilters.status_paused") },
    ];

    const modalityOptions = [
        { key: "Remoto", label: t("EducationAdvancedFilters.modality_remote") },
        { key: "Presencial", label: t("EducationAdvancedFilters.modality_onsite") },
        { key: "Híbrido", label: t("EducationAdvancedFilters.modality_hybrid") },
    ];

    const sortingOptions = [
        { key: "newest", label: t("EducationAdvancedFilters.sort_newest"), icon: <HiCalendar /> },
        { key: "oldest", label: t("EducationAdvancedFilters.sort_oldest"), icon: <HiCalendar /> },
        { key: "hours", label: t("EducationAdvancedFilters.sort_hours"), icon: <HiClock /> },
    ];

    const toggleFilter = (list: string[], item: string, key: keyof AdvFilters) => {
        const newList = list.includes(item)
            ? list.filter(i => i !== item)
            : [...list, item];
        setFilters({ ...filters, [key]: newList });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    className="overflow-hidden w-full max-w-6xl mx-auto mb-10 px-4"
                >
                    <div className="bg-[var(--bg-secondary-transparent)] border border-[var(--border)] rounded-[20px] p-8 relative overflow-hidden group font-inter shadow-lg">
                        <div className="absolute inset-0 bg-gradient-to-br from-[color-mix(in_srgb,var(--text-primary)_3%,transparent)] to-transparent pointer-events-none" />

                        <div className="relative z-10">
                            {/* Header */}
                            <div className="flex flex-row items-center justify-between mb-8 pb-4 border-b border-[color-mix(in_srgb,var(--text-primary)_5%,transparent)]">
                                <h3 className="text-[var(--text-primary)] font-bold text-xl lg:text-2xl flex items-center gap-3 font-inter">
                                    <div className="p-2 bg-[color-mix(in_srgb,var(--text-primary)_10%,transparent)] rounded-lg text-sm">
                                        <HiAdjustments />
                                    </div>
                                    <span className="tracking-tight">{t("EducationAdvancedFilters.title")}</span>
                                </h3>
                            </div>

                            {/* Main Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                                {/* Lado Esquerdo: Busca e Categorias */}
                                <div className="lg:col-span-4 space-y-6">
                                    <div className="space-y-4">
                                        <label className="text-[11px] uppercase font-bold text-[var(--text-terceiro)] tracking-[0.2em] opacity-80 flex items-center gap-2 mb-4">
                                            <HiSearch className="text-[var(--text-primary)]/40" /> {t("EducationAdvancedFilters.search_label")}
                                        </label>
                                        <div className="relative group/input">
                                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[color-mix(in_srgb,var(--text-terceiro)_60%,transparent)] group-focus-within/input:text-[var(--text-primary)] transition-colors">
                                                <HiSearch size={18} />
                                            </div>
                                            <input
                                                type="text"
                                                value={filters.search}
                                                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                                placeholder={t("EducationAdvancedFilters.search_placeholder")}
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
                                            <HiCollection className="text-[var(--text-primary)]/40" /> {t("EducationAdvancedFilters.type_label")}
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {categories.map((cat) => {
                                                const isActive = activeCategory === cat.key;
                                                return (
                                                    <button
                                                        key={cat.key}
                                                        onClick={() => onFilterCategory(cat.key)}
                                                        className={`px-3 py-2 rounded-lg text-[10px] font-bold transition-all border text-center uppercase tracking-wider font-inter ${isActive
                                                            ? "bg-[var(--text-primary)] text-[var(--bg-primary)] border-transparent shadow-[0_0_15px_color-mix(in_srgb,var(--text-primary)_30%,transparent)]"
                                                            : "bg-[var(--button-bg)] text-[var(--text-terceiro)] border-[color-mix(in_srgb,var(--text-primary)_5%,transparent)] hover:bg-[var(--button-hover)] hover:text-[var(--text-primary)]"
                                                            }`}
                                                    >
                                                        {cat.label}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                {/* Meio: Status e Ordenação */}
                                <div className="lg:col-span-3 space-y-6">
                                    <div className="space-y-4">
                                        <label className="text-[11px] uppercase font-bold text-[var(--text-terceiro)] tracking-[0.2em] opacity-80 flex items-center gap-2 mb-4">
                                            <HiCheckCircle className="text-[var(--text-primary)]/40" /> {t("EducationAdvancedFilters.status_label")}
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {statusOptions.map((opt) => {
                                                const isActive = filters.status.includes(opt.key);
                                                return (
                                                    <button
                                                        key={opt.key}
                                                        onClick={() => toggleFilter(filters.status, opt.key, "status")}
                                                        className={`px-3 py-2 rounded-lg text-[10px] font-bold transition-all border text-center uppercase tracking-wider font-inter ${isActive
                                                            ? "bg-[var(--text-primary)] text-[var(--bg-primary)] border-transparent shadow-[0_0_15px_color-mix(in_srgb,var(--text-primary)_30%,transparent)]"
                                                            : "bg-[var(--button-bg)] text(--text-terceiro)] border-[color-mix(in_srgb,var(--text-primary)_5%,transparent)] hover:bg-[var(--button-hover)] hover:text-[var(--text-primary)]"
                                                            }`}
                                                    >
                                                        {opt.label}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[11px] uppercase font-bold text-[var(--text-terceiro)] tracking-[0.2em] opacity-80 flex items-center gap-2 mb-4">
                                            <HiMap className="text-[var(--text-primary)]/40" /> {t("EducationAdvancedFilters.modality_label")}
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {modalityOptions.map((opt) => {
                                                const isActive = filters.modality.includes(opt.key);
                                                return (
                                                    <button
                                                        key={opt.key}
                                                        onClick={() => toggleFilter(filters.modality, opt.key, "modality")}
                                                        className={`px-3 py-2 rounded-lg text-[10px] font-bold transition-all border text-center uppercase tracking-wider font-inter ${isActive
                                                            ? "bg-[var(--text-primary)] text-[var(--bg-primary)] border-transparent shadow-[0_0_15px_color-mix(in_srgb,var(--text-primary)_30%,transparent)]"
                                                            : "bg-[var(--button-bg)] text-[var(--text-terceiro)] border-[color-mix(in_srgb,var(--text-primary)_5%,transparent)] hover:bg-[var(--button-hover)] hover:text-[var(--text-primary)]"
                                                            }`}
                                                    >
                                                        {opt.label}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[11px] uppercase font-bold text-[var(--text-terceiro)] tracking-[0.2em] opacity-80 flex items-center gap-2 mb-4">
                                            <HiAdjustments className="text-[var(--text-primary)]/40" /> {t("EducationAdvancedFilters.sort_label")}
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {sortingOptions.map((opt) => {
                                                const isActive = filters.sortBy === opt.key;
                                                return (
                                                    <button
                                                        key={opt.key}
                                                        onClick={() => setFilters({ ...filters, sortBy: opt.key as any })}
                                                        className={`px-3 py-2 rounded-lg text-[10px] font-bold transition-all border text-center uppercase tracking-wider font-inter ${isActive
                                                            ? "bg-[var(--text-primary)] text-[var(--bg-primary)] border-transparent shadow-[0_0_15px_color-mix(in_srgb,var(--text-primary)_30%,transparent)]"
                                                            : "bg-[var(--button-bg)] text-[var(--text-terceiro)] border-[color-mix(in_srgb,var(--text-primary)_5%,transparent)] hover:bg-[var(--button-hover)] hover:text-[var(--text-primary)]"
                                                            }`}
                                                    >
                                                        {opt.label}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                {/* Direita: Instituições */}
                                <div className="lg:col-span-5 space-y-4">
                                    <label className="text-[11px] uppercase font-bold text-[var(--text-terceiro)] tracking-[0.2em] opacity-80 flex items-center gap-2 mb-4">
                                        <HiAcademicCap className="text-[var(--text-primary)]/40" /> {t("EducationAdvancedFilters.school_label")}
                                    </label>
                                    <div
                                        className="bg-[color-mix(in_srgb,var(--bg-primary)_30%,transparent)] rounded-2xl p-4 sm:p-5 border border-[color-mix(in_srgb,var(--text-primary)_5%,transparent)] max-h-[220px] sm:max-h-[180px] overflow-y-auto custom-scrollbar-thin grid grid-cols-4 xs:grid-cols-5 sm:grid-cols-7 lg:grid-cols-6 gap-3 shadow-inner"
                                        data-lenis-prevent
                                    >
                                        {institutions.map((inst) => {
                                            const isActive = filters.schools.includes(inst.id);
                                            return (
                                                <button
                                                    key={inst.id}
                                                    onClick={() => toggleFilter(filters.schools, inst.id, "schools")}
                                                    className={`group relative flex items-center justify-center aspect-square p-2 sm:p-2.5 rounded-xl border transition-all duration-300 ${isActive
                                                        ? "bg-[color-mix(in_srgb,var(--text-primary)_15%,transparent)] border-[color-mix(in_srgb,var(--text-primary)_25%,transparent)]"
                                                        : "bg-transparent border-transparent hover:bg-[color-mix(in_srgb,var(--text-primary)_5%,transparent)]"
                                                        }`}
                                                    title={inst.name}
                                                >
                                                    <img
                                                        src={inst.icon}
                                                        alt={inst.name}
                                                        className={`w-7 h-7 sm:w-6 sm:h-6 lg:w-5.5 lg:h-5.5 object-contain transition-all duration-300 ${isActive
                                                            ? "opacity-100 scale-110 grayscale-0"
                                                            : "opacity-[0.35] grayscale-[0.8] group-hover:opacity-100 group-hover:grayscale-0"
                                                            }`}
                                                    />
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="mt-8 pt-6 border-t border-[color-mix(in_srgb,var(--text-primary)_5%,transparent)] flex justify-end">
                                <button
                                    onClick={onClear}
                                    className="text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--text-terceiro)] hover:text-[var(--text-primary)] transition-all px-6 py-3 rounded-xl border border-[color-mix(in_srgb,var(--text-primary)_10%,transparent)] hover:border-[color-mix(in_srgb,var(--text-primary)_20%,transparent)] bg-[var(--button-bg)] shadow-sm hover:shadow-md"
                                >
                                    {t("EducationAdvancedFilters.clear")}
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
