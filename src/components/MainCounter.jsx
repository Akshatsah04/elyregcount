import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';

const MainCounter = ({ count, newRegistrations }) => {
    const numberRef = useRef(null);
    const ringRef = useRef(null);
    const prevCount = useRef(0);

    useEffect(() => {
        // Animate Number
        gsap.to(numberRef.current, {
            textContent: count,
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            onUpdate: function () {
                this.targets()[0].innerHTML = Math.ceil(this.targets()[0].textContent);
            }
        });

        // Pulse Effect on New Registrations
        if (newRegistrations > 0) {
            gsap.fromTo(ringRef.current,
                { scale: 1, boxShadow: "0 0 20px rgba(6,182,212,0.2)" },
                {
                    scale: 1.05,
                    boxShadow: "0 0 80px rgba(6,182,212,0.6)",
                    duration: 0.5,
                    yoyo: true,
                    repeat: 1
                }
            );
        }

        prevCount.current = count;
    }, [count, newRegistrations]);

    return (
        <div className="relative flex flex-col items-center justify-center p-12">
            {/* Outer Rotating Glow Ring */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-cyan-500/10 border-t-cyan-500/30 w-[400px] h-[400px] md:w-[500px] md:h-[500px]"
            />

            {/* Inner Rotating Ring (Reverse) */}
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 m-auto rounded-full border border-cyan-500/10 border-b-cyan-500/30 w-[350px] h-[350px] md:w-[450px] md:h-[450px]"
            />

            {/* Main Circle Container */}
            <div
                ref={ringRef}
                className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-black/40 backdrop-blur-sm border-2 border-cyan-500/50 flex flex-col items-center justify-center relative shadow-[0_0_40px_rgba(6,182,212,0.1)] transition-shadow duration-500"
            >
                {/* Floating "New" Badge */}
                {newRegistrations > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: -50 }}
                        exit={{ opacity: 0 }}
                        className="absolute text-cyan-400 font-bold text-xl tracking-widest uppercase drop-shadow-[0_0_10px_cyan]"
                    >
                        +{newRegistrations} New
                    </motion.div>
                )}

                <span
                    ref={numberRef}
                    className="text-8xl md:text-[10rem] font-black text-white tabular-nums leading-none tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                >
                    0
                </span>

                <span className="text-cyan-400 tracking-[0.5em] uppercase text-sm md:text-base mt-4 font-semibold">
                    Registrations
                </span>
            </div>
        </div>
    );
};

export default MainCounter;
