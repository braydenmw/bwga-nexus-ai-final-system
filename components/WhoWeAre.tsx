import React from 'react';
import { BlueprintIcon, NexusLogo } from './Icons.tsx';

interface WhoWeAreProps {
    onViewChange: (view: string) => void;
}

const WhoWeAre: React.FC<WhoWeAreProps> = ({ onViewChange }) => {
    return (
        <div className="bg-gray-50 text-gray-800 font-sans antialiased">
            {/* Hero Section */}
            <section className="relative py-28 md:py-40">
                <div className="absolute inset-0">
                    <img
                        className="w-full h-full object-cover"
                        src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Asian country village"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/30"></div>
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4 tracking-tight">
                        A New Language for Global Opportunity
                    </h1>
                    <p className="text-base md:text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed">
                        The world is changing, but understanding hasn't kept up. BW Nexus AI was built to bridge the critical gap between global ambition and regional potential, providing the precise clarity needed to build the partnerships of tomorrow.
                    </p>
                    <p className="text-lg md:text-xl text-white font-semibold max-w-3xl mx-auto leading-relaxed mt-4">
                        BW Nexus AI: Intelligence that doesn't just inform—it transforms. Turning regional potential into global partnerships, one breakthrough at a time.
                    </p>
                </div>
            </section>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">

                {/* Section: The Problem & The Founder */}
                <section className="bg-white p-8 md:p-12 rounded-2xl shadow-lg">
                    <div className="space-y-12">
                        <div className="text-center">
                            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">The Current Landscape: A World of Misalignment</h2>
                            <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">In our hyper-connected world, opportunity knows no borders. Yet the vast potential of global markets remains largely untapped, not because ambition is lacking, but because understanding often falls short of aspiration.</p>
                        </div>
                        <div className="max-w-4xl mx-auto">
                            <p className="text-gray-700 leading-relaxed">Every region worldwide possesses unique strengths and opportunities. Traditional economic centers offer established infrastructure and market maturity, while emerging areas provide fresh growth potential and competitive advantages. The challenge isn't choosing between them—it's understanding how they all fit together in a global strategy.</p>
                            <p className="mt-4 text-gray-700 leading-relaxed">This is the **Global Understanding Gap**: a fundamental disconnect where decision-makers struggle to see the complete picture. Fragmented data, regional complexities, and the sheer scale of global possibilities create barriers that prevent organizations from realizing their full potential.</p>
                            <p className="mt-4 text-gray-700 leading-relaxed">BWGA Nexus AI exists to bridge this gap. We provide comprehensive intelligence for any region, anywhere in the world, enabling decision-makers to see opportunities clearly and act with confidence. Our platform serves everyone—from multinational corporations to local governments, from investors to entrepreneurs—helping them navigate the global landscape with unprecedented clarity.</p>
                            <div className="mt-6 p-4 bg-gray-100 border-l-4 border-gray-800 rounded-r-lg">
                                <p className="text-gray-800 font-bold italic">BW Nexus AI provides the precise clarification needed to see these regions not for what they were, but for what they can become.</p>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-12 items-center pt-12 border-t border-gray-200">
                            <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1911&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="A person working on a laptop with data visualizations, representing the intersection of technology and human insight." className="rounded-xl shadow-lg object-cover w-full h-full max-h-96" />
                            <div className="text-center md:text-left">
                                <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-4">A Message from the Founder</h3>
                                <blockquote className="text-lg italic font-medium text-gray-700 leading-relaxed">
                                    "I built BW Nexus AI after years of working directly with local governments and development leaders who had the will, the people, and the resources—but not the platform to show it. This system was born from that frustration, and from a belief that technology can be the equalizer between big and small. My hope is simple: that Nexus AI helps the world rediscover the value of places—and the people—that have long been underestimated."
                                </blockquote>
                                <p className="mt-6 font-semibold text-gray-800">— The Founder, BW Global Advisory</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section: Our Guiding Principles */}
                <section className="p-8 md:p-12 bg-white rounded-2xl shadow-lg">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Our Guiding Principles</h2>
                        <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">Our work is built on a foundation of strong ethical principles and a clear mission to serve humanity.</p>
                    </div>
                    <div className="space-y-16">
                        {/* Mission & Philosophy */}
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div className="text-center md:text-left">
                                <h3 className="text-2xl font-bold mb-3">Our Mission & Philosophy</h3>
                                <p className="text-gray-600">Our core mission is to bridge the "understanding gap" between regional potential and global capital. We believe AI should augment, not replace, human expertise. This partnership—an **Ethical AI-Human Symbiosis**—ensures the intelligence produced is not only accurate but meaningful and actionable.</p>
                                <blockquote className="mt-6 text-lg italic font-medium text-gray-700 border-l-4 border-gray-300 pl-4">
                                    “A world where every regional economy’s true potential is recognized, understood, and developed through intelligent partnerships that create lasting prosperity for local communities.”
                                </blockquote>
                            </div>
                            <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2130&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Strategic planning session with a global perspective." className="rounded-xl shadow-lg object-cover w-full h-full" />
                        </div>

                        {/* Ethical Framework */}
                        <div>
                            <h3 className="text-2xl font-bold text-center mb-8">A Framework for Ethical Intelligence</h3>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                    <h4 className="font-bold text-gray-800 mb-2">Human-Centric & Beneficial</h4>
                                    <p className="text-sm text-gray-600">The primary objective of our AI is to augment human intelligence and support decisions that lead to positive socio-economic outcomes, particularly for underserved regional communities.</p>
                                </div>
                                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                    <h4 className="font-bold text-gray-800 mb-2">Fairness & Bias Mitigation</h4>
                                    <p className="text-sm text-gray-600">We acknowledge the potential for biases in data and algorithms and are committed to proactively identifying and mitigating them throughout the AI lifecycle.</p>
                                </div>
                                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                    <h4 className="font-bold text-gray-800 mb-2">Transparency & Explainability</h4>
                                    <p className="text-sm text-gray-600">We are committed to transparency regarding our data sources and high-level methodology, and clearly communicating the limitations of AI to ensure it is used as a tool for decision support.</p>
                                </div>
                                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                    <h4 className="font-bold text-gray-800 mb-2">Accountability & Human Oversight</h4>
                                    <p className="text-sm text-gray-600">Our AI-Human Symbiosis Model ensures that critical recommendations are always subject to review, validation, and contextualization by qualified human experts.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section: The BWGA Nexus Platform */}
                <section className="bg-white p-8 md:p-12 rounded-2xl shadow-lg">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">The BWGA Nexus Platform</h2>
                        <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">A unified system for transforming curiosity into clarity, data into roadmaps, and ambition into action.</p>
                    </div>
                    <div className="space-y-16">
                        {/* How It Works */}
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">How It Works: A New Way to Build Partnerships</h3>
                            <div className="grid md:grid-cols-3 gap-8 text-center">
                                <div className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=500&h=300&fit=crop" alt="A person defining their intent on a laptop." className="w-full h-40 object-cover"/>
                                    <div className="p-6 flex flex-col items-center flex-grow">
                                        <h4 className="font-semibold text-gray-800 text-lg mb-2">Define Your Intent</h4>
                                        <p className="text-sm text-gray-600 flex-grow">The system understands the identity and goals of your city or organization, starting with a simple question or a complex document.</p>
                                    </div>
                                </div>
                                <div className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=500&h=300&fit=crop" alt="People collaborating to refine their mission." className="w-full h-40 object-cover"/>
                                    <div className="p-6 flex flex-col items-center flex-grow">
                                        <h4 className="font-semibold text-gray-800 text-lg mb-2">Refine Your Mission</h4>
                                        <p className="text-sm text-gray-600 flex-grow">It maps your intent against live global data, helping you scope the project, select analysis tiers, and choose AI Analyst Personas.</p>
                                    </div>
                                </div>
                                <div className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=500&h=300&fit=crop" alt="Data visualization on a screen, representing a blueprint." className="w-full h-40 object-cover"/>
                                    <div className="p-6 flex flex-col items-center flex-grow">
                                        <h4 className="font-semibold text-gray-800 text-lg mb-2">Receive Your Blueprint</h4>
                                        <p className="text-sm text-gray-600 flex-grow">The Nexus Engine analyzes the data and produces a data-backed, interactive blueprint showing why and how collaboration could succeed.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* The Nexus Engine */}
                        <div className="p-8 md:p-12 bg-gray-100 border border-gray-200 rounded-2xl">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-gray-900">The Nexus Engine: The Proof Behind the Platform</h3>
                                <p className="mt-2 max-w-2xl mx-auto text-gray-600">Most AI systems produce summaries. Ours is built differently—it introduces proprietary frameworks to provide precise clarification, not just general information.</p>
                            </div>
                            <div className="mt-8 grid md:grid-cols-2 gap-8">
                                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                                    <h4 className="font-bold text-gray-800 mb-2">RROI — Regional Readiness & Opportunity Index</h4>
                                    <p className="text-sm text-gray-600">A multi-dimensional model that reveals a region's economic DNA, going beyond surface-level metrics.</p>
                                </div>
                                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                                    <h4 className="font-bold text-gray-800 mb-2">TPT — Trajectory Prediction Tool</h4>
                                    <p className="text-sm text-gray-600">Predicts how a region will transform based on strategic actions, enabling long-term scenario modeling.</p>
                                </div>
                                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                                    <h4 className="font-bold text-gray-800 mb-2">SEAM — Strategic Ecosystem Architecture Model</h4>
                                    <p className="text-sm text-gray-600">Designs real-world partnership ecosystems by matching partners based on complementary strengths and shared goals.</p>
                                </div>
                                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                                    <h4 className="font-bold text-gray-800 mb-2">NSIL™ — Nexus Symbiotic Intelligence Language</h4>
                                    <p className="text-sm text-gray-600">A proprietary structure that transforms static reports into living, queryable blueprints where every insight can be interrogated in real-time.</p>
                                </div>
                            </div>
                            <p className="mt-8 text-center text-gray-500 font-semibold">Together, these frameworks make a BWGA Nexus Intelligence Report not just data—but a roadmap.</p>
                        </div>

                        {/* Core Services */}
                        <div>
                            <div className="text-center mb-10">
                                <h3 className="text-2xl font-bold text-gray-900">Core Services & Capabilities</h3>
                                <p className="mt-2 max-w-2xl mx-auto text-gray-600">We provide bespoke AI-Human Intelligence Reports designed to provide immediate strategic value for both public and private sector leaders.</p>
                            </div>
                            <div className="grid md:grid-cols-2 gap-10">
                                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                    <h4 className="text-xl font-bold text-gray-800 mb-4">For Governments</h4>
                                    <p className="text-gray-600 mb-4">Empowering governments to showcase their regions, attract strategic investment, and design impactful development policies.</p>
                                    <ul className="space-y-3 text-gray-700 text-sm">
                                        <li className="flex items-start gap-3"><div><strong>FDI Attraction Blueprint:</strong> Identifies and profiles ideal foreign investors for a specific sector.</div></li>
                                        <li className="flex items-start gap-3"><div><strong>Supply Chain Gap Analysis:</strong> Deep-dive into a value chain to find critical gaps and investment opportunities.</div></li>
                                        <li className="flex items-start gap-3"><div><strong>Workforce Development Plan:</strong> Analyzes skills gaps and proposes a strategy to build a future-ready workforce.</div></li>
                                    </ul>
                                </div>
                                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                    <h4 className="text-xl font-bold text-gray-800 mb-4">For Private Enterprise</h4>
                                    <p className="text-gray-600 mb-4">Providing companies with the intelligence to de-risk international expansion, identify "hidden gem" markets, and optimize their global footprint.</p>
                                    <ul className="space-y-3 text-gray-700 text-sm">
                                        <li className="flex items-start gap-3"><div><strong>Market Entry Strategy:</strong> Assesses a new market and outlines a strategic approach for entry.</div></li>
                                        <li className="flex items-start gap-3"><div><strong>Partner Vetting Report:</strong> Conducts deep-dive due diligence on potential local partners.</div></li>
                                        <li className="flex items-start gap-3"><div><strong>Supply Chain Resilience:</strong> Maps a supply chain and identifies risks and optimization opportunities.</div></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section: In Essence: The World's First Strategic Symbiosis System */}
                <section className="text-center bg-gray-800 text-white rounded-2xl p-12">
                    <h2 className="text-3xl font-bold mb-4">The World's First Strategic Symbiosis System</h2>
                    <p className="text-lg text-gray-300 mb-6 max-w-3xl mx-auto">
                        BW Nexus AI is not another AI platform. It is the world’s first Strategic Symbiosis System—designed to connect vision with reality, ambition with opportunity, and people with purpose. It takes a single idea—what if we could see the world clearly, region by region—and turns it into a living intelligence engine that makes understanding accessible to everyone. Because the first spark of understanding—that moment of curiosity and confidence—is where every partnership begins.
                    </p>
                    <div className="my-8 py-6 border-t border-b border-gray-700 max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold text-white mb-4">Simple, Transparent Access</h3>
                        <p className="text-gray-300 mb-2">Gain full access to the BW Nexus AI platform with unlimited usage.</p>
                        <div className="text-center">
                            <p className="text-5xl font-extrabold text-white mb-2">$15</p>
                            <p className="text-gray-300 font-semibold mb-4">for 7 day access</p>
                            <p className="text-lg font-bold text-white mb-2">3 months subscription $175 • 6 months subscription $395 • 12 months subscription $595</p>
                        </div>
                    </div>
                    <button
                        onClick={() => onViewChange('report')}
                        className="bg-orange-600 text-white font-bold py-4 px-8 rounded-lg hover:bg-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        <div className="flex items-center gap-3 justify-center">
                            <BlueprintIcon className="w-6 h-6" />
                            Launch the Workspace
                        </div>
                    </button>
                </section>
            </main>

            {/* Footer */}
            <footer className="py-12 border-t border-gray-200 mt-16">
                <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">
                    <div className="flex justify-center mb-6">
                        <NexusLogo className="w-10 h-10 text-gray-500" />
                    </div>
                    <p className="font-semibold text-gray-600">BW Global Advisory</p>
                    <p className="text-sm mb-4">ABN 55 978 113 300</p>
                    <p className="text-xs">&copy; 2024 BW Global Advisory. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default WhoWeAre;