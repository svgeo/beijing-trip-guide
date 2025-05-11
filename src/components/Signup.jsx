import React from 'react';

export default function Signup() {
    return (
        <div className="p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
            <form className="space-y-4">
                <input type="text" placeholder="Name" className="w-full p-2 border rounded" />
                <input type="email" placeholder="Email" className="w-full p-2 border rounded" />
                <input type="password" placeholder="Password" className="w-full p-2 border rounded" />
                <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
                    Submit
                </button>
            </form>
        </div>
    );
}
