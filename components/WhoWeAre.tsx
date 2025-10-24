import React from 'react';
import Card from './common/Card.tsx';
import { BlueprintIcon, LightbulbIcon, TargetIcon, CodeIcon, BriefcaseIcon, ShieldCheckIcon } from './Icons.tsx';
import VillageCityMergeIcon from './VillageCityMergeIcon.tsx';

interface WhoWeAreProps {
    onViewChange: (view: string) => void;
}

const Section: React.FC<{ subtitle?: string; title: string; children: React.ReactNode; dark?: boolean }> = ({ subtitle, title, children, dark }) => (
    <section className={`py-6 px-4 ${dark ? 'bg-nexus-primary-900' : 'bg-white'} w-full`}>
        <div className="max-w-5xl mx-auto">
            {subtitle && <p className="text-xs font-semibold uppercase tracking-wider text-nexus-accent-brown mb-1">{subtitle}</p>}
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-nexus-text-primary via-nexus-accent-cyan to-nexus-text-primary">
                {title}
            </h2>
            <div className={`prose ${dark ? 'prose-invert' : ''} max-w-none mb-4`}>{children}</div>
        </div>
    </section>
);

const FeatureCard: React.FC<{ icon: React.ElementType; title: string; children: React.ReactNode; }> = ({ icon: Icon, title, children }) => (
    <div className="bg-white/80 border border-nexus-border-medium rounded-xl p-5 shadow-md flex flex-col items-center text-center">
        <Icon className="w-10 h-10 text-nexus-accent-cyan mb-3" />
        <h3 className="text-lg font-bold text-nexus-text-primary mb-1">{title}</h3>
        <div className="text-nexus-text-secondary text-sm">{children}</div>
    </div>
);

