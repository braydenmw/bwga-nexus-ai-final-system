import React from 'react';
import { BriefcaseIcon, ChartBarIcon, GlobeIcon, ShieldCheckIcon } from './Icons.tsx';

const TIERS = [
  {
    id: 'market-entry',
    title: 'Market Entry',
    description: 'Analyze new market opportunities and entry strategies.',
    icon: <GlobeIcon className="h-8 w-8 text-blue-600" />,
  },
  {
    id: 'growth',
    title: 'Growth & Expansion',
    description: 'Identify growth paths and expansion opportunities.',
    icon: <ChartBarIcon className="h-8 w-8 text-green-600" />,
  },
  {
    id: 'risk',
    title: 'Risk & Compliance',
    description: 'Assess risks and compliance requirements.',
    icon: <ShieldCheckIcon className="h-8 w-8 text-red-600" />,
  },
];

const INDUSTRIES = [
  'Technology', 'Finance', 'Healthcare', 'Energy', 'Manufacturing', 'Agriculture', 'Education', 'Transport', 'Retail', 'Tourism'
];

export default function OpportunityStep({ params, onChange }) {
  const handleTierSelect = (tierId) => {
    onChange({ ...params, tier: tierId });
  };
  const handleIndustrySelect = (industry) => {
    onChange({ ...params, industry });
  };

  return (
    <section className="space-y-10">
      <h2 className="text-2xl font-bold text-blue-900 mb-4">Select Analysis Tier</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TIERS.map(tier => (
          <button
            key={tier.id}
            className={`flex flex-col items-center p-8 bg-white rounded-2xl shadow-xl border-2 transition-all duration-200 hover:border-blue-500 focus:border-blue-700 ${params.tier === tier.id ? 'border-blue-700' : 'border-transparent'}`}
            onClick={() => handleTierSelect(tier.id)}
          >
            {tier.icon}
            <span className="mt-4 text-lg font-semibold text-gray-900">{tier.title}</span>
            <span className="mt-2 text-gray-500 text-sm text-center">{tier.description}</span>
          </button>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-blue-900 mt-12 mb-4">Select Industry Sector</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {INDUSTRIES.map(industry => (
          <button
            key={industry}
            className={`flex flex-col items-center p-4 bg-white rounded-xl shadow-lg border transition-all duration-200 hover:border-blue-400 focus:border-blue-600 ${params.industry === industry ? 'border-blue-600' : 'border-transparent'}`}
            onClick={() => handleIndustrySelect(industry)}
          >
            <BriefcaseIcon className="h-6 w-6 text-blue-400 mb-2" />
            <span className="text-sm font-medium text-gray-700">{industry}</span>
          </button>
        ))}
      </div>
    </section>
  );
}