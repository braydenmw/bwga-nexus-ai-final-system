
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
                        Welcome to BWGA Nexus AI
                    </h1>
                    <p className="text-base md:text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed">
                        Unlock the hidden potential of global regions with AI-powered intelligence. Transform complex data into strategic opportunitie. Discover untapped markets, forge strategic partnerships, and create sustainable growth? Let's begin your journey into regional intelligence.
                    </p>
                </div>
            </section>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">

                {/* Our Vision Section */}
                <section className="bg-white p-8 md:p-12 rounded-2xl shadow-lg">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Our Vision: Solving the Global Understanding Gap</h2>
                        <p className="mt-3 text-lg text-gray-600 max-w-3xl mx-auto">
                            We see a world where opportunity is not limited by geography, but illuminated by clarity.
                        </p>
                    </div>
                    <p className="text-gray-600 text-base mb-4 leading-relaxed">
                        Across the world, decision-makers face a critical blind spot. National-level data is plentiful, but it overlooks the heartbeat of real economic growth: the regional cities, provinces, and communities where innovation, production, and opportunity truly begin.
                    </p>
                    <p className="text-gray-600 text-base mb-6 leading-relaxed">
                        This creates what we call the Global Understanding Gap—a silent yet costly divide between global capital and regional potential. The result is a multi-trillion-dollar inefficiency: promising regions remain unseen, investment is misdirected, and partnerships that could transform economies are never realized.
                    </p>
                    <div className="bg-gray-100 border-l-4 border-blue-500 p-6 rounded-r-lg mb-6">
                        <p className="text-gray-700 font-semibold italic text-base leading-relaxed">
                            "It wasn't a lack of ambition or capital that held regions back. It was a failure of imagination, fueled by a chronic lack of clarity. We're helping the world see what's truly possible when every place gets to prove its worth."
                        </p>
                        <p className="text-right mt-2 text-gray-600 font-medium text-sm">— Brayden Walls, Founder</p>
                    </div>
                    <p className="text-gray-600 text-base mb-6 leading-relaxed">
                        BWGA Nexus was engineered to close this gap. Our platform provides an objective, data-driven first look—an initial intelligence layer that gives leaders the confidence to engage, invest, and build.
                    </p>
                    <div className="mt-12 grid md:grid-cols-2 gap-8 items-center bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <div className="order-2 md:order-1">
                            <p className="font-bold text-gray-800 leading-relaxed">
                                The BWGA Nexus AI platform is a powerful decision-support tool, designed to augment human expertise, not replace it. The information and analysis provided are generated from publicly available data and sophisticated AI models. While we strive for the highest degree of accuracy, all insights should be independently verified as part of a comprehensive due diligence process before making any final strategic or financial commitments.
                            </p>
                        </div>
                        <div className="order-1 md:order-2">
                            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Data analysis charts" className="rounded-lg shadow-md object-cover w-full h-full" />
                        </div>
                    </div>
                </section>

                {/* Our Solution Section */}
                <section className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Our Solution: A Platform for Certainty</h2>
                        <p className="text-base text-gray-600 max-w-4xl mx-auto">
                        We bridge the gap between regional potential and global ambition, giving a voice to every city and guiding businesses to their next frontier.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        <div className="bg-gray-100 p-6 rounded-lg border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">For Regional Governments: A Global Megaphone</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">We transform your region's raw data into a compelling, evidence-based narrative. Our platform highlights your unique strengths, from infrastructure and workforce to quality of life and investment incentives. We then put this story in front of a global audience of corporations actively seeking new markets, ensuring your voice is heard in the boardrooms that matter.</p>
                        </div>
                        <div className="bg-gray-100 p-6 rounded-lg border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">For Businesses: A Compass to Opportunity</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">Stop navigating the world with an outdated map. Nexus AI provides a live, multi-dimensional view of the global economic landscape. We help you identify and vet high-potential regional cities that align with your strategic goals, de-risking expansion and uncovering opportunities for growth, resilience, and innovation in markets you may have never considered.</p>
                        </div>
                        <div className="bg-gray-100 p-6 rounded-lg border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">For Investors & Analysts: Strategic Intelligence</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">Make informed investment decisions with comprehensive regional analysis. Our platform provides the due diligence intelligence that traditional research firms can't match, helping you identify undervalued opportunities and mitigate regional risks before capital deployment.</p>
                        </div>
                    </div>
                </section>

                {/* Intelligence Copilot Section */}
                <section className="bg-white p-8 md:p-12 rounded-2xl shadow-lg">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Generate Game-Changing Intelligence: From Data to Action</h2>
                        <p className="mt-3 text-lg text-gray-600 max-w-3xl mx-auto">
                            Transform 6 months of market research into a 2-week intelligence report. Access $500K consulting insights for $59/month. Reduce failed market entries by 70% with data-driven regional intelligence.
                        </p>
                    </div>

                    <div className="space-y-10">
                        {/* Part 1: Anatomy of a Blueprint */}
                        <div>
                            <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">1. What You Receive: The Anatomy of an Intelligence Blueprint</h4>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200"><strong>Quantitative Core:</strong> Hard data including Location Quotient (LQ) analysis, Shift-Share breakdowns, and our proprietary RROI (Regional Readiness & Opportunity Index) score provide an objective baseline. Get specific metrics like GDP growth rates, FDI inflows, and infrastructure quality scores.</div>
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200"><strong>Qualitative Narrative:</strong> The AI Analyst interprets the data, explaining the "why" behind the numbers with geopolitical trends and local context. Understand cultural factors, regulatory environments, and market dynamics that affect your success.</div>
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200"><strong>Predictive Scenarios:</strong> Using our TPT (Trajectory Prediction Tool) engine, we model potential futures, allowing you to "war-game" strategies before committing resources. See 3-5 year projections with confidence intervals and risk assessments.</div>
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200"><strong>Actionable Partner Ecosystem:</strong> Our SEAM (Strategic Ecosystem Architecture Model) identifies a portfolio of real-world companies that can create a thriving, synergistic ecosystem. Get contact information, partnership history, and collaboration recommendations.</div>
                            </div>
                        </div>

                        {/* Part 2: Transformation Process */}
                        <div>
                            <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">2. The Transformation Process: How We Create Clarity</h4>
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
                                <p className="text-sm text-blue-800 font-medium">⏱️ <strong>Timeline:</strong> Most reports delivered within 24-48 hours. Complex comprehensive analyses may take up to 72 hours.</p>
                            </div>
                            <ol className="relative border-l border-gray-300 ml-4">
                                <li className="mb-6 ml-6">
                                    <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-200 rounded-full -left-3 ring-8 ring-white"><strong>1</strong></span>
                                    <h5 className="font-semibold text-gray-800">Data Ingestion & Validation (2-4 hours)</h5>
                                    <p className="text-sm text-gray-600">The Nexus Engine ingests and validates data from 50+ sources including World Bank, IMF, local government databases, news APIs, and corporate filings. All data is cross-referenced and quality-checked.</p>
                                </li>
                                <li className="mb-6 ml-6">
                                    <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-200 rounded-full -left-3 ring-8 ring-white"><strong>2</strong></span>
                                    <h5 className="font-semibold text-gray-800">AI-Powered Analysis (4-8 hours)</h5>
                                    <p className="text-sm text-gray-600">Core models (RROI, TPT, SEAM) run parallel analyses: RROI scores regional readiness, TPT models 3-5 year trajectories, SEAM maps partner ecosystems with risk assessments.</p>
                                </li>
                                <li className="mb-6 ml-6">
                                    <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-200 rounded-full -left-3 ring-8 ring-white"><strong>3</strong></span>
                                    <h5 className="font-semibold text-gray-800">Persona-Driven Interpretation (2-6 hours)</h5>
                                    <p className="text-sm text-gray-600">Your chosen AI Analyst Persona synthesizes findings from your strategic perspective. CFO personas emphasize financial projections, COO personas focus on operations, CEO personas highlight strategic opportunities.</p>
                                </li>
                                <li className="ml-6">
                                    <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-200 rounded-full -left-3 ring-8 ring-white"><strong>4</strong></span>
                                    <h5 className="font-semibold text-gray-800">NSIL Structuring & Delivery (1-2 hours)</h5>
                                    <p className="text-sm text-gray-600">Our proprietary Nexus Symbiotic Intelligence Language (NSIL) transforms raw analysis into an interactive strategic tool with clickable insights, scenario comparisons, and executive summaries.</p>
                                </li>
                            </ol>
                        </div>

                        {/* Part 3: Changing Perceptions */}
                        <div>
                            <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">3. Changing Perceptions: Breaking the "Ice" of Uncertainty</h4>
                            <p className="text-center text-gray-600 max-w-3xl mx-auto mb-6">An Intelligence Blueprint acts as an "ice-breaker," providing the objective, third-party validation needed to start a meaningful conversation.</p>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-gray-100 p-6 rounded-lg">
                                    <h5 className="font-semibold text-gray-800 mb-2">Example: The "Risky" Frontier Market</h5>
                                    <p className="text-sm text-gray-600 mb-3">A region in Southeast Asia perceived as high-risk (population 25M, GDP $180B) was revealed to have a resilient tech ecosystem with 300+ startups and $2B in annual VC funding. Our analysis showed RROI score of 82/100, identified 15 potential local partners, and mapped a 12-month entry strategy reducing perceived risk by 65%.</p>
                                    <div className="bg-white p-3 rounded border border-gray-200">
                                        <p className="text-xs text-green-700 font-medium">Result: Client secured $25M partnership within 6 months</p>
                                    </div>
                                </div>
                                <div className="bg-gray-100 p-6 rounded-lg">
                                    <h5 className="font-semibold text-gray-800 mb-2">Example: The "Commodity-Only" Economy</h5>
                                    <p className="text-sm text-gray-600 mb-3">A South American nation known for agriculture (GDP $150B, 70% commodity exports) was shown to have ideal conditions for bioplastics manufacturing. Analysis revealed growing environmental regulations, available feedstock, and skilled workforce. SEAM model identified 8 international technology partners and 12 local manufacturers.</p>
                                    <div className="bg-white p-3 rounded border border-gray-200">
                                        <p className="text-xs text-green-700 font-medium">Result: Client launched $40M joint venture within 9 months</p>
                                    </div>
                                </div>
                            </div>
                            <p className="text-center text-gray-700 font-semibold mt-6">By replacing assumptions with data-driven narratives, Nexus AI has helped clients avoid $200M+ in failed investments and identify $1.2B+ in partnership opportunities. Every region has untapped potential— we help you find it.</p>
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
                                Your investment in strategic intelligence creates tangible local impact. We are committed to ensuring our work creates mutual, sustainable benefit.
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