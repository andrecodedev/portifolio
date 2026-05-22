import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { HiSearch, HiAdjustments, HiCalendar, HiClock, HiAcademicCap, HiCheckCircle, HiCollection, HiMap } from "react-icons/hi";
import Modal from "../ui/Modal";

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
    onClose: () => void;
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
    onClose,
    filters,
    setFilters,
    activeCategory,
    onFilterCategory,
    onClear
}: EducationAdvancedFiltersProps) {
    const { t } = useTranslation();
    
    // Estado local para permitir "Aplicar"
    const [localFilters, setLocalFilters] = useState<AdvFilters>(filters);
    const [localCategory, setLocalCategory] = useState(activeCategory);

    // Sincronizar quando abrir
    useEffect(() => {
        if (isOpen) {
            setLocalFilters(filters);
            setLocalCategory(activeCategory);
        }
    }, [isOpen, filters, activeCategory]);

    const handleApply = () => {
        setFilters(localFilters);
        onFilterCategory(localCategory);
        onClose();
    };

    const handleReset = () => {
        onClear();
        onClose();
    };

    const toggleFilter = (list: string[], item: string, key: keyof AdvFilters) => {
        const newList = list.includes(item)
            ? list.filter(i => i !== item)
            : [...list, item];
        setLocalFilters({ ...localFilters, [key]: newList });
    };

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

    const categories = [
        { key: "all", label: t("EducationFilter.all") },
        { key: "superior", label: t("EducationAdvancedFilters.superior") },
        { key: "tecnologia", label: t("EducationAdvancedFilters.tecnologia") },
        { key: "profissionalizante", label: t("EducationAdvancedFilters.profissionalizante") },
        { key: "idioma", label: t("EducationAdvancedFilters.idioma") },
        { key: "certificacao", label: t("EducationAdvancedFilters.certificacao") },
    ];

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={t("EducationAdvancedFilters.title")}
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
                {/* Lado Esquerdo: Busca e Categorias */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="space-y-4">
                        <label className="text-[11px] uppercase font-bold text-[var(--text-terceiro)] tracking-[0.2em] opacity-80 flex items-center gap-2">
                            <HiSearch className="text-[var(--text-primary)]/40" /> {t("EducationAdvancedFilters.search_label")}
                        </label>
                        <div className="relative group/input">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[color-mix(in_srgb,var(--text-terceiro)_60%,transparent)] group-focus-within/input:text-[var(--text-primary)] transition-colors">
                                <HiSearch size={18} />
                            </div>
                            <input
                                type="text"
                                value={localFilters.search}
                                onChange={(e) => setLocalFilters({ ...localFilters, search: e.target.value })}
                                placeholder={t("EducationAdvancedFilters.search_placeholder")}
                                className="w-full h-[54px] bg-[color-mix(in_srgb,var(--bg-primary)_70%,transparent)] border border-[color-mix(in_srgb,var(--text-primary)_12%,transparent)] rounded-2xl pl-11 pr-4 text-[12px] sm:text-[13px] text-[var(--text-primary)] placeholder:text-[color-mix(in_srgb,var(--text-terceiro)_70%,transparent)] focus:outline-none focus:border-[color-mix(in_srgb,var(--text-primary)_30%,transparent)] transition-all text-ellipsis"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-[11px] uppercase font-bold text-[var(--text-terceiro)] tracking-[0.2em] opacity-80 flex items-center gap-2">
                            <HiCollection className="text-[var(--text-primary)]/40" /> {t("EducationAdvancedFilters.type_label")}
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat) => {
                                const isActive = localCategory === cat.key;
                                return (
                                    <button
                                        key={cat.key}
                                        onClick={() => setLocalCategory(cat.key)}
                                        className={`px-3 py-2 rounded-lg text-[10px] font-bold transition-all border text-center uppercase tracking-wider ${isActive
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

                {/* Meio: Status e Ordenação */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="space-y-4">
                        <label className="text-[11px] uppercase font-bold text-[var(--text-terceiro)] tracking-[0.2em] opacity-80 flex items-center gap-2">
                            <HiCheckCircle className="text-[var(--text-primary)]/40" /> {t("EducationAdvancedFilters.status_label")}
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {statusOptions.map((opt) => {
                                const isActive = localFilters.status.includes(opt.key);
                                return (
                                    <button
                                        key={opt.key}
                                        onClick={() => toggleFilter(localFilters.status, opt.key, "status")}
                                        className={`px-3 py-2 rounded-lg text-[10px] font-bold transition-all border text-center uppercase tracking-wider ${isActive
                                            ? "bg-[var(--text-primary)] text-[var(--bg-primary)] border-transparent shadow-md"
                                            : "bg-[var(--button-bg)] text-[var(--text-terceiro)] border-[var(--border)] hover:bg-[var(--button-hover)]"
                                            }`}
                                    >
                                        {opt.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-[11px] uppercase font-bold text-[var(--text-terceiro)] tracking-[0.2em] opacity-80 flex items-center gap-2">
                            <HiMap className="text-[var(--text-primary)]/40" /> {t("EducationAdvancedFilters.modality_label")}
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {modalityOptions.map((opt) => {
                                const isActive = localFilters.modality.includes(opt.key);
                                return (
                                    <button
                                        key={opt.key}
                                        onClick={() => toggleFilter(localFilters.modality, opt.key, "modality")}
                                        className={`px-3 py-2 rounded-lg text-[10px] font-bold transition-all border text-center uppercase tracking-wider ${isActive
                                            ? "bg-[var(--text-primary)] text-[var(--bg-primary)] border-transparent shadow-md"
                                            : "bg-[var(--button-bg)] text-[var(--text-terceiro)] border-[var(--border)] hover:bg-[var(--button-hover)]"
                                            }`}
                                    >
                                        {opt.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Direita: Ordenação e Instituições */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="space-y-4">
                        <label className="text-[11px] uppercase font-bold text-[var(--text-terceiro)] tracking-[0.2em] opacity-80 flex items-center gap-2">
                            <HiAdjustments className="text-[var(--text-primary)]/40" /> {t("EducationAdvancedFilters.sort_label")}
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {sortingOptions.map((opt) => {
                                const isActive = localFilters.sortBy === opt.key;
                                return (
                                    <button
                                        key={opt.key}
                                        onClick={() => setLocalFilters({ ...localFilters, sortBy: opt.key as any })}
                                        className={`px-3 py-2 rounded-lg text-[10px] font-bold transition-all border text-center uppercase tracking-wider ${isActive
                                            ? "bg-[var(--text-primary)] text-[var(--bg-primary)] border-transparent shadow-md"
                                            : "bg-[var(--button-bg)] text-[var(--text-terceiro)] border-[var(--border)] hover:bg-[var(--button-hover)]"
                                            }`}
                                    >
                                        {opt.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-[11px] uppercase font-bold text-[var(--text-terceiro)] tracking-[0.2em] opacity-80 flex items-center gap-2">
                            <HiAcademicCap className="text-[var(--text-primary)]/40" /> {t("EducationAdvancedFilters.school_label")}
                        </label>
                        <div className="bg-[color-mix(in_srgb,var(--bg-primary)_30%,transparent)] rounded-2xl p-4 border border-[var(--border)] max-h-[160px] overflow-y-auto custom-scrollbar grid grid-cols-4 gap-3">
                            {institutions.map((inst) => {
                                const isActive = localFilters.schools.includes(inst.id);
                                return (
                                    <button
                                        key={inst.id}
                                        onClick={() => toggleFilter(localFilters.schools, inst.id, "schools")}
                                        className={`flex items-center justify-center p-2 rounded-xl border transition-all ${isActive
                                            ? "bg-[var(--text-primary)]/10 border-[var(--text-primary)]/40"
                                            : "bg-transparent border-transparent hover:bg-white/5"
                                            }`}
                                        title={inst.name}
                                    >
                                        <img
                                            src={inst.icon}
                                            alt={inst.name}
                                            className={`w-6 h-6 object-contain transition-all ${isActive ? "opacity-100 scale-110" : "opacity-40 grayscale group-hover:opacity-100"}`}
                                        />
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
