import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import forbiddenCity from '../assets/forbidden-city.jpg';
import greatWall from '../assets/great-wall.jpg';
import templeOfHeaven from '../assets/temple-of-heaven.jpg';
import summerPalace from '../assets/summer-palace.jpg';
import atmosphereBar from '../assets/atmosphere-bar.jpg';
import jingA from '../assets/jing-a.jpg';
import migas from '../assets/migas.jpg';
import trbHutong from '../assets/trb-hutong.jpg';
import pekingDuck from '../assets/peking-duck.jpg';
import mrShi from '../assets/mr-shi.jpg';

const destinations = {
    Structures: [
        { name: "Forbidden City", description: "A massive palace complex and symbol of imperial China.", price: 60, image: forbiddenCity },
        { name: "Great Wall", description: "An ancient wall stretching across northern China.", price: 100, image: greatWall },
        { name: "Temple of Heaven", description: "A Taoist temple known for prayer ceremonies.", price: 30, image: templeOfHeaven },
        { name: "Summer Palace", description: "A beautiful imperial garden and lakeside retreat.", price: 50, image: summerPalace }
    ],
    Bars: [
        { name: "Atmosphere Bar", description: "A luxury bar with stunning skyline views.", price: 80, image: atmosphereBar },
        { name: "Jing-A Taproom", description: "Craft beer and great local vibes.", price: 45, image: jingA },
        { name: "Migas Mercado", description: "Trendy rooftop bar with DJs and cocktails.", price: 70, image: migas }
    ],
    Restaurants: [
        { name: "TRB Hutong", description: "Elegant Western dining in a historic hutong.", price: 200, image: trbHutong },
        { name: "Peking Duck House", description: "Traditional Peking duck with a crispy finish.", price: 150, image: pekingDuck },
        { name: "Mr. Shi's Dumplings", description: "Locally loved for handmade dumplings.", price: 40, image: mrShi }
    ]
};

export default function Itinerary() {
    const [filter, setFilter] = useState("Structures");
    const [plan, setPlan] = useState([]);
    const [planName, setPlanName] = useState("");
    const [selectedLoad, setSelectedLoad] = useState("");
    const [savedNames, setSavedNames] = useState([]);
    const username = localStorage.getItem("username") || "guest";

    useEffect(() => {
        const saved = localStorage.getItem(`plans_${username}`);
        if (saved) {
            setSavedNames(Object.keys(JSON.parse(saved)));
        }
    }, [username]);

    const handleAdd = (place) => {
        if (!plan.some(item => item.name === place.name)) {
            setPlan([...plan, place]);
        }
    };

    const handleRemove = (place) => {
        setPlan(plan.filter(item => item.name !== place.name));
    };

    const handleClear = () => {
        setPlan([]);
        toast.success("Plan cleared.");
    };

    const saveNamedPlan = () => {
        if (!planName) return toast.error("Please enter a plan name.");
        const allPlans = JSON.parse(localStorage.getItem(`plans_${username}`)) || {};
        allPlans[planName] = plan;
        localStorage.setItem(`plans_${username}`, JSON.stringify(allPlans));
        setSavedNames(Object.keys(allPlans));
        setPlanName("");
        toast.success("Plan saved successfully!");
    };

    const loadNamedPlan = () => {
        const allPlans = JSON.parse(localStorage.getItem(`plans_${username}`)) || {};
        if (allPlans[selectedLoad]) {
            setPlan(allPlans[selectedLoad]);
            toast.success(`Loaded plan: ${selectedLoad}`);
        } else {
            toast.error("Plan not found.");
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
            <Toaster />
            <h2 className="text-3xl font-bold mb-6 text-orange-700">Itinerary Planner</h2>

            {/* Filters */}
            <div className="mb-6 space-x-4">
                {Object.keys(destinations).map((category) => (
                    <button
                        key={category}
                        onClick={() => setFilter(category)}
                        className={`px-4 py-2 rounded ${filter === category ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                {destinations[filter].map((place) => (
                    <div key={place.name} className="flex justify-between items-center bg-white border p-3 rounded shadow-sm">
                        <span>{place.name}</span>
                        <button
                            onClick={() => handleAdd(place)}
                            className="text-sm bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                            Add
                        </button>
                    </div>
                ))}
            </div>

            {/* Itinerary Plan */}
            <div className="border-t pt-6">
                <h3 className="text-xl font-semibold mb-4">Your Plan</h3>

                {plan.length === 0 ? (
                    <p className="text-gray-500">No items added yet.</p>
                ) : (
                    <div className="space-y-6">
                        {plan.map((item, index) => (
                            <div key={index} className="flex items-start space-x-4 relative">
                                <div className="flex flex-col items-center">
                                    <div className="w-3 h-3 bg-orange-500 rounded-full mt-2 z-10"></div>
                                    {index < plan.length - 1 && (
                                        <div className="w-px bg-orange-400 flex-1" style={{ minHeight: '100%' }}></div>
                                    )}
                                </div>
                                <div className="bg-gray-100 p-4 rounded shadow-md flex-1">
                                    <h4 className="text-lg font-bold text-orange-700 mb-1">{item.name}</h4>
                                    <p className="text-sm text-gray-700 mb-2">{item.description}</p>
                                    <p className="text-sm text-gray-600 font-medium">Estimated Cost: ¥{item.price}</p>
                                    {item.image && (
                                        <img src={item.image} alt={item.name} className="mt-2 w-full h-40 object-cover rounded" />
                                    )}
                                    <button
                                        onClick={() => handleRemove(item)}
                                        className="mt-3 text-red-600 hover:underline text-sm"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {plan.length > 0 && (
                    <button
                        onClick={handleClear}
                        className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Clear Plan
                    </button>
                )}
            </div>

            {/* Save + Load Named Plans */}
            <div className="mt-10 space-y-4">
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                    <input
                        type="text"
                        placeholder="Enter plan name"
                        value={planName}
                        onChange={(e) => setPlanName(e.target.value)}
                        className="border border-gray-300 p-2 rounded w-full md:w-1/2"
                    />
                    <button
                        onClick={saveNamedPlan}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Save Plan
                    </button>
                </div>

                {savedNames.length > 0 && (
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                        <select
                            value={selectedLoad}
                            onChange={(e) => setSelectedLoad(e.target.value)}
                            className="border border-gray-300 p-2 rounded w-full md:w-1/2"
                        >
                            <option value="">Select saved plan</option>
                            {savedNames.map((name) => (
                                <option key={name} value={name}>{name}</option>
                            ))}
                        </select>
                        <button
                            onClick={loadNamedPlan}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                            Load Plan
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
