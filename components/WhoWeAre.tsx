import React from 'react';
import { BlueprintIcon, LightbulbIcon, TargetIcon, GlobeIcon, UsersIcon, PuzzleIcon, DataProfessionalIcon, RegionalDevelopmentIcon, NexusLogo } from './Icons.tsx';

interface WhoWeAreProps {
    onViewChange: (view: string) => void;
}

// Professional box component with modern styling
const InfoBox: React.FC<{
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    icon?: React.ReactNode;
    className?: string;
    variant?: 'primary' | 'secondary' | 'accent';
}> = ({ title, subtitle, children, icon, className = '', variant = 'primary' }) => {
    const variants = {
        primary: 'bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700',
        secondary: 'bg-gradient-to-br from-blue-900 to-blue-800 border-blue-700',
        accent: 'bg-gradient-to-br from-cyan-900 to-cyan-800 border-cyan-700'
    };

    return (
        <div className={`rounded-xl border-2 p-8 shadow-2xl ${variants[variant]} ${className}`}>
            {icon && <div className="flex justify-center mb-6">{icon}</div>}
            <div className="text-center">
                {subtitle && (
                    <p className="text-sm font-semibold uppercase tracking-wider text-cyan-400 mb-2">
                        {subtitle}
                    </p>
                )}
                <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
                <div className="text-slate-300 leading-relaxed">{children}</div>
            </div>
        </div>
    );
};

