
import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { ReportParameters, UserProfile as UserProfileType, ReportSuggestions } from '../types.ts';
import { REGIONS_AND_COUNTRIES, INDUSTRIES, AI_PERSONAS, ORGANIZATION_TYPES, ANALYTICAL_LENSES, TONES_AND_STYLES, TIERS_BY_ORG_TYPE, ANALYTICAL_MODULES } from '../constants.tsx';
import Spinner, { SpinnerSmall } from './Spinner.tsx';
import { Inquire } from './Inquire.tsx';
import { CustomPersonaIcon, CustomIndustryIcon, ArrowUpIcon, NexusLogo } from './Icons.tsx';
import Stepper from './Stepper.tsx';
import QualityAnalysis from './QualityAnalysis.tsx';
import { ProfileStep } from './ProfileStep.tsx';
import { generateReportStream, fetchResearchAndScope } from '../services/nexusService.ts';
import Card from './common/Card.tsx';

interface ReportGeneratorProps {
    params: ReportParameters;
    onViewChange: (view: any, params: ReportParameters) => void; // Corrected prop name
    onReportUpdate: (params: ReportParameters, content: string, error: string | null, generating: boolean) => void;
    onProfileUpdate: (profile: UserProfileType) => void;
    isGenerating: boolean;
    onApplySuggestions: (suggestions: ReportSuggestions) => void;
    savedReports: ReportParameters[];
    onSaveReport: (params: ReportParameters) => void;
    onLoadReport: (params: ReportParameters) => void;
    onDeleteReport: (reportName: string) => void;
    onScopeComplete: () => void;
}

const WIZARD_STEPS = [
    { id: 0, title: 'Initial Analysis', description: 'AI-powered guidance to start.' },
    { id: 1, title: 'User Profile & Intent', description: 'Define your role and goals.' },
    { id: 2, title: 'Strategic Context', description: 'Set the geographic and industry focus.' },
    { id: 3, title: 'Partnership Objectives', description: 'Describe your ideal partner.' },
    { id: 4, title: 'Analysis Framework', description: 'Configure the AI analyst team.' },
    { id: 5, title: 'Final Review & Generation', description: 'Launch your intelligence blueprint.' }
];

