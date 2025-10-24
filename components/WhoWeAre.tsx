import React from 'react';
import { BlueprintIcon, LightbulbIcon, TargetIcon, GlobeIcon, UsersIcon, PuzzleIcon, DataProfessionalIcon, RegionalDevelopmentIcon, NexusLogo } from './Icons.tsx';

interface WhoWeAreProps {
    onViewChange: (view: string) => void;
}

const WhoWeAre: React.FC<WhoWeAreProps> = ({ onViewChange }) => {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="relative py-20 px-4 text-center bg-gradient-to-r from-slate-50 to-slate-100">
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-center mb-8">
                        <NexusLogo className="w-24 h-24 text-cyan-600" />
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-slate-800 mb-6 leading-tight">
                        BWGA NEXUS AI
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-8">
                        Brayden Walls Global Advisory - World-First Intelligence Platform for Regional Development
                    </p>
                    <div className="inline-block bg-cyan-600 px-8 py-3 rounded-full">
                        <p className="text-white font-semibold">Bridging the Early Gap in Regional Intelligence</p>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">

                {/* Who is BWGA Section */}
                <section className="text-center">
                    <h2 className="text-4xl font-bold text-slate-800 mb-8">Who is BWGA?</h2>
                    <div className="max-w-4xl mx-auto">
                        <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                            BWGA Global Advisory is an independent developer and strategist founded by Brayden Walls, with a deep commitment to innovation and sustainable growth.
                            My work with government, business, and community stakeholders revealed the persistent inefficiencies and information gaps that hinder regional development.
                        </p>
                        <div className="bg-cyan-50 border-l-4 border-cyan-500 p-6 rounded-r-lg">
                            <p className="text-cyan-800 font-semibold italic text-lg">
                                "The core problem isn't a lack of capital, but a lack of clarity."
                            </p>
                        </div>
                    </div>
                </section>

                {/* What I Realized Section */}
                <section className="bg-slate-50 rounded-2xl p-12">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-slate-800 mb-4">What I Realized</h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            Regional development decisions were being made with fragmented data, outdated information, and siloed analysis
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-red-600 text-2xl">📊</span>
                            </div>
                            <h3 className="font-semibold text-slate-800 mb-2">Fragmented Data</h3>
                            <p className="text-slate-600">Information scattered across multiple disconnected sources</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-orange-600 text-2xl">⏰</span>
                            </div>
                            <h3 className="font-semibold text-slate-800 mb-2">Outdated Information</h3>
                            <p className="text-slate-600">Critical decisions made with stale or irrelevant data</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-yellow-600 text-2xl">🏗️</span>
                            </div>
                            <h3 className="font-semibold text-slate-800 mb-2">Siloed Analysis</h3>
                            <p className="text-slate-600">Departments working in isolation without unified intelligence</p>
                        </div>
                    </div>
                </section>

                {/* What I Invented Section */}
                <section className="text-center">
                    <h2 className="text-4xl font-bold text-slate-800 mb-8">What I Invented</h2>
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-2xl p-12 max-w-5xl mx-auto">
                        <h3 className="text-3xl font-bold mb-6">BWGA Nexus AI</h3>
                        <p className="text-xl mb-8">
                            The world's first AI-powered platform specifically designed to bridge the critical intelligence gap in regional development planning
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                            <div>
                                <h4 className="text-xl font-semibold mb-4">🎯 World-First Innovation</h4>
                                <p>No other system focuses on the early-stage intelligence gap that regional leaders face</p>
                            </div>
                            <div>
                                <h4 className="text-xl font-semibold mb-4">🔗 Integration, Not Competition</h4>
                                <p>Designed to seamlessly integrate with existing systems and workflows</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* For Whom Section */}
                <section className="bg-slate-50 rounded-2xl p-12">
                    <h2 className="text-4xl font-bold text-slate-800 mb-8 text-center">For Whom</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <div className="text-3xl mb-4">🏛️</div>
                            <h3 className="font-semibold text-slate-800 mb-2">Governments</h3>
                            <p className="text-slate-600 text-sm">Evidence-based policymaking and infrastructure planning</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <div className="text-3xl mb-4">💼</div>
                            <h3 className="font-semibold text-slate-800 mb-2">Investors</h3>
                            <p className="text-slate-600 text-sm">De-risk market entry and conduct due diligence</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <div className="text-3xl mb-4">🏦</div>
                            <h3 className="font-semibold text-slate-800 mb-2">Banks</h3>
                            <p className="text-slate-600 text-sm">Validate project viability and direct capital</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <div className="text-3xl mb-4">🌆</div>
                            <h3 className="font-semibold text-slate-800 mb-2">Planners</h3>
                            <p className="text-slate-600 text-sm">Build data-driven business cases and strategies</p>
                        </div>
                    </div>
                </section>

                {/* What the System Does Section */}
                <section className="text-center">
                    <h2 className="text-4xl font-bold text-slate-800 mb-8">What the System Does</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-8">
                            <h3 className="text-2xl font-bold text-cyan-800 mb-4">Unifies Intelligence</h3>
                            <p className="text-cyan-700 mb-4">
                                Combines fragmented data sources into coherent, actionable intelligence specifically tailored for regional development decisions.
                            </p>
                            <ul className="text-cyan-700 text-left space-y-2">
                                <li>• Live World Bank economic data</li>
                                <li>• Real-time UN Comtrade statistics</li>
                                <li>• AI-powered analysis and insights</li>
                                <li>• Multi-perspective strategic reports</li>
                            </ul>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-8">
                            <h3 className="text-2xl font-bold text-blue-800 mb-4">Provides Clarity</h3>
                            <p className="text-blue-700 mb-4">
                                Transforms complex regional dynamics into clear, confident decision-making frameworks that leaders can trust.
                            </p>
                            <ul className="text-blue-700 text-left space-y-2">
                                <li>• Risk assessment and mitigation</li>
                                <li>• Opportunity identification</li>
                                <li>• Strategic recommendations</li>
                                <li>• Implementation roadmaps</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Why It Was Made Section */}
                <section className="bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-2xl p-12 text-center">
                    <h2 className="text-4xl font-bold mb-8">Why It Was Made</h2>
                    <div className="max-w-4xl mx-auto">
                        <p className="text-xl mb-6 leading-relaxed">
                            The biggest obstacle to regional growth wasn't a lack of capital, but a lack of clarity.
                            Leaders were making critical decisions with inadequate information, leading to inefficient resource allocation and missed opportunities.
                        </p>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                            <p className="text-lg italic">
                                "BWGA Nexus AI was engineered as a practical, independent solution to unify intelligence and empower decision-makers to unlock regional potential."
                            </p>
                        </div>
                    </div>
                </section>

                {/* What It Creates Section */}
                <section className="text-center">
                    <h2 className="text-4xl font-bold text-slate-800 mb-8">What It Creates</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                            <div className="text-4xl mb-4">📋</div>
                            <h3 className="text-xl font-semibold text-slate-800 mb-3">Intelligence Reports</h3>
                            <p className="text-slate-600">Comprehensive strategic blueprints with AI-generated insights and recommendations</p>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                            <div className="text-4xl mb-4">🔍</div>
                            <h3 className="text-xl font-semibold text-slate-800 mb-3">Deep Analysis</h3>
                            <p className="text-slate-600">Multi-perspective analysis from various AI personas and analytical lenses</p>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                            <div className="text-4xl mb-4">🎯</div>
                            <h3 className="text-xl font-semibold text-slate-800 mb-3">Action Plans</h3>
                            <p className="text-slate-600">Practical implementation roadmaps with clear timelines and milestones</p>
                        </div>
                    </div>
                </section>

                {/* How It Creates It Section */}
                <section className="bg-slate-50 rounded-2xl p-12">
                    <h2 className="text-4xl font-bold text-slate-800 mb-8 text-center">How It Creates Intelligence</h2>
                    <div className="max-w-4xl mx-auto">
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-cyan-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
                                <div>
                                    <h3 className="text-xl font-semibold text-slate-800 mb-2">User Input Analysis</h3>
                                    <p className="text-slate-600">Processes regional objectives, industry focus, and strategic parameters</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-cyan-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
                                <div>
                                    <h3 className="text-xl font-semibold text-slate-800 mb-2">Live Data Integration</h3>
                                    <p className="text-slate-600">Fetches real-time economic and trade data from World Bank and UN Comtrade APIs</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-cyan-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
                                <div>
                                    <h3 className="text-xl font-semibold text-slate-800 mb-2">AI Multi-Perspective Analysis</h3>
                                    <p className="text-slate-600">Multiple AI personas analyze through different lenses (Economist, Geopolitical Strategist, etc.)</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-cyan-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">4</div>
                                <div>
                                    <h3 className="text-xl font-semibold text-slate-800 mb-2">Intelligence Synthesis</h3>
                                    <p className="text-slate-600">Generates comprehensive reports using proprietary NSIL framework</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Programs Invented Section */}
                <section className="text-center">
                    <h2 className="text-4xl font-bold text-slate-800 mb-8">Programs Invented</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
                            <h3 className="text-2xl font-bold text-slate-800 mb-4">Nexus Brain</h3>
                            <p className="text-slate-600 mb-4">
                                The central AI engine featuring multiple analytical personas that provide comprehensive insights from different professional perspectives.
                            </p>
                            <div className="bg-cyan-50 rounded-lg p-4">
                                <p className="text-cyan-800 font-semibold">Addresses:</p>
                                <p className="text-cyan-700 text-sm">Single-perspective analysis limitations, providing multi-faceted intelligence</p>
                            </div>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
                            <h3 className="text-2xl font-bold text-slate-800 mb-4">NSIL Framework</h3>
                            <p className="text-slate-600 mb-4">
                                Nexus Symbiotic Intelligence Language - A proprietary framework for mapping complex regional relationships and ecosystems.
                            </p>
                            <div className="bg-cyan-50 rounded-lg p-4">
                                <p className="text-cyan-800 font-semibold">Addresses:</p>
                                <p className="text-cyan-700 text-sm">Lack of standardized intelligence communication in regional development</p>
                            </div>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
                            <h3 className="text-2xl font-bold text-slate-800 mb-4">Intelligence Blueprint Generator</h3>
                            <p className="text-slate-600 mb-4">
                                Automated report generation system that creates tailored strategic documents for specific regional contexts and objectives.
                            </p>
                            <div className="bg-cyan-50 rounded-lg p-4">
                                <p className="text-cyan-800 font-semibold">Addresses:</p>
                                <p className="text-cyan-700 text-sm">Time-intensive manual report creation and inconsistent analysis quality</p>
                            </div>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
                            <h3 className="text-2xl font-bold text-slate-800 mb-4">Live Data Integration Engine</h3>
                            <p className="text-slate-600 mb-4">
                                Real-time connection to authoritative global data sources, ensuring analysis is based on current economic and trade information.
                            </p>
                            <div className="bg-cyan-50 rounded-lg p-4">
                                <p className="text-cyan-800 font-semibold">Addresses:</p>
                                <p className="text-cyan-700 text-sm">Outdated data leading to poor decision-making in fast-changing regional environments</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* The Gap No Other System Addresses */}
                <section className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-12">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold text-slate-800 mb-8">The Gap No Other System Addresses</h2>
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-red-100 border border-red-300 rounded-xl p-6 mb-8">
                                <h3 className="text-2xl font-bold text-red-800 mb-4">Early-Stage Intelligence Gap</h3>
                                <p className="text-red-700 text-lg">
                                    While many systems focus on mature markets and established businesses, BWGA Nexus AI specifically addresses the critical early-stage intelligence gap that regional leaders face when planning development initiatives.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white border border-slate-200 rounded-lg p-6">
                                    <h4 className="font-semibold text-slate-800 mb-2">❌ What Others Focus On</h4>
                                    <ul className="text-slate-600 text-sm space-y-1">
                                        <li>• Mature market analysis</li>
                                        <li>• Established business intelligence</li>
                                        <li>• Financial reporting</li>
                                        <li>• Operational efficiency</li>
                                    </ul>
                                </div>
                                <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-6">
                                    <h4 className="font-semibold text-cyan-800 mb-2">✅ What BWGA Addresses</h4>
                                    <ul className="text-cyan-700 text-sm space-y-1">
                                        <li>• Early-stage regional planning</li>
                                        <li>• Development intelligence gaps</li>
                                        <li>• Strategic decision support</li>
                                        <li>• Pre-investment analysis</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Integration vs Competition */}
                <section className="text-center bg-slate-50 rounded-2xl p-12">
                    <h2 className="text-4xl font-bold text-slate-800 mb-8">Integration, Not Competition</h2>
                    <div className="max-w-4xl mx-auto">
                        <p className="text-xl text-slate-600 mb-8">
                            BWGA Nexus AI is designed to seamlessly integrate with existing systems and workflows, not replace them.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white border border-slate-200 rounded-xl p-6">
                                <div className="text-3xl mb-4">🔗</div>
                                <h3 className="font-semibold text-slate-800 mb-2">API Integration</h3>
                                <p className="text-slate-600 text-sm">Connects with existing CRM, ERP, and data systems</p>
                            </div>
                            <div className="bg-white border border-slate-200 rounded-xl p-6">
                                <div className="text-3xl mb-4">📊</div>
                                <h3 className="font-semibold text-slate-800 mb-2">Data Enhancement</h3>
                                <p className="text-slate-600 text-sm">Adds intelligence layer to existing data sources</p>
                            </div>
                            <div className="bg-white border border-slate-200 rounded-xl p-6">
                                <div className="text-3xl mb-4">🤝</div>
                                <h3 className="font-semibold text-slate-800 mb-2">Workflow Integration</h3>
                                <p className="text-slate-600 text-sm">Fits into current decision-making processes</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Worldwide Application */}
                <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl p-12 text-center">
                    <h2 className="text-4xl font-bold mb-8">Worldwide Application</h2>
                    <div className="max-w-4xl mx-auto">
                        <p className="text-xl mb-8">
                            BWGA Nexus AI operates globally, providing consistent intelligence quality across all regions and markets.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                                <h3 className="text-2xl font-bold mb-4">🌍 Global Coverage</h3>
                                <p className="mb-4">Live data from 15+ countries including major Southeast Asian markets</p>
                                <p className="text-sm">Philippines, Singapore, Malaysia, Indonesia, Thailand, Vietnam, China, Japan, South Korea, India, USA, Germany, UK, France, Australia</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                                <h3 className="text-2xl font-bold mb-4">⚡ Real-Time Intelligence</h3>
                                <p className="mb-4">Continuous updates from authoritative global sources</p>
                                <p className="text-sm">World Bank economic indicators and UN Comtrade statistics updated in real-time</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section className="text-center">
                    <h2 className="text-4xl font-bold text-slate-800 mb-8">Pricing</h2>
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-12 max-w-2xl mx-auto">
                        <div className="bg-white rounded-xl p-8 shadow-lg border border-green-200">
                            <h3 className="text-3xl font-bold text-green-800 mb-4">$89/month</h3>
                            <p className="text-green-700 mb-6">Full access subscription with unlimited usage</p>
                            <div className="space-y-3 text-sm text-slate-600">
                                <p>✅ 1-month subscription available</p>
                                <p>✅ 3-month subscription available</p>
                                <p>✅ 6-month subscription available</p>
                                <p>✅ 12-month subscription available</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="text-center bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-2xl p-12">
                    <h2 className="text-4xl font-bold mb-6">Ready to Bridge the Intelligence Gap?</h2>
                    <p className="text-xl mb-8 max-w-3xl mx-auto">
                        Experience the world's first regional intelligence platform designed specifically for early-stage development planning.
                    </p>
                    <button
                        onClick={() => onViewChange('report')}
                        className="bg-white text-cyan-600 font-bold py-4 px-8 rounded-xl hover:bg-slate-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        <div className="flex items-center gap-3 justify-center">
                            <BlueprintIcon className="w-6 h-6" />
                            Launch BWGA Nexus AI Dashboard
                        </div>
                    </button>
                </section>
            </div>

            {/* Footer */}
            <footer className="py-12 border-t border-slate-300 bg-slate-50 mt-16">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <div className="flex justify-center mb-6">
                        <NexusLogo className="w-12 h-12 text-cyan-600" />
                    </div>
                    <div className="space-y-3">
                        <p className="text-slate-700 font-semibold">
                            BWGA Global Advisory - Brayden Walls Global Advisory
                        </p>
                        <p className="text-sm text-slate-600">
                            Australian Business Number: <span className="text-cyan-600 font-semibold">ABN 55 978 113 300</span>
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