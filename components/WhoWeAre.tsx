
import React from 'react';
import { BlueprintIcon, NexusLogo } from './Icons.tsx';

interface WhoWeAreProps {
    onViewChange: (view: string) => void;
}

const WhoWeAre: React.FC<WhoWeAreProps> = ({ onViewChange }) => {
    return (
        <div className="bg-gray-50 text-gray-800 font-sans overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative py-24 md:py-40">
                <div className="absolute inset-0">
                    <img
                        className="w-full h-full object-cover"
                        src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Asian country village"
                    />
                    <div className="absolute inset-0 bg-black opacity-60"></div>
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4 tracking-tight">
                        BWGA Nexus AI: Illuminating Opportunity, Connecting Worlds.
                    </h1>
                    <p className="text-base md:text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed">
                        We built Nexus AI to bridge the gap between global ambition and regional potential. It's an intelligence platform for everyone—from local leaders in emerging cities to strategic planners in global boardrooms—designed to provide clarity in minutes, not months, and to help the world see what's truly possible.
                    </p>
                </div>
            </section>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">

                {/* Our Vision Section */}
                <section className="bg-white p-8 md:p-12 rounded-2xl shadow-lg">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Who We Are & Why We Exist</h2>
                        <p className="mt-3 text-lg text-gray-600 max-w-3xl mx-auto">
                            I am an independent developer and strategist with a deep commitment to innovation, problem-solving, and sustainable growth. Over the past several years, I have worked extensively with government, business, and community stakeholders, observing firsthand the inefficiencies and barriers that slow down regional development and business expansion. This experience inspired me to create a tool that brings clarity, efficiency, and actionable intelligence to leaders and organizations working in complex environments.
                        </p>
                    </div>
                    <p className="text-gray-600 text-base mb-6 leading-relaxed">
                        The most significant barrier I observed is what I call the **"Global Understanding Gap"** — a systemic failure fueled by fragmented information, outdated perceptions, and the prohibitive cost of traditional due diligence. This gap systematically hinders equitable development and national prosperity in countless regional cities worldwide. While global capital and opportunity exist, and regional assets abound, a crucial piece of intelligent, proactive, and ethically grounded facilitation was missing.
                    </p>
                    <div className="bg-gray-100 border-l-4 border-blue-500 p-6 rounded-r-lg mb-6">
                        <p className="text-gray-700 font-semibold italic text-base leading-relaxed">
                            Our mission is to fundamentally transform regional economic development by creating a globally intelligent, adaptive AI-Human system. BWGA Nexus™ proactively identifies, validates, and facilitates symbiotic partnerships between regional governments, international investors, and relevant solution providers, fostering sustainable growth and directly addressing poverty and inequality in "forgotten communities."
                        </p>
                    </div>
                    <p className="text-gray-600 text-base mb-6 leading-relaxed">The BWGA Nexus™ platform is not created to simply compete; it is created to contribute. It is the system we wish had existed during our time on the ground. It is for the development agency working to uplift its community, for the company deterred by uncertainty, and for the regional communities themselves waiting to be seen. Our goal is to provide the "spark"—the initial layer of clarity that empowers a local official or a company manager to champion a project, armed with a credible, data-backed report.</p>

                    <div className="mt-12 pt-12 border-t border-gray-200 space-y-10">
                        {/* The Core Idea */}
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">The Core Idea: What is BWGA Nexus AI?</h3>
                            <p className="text-gray-600 mb-4">At its heart, BWGA Nexus AI is an AI-Human Symbiotic Intelligence Platform. It was created by Brayden Walls of BW Global Advisory, born from direct, on-the-ground experience in the regional Philippines. The system's entire purpose is to solve what it identifies as the "Global Understanding Gap": the massive disconnect between global investors/businesses and the untapped economic potential of overlooked regional cities and communities around the world.</p>
                            <p className="text-gray-600">It’s not just a data tool; it's a bridge. It was designed to be the objective, data-driven "first look" that gives a local leader the credible evidence they need to attract investment, and an international CEO the confidence they need to explore a new market. The core philosophy is that AI should augment, not replace, human judgment, creating a partnership where the AI handles the immense task of data analysis, and the human provides the critical strategic intent and context.</p>
                        </div>

                        {/* Why This System is More Important Today Than Ever Before */}
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Why This System is More Important Today Than Ever Before</h3>
                            <p className="text-gray-600 mb-6">The "Global Understanding Gap" is more acute now than ever due to several converging global trends:</p>
                            <ul className="list-disc list-outside ml-5 space-y-3 text-gray-600">
                                <li><strong>Geopolitical & Supply Chain Volatility:</strong> The era of simple, stable supply chains is over. Geopolitical shifts, trade disruptions, and climate events force companies to seek resilience and diversification. Nexus AI provides the tools to identify and vet alternative markets and partners, moving beyond traditional hubs. The system's TradeDisruptionModel and MarketDiversificationEngine are built specifically to address this modern reality.</li>
                                <li><strong>The Rise of a Multipolar World:</strong> Economic power is decentralizing. The next wave of growth will come from emerging regional economies in places like Southeast Asia, Africa, and Latin America. However, reliable intelligence on these markets is scarce and expensive. Nexus AI democratizes access to this crucial information.</li>
                                <li><strong>The Need for Cost-Effective Intelligence:</strong> In a tight economic climate, businesses cannot afford the six-figure price tags of traditional consulting firms for early-stage market exploration. Nexus AI offers a scalable, on-demand alternative, providing deep intelligence for a fraction of the cost.</li>
                                <li><strong>Demand for Sustainable & Ethical Investment (ESG):</strong> Investors and governments are increasingly focused on Environmental, Social, and Governance (ESG) factors. The system's ability to run SDG Alignment Reports and its built-in Shared Value Model (reinvesting 10% of fees into local communities) directly meets this demand, making it a tool for not just profit, but for purposeful, sustainable development.</li>
                            </ul>
                        </div>

                        {/* What Can The System Do? */}
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">What Can The System Do? A Step-by-Step Explanation</h3>
                            <p className="text-gray-600 mb-8 max-w-3xl mx-auto text-center">The system is designed to be accessible to anyone, regardless of their technical expertise. A user can start with a single sentence or a complex document, and the system guides them to a powerful, actionable output.</p>
                            
                            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                                <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
                                    <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=500&h=500&fit=crop" alt="A person typing on a laptop, representing user intent." className="w-full h-48 object-cover rounded-md mb-4"/>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">It Understands Your Intent</h4>
                                        <p className="text-sm text-gray-600 mt-1">The process begins with you telling the system what you need. This can be as simple as "I want to find renewable energy partners in Southeast Asia" or as complex as uploading a 20-page strategic plan. The Nexus Co-pilot assesses this input to understand your core objective.</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
                                    <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=500&h=500&fit=crop" alt="A team collaborating around a table, refining a mission." className="w-full h-48 object-cover rounded-md mb-4"/>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">It Helps You Refine Your Mission</h4>
                                        <p className="text-sm text-gray-600 mt-1">The Co-pilot then engages with you, helping you scope the project. It will ask you to define your role, select from a menu of Analysis Tiers, and choose one or more AI Analyst Personas to frame the report from the perspective you need.</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
                                    <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=500&h=500&fit=crop" alt="A world map with data visualizations, representing global analysis." className="w-full h-48 object-cover rounded-md mb-4"/>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">It Analyzes the World in Minutes</h4>
                                        <p className="text-sm text-gray-600 mt-1">Once the mission is set, the Nexus Engine takes over. It performs three key functions simultaneously:</p>
                                        <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
                                            <li><strong>Diagnoses (RROI):</strong> Assesses the "health" and potential of your target region.</li>
                                            <li><strong>Predicts (TPT):</strong> Simulates future outcomes based on potential actions.</li>
                                            <li><strong>Architects (SEAM):</strong> Designs an ecosystem of ideal, real-world partners.</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
                                    <img src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?q=80&w=500&h=500&fit=crop" alt="A person holding a tablet displaying a finished report." className="w-full h-48 object-cover rounded-md mb-4"/>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">It Delivers an Interactive Blueprint (Using NSIL™)</h4>
                                        <p className="text-sm text-gray-600 mt-1">The final output is not a static PDF. It's a dynamic Intelligence Blueprint structured with our proprietary Nexus Symbiotic Intelligence Language (NSIL™). This turns every piece of the report into a live, queryable element, allowing you to continue the strategic conversation with the AI.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Full Capacity */}
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">What is its Full Capacity? Evaluating All Industries and Markets</h3>
                            <p className="text-gray-600 mb-6">The system's capacity is designed to be global and all-encompassing.</p>
                            <div className="space-y-4">
                                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                    <h4 className="font-semibold text-gray-800">Global Data Integration</h4>
                                    <p className="text-sm text-gray-600">It connects to live data feeds from major international bodies like the World Bank, IMF, and UN Comtrade, ensuring its analysis is based on the most current economic reality, not outdated reports.</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                    <h4 className="font-semibold text-gray-800">Universal Applicability</h4>
                                    <p className="text-sm text-gray-600">It is built to analyze any industry in any economic market. Whether you are exploring AgriTech in Mindanao, FinTech in Kenya, or manufacturing in Central Europe, the underlying analytical frameworks (RROI, TPT, SEAM) are designed to be universally applicable.</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                    <h4 className="font-semibold text-gray-800">Deep Specialization through Advanced Modules</h4>
                                    <p className="text-sm text-gray-600">Beyond the standard reports, the system has a vast library of Advanced Analytical Modules that can be activated for enterprise-level analysis. These cover highly specialized areas, including:</p>
                                    <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
                                        <li><strong>Economic Intelligence:</strong> Market stability, economic forecasting, and global trade flow analytics.</li>
                                        <li><strong>Predictive Intelligence:</strong> Forecasting emerging trends, modeling "black swan" events, and running complex disruption analyses (e.g., tariff impacts, supply chain shocks).</li>
                                        <li><strong>Governance & Policy:</strong> Simulating the impact of new policies and assessing the quality of regional governance.</li>
                                        <li><strong>Social & Environmental:</strong> Deep dives into demographic trends, climate risk, and ESG compliance.</li>
                                    </ul>
                                </div>
                            </div>
                            <p className="text-gray-600 mt-6">In essence, the full capacity of the BWGA Nexus AI system is to act as a scalable, on-demand strategic intelligence division for any organization. It combines the roles of a market researcher, an economic analyst, a geopolitical strategist, and a management consultant into a single, accessible platform, capable of delivering in minutes what would traditionally take months and hundreds of thousands of dollars to achieve.</p>
                        </div>
                    </div>
                </section>

                {/* What Makes It Different Section */}
                <section className="bg-gray-800 text-white p-8 md:p-12 rounded-2xl shadow-lg">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold tracking-tight">What Makes BWGA Nexus AI Different?</h2>
                        <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-300">This isn't just another AI tool. It's your strategic advantage in a world of uncertainty, specifically designed for early-stage understanding where clarity is most needed and hardest to find.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
                            <h3 className="text-lg font-bold text-blue-300 mb-2">Low-Cost, High-Value Access</h3>
                            <p className="text-gray-300 text-sm">We democratize access to world-class intelligence. For a simple monthly fee, you get insights that were previously only available to the largest corporations with six-figure consulting budgets. Intelligence Blueprints have helped clients secure $50M+ in strategic partnerships, enter 15+ new markets successfully, develop 200+ partner relationships, and launch 25+ joint ventures.</p>
                        </div>
                        <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
                            <h3 className="text-lg font-bold text-blue-300 mb-2">Unparalleled Analytical Depth</h3>
                            <p className="text-gray-300 text-sm">Our proprietary frameworks (RROI - Regional Readiness & Opportunity Index, TPT - Trajectory Prediction Tool, SEAM - Strategic Ecosystem Architecture Model) provide a level of insight no other system can match. We don't just show you data; we reveal the underlying economic DNA of a region and help you model its future.</p>
                        </div>
                        <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
                            <h3 className="text-lg font-bold text-blue-300 mb-2">Crystal-Clear Understanding of Any Region</h3>
                            <p className="text-gray-300 text-sm">Our system is built to transform the complexity and ambiguity of regional economies—anywhere in the world—into crystal-clear, actionable intelligence. It gives you the confidence to act on opportunities that others miss because they can't see them.</p>
                        </div>
                        <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
                            <h3 className="text-lg font-bold text-blue-300 mb-2">A Bridge to Global Opportunity</h3>
                            <p className="text-gray-300 text-sm">Nexus AI is engineered to bridge the critical gaps overlooked by traditional research. It works seamlessly with your existing processes, providing the intelligence layer that helps you step into new global ventures with confidence and clarity, regardless of your venture's scale or scope.</p>
                        </div>
                    </div>
                </section>

                {/* Pricing Section with Shared Value Model */}
                <section className="bg-white p-8 md:p-12 rounded-2xl shadow-lg text-center">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Simple, Transparent Pricing & Our Shared Value Model</h2>
                    </div>
                    <p className="text-base text-gray-600 max-w-2xl mx-auto mb-10">
                        Gain full access to the BWGA Nexus AI platform with unlimited usage. No hidden fees, no complex tiers. Just pure, unadulterated clarity.
                    </p>
                    <div className="grid md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
                        <div className="bg-gray-100 rounded-xl p-8 border border-gray-200 text-center">
                            <p className="text-5xl font-extrabold text-gray-900 mb-2">$59</p>
                            <p className="text-gray-600 font-semibold mb-4">per month</p>
                            <p className="text-xs text-gray-500 mb-6">3, 6, or 12-month subscriptions available on request.</p>
                            <ul className="text-left space-y-3 text-gray-700 text-sm">
                                <li className="flex items-center gap-2"><span className="text-green-500">✔</span> Unlimited Intelligence Reports</li>
                                <li className="flex items-center gap-2"><span className="text-green-500">✔</span> Unlimited use of the Nexus Enquire AI Copilot</li>
                                <li className="flex items-center gap-2"><span className="text-green-500">✔</span> Real-Time Data Access & Analysis</li>
                                <li className="flex items-center gap-2"><span className="text-green-500">✔</span> Multi-Persona AI Configuration</li>
                            </ul>
                        </div>
                        <div className="bg-green-50 p-8 rounded-xl border-2 border-dashed border-green-300 h-full flex flex-col justify-center">
                            <h3 className="text-xl font-bold text-green-800 mb-3">Feature: The Shared Value Model</h3>
                            <p className="text-gray-700 text-sm mb-4">
                                Furthermore, we believe our work must create mutual, sustainable benefit. Therefore, 10% of the net fee from every report is directly reinvested into community-identified development initiatives within the specific region you analyze. Your investment in strategic intelligence also creates tangible local impact.
                            </p>
                            <div className="bg-white p-4 rounded-lg border border-green-200">
                                <p className="text-2xl font-extrabold text-green-600">10%</p>
                                <p className="text-sm font-semibold text-green-800">of your fee is directly reinvested into community-identified development initiatives in the region you analyze.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="text-center bg-gray-800 text-white rounded-2xl p-12">
                    <h2 className="text-2xl font-bold mb-4">Stop Guessing. Start Knowing.</h2>
                    <p className="text-base text-gray-300 mb-8 max-w-3xl mx-auto">
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
                    <p className="font-semibold text-gray-600">BW Global Advisory</p>
                    <p className="text-sm mb-4">ABN 55 978 113 300</p>
                    <p className="text-xs">&copy; 2024 BW Global Advisory. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default WhoWeAre;