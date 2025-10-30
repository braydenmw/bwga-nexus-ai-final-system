import React from 'react';
import type { ReportParameters } from '../types';
import { REGIONS_AND_COUNTRIES, ORGANIZATION_TYPES, INDUSTRIES, TIERS_BY_ORG_TYPE } from '../constants.tsx';
import { BriefcaseIcon, GlobeIcon, ChartBarIcon, ShieldCheckIcon } from './Icons.tsx';

interface ContextEntryStepProps {
    params: ReportParameters;
    handleChange: (field: string | number | symbol, value: any) => void;
    inputStyles: string;
    labelStyles: string;
}

const TIERS = [
   // Government-Focused Tiers
   {
     id: 'policy-reform',
     title: 'Policy Development & Reform',
     description: 'Design legislative frameworks and regulatory changes for regional development.',
     icon: <BriefcaseIcon className="h-8 w-8 text-blue-600" />,
     category: 'government',
     confidence: 'high'
   },
   {
     id: 'infrastructure',
     title: 'Infrastructure Investment & Planning',
     description: 'Analyze ports, roads, and digital infrastructure development opportunities.',
     icon: <GlobeIcon className="h-8 w-8 text-green-600" />,
     category: 'government',
     confidence: 'high'
   },
   {
     id: 'economic-development',
     title: 'Regional Economic Development',
     description: 'Create job growth and industry cluster development strategies.',
     icon: <ChartBarIcon className="h-8 w-8 text-purple-600" />,
     category: 'government',
     confidence: 'high'
   },
   {
     id: 'security-stability',
     title: 'Security & Stability Analysis',
     description: 'Assess crime, terrorism, and political risk factors.',
     icon: <ShieldCheckIcon className="h-8 w-8 text-red-600" />,
     category: 'government',
     confidence: 'medium'
   },
   {
     id: 'ppp-design',
     title: 'Public-Private Partnership Design',
     description: 'Structure and implement effective PPP frameworks.',
     icon: <BriefcaseIcon className="h-8 w-8 text-indigo-600" />,
     category: 'government',
     confidence: 'medium'
   },

   // Corporate-Focused Tiers
   {
     id: 'market-entry',
     title: 'Market Entry & Expansion Strategy',
     description: 'Develop new market penetration and expansion strategies.',
     icon: <GlobeIcon className="h-8 w-8 text-blue-600" />,
     category: 'corporate',
     confidence: 'high'
   },
   {
     id: 'supply-chain',
     title: 'Supply Chain & Logistics Optimization',
     description: 'Design and optimize distribution and logistics networks.',
     icon: <ChartBarIcon className="h-8 w-8 text-green-600" />,
     category: 'corporate',
     confidence: 'high'
   },
   {
     id: 'manufacturing-ops',
     title: 'Manufacturing & Operations Setup',
     description: 'Plan facility locations and operational frameworks.',
     icon: <BriefcaseIcon className="h-8 w-8 text-orange-600" />,
     category: 'corporate',
     confidence: 'high'
   },
   {
     id: 'technology-innovation',
     title: 'Technology & Innovation Investment',
     description: 'Guide digital transformation and R&D investments.',
     icon: <GlobeIcon className="h-8 w-8 text-cyan-600" />,
     category: 'corporate',
     confidence: 'medium'
   },
   {
     id: 'regulatory-compliance',
     title: 'Regulatory Compliance & Risk Management',
     description: 'Navigate legal frameworks and compliance requirements.',
     icon: <ShieldCheckIcon className="h-8 w-8 text-red-600" />,
     category: 'corporate',
     confidence: 'medium'
   },

   // Banking & Financial Tiers
   {
     id: 'investment-risk',
     title: 'Investment Risk Assessment',
     description: 'Conduct comprehensive due diligence and risk modeling.',
     icon: <ShieldCheckIcon className="h-8 w-8 text-red-600" />,
     category: 'banking',
     confidence: 'high'
   },
   {
     id: 'regulatory-analysis',
     title: 'Regulatory Compliance Analysis',
     description: 'Navigate financial regulations and reporting requirements.',
     icon: <BriefcaseIcon className="h-8 w-8 text-blue-600" />,
     category: 'banking',
     confidence: 'high'
   },
   {
     id: 'market-stability',
     title: 'Market Stability & Economic Indicators',
     description: 'Analyze economic forecasting and market stability.',
     icon: <ChartBarIcon className="h-8 w-8 text-green-600" />,
     category: 'banking',
     confidence: 'high'
   },
   {
     id: 'credit-financing',
     title: 'Credit & Financing Opportunities',
     description: 'Structure lending and investment frameworks.',
     icon: <GlobeIcon className="h-8 w-8 text-purple-600" />,
     category: 'banking',
     confidence: 'medium'
   },
   {
     id: 'financial-services',
     title: 'Financial Services Expansion',
     description: 'Develop new financial products and services.',
     icon: <ChartBarIcon className="h-8 w-8 text-indigo-600" />,
     category: 'banking',
     confidence: 'medium'
   },

   // Global Trade & Economic Tiers
   {
     id: 'trade-corridors',
     title: 'Trade Corridor Analysis',
     description: 'Optimize shipping routes and customs procedures.',
     icon: <GlobeIcon className="h-8 w-8 text-blue-600" />,
     category: 'trade',
     confidence: 'high'
   },
   {
     id: 'tariff-policy',
     title: 'Tariff & Trade Policy Impact',
     description: 'Analyze international trade regulations and tariffs.',
     icon: <ShieldCheckIcon className="h-8 w-8 text-red-600" />,
     category: 'trade',
     confidence: 'high'
   },
   {
     id: 'geopolitical-risk',
     title: 'Geopolitical Risk Assessment',
     description: 'Evaluate international relations and political impacts.',
     icon: <BriefcaseIcon className="h-8 w-8 text-orange-600" />,
     category: 'trade',
     confidence: 'high'
   },
   {
     id: 'currency-markets',
     title: 'Currency & Financial Market Analysis',
     description: 'Assess FX risk and financial market conditions.',
     icon: <ChartBarIcon className="h-8 w-8 text-green-600" />,
     category: 'trade',
     confidence: 'medium'
   },
   {
     id: 'supply-chain-resilience',
     title: 'Global Supply Chain Resilience',
     description: 'Design diversification and resilience strategies.',
     icon: <GlobeIcon className="h-8 w-8 text-cyan-600" />,
     category: 'trade',
     confidence: 'medium'
   }
 ];

