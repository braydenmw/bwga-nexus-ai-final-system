import React from 'react';
import Card from './common/Card.tsx';
import { NexusLogo, BlueprintIcon, BriefcaseIcon, SymbiosisGraphicIcon } from './Icons.tsx';
import { AnnotatedSampleReport } from './AnnotatedSampleReport.tsx';

interface TechnicalManualProps {
    onGetStarted: () => void;
}

const Section: React.FC<{ subtitle: string; title: string; children: React.ReactNode; }> = ({ subtitle, title, children }) => (
    <section className="mb-12">
        {subtitle && <p className="text-sm font-semibold uppercase tracking-wider text-nexus-accent-brown">{subtitle}</p>}
        <h2 className="mt-1 text-3xl font-extrabold text-nexus-text-primary tracking-tight">{title}</h2>
        <div className="mt-4 text-nexus-text-secondary space-y-4 prose prose-invert max-w-none prose-p:text-nexus-text-secondary prose-strong:text-nexus-text-primary">
            {children}
        </div>
    </section>
);

const MethodologyCard: React.FC<{ title: string; children: React.ReactNode; }> = ({ title, children }) => (
    <Card className="p-5 bg-nexus-surface-800/60 border-nexus-border-medium/50 h-full">
        <h4 className="text-lg font-bold text-nexus-accent-brown">{title}</h4>
        <p className="mt-2 text-sm text-nexus-text-secondary">{children}</p>    </Card>
);


