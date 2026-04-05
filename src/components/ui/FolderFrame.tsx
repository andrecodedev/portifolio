import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface FolderFrameProps {
    children: ReactNode;
}

export default function FolderFrame({ children }: FolderFrameProps) {
    return (
        <div className="relative w-full max-w-[95rem] mx-auto px-4 sm:px-6 mb-20 flex flex-col items-center">
            {/* Folder Tabs (Top & Bottom Center) */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[40%] h-20 bg-[#121212]/80 backdrop-blur-3xl border-t border-x border-white/10 rounded-t-[4rem] z-0 hidden sm:block" />
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[40%] h-20 bg-[#121212]/80 backdrop-blur-3xl border-b border-x border-white/10 rounded-b-[4rem] z-0 hidden sm:block" />

            {/* Main Folder Body */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
                className="relative w-full min-h-[500px] bg-[#121212]/80 backdrop-blur-3xl border border-white/10 rounded-[3rem] sm:rounded-[5rem] overflow-hidden shadow-2xl flex flex-col items-center pt-16 sm:pt-24 pb-16 sm:pb-24"
            >
                {/* Decorative Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)] pointer-events-none" />

                {/* Subtle Inner Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-black/40 pointer-events-none" />

                {/* Industrial Detailing - Corner Pixels/Bolts */}
                <div className="absolute top-10 left-10 w-2 h-2 bg-white/20 rounded-sm" />
                <div className="absolute top-10 right-10 w-2 h-2 bg-white/20 rounded-sm" />
                <div className="absolute bottom-10 left-10 w-2 h-2 bg-white/20 rounded-sm" />
                <div className="absolute bottom-10 right-10 w-2 h-2 bg-white/20 rounded-sm" />

                {/* Content Container */}
                <div className="relative z-10 w-full flex flex-col px-6 sm:px-16">
                    {children}
                </div>

                {/* Cyber HUD elements */}
                <div className="absolute top-1/2 -left-1 w-0.5 h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                <div className="absolute top-1/2 -right-1 w-0.5 h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            </motion.div>
        </div>
    );
}
