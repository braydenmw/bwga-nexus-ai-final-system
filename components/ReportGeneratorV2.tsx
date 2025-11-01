import React, { useState, useEffect, useCallback, useRef, useMemo, useLayoutEffect } from 'react';
import type { ReportParameters, UserProfile as UserProfileType, ReportSuggestions } from '../types.ts';
import { REGIONS_AND_COUNTRIES, INDUSTRIES, AI_PERSONAS, ORGANIZATION_TYPES, ANALYTICAL_LENSES, TONES_AND_STYLES, TIERS_BY_ORG_TYPE } from '../constants.tsx';
import Spinner, { SpinnerSmall } from './Spinner.tsx';
import { Inquire } from './Inquire.tsx';
import { CustomPersonaIcon, CustomIndustryIcon, ArrowUpIcon, NexusLogo, CheckCircleIcon } from './Icons.tsx';
import QualityAnalysis from './QualityAnalysis.tsx';
import { ProfileStep } from './ProfileStep.tsx';
import { generateReportStream, fetchResearchAndScope } from '../services/nexusService.ts';
import Card from './common/Card.tsx';

interface ReportGeneratorV2Props {
    params: ReportParameters;
    onViewChange: (view: any, params: ReportParameters) => void;
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
    { id: 0, title: 'Welcome & Terms', description: 'Accept terms and understand the flow.' },
    { id: 1, title: 'Initial Analysis', description: 'AI-powered guidance to start.' },
    { id: 2, title: 'User Profile', description: 'Define your role and organization.' },
    { id: 3, title: 'Output Options', description: 'Select length and output type.' },
    { id: 4, title: 'Region & Timeframe', description: 'Set the geographic focus and period.' },
    { id: 5, title: 'Industry Focus', description: 'Select sectors and custom niches.' },
    { id: 6, title: 'Partnership Objectives', description: 'Describe your ideal partner and why.' },
    { id: 7, title: 'Analysis Setup', description: 'Frameworks, AI personas, and tiers.' },
    { id: 8, title: 'Final Review & Generate', description: 'Validate and launch the report.' }
];

