import React, { useState, useEffect, useRef } from 'react';
import type { ReportParameters, ReportSuggestions, AiCapability, AiCapabilitiesResponse, EconomicData, NexusBrainState, RROI_Index, TPT_Simulation, SEAM_Blueprint, UserProfile } from '../types.ts';
import { marked } from 'marked';
import { fetchResearchAndScope, fetchCapabilities, refineObjectiveWithContext, diagnoseRegion, simulatePathway, architectEcosystem, generateReportStream } from '../services/nexusService.ts';
import { EconomicSnapshot } from './EconomicSnapshot.tsx';
import { SavedWorkManager } from './SavedWorkManager.tsx';
import { SpinnerSmall } from './Spinner.tsx';
import { ChatBubbleLeftRightIcon, NexusLogo } from './Icons.tsx';
import { RROIResultDisplay } from './RROIResultDisplay.tsx';
import { TPTResultDisplay } from './TPTResultDisplay.tsx';
import { SEAMResultDisplay } from './SEAMResultDisplay.tsx';
import { TradeDisruptionDisplay, TradeDisruptionAnalyzer } from './TradeDisruptionModel.tsx';
import { MarketDiversificationDashboard } from './MarketDiversificationModule.tsx';
import { GenerativeModelResultDisplay } from './GenerativeModelResultDisplay.tsx';

type AiInteractionState = 'idle' | 'welcomed' | 'prompted' | 'answeredPrompt' | 'active';
type BrainCommand = 'diagnose' | 'simulate' | 'architect' | 'generate_model';

interface InquireProps {
    params: ReportParameters;
    onApplySuggestions: (suggestions: ReportSuggestions) => void;
    savedReports: ReportParameters[];
    onSaveReport: (params: ReportParameters) => void;
    onLoadReport: (params: ReportParameters) => void;
    onDeleteReport: (reportName: string) => void;
    wizardStep?: number;
    aiInteractionState?: AiInteractionState;
    onAiInteractionStateChange?: (state: AiInteractionState) => void;
    onScopeComplete: () => void;
    onReportUpdate: (params: ReportParameters, content: string, error: string | null, generating: boolean) => void;
    onProfileUpdate: (profile: UserProfile) => void;
    isGenerating: boolean;
    onNextStep?: () => void;
    onPrevStep?: () => void;
    canGoNext?: boolean;
    canGoPrev?: boolean;
}

const WIZARD_HELP_TEXT: Record<number, string> = {
    1: "Welcome to the Nexus Workspace. Let's start by defining your role and the high-level goal of your report. This helps me understand your perspective.",
    2: `This is the core of the blueprint.
        - **Analysis Tiers** define *what* strategic questions the report will answer (e.g., Market Entry vs. Partner Vetting).
        - **Geographic Targeting** defines *where* we are looking.
        - **Industry Focus** defines the *sector* of the opportunity.
        - **Ideal Partner Profile** tells me *who* you want to connect with.
        <br/><br/>
        <strong>Feeling stuck?</strong> Ask me to explain a specific tier like "What is a Supply Chain Gap Analysis?" or "What's the difference between Market Entry and Partner Vetting?".`,
    3: "Excellent. Now, let's define the 'why'. Your Core Objective is the most important input for the AI. Also, select one or more AI Analyst Personas to shape the report's perspective.",
    4: "This is your final review. Check the Quality Analysis score for tips on improving your report. You can also use the Nexus Brain Commands below to run advanced, pre-report analysis on your defined opportunity.",
};

