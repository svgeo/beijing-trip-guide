import React, { useEffect } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import heroImage from '../assets/beijing.jpg';

export default function Home() {
    useEffect(() => {
        AOS.init({ duration: 1500, once: true });
    }, []);

    return (
        <div className="relative h-screen text-white">
            {/* Background Image */}
            <img
                src={heroImage}
                alt="Beijing"
                className="w-full h-full object-cover absolute top-0 left-0 z-0"
            />

            {/* Overlay */}
            <div className="relative z-10 bg-black bg-opacity-60 h-full flex flex-col justify-center items-center text-center px-4">
                <h1
                    className="text-4xl md:text-6xl font-bold mb-4"
                    data-aos="fade-down"
                >
                    Welcome to Beijing
                </h1>

                <h2
                    className="text-xl md:text-2xl font-medium mb-6"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    <Typewriter
                        words={[
                            'Discover ancient wonders...',
                            'Explore vibrant street life...',
                            'Plan your unforgettable weekend.',
                        ]}
                        loop={true}
                        cursor
                        cursorStyle="_"
                        typeSpeed={70}
                        deleteSpeed={60}
                        delaySpeed={1200}
                    />
                </h2>

                <p
                    className="max-w-xl text-base md:text-lg leading-relaxed mb-8"
                    data-aos="fade-up"
                    data-aos-delay="400"
                >
                    Beijing blends history and modernity in an unforgettable cityscape — from the Great Wall to glowing night markets.
                </p>

                <Link to="/itinerary" data-aos="zoom-in" data-aos-delay="600">
                    <button className="bg-orange-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-orange-600 transition">
                        Start Planning
                    </button>
                </Link>
            </div>
        </div>
    );
}
