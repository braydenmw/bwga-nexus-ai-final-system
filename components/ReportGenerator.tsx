
import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { ReportParameters, UserProfile as UserProfileType, ReportSuggestions } from '../types.ts';
import { generateReportStream } from '../services/nexusService.ts';
import { REGIONS_AND_COUNTRIES, INDUSTRIES, AI_PERSONAS, ORGANIZATION_TYPES, ANALYTICAL_LENSES, TONES_AND_STYLES, TIERS_BY_ORG_TYPE, ANALYTICAL_MODULES } from '../constants.tsx';
import Card from './common/Card.tsx';
import Spinner from './Spinner.tsx';
import { Inquire } from './Inquire.tsx'; // This import is correct now.
import { CustomPersonaIcon, CustomIndustryIcon, ArrowUpIcon } from './Icons.tsx';
import QualityAnalysis from './QualityAnalysis.tsx';
import { ProfileStep } from './ProfileStep.tsx';
import { TradeDisruptionDisplay, TradeDisruptionAnalyzer } from './TradeDisruptionModel.tsx';
import { MarketDiversificationDashboard, MarketDiversificationEngine } from './MarketDiversificationModule.tsx';

type AiInteractionState = 'idle' | 'welcomed' | 'prompted' | 'answeredPrompt' | 'active';

interface ReportGeneratorProps {
    params: ReportParameters;
    onParamsChange: (params: ReportParameters) => void;
    onReportUpdate: (params: ReportParameters, content: string, error: string | null, generating: boolean) => void;
    onProfileUpdate: (profile: UserProfileType) => void;
    isGenerating: boolean;
    // Props for the Inquire Co-Pilot
    onApplySuggestions: (suggestions: ReportSuggestions) => void;
    savedReports: ReportParameters[];
    onSaveReport: (params: ReportParameters) => void;
    onLoadReport: (params: ReportParameters) => void;
    onDeleteReport: (reportName: string) => void;
    onScopeComplete: () => void; // New prop to handle navigation
}

const WIZARD_STEPS = [
    { id: 1, title: 'Profile' },
    { id: 2, title: 'Opportunity & Tiers' },
    { id: 3, title: 'Objective & AI Analyst' },
    { id: 4, title: 'Review & Generate' }
];

