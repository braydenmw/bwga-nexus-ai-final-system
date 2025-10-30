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
  const [targetRegion, setTargetRegion] = useState(params.region || '');
  const [targetCountry, setTargetCountry] = useState(() => {
    if (params.region) {
      const parts = params.region.split(',').map((p: string) => p.trim());
      return parts[parts.length - 1];
    }
    return '';
  });

  const handleRegionChange = (region: string) => {
    setTargetRegion(region);
    setTargetCountry('');
    onChange({ ...params, region: '' });
  };

  const handleCountryChange = (country: string) => {
    setTargetCountry(country);
    const newRegion = [targetRegion, country].filter(Boolean).join(', ');
    onChange({ ...params, region: newRegion });
  };

  const handleIndustryToggle = (industryId: string) => {
    const currentIndustries = params.industry || [];
    const newIndustries = currentIndustries.includes(industryId)
      ? currentIndustries.filter((id: string) => id !== industryId)
      : [...currentIndustries, industryId];

    onChange({ ...params, industry: newIndustries });
  };

  const handleMarketResearch = async () => {
    if (!targetCountry || (params.industry || []).length === 0) {
      return;
    }

    setLoading(true);
    try {
      // Simulate market research API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock market insights
      const insights = {
        marketSize: `$${Math.floor(Math.random() * 500) + 100}B`,
        growthRate: `${(Math.random() * 8 + 2).toFixed(1)}% CAGR`,
        keyOpportunities: [
          'Digital transformation initiatives',
          'Sustainable development projects',
          'Infrastructure modernization',
          'Technology adoption programs'
        ],
        competitiveLandscape: 'Moderate competition with opportunities for specialized partnerships'
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
          Conduct market research and identify strategic opportunities in your target region.
          This analysis will inform your partnership strategy and help prioritize opportunities.
        </p>
      </div>

      <div className="space-y-4">
        {/* Target Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelStyles}>Target Region</label>
            <select
              value={targetRegion}
              onChange={(e) => handleRegionChange(e.target.value)}
              className={inputStyles}
            >
              <option value="">Select Region</option>
              {REGIONS_AND_COUNTRIES.map(region => (
                <option key={region.name} value={region.name}>{region.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelStyles}>Target Country</label>
            <select
              value={targetCountry}
              onChange={(e) => handleCountryChange(e.target.value)}
              disabled={!targetRegion}
              className={`${inputStyles} disabled:bg-gray-100 disabled:text-gray-400`}
            >
              <option value="">Select Country</option>
              {targetRegion && REGIONS_AND_COUNTRIES
                .find(r => r.name === targetRegion)?.countries
                .map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
            </select>
          </div>
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
            disabled={loading || !targetCountry || (params.industry || []).length === 0}
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