import React, { useState, useEffect } from 'react';
import { NSILProcessor } from './NSILProcessor.ts';
import ReportViewer from './ReportViewer.tsx';
import type { ReportParameters } from '../types.ts';
import { SpinnerSmall } from './Spinner.tsx';

// Define NSIL types locally since they're not in the main types file
interface NSIL_ExecutiveSummary {
  overall_score: number;
  key_findings: string[];
  strategic_outlook: string;
}

interface NSIL_MatchScore {
  value: number;
  confidence: string;
  rationale: string;
}

interface NSIL_Match {
  company_profile: {
    name: string;
    origin: string;
    size: string;
    key_technologies: string[];
    target_markets: string[];
    strategic_focus: string;
  };
  synergy_analysis: {
    strategic_alignment: number;
    complementary_strengths: string[];
    competitive_advantages: string[];
    risk_factors: string[];
    mitigation_strategies: string[];
  };
  risk_map: {
    overall_risk: string;
    risk_categories: {
      geopolitical: { level: number; factors: string[] };
      market: { level: number; factors: string[] };
      operational: { level: number; factors: string[] };
      regulatory: { level: number; factors: string[] };
    };
    contingency_plans: string[];
  };
}

interface NSIL_Report {
  mode: string;
  executive_summary: NSIL_ExecutiveSummary;
  source_attribution: string[];
  match_score?: NSIL_MatchScore;
  match?: NSIL_Match;
  lq_analysis?: any[];
  cluster_analysis?: any[];
  future_cast?: any;
  financial_feasibility?: any;
  development_bank_alignment?: any[];
  climate_impact?: any;
  geopolitical_forecast?: any;
  policy_recommendations?: any[];
  esg_framework?: any;
}

type AnalysisMode = 'matchmaking' | 'market_analysis' | 'g2g_alignment';

interface NSILPresentationStepProps {
  params: any;
  onChange: (params: any) => void;
}

export const NSILPresentationStep: React.FC<NSILPresentationStepProps> = ({
  params,
  onChange,
}) => {
  const [nsilReport, setNsilReport] = useState<NSIL_Report | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reportContent, setReportContent] = useState<string>('');

  // Determine analysis mode based on accumulated parameters
  const getAnalysisMode = (): AnalysisMode => {
    if (params.problemStatement?.toLowerCase().includes('partnership') ||
        params.problemStatement?.toLowerCase().includes('matchmaking')) {
      return 'matchmaking';
    }
    if (params.problemStatement?.toLowerCase().includes('government') ||
        params.problemStatement?.toLowerCase().includes('g2g')) {
      return 'g2g_alignment';
    }
    return 'market_analysis';
  };

  // Generate NSIL report when component mounts or parameters change
  useEffect(() => {
    const generateReport = async () => {
      if (!params.rroiResult || !params.tptResult || !params.seamResult) {
        setError("Please complete all previous steps before generating the NSIL report.");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Prepare report parameters with all accumulated data
        const reportParams: ReportParameters = {
          ...params,
          // Include results from all previous steps
          rroiResult: params.rroiResult,
          tptResult: params.tptResult,
          seamResult: params.seamResult,
        };

        const mode = getAnalysisMode();
        const report = await NSILProcessor.generateNSILReport(reportParams, mode);

        // Serialize to XML for display
        const xmlContent = NSILProcessor.serializeToXML(report);

        setNsilReport(report);
        setReportContent(xmlContent);
        onChange({ ...params, nsilReport: report, reportContent: xmlContent });

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to generate NSIL report.');
      } finally {
        setLoading(false);
      }
    };

    if (!nsilReport && !loading) {
      generateReport();
    }
  }, [params, nsilReport, loading, onChange]);

  const handleStartSymbiosis = (context: any) => {
    // This would integrate with the symbiosis chat system
    console.log('Starting symbiosis chat:', context);
  };

  const handleGenerateLetter = () => {
    // This would open the letter generator modal
    console.log('Generating outreach letter');
  };

  const handleReset = () => {
    // Reset to start new report
    setNsilReport(null);
    setReportContent('');
    onChange({ ...params, nsilReport: null, reportContent: '' });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <SpinnerSmall />
        <p className="text-lg font-semibold text-gray-700">Generating Intelligence Blueprint...</p>
        <p className="text-sm text-gray-500 text-center max-w-md">
          Synthesizing NSIL framework with your accumulated analysis results from Context, RROI, TPT, and SEAM steps.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Report Generation Failed</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!nsilReport || !reportContent) {
    return (
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Preparing NSIL Report...</h3>
          <p className="text-gray-600">Please wait while we prepare your intelligence blueprint.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Intelligence Blueprint Complete</h2>
        <p className="text-lg text-gray-600">
          Your comprehensive NSIL report has been generated using the BWGA Nexus AI framework,
          integrating results from all analysis steps.
        </p>
      </div>

      <ReportViewer
        content={reportContent}
        parameters={params}
        isGenerating={false}
        onReset={handleReset}
        onStartSymbiosis={handleStartSymbiosis}
        onGenerateLetter={handleGenerateLetter}
        error={null}
      />
    </div>
  );
};