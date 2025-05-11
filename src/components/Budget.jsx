import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function Budget() {
    const username = localStorage.getItem("username") || "guest";

    const [expenses, setExpenses] = useState({
        flight: '',
        hotel: '',
        food: '',
        transport: '',
        attractions: '',
        extra: ''
    });

    useEffect(() => {
        const saved = localStorage.getItem(`budget_${username}`);
        if (saved) setExpenses(JSON.parse(saved));
    }, [username]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExpenses((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const total = Object.values(expenses).reduce(
        (sum, val) => sum + (parseFloat(val) || 0), 0
    );

    const saveBudget = () => {
        localStorage.setItem(`budget_${username}`, JSON.stringify(expenses));
        toast.success("💾 Budget saved!");
    };

    const loadBudget = () => {
        const saved = localStorage.getItem(`budget_${username}`);
        if (saved) {
            setExpenses(JSON.parse(saved));
            toast.success("📂 Budget loaded!");
        } else {
            toast.error("⚠️ No saved budget found.");
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
            <Toaster />
            <h2 className="text-3xl font-bold text-orange-700 mb-2 text-center">Travel Budget Planner</h2>
            <p className="text-gray-600 mb-8 text-center">
                Estimate and track your major travel costs. All amounts are in Chinese Yuan (¥).
            </p>

            <div className="space-y-5">
                {[
                    { label: 'Flight Cost', name: 'flight' },
                    { label: 'Hotel Cost', name: 'hotel' },
                    { label: 'Food Cost', name: 'food' },
                    { label: 'Transport Cost', name: 'transport' },
                    { label: 'Attractions Cost', name: 'attractions' },
                    { label: 'Other / Emergency', name: 'extra' }
                ].map((field) => (
                    <div key={field.name}>
                        <label htmlFor={field.name} className="block mb-1 text-gray-700 font-medium">
                            {field.label}
                        </label>
                        <input
                            type="number"
                            id={field.name}
                            name={field.name}
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                            value={expenses[field.name]}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                ))}
            </div>

            <div className="mt-8 text-xl font-semibold text-gray-800 text-center">
                Total Estimated Cost: <span className="text-orange-600 font-bold">¥{total.toFixed(2)}</span>
            </div>

            <div className="mt-6 flex justify-center gap-4">
                <button
                    onClick={saveBudget}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Save Budget
                </button>
                <button
                    onClick={loadBudget}
                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                    Load Budget
                </button>
            </div>
        </div>
    );
}