const WhoWeAre: React.FC<WhoWeAreProps> = ({ onViewChange }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            {/* Header */}
            <header className="relative py-20 px-4 text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 to-blue-900/20"></div>
                <div className="relative z-10 max-w-6xl mx-auto">
                    <div className="flex justify-center mb-8">
                        <NexusLogo className="w-24 h-24 text-cyan-400" />
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-cyan-400 mb-6 leading-tight">
                        BWGA NEXUS AI
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-8">
                        Brayden Walls Global Advisory - World-First Intelligence Platform for Regional Development
                    </p>
                    <div className="inline-block bg-gradient-to-r from-cyan-600 to-blue-600 px-8 py-3 rounded-full">
                        <p className="text-white font-semibold">Bridging the Early Gap in Regional Intelligence</p>
                    </div>
                </div>
            </header>

            {/* Main Content Grid */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">

                    {/* BWGA Identity Box */}
                    <InfoBox
                        title="BWGA Global Advisory"
                        subtitle="Australian Business Number"
                        variant="primary"
                        icon={<div className="text-6xl">🏢</div>}
                    >
                        <p className="text-lg font-semibold text-cyan-400 mb-4">ABN 55 978 113 300</p>
                        <p className="mb-4">Independent developer and strategist specializing in regional economic intelligence and sustainable growth solutions.</p>
                        <p className="text-sm italic">Founded by Brayden Walls - Bridging the gap between data and actionable regional development strategies.</p>
                    </InfoBox>

                    {/* World-First System Box */}
                    <InfoBox
                        title="World-First Technology"
                        subtitle="Revolutionary Intelligence Platform"
                        variant="accent"
                        icon={<PuzzleIcon className="w-16 h-16 text-cyan-400" />}
                    >
                        <p className="text-lg font-semibold text-cyan-400 mb-4">Breaking New Ground</p>
                        <p className="mb-4">The first AI-powered platform specifically designed to bridge the critical intelligence gap in regional development planning.</p>
                        <p className="text-sm">Combines live economic data, AI analysis, and proprietary intelligence frameworks to provide unprecedented clarity for decision-makers.</p>
                    </InfoBox>

                    {/* What Was Built Box */}
                    <InfoBox
                        title="What Was Built"
                        subtitle="Complete Intelligence Ecosystem"
                        variant="secondary"
                        icon={<BlueprintIcon className="w-16 h-16 text-cyan-400" />}
                    >
                        <ul className="text-left space-y-3">
                            <li className="flex items-start gap-3">
                                <span className="text-cyan-400 mt-1">•</span>
                                <div>
                                    <strong className="text-white">Nexus Brain:</strong>
                                    <span className="text-slate-300"> Central AI engine with multiple analytical personas</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-cyan-400 mt-1">•</span>
                                <div>
                                    <strong className="text-white">NSIL Language:</strong>
                                    <span className="text-slate-300"> Proprietary intelligence mapping system</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-cyan-400 mt-1">•</span>
                                <div>
                                    <strong className="text-white">Live Data Integration:</strong>
                                    <span className="text-slate-300"> World Bank & UN Comtrade APIs</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-cyan-400 mt-1">•</span>
                                <div>
                                    <strong className="text-white">Intelligence Reports:</strong>
                                    <span className="text-slate-300"> AI-generated strategic blueprints</span>
                                </div>
                            </li>
                        </ul>
                    </InfoBox>

                    {/* How It Works Box */}
                    <InfoBox
                        title="How It Works"
                        subtitle="Intelligent Process Flow"
                        variant="primary"
                        icon={<DataProfessionalIcon className="w-16 h-16 text-cyan-400" />}
                    >
                        <div className="space-y-4">
                            <div className="bg-slate-800/50 p-4 rounded-lg">
                                <p className="text-cyan-400 font-semibold">1. Input Analysis</p>
                                <p className="text-sm text-slate-300">User provides regional objectives and parameters</p>
                            </div>
                            <div className="bg-slate-800/50 p-4 rounded-lg">
                                <p className="text-cyan-400 font-semibold">2. Live Data Integration</p>
                                <p className="text-sm text-slate-300">Fetches real-time economic and trade data</p>
                            </div>
                            <div className="bg-slate-800/50 p-4 rounded-lg">
                                <p className="text-cyan-400 font-semibold">3. AI Analysis</p>
                                <p className="text-sm text-slate-300">Multiple AI personas analyze through different lenses</p>
                            </div>
                            <div className="bg-slate-800/50 p-4 rounded-lg">
                                <p className="text-cyan-400 font-semibold">4. Intelligence Output</p>
                                <p className="text-sm text-slate-300">Generates comprehensive strategic reports</p>
                            </div>
                        </div>
                    </InfoBox>

                    {/* Technology Behind Box */}
                    <InfoBox
                        title="Technology Stack"
                        subtitle="Cutting-Edge Architecture"
                        variant="accent"
                        icon={<LightbulbIcon className="w-16 h-16 text-cyan-400" />}
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-800/50 p-3 rounded-lg text-center">
                                <p className="text-cyan-400 font-semibold text-sm">Frontend</p>
                                <p className="text-xs text-slate-300">React 19 + TypeScript</p>
                            </div>
                            <div className="bg-slate-800/50 p-3 rounded-lg text-center">
                                <p className="text-cyan-400 font-semibold text-sm">AI Engine</p>
                                <p className="text-xs text-slate-300">Google Gemini 2.5</p>
                            </div>
                            <div className="bg-slate-800/50 p-3 rounded-lg text-center">
                                <p className="text-cyan-400 font-semibold text-sm">Data APIs</p>
                                <p className="text-xs text-slate-300">World Bank + UN Comtrade</p>
                            </div>
                            <div className="bg-slate-800/50 p-3 rounded-lg text-center">
                                <p className="text-cyan-400 font-semibold text-sm">Deployment</p>
                                <p className="text-xs text-slate-300">Vercel Edge Functions</p>
                            </div>
                        </div>
                        <p className="text-sm mt-4 text-center text-slate-300">
                            Built with modern web technologies for global scalability and real-time performance.
                        </p>
                    </InfoBox>

                    {/* The Problem Solved Box */}
                    <InfoBox
                        title="The Problem Solved"
                        subtitle="Bridging the Intelligence Gap"
                        variant="secondary"
                        icon={<TargetIcon className="w-16 h-16 text-cyan-400" />}
                    >
                        <p className="text-lg font-semibold text-cyan-400 mb-4">The Core Challenge</p>
                        <p className="mb-4">Regional development decisions were made with fragmented data, outdated information, and siloed analysis - leading to inefficient resource allocation and missed opportunities.</p>
                        <p className="text-sm italic bg-slate-800/50 p-3 rounded-lg">
                            "The biggest obstacle to growth wasn't a lack of capital, but a lack of clarity."
                        </p>
                        <p className="mt-4 text-sm">
                            BWGA Nexus AI provides unified, real-time intelligence that transforms how regional leaders make decisions.
                        </p>
                    </InfoBox>

                </div>

                {/* Full-width impact section */}
                <div className="mb-16">
                    <InfoBox
                        title="Global Impact & Reach"
                        subtitle="Worldwide Accessibility"
                        variant="primary"
                        className="text-center"
                        icon={<GlobeIcon className="w-20 h-20 text-cyan-400" />}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                            <div>
                                <h4 className="text-2xl font-bold text-cyan-400 mb-2">15+ Countries</h4>
                                <p className="text-slate-300">Live economic data coverage including major Southeast Asian markets</p>
                            </div>
                            <div>
                                <h4 className="text-2xl font-bold text-cyan-400 mb-2">Real-Time Intelligence</h4>
                                <p className="text-slate-300">Continuous data updates from authoritative global sources</p>
                            </div>
                            <div>
                                <h4 className="text-2xl font-bold text-cyan-400 mb-2">AI-Powered Analysis</h4>
                                <p className="text-slate-300">Multiple analytical personas providing comprehensive insights</p>
                            </div>
                        </div>
                    </InfoBox>
                </div>

                {/* Call to Action */}
                <div className="text-center">
                    <InfoBox
                        title="Experience the Future of Regional Intelligence"
                        subtitle="BWGA Nexus AI Platform"
                        variant="accent"
                        className="max-w-4xl mx-auto"
                    >
                        <p className="text-lg mb-8 text-slate-300">
                            Join the revolution in regional development intelligence. Access world-first technology that bridges the critical gap between data and actionable strategies.
                        </p>
                        <button
                            onClick={() => onViewChange('report')}
                            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            <div className="flex items-center gap-3 justify-center">
                                <RegionalDevelopmentIcon className="w-6 h-6" />
                                Launch Intelligence Dashboard
                            </div>
                        </button>
                    </InfoBox>
                </div>
            </div>

            {/* Footer */}
            <footer className="py-12 border-t border-slate-700 bg-slate-900/50 mt-16">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <div className="flex justify-center mb-6">
                        <NexusLogo className="w-12 h-12 text-cyan-400" />
                    </div>
                    <div className="space-y-3">
                        <p className="text-slate-300 font-semibold">
                            BWGA Global Advisory - Brayden Walls Global Advisory
                        </p>
                        <p className="text-sm text-slate-400">
                            Australian Business Number: <span className="text-cyan-400 font-semibold">ABN 55 978 113 300</span>
                        </p>
                        <p className="text-xs text-slate-500">
                            © 2024 BWGA Global Advisory. World-First Regional Intelligence Technology. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default WhoWeAre;