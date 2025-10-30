import React, { useState } from 'react';
import { SpinnerSmall } from './Spinner.tsx';

interface RiskAssessmentStepProps {
  params: any;
  onChange: (params: any) => void;
  inputStyles: string;
  labelStyles: string;
}

export const RiskAssessmentStep: React.FC<RiskAssessmentStepProps> = ({
  params,
  onChange,
  inputStyles,
  labelStyles,
}) => {
  const [loading, setLoading] = useState(false);
  const [riskAnalysis, setRiskAnalysis] = useState<any>(null);

  const riskCategories = [
    {
      id: 'strategic',
      title: 'Strategic Risks',
      description: 'Partnership alignment, market changes, competitive threats',
      color: 'blue'
    },
    {
      id: 'operational',
      title: 'Operational Risks',
      description: 'Execution challenges, resource constraints, process integration',
      color: 'orange'
    },
    {
      id: 'financial',
      title: 'Financial Risks',
      description: 'Investment requirements, revenue projections, cost overruns',
      color: 'red'
    },
    {
      id: 'compliance',
      title: 'Compliance & Legal Risks',
      description: 'Regulatory requirements, contractual obligations, IP protection',
      color: 'purple'
    },
    {
      id: 'reputational',
      title: 'Reputational Risks',
      description: 'Brand impact, stakeholder perceptions, public relations',
      color: 'green'
    },
    {
      id: 'technological',
      title: 'Technological Risks',
      description: 'Technology integration, cybersecurity, digital transformation',
      color: 'indigo'
    }
  ];

  const mitigationStrategies = [
    { id: 'due_diligence', title: 'Enhanced Due Diligence', description: 'Comprehensive partner evaluation' },
    { id: 'contracts', title: 'Robust Contracts', description: 'Detailed legal agreements and SLAs' },
    { id: 'monitoring', title: 'Performance Monitoring', description: 'Regular progress tracking and KPIs' },
    { id: 'insurance', title: 'Risk Insurance', description: 'Appropriate insurance coverage' },
    { id: 'contingency', title: 'Contingency Planning', description: 'Backup plans and exit strategies' },
    { id: 'diversification', title: 'Risk Diversification', description: 'Multiple partnership options' }
  ];

  const handleRiskCategoryToggle = (categoryId: string) => {
    const currentCategories = params.riskCategories || [];
    const newCategories = currentCategories.includes(categoryId)
      ? currentCategories.filter((id: string) => id !== categoryId)
      : [...currentCategories, categoryId];

    onChange({ ...params, riskCategories: newCategories });
  };

  const handleMitigationToggle = (strategyId: string) => {
    const currentStrategies = params.mitigationStrategies || [];
    const newStrategies = currentStrategies.includes(strategyId)
      ? currentStrategies.filter((id: string) => id !== strategyId)
      : [...currentStrategies, strategyId];

    onChange({ ...params, mitigationStrategies: newStrategies });
  };

  const handleAssessRisks = async () => {
    if (!params.problemStatement?.trim()) {
      return;
    }

    setLoading(true);
    try {
      // Simulate risk assessment analysis
      await new Promise(resolve => setTimeout(resolve, 2500));

      const analysis = {
        overallRiskLevel: 'Medium-High',
        riskBreakdown: {
          strategic: { level: 'Medium', impact: 'High', probability: 'Medium' },
          operational: { level: 'Medium', impact: 'Medium', probability: 'High' },
          financial: { level: 'High', impact: 'High', probability: 'Medium' },
          compliance: { level: 'Low', impact: 'High', probability: 'Low' },
          reputational: { level: 'Medium', impact: 'High', probability: 'Medium' },
          technological: { level: 'Medium', impact: 'Medium', probability: 'Medium' }
        },
        keyRisks: [
          'Partner capability gaps in execution',
          'Cultural misalignment affecting collaboration',
          'Market volatility impacting financial projections',
          'Technology integration challenges'
        ],
        recommendedActions: [
          'Conduct thorough partner due diligence',
          'Establish clear performance metrics and milestones',
          'Develop detailed risk mitigation plans',
          'Create contingency plans for major risks'
        ],
        riskScore: 6.8
      };

      setRiskAnalysis(analysis);
      onChange({ ...params, riskAssessment: analysis });
    } catch (error) {
      console.error('Risk assessment failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Risk Assessment & Mitigation</h3>
        <p className="text-gray-600 mb-6">
          Identify, evaluate, and develop mitigation strategies for potential risks in your partnership.
          This comprehensive assessment will help you make informed decisions and prepare contingency plans.
        </p>
      </div>

      <div className="space-y-4">
        {/* Risk Categories */}
        <div>
          <label className={labelStyles}>Risk Categories to Assess</label>
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mt-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {riskCategories.map((category) => (
                <label
                  key={category.id}
                  className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-all duration-200 border ${
                    (params.riskCategories || []).includes(category.id)
                      ? `border-${category.color}-500 bg-${category.color}-500/5 shadow-md`
                      : 'border-gray-200 hover:border-gray-400 bg-white hover:bg-gray-50/50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={(params.riskCategories || []).includes(category.id)}
                    onChange={() => handleRiskCategoryToggle(category.id)}
                    className={`mt-1 h-4 w-4 text-${category.color}-600 focus:ring-${category.color}-500 focus:ring-offset-2`}
                  />
                  <div className="flex-grow">
                    <div className={`font-semibold text-${category.color}-800`}>{category.title}</div>
                    <div className="text-sm text-gray-600 mt-1">{category.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Risk Assessment Input */}
        <div>
          <label className={labelStyles}>Specific Risks to Consider</label>
          <textarea
            value={params.specificRisks || ''}
            onChange={(e) => onChange({ ...params, specificRisks: e.target.value })}
            placeholder="Describe any specific risks you've identified or want to assess (e.g., currency fluctuations, political instability, technology obsolescence)"
            className={`${inputStyles} resize-none`}
            rows={4}
          />
        </div>

        {/* Mitigation Strategies */}
        <div>
          <label className={labelStyles}>Risk Mitigation Strategies</label>
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mt-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mitigationStrategies.map((strategy) => (
                <label
                  key={strategy.id}
                  className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-all duration-200 border ${
                    (params.mitigationStrategies || []).includes(strategy.id)
                      ? 'border-green-500 bg-green-500/5 shadow-md'
                      : 'border-gray-200 hover:border-green-400 bg-white hover:bg-gray-50/50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={(params.mitigationStrategies || []).includes(strategy.id)}
                    onChange={() => handleMitigationToggle(strategy.id)}
                    className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 focus:ring-offset-2"
                  />
                  <div className="flex-grow">
                    <div className="font-semibold text-gray-800">{strategy.title}</div>
                    <div className="text-sm text-gray-600 mt-1">{strategy.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Assessment Button */}
        <div className="flex justify-center">
          <button
            onClick={handleAssessRisks}
            disabled={loading || !params.problemStatement?.trim()}
            className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold rounded-xl shadow-lg hover:from-red-700 hover:to-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <SpinnerSmall />
                Assessing Risks...
              </>
            ) : (
              'Conduct Risk Assessment'
            )}
          </button>
        </div>

        {/* Risk Analysis Results */}
        {riskAnalysis && (
          <div className="bg-red-50 p-6 rounded-xl border border-red-200">
            <h4 className="text-xl font-semibold text-red-800 mb-4">Risk Assessment Results</h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg border border-red-200 text-center">
                <h5 className="font-semibold text-gray-800 mb-2">Overall Risk Level</h5>
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${getRiskColor(riskAnalysis.overallRiskLevel)}`}>
                  {riskAnalysis.overallRiskLevel}
                </span>
              </div>
              <div className="bg-white p-4 rounded-lg border border-red-200 text-center">
                <h5 className="font-semibold text-gray-800 mb-2">Risk Score</h5>
                <span className="text-2xl font-bold text-red-600">{riskAnalysis.riskScore}/10</span>
              </div>
              <div className="bg-white p-4 rounded-lg border border-red-200 text-center">
                <h5 className="font-semibold text-gray-800 mb-2">Risk Categories</h5>
                <span className="text-2xl font-bold text-gray-600">{Object.keys(riskAnalysis.riskBreakdown).length}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg border border-red-200">
                <h5 className="font-semibold text-gray-800 mb-3">Key Risks Identified</h5>
                <ul className="space-y-2">
                  {riskAnalysis.keyRisks.map((risk: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full mt-2"></span>
                      <span className="text-sm text-gray-700">{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg border border-red-200">
                <h5 className="font-semibold text-gray-800 mb-3">Recommended Actions</h5>
                <ul className="space-y-2">
                  {riskAnalysis.recommendedActions.map((action: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                      <span className="text-sm text-gray-700">{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <h5 className="font-semibold text-gray-800 mb-3">Risk Breakdown by Category</h5>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(riskAnalysis.riskBreakdown).map(([category, details]: [string, any]) => (
                  <div key={category} className="bg-white p-3 rounded-lg border border-red-200">
                    <div className="text-sm font-semibold text-gray-800 capitalize mb-1">{category}</div>
                    <div className={`text-xs px-2 py-1 rounded-full inline-block ${getRiskColor(details.level)}`}>
                      {details.level}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Contingency Plans */}
        <div>
          <label className={labelStyles}>Contingency Plans & Exit Strategies</label>
          <textarea
            value={params.contingencyPlans || ''}
            onChange={(e) => onChange({ ...params, contingencyPlans: e.target.value })}
            placeholder="Describe your contingency plans for major risk scenarios and exit strategies if needed..."
            className={`${inputStyles} resize-none`}
            rows={4}
          />
        </div>
      </div>
    </div>
  );
};