const ReportGenerator: React.FC<ReportGeneratorProps> = ({ 
    params, 
    onParamsChange, 
    onReportUpdate, 
    onProfileUpdate, 
    isGenerating,
    ...restInquireProps
}) => {
    const [step, setStep] = useState(1);
    const [error, setError] = useState<string | null>(null);
    const [aiInteractionState, setAiInteractionState] = useState<AiInteractionState>('idle');
    
    // Local state for region/country dropdowns
    const [targetRegion, setTargetRegion] = useState('');
    const [targetCountry, setTargetCountry] = useState('');
    const [targetCity, setTargetCity] = useState('');

    // State and ref for back-to-top button
    const [showScroll, setShowScroll] = useState(false);
    const scrollPanelRef = useRef<HTMLDivElement>(null);

    // Effect for scroll listener
    useEffect(() => {
        const panel = scrollPanelRef.current;
        if (!panel) return;

        const handleScroll = () => {
            if (panel.scrollTop > 300) {
                setShowScroll(true);
            } else {
                setShowScroll(false);
            }
        };

        panel.addEventListener('scroll', handleScroll);
        return () => panel.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        scrollPanelRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // This effect triggers when the user starts typing their name
    useEffect(() => {
        if (params.userName.trim() && aiInteractionState === 'idle') {
            setAiInteractionState('welcomed');
        }
    }, [params.userName, aiInteractionState]);

    // This effect triggers when the user types a report name, making the AI fully active
    useEffect(() => {
        if (params.reportName.trim() && aiInteractionState !== 'active') {
            setAiInteractionState('active');
        }
    }, [params.reportName, aiInteractionState]);

    // This effect prompts the user if they've entered a name but paused without entering a report goal
    useEffect(() => {
        let timer: number;
        if (aiInteractionState === 'welcomed' && !params.reportName.trim()) {
            timer = window.setTimeout(() => {
                setAiInteractionState('prompted');
            }, 5000); // 5-second delay
        }
        return () => clearTimeout(timer);
    }, [aiInteractionState, params.reportName]);


    const handleChange = (field: string | number | symbol, value: any) => {
        onParamsChange({ ...params, [field]: value });
    };

    // Effect to parse the `params.region` string into the UI fields for Step 2
    useEffect(() => {
        const regionValue = params.region;
        if (regionValue) {
            const parts = regionValue.split(',').map(p => p.trim());
            const potentialCountry = parts[parts.length - 1];
            const foundRegionData = REGIONS_AND_COUNTRIES.find(r => r.countries.includes(potentialCountry));

            if (foundRegionData) {
                setTargetRegion(foundRegionData.name);
                setTargetCountry(potentialCountry);
                setTargetCity(parts.slice(0, -1).join(', '));
            } else {
                setTargetRegion('');
                setTargetCountry('');
                setTargetCity('');
            }
        } else {
            setTargetRegion('');
            setTargetCountry('');
            setTargetCity('');
        }
    }, [params.region]);
    
    // Effect to combine the local city/country state back into `params.region`
    useEffect(() => {
        const combinedRegion = [targetCity, targetCountry].filter(Boolean).join(', ');
        if (combinedRegion !== params.region) {
            handleChange('region', combinedRegion);
        }
    }, [targetCity, targetCountry]);


    const handleMultiSelectToggle = (field: 'aiPersona' | 'analyticalLens' | 'toneAndStyle' | 'industry' | 'tier', value: string) => {
        const currentValues = params[field] as string[] || [];
        const newValues = currentValues.includes(value)
            ? currentValues.filter(v => v !== value)
            : [...currentValues, value];
        
        // This logic is a UI enhancement to prevent unselecting the last item on required fields
        if ((field === 'aiPersona' || field === 'industry') && newValues.length === 0 && (params[field] as string[]).length > 0) {
            return; // Don't allow unselecting the last one if it's required to have at least one
        }

        onParamsChange({ ...params, [field]: newValues });
    };
    
    const getValidationErrors = useCallback((stepNum: number): string[] => {
        const errors: string[] = [];
        switch(stepNum) {
            case 1:
                if (!params.userName.trim()) errors.push("Your Name is required.");
                // Report Name validation is now handled in nextStep
                break;
            case 2:
                if (params.tier.length === 0) errors.push("At least one Report Tier must be selected.");
                if (!params.region.trim()) errors.push("A target location is required.");
                if (params.industry.length === 0) errors.push("At least one Core Industry must be selected.");
                if (params.industry.includes('Custom') && !params.customIndustry?.trim()) errors.push("Custom Industry Definition is required when 'Custom' is selected.");
                if (!params.idealPartnerProfile.trim()) errors.push("Ideal Partner Profile is required.");
                break;
            case 3:
                if (!params.problemStatement.trim()) errors.push("Core Objective is required.");
                if (params.aiPersona.length === 0) errors.push("At least one AI Analyst persona must be selected.");
                if (params.aiPersona.includes('Custom') && !params.customAiPersona?.trim()) errors.push("Custom Persona Definition is required when 'Custom' is selected.");
                break;
            default:
                break;
        }
        return errors;
    }, [params]);

    const nextStep = () => {
        setError(null);
        scrollToTop();

        // Custom validation for Step 1's interactive AI flow
        if (step === 1) {
            if (!params.reportName.trim() && aiInteractionState !== 'answeredPrompt' && aiInteractionState !== 'active') {
                setError("Please provide a Report Name or respond to the Nexus AI assistant's prompt before proceeding.");
                setAiInteractionState('prompted'); // Force the prompt if user clicks next too early
                return;
            }
        }

        const validationErrors = getValidationErrors(step);
        if (validationErrors.length === 0) {
            if (step < WIZARD_STEPS.length) setStep(s => s + 1);
        } else {
            setError(validationErrors.join(' '));
        }
    };

    const prevStep = () => {
        setError(null);
        scrollToTop();
        if (step > 1) setStep(s => s - 1);
    };

    const handleScopeComplete = () => {
        setStep(2);
        scrollToTop();
    };

    const handleGenerateReport = useCallback(async () => {
        setError(null);
        const allErrors = [
            ...getValidationErrors(1),
            ...getValidationErrors(2),
            ...getValidationErrors(3),
        ];

        if (allErrors.length > 0) {
            setError("Some steps are incomplete. Please go back and fill all required fields. Missing: " + allErrors.join(', '));
            return;
        }
        
        onProfileUpdate({ userName: params.userName, userDepartment: params.userDepartment, organizationType: params.organizationType, userCountry: params.userCountry });
        onReportUpdate(params, '', null, true);

        try {
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
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred';
            console.error("Report generation failed:", errorMessage);
            setError(errorMessage);
            onReportUpdate(params, '', errorMessage, false);
        }
    }, [params, onReportUpdate, onProfileUpdate, getValidationErrors]);

    const inputStyles = "w-full p-2 bg-nexus-surface-800 border border-nexus-border-medium rounded-lg focus:ring-2 focus:ring-nexus-accent-cyan focus:border-nexus-accent-cyan outline-none transition-all duration-200 placeholder:text-nexus-text-muted text-nexus-text-primary shadow-soft hover:shadow-medium text-sm";
    const labelStyles = "block text-xs font-semibold text-nexus-text-primary mb-1";
    const currentTiers = TIERS_BY_ORG_TYPE[params.organizationType] || TIERS_BY_ORG_TYPE['Default'];

    const renderStepContent = () => {
        switch (step) {
            case 1: // Profile
                return <ProfileStep params={params} handleChange={handleChange} inputStyles={inputStyles} labelStyles={labelStyles} />;
            case 2: // Opportunity & Tiers
                return (
                    <Card className="bg-gradient-to-br from-nexus-surface-800 to-nexus-surface-700 border-nexus-border-medium/50 shadow-xl">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-12 h-12 bg-nexus-surface-600 rounded-xl flex items-center justify-center shadow-lg border border-nexus-border-medium">
                            <span className="text-2xl">🎯</span>
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-nexus-text-primary font-serif bg-gradient-to-r from-nexus-accent-cyan to-nexus-accent-cyan-dark bg-clip-text text-transparent">Strategic Opportunity & Analysis Tiers</h3>
                            <p className="text-nexus-text-secondary text-sm">Define your market opportunity with precision targeting and comprehensive analysis frameworks</p>
                          </div>
                        </div>
                        <p className="text-nexus-text-secondary mb-8 text-base leading-relaxed bg-nexus-surface-600/30 p-4 rounded-lg border border-nexus-border-medium/30">
                          Advanced AI integration and real-time data streams are now active. Select analysis tiers that align with your strategic objectives and target market positioning.
                        </p>
                        
                        <div className="mt-8">
                            <div className="bg-nexus-surface-600/30 p-6 rounded-xl border border-nexus-border-medium/30 mb-6">
                              <h4 className="text-xl font-bold text-nexus-text-primary mb-3 flex items-center gap-3">
                                <span className="text-nexus-accent-brown">📊</span>
                                Analysis Tiers (Strategic Methodology)
                              </h4>
                              <p className="text-nexus-text-secondary text-base leading-relaxed">Select comprehensive analysis frameworks. The AI will intelligently combine selected tiers into a unified strategic blueprint.</p>
                            </div>
                            <div className="grid md:grid-cols-2 gap-8">
                            {currentTiers.map((tier) => (
                                     <label key={tier.id} className={`p-8 rounded-2xl text-left border-2 transition-all duration-300 w-full flex flex-col h-full cursor-pointer bg-gradient-to-br from-nexus-surface-800 to-nexus-surface-700 hover:from-nexus-surface-700 hover:to-nexus-surface-600 shadow-lg hover:shadow-xl ${params.tier.includes(tier.id) ? 'border-nexus-accent-cyan bg-gradient-to-br from-nexus-accent-cyan/20 to-nexus-accent-cyan/10 scale-105 shadow-2xl shadow-nexus-accent-cyan/30 ring-2 ring-nexus-accent-cyan/20' : 'border-nexus-border-medium hover:border-nexus-accent-cyan/50 hover:shadow-nexus-accent-cyan/10'}`}>
                                         <div className="flex justify-between items-start mb-4">
                                         <span className="font-bold text-nexus-text-primary text-2xl">{tier.title}</span>
                                             <input
                                                 type="checkbox"
                                                 checked={params.tier.includes(tier.id)}
                                                 onChange={() => handleMultiSelectToggle('tier', tier.id)}
                                                 className="h-7 w-7 rounded border-2 border-gray-300 text-nexus-accent-cyan focus:ring-nexus-accent-cyan focus:ring-2"
                                             />
                                         </div>
                                         <p className="text-base text-nexus-text-secondary mb-6 flex-grow leading-relaxed">{tier.desc}</p>
                                         <div className="border-t border-nexus-border-medium pt-4">
                                             <p className="text-sm font-bold text-nexus-accent-cyan mb-3 uppercase tracking-wide">Strategic Capabilities</p>
                                             <ul className="text-sm text-nexus-text-secondary space-y-2">
                                                 {tier.features.map(f => <li key={f} className="flex items-center gap-3"><span className="w-2 h-2 bg-nexus-accent-cyan rounded-full"></span> {f}</li>)}
                                             </ul>
                                         </div>
                                     </label>
                             ))}
                             </div>
                         </div>

                         <div className="mt-8 pt-8 border-t border-nexus-border-medium/50">
                             <div className="bg-nexus-surface-600/30 p-6 rounded-xl border border-nexus-border-medium/30 mb-6">
                               <h4 className="text-xl font-bold text-nexus-text-primary mb-3 flex items-center gap-3">
                                 <span className="text-nexus-accent-cyan">🧠</span>
                                 Advanced Analytical Modules
                               </h4>
                               <p className="text-nexus-text-secondary text-base leading-relaxed">These enterprise-grade modules enhance your report with specialized intelligence and predictive capabilities.</p>
                             </div>
                             <div className="space-y-6">
                               {Object.entries(ANALYTICAL_MODULES).map(([key, group]: [string, any]) => (
                                 <div key={key} className="bg-nexus-surface-600/20 p-6 rounded-xl border border-nexus-border-medium/30">
                                   <h5 className="text-lg font-bold text-nexus-text-primary mb-4 flex items-center gap-3">
                                     <span className="text-nexus-accent-cyan">⚡</span>
                                     {group.title}
                                   </h5>
                                   <div className="grid md:grid-cols-2 gap-4">
                                     {group.modules.map((module: any) => (
                                       <div key={module.id} className="p-4 bg-nexus-surface-700/50 rounded-lg border border-nexus-border-medium/20">
                                         <div className="flex items-start justify-between mb-2">
                                           <h6 className="font-semibold text-nexus-text-primary text-sm">{module.name}</h6>
                                           <span className="text-xs px-2 py-1 bg-nexus-accent-cyan/20 text-nexus-accent-cyan rounded-full">{module.status}</span>
                                         </div>
                                         <p className="text-xs text-nexus-text-secondary">{module.description}</p>
                                       </div>
                                     ))}
                                   </div>
                                 </div>
                               ))}
                             </div>
                         </div>

                        <div className="mt-8 pt-8 border-t border-nexus-border-medium/50">
                            <div className="bg-nexus-surface-600/30 p-6 rounded-xl border border-nexus-border-medium/30 mb-6">
                              <h4 className="text-xl font-bold text-nexus-text-primary mb-3 flex items-center gap-3">
                                <span className="text-nexus-accent-brown">📍</span>
                                Geographic Targeting & Scope
                              </h4>
                              <p className="text-nexus-text-secondary text-base leading-relaxed">Define your market focus with precision. Geographic targeting enables hyper-local intelligence gathering and regional opportunity analysis.</p>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className={labelStyles}>Target Region *</label>
                                    <select value={targetRegion} onChange={e => { setTargetRegion(e.target.value); setTargetCountry(''); setTargetCity(''); }} className={`${inputStyles} text-base`} aria-label="Target Region">
                                        <option value="">Select Global Region</option>
                                        {REGIONS_AND_COUNTRIES.map(region => <option key={region.name} value={region.name}>{region.name}</option>)}
                                    </select>
</div>
                                <div className="space-y-2">
                                    <label className={labelStyles}>Target Country *</label>
                                      <select value={targetCountry} onChange={e => setTargetCountry(e.target.value)} disabled={!targetRegion} className={`${inputStyles} disabled:bg-nexus-surface-600 disabled:text-nexus-text-muted text-base`} aria-label="Target Country">
                                        <option value="">Select Country</option>
                                        {REGIONS_AND_COUNTRIES.find(r => r.name === targetRegion)?.countries.map(country => <option key={country} value={country}>{country}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6 mt-6">
                               <div className="space-y-2">
                                     <label className={labelStyles}>Target City / Area</label>
                                     <input type="text" value={targetCity} onChange={e => setTargetCity(e.target.value)} className={`${inputStyles} text-base`} placeholder="e.g., Davao City, Metro Manila" />
                                 </div>
                                 <div className="space-y-2">
                                     <label className={labelStyles}>Analysis Timeframe</label>
                                     <select value={params.analysisTimeframe} onChange={e => handleChange('analysisTimeframe', e.target.value)} className={`${inputStyles} text-base`} aria-label="Analysis Timeframe">
                                         <option>Any Time</option><option>Last 6 Months</option><option>Last 12 Months</option><option>Last 2 Years</option>
                                     </select>
                                 </div>
                             </div>

                            <div className="mt-8">
                                <label className={`${labelStyles} text-lg`}>Core Industry Focus (Select one or more) *</label>
                                <div className="bg-nexus-surface-600/20 p-6 rounded-xl border border-nexus-border-medium/30 mt-3">
                                  <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                                      {INDUSTRIES.map((industry) => (
                                          <button key={industry.id} onClick={() => handleMultiSelectToggle('industry', industry.id)} className={`p-5 rounded-xl border-2 transition-all duration-300 flex flex-col items-center text-center h-full group bg-gradient-to-br from-nexus-surface-800 to-nexus-surface-700 hover:from-nexus-surface-700 hover:to-nexus-surface-600 shadow-md hover:shadow-lg ${params.industry.includes(industry.id) ? 'border-nexus-accent-brown bg-gradient-to-br from-nexus-accent-brown/20 to-nexus-accent-brown/10 scale-105 shadow-xl shadow-nexus-accent-brown/30 ring-2 ring-nexus-accent-brown/20' : 'border-nexus-border-medium hover:border-nexus-accent-brown/50 hover:shadow-nexus-accent-brown/10'}`}>
                                              <industry.icon className={`w-12 h-12 mb-3 transition-colors duration-200 ${params.industry.includes(industry.id) ? 'text-nexus-accent-brown' : 'text-nexus-text-secondary group-hover:text-nexus-text-primary'}`} />
                                              <span className="font-bold text-nexus-text-primary text-sm leading-tight">{industry.title}</span>
                                          </button>
                                      ))}
                                      <button onClick={() => handleMultiSelectToggle('industry', 'Custom')} className={`p-5 rounded-xl border-2 transition-all duration-300 flex flex-col items-center text-center h-full group bg-gradient-to-br from-nexus-surface-800 to-nexus-surface-700 hover:from-nexus-surface-700 hover:to-nexus-surface-600 shadow-md hover:shadow-lg ${params.industry.includes('Custom') ? 'border-nexus-accent-brown bg-gradient-to-br from-nexus-accent-brown/20 to-nexus-accent-brown/10 scale-105 shadow-xl shadow-nexus-accent-brown/30 ring-2 ring-nexus-accent-brown/20' : 'border-nexus-border-medium hover:border-nexus-accent-brown/50 hover:shadow-nexus-accent-brown/10'}`} title="Define a custom industry">
                                          <CustomIndustryIcon className={`w-12 h-12 mb-3 transition-colors duration-200 ${params.industry.includes('Custom') ? 'text-nexus-accent-brown' : 'text-nexus-text-secondary group-hover:text-nexus-text-primary'}`} />
                                          <span className="font-bold text-nexus-text-primary text-sm leading-tight">Custom</span>
                                      </button>
                                  </div>
                                </div>
                            </div>
                            {params.industry.includes('Custom') && (
                                <div className="mt-4">
                                    <label className={labelStyles}>Custom Industry Definition *</label>
                                    <textarea value={params.customIndustry} onChange={e => handleChange('customIndustry', e.target.value)} rows={2} className={inputStyles} placeholder="Describe the custom industry or niche sector..." />
                                </div>
                            )}
                            <div className="mt-8">
                                <label className={`${labelStyles} text-lg`}>Ideal Partner Profile *</label>
                                <div className="bg-nexus-surface-600/20 p-6 rounded-xl border border-nexus-border-medium/30 mt-3">
                                  <textarea value={params.idealPartnerProfile} onChange={e => handleChange('idealPartnerProfile', e.target.value)} rows={5} className={`${inputStyles} text-base resize-none`} placeholder="Describe your ideal strategic partner in detail. Consider: company size, technological capabilities, market presence, cultural fit, financial stability, and complementary strengths..." />
                                  <p className="text-sm text-nexus-text-secondary mt-3 flex items-center gap-2">
                                    <span className="text-nexus-accent-cyan">💡</span>
                                    Be specific about partnership criteria to enable precise matching algorithms
                                  </p>
                                </div>
                            </div>
                        </div>
                    </Card>
                );
             case 3: // Objective & AI Analyst
                return (
                    <Card className="bg-gradient-to-br from-nexus-surface-800 to-nexus-surface-700 border-nexus-border-medium/50 shadow-xl">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-12 h-12 bg-nexus-surface-600 rounded-xl flex items-center justify-center shadow-lg border border-nexus-border-medium">
                            <span className="text-2xl">🎯</span>
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-nexus-text-primary font-serif bg-gradient-to-r from-nexus-accent-cyan to-nexus-accent-cyan-dark bg-clip-text text-transparent">Strategic Objective & AI Intelligence</h3>
                            <p className="text-nexus-text-secondary text-sm">Define your mission and configure advanced AI analytical frameworks</p>
                          </div>
                        </div>
                        <p className="text-nexus-text-secondary mb-8 text-base leading-relaxed bg-nexus-surface-600/30 p-4 rounded-lg border border-nexus-border-medium/30">
                          Articulate your strategic objective with precision. The AI will adapt its analytical approach based on your defined purpose and selected intelligence personas.
                        </p>
                        
                        <div className="mt-8">
                            <label className={`${labelStyles} text-lg`}>Define Core Strategic Objective (The 'Why') *</label>
                            <div className="bg-nexus-surface-600/20 p-6 rounded-xl border border-nexus-border-medium/30 mt-3">
                              <textarea value={params.problemStatement} onChange={e => handleChange('problemStatement', e.target.value)} rows={6} className={`${inputStyles} text-base resize-none`} placeholder="Articulate your strategic objective with clarity. What specific challenge are you addressing? What market opportunity are you pursuing? What measurable outcomes define success?" />
                              <p className="text-sm text-nexus-text-secondary mt-3 flex items-center gap-2">
                                <span className="text-nexus-accent-cyan">🎯</span>
                                Clear objectives enable the AI to provide targeted, actionable intelligence
                              </p>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-nexus-border-medium/50">
                            <div className="bg-nexus-surface-600/30 p-6 rounded-xl border border-nexus-border-medium/30 mb-6">
                              <label className={`${labelStyles} text-lg`}>Configure AI Intelligence Analyst *</label>
                              <p className="text-nexus-text-secondary text-base leading-relaxed mt-2">Select AI personas that align with your analytical needs. Each persona brings specialized expertise and communication styles.</p>
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                {AI_PERSONAS.map((persona) => (
                                    <button key={persona.id} onClick={() => handleMultiSelectToggle('aiPersona', persona.id)} className={`p-5 rounded-xl border-2 transition-all duration-300 flex flex-col items-center text-center h-full group bg-gradient-to-br from-nexus-surface-800 to-nexus-surface-700 hover:from-nexus-surface-700 hover:to-nexus-surface-600 shadow-md hover:shadow-lg ${params.aiPersona.includes(persona.id) ? 'border-nexus-accent-brown bg-gradient-to-br from-nexus-accent-brown/20 to-nexus-accent-brown/10 scale-105 shadow-xl shadow-nexus-accent-brown/30 ring-2 ring-nexus-accent-brown/20' : 'border-nexus-border-medium hover:border-nexus-accent-brown/50 hover:shadow-nexus-accent-brown/10'}`} title={persona.description}>
                                        <persona.icon className={`w-12 h-12 mb-3 transition-colors duration-200 ${params.aiPersona.includes(persona.id) ? 'text-nexus-accent-brown' : 'text-nexus-text-secondary group-hover:text-nexus-text-primary'}`} />
                                        <span className="font-bold text-nexus-text-primary text-sm leading-tight">{persona.title}</span>
                                    </button>
                                ))}
                                <button onClick={() => handleMultiSelectToggle('aiPersona', 'Custom')} className={`p-5 rounded-xl border-2 transition-all duration-300 flex flex-col items-center text-center h-full group bg-gradient-to-br from-nexus-surface-800 to-nexus-surface-700 hover:from-nexus-surface-700 hover:to-nexus-surface-600 shadow-md hover:shadow-lg ${params.aiPersona.includes('Custom') ? 'border-nexus-accent-brown bg-gradient-to-br from-nexus-accent-brown/20 to-nexus-accent-brown/10 scale-105 shadow-xl shadow-nexus-accent-brown/30 ring-2 ring-nexus-accent-brown/20' : 'border-nexus-border-medium hover:border-nexus-accent-brown/50 hover:shadow-nexus-accent-brown/10'}`} title="Define a custom persona">
                                    <CustomPersonaIcon className={`w-12 h-12 mb-3 transition-colors duration-200 ${params.aiPersona.includes('Custom') ? 'text-nexus-accent-brown' : 'text-nexus-text-secondary group-hover:text-nexus-text-primary'}`} />
                                    <span className="font-bold text-nexus-text-primary text-sm leading-tight">Custom</span>
                                </button>
                            </div>

                            {params.aiPersona.includes('Custom') && (
                                <div className="mt-4">
                                    <label className={labelStyles}>Custom Persona Definition *</label>
                                    <textarea value={params.customAiPersona} onChange={e => handleChange('customAiPersona', e.target.value)} rows={3} className={inputStyles} placeholder="Describe the persona's expertise, focus, and tone..." />
                                </div>
                            )}
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mt-8">
                            <div>
                                <label className={`${labelStyles} text-lg`}>Analytical Frameworks</label>
                                <div className="bg-nexus-surface-600/20 p-4 rounded-xl border border-nexus-border-medium/30 mt-3 space-y-3">
                                    {ANALYTICAL_LENSES.map(lens => (
                                        <label key={lens} className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all duration-200 border-2 ${params.analyticalLens?.includes(lens) ? 'border-nexus-accent-cyan bg-nexus-accent-cyan/10 shadow-md ring-1 ring-nexus-accent-cyan/30' : 'border-nexus-border-medium hover:border-nexus-accent-cyan/50 bg-nexus-surface-800 hover:bg-nexus-surface-700'}`}>
                                            <input type="checkbox" checked={params.analyticalLens?.includes(lens)} onChange={() => handleMultiSelectToggle('analyticalLens', lens)} className="h-5 w-5 rounded border-2 border-gray-300 text-nexus-accent-cyan focus:ring-nexus-accent-cyan focus:ring-2" />
                                            <span className="text-base font-medium text-nexus-text-primary">{lens}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className={`${labelStyles} text-lg`}>Communication Styles</label>
                                <div className="bg-nexus-surface-600/20 p-4 rounded-xl border border-nexus-border-medium/30 mt-3 space-y-3">
                                    {TONES_AND_STYLES.map(style => (
                                        <label key={style} className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all duration-200 border-2 ${params.toneAndStyle?.includes(style) ? 'border-nexus-accent-cyan bg-nexus-accent-cyan/10 shadow-md ring-1 ring-nexus-accent-cyan/30' : 'border-nexus-border-medium hover:border-nexus-accent-cyan/50 bg-nexus-surface-800 hover:bg-nexus-surface-700'}`}>
                                            <input type="checkbox" checked={params.toneAndStyle?.includes(style)} onChange={() => handleMultiSelectToggle('toneAndStyle', style)} className="h-5 w-5 rounded border-2 border-gray-300 text-nexus-accent-cyan focus:ring-nexus-accent-cyan focus:ring-2"/>
                                            <span className="text-base font-medium text-nexus-text-primary">{style}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>
                );
            case 4: // Review & Generate
                const isInvalid = (field: keyof ReportParameters, condition?: boolean) => {
                    const value = params[field];
                    if (condition === false) return false;
                    if (Array.isArray(value)) return value.length === 0;
                    if (typeof value === 'string') return !value.trim();
                    return false;
                };

                const summaryItemClasses = (invalid: boolean) =>
                    `p-2 rounded-md transition-colors ${invalid ? 'bg-red-500/10 border border-red-500/20 shadow-inner' : ''}`;


                const SummaryItem: React.FC<{label: string, value: React.ReactNode, invalid?: boolean}> = ({label, value, invalid = false}) => (
                    <div className={summaryItemClasses(invalid)}>
                        <div className="text-sm font-semibold text-nexus-text-secondary">{label}</div>
                        <div className="text-nexus-text-primary pl-2">{value || <span className="text-red-500 italic">Not Provided</span>}</div>
                    </div>
                );
                
                return (
                      <Card className="bg-gradient-to-br from-nexus-surface-800 to-nexus-surface-700 border-nexus-border-medium/50 shadow-xl">
                         <div className="flex items-center gap-4 mb-6">
                           <div className="w-12 h-12 bg-nexus-surface-600 rounded-xl flex items-center justify-center shadow-lg border border-nexus-border-medium">
                             <span className="text-2xl">🚀</span>
                           </div>
                           <div>
                             <h3 className="text-2xl font-bold text-nexus-text-primary font-serif bg-gradient-to-r from-nexus-accent-cyan to-nexus-accent-cyan-dark bg-clip-text text-transparent">Final Review & Intelligence Generation</h3>
                             <p className="text-nexus-text-secondary text-sm">AI-powered quality assessment and strategic blueprint synthesis</p>
                           </div>
                         </div>
                         <p className="text-nexus-text-secondary mb-8 text-base leading-relaxed bg-nexus-surface-600/30 p-4 rounded-lg border border-nexus-border-medium/30">
                           Your configuration has been analyzed by advanced AI systems. Review the quality assessment below and proceed with confidence. Enterprise-grade collaboration and real-time intelligence integration are now active.
                         </p>
                        
                        <QualityAnalysis params={params} />

                        {/* Trade Disruption & Market Diversification Analysis */}
                        <div className="mb-8">
                            <h4 className="text-lg font-semibold text-nexus-text-primary mb-4">Global Trade Intelligence Analysis</h4>
                            <p className="text-sm text-nexus-text-secondary mb-6">
                                Advanced AI-powered analysis of current trade disruptions and market diversification opportunities, considering US tariff impacts and emerging market potential.
                            </p>

                            {/* Sample Trade Disruption Analysis */}
                            <div className="mb-8">
                                {(() => {
                                    const sampleTradeVolume = 2500000000; // $2.5B
                                    const sampleTariffRate = 15; // 15%
                                    const sampleMarkets = ['Vietnam', 'India', 'Mexico', 'Brazil', 'Indonesia'];
                                    const analysis = TradeDisruptionAnalyzer.calculateDisruptionImpact(
                                        sampleTradeVolume,
                                        sampleTariffRate,
                                        sampleMarkets,
                                        35 // diversification index
                                    );
                                    return <TradeDisruptionDisplay analysis={analysis} />;
                                })()}
                            </div>

                            {/* Sample Market Diversification Dashboard */}
                            <div className="mb-8">
                                <MarketDiversificationDashboard
                                    currentMarkets={{
                                        'United States': 45,
                                        'China': 25,
                                        'European Union': 20,
                                        'Japan': 10
                                    }}
                                    potentialMarkets={['Vietnam', 'India', 'Mexico', 'Brazil', 'Indonesia', 'Turkey', 'South Africa', 'Thailand']}
                                    tradeDisruptionRisk={0.6}
                                />
                            </div>
                        </div>

                        <div className="space-y-6 p-6 bg-gradient-to-br from-nexus-surface-800 to-nexus-surface-700 border border-nexus-border-medium/50 rounded-xl shadow-lg">
                            <div className="grid md:grid-cols-2 gap-6">
                              <SummaryItem label="Report Name" value={params.reportName} invalid={isInvalid('reportName')} />
                              <SummaryItem label="Intelligence Operator" value={`${params.userName || 'N/A'} (${params.organizationType})`} invalid={isInvalid('userName')} />
                              <SummaryItem label="Analysis Tiers" value={<ul className="list-disc list-inside space-y-1">{params.tier.map(t => <li key={t} className="text-sm">{currentTiers.find(tier => tier.id === t)?.title || t}</li>)}</ul>} invalid={isInvalid('tier')} />
                              <SummaryItem label="Geographic Focus" value={`${params.region || 'N/A'}`} invalid={isInvalid('region')} />
                              <SummaryItem label="Industry Sectors" value={params.industry.filter(i=>i !== 'Custom').join(', ') || 'N/A'} invalid={isInvalid('industry')} />
                              <SummaryItem label="Custom Sector" value={params.customIndustry || 'Not specified'} invalid={isInvalid('customIndustry', params.industry.includes('Custom'))} />
                            </div>
                            <div className="border-t border-nexus-border-medium/30 pt-6 space-y-4">
                              <SummaryItem label="Strategic Objective" value={<div className="italic text-nexus-accent-cyan bg-nexus-accent-cyan/5 p-3 rounded-lg border border-nexus-accent-cyan/20">"{params.problemStatement}"</div>} invalid={isInvalid('problemStatement')} />
                              <SummaryItem label="AI Intelligence Personas" value={<ul className="list-disc list-inside space-y-1">{params.aiPersona.filter(p=>p !== 'Custom').map(p => <li key={p} className="text-sm">{p}</li>)}</ul>} invalid={isInvalid('aiPersona')} />
                              <SummaryItem label="Custom Intelligence Profile" value={params.customAiPersona || 'Not configured'} invalid={isInvalid('customAiPersona', params.aiPersona.includes('Custom'))} />
                            </div>
                        </div>

                        <div className="mt-6">
                            <h4 className="text-lg font-semibold text-nexus-text-primary mb-2">Advanced Capabilities Now Available</h4>
                            <p className="text-sm text-nexus-text-secondary mb-4">Your Nexus Blueprint now includes cutting-edge features for enhanced strategic intelligence.</p>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="p-4 bg-nexus-surface-700 border border-nexus-border-medium rounded-lg">
                                    <p className="text-sm font-bold text-nexus-accent-cyan mb-2">🚀 Advanced Data Integration</p>
                                    <p className="text-xs text-nexus-text-secondary">Real-time Bloomberg/Reuters data, competitor analysis, regulatory databases, and industry-specific feeds integrated.</p>
                                </div>
                                <div className="p-4 bg-nexus-surface-700 border border-nexus-border-medium rounded-lg">
                                    <p className="text-sm font-bold text-nexus-accent-brown mb-2">🤝 Collaborative Intelligence</p>
                                    <p className="text-xs text-nexus-text-secondary">Multi-user collaboration, stakeholder feedback, version control, and team workspaces enabled.</p>
                                </div>
                                <div className="p-4 bg-nexus-surface-700 border border-nexus-border-medium rounded-lg">
                                    <p className="text-sm font-bold text-nexus-accent-cyan mb-2">🎨 Custom Templates & Branding</p>
                                    <p className="text-xs text-nexus-text-secondary">Professional templates, custom branding, multiple export formats (PDF, PowerPoint, Word), and flexible layouts.</p>
                                </div>
                                <div className="p-4 bg-nexus-surface-700 border border-nexus-border-medium rounded-lg">
                                    <p className="text-sm font-bold text-nexus-accent-brown mb-2">🧠 AI Content Enhancement</p>
                                    <p className="text-xs text-nexus-text-secondary">Intelligent content optimization, readability scoring, automated summaries, and content gap analysis.</p>
                                </div>
                                <div className="p-4 bg-nexus-surface-700 border border-nexus-border-medium rounded-lg">
                                    <p className="text-sm font-bold text-nexus-accent-cyan mb-2">📊 Advanced Visualizations</p>
                                    <p className="text-xs text-nexus-text-secondary">Interactive charts, custom dashboards, data visualization libraries, and exportable visual reports.</p>
                                </div>
                                <div className="p-4 bg-nexus-surface-700 border border-nexus-border-medium rounded-lg">
                                    <p className="text-sm font-bold text-nexus-accent-brown mb-2">🔍 Smart Search & Discovery</p>
                                    <p className="text-xs text-nexus-text-secondary">Full-text search, tag-based organization, report analytics, and integrated knowledge base.</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h4 className="text-lg font-semibold text-nexus-text-primary mb-2">Standard Analytical Modules</h4>
                            <p className="text-sm text-nexus-text-secondary mb-4">The following core methodologies are automatically applied to every Nexus Blueprint to ensure analytical rigor and strategic depth.</p>
                            <div className="p-4 bg-nexus-surface-700 border border-nexus-border-medium rounded-lg space-y-3">
                                <div>
                                    <p className="text-sm font-bold text-nexus-accent-cyan">Core Analytics</p>
                                    <p className="text-xs text-nexus-text-secondary">Global Data API Integration, ARIMA Time Series Analysis, Monte Carlo Risk Simulation, Game Theory.</p>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-nexus-accent-brown">Enterprise Intelligence</p>
                                    <p className="text-xs text-nexus-text-secondary">Predictive Policy Modeling, Cross-Border Synergy Mapper, Automated ESG Compliance Framework.</p>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-nexus-accent-cyan">Trade & Market Intelligence</p>
                                    <p className="text-xs text-nexus-text-secondary">Global Trade Disruption Analysis, Market Diversification Engine, Tariff Impact Modeling, Alternative Market Opportunity Scoring.</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                );
            default: return null;
        }
    };

    return (
        <div className="generator-workspace h-full bg-nexus-primary-900">
            <div ref={scrollPanelRef} className="generator-panel bg-nexus-primary-900 text-nexus-text-primary overflow-y-auto">
                <div className="max-w-5xl mx-auto px-4 md:px-6 h-full flex flex-col">
                    {/* --- Non-scrolling Header --- */}
                    <div className="flex-shrink-0 pt-8 md:pt-12 pb-4">
                        <header className="text-center mb-4">
                            <div className="mb-8 mt-4">
                                <h2 className="text-2xl md:text-3xl font-bold text-nexus-text-primary tracking-tight font-serif mb-2 leading-tight bg-gradient-to-r from-nexus-text-primary via-nexus-accent-cyan to-nexus-text-primary bg-clip-text text-transparent">
                                    Intelligence Blueprint Generator
                                </h2>
                                <p className="text-sm md:text-base text-nexus-text-secondary max-w-2xl mx-auto leading-snug">
                                    Transform strategic opportunities into intelligence reports. AI collaboration, real-time data, and enterprise customization.
                                </p>
                            </div>
                        </header>
                    </div>

                    {/* --- Scrolling Content --- */}
                    <div className="flex-grow pb-16">
                        {renderStepContent()}
                    </div>

                    {/* --- Non-scrolling Footer --- */}
                    <div className="flex-shrink-0 py-8 border-t border-nexus-border-medium bg-nexus-primary-800/30">
                        {error && <p className="text-red-600 text-center mb-4 text-sm bg-red-50 p-3 rounded-md border border-red-200">{error}</p>}

                        <div className="wizard-nav max-w-5xl px-4 md:px-6" style={{ marginTop: 0 }}>
                            {step > 1 && (
                                <button onClick={prevStep} disabled={isGenerating} className="nexus-button-secondary">Back</button>
                            )}

                            {step < WIZARD_STEPS.length && step > 1 ? (
                                <button onClick={nextStep} disabled={isGenerating} className="nexus-button-primary">Next</button>
                            ) : (
                                step === WIZARD_STEPS.length && <button onClick={handleGenerateReport} disabled={isGenerating} className="w-full max-w-xs bg-gradient-to-r from-nexus-accent-brown to-nexus-accent-brown-dark text-white font-bold py-3 px-8 rounded-xl text-lg shadow-lg shadow-nexus-accent-brown/30 hover:shadow-xl hover:shadow-nexus-accent-brown/50 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-nexus-accent-brown/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3">
                                    {isGenerating ? <><Spinner /> Generating...</> : 'Generate Report'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="inquire-panel bg-nexus-surface-800 border-l border-nexus-border-medium w-96 flex-shrink-0">
                <Inquire
                    {...restInquireProps}
                    params={params}
                    wizardStep={step}
                    aiInteractionState={aiInteractionState}
                    onAiInteractionStateChange={setAiInteractionState}
                    onScopeComplete={handleScopeComplete}
                    onReportUpdate={onReportUpdate}
                    onProfileUpdate={onProfileUpdate}
                    isGenerating={isGenerating}
                />
            </div>

            <button
                onClick={scrollToTop}
                className={`back-to-top-btn ${showScroll ? 'visible' : ''}`}
                aria-label="Back to top"
            >
                <ArrowUpIcon className="w-6 h-6" />
            </button>
        </div>
    );
};

export default ReportGenerator;