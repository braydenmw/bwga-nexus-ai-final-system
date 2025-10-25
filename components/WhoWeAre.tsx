
import React from 'react';
import { BlueprintIcon, NexusLogo } from './Icons.tsx';

interface WhoWeAreProps {
    onViewChange: (view: string) => void;
}

const WhoWeAre: React.FC<WhoWeAreProps> = ({ onViewChange }) => {
    return (
        <div className="bg-gray-50 text-gray-800 font-sans">


            {/* Hero Section */}
            <section className="relative py-20 md:py-32">
                <div className="absolute inset-0">
                    <img
                        className="w-full h-full object-cover"
                        src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Asian Village"
                    />
                    <div className="absolute inset-0 bg-black opacity-60"></div>
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
                        Unlocking the Hidden Value of Regions Worldwide
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                        We empower leaders to see the unseen, to connect the disconnected, and to build thriving futures with a platform that transforms complexity into clarity.
                    </p>
                </div>
            </section>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">

                {/* Founder & BWGA Section */}
                <section className="bg-white p-8 md:p-12 rounded-2xl shadow-lg flex flex-col md:flex-row items-center gap-8 md:gap-12">
                    <div className="flex-shrink-0">
                        <img 
                            src="https://images.unsplash.com/photo-1514395462725-fb4566210144?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                            alt="Melbourne, Australia" 
                            className="w-48 h-48 rounded-full object-cover shadow-md border-4 border-white"
                        />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">The Vision of a Connected World</h2>
                        <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                            <strong className="text-gray-800">BWGA Global Advisory</strong> was born from a simple observation by founder <strong className="text-gray-800">Brayden Walls</strong>: the world is full of untapped potential, locked away in regional economies that are consistently undervalued and misunderstood. After years on the front lines of global development, a universal truth became clear.
                        </p>
                        <div className="bg-gray-100 border-l-4 border-gray-400 p-4 rounded-r-lg">
                            <p className="text-gray-700 font-semibold italic text-lg">
                                "It wasn't a lack of ambition or capital that held regions back. It was a failure of imagination, fueled by a chronic lack of clarity. We're helping the world see what's truly possible when every place gets to prove its worth."
                            </p>
                        </div>
                    </div>
                </section>

                {/* The Problem Section */}
                <section className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">The Problem of Overlooked Opportunities</h2>
                    <p className="text-lg text-gray-600 max-w-4xl mx-auto mb-12">
                        For too long, major corporations and governments have overlooked regional powerhouses, basing critical decisions on incomplete, outdated, and siloed information. This leads to missed opportunities, wasted investment, and a world where only the most obvious markets get attention.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300">
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Fragmented Data</h3>
                            <p className="text-gray-600">Vital intelligence is a scattered mosaic of disconnected sources. Nexus AI pieces it together, revealing the full picture of a region's strengths, weaknesses, and, most importantly, its trajectory.</p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300">
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Outdated Information</h3>
                            <p className="text-gray-600">Decisions that shape futures cannot be based on data that is months or years old. Our live data engine ensures your strategy is built on the reality of now, not the memory of then.</p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300">
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Siloed Analysis</h3>
                            <p className="text-gray-600">When experts work in isolation, they see only a fraction of the ecosystem. Nexus AI breaks down these walls, fostering a unified, multi-perspective understanding that is impossible to achieve alone.</p>
                        </div>
                    </div>
                </section>

                {/* The Invention Section */}
                <section className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">The Solution: A Platform for Certainty</h2>
                        <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                            BWGA Nexus AI is the dedicated platform for regional intelligence, engineered to unlock the full potential of cities worldwide. We connect governments with corporations, turning uncertainty into opportunity and helping every region build a prosperous future.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <div className="bg-gray-100 p-6 rounded-lg border border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">💡 Empowering Regional Governments</h3>
                            <p className="text-gray-600">Nexus AI provides local governments with the tools to showcase their region’s unique strengths. We help you attract investment, foster innovation, and create a thriving ecosystem for businesses and communities alike.</p>
                        </div>
                        <div className="bg-gray-100 p-6 rounded-lg border border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">🌍 Connecting Companies to New Markets</h3>
                            <p className="text-gray-600">In a volatile global economy, Nexus AI offers a lifeline. We guide companies to high-potential regional cities, uncovering new markets and opportunities for growth in places others overlook.</p>
                        </div>
                    </div>
                </section>

                {/* A Global Solution */}
                <section className="relative text-center">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
                    ></div>
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="relative max-w-4xl mx-auto py-16 px-4">
                        <h2 className="text-3xl font-bold text-white mb-4">Give Every Region a World-Class Voice</h2>
                        <p className="text-lg text-gray-200 max-w-3xl mx-auto">
                            From the agricultural heartlands of America to the burgeoning tech hubs of India, every region has a story to tell and value to offer. BWGA Nexus AI is the megaphone. It provides the data-driven narrative to attract investment, foster growth, and prove that they are more than just a place on a map.
                        </p>
                    </div>
                </section>

                <section class="bg-gray-50 py-16">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="text-center mb-12">
                            <h2 class="text-3xl font-bold text-gray-900">How We Forge Connections and Create Opportunities</h2>
                            <p class="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">We bridge the gap between regional potential and global ambition, giving a voice to every city and guiding businesses to their next frontier.</p>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div class="space-y-8">
                                <div>
                                    <h3 class="text-xl font-semibold text-gray-800">For Regional Governments: A Global Megaphone</h3>
                                    <p class="mt-2 text-gray-600">We transform your region's raw data into a compelling, evidence-based narrative. Our platform highlights your unique strengths, from infrastructure and workforce to quality of life and investment incentives. We then put this story in front of a global audience of corporations actively seeking new markets, ensuring your voice is heard in the boardrooms that matter.</p>
                                </div>
                                <div>
                                    <h3 class="text-xl font-semibold text-gray-800">For Businesses: A Compass to Opportunity</h3>
                                    <p class="mt-2 text-gray-600">Stop navigating the world with an outdated map. Nexus AI provides a live, multi-dimensional view of the global economic landscape. We help you identify and vet high-potential regional cities that align with your strategic goals, de-risking expansion and uncovering opportunities for growth, resilience, and innovation in markets you may have never considered.</p>
                                </div>
                            </div>
                            <div className="text-center">
                                    <img 
                                        src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                                        alt="Global Connections"
                                        className="w-full h-auto rounded-lg shadow-md"
                                    />
                                </div>
                        </div>
                    </div>
                </section>

                {/* Core Technology Section */}
                <section class="bg-white p-8 md:p-12 rounded-2xl shadow-lg">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Technological Edge</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="border-l-4 border-gray-300 pl-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">The Regional Resilience & Opportunity Index (RROI)</h3>
                            <p className="text-gray-600">This is our diagnostic tool for understanding the true potential of a region. It goes beyond surface-level data to measure the core drivers of growth and resilience, from human capital to infrastructure.</p>
                        </div>
                        <div className="border-l-4 border-gray-300 pl-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">The Transitional Pathway Theory (TPT) Simulation</h3>
                            <p className="text-gray-600">Our predictive engine allows you to see the future. By simulating the impact of different strategic interventions, you can make decisions with confidence, knowing you've chosen the optimal path.</p>
                        </div>
                        <div className="border-l-4 border-gray-300 pl-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">The Symbiotic Ecosystem Architecture Model (SEAM)</h3>
                            <p className="text-gray-600">This is where strategy meets execution. SEAM designs the ideal network of partners to bring your vision to life, identifying real-world companies that can create a symbiotic ecosystem for growth.</p>
                        </div>
                        <div className="border-l-4 border-gray-300 pl-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">The Nexus Brain</h3>
                            <p className="text-gray-600">More than just an AI, it's a council of digital experts. It simulates a multi-disciplinary team to provide holistic, unbiased insights that a single human analyst never could.</p>
                        </div>
                        <div className="border-l-4 border-gray-300 pl-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">The NSIL Framework</h3>
                            <p className="text-gray-600">The Nexus Symbiotic Intelligence Language is our secret sauce. It's a proprietary framework for mapping complex regional ecosystems, ensuring every piece of data is understood in its full context.</p>
                        </div>
                        <div className="border-l-4 border-gray-300 pl-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">The Intelligence Blueprint</h3>
                            <p className="text-gray-600">This is the output: a dynamic, data-driven strategic report that doesn't just inform, but guides. It’s your action plan for success, tailored to your specific objectives.</p>
                        </div>
                        <div className="border-l-4 border-gray-300 pl-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">The Live Data Engine</h3>
                            <p className="text-gray-600">In a world that changes by the second, our engine ensures your intelligence is never out of date. It provides the real-time pulse of the global economy, right at your fingertips.</p>
                        </div>
                    </div>
                </section>

                {/* Who It's For Section */}
                <section className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">An Intelligence Copilot for Every Leader</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
                        Access the power of a world-class intelligence team without the world-class price tag. BWGA Nexus AI provides two core tools to every user:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                        <div className="bg-white p-8 rounded-xl shadow-md">
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Nexus Enquire AI Copilot</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Your on-demand AI assistant for regional intelligence. Ask complex questions, get instant clarification, and receive data-driven answers in seconds. It’s like having a team of analysts at your fingertips, 24/7, helping you save time and make smarter decisions, faster.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-md">
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Automated Report Generator</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Go from question to presentation-ready report in minutes, not months. Our system produces comprehensive, affordable reports that provide clear, actionable intelligence. This information matching and clarification saves countless hours and significant budget, democratizing access to the insights that drive growth.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section className="bg-white p-8 md:p-12 rounded-2xl shadow-lg text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
                        Gain full access to the BWGA Nexus AI platform with unlimited usage. No hidden fees, no complex tiers. Just pure, unadulterated clarity.
                    </p>
                    <div className="inline-block bg-gray-100 rounded-xl p-8 border border-gray-200">
                        <p className="text-5xl font-extrabold text-gray-900 mb-2">$89</p>
                        <p className="text-gray-600 font-semibold mb-6">per month</p>
                        <ul className="text-left space-y-3 text-gray-700">
                            <li className="flex items-center"><span className="text-green-500 mr-2">✔</span> Unlimited Intelligence Reports</li>
                            <li className="flex items-center"><span className="text-green-500 mr-2">✔</span> Real-Time Data Access</li>
                            <li className="flex items-center"><span className="text-green-500 mr-2">✔</span> Multi-Persona AI Analysis</li>
                            <li className="flex items-center"><span className="text-green-500 mr-2">✔</span> Flexible subscription terms (1, 3, 6, 12 months)</li>
                        </ul>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="text-center bg-gray-800 text-white rounded-2xl p-12">
                    <h2 className="text-3xl font-bold mb-4">Stop Guessing. Start Knowing.</h2>
                    <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
                        Launch the dashboard and experience the power of unified intelligence. Your journey to clarity begins now.
                    </p>
                    <button
                        onClick={() => onViewChange('report')}
                        className="bg-white text-gray-800 font-bold py-4 px-8 rounded-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        <div className="flex items-center gap-3 justify-center">
                            <BlueprintIcon className="w-6 h-6" />
                            Launch BWGA Nexus AI Dashboard
                        </div>
                    </button>
                </section>
            </main>

            {/* Footer */}
            <footer className="py-12 border-t border-gray-200 mt-16">
                <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">
                    <div className="flex justify-center mb-6">
                        <NexusLogo className="w-10 h-10 text-gray-400" />
                    </div>
                    <p className="font-semibold text-gray-600">BWGA Global Advisory</p>
                    <p className="text-sm mb-4">ABN 55 978 113 300</p>
                    <p className="text-xs">&copy; 2024 BWGA Global Advisory. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default WhoWeAre;