export const ContextEntryStep: React.FC<ContextEntryStepProps> = ({ params, handleChange, inputStyles, labelStyles }) => {
    const [userRegion, setUserRegion] = React.useState(() => {
        if (params.userCountry) {
            return REGIONS_AND_COUNTRIES.find(r => r.countries.includes(params.userCountry))?.name || '';
        }
        return '';
    });

    const [targetRegion, setTargetRegion] = React.useState(() => {
        if (params.region) {
            return REGIONS_AND_COUNTRIES.find(r => r.countries.includes(params.region))?.name || '';
        }
        return '';
    });

    const handleUserRegionChange = (newRegion: string) => {
        setUserRegion(newRegion);
        handleChange('userCountry', ''); // Reset country when region changes
    };

    const handleTargetRegionChange = (newRegion: string) => {
        setTargetRegion(newRegion);
        handleChange('region', ''); // Reset target country when region changes
    };

    const handleTierSelect = (tierId: string) => {
        handleChange('tier', [tierId]); // tier is array in types
    };

    const handleIndustrySelect = (industry: string) => {
        handleChange('industry', [industry]); // industry is array in types
    };

    return (
        <div className="space-y-8">
            {/* User Details Section */}
            <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Profile & Context</h3>
                <p className="text-gray-600 mb-8 text-base">This context frames the analysis from your unique strategic perspective. Enterprise-grade security, compliance tracking, and audit trails are now active.</p>
                <div className="space-y-6">
                    <div><label className={labelStyles}>Report Name / Goal *</label><input type="text" value={params.reportName} onChange={e => handleChange('reportName', e.target.value)} className={inputStyles} placeholder="e.g., AgriTech Partners for Mindanao" /></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div><label className={labelStyles}>Your Name *</label><input type="text" value={params.userName} onChange={e => handleChange('userName', e.target.value)} className={inputStyles} placeholder="e.g., Jane Doe" /></div>
                        <div><label className={labelStyles}>Department</label><input type="text" value={params.userDepartment} onChange={e => handleChange('userDepartment', e.target.value)} className={inputStyles} placeholder="e.g., Investment Promotion" /></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div><label className={labelStyles}>Organization Type</label><select value={params.organizationType} onChange={e => handleChange('organizationType', e.target.value)} className={inputStyles}>{ORGANIZATION_TYPES.map(o => <option key={o} value={o}>{o}</option>)}</select></div>
                        <div>
                            <label className={labelStyles}>Your Region</label>
                            <select value={userRegion} onChange={e => handleUserRegionChange(e.target.value)} className={inputStyles}>
                                <option value="">Select Region</option>
                                {REGIONS_AND_COUNTRIES.map(region => <option key={region.name} value={region.name}>{region.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className={labelStyles}>Your Country</label>
                            <select value={params.userCountry} onChange={e => handleChange('userCountry', e.target.value)} disabled={!userRegion} className={`${inputStyles} disabled:bg-nexus-border-subtle`}>
                                <option value="">Select Country</option>
                                {REGIONS_AND_COUNTRIES.find(r => r.name === userRegion)?.countries.map(country => <option key={country} value={country}>{country}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Assistance Needs Section */}
            <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Assistance Needs & Objectives</h3>
                <p className="text-gray-600 mb-6 text-base">Define your strategic objectives and what assistance you need to achieve them.</p>
                <div>
                    <label className={labelStyles}>Strategic Objective / Problem Statement *</label>
                    <textarea
                        value={params.problemStatement}
                        onChange={e => handleChange('problemStatement', e.target.value)}
                        className={`${inputStyles} resize-none`}
                        rows={4}
                        placeholder="Describe your strategic objective or the assistance you need..."
                    />
                </div>
            </div>

            {/* Target Selections Section */}
            <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Target Opportunities & Focus Areas</h3>
                <p className="text-gray-600 mb-8 text-base">Select your target region, industry sector, and analysis tier to define the scope of your intelligence blueprint.</p>

                {/* Target Region/Country */}
                <div className="mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className={labelStyles}>Target Region</label>
                            <select value={targetRegion} onChange={e => handleTargetRegionChange(e.target.value)} className={inputStyles}>
                                <option value="">Select Target Region</option>
                                {REGIONS_AND_COUNTRIES.map(region => <option key={region.name} value={region.name}>{region.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className={labelStyles}>Target Country</label>
                            <select value={params.region} onChange={e => handleChange('region', e.target.value)} disabled={!targetRegion} className={`${inputStyles} disabled:bg-nexus-border-subtle`}>
                                <option value="">Select Target Country</option>
                                {REGIONS_AND_COUNTRIES.find(r => r.name === targetRegion)?.countries.map(country => <option key={country} value={country}>{country}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Analysis Tier */}
                <div className="mb-8">
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Select Analysis Tiers</h4>
                    <p className="text-gray-600 mb-6">Choose up to 3 tiers that best match your objectives. The Nexus AI will provide confidence ratings and recommendations.</p>

                    {/* Tier Categories */}
                    {['government', 'corporate', 'banking', 'trade'].map(category => (
                        <div key={category} className="mb-8">
                            <h5 className="text-lg font-medium text-gray-800 mb-4 capitalize">{category} Tiers</h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {TIERS.filter(tier => tier.category === category).map(tier => {
                                    const isSelected = params.tier?.includes(tier.id);
                                    const confidenceColor = tier.confidence === 'high' ? 'bg-green-100 border-green-300' :
                                                          tier.confidence === 'medium' ? 'bg-yellow-100 border-yellow-300' : 'bg-red-100 border-red-300';

                                    return (
                                        <button
                                            key={tier.id}
                                            className={`flex flex-col items-center p-4 bg-white rounded-xl shadow-lg border-2 transition-all duration-200 hover:border-blue-500 focus:border-blue-700 ${
                                                isSelected ? 'border-blue-700 bg-blue-50' : 'border-transparent'
                                            } ${params.tier && params.tier.length >= 3 && !isSelected ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            onClick={() => handleTierSelect(tier.id)}
                                            disabled={params.tier && params.tier.length >= 3 && !isSelected}
                                        >
                                            <div className={`w-3 h-3 rounded-full mb-2 ${tier.confidence === 'high' ? 'bg-green-500' : tier.confidence === 'medium' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                                            {tier.icon}
                                            <span className="mt-2 text-sm font-semibold text-gray-900 text-center">{tier.title}</span>
                                            <span className="mt-1 text-gray-500 text-xs text-center leading-tight">{tier.description}</span>
                                            <span className={`mt-2 px-2 py-1 rounded-full text-xs font-medium ${
                                                tier.confidence === 'high' ? 'bg-green-100 text-green-800' :
                                                tier.confidence === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                                {tier.confidence === 'high' ? 'High Match' : tier.confidence === 'medium' ? 'Consider' : 'Review'}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                    {params.tier && params.tier.length > 0 && (
                        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <h6 className="font-medium text-blue-900 mb-2">Selected Tiers ({params.tier.length}/3):</h6>
                            <div className="flex flex-wrap gap-2">
                                {params.tier.map(tierId => {
                                    const tier = TIERS.find(t => t.id === tierId);
                                    return tier ? (
                                        <span key={tierId} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                            {tier.title}
                                        </span>
                                    ) : null;
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* Industry Sector */}
                <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Select Industry Sector</h4>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {INDUSTRIES.map(industry => (
                            <button
                                key={industry.id}
                                className={`flex flex-col items-center p-4 bg-white rounded-xl shadow-lg border transition-all duration-200 hover:border-blue-400 focus:border-blue-600 ${params.industry?.includes(industry.id) ? 'border-blue-600' : 'border-transparent'}`}
                                onClick={() => handleIndustrySelect(industry.id)}
                            >
                                <industry.icon className="h-6 w-6 text-blue-400 mb-2" />
                                <span className="text-sm font-medium text-gray-700">{industry.title}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};