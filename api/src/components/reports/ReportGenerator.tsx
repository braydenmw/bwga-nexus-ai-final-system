import React, { useState, useEffect } from 'react';
import { ReportParameters, EngagementStyle, ReportFormat, UserProfile, WorkflowStep } from '../../types';
import { generateReport } from '../../../report';
import { generateLetter } from '../../../letter';

interface ReportGeneratorProps {
  userProfile: UserProfile;
  workflowSteps: WorkflowStep[];
  completedSteps: number[];
  onReportGenerated: (report: string, letter: string) => void;
}

export const ReportGenerator: React.FC<ReportGeneratorProps> = ({
  userProfile,
  workflowSteps,
  completedSteps,
  onReportGenerated
}) => {
  const [engagementStyle, setEngagementStyle] = useState<EngagementStyle>('exploratory');
  const [reportFormat, setReportFormat] = useState<ReportFormat>('standard');
  const [reportLength, setReportLength] = useState<'concise' | 'standard' | 'comprehensive'>('standard');
  const [includeLetter, setIncludeLetter] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const engagementStyles = [
    {
      id: 'exploratory' as EngagementStyle,
      title: 'Exploratory',
      description: 'Initial assessment and discovery phase',
      icon: '🔍',
      color: 'cyan',
      features: ['Basic analysis', 'Quick insights', 'Initial recommendations']
    },
    {
      id: 'strategic' as EngagementStyle,
      title: 'Strategic',
      description: 'In-depth strategic planning and analysis',
      icon: '🎯',
      color: 'purple',
      features: ['Detailed analysis', 'Strategic recommendations', 'Implementation roadmap']
    },
    {
      id: 'comprehensive' as EngagementStyle,
      title: 'Comprehensive',
      description: 'Full-scale transformation and implementation',
      icon: '🚀',
      color: 'green',
      features: ['Complete analysis', 'Full implementation plan', 'Long-term strategy']
    }
  ];

  const reportFormats = [
    {
      id: 'snapshot' as ReportFormat,
      title: 'Snapshot',
      description: 'Quick overview with key metrics',
      pages: '2-4 pages',
      icon: '📊',
      sections: ['Executive Summary', 'Key Findings', 'Quick Wins']
    },
    {
      id: 'brief' as ReportFormat,
      title: 'Brief',
      description: 'Concise strategic brief',
      pages: '5-8 pages',
      icon: '📋',
      sections: ['Executive Summary', 'Analysis', 'Recommendations', 'Next Steps']
    },
    {
      id: 'standard' as ReportFormat,
      title: 'Standard',
      description: 'Complete strategic analysis',
      pages: '10-15 pages',
      icon: '📄',
      sections: ['Executive Summary', 'Market Analysis', 'Strategic Recommendations', 'Implementation Plan', 'Risk Assessment']
    },
    {
      id: 'comprehensive' as ReportFormat,
      title: 'Comprehensive',
      description: 'Full transformation blueprint',
      pages: '20+ pages',
      icon: '📚',
      sections: ['Executive Summary', 'Market Analysis', 'Competitive Landscape', 'Strategic Recommendations', 'Implementation Roadmap', 'Financial Projections', 'Risk Matrix', 'Success Metrics']
    }
  ];

  const calculateOpportunityScore = () => {
    const completedOpportunities = workflowSteps
      .filter(step => completedSteps.includes(step.id))
      .reduce((sum, step) => sum + step.opportunityScore, 0);
    
    const totalPossible = workflowSteps.reduce((sum, step) => sum + step.opportunityScore, 0);
    return Math.round((completedOpportunities / totalPossible) * 100);
  };

  const calculateModuleScore = () => {
    const completedModules = workflowSteps
      .filter(step => completedSteps.includes(step.id))
      .reduce((sum, step) => sum + step.moduleScore, 0);
    
    const totalPossible = workflowSteps.reduce((sum, step) => sum + step.moduleScore, 0);
    return Math.round((completedModules / totalPossible) * 100);
  };

  const calculateComplexityScore = () => {
    const completedComplexity = workflowSteps
      .filter(step => completedSteps.includes(step.id))
      .reduce((sum, step) => sum + step.complexityScore, 0);
    
    const totalPossible = workflowSteps.reduce((sum, step) => sum + step.complexityScore, 0);
    return Math.round((completedComplexity / totalPossible) * 100);
  };

  const generateReportContent = async (attempt = 0) => {
    setIsGenerating(true);
    setProgress(0);
    setError(null);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const reportParams: ReportParameters = {
        reportName: `Nexus Intelligence Report - ${userProfile.role}`,
        tier: userProfile.tier,
        aiPersona: userProfile.persona || 'Regional Economist',
        region: userProfile.region || 'Global',
        industry: userProfile.industry || 'Multi-Sector',
        problemStatement: userProfile.goals?.join(', ') || 'Regional Development Analysis',
        reportLength: reportLength,
        outputFormat: reportFormat,
        engagementStyle: engagementStyle,
        opportunityScore: calculateOpportunityScore(),
        moduleScore: calculateModuleScore(),
        complexityScore: calculateComplexityScore(),
        completedSteps: completedSteps.length,
        totalSteps: workflowSteps.length
      };

      // Generate report
      const reportContent = await generateReport(reportParams);

      let letterContent = '';
      if (includeLetter) {
        // Generate introduction letter
        letterContent = await generateLetter(reportParams);
      }

      clearInterval(progressInterval);
      setProgress(100);

      setTimeout(() => {
        onReportGenerated(reportContent, letterContent);
        setIsGenerating(false);
        setProgress(0);
        setRetryCount(0);
      }, 500);

    } catch (error) {
      console.error('Error generating report:', error);
      clearInterval(progressInterval);
      setProgress(0);

      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';

      if (attempt < 2) {
        setRetryCount(attempt + 1);
        setError(`Generation failed. Retrying... (${attempt + 1}/3)`);
        setTimeout(() => generateReportContent(attempt + 1), 2000);
      } else {
        setError(`Report generation failed after 3 attempts: ${errorMessage}`);
        setIsGenerating(false);
        setRetryCount(0);
      }
    }
  };

  const getEngagementStyleColor = (color: string) => {
    const colors = {
      cyan: 'border-nexus-accent-cyan text-nexus-accent-cyan',
      purple: 'border-nexus-accent-purple text-nexus-accent-purple',
      green: 'border-nexus-accent-green text-nexus-accent-green'
    };
    return colors[color as keyof typeof colors] || colors.cyan;
  };

  const steps = [
    { id: 1, title: 'Report Type', description: 'Choose your engagement style' },
    { id: 2, title: 'Format & Length', description: 'Select report format and length' },
    { id: 3, title: 'AI Configuration', description: 'Configure AI analysis parameters' },
    { id: 4, title: 'Generate Report', description: 'Review and generate your report' }
  ];

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Report Generator</h1>
              <p className="text-sm text-gray-600 mt-1">Create comprehensive intelligence reports with AI-powered analysis</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">{userProfile.name || 'User'}</div>
                <div className="text-xs text-gray-500">{userProfile.role || 'Analyst'}</div>
              </div>
              <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {(userProfile.name || 'U').charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  currentStep >= step.id
                    ? 'bg-indigo-600 border-indigo-600 text-white'
                    : 'border-gray-300 text-gray-400'
                }`}>
                  {currentStep > step.id ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <span className="text-sm font-medium">{step.id}</span>
                  )}
                </div>
                <div className="ml-3">
                  <div className={`text-sm font-medium ${currentStep >= step.id ? 'text-gray-900' : 'text-gray-500'}`}>
                    {step.title}
                  </div>
                  <div className="text-xs text-gray-500">{step.description}</div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-px mx-4 ${currentStep > step.id ? 'bg-indigo-600' : 'bg-gray-300'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-8">
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Choose Engagement Style</h2>
                  <p className="text-gray-600 mb-6">Select the level of analysis depth for your report</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {engagementStyles.map(style => (
                    <button
                      key={style.id}
                      className={`p-6 rounded-lg border-2 transition-all duration-200 text-left ${
                        engagementStyle === style.id
                          ? 'border-indigo-500 bg-indigo-50 shadow-md'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                      }`}
                      onClick={() => setEngagementStyle(style.id)}
                    >
                      <div className="flex items-center mb-3">
                        <span className="text-2xl mr-3">{style.icon}</span>
                        <span className={`font-semibold ${engagementStyle === style.id ? 'text-indigo-700' : 'text-gray-900'}`}>
                          {style.title}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{style.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {style.features.map((feature, index) => (
                          <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Report Format & Length</h2>
                  <p className="text-gray-600 mb-6">Choose the structure and depth of your intelligence report</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Report Format</h3>
                    <div className="space-y-3">
                      {reportFormats.map(format => (
                        <button
                          key={format.id}
                          className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                            reportFormat === format.id
                              ? 'border-indigo-500 bg-indigo-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setReportFormat(format.id)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <span className="text-xl mr-3">{format.icon}</span>
                              <span className={`font-medium ${reportFormat === format.id ? 'text-indigo-700' : 'text-gray-900'}`}>
                                {format.title}
                              </span>
                            </div>
                            <span className="text-sm text-gray-500">{format.pages}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{format.description}</p>
                          <div className="text-xs text-gray-500">
                            Sections: {format.sections.join(', ')}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Report Length</h3>
                    <div className="space-y-3">
                      {[
                        { value: 'concise', label: 'Concise', description: 'Essential insights only', pages: '2-3 pages' },
                        { value: 'standard', label: 'Standard', description: 'Balanced analysis', pages: '5-8 pages' },
                        { value: 'comprehensive', label: 'Comprehensive', description: 'Full detailed analysis', pages: '10-15 pages' }
                      ].map(option => (
                        <button
                          key={option.value}
                          className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                            reportLength === option.value
                              ? 'border-indigo-500 bg-indigo-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setReportLength(option.value as any)}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className={`font-medium ${reportLength === option.value ? 'text-indigo-700' : 'text-gray-900'}`}>
                              {option.label}
                            </span>
                            <span className="text-sm text-gray-500">{option.pages}</span>
                          </div>
                          <p className="text-sm text-gray-600">{option.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">AI Analysis Configuration</h2>
                  <p className="text-gray-600 mb-6">Configure advanced AI parameters for your report</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Analysis Options</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">Include Introduction Letter</div>
                          <div className="text-sm text-gray-600">Generate a professional outreach letter</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={includeLetter}
                            onChange={e => setIncludeLetter(e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Analysis Quality</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-indigo-600">{calculateOpportunityScore()}%</div>
                          <div className="text-xs text-gray-600">Opportunity</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-purple-600">{calculateModuleScore()}%</div>
                          <div className="text-xs text-gray-600">Modules</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-green-600">{calculateComplexityScore()}%</div>
                          <div className="text-xs text-gray-600">Complexity</div>
                        </div>
                      </div>
                      <div className="mt-4 text-sm text-gray-600">
                        Based on {completedSteps.length} completed workflow steps
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Generate Your Report</h2>
                  <p className="text-gray-600 mb-6">Review your configuration and generate the intelligence report</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Report Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Engagement Style</div>
                      <div className="font-medium text-gray-900">
                        {engagementStyles.find(s => s.id === engagementStyle)?.title}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Report Format</div>
                      <div className="font-medium text-gray-900">
                        {reportFormats.find(f => f.id === reportFormat)?.title}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Report Length</div>
                      <div className="font-medium text-gray-900 capitalize">{reportLength}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Include Letter</div>
                      <div className="font-medium text-gray-900">{includeLetter ? 'Yes' : 'No'}</div>
                    </div>
                  </div>
                </div>

                {!isGenerating && (
                  <div className="flex justify-end">
                    <button
                      onClick={generateReportContent}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
                    >
                      Generate Report
                    </button>
                  </div>
                )}

                {isGenerating && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Generating your report...</span>
                      <span className="text-sm text-gray-600">{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="text-sm text-gray-600">
                      This may take a few minutes. Our AI is analyzing data from multiple sources...
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Navigation */}
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              <div className="text-sm text-gray-600">
                Step {currentStep} of {steps.length}
              </div>

              {currentStep < steps.length ? (
                <button
                  onClick={nextStep}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg hover:bg-indigo-700"
                >
                  Next
                </button>
              ) : (
                <div /> // Empty div for layout balance
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};