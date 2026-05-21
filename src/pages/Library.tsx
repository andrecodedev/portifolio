import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiMaximize2, FiCopy, FiCheck, FiChevronRight, FiMenu, FiX, FiCode, FiGitBranch, FiLayout, FiBox, FiArrowLeft } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { libraryData } from '../data/libraryData';
import type { LibraryItemData } from '../data/libraryData';

const Library = () => {
    // Wiki states
    const categories = Array.from(new Set(libraryData.map(p => p.category)));
    const [view, setView] = useState<'selection' | 'docs'>('selection');
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [activeItem, setActiveItem] = useState<LibraryItemData | null>(null);
    const [content, setContent] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isZoomed, setIsZoomed] = useState<string | null>(null);
    const [copiedContent, setCopiedContent] = useState<string | null>(null);

    // Icon Mapping
    const categoryIcons: Record<string, any> = {
        'GIT': <FiGitBranch size={32} />,
        'JAVASCRIPT': <FiCode size={32} />,
        'CSS': <FiLayout size={32} />,
        'HTML': <FiBox size={32} />,
    };

    // Load first item of category
    useEffect(() => {
        if (activeCategory) {
            const firstItem = libraryData.find(p => p.category === activeCategory);
            if (firstItem) setActiveItem(firstItem);
        }
    }, [activeCategory]);

    // Load Markdown Content
    useEffect(() => {
        const loadMarkdown = async () => {
            if (!activeItem) return;
            try {
                const modules = import.meta.glob('../content/biblioteca/**/*.md', { query: '?raw', import: 'default' });
                const path = `../content/biblioteca/${activeItem.category}/${activeItem.slug}.md`;
                
                if (modules[path]) {
                    const mdContent = await modules[path]();
                    setContent(mdContent as string);
                } else {
                    setContent(`# 🚧 Under Construction\n\nThis guide for ${activeItem.title} is being written.`);
                }
            } catch (error) {
                console.error('Library Error:', error);
            }
        };
        loadMarkdown();
    }, [activeItem]);

    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopiedContent(code);
        setTimeout(() => setCopiedContent(null), 2000);
    };

    const MarkdownComponents = {
        code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            const codeString = String(children).replace(/\n$/, '');
            return !inline && match ? (
                <div className="relative group/code my-8 rounded-sm border border-[var(--border)] bg-[var(--bg-secondary)] overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10 font-mono text-[9px] uppercase tracking-widest text-[var(--text-terceiro)]">
                        <span>{match[1]}</span>
                        <button onClick={() => handleCopy(codeString)} className="hover:text-[var(--text-primary)] transition-colors">
                            {copiedContent === codeString ? <FiCheck className="text-green-500" /> : <FiCopy />}
                        </button>
                    </div>
                    <SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div" customStyle={{ margin: 0, padding: '1.5rem', fontSize: '13px', background: 'transparent' }} {...props}>
                        {codeString}
                    </SyntaxHighlighter>
                </div>
            ) : (
                <code className="bg-white/10 px-1.5 py-0.5 rounded font-mono text-[13px]" {...props}>{children}</code>
            );
        },
        img({ src, alt }: any) {
            return (
                <div className="relative my-10 cursor-zoom-in group border border-[var(--border)] rounded overflow-hidden shadow-2xl" onClick={() => setIsZoomed(src)}>
                    <img src={src} alt={alt} className="w-full" />
                    <div className="absolute top-4 right-4 p-2 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><FiMaximize2 /></div>
                </div>
            );
        }
    };

    return (
        <div className="geral">
            <Header hasBackground={view === 'docs'} />

            <AnimatePresence mode="wait">
                {view === 'selection' ? (
                    /* VIEW 1: CATEGORY SELECTION */
                    <motion.main 
                        key="selection"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="min-h-screen pt-40 pb-20 px-6 max-w-7xl mx-auto"
                    >
                        <div className="text-center mb-24">
                            <h1 className="section-title text-5xl sm:text-5xl md:text-6xl lg:text-[4rem] mb-1 mt-1 pb-2 font-extrabold bg-gradient-to-r from-[var(--primary-linear-gradient)] to-[var(--text-gray-linear-gradient)] bg-clip-text text-transparent relative inline-block select-none">
                                KNOWLEDGE BASE
                            </h1>
                            <div className="w-24 h-0.5 bg-[var(--text-primary)] mx-auto mb-10 opacity-30" />
                            <p className="text-[var(--text-terceiro)] font-mono text-[10px] uppercase tracking-[0.5em] opacity-40">
                                TECHNICAL_VAULT_v3.2
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => {
                                        setActiveCategory(cat);
                                        setView('docs');
                                    }}
                                    className="relative h-80 border border-[var(--border)] bg-[var(--bg-secondary)] flex flex-col items-center justify-center gap-6 group hover:border-[var(--text-primary)] transition-all overflow-hidden"
                                >
                                    <div className="text-[var(--text-terceiro)] group-hover:text-[var(--text-primary)] transition-colors duration-500 transform group-hover:-translate-y-2">
                                        {categoryIcons[cat] || <FiCode size={32} />}
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <span className="text-xl font-bold font-jet tracking-tighter text-[var(--text-primary)] uppercase">
                                            {cat}
                                        </span>
                                        <span className="text-[9px] font-mono text-[var(--text-terceiro)] opacity-40 uppercase tracking-widest mt-1">
                                            Module Explorer
                                        </span>
                                    </div>
                                    
                                    {/* HUD Corners */}
                                    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[var(--border)] group-hover:border-[var(--text-primary)] transition-colors" />
                                    <div className="absolute border-[var(--border)] group-hover:border-[var(--text-primary)] transition-colors border-b border-r bottom-0 right-0 w-3 h-3" />
                                </button>
                            ))}
                        </div>
                    </motion.main>
                ) : (
                    /* VIEW 2: DOCUMENTATION MODE (STICKY NAVIGATION) */
                    <motion.div 
                        key="docs"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col min-h-screen pt-[56px] md:pt-[64px]"
                    >
                        {/* CATEGORY BAR (FIXED) */}
                        <div className="sticky top-[56px] md:top-[64px] z-[100] w-full bg-[var(--bg-secondary-transparent)] backdrop-blur-md border-b border-[var(--border)] py-3 px-6">
                            <div className="mx-auto flex items-center justify-between gap-8">
                                <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
                                    <button 
                                        onClick={() => setView('selection')}
                                        className="flex items-center gap-2 text-[var(--text-terceiro)] hover:text-[var(--text-primary)] transition-colors font-mono text-[10px] uppercase tracking-[0.2em] whitespace-nowrap"
                                    >
                                        <FiArrowLeft size={16} /> BACK
                                    </button>
                                    <div className="h-4 w-[1px] bg-[var(--border)] flex-shrink-0" />
                                    {categories.map(cat => (
                                        <button 
                                            key={cat}
                                            onClick={() => setActiveCategory(cat)}
                                            className={`font-mono text-[10px] uppercase tracking-widest transition-all whitespace-nowrap ${
                                                activeCategory === cat 
                                                ? 'text-[var(--text-primary)] relative after:content-[""] after:absolute after:-bottom-[13px] after:left-0 after:w-full after:h-[2px] after:bg-[var(--text-primary)]' 
                                                : 'text-[var(--text-terceiro)] hover:text-[var(--text-primary)] opacity-40'
                                            }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>

                                <button 
                                    onClick={() => setIsSidebarOpen(true)} 
                                    className="md:hidden flex items-center gap-2 text-[10px] font-mono bg-white/5 border border-white/10 px-4 py-2 rounded-sm uppercase tracking-widest text-[var(--text-primary)] whitespace-nowrap"
                                >
                                    <FiMenu /> {activeCategory}
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 flex w-full relative">
                            {/* MOBILE OVERLAY */}
                            <AnimatePresence>
                                {isSidebarOpen && (
                                    <motion.div 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onClick={() => setIsSidebarOpen(false)}
                                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[2000] md:hidden"
                                    />
                                )}
                            </AnimatePresence>

                            {/* TOPIC SIDEBAR (STICKY) */}
                            <aside className={`
                                fixed md:sticky top-0 md:top-[105px] left-0 h-screen md:h-[calc(100vh-105px)]
                                w-72 md:w-80 border-r border-[var(--border)] bg-[var(--bg-primary)] md:bg-[var(--bg-secondary-transparent)] 
                                backdrop-blur-xl transition-transform duration-300 z-[2001] md:z-50
                                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                            `}>
                                <div className="p-6 md:p-10 overflow-y-auto h-full custom-scrollbar-thin">
                                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--border)] md:hidden">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-[var(--text-terceiro)]">Library</span>
                                            <span className="text-sm font-bold font-jet text-[var(--text-primary)] uppercase">{activeCategory}</span>
                                        </div>
                                        <button onClick={() => setIsSidebarOpen(false)} className="text-[var(--text-primary)] hover:rotate-90 transition-transform"><FiX size={24} /></button>
                                    </div>
                                    <div className="hidden md:block mb-10 pb-4 border-b border-[var(--border)]">
                                        <h2 className="text-[10px] font-mono uppercase tracking-[0.4em] text-[var(--text-primary)] font-bold">
                                            {activeCategory} INDEX
                                        </h2>
                                    </div>
                                    <nav className="flex flex-col space-y-1">
                                        {libraryData.filter(p => p.category === activeCategory).map(item => (
                                            <button
                                                key={item.id}
                                                onClick={() => {
                                                    setActiveItem(item);
                                                    if (window.innerWidth < 768) setIsSidebarOpen(false);
                                                }}
                                                className={`text-left px-5 py-4 text-[10px] font-mono transition-all border-l-2 uppercase tracking-tight leading-none ${
                                                activeItem?.id === item.id 
                                                    ? 'border-[var(--text-primary)] text-[var(--text-primary)] bg-white/10 font-bold pl-8 shadow-[inset_0_0_15px_rgba(255,255,255,0.05)]' 
                                                    : 'border-transparent text-[var(--text-terceiro)] hover:text-[var(--text-primary)] hover:pl-7 hover:bg-white/5'
                                                }`}
                                            >
                                                {item.title}
                                            </button>
                                        ))}
                                    </nav>
                                </div>
                            </aside>

                            {/* CONTENT AREA (SCROLLABLE) */}
                            <article className="flex-1 p-10 md:p-20 min-w-0">
                                <div className="max-w-4xl mx-auto">
                                    {/* Mobile menu trigger removed from here and moved to sticky bar */}


                                    {activeItem && (
                                        <motion.div
                                            key={activeItem.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        >
                                            <div className="flex items-center gap-4 mb-10 text-[9px] font-mono uppercase tracking-[0.3em] opacity-30">
                                                <span>{activeCategory}</span>
                                                <FiChevronRight size={12} />
                                                <span className="text-[var(--text-primary)] opacity-100">{activeItem.title}</span>
                                            </div>

                                            <h1 className="section-title text-4xl md:text-5xl lg:text-[3rem] mb-1 mt-1 pb-2 font-extrabold bg-gradient-to-r from-[var(--primary-linear-gradient)] to-[var(--text-gray-linear-gradient)] bg-clip-text text-transparent relative inline-block select-none overflow-visible">
                                                {activeItem.title}
                                            </h1>
                                            
                                            <div className="markdown-content prose prose-invert max-w-none
                                                prose-h2:text-3xl prose-h2:font-black prose-h2:uppercase prose-h2:mt-16 prose-h2:mb-8
                                                prose-h2:border-l-[6px] prose-h2:border-[var(--text-primary)] prose-h2:pl-8 prose-h2:font-jet
                                                prose-p:text-xl prose-p:text-[var(--text-terceiro)] prose-p:leading-relaxed prose-p:mb-8
                                                prose-strong:text-[var(--text-primary)] prose-strong:font-black
                                                prose-li:text-lg prose-li:text-[var(--text-terceiro)]
                                                prose-hr:border-[var(--border)] prose-hr:my-16
                                            ">
                                                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={MarkdownComponents}>
                                                    {content}
                                                </ReactMarkdown>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            </article>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ZOOM OVERLAY */}
            <AnimatePresence>
                {isZoomed && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsZoomed(null)} className="fixed inset-0 z-[20000] bg-black/98 flex items-center justify-center p-12 cursor-zoom-out">
                        <motion.img initial={{ scale: 0.9 }} animate={{ scale: 1 }} src={isZoomed} className="max-w-full max-h-full rounded-sm" />
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer hasBackground={view === 'docs'} />
        </div>
    );
};

export default Library;
