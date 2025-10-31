import React, { useState } from 'react';
import { REGIONS_AND_COUNTRIES, INDUSTRIES } from '../constants.tsx';
import { CustomIndustryIcon } from './Icons.tsx';
import { SpinnerSmall } from './Spinner.tsx';

interface OpportunityAssessmentStepProps {
  params: any;
  onChange: (params: any) => void;
  inputStyles: string;
  labelStyles: string;
}

export const OpportunityAssessmentStep: React.FC<OpportunityAssessmentStepProps> = ({
  params,
  onChange,
  inputStyles,
  labelStyles,
}) => {
  const [loading, setLoading] = useState(false);
  const [marketInsights, setMarketInsights] = useState<any>(null);

  const handleIndustryToggle = (industryId: string) => {
    const currentIndustries = params.industry || [];
    const newIndustries = currentIndustries.includes(industryId)
      ? currentIndustries.filter((id: string) => id !== industryId)
      : [...currentIndustries, industryId];

    onChange({ ...params, industry: newIndustries });
  };

  const handleMarketResearch = async () => {
    // Note: Region selection now happens in Step 2 (Strategic Context)
    // For market research, we'll use any region that might be set, or make it region-optional
    if ((params.industry || []).length === 0) {
      return;
    }

    setLoading(true);
    try {
      // Simulate market research API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Enhanced mock market insights based on selected industries
      const selectedIndustries = params.industry || [];
      const industryNames = selectedIndustries.map(id => {
        const industry = INDUSTRIES.find(i => i.id === id);
        return industry ? industry.title.toLowerCase() : id;
      }).join(', ');

      const insights = {
        marketSize: `$${Math.floor(Math.random() * 500) + 100}B`,
        growthRate: `${(Math.random() * 8 + 2).toFixed(1)}% CAGR`,
        keyOpportunities: selectedIndustries.length > 0 ? [
          `Digital transformation in ${industryNames}`,
          `Sustainable development projects for ${industryNames} sector`,
          `Infrastructure modernization opportunities`,
          `Technology adoption programs in ${industryNames}`
        ] : [
          'Digital transformation initiatives',
          'Sustainable development projects',
          'Infrastructure modernization',
          'Technology adoption programs'
        ],
        competitiveLandscape: selectedIndustries.includes('Custom')
          ? 'Niche market with specialized opportunities and lower competition'
          : 'Moderate competition with opportunities for specialized partnerships'
      };

      setMarketInsights(insights);
      onChange({ ...params, marketResearch: insights });
    } catch (error) {
      console.error('Market research failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Opportunity Assessment</h3>
        <p className="text-gray-600 mb-6">
          Identify your industry interests and conduct preliminary market research.
          This analysis will inform your partnership strategy and help prioritize opportunities.
          Geographic focus will be configured in the next step.
        </p>
      </div>

      <div className="space-y-4">
        {/* Region Note */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-blue-600">ℹ️</span>
            <h4 className="font-semibold text-blue-800">Region Selection</h4>
          </div>
          <p className="text-sm text-blue-700">
            Geographic focus and region selection will be configured in the next step (Strategic Context).
            For now, let's focus on identifying your industry interests and conducting preliminary market research.
          </p>
        </div>

        {/* Industry Focus */}
        <div>
          <label className={labelStyles}>Industry Focus Areas</label>
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mt-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {INDUSTRIES.map((industry) => (
                <button
                  key={industry.id}
                  onClick={() => handleIndustryToggle(industry.id)}
                  className={`flex flex-col items-center p-4 rounded-xl border transition-all duration-200 hover:border-blue-400 focus:border-blue-600 ${
                    (params.industry || []).includes(industry.id)
                      ? 'border-blue-600 bg-blue-500/5 scale-105 shadow-lg ring-2 ring-blue-500/20'
                      : 'border-gray-200 hover:border-blue-400 bg-white hover:bg-gray-50/50'
                  }`}
                >
                  <industry.icon className={`w-8 h-8 mb-3 transition-colors duration-200 ${
                    (params.industry || []).includes(industry.id)
                      ? 'text-blue-600'
                      : 'text-gray-500 group-hover:text-gray-700'
                  }`} />
                  <span className="font-semibold text-gray-800 text-sm leading-tight">{industry.title}</span>
                </button>
              ))}
              <button
                onClick={() => handleIndustryToggle('Custom')}
                className={`flex flex-col items-center p-4 rounded-xl border transition-all duration-200 hover:border-gray-400 focus:border-gray-600 ${
                  (params.industry || []).includes('Custom')
                    ? 'border-gray-800 bg-gray-500/5 scale-105 shadow-lg ring-2 ring-gray-800/20'
                    : 'border-gray-200 hover:border-gray-400 bg-white hover:bg-gray-50/50'
                }`}
              >
                <CustomIndustryIcon className={`w-8 h-8 mb-3 transition-colors duration-200 ${
                  (params.industry || []).includes('Custom')
                    ? 'text-gray-800'
                    : 'text-gray-500 group-hover:text-gray-700'
                }`} />
                <span className="font-semibold text-gray-800 text-sm leading-tight">Custom</span>
              </button>
            </div>
          </div>
        </div>

        {/* Market Research Button */}
        <div className="flex justify-center">
          <button
            onClick={handleMarketResearch}
            disabled={loading || (params.industry || []).length === 0}
            className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white font-bold rounded-xl shadow-lg hover:from-green-700 hover:to-green-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <SpinnerSmall />
                Analyzing Market Opportunities...
              </>
            ) : (
              'Conduct Market Research'
            )}
          </button>
        </div>

        {/* Market Insights Display */}
        {marketInsights && (
          <div className="bg-green-50 p-6 rounded-xl border border-green-200">
            <h4 className="text-xl font-semibold text-green-800 mb-4">Market Research Results</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg border border-green-200">
                <h5 className="font-semibold text-gray-800 mb-2">Market Size</h5>
                <p className="text-2xl font-bold text-green-600">{marketInsights.marketSize}</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-green-200">
                <h5 className="font-semibold text-gray-800 mb-2">Growth Rate</h5>
                <p className="text-2xl font-bold text-green-600">{marketInsights.growthRate}</p>
              </div>
            </div>
            <div className="mt-6">
              <h5 className="font-semibold text-gray-800 mb-3">Key Opportunities</h5>
              <ul className="space-y-2">
                {marketInsights.keyOpportunities.map((opportunity: string, index: number) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-gray-700">{opportunity}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4 p-3 bg-green-100 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>Competitive Landscape:</strong> {marketInsights.competitiveLandscape}
              </p>
            </div>
          </div>
        )}

        {/* Opportunity Analysis */}
        <div>
          <label className={labelStyles}>Opportunity Analysis Summary</label>
          <textarea
            value={params.opportunityAnalysis || ''}
            onChange={(e) => onChange({ ...params, opportunityAnalysis: e.target.value })}
            placeholder="Summarize the key opportunities identified and your strategic priorities..."
            className={`${inputStyles} resize-none`}
            rows={4}
          />
        </div>
      </div>
    </div>
  );
};