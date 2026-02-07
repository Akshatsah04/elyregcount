import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Brain, Music, Zap, Mic } from 'lucide-react';
import clsx from 'clsx';
import gsap from 'gsap';

const EventCard = ({ id, count }) => {
    const numberRef = useRef(null);
    const cardRef = useRef(null);

    const config = {
        Confluence: { icon: Brain, color: 'text-cyan-400', border: 'border-cyan-500/30', bg: 'bg-cyan-900/20' },
        Swara: { icon: Music, color: 'text-yellow-400', border: 'border-yellow-500/30', bg: 'bg-yellow-900/20' },
        DealRoom: { icon: Zap, color: 'text-blue-500', border: 'border-blue-500/30', bg: 'bg-blue-900/20' },
        Herverdict: { icon: Mic, color: 'text-fuchsia-500', border: 'border-fuchsia-500/30', bg: 'bg-fuchsia-900/20' }
    };

    const { icon: Icon, color, border, bg } = config[id] || { icon: Zap, color: 'text-white', border: 'border-white/30', bg: 'bg-white/10' };

    useEffect(() => {
        if (numberRef.current) {
            gsap.to(numberRef.current, {
                textContent: count,
                duration: 1.5,
                ease: "power2.out",
                snap: { textContent: 1 },
                onUpdate: function () {
                    this.targets()[0].innerHTML = Math.ceil(this.targets()[0].textContent);
                }
            });

            // Pulse card on update
            gsap.fromTo(cardRef.current,
                { scale: 1 },
                { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1 }
            );
        }
    }, [count]);

    return (
        <div
            ref={cardRef}
            className={clsx(
                "relative flex flex-col items-center justify-center p-6 rounded-2xl border backdrop-blur-md transition-all duration-300 w-full md:w-48 h-32 md:h-48 shadow-lg",
                border, bg
            )}
        >
            <div className={clsx("absolute top-3 right-3 opacity-50", color)}>
                <Icon size={24} />
            </div>

            <h3 className={clsx("text-sm uppercase tracking-widest font-bold mb-2 opacity-80", color)}>{id}</h3>

            <span
                ref={numberRef}
                className="text-4xl md:text-5xl font-black text-white tabular-nums drop-shadow-md"
            >
                0
            </span>

            <div className={clsx("w-full h-1 mt-4 rounded-full opacity-30", color.replace('text-', 'bg-'))} />
        </div>
    );
};

export default EventCard;
