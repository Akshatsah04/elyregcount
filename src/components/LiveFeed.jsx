import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LiveFeed = ({ recentRegistrations }) => {
    return (
        <div className="w-full h-full flex flex-col p-6 overflow-hidden">
            <h2 className="text-white/50 text-xs font-mono uppercase tracking-[0.3em] mb-6 border-b border-white/10 pb-2">
                Recently Joined
            </h2>

            <div className="flex-1 flex flex-col gap-3 overflow-hidden mask-fade-bottom">
                <AnimatePresence initial={false}>
                    {recentRegistrations.map((reg, index) => (
                        <motion.div
                            key={`${reg.name}-${index}`} // Composite key needed if IDs missing
                            initial={{ opacity: 0, x: 50, height: 0 }}
                            animate={{ opacity: 1, x: 0, height: 'auto' }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="bg-white/5 border-l-2 border-white/20 p-4 rounded-r-lg hover:bg-white/10 transition-colors"
                        >
                            <div className="flex justify-between items-center">
                                <span className="text-white font-bold tracking-wide truncate max-w-[70%]">
                                    {reg.name}
                                </span>
                                <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded bg-black/30 border border-white/5 text-${getEventColor(reg.event)}`}>
                                    {reg.event}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

const getEventColor = (event) => {
    switch (event) {
        case 'Confluence': return 'cyan-400';
        case 'Swara': return 'yellow-400';
        case 'DealRoom': return 'blue-400';
        case 'Herverdict': return 'fuchsia-400';
        default: return 'gray-400';
    }
}

export default LiveFeed;
