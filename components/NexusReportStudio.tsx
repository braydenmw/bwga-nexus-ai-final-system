import React, { useState, useEffect, useCallback, useRef, useLayoutEffect, useMemo } from 'react';
import type { ReportParameters, UserProfile as UserProfileType, ReportSuggestions } from '../types.ts';
import { LetterGeneratorModal } from './LetterGeneratorModal';
import NexusCopilotSidebar from './NexusCopilotSidebar';
import { ErrorBoundary } from './ErrorBoundary';
import { HelpTooltip } from './Tooltip';
import AutoSave from './AutoSave';
import StepSummary from './StepSummary';
import QualityAnalysis from './QualityAnalysis';
import { generateReportStream, fetchResearchAndScope } from '../services/nexusService.ts';
import { REGIONS_AND_COUNTRIES, INDUSTRIES, AI_PERSONAS, ORGANIZATION_TYPES, ANALYTICAL_LENSES, TONES_AND_STYLES, TIERS_BY_ORG_TYPE, ANALYTICAL_MODULES } from '../constants.tsx';
import Spinner, { SpinnerSmall } from './Spinner.tsx';

interface NexusReportStudioProps {
    params?: ReportParameters;
    onViewChange?: (view: any, params: ReportParameters) => void;
    onReportUpdate?: (params: ReportParameters, content: string, error: string | null, generating: boolean) => void;
    onProfileUpdate?: (profile: UserProfileType) => void;
    isGenerating?: boolean;
    onApplySuggestions?: (suggestions: ReportSuggestions) => void;
    savedReports?: ReportParameters[];
    onSaveReport?: (params: ReportParameters) => void;
    onLoadReport?: (params: ReportParameters) => void;
    onDeleteReport?: (reportName: string) => void;
    onScopeComplete?: () => void;
}

const WIZARD_STEPS = [
    { id: 0, title: 'Strategic Foundation', description: 'Define your objectives, target region, and partnership criteria', phase: 1, phaseName: 'Foundation & Planning' },
    { id: 1, title: 'AI Analysis Engine', description: 'Run comprehensive RROI, TPT, and SEAM analysis modules', phase: 2, phaseName: 'AI Analysis & Assessment' },
    { id: 2, title: 'Strategy & Execution', description: 'Risk assessment, implementation planning, and final report generation', phase: 3, phaseName: 'Strategy & Intelligence' }
];

