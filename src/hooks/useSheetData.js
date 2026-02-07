import { useState, useEffect, useRef } from 'react';

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const SHEET_ID = import.meta.env.VITE_SHEET_ID;
const SHEET_NAME = "Form responses 1";

export const useSheetData = () => {
    const [data, setData] = useState({
        total: 0,
        eventCounts: {
            Confluence: 0,
            Swara: 0,
            DealRoom: 0,
            Herverdict: 0
        },
        recentRegistrations: [],
        newRegistrationsCount: 0
    });

    const previousTotalRef = useRef(0);

    const fetchData = async () => {
        try {
            const endpoint = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(SHEET_NAME)}?key=${API_KEY}`;
            const response = await fetch(endpoint);
            const result = await response.json();

            const rows = result.values?.slice(1) || []; // Remove header
            const FAKE_OFFSET = 50;
            const total = rows.length + FAKE_OFFSET;

            // Calculate Event Counts
            const eventCounts = {
                Confluence: 52,
                Swara: 33,
                DealRoom: 57,
                Herverdict: 35
            };

            // Assuming Structure: [Timestamp, Name, Event] -> Index 2 is Event
            rows.forEach(row => {
                const event = row[2];
                // Normalize string matching just in case
                if (event && eventCounts.hasOwnProperty(event)) {
                    eventCounts[event]++;
                }
            });

            // Recent Registrations (Last 10)
            const recentRegistrations = rows.slice(-10).reverse().map(row => ({
                name: row[1] || "Anonymous",
                event: row[2] || "General"
            }));

            // New Registrations Detection
            const newCount = total > previousTotalRef.current ? total - previousTotalRef.current : 0;
            previousTotalRef.current = total;

            setData({
                total,
                eventCounts,
                recentRegistrations,
                newRegistrationsCount: newCount
            });

        } catch (error) {
            console.error("Error fetching sheet data:", error);
        }
    };

    useEffect(() => {
        fetchData(); // Initial Fetch
        const interval = setInterval(fetchData, 10000); // Poll every 10s
        return () => clearInterval(interval);
    }, []);

    return data;
};
