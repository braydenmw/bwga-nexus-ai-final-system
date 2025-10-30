import React, { useState } from 'react';
import { SpinnerSmall } from './Spinner.tsx';

interface PartnershipIntentStepProps {
  params: any;
  onChange: (params: any) => void;
  inputStyles: string;
  labelStyles: string;
}

export const PartnershipIntentStep: React.FC<PartnershipIntentStepProps> = ({
  params,
  onChange,
  inputStyles,
  labelStyles,
}) => {
  const [loading, setLoading] = useState(false);
  const [partnershipAnalysis, setPartnershipAnalysis] = useState<any>(null);

  const partnershipTypes = [
    { id: 'strategic_alliance', title: 'Strategic Alliance', description: 'Long-term partnership for mutual growth' },
    { id: 'joint_venture', title: 'Joint Venture', description: 'Shared ownership and operations' },
    { id: 'technology_transfer', title: 'Technology Transfer', description: 'Knowledge and technology exchange' },
    { id: 'market_expansion', title: 'Market Expansion', description: 'Access to new markets and customers' },
    { id: 'supply_chain', title: 'Supply Chain Integration', description: 'Integrated production and distribution' },
    { id: 'innovation', title: 'Innovation Partnership', description: 'Collaborative R&D and development' }
  ];

  const successMetrics = [
    { id: 'revenue_growth', title: 'Revenue Growth', description: 'Target revenue increase percentage' },
    { id: 'market_share', title: 'Market Share', description: 'Target market share expansion' },
    { id: 'cost_reduction', title: 'Cost Reduction', description: 'Operational cost reduction targets' },
    { id: 'time_to_market', title: 'Time to Market', description: 'Product development acceleration' },
    { id: 'customer_satisfaction', title: 'Customer Satisfaction', description: 'Improved customer metrics' },
    { id: 'innovation_output', title: 'Innovation Output', description: 'New products/services launched' }
  ];

  const handlePartnershipTypeToggle = (typeId: string) => {
    const currentTypes = params.partnershipTypes || [];
    const newTypes = currentTypes.includes(typeId)
      ? currentTypes.filter((id: string) => id !== typeId)
      : [...currentTypes, typeId];

    onChange({ ...params, partnershipTypes: newTypes });
  };

  const handleSuccessMetricToggle = (metricId: string) => {
    const currentMetrics = params.successMetrics || [];
    const newMetrics = currentMetrics.includes(metricId)
      ? currentMetrics.filter((id: string) => id !== metricId)
      : [...currentMetrics, metricId];

    onChange({ ...params, successMetrics: newMetrics });
  };

  const handleAnalyzeIntent = async () => {
    if (!params.idealPartnerProfile?.trim() || !params.problemStatement?.trim()) {
      return;
    }

    setLoading(true);
    try {
      // Simulate partnership analysis
      await new Promise(resolve => setTimeout(resolve, 2000));

      const analysis = {
        partnershipStrategy: 'Based on your objectives, a strategic alliance approach is recommended',
        keyRequirements: [
          'Technical expertise alignment',
          'Cultural fit and values alignment',
          'Financial stability and commitment',
          'Geographic presence and market access'
        ],
        riskConsiderations: [
          'Intellectual property protection',
          'Contractual obligations and exit clauses',
          'Cultural integration challenges',
          'Performance measurement and accountability'
        ],
        recommendedApproach: 'Start with a pilot project to test compatibility before full commitment'
      };

      setPartnershipAnalysis(analysis);
      onChange({ ...params, partnershipAnalysis: analysis });
    } catch (error) {
      console.error('Partnership analysis failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Partnership Intent Clarification</h3>
        <p className="text-gray-600 mb-6">
          Define your partnership goals, preferred collaboration models, and success criteria.
          This will help identify the most suitable partners and structure effective relationships.
        </p>
      </div>

      <div className="space-y-4">
        {/* Partnership Goals */}
        <div>
          <label className={labelStyles}>Partnership Goals & Objectives</label>
          <textarea
            value={params.partnershipGoals || ''}
            onChange={(e) => onChange({ ...params, partnershipGoals: e.target.value })}
            placeholder="What do you hope to achieve through this partnership? (e.g., expand market reach, access new technologies, reduce costs, accelerate innovation)"
            className={`${inputStyles} resize-none`}
            rows={4}
          />
        </div>

        {/* Partnership Types */}
        <div>
          <label className={labelStyles}>Preferred Partnership Types</label>
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mt-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {partnershipTypes.map((type) => (
                <label
                  key={type.id}
                  className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-all duration-200 border ${
                    (params.partnershipTypes || []).includes(type.id)
                      ? 'border-blue-500 bg-blue-500/5 shadow-md'
                      : 'border-gray-200 hover:border-blue-400 bg-white hover:bg-gray-50/50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={(params.partnershipTypes || []).includes(type.id)}
                    onChange={() => handlePartnershipTypeToggle(type.id)}
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 focus:ring-offset-2"
                  />
                  <div className="flex-grow">
                    <div className="font-semibold text-gray-800">{type.title}</div>
                    <div className="text-sm text-gray-600 mt-1">{type.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Success Metrics */}
        <div>
          <label className={labelStyles}>Success Metrics & KPIs</label>
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mt-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {successMetrics.map((metric) => (
                <label
                  key={metric.id}
                  className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-all duration-200 border ${
                    (params.successMetrics || []).includes(metric.id)
                      ? 'border-green-500 bg-green-500/5 shadow-md'
                      : 'border-gray-200 hover:border-green-400 bg-white hover:bg-gray-50/50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={(params.successMetrics || []).includes(metric.id)}
                    onChange={() => handleSuccessMetricToggle(metric.id)}
                    className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 focus:ring-offset-2"
                  />
                  <div className="flex-grow">
                    <div className="font-semibold text-gray-800">{metric.title}</div>
                    <div className="text-sm text-gray-600 mt-1">{metric.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Partnership Criteria */}
        <div>
          <label className={labelStyles}>Partnership Criteria & Requirements</label>
          <textarea
            value={params.partnershipCriteria || ''}
            onChange={(e) => onChange({ ...params, partnershipCriteria: e.target.value })}
            placeholder="What specific criteria must potential partners meet? (e.g., minimum revenue, years in business, certifications, geographic presence)"
            className={`${inputStyles} resize-none`}
            rows={4}
          />
        </div>

        {/* Analysis Button */}
        <div className="flex justify-center">
          <button
            onClick={handleAnalyzeIntent}
            disabled={loading || !params.idealPartnerProfile?.trim() || !params.problemStatement?.trim()}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold rounded-xl shadow-lg hover:from-purple-700 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <SpinnerSmall />
                Analyzing Partnership Intent...
              </>
            ) : (
              'Analyze Partnership Strategy'
            )}
          </button>
        </div>

        {/* Partnership Analysis Results */}
        {partnershipAnalysis && (
          <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
            <h4 className="text-xl font-semibold text-purple-800 mb-4">Partnership Strategy Analysis</h4>

            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border border-purple-200">
                <h5 className="font-semibold text-gray-800 mb-2">Recommended Strategy</h5>
                <p className="text-purple-700">{partnershipAnalysis.partnershipStrategy}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <h5 className="font-semibold text-gray-800 mb-3">Key Requirements</h5>
                  <ul className="space-y-2">
                    {partnershipAnalysis.keyRequirements.map((req: string, index: number) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        <span className="text-sm text-gray-700">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <h5 className="font-semibold text-gray-800 mb-3">Risk Considerations</h5>
                  <ul className="space-y-2">
                    {partnershipAnalysis.riskConsiderations.map((risk: string, index: number) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        <span className="text-sm text-gray-700">{risk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-purple-100 p-4 rounded-lg border border-purple-300">
                <h5 className="font-semibold text-purple-800 mb-2">Recommended Approach</h5>
                <p className="text-sm text-purple-700">{partnershipAnalysis.recommendedApproach}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};