const ReportGenerator: React.FC<ReportGeneratorProps> = ({
    params,
    onViewChange, // Use the correct prop
    onReportUpdate,
    onProfileUpdate,
    isGenerating,
    onApplySuggestions,
    savedReports,
    onSaveReport,
    onLoadReport,
    onDeleteReport,
    onScopeComplete,
}) => {
    const [step, setStep] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [aiInteractionState, setAiInteractionState] = useState<'idle' | 'welcomed' | 'prompted' | 'answeredPrompt' | 'active'>('idle');
    const [initialAnalysis, setInitialAnalysis] = useState<any>(null);
    const [intelligenceFeed, setIntelligenceFeed] = useState<any[]>([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const [targetRegion, setTargetRegion] = useState('');
    const [targetCountry, setTargetCountry] = useState('');
    const [targetCity, setTargetCity] = useState('');

    const handleStepClick = useCallback((stepNumber: number | null) => {
        if (stepNumber !== null && stepNumber > 0 && !initialAnalysis) {
            setError("Please complete the initial analysis first.");
            return;
        }
        if (stepNumber !== null) setStep(stepNumber);
    }, [initialAnalysis]);

    const handleChange = useCallback((field: keyof ReportParameters, value: any) => {
        console.log('🔄 handleChange called:', { field, value, currentParams: params });
        onViewChange('report', { ...params, [field]: value }); // Call the correct prop with updated params
    }, [params, onViewChange]);

    // DEBUG: Force default organization type if missing
    useEffect(() => {
        if (!params.organizationType || params.organizationType === '') {
            handleChange('organizationType', 'Default');
        }
    }, [params.organizationType, handleChange]); // Added handleChange to deps

    const [showScroll, setShowScroll] = useState(false);
    const scrollPanelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const panel = scrollPanelRef.current;
        if (!panel) return;
        const handleScroll = () => {
            const shouldShow = panel.scrollTop > 300;
            console.log('📜 Scroll event:', { scrollTop: panel.scrollTop, shouldShow, currentShowScroll: showScroll });
            // Only update if the state actually changes to prevent unnecessary re-renders
            setShowScroll(prev => prev !== shouldShow ? shouldShow : prev);
        };
        panel.addEventListener('scroll', handleScroll);
        return () => panel.removeEventListener('scroll', handleScroll);
    }, []); // Remove showScroll from deps to prevent re-creating the event listener

    const scrollToTop = useCallback(() => scrollPanelRef.current?.scrollTo({ top: 0, behavior: 'smooth' }), []);

    useEffect(() => {
        if (params.reportName.trim() && aiInteractionState !== 'active') {
            setAiInteractionState('active');
        }
    }, [params.reportName]); // Removed aiInteractionState from deps to prevent loops

    useEffect(() => {
        console.log('🔄 Region parsing useEffect triggered, params.region:', params.region);
        const regionValue = params.region;
        if (regionValue) {
            const parts = regionValue.split(',').map(p => p.trim());
            const potentialCountry = parts[parts.length - 1];
            const foundRegionData = REGIONS_AND_COUNTRIES.find(r => r.countries.includes(potentialCountry));

            if (foundRegionData) {
                const newRegion = foundRegionData.name;
                const newCountry = potentialCountry;
                const newCity = parts.slice(0, -1).join(', ');

                // Only update if values actually changed to prevent unnecessary re-renders
                if (newRegion !== targetRegion || newCountry !== targetCountry || newCity !== targetCity) {
                    console.log('🔄 Setting target states:', { region: newRegion, country: newCountry, city: newCity });
                    setTargetRegion(newRegion);
                    setTargetCountry(newCountry);
                    setTargetCity(newCity);
                }
            } else {
                // Only clear if not already cleared
                if (targetRegion || targetCountry || targetCity) {
                    console.log('🔄 Clearing target states (no region found)');
                    setTargetRegion('');
                    setTargetCountry('');
                    setTargetCity('');
                }
            }
        } else {
            // Only clear if not already cleared
            if (targetRegion || targetCountry || targetCity) {
                console.log('🔄 Clearing target states (no region value)');
                setTargetRegion('');
                setTargetCountry('');
                setTargetCity('');
            }
        }
    }, [params.region, targetRegion, targetCountry, targetCity]);
    
    useEffect(() => {
        const combinedRegion = [targetCity, targetCountry].filter(Boolean).join(', ');
        console.log('🔄 Combined region useEffect triggered:', { combinedRegion, currentRegion: params.region, targetCity, targetCountry });
        if (combinedRegion !== params.region) {
            console.log('🔄 Updating region via handleChange:', combinedRegion);
            handleChange('region', combinedRegion);
        }
    }, [targetCity, targetCountry, params.region, handleChange]);

    const handleMultiSelectToggle = useCallback((field: 'aiPersona' | 'analyticalLens' | 'toneAndStyle' | 'industry' | 'tier', value: string) => {
        const currentValues = params[field] as string[] || [];
        const newValues = currentValues.includes(value)
            ? currentValues.filter(v => v !== value)
            : [...currentValues, value];

        if ((field === 'aiPersona' || field === 'industry') && newValues.length === 0 && (params[field] as string[]).length > 0) {
            return;
        }

        onViewChange('report', { ...params, [field]: newValues });
    }, [params, onViewChange]);
    
    const getValidationErrors = useCallback((stepNum: number): string[] => {
        const errors: string[] = [];
        switch(stepNum) {
            case 1:
                if (!params.userName.trim()) errors.push("Your Name is required.");
                if (!params.reportName.trim()) errors.push("Report Name is required.");
                break;
            case 2:
                if (!params.region.trim()) errors.push("A target location is required.");
                if (params.industry.length === 0) errors.push("At least one Core Industry must be selected.");
                if (params.industry.includes('Custom') && !params.customIndustry?.trim()) errors.push("Custom Industry Definition is required.");
                break;
            case 3:
                if (!params.idealPartnerProfile.trim()) errors.push("Ideal Partner Profile is required.");
                if (!params.problemStatement.trim()) errors.push("Core Objective is required.");
                break;
            case 4:
                if (params.tier.length === 0) errors.push("At least one Report Tier must be selected.");
                if (params.aiPersona.length === 0) errors.push("At least one AI Analyst persona must be selected.");
                if (params.aiPersona.includes('Custom') && !params.customAiPersona?.trim()) errors.push("Custom Persona Definition is required.");
                break;
            default: break;
        }
        return errors;
    }, [params]);

    const nextStep = useCallback(() => {
        setError(null);
        scrollToTop();
        const validationErrors = getValidationErrors(step);
        if (validationErrors.length === 0) {
            if (step < WIZARD_STEPS.length) setStep(s => s + 1);
        } else {
            setError(validationErrors.join(' '));
        }
    }, [step, getValidationErrors]);

    const prevStep = useCallback(() => {
        setError(null);
        scrollToTop();
        if (step > 0) setStep(s => s - 1);
    }, []);

    const handleInitialAnalysis = useCallback(async (userInput: string) => {
        setIsAnalyzing(true);
        setError(null);
        setInitialAnalysis(null); // Clear previous analysis
        try {
            if (!userInput.trim()) {
                throw new Error("Please provide your objective to start the analysis.");
            }

            const analysis = await fetchResearchAndScope(userInput, null, params);

            // Simulate an intelligence feed based on the analysis
            const feedItems = [
                { category: 'Geographic Focus', items: [{ details: `Analysis centered on ${analysis.suggestions.region || 'the identified region'}.` }] },
                { category: 'Sector Focus', items: [{ details: `Primary industry identified: ${analysis.suggestions.industry || 'Not specified'}.` }] },
            ];
            setIntelligenceFeed(feedItems);

            setInitialAnalysis(analysis);

            // Pre-populate some suggestions
            onApplySuggestions({
                ...analysis.suggestions,
                // Ensure industry is an array
                industry: analysis.suggestions.industry ? [analysis.suggestions.industry] : [],
            });

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Analysis failed');
        } finally {
            setIsAnalyzing(false);
        }
    }, [params, onApplySuggestions]);

    const handleScopeComplete = useCallback(() => {
        setStep(1); // Go to step 1 after initial analysis
        scrollToTop();
    }, [scrollToTop]);

    const handleGenerateReport = useCallback(async () => {
        setError(null);
        const allErrors = [...getValidationErrors(1), ...getValidationErrors(2), ...getValidationErrors(3), ...getValidationErrors(4)];
        if (allErrors.length > 0) {
            setError("Please complete all required fields. Missing: " + allErrors.join(', '));
            return;
        }

        onProfileUpdate({ userName: params.userName, userDepartment: params.userDepartment, organizationType: params.organizationType, userCountry: params.userCountry });
        onReportUpdate(params, '', null, true);

        try {
            const stream = await generateReportStream(params);
            const reader = stream.getReader();
            const decoder = new TextDecoder();
            let content = '';
            let done = false;

            while (!done) {
                const { value, done: readerDone } = await reader.read();
                done = readerDone;
                if (value) {
                    const decodedChunk = decoder.decode(value, { stream: true });
                    content += decodedChunk;
                    // Throttle UI updates to avoid overwhelming the browser
                    requestAnimationFrame(() => {
                        onReportUpdate(params, content, null, true);
                    });
                }
            }

            // Final update
            onReportUpdate(params, content, null, false);
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred';
            setError(errorMessage);
            onReportUpdate(params, '', errorMessage, false);
        }
    }, [params, onReportUpdate, onProfileUpdate, getValidationErrors]);

    const inputStyles = "w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 placeholder:text-gray-400 text-gray-800 shadow-sm text-base";
    const labelStyles = "block text-base font-semibold text-gray-800 mb-2";
    const currentTiers = TIERS_BY_ORG_TYPE[params.organizationType] || TIERS_BY_ORG_TYPE['Default'] || [];

    const renderStepContent = () => {
        switch (step) {
            case 0: // Initial Analysis & Guidance
                return (
                    <Card className="animate-fadeIn">
                        <div className="flex items-center gap-4 animate-fadeIn">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shadow-md border border-blue-200">
                                <NexusLogo className="w-7 h-7 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900">Nexus AI Initial Analysis</h3>
                                <p className="text-gray-600 text-base">State your core objective. The AI will conduct initial research to guide and pre-fill your report.</p>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="initial-objective" className={labelStyles}>Your Core Objective</label>
                            <textarea
                                id="initial-objective"
                                value={params.problemStatement}
                                onChange={(e) => handleChange('problemStatement', e.target.value)}
                                rows={4}
                                className={inputStyles}
                                placeholder="Example: I need to find manufacturing partners in Southeast Asia for electronics, focusing on cost-effectiveness and supply chain resilience."
                            />
                            <p className="text-xs text-gray-500 mt-2">
                                This objective will be used for the initial AI analysis and will also populate Step 3.
                            </p>
                        </div>

                        {/* Intelligence Feed Preview */}
                        {intelligenceFeed.length > 0 && (
                            <div className="bg-gray-50/80 p-6 rounded-xl border border-gray-200/80 animate-fadeIn" style={{ animationDelay: '100ms' }}>
                                <h4 className="text-lg font-bold text-gray-800 mb-4">📊 Live Intelligence Feed</h4>
                                <div className="space-y-4">
                                    {intelligenceFeed.slice(0, 2).map((category, idx) => (
                                        <div key={idx} className="bg-white p-4 rounded-lg border border-gray-200">
                                            <h5 className="font-semibold text-gray-800 mb-1">{category.category}</h5>
                                            <p className="text-sm text-gray-600">{category.items[0]?.details}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Analysis Results */}
                        {initialAnalysis && (
                            <div className="bg-green-50 p-6 rounded-xl border border-green-200 animate-fadeIn" style={{ animationDelay: '200ms' }} >
                                <h4 className="text-lg font-bold text-green-800 mb-4">🎯 AI Analysis Complete</h4>
                                <div className="prose prose-sm max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: initialAnalysis.summary }} />
                                <div className="mt-4 pt-4 border-t border-green-200">
                                    <p className="text-sm text-gray-600">
                                        The AI has pre-filled several fields in the following steps based on this analysis. You can review and adjust them as needed.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Proceed Button */}
                        {initialAnalysis && (
                            <div className="flex justify-center pt-6 border-t border-gray-200">
                                <button
                                    onClick={handleScopeComplete}
                                    className="px-8 py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-all shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40"
                                >
                                    Continue to Profile Setup →
                                </button>
                            </div>
                        )}
                    </Card>
                );
            case 1: // User Profile & Partnership Intent
                return (
                    <Card className="animate-fadeIn">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center shadow-md border border-gray-200">
                            <span className="text-2xl">👤</span>
                          </div>
                          <div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900">User Profile & Partnership Intent</h3>
                            <p className="text-gray-600 text-base">Tell us about yourself and your partnership goals to get personalized guidance.</p>
                          </div>
                        </div>

                        <ProfileStep params={params} handleChange={handleChange} inputStyles={inputStyles} labelStyles={labelStyles} />

                        <div className="pt-8 border-t border-gray-200/80">
                            <div className="bg-gray-50/80 p-4 md:p-6 rounded-xl border border-gray-200/80 mb-6">
                              <h4 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-3">
                                <span className="text-gray-500">📊</span>
                                Report Length & Output Format
                              </h4>
                              <p className="text-gray-600 text-base">Choose the depth of analysis and output format that best fits your needs.</p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className={`${labelStyles} text-base`}>Report Length *</label>
                                    <div className="bg-gray-50/80 p-4 rounded-xl border border-gray-200/80 mt-3 space-y-3">
                                        {[
                                            { id: 'snapshot', title: 'Snapshot Report', desc: '2-page executive summary with key recommendations', pages: '2 pages' },
                                            { id: 'brief', title: 'Brief Analysis', desc: '5-7 page analysis with core findings and recommendations', pages: '5-7 pages' },
                                            { id: 'standard', title: 'Standard Report', desc: '10-15 page comprehensive analysis with full methodology', pages: '10-15 pages' },
                                            { id: 'comprehensive', title: 'Comprehensive Analysis', desc: '20-30 page in-depth analysis with all modules and appendices', pages: '20-30 pages' }
                                        ].map((option) => (
                                            <label key={option.id} className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200 border ${params.reportLength === option.id ? 'border-blue-500 bg-blue-500/5 shadow-md' : 'border-gray-200 hover:border-blue-400 bg-white hover:bg-gray-50/50'}`}>
                                                <input type="radio" name="reportLength" value={option.id} checked={params.reportLength === option.id} onChange={(e) => handleChange('reportLength', e.target.value)} className="h-5 w-5 text-blue-600 focus:ring-blue-500 focus:ring-offset-2" />
                                                <div className="flex-grow text-left">
                                                    <div className="font-semibold text-gray-800">{option.title} <span className="text-sm text-gray-500">({option.pages})</span></div>
                                                    <div className="text-sm text-gray-600">{option.desc}</div>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className={`${labelStyles} text-base`}>Output Format *</label>
                                    <div className="bg-gray-50/80 p-4 rounded-xl border border-gray-200/80 mt-3 space-y-3">
                                        {[
                                            { id: 'report', title: 'Report Only', desc: 'Comprehensive intelligence report' },
                                            { id: 'letter', title: 'Business Letter Only', desc: 'Professional outreach letter' },
                                            { id: 'both', title: 'Report + Letter', desc: 'Both report and business letter' }
                                        ].map((option) => (
                                            <label key={option.id} className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200 border ${params.outputFormat === option.id ? 'border-blue-500 bg-blue-500/5 shadow-md' : 'border-gray-200 hover:border-blue-400 bg-white hover:bg-gray-50/50'}`}>
                                                <input type="radio" name="outputFormat" value={option.id} checked={params.outputFormat === option.id} onChange={(e) => handleChange('outputFormat', e.target.value)} className="h-5 w-5 text-blue-600 focus:ring-blue-500 focus:ring-offset-2" />
                                                <div className="flex-grow text-left">
                                                    <div className="font-semibold text-gray-800">{option.title}</div>
                                                    <div className="text-sm text-gray-600">{option.desc}</div>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Letter Generation Section */}
                            {(params.outputFormat === 'letter' || params.outputFormat === 'both') && (
                                <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
                                    <h4 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
                                        <span className="text-blue-600">✉️</span>
                                        Partnership Letter Configuration
                                    </h4>
                                    <div className="space-y-4">
                                        <div>
                                            <label className={`${labelStyles} text-base`}>Letter Tone</label>
                                            <select value={params.letterTone || 'professional'} onChange={(e) => handleChange('letterTone', e.target.value)} className={`${inputStyles} text-base`}>
                                                <option value="professional">Professional & Formal</option>
                                                <option value="collaborative">Collaborative & Friendly</option>
                                                <option value="strategic">Strategic & Visionary</option>
                                                <option value="personal">Personal & Relationship-Focused</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className={`${labelStyles} text-base`}>Key Points to Include</label>
                                            <textarea
                                                value={params.letterKeyPoints || ''}
                                                onChange={(e) => handleChange('letterKeyPoints', e.target.value)}
                                                placeholder="Specific points, achievements, or value propositions to highlight in the letter..."
                                                className={`${inputStyles} resize-none`}
                                                rows={3}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Card>
                );
            case 2: // Strategic Context & Opportunities
                return (
                    <Card className="animate-fadeIn">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center shadow-md border border-gray-200">
                            <span className="text-2xl">🎯</span>
                          </div>
                          <div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900">Strategic Context & Opportunities</h3>
                            <p className="text-gray-600 text-base">Define your market opportunity, geographic focus, and explore live intelligence opportunities.</p>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className={`${labelStyles} text-base`}>Target Global Region *</label>
                                <select value={targetRegion} onChange={e => { setTargetRegion(e.target.value); setTargetCountry(''); setTargetCity(''); }} className={`${inputStyles} text-base`} aria-label="Target Region">
                                    <option value="">Select Global Region</option>
                                    {REGIONS_AND_COUNTRIES.map(region => <option key={region.name} value={region.name}>{region.name}</option>)}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className={`${labelStyles} text-base`}>Target Country *</label>
                                  <select value={targetCountry} onChange={e => setTargetCountry(e.target.value)} disabled={!targetRegion} className={`${inputStyles} disabled:bg-gray-100 disabled:text-gray-400 text-base`} aria-label="Target Country">
                                    <option value="">Select Country</option>
                                    {REGIONS_AND_COUNTRIES.find(r => r.name === targetRegion)?.countries.map(country => <option key={country} value={country}>{country}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6 mt-6">
                           <div className="space-y-2 text-left">
                                 <label className={`${labelStyles} text-base`}>Target City / Area</label>
                                 <input type="text" value={targetCity} onChange={e => setTargetCity(e.target.value)} className={`${inputStyles} text-base`} placeholder="e.g., Davao City, Metro Manila" />
                             </div>
                             <div className="space-y-2 text-left">
                                 <label className={`${labelStyles} text-base`}>Analysis Timeframe</label>
                                 <select value={params.analysisTimeframe} onChange={e => handleChange('analysisTimeframe', e.target.value)} className={`${inputStyles} text-base`} aria-label="Analysis Timeframe">
                                     <option>Any Time</option><option>Last 6 Months</option><option>Last 12 Months</option><option>Last 2 Years</option>
                                 </select>
                             </div>
                         </div>

                        <div className="mt-8">
                            <label className={`${labelStyles} text-base`}>Core Industry Focus *</label>
                            <div className="bg-gray-50/80 p-6 rounded-xl border border-gray-200/80 mt-3">
                              <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                                  {INDUSTRIES.map((industry) => (
                                      <button key={industry.id} onClick={() => handleMultiSelectToggle('industry', industry.id)} className={`p-4 rounded-xl border transition-all duration-300 flex flex-col items-center justify-center text-center h-full group bg-white hover:bg-gray-50 shadow-sm hover:shadow-md ${params.industry.includes(industry.id) ? 'border-blue-500 bg-blue-500/5 scale-105 shadow-lg ring-2 ring-blue-500/20' : 'border-gray-200 hover:border-blue-400'}`}>
                                          <industry.icon className={`w-10 h-10 mb-3 transition-colors duration-200 ${params.industry.includes(industry.id) ? 'text-gray-800' : 'text-gray-500 group-hover:text-gray-700'}`} />
                                          <span className="font-semibold text-gray-800 text-xs leading-tight">{industry.title}</span>
                                      </button>
                                  ))}
                                  <button onClick={() => handleMultiSelectToggle('industry', 'Custom')} className={`p-5 rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center text-center h-full group bg-white hover:bg-gray-50 shadow-sm hover:shadow-md ${params.industry.includes('Custom') ? 'border-gray-800 scale-105 shadow-lg ring-2 ring-gray-800/20' : 'border-gray-200 hover:border-gray-400'}`} title="Define a custom industry">
                                      <CustomIndustryIcon className={`w-10 h-10 mb-3 transition-colors duration-200 ${params.industry.includes('Custom') ? 'text-gray-800' : 'text-gray-500 group-hover:text-gray-700'}`} />
                                      <span className="font-semibold text-gray-800 text-xs leading-tight">Custom</span>
                                  </button>
                                  <button onClick={() => handleMultiSelectToggle('industry', 'Custom')} className={`p-4 rounded-xl border transition-all duration-300 flex flex-col items-center justify-center text-center h-full group bg-white hover:bg-gray-50 shadow-sm hover:shadow-md ${params.industry.includes('Custom') ? 'border-blue-500 bg-blue-500/5 scale-105 shadow-lg ring-2 ring-blue-500/20' : 'border-gray-200 hover:border-blue-400'}`} title="Define a custom industry">
                                      <CustomIndustryIcon className={`w-10 h-10 mb-3 transition-colors duration-200 ${params.industry.includes('Custom') ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'}`} />
                                      <span className="font-semibold text-gray-800 text-xs leading-tight">Custom</span>
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
                    </Card>
                );
            case 3: // Partnership Objectives & Matching
                return (
                    <Card className="animate-fadeIn">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center shadow-md border border-gray-200">
                            <span className="text-2xl">🤝</span>
                          </div>
                          <div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900">Partnership Objectives & Matching</h3>
                            <p className="text-gray-600 text-base">Define your ideal partner profile and strategic objectives for AI-powered matching.</p>
                          </div>
                        </div>

                        <div className="mt-8">
                            <label className={`${labelStyles} text-base`}>Describe Your Ideal Partner *</label>
                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mt-3">
                              <textarea value={params.idealPartnerProfile} onChange={e => handleChange('idealPartnerProfile', e.target.value)} rows={5} className={`${inputStyles} text-base resize-none`} placeholder="e.g., A mid-sized electronics manufacturer with experience in high-volume production, ISO 9001 certification, and existing logistics networks in Southeast Asia." />
                              <p className="text-sm text-gray-600 mt-3 flex items-center gap-2">
                                <span className="text-gray-800">💡</span>
                                Specificity enables precise matching algorithms.
                              </p>
                            </div>
                        </div>

                        <div className="mt-8">
                            <label className={`${labelStyles} text-base`}>Define Core Strategic Objective (The 'Why') *</label>
                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mt-3">
                              <textarea value={params.problemStatement} onChange={e => handleChange('problemStatement', e.target.value)} rows={6} className={`${inputStyles} text-base resize-none`} placeholder="e.g., To diversify our supply chain away from a single country, reduce production costs by 15%, and establish a resilient manufacturing base for the ASEAN market." />
                              <p className="text-sm text-gray-600 mt-3 flex items-center gap-2">
                                <span className="text-gray-800">🎯</span>
                                Clear objectives enable targeted, actionable intelligence.
                              </p>
                            </div>
                        </div>
                    </Card>
                );
            case 4: // Analysis Framework & AI Setup
                return (
                    <Card className="animate-fadeIn">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center shadow-md border border-gray-200">
                            <span className="text-2xl">⚙️</span>
                          </div>
                          <div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900">Analysis Framework & AI Setup</h3>
                            <p className="text-gray-600 text-base">Configure your strategic analysis frameworks and select AI intelligence personas.</p>
                          </div>
                        </div>

                        <div>
                            <div className="bg-gray-50 p-4 md:p-6 rounded-xl border border-gray-200 mb-4">
                              <h4 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-3">
                                <span className="text-gray-500">📊</span>
                                Analysis Tiers (Methodology)
                              </h4>
                              <p className="text-gray-600 text-base">Select one or more strategic frameworks for your report. The AI will synthesize the outputs into a single, cohesive intelligence blueprint. Unsure which to choose? Ask the Nexus Inquire AI in the left panel for guidance.</p>
                            </div>
                            <div className="grid md:grid-cols-2 gap-8">
                            {currentTiers.length > 0 ? currentTiers.map((tier) => (
                                      <label key={tier.id} className={`p-6 rounded-2xl text-left border transition-all duration-300 w-full flex flex-col h-full cursor-pointer bg-white hover:bg-gray-50 shadow-md hover:shadow-lg ${params.tier.includes(tier.id) ? 'border-blue-500 bg-blue-500/5 scale-105 shadow-xl ring-2 ring-blue-500/20' : 'border-gray-200 hover:border-blue-400'}`}>
                                          <div className="flex justify-between items-start mb-4">
                                          <span className="font-bold text-gray-900 text-2xl">{tier.title}</span>
                                              <input
                                                  type="checkbox"
                                                  checked={params.tier.includes(tier.id)}
                                                  onChange={() => handleMultiSelectToggle('tier', tier.id)}
                                                  className="h-6 w-6 rounded border-gray-300 text-gray-800 focus:ring-gray-800 focus:ring-2"
                                              />
                                          </div>
                                          <p className="text-base text-gray-600 mb-6 flex-grow">{tier.desc}</p>
                                          <div className="border-t border-gray-200 pt-4">
                                              <p className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">Capabilities</p>
                                              <ul className="text-sm text-gray-600 space-y-2">
                                                  {tier.features.map(f => <li key={f} className="flex items-center gap-3"><span className="w-2 h-2 bg-gray-800 rounded-full"></span> {f}</li>)}
                                              </ul>
                                          </div>
                                      </label>
                              )) : (
                                <div className="col-span-2 p-8 text-center bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl">
                                  <p className="text-gray-500">No tiers available for the selected organization type.</p>
                                  <p className="text-sm text-gray-400 mt-2">Please select a different organization type or contact support.</p>
                                </div>
                            )}
                            </div>
                         </div>

                         <div className="pt-8 border-t border-gray-200/80">
                             <div className="bg-gray-50 p-4 md:p-6 rounded-xl border border-gray-200 mb-4">
                               <label className={`${labelStyles} text-base`}>Configure Your AI Analyst Team *</label>
                               <p className="text-gray-600 text-base mt-2">Select one or more AI personas. The AI will synthesize their expertise to provide a multi-faceted analysis. This is a key driver of report quality.</p>
                             </div>
                             <div className="grid grid-cols-4 md:grid-cols-5 gap-4">
                                 {AI_PERSONAS.map((persona) => (
                                     <button key={persona.id} onClick={() => handleMultiSelectToggle('aiPersona', persona.id)} className={`p-4 rounded-xl border transition-all duration-300 flex flex-col items-center justify-center text-center h-full group bg-white hover:bg-gray-50 shadow-sm hover:shadow-md ${params.aiPersona.includes(persona.id) ? 'border-blue-500 bg-blue-500/5 scale-105 shadow-lg ring-2 ring-blue-500/20' : 'border-gray-200 hover:border-blue-400'}`} title={persona.description}>
                                         <persona.icon className={`w-10 h-10 mb-3 transition-colors duration-200 ${params.aiPersona.includes(persona.id) ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'}`} />
                                         <span className="font-semibold text-gray-800 text-xs leading-tight">{persona.title}</span>
                                     </button>
                                 ))}
                                 <button onClick={() => handleMultiSelectToggle('aiPersona', 'Custom')} className={`p-4 rounded-xl border transition-all duration-300 flex flex-col items-center justify-center text-center h-full group bg-white hover:bg-gray-50 shadow-sm hover:shadow-md ${params.aiPersona.includes('Custom') ? 'border-blue-500 bg-blue-500/5 scale-105 shadow-lg ring-2 ring-blue-500/20' : 'border-gray-200 hover:border-blue-400'}`} title="Define a custom persona">
                                     <CustomPersonaIcon className={`w-10 h-10 mb-3 transition-colors duration-200 ${params.aiPersona.includes('Custom') ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'}`} />
                                     <span className="font-semibold text-gray-800 text-xs leading-tight">Custom</span>
                                 </button>
                             </div>

                             {params.aiPersona.includes('Custom') && (
                                 <div className="mt-4">
                                     <label className={labelStyles}>Custom Persona Definition *</label>
                                     <textarea value={params.customAiPersona} onChange={e => handleChange('customAiPersona', e.target.value)} rows={3} className={inputStyles} placeholder="Describe the persona's expertise, focus, and tone..." />
                                 </div>
                             )}
                         </div>

                         <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-gray-200/80">
                             <div>
                                 <label className={`${labelStyles} text-base`}>Analytical Frameworks</label>
                                 <div className="bg-gray-50/80 p-4 rounded-xl border border-gray-200/80 mt-3 space-y-3">
                                     {ANALYTICAL_LENSES.map(lens => (
                                         <label key={lens} className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200 border ${params.analyticalLens?.includes(lens) ? 'border-blue-500 bg-blue-500/5 shadow-md' : 'border-gray-200 hover:border-blue-400 bg-white hover:bg-gray-50/50'}`}>
                                             <input type="checkbox" checked={params.analyticalLens?.includes(lens)} onChange={() => handleMultiSelectToggle('analyticalLens', lens)} className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-2" />
                                             <span className="text-base font-medium text-gray-800">{lens}</span>
                                         </label>
                                     ))}
                                 </div>
                             </div>
                             <div>
                                 <label className={`${labelStyles} text-base`}>Communication Styles</label>
                                 <div className="bg-gray-50/80 p-4 rounded-xl border border-gray-200/80 mt-3 space-y-3">
                                     {TONES_AND_STYLES.map(style => (
                                         <label key={style} className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200 border ${params.toneAndStyle?.includes(style) ? 'border-blue-500 bg-blue-500/5 shadow-md' : 'border-gray-200 hover:border-blue-400 bg-white hover:bg-gray-50/50'}`}>
                                             <input type="checkbox" checked={params.toneAndStyle?.includes(style)} onChange={() => handleMultiSelectToggle('toneAndStyle', style)} className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-2"/>
                                             <span className="text-base font-medium text-gray-800">{style}</span>
                                         </label>
                                     ))}
                                 </div>
                             </div>
                         </div>
                    </Card>
                );
            case 5: // Final Review & Blueprint Generation
                return (
                    <Card className="animate-fadeIn">
                        <div className="flex items-center gap-4 mb-8">
                          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center shadow-md border border-gray-200">
                            <span className="text-2xl">🚀</span>
                          </div>
                          <div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900">Final Review & Blueprint Generation</h3>
                            <p className="text-gray-600 text-base">Review your configuration, check quality assessment, and generate your comprehensive intelligence blueprint.</p>
                          </div>
                        </div>

                        <QualityAnalysis params={params} />

                        <div className="space-y-6 p-6 bg-gray-50/80 border border-gray-200/80 rounded-xl shadow-inner">
                            {(() => {
                        const isInvalid = (field: keyof ReportParameters, condition?: boolean) => {
                            const value = params[field];
                            if (condition === false) return false;
                            if (Array.isArray(value)) return value.length === 0;
                            if (typeof value === 'string') return !value.trim();
                            return false;
                        };

                        const summaryItemClasses = (invalid: boolean) =>
                            `p-4 rounded-lg transition-colors ${invalid ? 'bg-red-100 border border-red-200' : 'bg-white/80 border border-gray-200'}`;

                        const SummaryItem: React.FC<{label: string, value: React.ReactNode, invalid?: boolean}> = ({label, value, invalid = false}) => (
                            <div className={summaryItemClasses(invalid)}>
                                <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider">{label}</div>
                                <div className="text-gray-900 pl-2 mt-1">{value || <span className="text-red-600 italic">Not Provided</span>}</div>
                            </div>
                        );
                        return (<>
                            <div className="grid md:grid-cols-2 gap-6">
                                <SummaryItem label="Report Name" value={params.reportName} invalid={isInvalid('reportName')} />
                                <SummaryItem label="Operator" value={`${params.userName || 'N/A'} (${params.organizationType})`} invalid={isInvalid('userName')} />
                                <SummaryItem label="Analysis Tiers" value={<ul className="list-disc list-inside space-y-1">{params.tier.map(t => <li key={t} className="text-sm">{currentTiers.find(tier => tier.id === t)?.title || t}</li>)}</ul>} invalid={isInvalid('tier')} />
                                <SummaryItem label="Geographic Focus" value={`${params.region || 'N/A'}`} invalid={isInvalid('region')} />
                                <SummaryItem label="Industry Sectors" value={params.industry.filter(i=>i !== 'Custom').join(', ') || 'N/A'} invalid={isInvalid('industry')} />
                                <SummaryItem label="Custom Sector" value={params.customIndustry || 'Not specified'} invalid={isInvalid('customIndustry', params.industry.includes('Custom'))} />
                            </div>
                            <div className="border-t border-gray-200/80 pt-6 space-y-6">
                                <SummaryItem label="Strategic Objective" value={<div className="italic text-gray-800 bg-gray-100 p-3 rounded-lg border border-gray-200">"{params.problemStatement}"</div>} invalid={isInvalid('problemStatement')} />
                                <SummaryItem label="AI Personas" value={<ul className="list-disc list-inside space-y-1">{params.aiPersona.filter(p=>p !== 'Custom').map(p => <li key={p} className="text-sm">{p}</li>)}</ul>} invalid={isInvalid('aiPersona')} />
                                <SummaryItem label="Custom Profile" value={params.customAiPersona || 'Not configured'} invalid={isInvalid('customAiPersona', params.aiPersona.includes('Custom'))} />
                            </div>
                        </>);
                    })()}
                        </div>
                    </Card>
                );
            default: return null;
        }
    };

    // Reset terms acceptance on page refresh
    useEffect(() => {
        localStorage.removeItem('bwga-nexus-terms-accepted');
    }, []);

    return (
        <div className="min-h-screen font-sans text-gray-900 bg-gray-100 flex">
            {/* Left Sidebar */}
            <aside className="w-1/4 bg-white border-r border-gray-200 p-8 flex flex-col shadow-lg z-10">
                <div className="flex items-center gap-3 mb-12">
                    <NexusLogo className="w-10 h-10 text-blue-600" />
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Nexus AI</h1>
                        <p className="text-sm text-gray-500">Report Studio</p>
                    </div>
                </div>
                <Stepper steps={WIZARD_STEPS} currentStep={step} onStepClick={handleStepClick} />
                <div className="mt-auto">
                    <Inquire
                        params={params}
                        onApplySuggestions={onApplySuggestions}
                        savedReports={savedReports}
                        onSaveReport={onSaveReport}
                        onLoadReport={onLoadReport}
                        onDeleteReport={onDeleteReport}
                        onScopeComplete={handleScopeComplete}
                        onReportUpdate={onReportUpdate}
                        onProfileUpdate={onProfileUpdate}
                        isGenerating={isGenerating}
                        integratedMode={true}
                    />
                </div>
            </aside>

            {/* Main Content */}
            <div ref={scrollPanelRef} className="w-3/4 overflow-y-auto bg-gray-50">
                <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <main className="pb-12">
                        {renderStepContent()}
                    </main>

                    <footer className="pt-10 mt-10 border-t border-gray-200/80">
                        {error && <p className="text-red-600 text-center mb-4 text-sm bg-red-100 p-3 rounded-md border border-red-200">{error}</p>}
                        <div className="flex justify-between items-center">
                            {step > 0 ? (
                                <button onClick={prevStep} disabled={isGenerating || isAnalyzing} className="px-8 py-3 bg-white border border-gray-300 text-gray-800 font-bold rounded-lg hover:bg-gray-100 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">Back</button>
                            ) : <div></div>}

                            {step === 0 && !initialAnalysis ? (
                                <button
                                    onClick={() => handleInitialAnalysis(params.problemStatement)}
                                    disabled={isAnalyzing || !params.problemStatement.trim()}
                                    className="px-8 py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-all shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isAnalyzing ? <><SpinnerSmall /> Analyzing...</> : <>🤖 Start Nexus Analysis</>}
                                </button>
                            ) : step > 0 && step < WIZARD_STEPS.length - 1 ? (
                                <button onClick={nextStep} disabled={isGenerating} className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed">Next Step →</button>
                            ) : (
                                <button onClick={handleGenerateReport} disabled={isGenerating} className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-lg hover:shadow-xl transition-all shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                                    {isGenerating ? <><Spinner /> Generating...</> : <>🚀 Launch Nexus Report</>}
                                </button>
                            )}
                        </div>
                    </footer>
                </main>
            </div>

            {showScroll && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-all duration-300 z-50"
                    aria-label="Back to top"
                >
                    <ArrowUpIcon className="w-6 h-6" />
                </button>
            )}
        </div>
    );
};

export default ReportGenerator;