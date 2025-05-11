import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const allEvents = [
    { id: 1, name: "Beijing Opera Night", day: "Saturday", type: "Cultural" },
    { id: 2, name: "Wangfujing Street Food Festival", day: "Sunday", type: "Food" },
    { id: 3, name: "798 Art District Walkthrough", day: "Saturday", type: "Art" },
    { id: 4, name: "Temple Fair", day: "Sunday", type: "Cultural" },
    { id: 5, name: "Live Jazz at Blue Note", day: "Saturday", type: "Music" },
    { id: 6, name: "Beijing Tech Expo", day: "Sunday", type: "Tech" },
    { id: 7, name: "Chaoyang Park Carnival", day: "Friday", type: "Family" },
    { id: 8, name: "Traditional Tea Ceremony", day: "Sunday", type: "Cultural" },
    { id: 9, name: "Dumpling Making Workshop", day: "Saturday", type: "Food" },
    { id: 10, name: "Beijing Street Art Showcase", day: "Friday", type: "Art" },
    { id: 11, name: "Mandarin Calligraphy Intro", day: "Saturday", type: "Cultural" },
    { id: 12, name: "Outdoor Cinema Night", day: "Sunday", type: "Entertainment" }
];

const categories = ["All", "Cultural", "Food", "Art", "Music", "Tech", "Family", "Entertainment"];

export default function Events() {
    const username = localStorage.getItem("username") || "guest";
    const [savedEvents, setSavedEvents] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState("All");

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem(`events_${username}`)) || [];
        setSavedEvents(stored);
    }, [username]);

    const handleSave = (event) => {
        if (savedEvents.some(e => e.id === event.id)) {
            toast.error("Event already saved");
            return;
        }
        const updated = [...savedEvents, event];
        setSavedEvents(updated);
        localStorage.setItem(`events_${username}`, JSON.stringify(updated));
        toast.success(`Saved "${event.name}"`);
    };

    const handleRemove = (id) => {
        const updated = savedEvents.filter(e => e.id !== id);
        setSavedEvents(updated);
        localStorage.setItem(`events_${username}`, JSON.stringify(updated));
        toast.success("Removed event");
    };

    const filteredEvents = categoryFilter === "All"
        ? allEvents
        : allEvents.filter(event => event.type === categoryFilter);

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
            <Toaster />
            <h2 className="text-3xl font-bold text-orange-700 mb-6">Weekend Events</h2>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 mb-6">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setCategoryFilter(cat)}
                        className={`px-4 py-1 rounded-full text-sm ${categoryFilter === cat ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* All Events */}
            <div className="grid md:grid-cols-2 gap-4 mb-10">
                {filteredEvents.map((event) => (
                    <div key={event.id} className="border p-4 rounded bg-white shadow-sm">
                        <h3 className="text-xl font-semibold text-gray-800">{event.name}</h3>
                        <p className="text-gray-600">{event.day} – {event.type}</p>
                        <button
                            onClick={() => handleSave(event)}
                            className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                        >
                            Save to My Events
                        </button>
                    </div>
                ))}
            </div>

            {/* Saved Events */}
            {savedEvents.length > 0 && (
                <>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">My Saved Events</h3>
                    <div className="space-y-4">
                        {savedEvents.map(event => (
                            <div key={event.id} className="flex justify-between items-center p-3 bg-gray-100 rounded shadow-sm">
                                <div>
                                    <strong>{event.name}</strong>
                                    <span className="text-sm text-gray-500"> ({event.day} – {event.type})</span>
                                </div>
                                <button
                                    onClick={() => handleRemove(event.id)}
                                    className="text-red-500 hover:underline text-sm"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