const ReportGeneratorV2: React.FC<ReportGeneratorV2Props> = ({
    params,
    onViewChange,
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
    const [initialAnalysis, setInitialAnalysis] = useState<any>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [showScroll, setShowScroll] = useState(false);
    const scrollPanelRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        setMounted(true);
        try {
            const accepted = localStorage.getItem('bwga-nexus-terms-accepted') === 'true';
            setTermsAccepted(accepted);
        } catch {}
    }, []);

    const handleStepClick = useCallback((stepNumber: number | null) => {
        if (stepNumber === null) return;
        if (stepNumber > 1 && !initialAnalysis) {
            setError("Complete Initial Analysis before proceeding.");
            return;
        }
        setError(null);
        setStep(stepNumber);
    }, [initialAnalysis]);

    const handleChange = useCallback((field: keyof ReportParameters, value: any) => {
        onViewChange('report', { ...params, [field]: value });
    }, [params, onViewChange]);

    useEffect(() => {
        const panel = scrollPanelRef.current;
        if (!panel) return;
        const handleScroll = () => {
            setShowScroll(panel.scrollTop > 300);
        };
        panel.addEventListener('scroll', handleScroll);
        return () => panel.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = useCallback(() => scrollPanelRef.current?.scrollTo({ top: 0, behavior: 'smooth' }), []);

    const { targetRegion, targetCountry, targetCity } = useMemo(() => {
        const regionValue = params.region;
        if (!regionValue) {
            return { targetRegion: '', targetCountry: '', targetCity: '' };
        }
        const parts = regionValue.split(',').map(p => p.trim());
        const potentialCountry = parts[parts.length - 1];
        const foundRegionData = REGIONS_AND_COUNTRIES.find(r => r.countries.includes(potentialCountry));
        if (foundRegionData) {
            return {
                targetRegion: foundRegionData.name,
                targetCountry: potentialCountry,
                targetCity: parts.slice(0, -1).join(', ')
            };
        }
        return { targetRegion: '', targetCountry: '', targetCity: '' };
    }, [params.region]);

    const handleRegionChange = useCallback((region: string, country: string, city: string) => {
        const combinedRegion = [city, country].filter(Boolean).join(', ');
        if (combinedRegion !== params.region) {
            handleChange('region', combinedRegion);
        }
    }, [params.region, handleChange]);

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
            case 2:
                if (!params.userName.trim()) errors.push("Your Name is required.");
                if (!params.reportName.trim()) errors.push("Report Name is required.");
                break;
            case 4:
                if (!params.region.trim()) errors.push("A target location is required.");
                break;
            case 5:
                if (params.industry.length === 0) errors.push("At least one Core Industry must be selected.");
                if (params.industry.includes('Custom') && !params.customIndustry?.trim()) errors.push("Custom Industry Definition is required.");
                break;
            case 6:
                if (!params.idealPartnerProfile.trim()) errors.push("Ideal Partner Profile is required.");
                if (!params.problemStatement.trim()) errors.push("Core Objective is required.");
                break;
            case 7:
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
            if (step < WIZARD_STEPS.length - 1) setStep(s => s + 1);
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
        setInitialAnalysis(null);
        try {
            if (!userInput.trim()) {
                throw new Error("Please provide your objective to start the analysis.");
            }
            const analysis = await fetchResearchAndScope(userInput, null, params);
            setInitialAnalysis(analysis);
            onApplySuggestions({
                ...analysis.suggestions,
                industry: analysis.suggestions.industry ? [analysis.suggestions.industry] : [],
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Analysis failed');
        } finally {
            setIsAnalyzing(false);
        }
    }, [params, onApplySuggestions]);

    const handleGenerateReport = useCallback(async () => {
        setError(null);
        const allErrors = [...getValidationErrors(2), ...getValidationErrors(4), ...getValidationErrors(5), ...getValidationErrors(6), ...getValidationErrors(7)];
        if (allErrors.length > 0) {
            setError("Please complete all required fields: " + allErrors.join(', '));
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
                    requestAnimationFrame(() => {
                        onReportUpdate(params, content, null, true);
                    });
                }
            }

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

    // Step completion tracking
    const isStepComplete = (stepNum: number): boolean => {
        switch(stepNum) {
            case 0: return termsAccepted;
            case 1: return !!initialAnalysis;
            case 2: return !!params.userName && !!params.reportName;
            case 3: return !!params.reportLength && !!params.outputFormat;
            case 4: return !!params.region;
            case 5: return params.industry.length > 0;
            case 6: return !!params.idealPartnerProfile && !!params.problemStatement;
            case 7: return params.tier.length > 0 && params.aiPersona.length > 0;
            case 8: return true;
            default: return false;
        }
    };

    const renderStepContent = () => {
        switch (step) {
            case 0:
                return (
                    <Card>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center shadow-md border border-blue-200">
                                <NexusLogo className="w-8 h-8 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">Welcome to Nexus AI Report Studio</h3>
                                <p className="text-gray-600">Your intelligent partner for strategic business intelligence</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
                                <h4 className="text-lg font-bold text-gray-900 mb-3">How This Works</h4>
                                <ul className="space-y-3 text-gray-700">
                                    <li className="flex items-start gap-3">
                                        <span className="text-2xl">🤖</span>
                                        <div>
                                            <strong>Nexus Inquire AI</strong> guides you through each step with intelligent suggestions and real-time analysis
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-2xl">📋</span>
                                        <div>
                                            <strong>9-Step Wizard</strong> breaks down report creation into clear, manageable sections
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-2xl">🧠</span>
                                        <div>
                                            <strong>Nexus Brain</strong> runs advanced pre-report analysis (RROI, TPT, SEAM) before generation
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-2xl">📊</span>
                                        <div>
                                            <strong>Comprehensive Reports</strong> synthesize all your inputs into actionable intelligence
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {!termsAccepted ? (
                                <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
                                    <p className="text-gray-800 mb-4 font-semibold">Please accept the Terms & Conditions to proceed:</p>
                                    <div className="flex gap-3">
                                        <button onClick={() => setTermsAccepted(true)} className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all">Accept Terms</button>
                                        <button onClick={() => { try { window.location.href = '/'; } catch {} }} className="px-6 py-3 bg-white border border-gray-300 rounded-lg font-semibold text-gray-800 hover:bg-gray-50 transition-all">Decline</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-6 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
                                    <CheckCircleIcon className="w-6 h-6 text-green-600 flex-shrink-0" />
                                    <p className="text-gray-800 font-semibold">Terms accepted. Ready to begin!</p>
                                </div>
                            )}
                        </div>
                    </Card>
                );

            case 1:
                return (
                    <Card>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center shadow-md border border-blue-200">
                                <NexusLogo className="w-8 h-8 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">Nexus AI Initial Analysis</h3>
                                <p className="text-gray-600">State your core objective for AI-powered research and guidance</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label htmlFor="initial-objective" className={labelStyles}>Your Core Objective *</label>
                                <textarea
                                    id="initial-objective"
                                    value={params.problemStatement}
                                    onChange={(e) => handleChange('problemStatement', e.target.value)}
                                    rows={5}
                                    className={inputStyles}
                                    placeholder="Example: I need to find manufacturing partners in Southeast Asia for electronics, focusing on cost-effectiveness and supply chain resilience."
                                />
                                <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                                    <span>💡</span>
                                    The more specific your objective, the better the AI analysis will be.
                                </p>
                            </div>

                            {initialAnalysis && (
                                <div className="p-6 bg-green-50 border border-green-200 rounded-xl animate-fadeIn">
                                    <h4 className="text-lg font-bold text-green-800 mb-4 flex items-center gap-2">
                                        <span>✅</span>
                                        AI Analysis Complete
                                    </h4>
                                    <div className="prose prose-sm max-w-none text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: initialAnalysis.summary }} />
                                    <p className="text-sm text-gray-600">
                                        The AI has pre-filled several fields in the following steps. You can review and adjust them as needed.
                                    </p>
                                </div>
                            )}
                        </div>
                    </Card>
                );

            case 2:
                return (
                    <Card>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center shadow-md border border-purple-200">
                                <span className="text-3xl">👤</span>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">User Profile & Organization</h3>
                                <p className="text-gray-600">Tell us about yourself and your organization</p>
                            </div>
                        </div>

                        <ProfileStep params={params} handleChange={handleChange} inputStyles={inputStyles} labelStyles={labelStyles} />
                    </Card>
                );

            case 3:
                return (
                    <Card>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center shadow-md border border-indigo-200">
                                <span className="text-3xl">📊</span>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">Output Options</h3>
                                <p className="text-gray-600">Choose report length and output format</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <label className={`${labelStyles} text-lg`}>Report Length *</label>
                                <div className="space-y-3">
                                    {[
                                        { id: 'snapshot', title: 'Snapshot', desc: '2-page executive summary', pages: '2 pages' },
                                        { id: 'brief', title: 'Brief', desc: '5-7 page analysis', pages: '5-7 pages' },
                                        { id: 'standard', title: 'Standard', desc: '10-15 page comprehensive', pages: '10-15 pages' },
                                        { id: 'comprehensive', title: 'Comprehensive', desc: '20-30 page in-depth', pages: '20-30 pages' }
                                    ].map((option) => (
                                        <label key={option.id} className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all border ${params.reportLength === option.id ? 'border-blue-500 bg-blue-500/5 shadow-md' : 'border-gray-200 hover:border-blue-400 bg-white'}`}>
                                            <input type="radio" name="reportLength" value={option.id} checked={params.reportLength === option.id} onChange={(e) => handleChange('reportLength', e.target.value)} className="h-5 w-5" />
                                            <div>
                                                <div className="font-semibold text-gray-800">{option.title} <span className="text-sm text-gray-500">({option.pages})</span></div>
                                                <div className="text-sm text-gray-600">{option.desc}</div>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className={`${labelStyles} text-lg`}>Output Format *</label>
                                <div className="space-y-3">
                                    {[
                                        { id: 'report', title: 'Report Only', desc: 'Intelligence report' },
                                        { id: 'letter', title: 'Letter Only', desc: 'Business letter' },
                                        { id: 'both', title: 'Report + Letter', desc: 'Both documents' }
                                    ].map((option) => (
                                        <label key={option.id} className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all border ${params.outputFormat === option.id ? 'border-blue-500 bg-blue-500/5 shadow-md' : 'border-gray-200 hover:border-blue-400 bg-white'}`}>
                                            <input type="radio" name="outputFormat" value={option.id} checked={params.outputFormat === option.id} onChange={(e) => handleChange('outputFormat', e.target.value)} className="h-5 w-5" />
                                            <div>
                                                <div className="font-semibold text-gray-800">{option.title}</div>
                                                <div className="text-sm text-gray-600">{option.desc}</div>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {(params.outputFormat === 'letter' || params.outputFormat === 'both') && (
                            <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
                                <h4 className="text-lg font-semibold text-blue-800 mb-4">✉️ Partnership Letter Configuration</h4>
                                <div className="space-y-4">
                                    <div>
                                        <label className={labelStyles}>Letter Tone</label>
                                        <select value={params.letterTone || 'professional'} onChange={(e) => handleChange('letterTone', e.target.value)} className={inputStyles}>
                                            <option value="professional">Professional & Formal</option>
                                            <option value="collaborative">Collaborative & Friendly</option>
                                            <option value="strategic">Strategic & Visionary</option>
                                            <option value="personal">Personal & Relationship-Focused</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className={labelStyles}>Key Points to Include</label>
                                        <textarea
                                            value={params.letterKeyPoints || ''}
                                            onChange={(e) => handleChange('letterKeyPoints', e.target.value)}
                                            placeholder="Specific points to highlight..."
                                            className={`${inputStyles} resize-none`}
                                            rows={3}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </Card>
                );

            case 4:
                return (
                    <Card>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center shadow-md border border-green-200">
                                <span className="text-3xl">🌍</span>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">Region & Timeframe</h3>
                                <p className="text-gray-600">Define your geographic focus and analysis period</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div>
                                <label className={labelStyles}>Target Global Region *</label>
                                <select value={targetRegion} onChange={e => handleRegionChange(e.target.value, '', '')} className={inputStyles}>
                                    <option value="">Select Global Region</option>
                                    {REGIONS_AND_COUNTRIES.map(region => <option key={region.name} value={region.name}>{region.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className={labelStyles}>Target Country *</label>
                                <select value={targetCountry} onChange={e => handleRegionChange(targetRegion, e.target.value, targetCity)} disabled={!targetRegion} className={`${inputStyles} disabled:bg-gray-100 disabled:text-gray-400`}>
                                    <option value="">Select Country</option>
                                    {REGIONS_AND_COUNTRIES.find(r => r.name === targetRegion)?.countries.map(country => <option key={country} value={country}>{country}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className={labelStyles}>Target City / Area</label>
                                <input type="text" value={targetCity} onChange={e => handleRegionChange(targetRegion, targetCountry, e.target.value)} className={inputStyles} placeholder="e.g., Davao City, Metro Manila" />
                            </div>
                            <div>
                                <label className={labelStyles}>Analysis Timeframe</label>
                                <select value={params.analysisTimeframe} onChange={e => handleChange('analysisTimeframe', e.target.value)} className={inputStyles}>
                                    <option>Any Time</option>
                                    <option>Last 6 Months</option>
                                    <option>Last 12 Months</option>
                                    <option>Last 2 Years</option>
                                </select>
                            </div>
                        </div>
                    </Card>
                );

            case 5:
                return (
                    <Card>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center shadow-md border border-orange-200">
                                <span className="text-3xl">🏭</span>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">Industry Focus</h3>
                                <p className="text-gray-600">Select sectors relevant to your analysis</p>
                            </div>
                        </div>

                        <div>
                            <label className={`${labelStyles} text-lg`}>Core Industry Focus *</label>
                            <div className="bg-gray-50/80 p-6 rounded-xl border border-gray-200/80">
                                <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                                    {INDUSTRIES.map((industry) => (
                                        <button key={industry.id} onClick={() => handleMultiSelectToggle('industry', industry.id)} className={`p-4 rounded-xl border transition-all flex flex-col items-center justify-center text-center h-full group ${params.industry.includes(industry.id) ? 'border-blue-500 bg-blue-500/5 scale-105 shadow-lg' : 'border-gray-200 hover:border-blue-400 bg-white'}`}>
                                            <industry.icon className={`w-10 h-10 mb-2 transition-colors ${params.industry.includes(industry.id) ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'}`} />
                                            <span className="font-semibold text-gray-800 text-xs leading-tight">{industry.title}</span>
                                        </button>
                                    ))}
                                    <button onClick={() => handleMultiSelectToggle('industry', 'Custom')} className={`p-4 rounded-xl border transition-all flex flex-col items-center justify-center text-center h-full group ${params.industry.includes('Custom') ? 'border-blue-500 bg-blue-500/5 scale-105 shadow-lg' : 'border-gray-200 hover:border-blue-400 bg-white'}`}>
                                        <CustomIndustryIcon className={`w-10 h-10 mb-2 transition-colors ${params.industry.includes('Custom') ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'}`} />
                                        <span className="font-semibold text-gray-800 text-xs leading-tight">Custom</span>
                                    </button>
                                </div>
                            </div>

                            {params.industry.includes('Custom') && (
                                <div className="mt-6">
                                    <label className={labelStyles}>Custom Industry Definition *</label>
                                    <textarea value={params.customIndustry} onChange={e => handleChange('customIndustry', e.target.value)} rows={3} className={inputStyles} placeholder="Describe the custom industry or niche sector..." />
                                </div>
                            )}
                        </div>
                    </Card>
                );

            case 6:
                return (
                    <Card>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center shadow-md border border-pink-200">
                                <span className="text-3xl">🤝</span>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">Partnership Objectives</h3>
                                <p className="text-gray-600">Define your ideal partner and strategic goals</p>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <label className={`${labelStyles} text-lg`}>Describe Your Ideal Partner *</label>
                                <textarea value={params.idealPartnerProfile} onChange={e => handleChange('idealPartnerProfile', e.target.value)} rows={5} className={inputStyles} placeholder="e.g., A mid-sized electronics manufacturer with ISO 9001 certification and existing logistics networks in Southeast Asia." />
                                <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                                    <span>💡</span>
                                    Specificity enables precise AI matching algorithms.
                                </p>
                            </div>

                            <div>
                                <label className={`${labelStyles} text-lg`}>Core Strategic Objective (The 'Why') *</label>
                                <textarea value={params.problemStatement} onChange={e => handleChange('problemStatement', e.target.value)} rows={6} className={inputStyles} placeholder="e.g., To diversify our supply chain away from a single country, reduce production costs by 15%, and establish a resilient manufacturing base for the ASEAN market." />
                                <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                                    <span>🎯</span>
                                    Clear objectives enable targeted, actionable intelligence.
                                </p>
                            </div>
                        </div>
                    </Card>
                );

            case 7:
                return (
                    <Card>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 bg-cyan-100 rounded-xl flex items-center justify-center shadow-md border border-cyan-200">
                                <span className="text-3xl">⚙️</span>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">Analysis Setup</h3>
                                <p className="text-gray-600">Configure frameworks, AI personas, and analysis tiers</p>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <h4 className="text-lg font-bold text-gray-800 mb-4">📊 Analysis Tiers (Methodology) *</h4>
                                <p className="text-gray-600 mb-4">Select one or more strategic frameworks. The AI will synthesize them into a cohesive intelligence blueprint.</p>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {currentTiers.length > 0 ? currentTiers.map((tier) => (
                                        <label key={tier.id} className={`p-6 rounded-xl border transition-all cursor-pointer flex flex-col h-full ${params.tier.includes(tier.id) ? 'border-blue-500 bg-blue-500/5 shadow-lg' : 'border-gray-200 hover:border-blue-400 bg-white'}`}>
                                            <div className="flex justify-between items-start mb-4">
                                                <span className="font-bold text-gray-900 text-xl">{tier.title}</span>
                                                <input type="checkbox" checked={params.tier.includes(tier.id)} onChange={() => handleMultiSelectToggle('tier', tier.id)} className="h-5 w-5" />
                                            </div>
                                            <p className="text-gray-600 mb-4 flex-grow">{tier.desc}</p>
                                            <div className="border-t border-gray-200 pt-4">
                                                <p className="text-sm font-bold text-gray-800 mb-2">Capabilities:</p>
                                                <ul className="text-sm text-gray-600 space-y-1">
                                                    {tier.features.map(f => <li key={f} className="flex items-center gap-2"><span>✓</span> {f}</li>)}
                                                </ul>
                                            </div>
                                        </label>
                                    )) : (
                                        <div className="col-span-2 p-8 text-center bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl">
                                            <p className="text-gray-500">No tiers available for the selected organization type.</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-lg font-bold text-gray-800 mb-4">🧠 AI Analyst Team *</h4>
                                <p className="text-gray-600 mb-4">Select one or more AI personas. They will synthesize their expertise for multi-faceted analysis.</p>
                                <div className="grid grid-cols-4 md:grid-cols-5 gap-4">
                                    {AI_PERSONAS.map((persona) => (
                                        <button key={persona.id} onClick={() => handleMultiSelectToggle('aiPersona', persona.id)} className={`p-4 rounded-xl border transition-all flex flex-col items-center justify-center text-center h-full group ${params.aiPersona.includes(persona.id) ? 'border-blue-500 bg-blue-500/5 scale-105 shadow-lg' : 'border-gray-200 hover:border-blue-400 bg-white'}`} title={persona.description}>
                                            <persona.icon className={`w-10 h-10 mb-2 transition-colors ${params.aiPersona.includes(persona.id) ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'}`} />
                                            <span className="font-semibold text-gray-800 text-xs leading-tight">{persona.title}</span>
                                        </button>
                                    ))}
                                    <button onClick={() => handleMultiSelectToggle('aiPersona', 'Custom')} className={`p-4 rounded-xl border transition-all flex flex-col items-center justify-center text-center h-full group ${params.aiPersona.includes('Custom') ? 'border-blue-500 bg-blue-500/5 scale-105 shadow-lg' : 'border-gray-200 hover:border-blue-400 bg-white'}`}>
                                        <CustomPersonaIcon className={`w-10 h-10 mb-2 transition-colors ${params.aiPersona.includes('Custom') ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'}`} />
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

                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-lg font-bold text-gray-800 mb-4">📐 Analytical Frameworks</h4>
                                    <div className="space-y-2">
                                        {ANALYTICAL_LENSES.map(lens => (
                                            <label key={lens} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all border ${params.analyticalLens?.includes(lens) ? 'border-blue-500 bg-blue-500/5' : 'border-gray-200 hover:border-blue-400 bg-white'}`}>
                                                <input type="checkbox" checked={params.analyticalLens?.includes(lens)} onChange={() => handleMultiSelectToggle('analyticalLens', lens)} className="h-4 w-4" />
                                                <span className="text-gray-800">{lens}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-lg font-bold text-gray-800 mb-4">🎨 Communication Styles</h4>
                                    <div className="space-y-2">
                                        {TONES_AND_STYLES.map(style => (
                                            <label key={style} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all border ${params.toneAndStyle?.includes(style) ? 'border-blue-500 bg-blue-500/5' : 'border-gray-200 hover:border-blue-400 bg-white'}`}>
                                                <input type="checkbox" checked={params.toneAndStyle?.includes(style)} onChange={() => handleMultiSelectToggle('toneAndStyle', style)} className="h-4 w-4" />
                                                <span className="text-gray-800">{style}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                );

            case 8:
                return (
                    <Card>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center shadow-md border border-red-200">
                                <span className="text-3xl">🚀</span>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">Final Review & Generate</h3>
                                <p className="text-gray-600">Review your configuration and launch your report</p>
                            </div>
                        </div>

                        <QualityAnalysis params={params} />

                        <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-xl">
                            <h4 className="text-lg font-bold text-gray-800 mb-4">📋 Configuration Summary</h4>
                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                                <div className="p-3 bg-white rounded-lg border border-gray-200">
                                    <div className="text-gray-600 font-semibold">Report Name</div>
                                    <div className="text-gray-900">{params.reportName || 'Not set'}</div>
                                </div>
                                <div className="p-3 bg-white rounded-lg border border-gray-200">
                                    <div className="text-gray-600 font-semibold">Operator</div>
                                    <div className="text-gray-900">{params.userName || 'Not set'}</div>
                                </div>
                                <div className="p-3 bg-white rounded-lg border border-gray-200">
                                    <div className="text-gray-600 font-semibold">Region</div>
                                    <div className="text-gray-900">{params.region || 'Not set'}</div>
                                </div>
                                <div className="p-3 bg-white rounded-lg border border-gray-200">
                                    <div className="text-gray-600 font-semibold">Industries</div>
                                    <div className="text-gray-900">{params.industry.filter(i => i !== 'Custom').join(', ') || 'Not set'}</div>
                                </div>
                            </div>
                        </div>
                    </Card>
                );

            default:
                return null;
        }
    };

    if (!mounted) {
        return <div style={{ minHeight: '100vh', background: '#f3f4f6' }} />;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
            {/* Left Sidebar - Stepper & Inquire AI */}
            <aside className="w-full lg:w-96 bg-white border-b lg:border-b-0 lg:border-r border-gray-200 flex flex-col shadow-lg overflow-y-auto">
                {/* Stepper */}
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center gap-3 mb-6">
                        <NexusLogo className="w-8 h-8 text-blue-600" />
                        <div>
                            <h1 className="text-lg font-bold text-gray-900">Nexus AI</h1>
                            <p className="text-xs text-gray-500">Report Studio</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        {WIZARD_STEPS.map((wizardStep) => (
                            <button
                                key={wizardStep.id}
                                onClick={() => handleStepClick(wizardStep.id)}
                                disabled={wizardStep.id > 1 && !initialAnalysis}
                                className={`w-full text-left p-3 rounded-lg transition-all border ${
                                    step === wizardStep.id
                                        ? 'border-blue-500 bg-blue-500/10 shadow-md'
                                        : isStepComplete(wizardStep.id)
                                        ? 'border-green-300 bg-green-50 hover:bg-green-100'
                                        : 'border-gray-200 hover:bg-gray-50'
                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                        step === wizardStep.id
                                            ? 'bg-blue-600 text-white'
                                            : isStepComplete(wizardStep.id)
                                            ? 'bg-green-600 text-white'
                                            : 'bg-gray-300 text-gray-700'
                                    }`}>
                                        {isStepComplete(wizardStep.id) ? '✓' : wizardStep.id + 1}
                                    </div>
                                    <div className="flex-grow">
                                        <div className="font-semibold text-gray-900 text-sm">{wizardStep.title}</div>
                                        <div className="text-xs text-gray-500">{wizardStep.description}</div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Inquire AI */}
                <div className="flex-grow overflow-y-auto">
                    <Inquire
                        params={params}
                        onApplySuggestions={onApplySuggestions}
                        savedReports={savedReports}
                        onSaveReport={onSaveReport}
                        onLoadReport={onLoadReport}
                        onDeleteReport={onDeleteReport}
                        wizardStep={step}
                        onScopeComplete={onScopeComplete}
                        onReportUpdate={onReportUpdate}
                        onProfileUpdate={onProfileUpdate}
                        isGenerating={isGenerating}
                        integratedMode={true}
                    />
                </div>
            </aside>

            {/* Main Content */}
            <div ref={scrollPanelRef} className="flex-grow overflow-y-auto bg-gray-50">
                <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="pb-12">
                        {renderStepContent()}
                    </div>

                    {/* Footer Navigation */}
                    <footer className="pt-10 mt-10 border-t border-gray-200">
                        {error && (
                            <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg text-red-800 text-sm">
                                <strong>⚠️ Error:</strong> {error}
                            </div>
                        )}

                        <div className="flex justify-between items-center gap-4">
                            {step > 0 ? (
                                <button
                                    onClick={prevStep}
                                    disabled={isGenerating || isAnalyzing}
                                    className="px-6 py-3 bg-white border border-gray-300 text-gray-800 font-bold rounded-lg hover:bg-gray-100 transition-all disabled:opacity-50"
                                >
                                    ← Back
                                </button>
                            ) : (
                                <div></div>
                            )}

                            {step === 1 && !initialAnalysis ? (
                                <button
                                    onClick={() => handleInitialAnalysis(params.problemStatement)}
                                    disabled={isAnalyzing || !params.problemStatement.trim()}
                                    className="px-8 py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-all shadow-lg disabled:opacity-50 flex items-center gap-2"
                                >
                                    {isAnalyzing ? <><SpinnerSmall /> Analyzing...</> : <>🤖 Run Analysis</>}
                                </button>
                            ) : step > 1 && step < WIZARD_STEPS.length - 1 ? (
                                <button
                                    onClick={nextStep}
                                    disabled={isGenerating}
                                    className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-lg disabled:opacity-50"
                                >
                                    Next Step →
                                </button>
                            ) : step === WIZARD_STEPS.length - 1 ? (
                                <button
                                    onClick={handleGenerateReport}
                                    disabled={isGenerating}
                                    className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-lg hover:shadow-xl transition-all shadow-lg disabled:opacity-50 flex items-center gap-2"
                                >
                                    {isGenerating ? <><Spinner /> Generating...</> : <>🚀 Launch Report</>}
                                </button>
                            ) : null}
                        </div>
                    </footer>
                </main>
            </div>

            {/* Scroll to Top Button */}
            {showScroll && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-all z-50"
                    aria-label="Back to top"
                >
                    <ArrowUpIcon className="w-6 h-6" />
                </button>
            )}
        </div>
    );
};

export default ReportGeneratorV2;
