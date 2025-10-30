import React, { useState } from 'react';
import { RROIResultDisplay } from './RROIResultDisplay.tsx';
import { diagnoseRegion } from '../services/nexusService.ts';
import type { RROI_Index } from '../types.ts';
import { SpinnerSmall } from './Spinner.tsx';

interface RROIDiagnosticStepProps {
  params: any;
  onChange: (params: any) => void;
  inputStyles: string;
  labelStyles: string;
}

export const RROIDiagnosticStep: React.FC<RROIDiagnosticStepProps> = ({
  params,
  onChange,
  inputStyles,
  labelStyles,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rroiResult, setRroiResult] = useState<RROI_Index | null>(null);
  const [selectedRegion, setSelectedRegion] = useState(params.region || '');

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
    onChange({ ...params, region });
  };

  const handleDiagnose = async () => {
    if (!selectedRegion.trim() || !params.problemStatement.trim()) {
      setError("Please select a region and define your core objective first.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await diagnoseRegion(selectedRegion, params.problemStatement);
      setRroiResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to perform RROI analysis.');
    } finally {
      setLoading(false);
    }
  };

  const regions = [
    'United States', 'China', 'Japan', 'Germany', 'United Kingdom', 'France', 'Italy', 'Canada',
    'Australia', 'South Korea', 'Netherlands', 'Switzerland', 'Sweden', 'Norway', 'Denmark',
    'Singapore', 'India', 'Brazil', 'Mexico', 'South Africa', 'Russia', 'Turkey', 'Poland',
    'Vietnam', 'Thailand', 'Indonesia', 'Malaysia', 'Philippines', 'New Zealand', 'Austria',
    'Belgium', 'Finland', 'Ireland', 'Portugal', 'Spain', 'Czech Republic', 'Hungary', 'Greece'
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Regional Readiness & Opportunity Index (RROI)</h3>
        <p className="text-gray-600 mb-6">
          Perform a comprehensive diagnostic analysis of your target region's economic DNA using our proprietary RROI framework.
          This analysis evaluates human capital, infrastructure, agglomeration effects, economic composition, governance, and quality of life.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className={labelStyles}>Target Region</label>
          <select
            value={selectedRegion}
            onChange={(e) => handleRegionChange(e.target.value)}
            className={inputStyles}
            title="Select target region for RROI analysis"
          >
            <option value="">Select a region...</option>
            {regions.map((region) => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelStyles}>Core Objective</label>
          <textarea
            value={params.problemStatement || ''}
            onChange={(e) => onChange({ ...params, problemStatement: e.target.value })}
            placeholder="Describe your strategic objective for this region..."
            className={`${inputStyles} resize-none`}
            rows={3}
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleDiagnose}
            disabled={loading || !selectedRegion.trim() || !params.problemStatement.trim()}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <SpinnerSmall />
                Analyzing Region...
              </>
            ) : (
              'Run RROI Analysis'
            )}
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {rroiResult && (
          <div className="mt-8">
            <h4 className="text-xl font-semibold text-gray-900 mb-4">RROI Analysis Results</h4>
            <RROIResultDisplay rroi={rroiResult} />
          </div>
        )}
      </div>
    </div>
  );
};