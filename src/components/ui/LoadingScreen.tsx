import React from 'react';

const LoadingScreen: React.FC = () => {
    return (
        <div className="fixed inset-0 z-[10000] bg-[var(--bg-primary)] flex flex-col items-center justify-center overflow-hidden">
            <div className="loading-grid-overlay absolute inset-0 opacity-[var(--grid-opacity)] pointer-events-none" />

            <div className="relative flex flex-col items-center z-10">
                <div className="text-xl font-jet text-[var(--text-primary)] mb-6 flex items-center gap-0 uppercase tracking-[0.4em] select-none">
                    Loading
                    <span className="animate-dot-1">.</span>
                    <span className="animate-dot-2">.</span>
                    <span className="animate-dot-3">.</span>
                </div>

            </div>

            <style>{`
                @keyframes dot1 { 0%, 20% { opacity: 0; } 25%, 80% { opacity: 1; } 85%, 100% { opacity: 0; } }
                @keyframes dot2 { 0%, 40% { opacity: 0; } 45%, 80% { opacity: 1; } 85%, 100% { opacity: 0; } }
                @keyframes dot3 { 0%, 60% { opacity: 0; } 65%, 80% { opacity: 1; } 85%, 100% { opacity: 0; } }

                .animate-dot-1 { animation: dot1 2s infinite; }
                .animate-dot-2 { animation: dot2 2s infinite; }
                .animate-dot-3 { animation: dot3 2s infinite; }

                @keyframes scan {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .animate-scan {
                    animation: scan 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
                }
            `}</style>
        </div>
    );
};

export default LoadingScreen;
