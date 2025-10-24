import React from 'react';
import { BlueprintIcon, LightbulbIcon, TargetIcon, GlobeIcon, UsersIcon, PuzzleIcon } from './Icons.tsx';

interface WhoWeAreProps {
    onViewChange: (view: string) => void;
}

// Section component with alternating dark/light backgrounds and optional illustration
const Section: React.FC<{ 
    subtitle?: string; 
    title: string; 
    children: React.ReactNode; 
    dark?: boolean; 
    illustration?: React.ReactNode; 
    reverse?: boolean;
    id?: string;
}> = ({ subtitle, title, children, dark, illustration, reverse, id }) => (
    <section id={id} className={`py-16 px-4 sm:px-6 lg:px-8 w-full ${dark ? 'bg-nexus-primary-900' : 'bg-nexus-primary-800/30'}`}>
        <div className={`max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center ${reverse ? 'md:grid-flow-col-dense' : ''}`}>
            <div className={reverse ? 'md:col-start-2' : ''}>
                {subtitle && <p className="text-sm font-semibold uppercase tracking-wider text-nexus-accent-brown mb-2">{subtitle}</p>}
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-nexus-text-primary via-nexus-accent-cyan to-nexus-text-primary">
                    {title}
                </h2>
                <div className="prose prose-invert max-w-none text-nexus-text-secondary prose-p:text-nexus-text-secondary prose-strong:text-nexus-text-primary prose-li:text-nexus-text-secondary">
                    {children}
                </div>
            </div>
            {illustration && (
                <div className={`flex items-center justify-center p-8 ${reverse ? 'md:col-start-1' : ''}`}>
                    {illustration}
                </div>
            )}
        </div>
    </section>
);

// Feature card for "Why It's Different" section
const FeatureCard: React.FC<{ icon: React.ElementType; title: string; children: React.ReactNode; }> = ({ icon: Icon, title, children }) => (
    <div className="bg-nexus-surface-800/60 border border-nexus-border-medium rounded-xl p-6 shadow-lg flex flex-col text-left h-full">
        <div className="flex items-center gap-4 mb-3">
            <Icon className="w-10 h-10 text-nexus-accent-cyan" />
            <h3 className="text-xl font-bold text-nexus-text-primary">{title}</h3>
        </div>
        <div className="text-nexus-text-secondary">{children}</div>
    </div>
);