const WhoWeAre: React.FC<WhoWeAreProps> = ({ onViewChange }) => {
    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-nexus-primary-900 via-nexus-primary-800 to-nexus-primary-900">
            <header className="relative text-center py-16 md:py-24 px-4 bg-gradient-to-br from-nexus-primary-800/30 via-nexus-surface-800/20 to-nexus-primary-800/30 overflow-visible">
                <h1 className="relative z-20 text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-nexus-text-primary via-nexus-accent-cyan to-nexus-text-primary font-serif mb-4 md:mb-6 leading-tight">
                  Who, What & Why
                </h1>
                <p className="relative z-20 mt-2 md:mt-4 text-lg md:text-xl text-nexus-text-secondary max-w-2xl mx-auto leading-relaxed">
                    The breakthrough intelligence engine for regional growth, born from experience.
                </p>
                <div className="relative w-full max-w-3xl mx-auto mt-8 md:mt-12 z-10">
                    <VillageCityMergeIcon className="w-full h-auto opacity-90" />
                </div>
            </header>

            <Section subtitle="Who We Are" title="The Founder's Story" dark>
                <p className="text-lg font-semibold text-nexus-accent-cyan mb-2">I am an independent developer and strategist with a deep commitment to innovation and sustainable growth.</p>
                <p>My work with government, business, and community stakeholders revealed the persistent inefficiencies and information gaps that hinder regional development. This experience inspired me to create a tool that brings clarity, efficiency, and actionable intelligence to leaders in complex environments.</p>
                <p className="text-lg font-semibold text-nexus-accent-cyan mt-4 mb-2">BWGA is an independent Australian initiative, born from a profound observation made during more than a year of immersive, on-the-ground experience within the regional Philippines:</p>
                <p><span className="font-bold text-nexus-accent-cyan">The core problem isn't a lack of capital, but a lack of clarity.</span></p>
                <p className="mt-4"><span className="font-bold text-nexus-accent-cyan">Key Facts:</span></p>
                <ul className="list-disc ml-6">
                    <li><span className="font-semibold">Founded by Brayden Walls, an independent developer and strategist.</span></li>
                    <li><span className="font-semibold">Driven by real-world experience in government, business, and community development.</span></li>
                    <li><span className="font-semibold">Focused on solving persistent inefficiencies and information gaps in regional growth.</span></li>
                </ul>
            </Section>

            <Section subtitle="Why It Was Built" title="The Genesis of BWGA">
                <p className="text-lg font-semibold text-nexus-accent-cyan mb-2">The biggest obstacle to growth wasn’t a lack of capital, but a lack of clarity.</p>
                <p>Governments, investors, and communities struggled with fragmented data, siloed information, and outdated systems—making confident decisions difficult and slowing progress.</p>
                <p className="mt-4"><span className="font-bold text-nexus-accent-cyan">BWGA was engineered as a practical, independent solution:</span></p>
                <ul className="list-disc ml-6">
                    <li><span className="font-semibold">Unifies intelligence and provides clarity for leaders facing complex challenges.</span></li>
                    <li><span className="font-semibold">Empowers decision-makers to unlock regional potential and drive sustainable growth.</span></li>
                </ul>
            </Section>

            <Section subtitle="What It Is" title="The BWGA Nexus System" dark>
                <p className="text-lg font-semibold text-nexus-accent-cyan mb-2">An AI-powered platform designed for overlooked and underestimated regions.</p>
                <p>BWGA brings together advanced analysis, contextual intelligence, and actionable insights through its core components:</p>
                <ul className="list-disc ml-6">
                    <li><span className="font-semibold">Nexus Brain:</span> The central AI engine that uncovers insights and drives analysis for regional growth.</li>
                    <li><span className="font-semibold">NSIL (Nexus Symbiotic Intelligence Language):</span> A proprietary language that maps complex relationships and models regional ecosystems contextually.</li>
                    <li><span className="font-semibold">Intelligence Blueprint Generator:</span> Produces tailored intelligence reports and strategic blueprints for leaders, investors, and policymakers—turning complex analysis into clear, actionable guidance.</li>
                </ul>
            </Section>

            <Section subtitle="What It Produces & Why" title="Clarity, Confidence, and Action">
                <p className="text-lg font-semibold text-nexus-accent-cyan mb-2">The Nexus System generates actionable intelligence reports and strategic blueprints.</p>
                <ul className="list-disc ml-6">
                    <li><span className="font-semibold">Maps economic landscapes and identifies key drivers.</span></li>
                    <li><span className="font-semibold">Models strategic scenarios for policy and investment.</span></li>
                    <li><span className="font-semibold">Delivers clarity and confidence for decision-makers by producing actionable intelligence reports and strategic blueprints.</span></li>
                </ul>
                <p className="mt-4"><span className="font-bold text-nexus-accent-cyan">Why?</span> To bridge the gap between potential and progress, providing the clarity and confidence needed for high-impact decisions in complex environments.</p>
            </Section>

            <Section subtitle="A New Paradigm in Regional Intelligence" title="Why It's Different">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                    <FeatureCard icon={LightbulbIcon} title="Context, Not Just Data">
                        <p>Unlike generic BI tools, BWGA provides the contextual, socio-economic, and political intelligence needed for real-world decision-making.</p>
                    </FeatureCard>
                    <FeatureCard icon={TargetIcon} title="Dynamic, Not Static">
                        <p>It provides real-time, scalable intelligence at a fraction of the cost of traditional consulting, which produces expensive and time-consuming static reports.</p>
                    </FeatureCard>
                </ul>
                <p className="mt-2 text-sm">
                    The core differentiator is the unique fusion of cutting-edge AI with a framework grounded in real-world strategic experience. Every output is tailored, not templated, ensuring its relevance and impact.
                </p>
                <ul className="list-disc ml-6 mt-4 text-sm">
                    <li>Unified and enriched data from global and local sources.</li>
                    <li>Scalable intelligence for governments, investors, and development agencies.</li>
                    <li>Empowers leaders to make confident, data-driven decisions for regional growth.</li>
                </ul>
            </Section>

            <Section subtitle="Who It's For" title="Empowering Global & Regional Leaders" dark>
                <p>
                    BWGA is designed for any leader whose decisions shape the course of regional development and investment. Our users are those who operate in high-stakes environments and cannot afford to be wrong.
                </p>
                <ul className="list-disc ml-6 mt-4 text-sm">
                    <li><strong>Governments & Public Sector Agencies:</strong> For evidence-based policymaking, attracting foreign investment, and optimizing infrastructure planning.</li>
                    <li><strong>Global Investors & Corporations:</strong> To de-risk market entry, conduct rigorous due diligence, and identify high-return opportunities that others miss.</li>
                    <li><strong>Development Banks & Financial Institutions:</strong> To validate project viability, monitor regional economic health, and direct capital towards impactful and sustainable growth.</li>
                    <li><strong>Regional Planners & Economic Development Organizations:</strong> To build compelling, data-driven business cases, benchmark regional performance, and design effective growth strategies.</li>
                </ul>
            </Section>

            <Section subtitle="Worldwide Applicability" title="A Globally Scalable, Locally-Tuned Engine">
                <p>
                    While born from deep experience in the Philippines, the BWGA framework was engineered from day one for global applicability. The challenges of regional development—information gaps, lack of clarity, and inefficient capital allocation—are universal.
                </p>
                <p>
                    The system's strength lies in its adaptable core. The Nexus Brain is designed to be "tuned" to any region in the world by learning its unique regulatory environment, data sources, and socio-economic context. It provides a standardized, world-class methodology for analysis that can be applied anywhere, while ensuring the intelligence it produces is always hyper-localized, context-aware, and immediately actionable.
                </p>
                <p>
                    Whether you are analyzing an emerging market in Southeast Asia, a post-industrial region in Europe, or a developing economic zone in Africa, BWGA provides the universal key to unlocking regional potential: <strong>clarity</strong>.
                </p>
            </Section>

            <section>
                <div className="text-center p-10 bg-gradient-to-br from-nexus-accent-brown/20 to-nexus-accent-cyan/20 rounded-2xl border border-nexus-border-medium max-w-3xl mx-auto my-12">
                    <h2 className="text-3xl font-extrabold text-nexus-text-primary">Ready to See the Nexus in Action?</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-nexus-text-secondary">
                        Explore the platform and see how BWGA can provide the clarity and confidence you need to drive regional growth.
                    </p>
                    <button
                        onClick={() => onViewChange('dashboard')}
                        className="mt-8 nexus-button-primary flex items-center gap-3 mx-auto"
                    >
                        <BlueprintIcon className="w-6 h-6" />
                        Go to Dashboard
                    </button>
                </div>
            </section>

            <footer className="mt-16 py-8 border-t border-nexus-border-medium bg-nexus-primary-800/50">
                <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
                    <div className="space-y-2">
                        <p className="text-sm text-nexus-text-secondary">
                            BWGA Global Advisory operates under Australian Business Number <strong className="text-nexus-text-primary">ABN 55 978 113 300</strong>
                        </p>
                        <p className="text-xs text-nexus-text-muted">
                            © 2024 BWGA Global Advisory. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default WhoWeAre;