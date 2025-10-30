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
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Select Analysis Tier</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {TIERS.map(tier => (
                            <button
                                key={tier.id}
                                className={`flex flex-col items-center p-6 bg-white rounded-2xl shadow-xl border-2 transition-all duration-200 hover:border-blue-500 focus:border-blue-700 ${params.tier?.includes(tier.id) ? 'border-blue-700' : 'border-transparent'}`}
                                onClick={() => handleTierSelect(tier.id)}
                            >
                                {tier.icon}
                                <span className="mt-4 text-lg font-semibold text-gray-900">{tier.title}</span>
                                <span className="mt-2 text-gray-500 text-sm text-center">{tier.description}</span>
                            </button>
                        ))}
                    </div>
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