import React, { useState, useEffect } from 'react';
import { NexusLogo } from './Icons.tsx';

interface TermsAndConditionsProps {
    onAccept: () => void;
    onDecline: () => void;
    isModal?: boolean;
    onClose?: () => void;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ onAccept, onDecline, isModal = false, onClose }) => {
    const [accepted, setAccepted] = useState(false);

    // Check localStorage for previous acceptance
    useEffect(() => {
        const hasAccepted = localStorage.getItem('bwga-nexus-terms-accepted') === 'true';
        if (hasAccepted) {
            setAccepted(true);
        }
    }, []);

    // Handle acceptance with localStorage persistence
    const handleAccept = () => {
        localStorage.setItem('bwga-nexus-terms-accepted', 'true');
        onAccept();
    };

    const containerClasses = isModal
        ? "fixed inset-0 z-50 overflow-y-auto bg-gray-900/50 backdrop-blur-sm"
        : "bg-gray-50";

    const contentClasses = isModal
        ? "min-h-screen flex items-center justify-center p-4"
        : "";

    return (
        <div className={containerClasses}>
            <div className={contentClasses}>
                <div className={`${isModal ? 'bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto' : 'bg-gray-50'}`}>
                    {isModal && onClose && (
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
                            aria-label="Close terms and conditions"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}

                    <header className="text-center py-8 px-4 bg-white border-b border-gray-200">
                        <div className="max-w-4xl mx-auto">
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mb-3">
                                Welcome to BW Nexus AI
                            </h1>
                            <p className="text-sm md:text-base text-gray-600 leading-snug mb-4">
                                Unlock the hidden potential of global regions with AI-powered intelligence. Transform complex data into strategic opportunities. Discover untapped markets, forge strategic partnerships, and create sustainable growth? Let's begin your journey into regional intelligence.
                            </p>
                            <p className="text-sm md:text-base font-bold text-gray-800 leading-snug mb-4">
                                <strong>How to Use the BWGA Nexus AI Report System:</strong> Our 9-step framework guides you through comprehensive regional intelligence analysis. Enter your details and objectives, then let our Nexus Enquire AI Copilot analyze your needs and recommend the most appropriate analysis tiers for your specific situation.
                            </p>
                        </div>
                    </header>

                    <div className="p-6 md:p-8 max-w-6xl mx-auto">
                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 md:p-6 min-h-[600px]">
                            <div className="text-center mb-6 pb-4 border-b border-gray-200">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Terms & Conditions</h2>
                                <p className="text-sm text-gray-600">BW Nexus AI Platform Agreement</p>
                            </div>
                    <div className="prose max-w-none text-gray-700 text-xs leading-tight prose-p:mb-2 prose-strong:font-semibold prose-strong:text-gray-900">
                        <section className="mb-3">
                            <h3 className="text-xs font-bold text-gray-900 mb-1">1. Acceptance of Terms</h3>
                            <p>By accessing and using the BW Nexus AI platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
                        </section>

                        <section className="mb-3">
                            <h3 className="text-xs font-bold text-gray-900 mb-1">2. Use License</h3>
                            <p className="mb-1">Permission is granted to temporarily access the materials (information or software) on BW Nexus AI's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                            <ul className="list-disc list-inside ml-3 space-y-0.5">
                                <li>modify or copy the materials</li>
                                <li>use the materials for any commercial purpose or for any public display (commercial or non-commercial)</li>
                                <li>attempt to decompile or reverse engineer any software contained on BW Nexus AI's website</li>
                                <li>remove any copyright or other proprietary notations from the materials</li>
                            </ul>
                        </section>

                        <section className="mb-3">
                            <h3 className="text-xs font-bold text-gray-900 mb-1">3. Service Description</h3>
                            <p className="mb-1">BW Nexus AI provides regional intelligence analysis tools including:</p>
                            <ul className="list-disc list-inside ml-3 space-y-0.5">
                                <li>Regional Resilience & Opportunity Index (RROI) diagnostics</li>
                                <li>Transitional Pathway Theory (TPT) simulations</li>
                                <li>Symbiotic Ecosystem Architecture Model (SEAM) blueprints</li>
                                <li>AI-powered report generation and analysis</li>
                            </ul>
                        </section>

                        <section className="mb-3">
                            <h3 className="text-xs font-bold text-gray-900 mb-1">4. Data Privacy & Security</h3>
                            <p>Your privacy is important to us. BW Nexus AI is committed to protecting your personal information and being transparent about the data we collect and how we use it. All analysis and reports generated are processed securely and confidentially.</p>
                        </section>

                        <section className="mb-3">
                            <h3 className="text-xs font-bold text-gray-900 mb-1">5. Accuracy of Information</h3>
                            <p>While we strive for accuracy, BW Nexus AI cannot guarantee that all information provided is complete, accurate, or current. Users should verify critical information through independent sources before making business decisions.</p>
                        </section>

                        <section className="mb-3">
                            <h3 className="text-xs font-bold text-gray-900 mb-1">6. Limitation of Liability</h3>
                            <p>In no event shall BW Nexus AI or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on BW Nexus AI's website.</p>
                        </section>

                        <section className="mb-3">
                            <h3 className="text-xs font-bold text-gray-900 mb-1">7. Community Investment Program</h3>
                            <p>10% of all report fees are reinvested into community-identified development initiatives within the analyzed regions. This includes education, local health programs, and small-scale livelihood support.</p>
                        </section>

                        <section className="mb-3">
                            <h3 className="text-xs font-bold text-gray-900 mb-1">8. Governing Law</h3>
                            <p>These terms and conditions are governed by and construed in accordance with the laws of Australia, and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.</p>
                        </section>

                        <section className="mb-3">
                            <h3 className="text-xs font-bold text-gray-900 mb-1">9. Changes to Terms</h3>
                            <p>BW Nexus AI reserves the right, at its sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.</p>
                        </section>
                        </div>

                        {/* How to Use Section */}
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <div className="text-center mb-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-2">How to Use the BWGA Nexus AI Report System</h2>
                                <p className="text-sm text-gray-600">Learn about our 9-step framework for generating comprehensive regional intelligence reports</p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                                        <h3 className="text-sm font-bold text-gray-900 mb-1">9-Step Framework Overview</h3>
                                        <p className="text-xs text-gray-700 mb-2">Our system is organized into 3 phases with 9 total steps to guide you through comprehensive regional intelligence analysis:</p>

                                        <div className="grid grid-cols-1 gap-2 text-xs">
                                            <div className="bg-white p-2 rounded border">
                                                <h4 className="font-bold text-gray-900 mb-1">Phase 1: Context & Planning</h4>
                                                <ul className="text-gray-700 space-y-0.5">
                                                    <li>• Strategic Context Definition</li>
                                                    <li>• Opportunity Assessment</li>
                                                    <li>• Partnership Intent Clarification</li>
                                                </ul>
                                            </div>
                                            <div className="bg-white p-2 rounded border">
                                                <h4 className="font-bold text-gray-900 mb-1">Phase 2: Analysis & Assessment</h4>
                                                <ul className="text-gray-700 space-y-0.5">
                                                    <li>• Regional Diagnostic (RROI)</li>
                                                    <li>• Predictive Positioning (TPT)</li>
                                                    <li>• Ecosystem Mapping (SEAM)</li>
                                                </ul>
                                            </div>
                                            <div className="bg-white p-2 rounded border">
                                                <h4 className="font-bold text-gray-900 mb-1">Phase 3: Strategy & Execution</h4>
                                                <ul className="text-gray-700 space-y-0.5">
                                                    <li>• Risk Assessment & Mitigation</li>
                                                    <li>• Implementation Planning</li>
                                                    <li>• Intelligence Blueprint (NSIL)</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                                        <h3 className="text-sm font-bold text-gray-900 mb-1">Nexus Enquire AI Copilot</h3>
                                        <p className="text-xs text-gray-700 mb-1">Your intelligent assistant provides:</p>
                                        <ul className="text-xs text-gray-700 space-y-0.5 ml-3">
                                            <li>• Step-by-step guidance through each phase</li>
                                            <li>• Input validation and suggestions</li>
                                            <li>• Real-time assistance and contextual help</li>
                                            <li>• Best practices and optimization tips</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                                        <h3 className="text-sm font-bold text-gray-900 mb-1">Report Generation Options</h3>
                                        <p className="text-xs text-gray-700 mb-1">Choose from multiple report formats:</p>
                                        <div className="grid grid-cols-2 gap-1 text-xs">
                                            <div className="bg-white p-1.5 rounded border">
                                                <strong>Snapshot Report</strong><br />
                                                <span className="text-gray-600">2 pages - Executive summary</span>
                                            </div>
                                            <div className="bg-white p-1.5 rounded border">
                                                <strong>Standard Report</strong><br />
                                                <span className="text-gray-600">5-8 pages - Key findings</span>
                                            </div>
                                            <div className="bg-white p-1.5 rounded border">
                                                <strong>Detailed Report</strong><br />
                                                <span className="text-gray-600">12-15 pages - Comprehensive</span>
                                            </div>
                                            <div className="bg-white p-1.5 rounded border">
                                                <strong>Executive Report</strong><br />
                                                <span className="text-gray-600">25-30 pages - Full blueprint</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                                        <h3 className="text-sm font-bold text-gray-900 mb-1">Getting Started</h3>
                                        <p className="text-xs text-gray-700 mb-1">Follow these simple steps:</p>
                                        <ol className="text-xs text-gray-700 space-y-0.5 ml-3 list-decimal">
                                            <li>Accept the terms and conditions above</li>
                                            <li>Click "Accept & Continue" to enter the workspace</li>
                                            <li>Complete each step in sequence using the Next/Back buttons</li>
                                            <li>Use the Nexus Copilot for guidance and questions</li>
                                            <li>Generate your customized intelligence report</li>
                                        </ol>
                                    </div>

                                    {/* Terms Acceptance Section */}
                                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                                        <div className="flex items-start gap-3 mb-4">
                                            <input
                                                type="checkbox"
                                                id="accept-terms"
                                                checked={accepted}
                                                onChange={(e) => setAccepted(e.target.checked)}
                                                className="mt-1 h-4 w-4 text-nexus-accent-cyan focus:ring-nexus-accent-cyan border-gray-300 rounded"
                                            />
                                            <label htmlFor="accept-terms" className="text-sm text-gray-700 leading-relaxed">
                                                I have read, understood, and agree to the Terms & Conditions outlined above.
                                            </label>
                                        </div>

                                        <div className="flex gap-3 justify-end">
                                            <button
                                                onClick={onDecline}
                                                className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors text-sm"
                                            >
                                                Decline
                                            </button>
                                            <button
                                                onClick={handleAccept}
                                                disabled={!accepted}
                                                className="px-6 py-2 bg-nexus-accent-cyan text-white font-bold rounded-lg hover:bg-nexus-accent-cyan-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md text-sm"
                                            >
                                                Accept & Continue
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;