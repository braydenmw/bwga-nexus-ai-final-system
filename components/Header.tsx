import React, { useState } from 'react';
import type { View } from '../types.ts';
import { NexusLogo } from './Icons.tsx';
import { ORIGINAL_NAV_ITEMS } from '../constants.tsx';
import HowToUse from './HowToUse.tsx';

interface HeaderProps {
    currentView: View;
    onViewChange: (view: any) => void;
}

const NAV_ITEMS = ORIGINAL_NAV_ITEMS.filter(item => item.id !== 'technical-manual');

const NavLink: React.FC<{
    onClick: () => void;
    isActive: boolean;
    title: string;
}> = ({ onClick, isActive, title }) => (
    <button
        onClick={onClick}
        className={`relative font-semibold text-gray-600 hover:text-gray-900 transition-colors duration-300 ${isActive ? 'text-blue-600' : ''}`}
    >
        {title}
        {isActive && (
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full"></span>
        )}
    </button>
);

export const Header: React.FC<HeaderProps> = ({ currentView, onViewChange }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showHowToUse, setShowHowToUse] = useState(false);

    const handleNavClick = (view: View) => {
        onViewChange(view);
        setMobileMenuOpen(false);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo Section */}
                    <div
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={() => handleNavClick('who-we-are')}
                    >
                        <div className="flex flex-col">
                            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                                BW Nexus AI
                            </h1>
                            <p className="text-xs text-gray-600 leading-tight">A BW Global Advisory Initiative</p>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {NAV_ITEMS.map((item) => (
                            <NavLink
                                key={item.id}
                                onClick={() => handleNavClick(item.id)}
                                isActive={currentView === item.id}
                                title={item.title}
                            />
                        ))}
                    </nav>

                    {/* Help Button, Contact Button & Mobile Menu Toggle */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setShowHowToUse(true)}
                            className="hidden lg:flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-300"
                            aria-label="Help and How to Use guide"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Help
                        </button>
                        <button className="hidden lg:block bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                            Contact Us
                        </button>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
                            aria-label="Toggle mobile menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
                <div className="lg:hidden bg-white border-t border-gray-200">
                    <nav className="flex flex-col items-center gap-4 p-4">
                        {NAV_ITEMS.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleNavClick(item.id)}
                                className={`w-full text-left font-semibold p-3 rounded-md ${
                                    currentView === item.id
                                        ? 'bg-blue-100 text-blue-600'
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                {item.title}
                            </button>
                        ))}
                        <button
                            onClick={() => setShowHowToUse(true)}
                            className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-300 mt-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Help & How to Use
                        </button>
                        <button className="w-full bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 mt-2">
                            Contact Us
                        </button>
                    </nav>
                </div>
            )}

            {/* How to Use Modal */}
            {showHowToUse && (
                <HowToUse
                    isModal={true}
                    onClose={() => setShowHowToUse(false)}
                />
            )}
        </header>
    );
};