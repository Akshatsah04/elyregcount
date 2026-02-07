import React from 'react';
import { useSheetData } from '../hooks/useSheetData';
import BackgroundEffect from './BackgroundEffect';
import MainCounter from './MainCounter';
import EventCard from './EventCard';
import LiveFeed from './LiveFeed';

const Dashboard = () => {
    const { total, eventCounts, recentRegistrations, newRegistrationsCount } = useSheetData();

    return (
        <div className="min-h-screen w-full bg-[#0B0F1A] text-white relative overflow-x-hidden font-sans select-none">
            <BackgroundEffect />

            <div className="relative z-10 w-full min-h-screen md:h-screen p-4 md:p-12 flex flex-col md:flex-row gap-8">

                {/* LEFT COLUMN: COUNTERS */}
                <div className="flex-1 flex flex-col justify-between">

                    {/* Header */}
                    <header className="flex justify-between items-start">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-black tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                                ELYSIUM
                            </h1>
                            <p className="text-xs md:text-sm text-cyan-500 font-mono mt-1 tracking-widest animate-pulse">
                                LIVE REGISTRATION STATUS
                            </p>
                        </div>
                        <div className="text-right hidden md:block">
                            <p className="text-xs text-gray-500 font-mono">STATUS: ACTIVE</p>
                            <p className="text-xs text-gray-500 font-mono">SERVER: ONLINE</p>
                        </div>
                    </header>

                    {/* Main Counter */}
                    <div className="flex-1 flex items-center justify-center">
                        <MainCounter count={total} newRegistrations={newRegistrationsCount} />
                    </div>

                    {/* Bottom Event Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                        <EventCard id="Confluence" count={eventCounts.Confluence} />
                        <EventCard id="Swara" count={eventCounts.Swara} />
                        <EventCard id="DealRoom" count={eventCounts.DealRoom} />
                        <EventCard id="Herverdict" count={eventCounts.Herverdict} />
                    </div>
                </div>

                {/* RIGHT COLUMN: LIVE FEED */}
                <div className="w-full md:w-1/3 h-[30vh] md:h-full border-t md:border-t-0 md:border-l border-white/10 bg-black/20 backdrop-blur-sm rounded-xl">
                    <LiveFeed recentRegistrations={recentRegistrations} />
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