export const Inquire = ({
    params,
    onApplySuggestions,
    savedReports,
    onSaveReport,
    onLoadReport,
    onDeleteReport,
    wizardStep,
    aiInteractionState,
    onAiInteractionStateChange,
    onScopeComplete,
    onReportUpdate,
    onProfileUpdate,
    isGenerating,
    onNextStep,
    onPrevStep,
    canGoNext,
    canGoPrev,
}: InquireProps) => {
    const [query, setQuery] = useState('');
    const [loadingCommand, setLoadingCommand] = useState<BrainCommand | 'quick_scope' | 'trade_disruption' | 'market_diversification' | null>(null);
    const [isRefining, setIsRefining] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [capabilities, setCapabilities] = useState<AiCapabilitiesResponse | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [fileContent, setFileContent] = useState<string | null>(null);
    const [researchSummary, setResearchSummary] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const economicDataInputRef = useRef<HTMLInputElement>(null);
    const queryTextAreaRef = useRef<HTMLTextAreaElement>(null);
    const [economicDataFile, setEconomicDataFile] = useState<string | null>(null);
    const [economicDataFileName, setEconomicDataFileName] = useState<string | null>(null);    
    
    // Nexus Brain state
    const [brainResults, setBrainResults] = useState<NexusBrainState>({ diagnosis: null, simulation: null, ecosystem: null, generativeModel: null });
    const [activeCommand, setActiveCommand] = useState<BrainCommand | null>(null);
    const [simulationInput, setSimulationInput] = useState('');


    useEffect(() => {
        const getCapabilities = async () => {
            try {
                const caps = await fetchCapabilities();
                setCapabilities(caps);
            } catch (e) {
                console.error("Failed to fetch capabilities:", e);
                setError(e instanceof Error ? e.message : 'Could not load AI capabilities.');
            }
        };
        getCapabilities();
    }, []);

    // Clear brain results when wizard step changes
    useEffect(() => {
        setResearchSummary(null);
        setBrainResults({ diagnosis: null, simulation: null, ecosystem: null, generativeModel: null });
        setActiveCommand(null);
    }, [wizardStep]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name);
            const reader = new FileReader();
            reader.onload = (e) => {
                setFileContent(e.target?.result as string);
            };
            reader.onerror = () => setError("Failed to read the selected file.");
            reader.readAsText(file);
        }
    };

    const handleEconomicDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setEconomicDataFileName(file.name);
            const reader = new FileReader();
            reader.onload = (e) => {
                setEconomicDataFile(e.target?.result as string);
            };
            reader.onerror = () => setError("Failed to read the economic data file.");
            reader.readAsText(file);
        }
    };

    const clearEconomicDataFile = () => {
        setEconomicDataFileName(null);
        setEconomicDataFile(null);
        if (economicDataInputRef.current) {
            economicDataInputRef.current.value = '';
        }
    };
    
    const handleQuickScope = async (e?: React.FormEvent, prompt?: string) => {
        e?.preventDefault();
        const inquiry = prompt || query;
        if (!inquiry.trim()) return;

        setLoadingCommand('quick_scope');
        setError(null);
        setResearchSummary(null);
        try {
            // Enhanced validation with better messaging
            const coreErrors = [
                !params.userName.trim() ? "Your Name is required for personalization." : "",
                !params.reportName.trim() ? "Report Name is required to identify your analysis." : "",
            ].filter(Boolean);

            const recommendedWarnings = [
                !params.region.trim() ? "Target Region will improve regional accuracy." : "",
                !params.problemStatement.trim() ? "Core Objective will focus the analysis better." : "",
            ].filter(Boolean);

            // Allow Quick Start with minimal data but show warnings
            if (coreErrors.length > 0) {
                throw new Error("Required information missing: " + coreErrors.join(', '));
            }

            // Show informational message about data completeness
            if (recommendedWarnings.length > 0) {
                console.info("Quick Start proceeding with limited data. Consider adding:", recommendedWarnings.join(', '));
            }

            // First apply suggestions from scoping with all available data
            const result = await fetchResearchAndScope(inquiry, fileContent, params);
            onApplySuggestions(result.suggestions);
            setResearchSummary(result.summary);

            // Enhanced validation for full report generation
            const fullReportErrors = [
                params.tier.length === 0 ? "At least one Report Tier must be selected." : "",
                !params.region.trim() ? "A target location is required for regional analysis." : "",
                params.industry.length === 0 ? "At least one Core Industry must be selected." : "",
                params.industry.includes('Custom') && !params.customIndustry?.trim() ? "Custom Industry Definition is required when 'Custom' is selected." : "",
                !params.idealPartnerProfile.trim() ? "Ideal Partner Profile is required for partnership recommendations." : "",
                !params.problemStatement.trim() ? "Core Objective is required for focused analysis." : "",
                params.aiPersona.length === 0 ? "At least one AI Analyst persona must be selected." : "",
                params.aiPersona.includes('Custom') && !params.customAiPersona?.trim() ? "Custom Persona Definition is required when 'Custom' is selected." : "",
            ].filter(Boolean);

            if (fullReportErrors.length > 0) {
                // Instead of failing, provide a scoping-only result with guidance
                setError(`Quick analysis completed, but full report requires: ${fullReportErrors.join(', ')}`);
                onReportUpdate(params, '', `Quick analysis completed, but full report requires: ${fullReportErrors.join(', ')}`, false);
                setQuery('');
                clearFile();
                return;
            }

            // Update profile and start full report generation
            onProfileUpdate({ userName: params.userName, userDepartment: params.userDepartment, organizationType: params.organizationType, userCountry: params.userCountry });
            onReportUpdate(params, '', null, true);

            // Generate the full report
            const stream = await generateReportStream(params);
            const reader = stream.getReader();
            const decoder = new TextDecoder();
            let content = '';
            let decodedChunk = '';

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;
                decodedChunk = decoder.decode(value, { stream: true });
                content += decodedChunk;
                onReportUpdate(params, content, null, true);
            }
            onReportUpdate(params, content, null, false);

            setQuery(''); // Clear query on success
            clearFile(); // Clears file name, content, and input ref
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            onReportUpdate(params, '', err instanceof Error ? err.message : 'An unknown error occurred.', false);
        } finally {
            setLoadingCommand(null);
        }
    };

    const clearFile = () => {
        setFileName(null);
        setFileContent(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleBrainCommand = async (command: BrainCommand) => {
        if (command === 'generate_model') {
            setError("Generative Economic Modeling is a future capability currently in development.");
            setActiveCommand(null);
            return;
        }

        try {
            setLoadingCommand(command);
            setError(null);
            setActiveCommand(null); // Close confirmation immediately

            if (command === 'diagnose') {
                if (!params.region || !params.problemStatement) {
                    throw new Error("Target Region and Core Objective must be filled out to run a diagnosis.");
                }
                const result = await diagnoseRegion(params.region, params.problemStatement);
                setBrainResults({ diagnosis: result, simulation: null, ecosystem: null, generativeModel: null });
            } else if (command === 'simulate' && brainResults.diagnosis) { // Guarded by button's disabled state
                if (!simulationInput.trim()) throw new Error("Please describe an intervention to simulate.");
                const result = await simulatePathway(brainResults.diagnosis, simulationInput);
                setBrainResults((prev: NexusBrainState) => ({ ...prev, simulation: result }));
            } else if (command === 'architect' && brainResults.diagnosis) { // Guarded by button's disabled state
                if (!params.problemStatement) throw new Error("A Core Objective is required to architect an ecosystem.");
                const result = await architectEcosystem(brainResults.diagnosis, params.problemStatement);
                setBrainResults((prev: NexusBrainState) => ({ ...prev, ecosystem: result }));
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setLoadingCommand(null);
            setSimulationInput('');
        }
    };

    const handleAdvancedAnalysisCommand = async (command: 'trade_disruption' | 'market_diversification') => {
        try {
            setLoadingCommand(command as any); // A bit of a type hack for loading state
            setError(null);
            setActiveCommand(null);
            // In a real app, you'd trigger an API call here.
            // For now, we'll just show the components with sample data.
            // This simulates running the analysis and getting a result.
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setLoadingCommand(null);
            setSimulationInput('');
        }
    };

    const handleRefineObjective = async (context: EconomicData) => {
        if (!params.problemStatement.trim()) {
            setError("Please write an initial Core Objective in Step 3 before refining it.");
            return;
        }
        setIsRefining(true);
        setError(null);
        try {
            const refined = await refineObjectiveWithContext(params.problemStatement, context);
            onApplySuggestions({ problemStatement: refined });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to refine objective.');
        } finally {
            setIsRefining(false);
        }
    };

    const handleCapabilityClick = (prompt: string) => {
        setQuery(prompt);
        queryTextAreaRef.current?.focus();
    };

    const renderGuidanceContent = () => {
        if (!wizardStep || !aiInteractionState || !onAiInteractionStateChange) {
            return <p>{capabilities?.greeting || "How can I help you build your report?"}</p>;
        }

        // Provide insights based on entered information
        const provideInitialInsights = () => {
            const insights = [];

            if (params.userName) {
                insights.push(`👋 Welcome ${params.userName}!`);
            }

            if (params.reportName) {
                insights.push(`📋 Report Focus: "${params.reportName}"`);
            }

            if (params.region) {
                insights.push(`📍 Target Region: ${params.region}`);
            }

            if (params.industry && params.industry.length > 0) {
                const industries = params.industry.filter(i => i !== 'Custom');
                if (params.customIndustry) industries.push(params.customIndustry);
                insights.push(`🏭 Industries: ${industries.join(', ')}`);
            }

            if (params.idealPartnerProfile) {
                insights.push(`🤝 Partner Profile: ${params.idealPartnerProfile.substring(0, 50)}${params.idealPartnerProfile.length > 50 ? '...' : ''}`);
            }

            if (params.problemStatement) {
                insights.push(`🎯 Core Objective: ${params.problemStatement.substring(0, 60)}${params.problemStatement.length > 60 ? '...' : ''}`);
            }

            if (params.aiPersona && params.aiPersona.length > 0) {
                const personas = params.aiPersona.filter(p => p !== 'Custom');
                if (params.customAiPersona) personas.push(params.customAiPersona);
                insights.push(`🧠 AI Analyst: ${personas.join(', ')}`);
            }

            return insights;
        };

        switch (aiInteractionState) {
            case 'idle': // This state will now be used for the initial greeting
                return (
                    <div>
                        <p>I'm ready to assist. Start by entering your name in the profile section.</p>
                        {query.trim() && (
                            <div className="mt-3 p-2 bg-nexus-accent-cyan/5 border border-nexus-accent-cyan/20 rounded-md">
                                <p className="text-xs font-semibold text-nexus-accent-cyan mb-1">📊 Report Readiness Check:</p>
                                <div className="space-y-0.5 text-xs">
                                    <div className="flex items-center gap-1">
                                        <span className={params.userName ? 'text-green-500' : 'text-red-500'}>
                                            {params.userName ? '✓' : '✗'}
                                        </span>
                                        <span className={params.userName ? 'text-nexus-text-secondary' : 'text-red-500'}>
                                            Your Name {params.userName ? `(${params.userName})` : '(Required)'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className={params.reportName ? 'text-green-500' : 'text-red-500'}>
                                            {params.reportName ? '✓' : '✗'}
                                        </span>
                                        <span className={params.reportName ? 'text-nexus-text-secondary' : 'text-red-500'}>
                                            Report Name {params.reportName ? `("${params.reportName}")` : '(Required)'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className={params.region ? 'text-green-500' : 'text-yellow-500'}>
                                            {params.region ? '✓' : '⚠'}
                                        </span>
                                        <span className={params.region ? 'text-nexus-text-secondary' : 'text-yellow-600'}>
                                            Target Region {params.region ? `(${params.region})` : '(Recommended for better accuracy)'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className={params.problemStatement ? 'text-green-500' : 'text-yellow-500'}>
                                            {params.problemStatement ? '✓' : '⚠'}
                                        </span>
                                        <span className={params.problemStatement ? 'text-nexus-text-secondary' : 'text-yellow-600'}>
                                            Core Objective {params.problemStatement ? '(Defined)' : '(Recommended for focused analysis)'}
                                        </span>
                                    </div>
                                </div>
                                <p className="text-xs text-nexus-text-secondary mt-1">
                                    💡 <strong>Pro Tip:</strong> More complete information = more accurate and comprehensive reports. The AI will use all available data to provide the best possible analysis.
                                </p>
                            </div>
                        )}
                    </div>
                );
            case 'welcomed': // This state is now effectively merged into 'active'
                return <p>Hello, <strong>{params.userName}</strong>. What is the primary goal of your report? You can describe it in the 'Report Name' field to get started.</p>;
            case 'prompted':
                return (
                    <div>
                        <p>It looks like you've paused. Do you want to tell me what you need assistance with?</p>
                        <div className="flex gap-2 mt-2">
                            <button onClick={() => { onAiInteractionStateChange('answeredPrompt'); queryTextAreaRef.current?.focus(); }} className="text-sm font-bold py-1 px-3 rounded-md bg-nexus-accent-brown text-white hover:bg-nexus-accent-brown-dark transition-colors">Yes, let's talk</button>
                            <button onClick={() => onAiInteractionStateChange('answeredPrompt')} className="text-sm font-semibold py-1 px-3 rounded-md bg-nexus-surface-700 text-nexus-text-primary hover:bg-nexus-border-medium transition-colors">No, I'm okay</button>
                        </div>
                    </div>
                );
            case 'answeredPrompt':
                  return <p>Understood. Please complete the required fields to continue.</p>;
            case 'active':
            default:
                const insights = provideInitialInsights();
                if (insights.length > 0) {
                    return (
                        <div>
                            <div className="prose prose-sm max-w-none text-nexus-text-secondary mb-4"
                                  dangerouslySetInnerHTML={{ __html: WIZARD_HELP_TEXT[wizardStep] || "How can I help you build your report?" }}
                            />
                            {insights.length >= 3 && (
                                <div className="bg-white/5 border border-white/10 rounded-lg p-3 mt-4">
                                    <p className="text-sm font-semibold text-nexus-accent-cyan mb-2">📊 Current Assessment:</p>
                                    <ul className="text-xs text-nexus-text-secondary space-y-1.5">
                                        {insights.map((insight, index) => (
                                            <li key={index}>{insight}</li>
                                        ))}
                                    </ul>
                                    <p className="text-xs text-nexus-accent-cyan mt-2 font-medium">
                                        💡 Based on your inputs, I can help you build a comprehensive analysis. Try using the "Quick Start Report" below or proceed through the wizard steps.
                                    </p>
                                </div>
                            )}
                        </div>
                    );
                }
                return (
                    <div className="prose prose-sm max-w-none text-nexus-text-secondary"
                          dangerouslySetInnerHTML={{ __html: WIZARD_HELP_TEXT[wizardStep] || "How can I help you build your report?" }}
                    />
                );
        }
    };
    
    return (
        <div className="p-4 h-full flex flex-col max-w-full mx-auto bg-white text-gray-800">
            <header className="flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-600/10 p-2 rounded-lg border border-blue-600/30">
                        <ChatBubbleLeftRightIcon className="w-6 h-6 text-blue-600"/>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Nexus Inquire AI</h2>
                        <p className="text-sm text-gray-500">Your Strategic Co-Pilot</p>
                    </div>
                </div>
            </header>

            <div className="mt-4 flex-grow overflow-y-auto pr-2 -mr-2 space-y-4 max-w-full min-h-0" style={{ scrollbarWidth: 'thin' }}>
                 {wizardStep === 4 && (
                     <div className="p-3 bg-white/5 rounded-lg border border-white/10 space-y-3 animate-fadeIn">
                          <h3 className="font-semibold text-gray-800 text-md flex items-center gap-2">
                             <NexusLogo className="w-5 h-5" />
                             Nexus Brain Commands - Pre-Report Analysis
                         </h3>
                         <p className="text-xs text-gray-500">
                           Run advanced AI analysis before generating your final report. These insights will be automatically included in your comprehensive analysis.
                         </p>

                         {/* --- DIAGNOSE --- */}
                         <button onClick={() => setActiveCommand('diagnose')} className="w-full text-left p-2 bg-white/5 border border-white/10 rounded-lg hover:border-nexus-accent-cyan hover:bg-nexus-accent-cyan/10 transition-all text-sm font-semibold" disabled={!!loadingCommand}>Diagnose Region (RROI)</button>
                         {activeCommand === 'diagnose' && (
                             <div className="p-3 border-t">
                                 <p className="text-xs text-gray-500 mb-2">This will generate a detailed economic diagnosis for the region defined in Step 2. Proceed?</p>
                                 <div className="flex gap-2">
                                     <button onClick={() => handleBrainCommand('diagnose')} className="nexus-button-primary text-xs !py-1" disabled={!!loadingCommand}>{loadingCommand === 'diagnose' ? 'Diagnosing...' : 'Confirm'}</button>
                                     <button onClick={() => setActiveCommand(null)} className="nexus-button-secondary text-xs !py-1" disabled={!!loadingCommand}>Cancel</button>
                                 </div>
                             </div>
                         )}
                         {brainResults.diagnosis && <div className="p-3 border-t animate-fadeIn"><RROIResultDisplay rroi={brainResults.diagnosis} /></div>}

                         {/* --- SIMULATE --- */}
                         <button onClick={() => setActiveCommand('simulate')} className="w-full text-left p-2 bg-white/5 border border-white/10 rounded-lg hover:border-nexus-accent-cyan hover:bg-nexus-accent-cyan/10 transition-all text-sm font-semibold disabled:opacity-50" disabled={!!loadingCommand || !brainResults.diagnosis}>Simulate Pathway (TPT)</button>
                         {activeCommand === 'simulate' && brainResults.diagnosis && (
                             <div className="p-3 border-t space-y-2">
                                 <p className="text-xs text-gray-500">Describe the strategic intervention to simulate (e.g., "build a new university science park").</p>
                                 <input type="text" value={simulationInput} onChange={e => setSimulationInput(e.target.value)} placeholder="Describe the intervention..." className="w-full text-xs p-2 bg-white/5 border border-white/10 rounded-md" />
                                 <div className="flex gap-2">
                                     <button onClick={() => handleBrainCommand('simulate')} className="nexus-button-primary text-xs !py-1" disabled={!!loadingCommand}>{loadingCommand === 'simulate' ? 'Simulating...' : 'Run'}</button>
                                     <button onClick={() => setActiveCommand(null)} className="nexus-button-secondary text-xs !py-1" disabled={!!loadingCommand}>Cancel</button>
                                 </div>
                             </div>
                         )}
                         {brainResults.simulation && <div className="p-3 border-t animate-fadeIn"><TPTResultDisplay sim={brainResults.simulation} /></div>}

                         {/* --- ARCHITECT --- */}
                         <button onClick={() => setActiveCommand('architect')} className="w-full text-left p-2 bg-white/5 border border-white/10 rounded-lg hover:border-nexus-accent-cyan hover:bg-nexus-accent-cyan/10 transition-all text-sm font-semibold disabled:opacity-50" disabled={!!loadingCommand || !brainResults.diagnosis}>Architect Ecosystem (SEAM)</button>
                          {activeCommand === 'architect' && brainResults.diagnosis && (
                             <div className="p-3 border-t">
                                 <p className="text-xs text-gray-500 mb-2">This will design a partner ecosystem based on the diagnosis and your Core Objective. Proceed?</p>
                                 <div className="flex gap-2">
                                     <button onClick={() => handleBrainCommand('architect')} className="nexus-button-primary text-xs !py-1" disabled={!!loadingCommand}>{loadingCommand === 'architect' ? 'Architecting...' : 'Confirm'}</button>
                                     <button onClick={() => setActiveCommand(null)} className="nexus-button-secondary text-xs !py-1" disabled={!!loadingCommand}>Cancel</button>
                                 </div>
                             </div>
                         )}
                         {brainResults.ecosystem && <div className="p-3 border-t animate-fadeIn"><SEAMResultDisplay seam={brainResults.ecosystem} /></div>}

                         {/* --- GENERATE MODEL (V2) --- */}
                         <button onClick={() => handleBrainCommand('generate_model')} className="w-full text-left p-2 bg-white/5 border border-white/10 rounded-lg hover:border-nexus-accent-brown hover:bg-nexus-accent-brown/10 transition-all text-sm font-semibold disabled:opacity-50" disabled={!brainResults.diagnosis} title="Future capability: Generate a new economic model for the region.">Generate Novel Model (V2)</button>
                          {activeCommand === 'generate_model' && brainResults.diagnosis && (
                             <div className="p-3 border-t">
                                 <p className="text-xs text-gray-500 mb-2">This will use the RROI diagnosis to generate a new, hybrid economic theory for the region. Proceed?</p>
                                 <div className="flex gap-2">
                                     <button onClick={() => handleBrainCommand('generate_model')} className="nexus-button-primary text-xs !py-1" disabled={!!loadingCommand}>{loadingCommand === 'generate_model' ? 'Generating...' : 'Confirm'}</button>
                                     <button onClick={() => setActiveCommand(null)} className="nexus-button-secondary text-xs !py-1" disabled={!!loadingCommand}>Cancel</button>
                                 </div>
                             </div>
                         )}
                         {brainResults.generativeModel && <div className="p-3 border-t animate-fadeIn"><GenerativeModelResultDisplay model={brainResults.generativeModel} /></div>}

                         {/* New Advanced Analysis Commands */}
                         <h3 className="font-semibold text-gray-800 text-md flex items-center gap-2 pt-4 border-t border-white/10">
                             <NexusLogo className="w-5 h-5" />
                             Global Trade Intelligence
                         </h3>
                         <button onClick={() => handleAdvancedAnalysisCommand('trade_disruption')} className="w-full text-left p-2 bg-white/5 border border-white/10 rounded-lg hover:border-nexus-accent-cyan hover:bg-nexus-accent-cyan/10 transition-all text-sm font-semibold" disabled={!!loadingCommand}>Analyze Trade Disruption</button>
                         {loadingCommand === 'trade_disruption' && (
                            <div className="p-3 border-t animate-fadeIn">
                                <TradeDisruptionDisplay analysis={TradeDisruptionAnalyzer.calculateDisruptionImpact(2500000000, 15, ['Vietnam', 'India', 'Mexico'], 35)} />
                            </div>
                         )}

                         <button onClick={() => handleAdvancedAnalysisCommand('market_diversification')} className="w-full text-left p-2 bg-white/5 border border-white/10 rounded-lg hover:border-nexus-accent-cyan hover:bg-nexus-accent-cyan/10 transition-all text-sm font-semibold" disabled={!!loadingCommand}>Model Market Diversification</button>
                         {loadingCommand === 'market_diversification' && (
                            <div className="p-3 border-t animate-fadeIn">
                                <MarketDiversificationDashboard
                                    currentMarkets={{ 'United States': 45, 'China': 25, 'European Union': 20, 'Japan': 10 }}
                                    potentialMarkets={['Vietnam', 'India', 'Mexico', 'Brazil', 'Indonesia', 'Turkey', 'South Africa', 'Thailand']}
                                    tradeDisruptionRisk={0.6}
                                />
                            </div>
                         )}
                         {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
                     </div>
                 )}
                
                {wizardStep && (
                    <div className="p-3 text-sm text-gray-500 bg-gray-100 rounded-lg border border-gray-200">
                        <div className="flex items-start gap-2">
                            <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${aiInteractionState === 'idle' ? 'bg-gray-400' : 'bg-green-400 animate-pulse-green'}`}></div>
                            <div className="flex-grow">
                                {renderGuidanceContent()}
                            </div>
                        </div>
                    </div>
                )}
                
                {researchSummary && (
                    <div className="p-3 bg-blue-600/5 rounded-lg border border-blue-600/20 animate-fadeIn">
                        <h4 className="font-semibold text-blue-600 text-md mb-2 flex items-center gap-2">
                            <NexusLogo className="w-5 h-5" />
                            Nexus Brain: Initial Scoping
                        </h4>
                        <div className="prose prose-sm max-w-none text-gray-600" dangerouslySetInnerHTML={{ __html: marked.parse(researchSummary) as string }}></div>
                    </div>
                )}

                {params.userCountry && (
                    <EconomicSnapshot
                        country={params.userCountry}
                        objective={params.problemStatement}
                        isRefining={isRefining}
                        onRefineObjective={handleRefineObjective}
                    />
                )}
                
                <SavedWorkManager
                    currentParams={params}
                    savedReports={savedReports}
                    onSave={onSaveReport}
                    onLoad={onLoadReport}
                    onDelete={onDeleteReport}
                />


                {/* Nexus AI Support Interface - Always visible */}
                <div className="mt-4 p-3 bg-gray-100 border border-gray-200 rounded-lg">
                        <div className="space-y-3">
                            <label className="text-xs font-semibold text-gray-500">Nexus AI Support</label>
                            <textarea
                                ref={queryTextAreaRef}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Ask me anything about your report, get suggestions, or request analysis..."
                                className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none transition placeholder:text-gray-500 text-sm text-gray-800"
                                rows={4}
                                disabled={!!loadingCommand}
                            />
                            <div className="flex items-center justify-between gap-2">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className="hidden"
                                    accept=".txt,.pdf,.md,.docx"
                                    aria-label="Attach document"
                                />
                                <button type="button" onClick={() => fileInputRef.current?.click()} className="text-xs font-semibold p-2 rounded-md bg-gray-200 border border-gray-300 text-gray-700 hover:bg-gray-300 transition-colors flex-1 text-center" disabled={!!loadingCommand}>
                                    Attach Document
                                </button>
                                {fileName && (
                                    <div className="text-xs text-gray-500 flex items-center gap-1 flex-shrink-0">
                                        <span className="truncate max-w-[120px]">{fileName}</span>
                                        <button onClick={clearFile} className="text-red-400 hover:text-red-600 flex-shrink-0 ml-1">&times;</button>
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={() => handleQuickScope()}
                                disabled={!!loadingCommand || !query.trim()}
                                className="w-full p-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-700/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loadingCommand === 'quick_scope' ? (
                                    <><SpinnerSmall /> Processing...</>
                                ) : (
                                    'Ask Nexus AI'
                                )}
                            </button>

                            {/* AI Suggestions with checkboxes */}
                            {researchSummary && (
                                <div className="mt-4 p-3 bg-blue-600/5 border border-blue-600/20 rounded-lg">
                                    <h4 className="text-sm font-semibold text-blue-600 mb-2">💡 AI Suggestions</h4>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-sm">
                                            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                            <span className="text-gray-600">Apply suggested report parameters</span>
                                        </label>
                                        <label className="flex items-center gap-2 text-sm">
                                            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                            <span className="text-gray-600">Include regional analysis recommendations</span>
                                        </label>
                                        <label className="flex items-center gap-2 text-sm">
                                            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                            <span className="text-gray-600">Add industry-specific insights</span>
                                        </label>
                                    </div>
                                    <button className="mt-3 w-full px-3 py-2 bg-blue-600/80 text-white text-sm font-semibold rounded-md hover:bg-blue-700 transition-colors">
                                        Accept Selected Suggestions
                                    </button>
                                </div>
                            )}

                            {/* Proactive AI Guidance */}
                            {wizardStep && wizardStep >= 2 && (
                                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                    <h4 className="text-sm font-semibold text-blue-800 mb-2">🎯 Smart Suggestions</h4>
                                    <div className="space-y-2 text-sm text-blue-700">
                                        {wizardStep === 2 && !params.region && (
                                            <p>💡 <strong>Tip:</strong> Select a region to unlock regional intelligence and market data.</p>
                                        )}
                                        {wizardStep === 3 && !params.problemStatement && (
                                            <p>💡 <strong>Tip:</strong> A clear objective helps the AI provide more targeted analysis.</p>
                                        )}
                                        {wizardStep === 4 && params.tier.length === 0 && (
                                            <p>💡 <strong>Tip:</strong> Try selecting "Market Entry Strategy" for comprehensive opportunity assessment.</p>
                                        )}
                                        {params.industry.length > 0 && (
                                            <p>💡 <strong>Industry Insight:</strong> Based on your selections, consider adding supply chain analysis.</p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Quick Actions */}
                            {wizardStep && wizardStep >= 2 && (
                                <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                                    <h4 className="text-sm font-semibold text-gray-700 mb-2">⚡ Quick Actions</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            onClick={() => setQuery("What industries are growing fastest in this region?")}
                                            className="text-xs p-2 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                                            disabled={!!loadingCommand}
                                        >
                                            Industry Trends
                                        </button>
                                        <button
                                            onClick={() => setQuery("What are the main challenges for foreign investment here?")}
                                            className="text-xs p-2 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                                            disabled={!!loadingCommand}
                                        >
                                            Investment Risks
                                        </button>
                                        <button
                                            onClick={() => setQuery("Suggest optimal report tiers for my objective")}
                                            className="text-xs p-2 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                                            disabled={!!loadingCommand}
                                        >
                                            Report Tiers
                                        </button>
                                        <button
                                            onClick={() => setQuery("What AI personas would be most helpful?")}
                                            className="text-xs p-2 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                                            disabled={!!loadingCommand}
                                        >
                                            AI Personas
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                </div>

            </div>
        </div>
    );
};