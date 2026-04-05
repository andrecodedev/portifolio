import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getSkillName } from "../../data/skillsData";
import { HiChevronDown } from "react-icons/hi";
import LikeButton from "./LikeButton";

interface ProjectModalProps {
    id: number;
    isOpen: boolean;
    onClose: () => void;
    title: string;
    imageUrl: string;
    description?: string;
    skills?: string[];
    repoUrl?: string;
    siteUrl?: string;
    labels?: string[];
    institution?: {
        name: string;
        logo: string;
        url: string;
    };
    challenge?: string;
    solution?: string;
    result?: string;
    date?: string;
}

export default function ProjectModal({ id, isOpen, onClose, title, imageUrl, description, skills, repoUrl, siteUrl, labels, institution, challenge, solution, result, date }: ProjectModalProps) {
    const { t } = useTranslation();
    const [openSection, setOpenSection] = useState<'challenge' | 'solution' | 'result' | null>(challenge ? 'challenge' : solution ? 'solution' : result ? 'result' : null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            // Reset do acordeão ao abrir
            setOpenSection(challenge ? 'challenge' : solution ? 'solution' : result ? 'result' : null);
        }
        else document.body.style.overflow = "";
        return () => { document.body.style.overflow = ""; };
    }, [isOpen, challenge, solution, result]);

    if (!isOpen) return null;

    const toggleSection = (section: 'challenge' | 'solution' | 'result') => {
        setOpenSection(openSection === section ? null : section);
    };

    const CaseStudyAccordion = (challenge || solution || result) && (
        <div className="mb-4 p-4 rounded-lg bg-[var(--text-primary)]/5 border border-[var(--text-primary)]/10 w-full">
            <h3 className="text-[var(--text-primary)] text-xs tracking-widest opacity-80 mb-3 font-semibold flex items-center gap-2">
                {t('ProjectModal.case_study_title')}
            </h3>
            <div className="border-t border-[var(--text-primary)]/10">
                {/* Accordion Items */}
                {[
                    { id: 'challenge', label: 'ProjectModal.challenge_label', content: challenge },
                    { id: 'solution', label: 'ProjectModal.solution_label', content: solution },
                    { id: 'result', label: 'ProjectModal.result_label', content: result }
                ].map((section) => (
                    section.content && (
                        <div key={section.id} className="border-b border-[var(--text-primary)]/10 last:border-b-0">
                            <button
                                onClick={() => toggleSection(section.id as any)}
                                className="w-full flex items-center justify-between py-2 text-left transition-all hover:opacity-80 group/btn"
                            >
                                <h4 className={`text-[10px] uppercase tracking-tighter font-bold transition-colors ${openSection === section.id ? 'text-[var(--text-primary)]' : 'text-[var(--text-terceiro)]'}`}>
                                    {t(section.label)}
                                </h4>
                                <HiChevronDown
                                    className={`transition-transform duration-300 ${openSection === section.id ? 'rotate-180 text-[var(--text-primary)]' : 'text-[var(--text-terceiro)]'}`}
                                    size={14}
                                />
                            </button>
                            <AnimatePresence>
                                {openSection === section.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        className="overflow-hidden"
                                    >
                                        <p className="pb-3 text-[11px] text-[var(--text-primary)]/90 leading-relaxed font-jet">
                                            {section.content.startsWith('t:') ? t(section.content.replace('t:', '')) : section.content}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )
                ))}
            </div>
        </div>
    );

    return createPortal(
        <div
            className="fixed inset-0 bg-black/70 flex justify-center z-[9999] p-4 overflow-y-auto"
            onClick={onClose}
        >
            <div
                className="bg-[var(--bg-secondary)] rounded-2xl shadow-xl p-6 w-full max-w-5xl my-auto flex flex-col md:flex-row gap-6 items-center"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Coluna da Imagem (Desktop) */}
                <div className="w-full md:w-1/2 flex flex-col gap-4">
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full object-contain rounded-lg select-none max-h-[40vh] md:max-h-[70vh]"
                    />
                    {/* Acordeão no Desktop: Fica embaixo da imagem */}
                    <div className="hidden md:block">
                        {CaseStudyAccordion}
                    </div>
                </div>

                {/* Informações do projeto */}
                <div className="flex-1 flex flex-col justify-center min-h-[300px] w-full">
                    <div className="flex justify-between items-start mb-2">
                        <h2 className="text-[var(--text-primary)] text-3xl font-bold flex-1">{title}</h2>
                        <LikeButton projectId={id} />
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {date && (
                            <span className="inline-block px-2 py-1 text-[10px] font-bold rounded-md border border-[var(--text-primary)]/30 bg-[var(--text-primary)]/10 text-[var(--text-primary)] uppercase tracking-widest whitespace-nowrap">
                                {date.split('-').reverse().join('/')}
                            </span>
                        )}
                        {labels?.map((lbl, idx) => (
                            <span key={idx} className="inline-block px-2 py-1 text-[10px] font-medium rounded-md border border-[var(--text-primary)]/20 bg-[var(--text-primary)]/5 text-[var(--text-primary)]/80 uppercase tracking-widest whitespace-nowrap">
                                {lbl.startsWith('t:') ? t(lbl.replace('t:', '')) : lbl}
                            </span>
                        ))}
                    </div>
                    <p className="text-[var(--text-primary)] text-sm mb-4">
                        {description?.startsWith('t:') ? t(description.replace('t:', '')) : description}
                    </p>

                    {/* Skills */}
                    {skills && skills.length > 0 && (
                        <div className="mb-4">
                            <h3 className="text-[var(--text-primary)] text-xs tracking-widest opacity-80 mb-3 font-semibold">
                                {t('ProjectModal.tech_title')}
                            </h3>
                            <div className="flex flex-wrap gap-3 select-none">
                                {skills.map((skill, idx) => {
                                    const name = getSkillName(skill);
                                    return (
                                        <div key={idx} className="tooltip-container group">
                                            <img
                                                src={skill}
                                                alt={name || "Skill"}
                                                className="w-7 h-7 sm:w-8 sm:h-8 transition-transform duration-300 group-hover:scale-110"
                                            />
                                            {name && <span className="tooltip-content">{t(name)}</span>}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Instituição / Referência */}
                    {institution && (
                        <div className="mb-3">
                            <h3 className="text-[var(--text-primary)] text-xs tracking-widest opacity-80 mb-3 font-semibold">
                                {t('ProjectModal.reference_title')}
                            </h3>
                            <div className="flex items-center gap-4 group/inst">
                                <a
                                    href={institution.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg transition-all duration-300"
                                >
                                    <img
                                        src={institution.logo}
                                        alt={t(institution.name)}
                                        className="w-full h-full object-contain select-none transition-transform duration-300 group-hover/inst:scale-110 rounded-lg"
                                    />
                                </a>
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-[var(--text-terceiro)] uppercase tracking-widest mb-0.5 font-bold opacity-60">
                                        {t('ProjectModal.representing')}
                                    </span>
                                    <a
                                        href={institution.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="relative text-sm font-bold text-[var(--text-primary)] group/link w-fit flex items-center gap-1.5"
                                    >
                                        <span>
                                            {institution.name.startsWith('t:') ? t(institution.name.replace('t:', '')) : institution.name}
                                        </span>
                                        <svg
                                            className="w-3 h-3 opacity-40 group-hover/link:opacity-100 transition-all duration-300 transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                        <span className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] bg-[var(--text-primary)] transition-all duration-300 ease-out group-hover/link:w-full" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Acordeão no Mobile: Fica onde já estava (após a descrição/skills) */}
                    <div className="block md:hidden">
                        {CaseStudyAccordion}
                    </div>

                    {/* Rodapé de Botões */}
                    <div className="flex gap-3 pt-4">
                        {repoUrl && (
                            <a
                                href={repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 px-4 py-2 bg-[var(--button-hover)] flex items-center justify-center cursor-pointer select-none text-[var(--text-primary)] rounded-lg hover:bg-[var(--button-active)] transition-all duration-300 border border-transparent hover:border-[var(--border-gray)] text-sm font-bold"
                            >
                                GitHub
                            </a>
                        )}
                        {siteUrl && (
                            <a
                                href={siteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 px-4 py-2 bg-[var(--button-hover)] flex items-center justify-center cursor-pointer select-none text-[var(--text-primary)] rounded-lg hover:bg-[var(--button-active)] transition-all duration-300 border border-transparent hover:border-[var(--border-gray)] text-sm font-bold"
                            >
                                {t('button.site')}
                            </a>
                        )}
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-2 bg-[var(--bg-elements)] flex items-center justify-center cursor-pointer select-none text-[var(--text-primary)] rounded-lg hover:bg-[var(--button-active)] transition-all duration-300 border border-[var(--border-gray)] hover:border-[var(--text-primary)]/30 text-sm font-bold"
                        >
                            {t('button.close')}
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}