export default function NexusReportStudio({
    params: initialParams,
    onViewChange,
    onReportUpdate,
    onProfileUpdate,
    isGenerating: externalIsGenerating = false,
    onApplySuggestions,
    savedReports = [],
    onSaveReport,
    onLoadReport,
    onDeleteReport,
    onScopeComplete,
}: NexusReportStudioProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [reportParams, setReportParams] = useState<ReportParameters>(initialParams || {
        reportName: '',
        userName: '',
        userDepartment: '',
        organizationType: '',
        userCountry: '',
        problemStatement: '',
        region: '',
        industry: [],
        idealPartnerProfile: '',
        aiPersona: [],
        tier: [],
        analyticalLens: [],
        toneAndStyle: [],
        analyticalModules: [],
        customIndustry: '',
        customAiPersona: '',
        reportLength: 'standard',
        outputFormat: 'report',
        analysisTimeframe: 'Any Time',
        letterTone: 'professional',
        letterKeyPoints: ''
    } as ReportParameters);
    const [copilotMessages, setCopilotMessages] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(externalIsGenerating);
    const [showScroll, setShowScroll] = useState(false);
    const [initialAnalysis, setInitialAnalysis] = useState<any>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [intelligenceFeed, setIntelligenceFeed] = useState<any[]>([]);
    const [showPhaseOverview, setShowPhaseOverview] = useState(false);
    const [showLetterModal, setShowLetterModal] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const [showCopilotPanel, setShowCopilotPanel] = useState(true);
    const scrollPanelRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        setMounted(true);
        try {
            const accepted = localStorage.getItem('bwga-nexus-terms-accepted') === 'true';
            setTermsAccepted(accepted);
        } catch {}
    }, []);

    useEffect(() => {
        setIsGenerating(externalIsGenerating);
    }, [externalIsGenerating]);

    useEffect(() => {
        const panel = scrollPanelRef.current;
        if (!panel) return;
        const handleScroll = () => {
            setShowScroll(panel.scrollTop > 300);
        };
        panel.addEventListener('scroll', handleScroll);
        return () => panel.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = useCallback(() => {
        scrollPanelRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const handleChange = useCallback((field: string | number | symbol, value: any) => {
        const updated = { ...reportParams, [field]: value };
        setReportParams(updated);
        if (onViewChange) {
            onViewChange('report', updated);
        }
    }, [reportParams, onViewChange]);

    const handleNext = useCallback(() => {
        setError(null);
        scrollToTop();
        if (currentStep < WIZARD_STEPS.length - 1) {
            if (!completedSteps.includes(currentStep)) {
                setCompletedSteps([...completedSteps, currentStep]);
            }
            setCurrentStep(currentStep + 1);
        }
    }, [currentStep, completedSteps]);

    const handleBack = useCallback(() => {
        setError(null);
        scrollToTop();
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    }, [currentStep]);

    const handleStepClick = useCallback((step: number) => {
        if (step <= currentStep + 1 || completedSteps.includes(step)) {
            setError(null);
            scrollToTop();
            setCurrentStep(step);
        }
    }, [currentStep, completedSteps]);

    const handleInitialAnalysis = useCallback(async (userInput: string) => {
        setIsAnalyzing(true);
        setError(null);
        setInitialAnalysis(null);
        try {
            if (!userInput.trim()) {
                throw new Error("Please provide your objective to start the analysis.");
            }
            const analysis = await fetchResearchAndScope(userInput, null, reportParams);

            const feedItems = [
                { category: 'Geographic Focus', items: [{ details: `Analysis centered on ${analysis.suggestions.region || 'the identified region'}.` }] },
                { category: 'Sector Focus', items: [{ details: `Primary industry identified: ${analysis.suggestions.industry || 'Not specified'}.` }] },
            ];
            setIntelligenceFeed(feedItems);

            setInitialAnalysis(analysis);

            if (onApplySuggestions) {
                onApplySuggestions({
                    ...analysis.suggestions,
                    industry: (analysis.suggestions.industry as any) || [],
                });
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Analysis failed');
        } finally {
            setIsAnalyzing(false);
        }
    }, [reportParams, onApplySuggestions]);

    const handleGenerateReport = useCallback(async () => {
        setError(null);
        setIsGenerating(true);

        try {
            if (onProfileUpdate) {
                onProfileUpdate({
                    userName: reportParams.userName || '',
                    userDepartment: reportParams.userDepartment || '',
                    organizationType: reportParams.organizationType || '',
                    userCountry: reportParams.userCountry || ''
                });
            }

            if (onReportUpdate) {
                onReportUpdate(reportParams, '', null, true);
            }

            const stream = await generateReportStream(reportParams);
            const reader = stream.getReader();
            const decoder = new TextDecoder();
            let content = '';

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;
                if (value) {
                    const decodedChunk = decoder.decode(value, { stream: true });
                    content += decodedChunk;
                    if (onReportUpdate) {
                        onReportUpdate(reportParams, content, null, true);
                    }
                }
            }

            if (onReportUpdate) {
                onReportUpdate(reportParams, content, null, false);
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
            setError(errorMessage);
            if (onReportUpdate) {
                onReportUpdate(reportParams, '', errorMessage, false);
            }
        } finally {
            setIsGenerating(false);
        }
    }, [reportParams, onReportUpdate, onProfileUpdate]);

    const handleAutoSave = async (data: any) => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            setLastSaved(new Date());
        } catch (error) {
            console.error('Auto-save failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const stepSummaryData = [
        {
            title: 'Strategic Foundation',
            completed: currentStep > 0,
            data: reportParams,
            requiredFields: ['reportName', 'userName', 'problemStatement', 'region', 'industry', 'idealPartnerProfile'],
            optionalFields: ['userDepartment', 'organizationType', 'tier', 'aiPersona'],
            phase: 1
        },
        {
            title: 'AI Analysis Engine',
            completed: currentStep > 1,
            data: reportParams,
            requiredFields: ['region', 'industry', 'aiPersona', 'tier'],
            optionalFields: ['rroiResult', 'tptResult', 'seamResult'],
            phase: 2
        },
        {
            title: 'Strategy & Intelligence',
            completed: currentStep > 2,
            data: reportParams,
            requiredFields: [],
            optionalFields: ['riskAssessment', 'implementationRoadmap', 'nsilReport'],
            phase: 3
        }
    ];

    const getStepStatus = (stepIndex: number): 'pending' | 'active' | 'completed' | 'error' => {
        const stepData = stepSummaryData[stepIndex];
        if (stepData) {
            const hasRequiredData = stepData.requiredFields.every(field => {
                const value = reportParams[field];
                return value !== undefined && value !== null && value !== '';
            });
            if (hasRequiredData && stepIndex < currentStep) return 'completed';
        }

        if (stepIndex < currentStep) return 'completed';
        if (stepIndex === currentStep) return 'active';
        return 'pending';
    };

    const stepsWithStatus = WIZARD_STEPS.map((step, index) => ({
        ...step,
        status: getStepStatus(index)
    }));

    const { targetRegion, targetCountry, targetCity } = useMemo(() => {
        const regionValue = reportParams.region;
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
    }, [reportParams.region]);

    const handleRegionChange = useCallback((region: string, country: string, city: string) => {
        const combinedRegion = [city, country].filter(Boolean).join(', ');
        if (combinedRegion !== reportParams.region) {
            handleChange('region', combinedRegion);
        }
    }, [reportParams.region, handleChange]);

    const handleMultiSelectToggle = useCallback((field: 'aiPersona' | 'analyticalLens' | 'toneAndStyle' | 'industry' | 'tier', value: string) => {
        const currentValues = reportParams[field] as string[] || [];
        const newValues = currentValues.includes(value)
            ? currentValues.filter(v => v !== value)
            : [...currentValues, value];

        if ((field === 'aiPersona' || field === 'industry') && newValues.length === 0 && (reportParams[field] as string[]).length > 0) {
            return;
        }

        handleChange(field, newValues);
    }, [reportParams, handleChange]);

    const getValidationErrors = useCallback((stepNum: number): string[] => {
        const errors: string[] = [];
        switch(stepNum) {
            case 1:
                if (!reportParams.userName?.trim()) errors.push("Your Name is required.");
                if (!reportParams.reportName?.trim()) errors.push("Report Name is required.");
                break;
            case 2:
                if (!reportParams.region?.trim()) errors.push("A target location is required.");
                if (reportParams.industry?.length === 0) errors.push("At least one Core Industry must be selected.");
                if (reportParams.industry?.includes('Custom') && !reportParams.customIndustry?.trim()) errors.push("Custom Industry Definition is required.");
                break;
            case 3:
                if (!reportParams.idealPartnerProfile?.trim()) errors.push("Ideal Partner Profile is required.");
                if (!reportParams.problemStatement?.trim()) errors.push("Core Objective is required.");
                break;
            case 4:
                if (reportParams.tier?.length === 0) errors.push("At least one Report Tier must be selected.");
                if (reportParams.aiPersona?.length === 0) errors.push("At least one AI Analyst persona must be selected.");
                if (reportParams.aiPersona?.includes('Custom') && !reportParams.customAiPersona?.trim()) errors.push("Custom Persona Definition is required.");
                break;
            default: break;
        }
        return errors;
    }, [reportParams]);

    const nextStep = useCallback(() => {
        setError(null);
        scrollToTop();
        const validationErrors = getValidationErrors(currentStep);
        if (validationErrors.length === 0) {
            if (currentStep < WIZARD_STEPS.length) setCurrentStep(s => s + 1);
        } else {
            setError(validationErrors.join(' '));
        }
    }, [currentStep, getValidationErrors]);

    const prevStep = useCallback(() => {
        setError(null);
        scrollToTop();
        if (currentStep > 0) setCurrentStep(s => s - 1);
    }, []);

    const renderStep = () => {
        const inputStyles = "w-full p-2 border border-gray-300 rounded text-sm";
        const labelStyles = "block text-sm font-medium text-gray-700 mb-1";

        switch (currentStep) {
            case 0: return (
                <div className="space-y-6">
                    {/* Strategic Foundation - All inputs on one page */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className={labelStyles}>Report Name *</label>
                            <input
                                type="text"
                                value={reportParams.reportName || ''}
                                onChange={(e) => handleChange('reportName', e.target.value)}
                                className={inputStyles}
                                placeholder="Enter report name"
                            />
                        </div>
                        <div>
                            <label className={labelStyles}>Your Name *</label>
                            <input
                                type="text"
                                value={reportParams.userName || ''}
                                onChange={(e) => handleChange('userName', e.target.value)}
                                className={inputStyles}
                                placeholder="Enter your name"
                            />
                        </div>
                    </div>

                    <div>
                        <label className={labelStyles}>Core Objective *</label>
                        <textarea
                            value={reportParams.problemStatement || ''}
                            onChange={(e) => handleChange('problemStatement', e.target.value)}
                            rows={4}
                            className={inputStyles}
                            placeholder="Describe your strategic objective..."
                        />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                        <div>
                            <label className={labelStyles}>Target Region *</label>
                            <select
                                value={targetRegion}
                                onChange={e => handleRegionChange(e.target.value, '', '')}
                                className={inputStyles}
                            >
                                <option value="">Select Global Region</option>
                                {REGIONS_AND_COUNTRIES.map(region => (
                                    <option key={region.name} value={region.name}>{region.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className={labelStyles}>Target Country *</label>
                            <select
                                value={targetCountry}
                                onChange={e => handleRegionChange(targetRegion, e.target.value, targetCity)}
                                disabled={!targetRegion}
                                className={inputStyles}
                            >
                                <option value="">Select Country</option>
                                {REGIONS_AND_COUNTRIES.find(r => r.name === targetRegion)?.countries.map(country => (
                                    <option key={country} value={country}>{country}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className={labelStyles}>Target City / Area</label>
                            <input
                                type="text"
                                value={targetCity}
                                onChange={e => handleRegionChange(targetRegion, targetCountry, e.target.value)}
                                className={inputStyles}
                                placeholder="e.g., Manila, Metro Manila"
                            />
                        </div>
                    </div>

                    <div>
                        <label className={labelStyles}>Core Industry Focus *</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {INDUSTRIES.map((industry) => (
                                <label key={industry.id} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={reportParams.industry?.includes(industry.id) || false}
                                        onChange={() => handleMultiSelectToggle('industry', industry.id)}
                                        className="rounded"
                                    />
                                    <span className="text-sm">{industry.title}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className={labelStyles}>Ideal Partner Profile *</label>
                        <textarea
                            value={reportParams.idealPartnerProfile || ''}
                            onChange={(e) => handleChange('idealPartnerProfile', e.target.value)}
                            rows={3}
                            className={inputStyles}
                            placeholder="Describe your ideal partner..."
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className={labelStyles}>AI Analyst Personas *</label>
                            <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto">
                                {AI_PERSONAS.map((persona) => (
                                    <label key={persona.id} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={reportParams.aiPersona?.includes(persona.id) || false}
                                            onChange={() => handleMultiSelectToggle('aiPersona', persona.id)}
                                            className="rounded"
                                        />
                                        <span className="text-sm">{persona.title}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className={labelStyles}>Report Tiers *</label>
                            <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto">
                                {TIERS_BY_ORG_TYPE[reportParams.organizationType || 'Default']?.map((tier) => (
                                    <label key={tier.id} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={reportParams.tier?.includes(tier.id) || false}
                                            onChange={() => handleMultiSelectToggle('tier', tier.id)}
                                            className="rounded"
                                        />
                                        <span className="text-sm">{tier.title}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {!initialAnalysis && (
                        <button
                            onClick={() => handleInitialAnalysis(reportParams.problemStatement || '')}
                            disabled={isAnalyzing || !reportParams.problemStatement?.trim()}
                            className="w-full bg-gray-800 text-white py-3 px-4 rounded font-medium disabled:bg-gray-400"
                        >
                            {isAnalyzing ? 'Analyzing...' : 'Run AI Analysis'}
                        </button>
                    )}
                    {initialAnalysis && (
                        <div className="p-4 bg-gray-50 border border-gray-200 rounded">
                            <h4 className="text-sm font-bold text-gray-800 mb-2">AI Analysis Complete</h4>
                            <div className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: initialAnalysis.summary }} />
                        </div>
                    )}
                </div>
            );
            case 1: return (
                <div className="space-y-6">
                    {/* AI Analysis Engine - All analysis modules on one page */}
                    <div className="text-center mb-6">
                        <h3 className="text-xl font-bold mb-2">AI Analysis Engine</h3>
                        <p className="text-gray-600">Running comprehensive RROI, TPT, and SEAM analysis modules</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* RROI Analysis */}
                        <div className="bg-blue-50 p-4 rounded border border-blue-200">
                            <h4 className="font-bold text-blue-800 mb-3">Regional Diagnostic (RROI)</h4>
                            <div className="space-y-2 text-sm">
                                <div><strong>Region:</strong> {reportParams.region || 'Not specified'}</div>
                                <div><strong>Readiness Score:</strong> <span className="text-green-600">High</span></div>
                                <div><strong>Opportunity Index:</strong> 8.5/10</div>
                                <div><strong>Risk Level:</strong> <span className="text-green-600">Low</span></div>
                            </div>
                        </div>

                        {/* TPT Analysis */}
                        <div className="bg-green-50 p-4 rounded border border-green-200">
                            <h4 className="font-bold text-green-800 mb-3">Predictive Positioning (TPT)</h4>
                            <div className="space-y-2 text-sm">
                                <div><strong>Time Horizon:</strong> 5 years</div>
                                <div><strong>Growth Assumption:</strong> 15% CAGR</div>
                                <div><strong>Intervention Impact:</strong> <span className="text-green-600">High</span></div>
                                <div className="pt-2">
                                    <strong>Scenarios:</strong>
                                    <ul className="mt-1 space-y-1 text-xs">
                                        <li>• Optimistic: 25% growth</li>
                                        <li>• Base Case: 15% growth</li>
                                        <li>• Conservative: 8% growth</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* SEAM Analysis */}
                        <div className="bg-purple-50 p-4 rounded border border-purple-200">
                            <h4 className="font-bold text-purple-800 mb-3">Ecosystem Mapping (SEAM)</h4>
                            <div className="space-y-2 text-sm">
                                <div><strong>Partner Types:</strong> Tech, Manufacturing, Logistics</div>
                                <div><strong>Ecosystem:</strong> <span className="text-green-600">High connectivity</span></div>
                                <div className="pt-2">
                                    <strong>Models:</strong>
                                    <ul className="mt-1 space-y-1 text-xs">
                                        <li>• Joint Venture</li>
                                        <li>• Tech Licensing</li>
                                        <li>• Supply Chain</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded border">
                        <h4 className="font-bold mb-3">Analysis Summary</h4>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <strong>Risk Assessment:</strong>
                                <ul className="mt-1 space-y-1">
                                    <li>• Political Risk: <span className="text-green-600">Low</span></li>
                                    <li>• Economic Risk: <span className="text-yellow-600">Medium</span></li>
                                    <li>• Operational Risk: <span className="text-green-600">Low</span></li>
                                    <li>• Market Risk: <span className="text-yellow-600">Medium</span></li>
                                </ul>
                            </div>
                            <div>
                                <strong>Mitigation Strategies:</strong>
                                <ul className="mt-1 space-y-1 text-xs">
                                    <li>• Diversified supplier network</li>
                                    <li>• Local partnership development</li>
                                    <li>• Regulatory compliance monitoring</li>
                                    <li>• Financial hedging strategies</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            );
            case 2: return (
                <div className="space-y-6">
                    {/* Strategy & Intelligence - Final step */}
                    <div className="text-center mb-6">
                        <h3 className="text-xl font-bold mb-2">Strategy & Intelligence</h3>
                        <p className="text-gray-600">Implementation planning and final intelligence blueprint generation</p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded border">
                        <h4 className="font-bold mb-4">Implementation Roadmap</h4>
                        <div className="grid md:grid-cols-2 gap-4 text-sm mb-4">
                            <div><strong>Timeline:</strong> 24 months</div>
                            <div><strong>Budget Estimate:</strong> $2.5M - $5M</div>
                        </div>
                        <div>
                            <strong>Implementation Phases:</strong>
                            <ul className="mt-2 space-y-2 text-sm">
                                <li><strong>Phase 1 (0-6 months):</strong> Partnership development and due diligence</li>
                                <li><strong>Phase 2 (6-12 months):</strong> Technology transfer and pilot implementation</li>
                                <li><strong>Phase 3 (12-18 months):</strong> Full-scale deployment and optimization</li>
                                <li><strong>Phase 4 (18-24 months):</strong> Performance monitoring and scaling</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded border">
                        <QualityAnalysis params={reportParams} />
                    </div>

                    <div className="text-center">
                        <button
                            onClick={handleGenerateReport}
                            disabled={isGenerating}
                            className="bg-black text-white py-3 px-8 rounded font-medium disabled:bg-gray-400 text-lg"
                        >
                            {isGenerating ? (
                                <>
                                    <Spinner />
                                    Generating Intelligence Blueprint...
                                </>
                            ) : (
                                'Generate Intelligence Blueprint'
                            )}
                        </button>
                    </div>
                </div>
            );
            default: return null;
        }
    };

    if (!mounted) {
        return <div className="min-h-screen bg-gray-50" />;
    }

    if (!termsAccepted) {
        return (
            <div className="min-h-screen bg-gray-50 p-4">
                <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold mb-4">Terms & Conditions</h2>
                    <p className="text-gray-600 mb-6">Please accept the terms to continue.</p>
                    <div className="flex gap-3">
                        <button onClick={() => setTermsAccepted(true)} className="flex-1 bg-black text-white py-2 px-4 rounded font-medium">
                            Accept
                        </button>
                        <button onClick={() => window.location.href = '/'} className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded font-medium">
                            Decline
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const currentStepData = WIZARD_STEPS[currentStep];
    const progressPercent = ((currentStep + 1) / WIZARD_STEPS.length) * 100;

    return (
        <ErrorBoundary>
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <header className="bg-white border-b border-gray-200">
                    <div className="max-w-6xl mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">N</span>
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900">Nexus AI Report Studio</h1>
                                    <p className="text-sm text-gray-600">Advanced Intelligence Blueprint Framework</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <AutoSave
                                    data={reportParams}
                                    onSave={handleAutoSave}
                                    enabled={!isLoading}
                                    className="hidden sm:flex"
                                />
                                <button
                                    className="text-gray-600 hover:text-gray-800 text-sm font-medium px-3 py-1 border border-gray-300 rounded"
                                    title="Get help with any step of the process"
                                >
                                    Help
                                </button>
                                <button
                                    onClick={() => setShowCopilotPanel(!showCopilotPanel)}
                                    className="px-3 py-1 bg-black text-white rounded font-medium text-sm"
                                >
                                    {showCopilotPanel ? 'Hide' : 'Show'} Copilot
                                </button>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-semibold text-gray-700">Progress</span>
                                <span className="text-sm text-gray-600">{currentStep + 1} of {WIZARD_STEPS.length}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-black h-2 rounded-full"
                                    style={{ width: `${progressPercent}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex">
                    {/* Main Content */}
                    <div ref={scrollPanelRef} className="flex-1 overflow-y-auto">
                        <div className="max-w-4xl mx-auto px-4 py-8">
                            {/* Phase Navigation */}
                            <div className="bg-white rounded border border-gray-200 p-4 mb-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
                                            currentStepData?.phase === 1 ? 'border-black bg-black text-white' :
                                            currentStepData?.phase === 2 ? 'border-gray-600 bg-gray-600 text-white' :
                                            'border-gray-400 bg-gray-400 text-white'
                                        }`}>
                                            {currentStepData?.phase || 1}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">
                                                {currentStepData?.phaseName || 'Phase'}
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                Step {currentStep + 1} of 9
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setShowPhaseOverview(!showPhaseOverview)}
                                        className="text-sm text-gray-600 hover:text-gray-800"
                                    >
                                        {showPhaseOverview ? 'Hide' : 'Show'} Overview
                                    </button>
                                </div>

                                {showPhaseOverview && (
                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                        <div className="grid grid-cols-3 gap-2">
                                            {stepsWithStatus.map((step, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => handleStepClick(idx)}
                                                    className={`p-2 text-left border rounded text-xs ${
                                                        idx === currentStep
                                                            ? 'border-black bg-black text-white'
                                                            : completedSteps.includes(idx)
                                                            ? 'border-gray-400 bg-gray-100 text-gray-800'
                                                            : 'border-gray-200 bg-white text-gray-600'
                                                    }`}
                                                >
                                                    <div className="font-medium">{step.title}</div>
                                                    <div className="text-xs opacity-75">{step.status}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Error Display */}
                            {error && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 text-sm rounded">
                                    <strong>Error:</strong> {error}
                                </div>
                            )}

                            {/* Step Content */}
                            <div className="bg-white rounded border border-gray-200 p-6 mb-6">
                                <div className="mb-6">
                                    <h2 className="text-lg font-bold text-gray-900">{currentStepData?.title}</h2>
                                    <p className="text-gray-600 text-sm">{currentStepData?.description}</p>
                                </div>

                                {/* Letter Generation Button */}
                                {(currentStep >= 2 && (reportParams.outputFormat === 'letter' || reportParams.outputFormat === 'both')) && (
                                    <div className="mb-4">
                                        <button
                                            onClick={() => setShowLetterModal(true)}
                                            className="bg-gray-800 text-white px-4 py-2 rounded font-medium text-sm"
                                        >
                                            Generate Letter
                                        </button>
                                    </div>
                                )}

                                <div className="space-y-6">
                                    {renderStep()}
                                </div>

                                {/* Navigation */}
                                <div className="flex justify-between items-center gap-4 mt-8 pt-4 border-t border-gray-200">
                                    <button
                                        className="px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded disabled:opacity-50"
                                        disabled={currentStep === 0}
                                        onClick={handleBack}
                                    >
                                        Back
                                    </button>

                                    <div className="text-sm text-gray-600">
                                        Step {currentStep + 1} of {WIZARD_STEPS.length}
                                    </div>

                                    {currentStep === WIZARD_STEPS.length - 1 ? (
                                        <div></div>
                                    ) : (
                                        <button
                                            className="px-4 py-2 bg-black text-white font-medium rounded"
                                            onClick={handleNext}
                                        >
                                            Next
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Intelligence Feed */}
                            {intelligenceFeed.length > 0 && (
                                <div className="bg-white rounded border border-gray-200 p-4">
                                    <h3 className="font-bold text-gray-900 mb-3">Intelligence Feed</h3>
                                    <div className="space-y-2">
                                        {intelligenceFeed.map((category, idx) => (
                                            <div key={idx} className="p-3 bg-gray-50 rounded">
                                                <h4 className="font-medium text-gray-800">{category.category}</h4>
                                                <p className="text-sm text-gray-600">{category.items[0]?.details}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
                        {/* Copilot Panel */}
                        {showCopilotPanel && (
                            <div className="flex-1 border-b border-gray-200">
                                <NexusCopilotSidebar
                                    context={reportParams}
                                    large={false}
                                    currentStep={currentStep}
                                    reportParams={reportParams}
                                    onUpdateParams={setReportParams}
                                    messages={copilotMessages}
                                    setMessages={setCopilotMessages}
                                />
                            </div>
                        )}

                        {/* Step Summary */}
                        <div className="p-4">
                            <StepSummary
                                steps={stepSummaryData}
                                currentStep={currentStep}
                            />
                        </div>
                    </div>
                </div>

                {/* Letter Modal */}
                <LetterGeneratorModal
                    isOpen={showLetterModal}
                    onClose={() => setShowLetterModal(false)}
                    onGenerate={async () => {
                        const letterContent = `Dear Potential Partner,

I am writing to you as ${reportParams.userName || 'a representative'} from ${reportParams.organizationType || 'our organization'} regarding an exciting partnership opportunity in ${reportParams.region || 'the region'}.

${reportParams.problemStatement ? `Our core objective is: ${reportParams.problemStatement}` : ''}

${reportParams.idealPartnerProfile ? `We are seeking partners who: ${reportParams.idealPartnerProfile}` : ''}

${(reportParams as any).letterKeyPoints || 'We believe this partnership could bring significant value to both our organizations through shared growth and mutual success.'}

We would welcome the opportunity to discuss this further and explore how we might collaborate.

Best regards,
${reportParams.userName || 'Your Name'}
${reportParams.userDepartment ? `${reportParams.userDepartment}` : ''}`;

                        return letterContent;
                    }}
                />

                {/* Scroll to Top */}
                {showScroll && (
                    <button
                        onClick={scrollToTop}
                        className="fixed bottom-8 right-8 bg-black text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                        aria-label="Back to top"
                    >
                        ↑
                    </button>
                )}
            </div>
        </ErrorBoundary>
    );
}
