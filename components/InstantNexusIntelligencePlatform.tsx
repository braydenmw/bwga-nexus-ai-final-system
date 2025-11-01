import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { ReportParameters, UserProfile, LiveOpportunityItem, SymbiosisContext } from '../types.ts';
import { COUNTRIES, INDUSTRIES, AI_PERSONAS, ORGANIZATION_TYPES, TIERS_BY_ORG_TYPE } from '../constants.tsx';
import { generateReportStream, fetchResearchAndScope, diagnoseRegion, simulatePathway, architectEcosystem, generateLetterStream, fetchCapabilities } from '../services/nexusService.ts';
import { RROIResultDisplay } from './RROIResultDisplay.tsx';
import { TPTResultDisplay } from './TPTResultDisplay.tsx';
import { SEAMResultDisplay } from './SEAMResultDisplay.tsx';
import { EconomicSnapshot } from './EconomicSnapshot.tsx';
import Spinner, { SpinnerSmall } from './Spinner.tsx';
import { NexusLogo, ArrowUpIcon, DownloadIcon, ChatBubbleLeftRightIcon } from './Icons.tsx';
import Card from './common/Card.tsx';

interface InstantNexusIntelligencePlatformProps {
  onViewChange: (view: any, params: ReportParameters) => void;
  onReportUpdate: (params: ReportParameters, content: string, error: string | null, generating: boolean) => void;
  onProfileUpdate: (profile: UserProfile) => void;
}

type PartnershipType = 'B2B' | 'G2G' | 'G2B' | 'B2G';
type ReportFormat = 'brief' | 'standard' | 'comprehensive';

interface AnalysisResults {
  rroi: any;
  tpt: any;
  seam: any;
  economicData: any;
  opportunities: LiveOpportunityItem[];
}