export const TechnicalManual: React.FC<TechnicalManualProps> = ({ onGetStarted }) => {
    return (
        <div className="bg-nexus-primary-900">
             <div className="relative bg-nexus-primary-800/50 text-center">
                <div className="max-w-3xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
                    <SymbiosisGraphicIcon className="w-24 h-24 text-nexus-accent-cyan mx-auto mb-4" />
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-nexus-text-primary tracking-tighter">Engineering Global-Regional Symbiosis</h1>
                    <p className="mt-6 text-xl text-nexus-text-secondary max-w-3xl mx-auto">
                        A new intelligence paradigm for a multipolar world. The Nexus platform is built to translate raw data into strategic foresight. Here’s a look at the principles and technologies that power our analysis.
                    </p>
                </div>
            </div>

            <div className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">

                    <Section subtitle="Our Core Mission" title="Solving the Global Understanding Gap">
                        <p>
                            Across the world, decision-makers face a critical blind spot. National-level data is plentiful — but it overlooks the heartbeat of real economic growth: the regional cities, provinces, and communities where innovation, production, and opportunity truly begin.
                        </p>
                        <p>
                            This missing layer of insight creates what we call the <strong>Global Understanding Gap</strong> — a silent yet costly divide between global capital and regional potential. The result is a multi-trillion-dollar inefficiency: promising regions remain unseen, investment capital is misdirected, and partnerships that could transform local and global economies are never realized.
                        </p>
                    </Section>
                    
                    <Section subtitle="Part I: The Challenge" title="Why Regional Intelligence is Difficult">
                        <p>
                            Regional economies are the bedrock of national prosperity, yet they are often systematically misunderstood by global markets. The reasons are simple: critical data is fragmented, on-the-ground intelligence is expensive to acquire, and traditional analysis struggles to capture the dynamic, interconnected nature of a local ecosystem. This creates a paralyzing "Understanding Gap" that can stifle investment and prevent regions from realizing their full potential.
                        </p>
                        <p>
                            <strong>BWGA Nexus was engineered to help close this gap.</strong> Our goal is to provide an objective, data-driven first look—an initial intelligence layer that gives leaders the confidence to engage, invest, and build. The Nexus Brain is designed to be a powerful <strong>assistant, not a replacement</strong> for human expertise. Its purpose is to augment strategic planners by performing complex, multi-source research and analysis in <strong>minutes, not months</strong>.
                        </p>
                    </Section>
                    
                    <Section subtitle="Part II: Our Services" title="From Discovery to Deep-Dive Analysis">
                        <p>The Nexus platform provides two complementary services designed to cover the full spectrum of strategic intelligence needs.</p>
                        <div className="grid md:grid-cols-2 gap-8 mt-6">
                            <Card className="p-6 border-nexus-accent-brown/30 bg-nexus-accent-brown/10">
                                <div className="flex items-center gap-4 mb-3">
                                    <BriefcaseIcon className="w-10 h-10 text-nexus-accent-brown flex-shrink-0" />
                                    <h3 className="text-2xl font-bold text-nexus-text-primary">Global Data Hub</h3>
                                </div>
                                <p className="text-nexus-text-secondary">This is your discovery engine. It acts as a **Global Development Opportunity Clearinghouse**, actively aggregating tenders and projects from global sources. Our AI provides an initial feasibility and risk assessment, allowing you to see what's happening *right now* and identify opportunities that align with your strategic goals.</p>
                            </Card>
                             <Card className="p-6 border-nexus-accent-cyan/30 bg-nexus-accent-cyan/10">
                                 <div className="flex items-center gap-4 mb-3">
                                    <BlueprintIcon className="w-10 h-10 text-nexus-accent-cyan flex-shrink-0" />
                                    <h3 className="text-2xl font-bold text-nexus-text-primary">Nexus Reports</h3>
                                </div>
                                <p className="text-nexus-text-secondary">This is your bespoke analysis engine. The engine's power lies in its adaptability. Based on your professional role (e.g., Government, Private Enterprise), you select from a curated menu of **Report Tiers**—from FDI Attraction Blueprints to Market Entry Strategies. You then configure the AI by selecting one or more **Analyst Personas** (like a Venture Capitalist or a Regional Economist) to ensure the analysis is framed from the precise strategic perspective you require.</p>
                            </Card>
                        </div>
                    </Section>

                    <Section subtitle="Part III: The Nexus Brain" title="A Structured Approach to Analysis">
                        <p>To ensure our insights are grounded in a rigorous, repeatable framework, our reports are built on a foundation of proven economic methodologies, orchestrated by the three-layered Nexus Brain.</p>
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <MethodologyCard title="1. The Diagnostic Engine (RROI)">
                               The <strong>Regional Resilience & Opportunity Index</strong> is our proprietary diagnostic tool. It generates a multi-dimensional "health score" for a region by applying foundational economic principles like Shift-Share Analysis, Location Quotient, and Agglomeration theory.
                            </MethodologyCard>
                             <MethodologyCard title="2. The Predictive Engine (TPT)">
                                The <strong>Transformation Pathway Tracer</strong> simulates future outcomes. Using the RROI diagnosis, it applies principles of endogenous growth theory to model the potential impact of strategic interventions, allowing users to "war-game" different development paths.
                            </MethodologyCard>
                             <MethodologyCard title="3. The Prescriptive Engine (SEAM)">
                                The <strong>Symbiotic Ecosystem Architecture Modeler</strong> is the strategy architect. It moves beyond single-partner matchmaking to design a holistic, multi-partner ecosystem required to solve a region's core challenges, prescribing a portfolio of symbiotic partners.
                            </MethodologyCard>
                        </div>
                    </Section>

                     <Section subtitle="Part IV: The Technology" title="About the Nexus Symbiotic Intelligence Language (NSIL)">
                        <p>
                            Standard AI models produce unstructured text, which can be difficult to use for strategic decisions. NSIL is a specialized, XML-like language that we developed to structure the AI's output into logical, interactive components.
                        </p>
                         <blockquote className="p-6 bg-nexus-surface-800/60 rounded-lg border-l-4 border-nexus-accent-brown text-nexus-text-secondary italic">
                                "NSIL was created to solve a fundamental problem: how to turn a machine's vast knowledge into a human's strategic tool. It's the grammar that allows for a true symbiotic dialogue between the user and the AI."
                                <strong className="block not-italic mt-2 text-nexus-text-primary">— Brayden Walls, Founder, BWGA</strong>
                         </blockquote>
                         <p>
                            When you see a report, you're seeing NSIL rendered visually. Each section tagged with NSIL (like `&lt;nsil:synergy_analysis&gt;` or `&lt;nsil:risk_map&gt;`) is a live element, allowing you to launch a "Symbiosis Chat" and query that specific piece of intelligence.
                        </p>
                    </Section>

                    <Section subtitle="Part V: Example Output" title="Deconstructing a Nexus Report">
                         <p>
                            A Nexus Report is not a static document; it's the beginning of a strategic dialogue. The process is a symbiotic partnership designed to merge large-scale data analysis with your specific, expert context. The intelligence is co-created: the AI provides the broad analytical framework based on the **Report Tiers** and **AI Personas** you select; you provide the critical context and strategic objective that makes the insight actionable.
                        </p>
                        <p>
                            To make this concrete, the diagram below breaks down a sample <strong>Regional Explorer Tier</strong> report. The annotations explain how each component is generated—from your direct inputs in the report generator to the complex analytical models our AI applies. This visual guide demonstrates the symbiotic process in action.
                        </p>
                        <div className="mt-8">
                            <AnnotatedSampleReport />
                        </div>
                    </Section>
                    
                    <Section subtitle="Part VI: Enterprise & Government" title="Platform Integration & Licensing">
                        <p>
                            BWGA Nexus AI is engineered not just as a standalone tool, but as an embeddable intelligence layer designed to integrate directly into your existing workflows. We understand that government departments and large enterprises have unique data security, compliance, and operational requirements.
                        </p>
                        <p>
                            For organizations seeking to leverage the full power of the Nexus engine within their own environment, we offer <strong>full platform licensing options</strong>. This provides:
                        </p>
                        <ul className="list-disc list-outside ml-6 space-y-2">
                            <li>Deployment within your private cloud or on-premise infrastructure.</li>
                            <li>Customized integration with your internal data sources and systems.</li>
                            <li>Dedicated support, training, and model fine-tuning for your specific use cases.</li>
                            <li>Full compliance with your organization's data governance and security protocols.</li>
                        </ul>
                        <p>
                            Please contact BW Global Advisory directly to discuss enterprise licensing and partnership opportunities. Our goal is to become a trusted, long-term strategic intelligence partner.
                        </p>
                    </Section>

                     <section>
                         <div className="text-center p-10 bg-gradient-to-br from-nexus-accent-brown/20 to-nexus-accent-cyan/20 rounded-2xl border border-nexus-border-medium">
                             <h2 className="text-3xl font-extrabold text-nexus-text-primary">Ready to Activate Your Regional Strategy?</h2>
                             <p className="mt-4 max-w-2xl mx-auto text-lg text-nexus-text-secondary">
                                Generate your first report to see the Nexus engine in action. Provide your strategic objective and let our AI provide the initial layer of intelligence you need to move forward with confidence.
                             </p>
                             <button 
                                onClick={onGetStarted}
                                className="mt-8 nexus-button-primary flex items-center gap-3 mx-auto"
                            >
                                <BlueprintIcon className="w-6 h-6" />
                                Generate a Nexus Report
                            </button>
                         </div>
                    </section>
                </div>
            </div>
        </div>
    );
};