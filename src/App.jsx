import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Auth from './components/Auth';
import Itinerary from './components/Itinerary';
import Budget from './components/Budget';
import Events from './components/Events';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/itinerary" element={<Itinerary />} />
                <Route path="/budget" element={<Budget />} />
                <Route path="/events" element={<Events />} />
            </Routes>
        </Router>
    );
}

export default App;