const InstantNexusIntelligencePlatform: React.FC<InstantNexusIntelligencePlatformProps> = ({
  onViewChange,
  onReportUpdate,
  onProfileUpdate,
}) => {
  // Form state
  const [formData, setFormData] = useState<Partial<ReportParameters>>({
    userName: '',
    userDepartment: '',
    organizationType: ORGANIZATION_TYPES[0],
    userCountry: '',
    reportName: '',
    problemStatement: '',
    region: '',
    industry: [],
    idealPartnerProfile: '',
    tier: [],
    aiPersona: [],
  });

  // Processing state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentAnalysisStep, setCurrentAnalysisStep] = useState('');
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null);

  // Output state
  const [selectedReportFormat, setSelectedReportFormat] = useState<ReportFormat>('standard');
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [isGeneratingLetter, setIsGeneratingLetter] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [generatedReport, setGeneratedReport] = useState('');
  const [error, setError] = useState<string | null>(null);

  // AI Chat state
  const [chatMessages, setChatMessages] = useState<{sender: 'user' | 'ai', text: string}[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Refs
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Partnership type detection
  const detectPartnershipType = useCallback((objective: string, partnerProfile: string): PartnershipType => {
    const text = (objective + ' ' + partnerProfile).toLowerCase();

    if (text.includes('government') && text.includes('business')) return 'G2B';
    if (text.includes('government') && text.includes('government')) return 'G2G';
    if (text.includes('business') && text.includes('government')) return 'B2G';
    return 'B2B'; // Default
  }, []);

  // Handle form changes
  const handleFormChange = useCallback((field: keyof ReportParameters, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  // Multi-select handlers
  const handleIndustryToggle = useCallback((industryId: string) => {
    setFormData(prev => ({
      ...prev,
      industry: prev.industry?.includes(industryId)
        ? prev.industry.filter(id => id !== industryId)
        : [...(prev.industry || []), industryId]
    }));
  }, []);

  const handleTierToggle = useCallback((tierId: string) => {
    setFormData(prev => ({
      ...prev,
      tier: prev.tier?.includes(tierId)
        ? prev.tier.filter(id => id !== tierId)
        : [...(prev.tier || []), tierId]
    }));
  }, []);

  // Parallel analysis processing
  const runParallelAnalysis = useCallback(async () => {
    if (!formData.region || !formData.problemStatement) return;

    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setError(null);

    try {
      // Step 1: RROI Analysis
      setCurrentAnalysisStep('Analyzing regional readiness...');
      setAnalysisProgress(20);
      const rroiResult = await diagnoseRegion(formData.region, formData.problemStatement);

      // Step 2: TPT Simulation
      setCurrentAnalysisStep('Simulating growth trajectories...');
      setAnalysisProgress(40);
      const tptResult = await simulatePathway(rroiResult, 'Expand manufacturing operations with local partnerships');

      // Step 3: SEAM Architecture
      setCurrentAnalysisStep('Designing partnership ecosystem...');
      setAnalysisProgress(60);
      const seamResult = await architectEcosystem(rroiResult, formData.problemStatement);

      // Step 4: Economic Data
      setCurrentAnalysisStep('Gathering economic intelligence...');
      setAnalysisProgress(80);

      // Step 5: Research & Scope
      setCurrentAnalysisStep('Finalizing intelligence synthesis...');
      setAnalysisProgress(100);

      const results: AnalysisResults = {
        rroi: rroiResult,
        tpt: tptResult,
        seam: seamResult,
        economicData: {},
        opportunities: []
      };

      setAnalysisResults(results);
      setCurrentAnalysisStep('Analysis complete!');

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setIsAnalyzing(false);
    }
  }, [formData.region, formData.problemStatement]);

  // Generate letter instantly
  const generateLetter = useCallback(async () => {
    if (!formData.idealPartnerProfile || !formData.problemStatement) {
      setError('Please complete partner profile and objectives first');
      return;
    }

    setIsGeneratingLetter(true);
    setError(null);

    try {
      const partnershipType = detectPartnershipType(
        formData.problemStatement || '',
        formData.idealPartnerProfile || ''
      );

      const letterParams: ReportParameters = {
        ...formData,
        partnershipType,
        outputFormat: 'letter'
      } as ReportParameters;

      const stream = await generateLetterStream(letterParams);
      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let letterContent = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        letterContent += decoder.decode(value, { stream: true });
      }

      setGeneratedLetter(letterContent);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Letter generation failed');
    } finally {
      setIsGeneratingLetter(false);
    }
  }, [formData, detectPartnershipType]);

  // Generate report
  const generateReport = useCallback(async () => {
    setIsGeneratingReport(true);
    setError(null);

    try {
      const reportParams: ReportParameters = {
        ...formData,
        reportLength: selectedReportFormat,
        outputFormat: 'report'
      } as ReportParameters;

      onProfileUpdate({
        userName: formData.userName || '',
        userDepartment: formData.userDepartment || '',
        organizationType: formData.organizationType || ORGANIZATION_TYPES[0],
        userCountry: formData.userCountry || ''
      });

      onReportUpdate(reportParams, '', null, true);

      const stream = await generateReportStream(reportParams);
      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let reportContent = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        reportContent += decoder.decode(value, { stream: true });
        onReportUpdate(reportParams, reportContent, null, true);
      }

      onReportUpdate(reportParams, reportContent, null, false);
      setGeneratedReport(reportContent);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Report generation failed';
      setError(errorMessage);
      onReportUpdate({} as ReportParameters, '', errorMessage, false);
    } finally {
      setIsGeneratingReport(false);
    }
  }, [formData, selectedReportFormat, onProfileUpdate, onReportUpdate]);

  // Auto-run analysis when form is complete
  useEffect(() => {
    const isFormComplete = formData.userName && formData.problemStatement && formData.region && formData.industry?.length;
    if (isFormComplete && !isAnalyzing && !analysisResults) {
      runParallelAnalysis();
    }
  }, [formData, isAnalyzing, analysisResults, runParallelAnalysis]);

  // Scroll to bottom of chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const currentTiers = TIERS_BY_ORG_TYPE[formData.organizationType || 'Default'] || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <NexusLogo className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">NEXUS AI Global Intelligence Platform</h1>
              <p className="text-sm text-gray-500">Intelligence in Minutes, Not Hours</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Analysis Progress</div>
            <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${analysisProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto space-y-6">

            {/* Progress Indicator */}
            {isAnalyzing && (
              <Card className="border-blue-200 bg-blue-50">
                <div className="flex items-center gap-4">
                  <SpinnerSmall />
                  <div>
                    <div className="font-semibold text-blue-800">{currentAnalysisStep}</div>
                    <div className="text-sm text-blue-600">Running parallel AI analysis...</div>
                  </div>
                </div>
              </Card>
            )}

            {/* Rapid Assessment Form */}
            <Card>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🚀 Rapid Intelligence Assessment</h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Profile Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Your Profile</h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      value={formData.userName || ''}
                      onChange={(e) => handleFormChange('userName', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                    <input
                      type="text"
                      value={formData.userDepartment || ''}
                      onChange={(e) => handleFormChange('userDepartment', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Business Development"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Organization Type</label>
                    <select
                      value={formData.organizationType || ORGANIZATION_TYPES[0]}
                      onChange={(e) => handleFormChange('organizationType', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      title="Select your organization type"
                    >
                      {ORGANIZATION_TYPES.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Country</label>
                    <select
                      value={formData.userCountry || ''}
                      onChange={(e) => handleFormChange('userCountry', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      title="Select your country"
                    >
                      <option value="">Select your country</option>
                      {COUNTRIES.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Objectives Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Your Objectives</h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Report/Project Name *</label>
                    <input
                      type="text"
                      value={formData.reportName || ''}
                      onChange={(e) => handleFormChange('reportName', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Name your intelligence project"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Core Objective *</label>
                    <textarea
                      value={formData.problemStatement || ''}
                      onChange={(e) => handleFormChange('problemStatement', e.target.value)}
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="What are you trying to achieve? Be specific about your goals, target markets, and partnership needs."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Target Region *</label>
                    <input
                      type="text"
                      value={formData.region || ''}
                      onChange={(e) => handleFormChange('region', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Southeast Asia, Metro Manila, Philippines"
                    />
                  </div>
                </div>
              </div>

              {/* Industry Selection */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Industry Focus *</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {INDUSTRIES.map((industry) => (
                    <button
                      key={industry.id}
                      onClick={() => handleIndustryToggle(industry.id)}
                      className={`p-3 rounded-lg border text-center transition-all ${
                        formData.industry?.includes(industry.id)
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-300 hover:border-gray-400 bg-white'
                      }`}
                    >
                      <industry.icon className="w-6 h-6 mx-auto mb-2" />
                      <div className="text-sm font-medium">{industry.title}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Partner Profile */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Ideal Partner Profile</label>
                <textarea
                  value={formData.idealPartnerProfile || ''}
                  onChange={(e) => handleFormChange('idealPartnerProfile', e.target.value)}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe your ideal partner - their size, capabilities, experience, location preferences, etc."
                />
              </div>
            </Card>

            {/* Analysis Results */}
            {analysisResults && (
              <div className="space-y-6">
                <Card>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">🧠 Nexus Brain Analysis Results</h2>

                  <div className="grid md:grid-cols-3 gap-6">
                    {/* RROI Results */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-800 mb-3">Regional Readiness (RROI)</h3>
                      <RROIResultDisplay rroi={analysisResults.rroi} />
                    </div>

                    {/* TPT Results */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-800 mb-3">Growth Trajectory (TPT)</h3>
                      <TPTResultDisplay sim={analysisResults.tpt} />
                    </div>

                    {/* SEAM Results */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-800 mb-3">Partnership Ecosystem (SEAM)</h3>
                      <SEAMResultDisplay seam={analysisResults.seam} />
                    </div>
                  </div>
                </Card>

                {/* Economic Intelligence */}
                {formData.userCountry && (
                  <EconomicSnapshot
                    country={formData.userCountry}
                    objective={formData.problemStatement || ''}
                    isRefining={false}
                    onRefineObjective={() => {}}
                  />
                )}
              </div>
            )}

            {/* Output Generation */}
            {analysisResults && (
              <Card>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">📊 Generate Intelligence Package</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Letter Generation */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">✉️ Ice-Breaker Letter</h3>
                    <p className="text-gray-600 mb-4">Generate a professional introduction letter for your target partners.</p>

                    <button
                      onClick={generateLetter}
                      disabled={isGeneratingLetter}
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isGeneratingLetter ? <SpinnerSmall /> : <DownloadIcon className="w-5 h-5" />}
                      Generate Letter
                    </button>

                    {generatedLetter && (
                      <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                        <div className="whitespace-pre-wrap text-sm text-gray-800 max-h-48 overflow-y-auto">
                          {generatedLetter}
                        </div>
                        <button className="mt-2 text-blue-600 text-sm hover:text-blue-800">
                          Download PDF
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Report Generation */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">📋 Intelligence Report</h3>
                    <p className="text-gray-600 mb-4">Choose your report depth and generate comprehensive analysis.</p>

                    <div className="space-y-3 mb-4">
                      {[
                        { id: 'brief', title: 'Executive Brief', desc: '2-3 pages', pages: '2-3 pages' },
                        { id: 'standard', title: 'Standard Report', desc: '10-15 pages', pages: '10-15 pages' },
                        { id: 'comprehensive', title: 'Comprehensive Analysis', desc: '20-30 pages', pages: '20-30 pages' }
                      ].map((format) => (
                        <label key={format.id} className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="reportFormat"
                            value={format.id}
                            checked={selectedReportFormat === format.id}
                            onChange={(e) => setSelectedReportFormat(e.target.value as ReportFormat)}
                            className="h-4 w-4 text-blue-600"
                          />
                          <div>
                            <div className="font-medium text-gray-800">{format.title}</div>
                            <div className="text-sm text-gray-600">{format.desc}</div>
                          </div>
                        </label>
                      ))}
                    </div>

                    <button
                      onClick={generateReport}
                      disabled={isGeneratingReport}
                      className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isGeneratingReport ? <SpinnerSmall /> : <DownloadIcon className="w-5 h-5" />}
                      Generate {selectedReportFormat.charAt(0).toUpperCase() + selectedReportFormat.slice(1)} Report
                    </button>
                  </div>
                </div>
              </Card>
            )}

            {/* Error Display */}
            {error && (
              <Card className="border-red-200 bg-red-50">
                <div className="flex items-center gap-3">
                  <div className="text-red-600">⚠️</div>
                  <div className="text-red-800">{error}</div>
                </div>
              </Card>
            )}
          </div>
        </main>

        {/* AI Co-Pilot Sidebar */}
        <aside className="w-96 bg-white border-l border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <ChatBubbleLeftRightIcon className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-800">AI Co-Pilot</h3>
            </div>
          </div>

          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-800">
                👋 Hi! I'm your Nexus AI Co-Pilot. I can help you refine your objectives,
                suggest optimal partnership strategies, and provide real-time insights
                as you build your intelligence report.
              </p>
            </div>

            {chatMessages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <SpinnerSmall />
                    <span className="text-sm text-gray-600">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything..."
                className="flex-1 p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!currentMessage.trim() || isTyping}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );

  async function handleSendMessage() {
    if (!currentMessage.trim()) return;

    const userMessage = { sender: 'user' as const, text: currentMessage };
    setChatMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    try {
      // Simulate AI response - in real implementation, this would call the Nexus Brain API
      setTimeout(() => {
        const aiResponse = {
          sender: 'ai' as const,
          text: `Based on your objectives, I recommend focusing on ${formData.region} for your expansion. The regional analysis shows strong potential for ${formData.industry?.join(', ')} partnerships. Would you like me to elaborate on specific opportunities?`
        };
        setChatMessages(prev => [...prev, aiResponse]);
        setIsTyping(false);
      }, 2000);
    } catch (error) {
      setIsTyping(false);
    }
  }
};

export default InstantNexusIntelligencePlatform;