const WhoWeAre: React.FC<WhoWeAreProps> = ({ onViewChange }) => {
    return (
        <div className="w-full min-h-screen bg-nexus-primary-900">
            {/* Header with realistic background image */}
            <header className="relative text-center py-24 md:py-32 px-4 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2832&auto=format&fit=crop" 
                        alt="Professional business team collaborating" 
                        className="w-full h-full object-cover opacity-20" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-nexus-primary-900 via-nexus-primary-900/70 to-transparent"></div>
                </div>
                <div className="relative z-10 max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-nexus-accent-cyan to-white mb-4 leading-tight">
                      Who, What and Why
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-nexus-text-secondary max-w-3xl mx-auto leading-relaxed">
                        The breakthrough intelligence engine for regional growth, born from experience.
                    </p>
                </div>
            </header>

            {/* Founder's Story Section */}
            <Section 
                id="who"
                subtitle="Who We Are" 
                title="The Founder's Story" 
                dark
                illustration={
                    <img 
                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop" 
                        alt="Founder" 
                        className="rounded-lg shadow-2xl w-64 h-64 object-cover" 
                    />
                }>
                <p className="text-lg font-semibold text-nexus-accent-cyan mb-3">An independent developer and strategist with a deep commitment to innovation and sustainable growth.</p>
                <p>My work with government, business, and community stakeholders revealed the persistent inefficiencies and information gaps that hinder regional development. This experience inspired me to create a tool that brings clarity, efficiency, and actionable intelligence to leaders in complex environments.</p>
                <p className="mt-4"><strong className="text-nexus-accent-cyan">The core problem isn't a lack of capital, but a lack of clarity.</strong></p>
            </Section>

            {/* Genesis Section */}
            <Section 
                id="why"
                subtitle="Why It Was Built" 
                title="The Genesis of BWGA"
                reverse
                illustration={<PuzzleIcon className="w-48 h-48 text-nexus-accent-cyan/50" />}>
                <p className="text-lg font-semibold text-nexus-accent-cyan mb-3">The biggest obstacle to growth wasn’t a lack of capital, but a lack of clarity.</p>
                <p>Governments, investors, and communities struggled with fragmented data, siloed information, and outdated systems—making confident decisions difficult and slowing progress.</p>
                <p className="mt-4"><strong className="text-nexus-accent-cyan">BWGA was engineered as a practical, independent solution to unify intelligence and empower decision-makers to unlock regional potential.</strong></p>
            </Section>

            {/* Nexus System Section */}
            <Section 
                id="what"
                subtitle="What It Is" 
                title="The BWGA Nexus System" 
                dark
                illustration={<GlobeIcon className="w-48 h-48 text-nexus-accent-cyan/50" />}>
                <p className="text-lg font-semibold text-nexus-accent-cyan mb-3">An AI-powered platform designed for overlooked and underestimated regions.</p>
                <p>BWGA brings together advanced analysis, contextual intelligence, and actionable insights through its core components:</p>
                <ul className="list-disc ml-6 space-y-2 mt-4">
                    <li><strong>Nexus Brain:</strong> The central AI engine that uncovers insights and drives analysis for regional growth.</li>
                    <li><strong>NSIL (Nexus Symbiotic Intelligence Language):</strong> A proprietary language that maps complex relationships and models regional ecosystems contextually.</li>
                    <li><strong>Intelligence Blueprint Generator:</strong> Produces tailored intelligence reports and strategic blueprints for leaders, investors, and policymakers.</li>
                </ul>
            </Section>

            {/* Why It's Different Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-nexus-primary-800/30 w-full">
                <div className="max-w-5xl mx-auto text-center">
                    <p className="text-sm font-semibold uppercase tracking-wider text-nexus-accent-brown mb-2">A New Paradigm</p>
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-12 text-transparent bg-clip-text bg-gradient-to-r from-nexus-text-primary via-nexus-accent-cyan to-nexus-text-primary">
                        Why It's Different
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                        <FeatureCard icon={LightbulbIcon} title="Context, Not Just Data">
                            <p>Unlike generic BI tools, BWGA provides the contextual, socio-economic, and political intelligence needed for real-world decision-making.</p>
                        </FeatureCard>
                        <FeatureCard icon={TargetIcon} title="Dynamic, Not Static">
                            <p>It provides real-time, scalable intelligence at a fraction of the cost of traditional consulting, which produces expensive and time-consuming static reports.</p>
                        </FeatureCard>
                    </div>
                </div>
            </section>

            {/* Who It's For Section */}
            <Section 
                subtitle="Who It's For" 
                title="Empowering Global & Regional Leaders" 
                dark
                illustration={<UsersIcon className="w-48 h-48 text-nexus-accent-cyan/50" />}>
                <p>BWGA is designed for any leader whose decisions shape the course of regional development and investment. Our users are those who operate in high-stakes environments and cannot afford to be wrong.</p>
                <ul className="list-disc ml-6 mt-4 space-y-2">
                    <li><strong>Governments & Public Sector Agencies:</strong> For evidence-based policymaking, attracting foreign investment, and optimizing infrastructure planning.</li>
                    <li><strong>Global Investors & Corporations:</strong> To de-risk market entry, conduct rigorous due diligence, and identify high-return opportunities that others miss.</li>
                    <li><strong>Development Banks & Financial Institutions:</strong> To validate project viability, monitor regional economic health, and direct capital towards impactful and sustainable growth.</li>
                    <li><strong>Regional Planners & Economic Development Organizations:</strong> To build compelling, data-driven business cases, benchmark regional performance, and design effective growth strategies.</li>
                </ul>
            </Section>

            {/* Call to Action Section */}
            <section className="py-20">
                <div className="text-center p-10 bg-gradient-to-br from-nexus-accent-cyan/20 to-nexus-accent-brown/20 rounded-2xl border border-nexus-border-medium max-w-4xl mx-auto my-12">
                    <h2 className="text-3xl font-extrabold text-nexus-text-primary">Ready to See the Nexus in Action?</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-nexus-text-secondary">
                        Explore the platform and see how BWGA can provide the clarity and confidence you need to drive regional growth.
                    </p>
                    <button
                        onClick={() => onViewChange('report')}
                        className="mt-8 nexus-button-primary flex items-center gap-3 mx-auto"
                    >
                        <BlueprintIcon className="w-6 h-6" />
                        Go to Dashboard
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 border-t border-nexus-border-medium bg-nexus-primary-800/50">
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