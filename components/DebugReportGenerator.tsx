import React, { useState, useCallback } from 'react';
import type { ReportParameters } from '../types.ts';
import { REGIONS_AND_COUNTRIES, INDUSTRIES } from '../constants.tsx';
import Card from './common/Card.tsx';

const DebugReportGenerator: React.FC = () => {
  const [params, setParams] = useState<ReportParameters>({
    reportName: '',
    tier: [],
    userName: '',
    userDepartment: '',
    organizationType: 'Default',
    userCountry: '',
    aiPersona: [],
    customAiPersona: '',
    analyticalLens: [],
    toneAndStyle: [],
    region: '',
    industry: [],
    customIndustry: '',
    idealPartnerProfile: '',
    problemStatement: '',
    analysisTimeframe: 'Any Time',
    analyticalModules: [],
    reportLength: 'standard',
    outputFormat: 'report',
  });

  const [targetRegion, setTargetRegion] = useState('');
  const [targetCountry, setTargetCountry] = useState('');
  const [targetCity, setTargetCity] = useState('');

  const handleRegionChange = useCallback((region: string, country: string, city: string) => {
    const combinedRegion = [city, country].filter(Boolean).join(', ');
    console.log('🔧 Debug: Region change:', { region, country, city, combinedRegion });
    setParams(prev => ({ ...prev, region: combinedRegion }));
  }, []);

  const handleChange = useCallback((field: keyof ReportParameters, value: any) => {
    console.log('🔧 Debug: Parameter change:', { field, value });
    setParams(prev => ({ ...prev, [field]: value }));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Debug Report Generator</h1>

        <Card className="mb-8">
          <h2 className="text-xl font-bold mb-4">Current State</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p><strong>Region:</strong> {params.region || 'Not set'}</p>
            <p><strong>Target Region:</strong> {targetRegion || 'Not set'}</p>
            <p><strong>Target Country:</strong> {targetCountry || 'Not set'}</p>
            <p><strong>Target City:</strong> {targetCity || 'Not set'}</p>
          </div>
        </Card>

        <Card className="mb-8">
          <h2 className="text-xl font-bold mb-4">Region Selection Test</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">Global Region</label>
              <select
                value={targetRegion}
                onChange={e => {
                  setTargetRegion(e.target.value);
                  setTargetCountry('');
                  setTargetCity('');
                  handleRegionChange(e.target.value, '', '');
                }}
                className="w-full p-3 bg-white border border-gray-300 rounded-lg"
              >
                <option value="">Select Region</option>
                {REGIONS_AND_COUNTRIES.map(region => (
                  <option key={region.name} value={region.name}>{region.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">Country</label>
              <select
                value={targetCountry}
                onChange={e => {
                  setTargetCountry(e.target.value);
                  handleRegionChange(targetRegion, e.target.value, targetCity);
                }}
                disabled={!targetRegion}
                className="w-full p-3 bg-white border border-gray-300 rounded-lg disabled:bg-gray-100"
              >
                <option value="">Select Country</option>
                {REGIONS_AND_COUNTRIES.find(r => r.name === targetRegion)?.countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">City</label>
              <input
                type="text"
                value={targetCity}
                onChange={e => {
                  setTargetCity(e.target.value);
                  handleRegionChange(targetRegion, targetCountry, e.target.value);
                }}
                placeholder="Optional city"
                className="w-full p-3 bg-white border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-bold mb-4">Console Logs</h2>
          <p className="text-gray-600">
            Check the browser console (F12) for debug logs showing parameter changes and region updates.
            If you see repeated logs, there's still an infinite loop. If logs only appear when you interact with controls, the fix is working.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default DebugReportGenerator;