import React, { useState } from 'react';
import { TPTResultDisplay } from './TPTResultDisplay.tsx';
import { simulatePathway } from '../services/nexusService.ts';
import type { TPT_Simulation, RROI_Index } from '../types.ts';
import { SpinnerSmall } from './Spinner.tsx';

interface TPTSimulationStepProps {
  params: any;
  onChange: (params: any) => void;
  inputStyles: string;
  labelStyles: string;
}

export const TPTSimulationStep: React.FC<TPTSimulationStepProps> = ({
  params,
  onChange,
  inputStyles,
  labelStyles,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tptResult, setTptResult] = useState<TPT_Simulation | null>(null);
  const [timeHorizon, setTimeHorizon] = useState(params.timeHorizon || '5');
  const [growthAssumption, setGrowthAssumption] = useState(params.growthAssumption || 'moderate');
  const [intervention, setIntervention] = useState(params.intervention || '');

  const handleSimulate = async () => {
    if (!params.rroiResult) {
      setError("Please complete the RROI analysis first.");
      return;
    }
    if (!intervention.trim()) {
      setError("Please specify an intervention strategy.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const fullIntervention = `${intervention} (Time horizon: ${timeHorizon} years, Growth assumption: ${growthAssumption})`;
      const result = await simulatePathway(params.rroiResult, fullIntervention);
      setTptResult(result);
      onChange({ ...params, tptResult: result, timeHorizon, growthAssumption, intervention });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to perform TPT simulation.');
    } finally {
      setLoading(false);
    }
  };

  const timeHorizonOptions = [
    { value: '3', label: '3 years' },
    { value: '5', label: '5 years' },
    { value: '10', label: '10 years' },
    { value: '15', label: '15 years' },
  ];

  const growthOptions = [
    { value: 'conservative', label: 'Conservative (2-3% annual growth)' },
    { value: 'moderate', label: 'Moderate (3-5% annual growth)' },
    { value: 'aggressive', label: 'Aggressive (5-7% annual growth)' },
    { value: 'optimistic', label: 'Optimistic (7%+ annual growth)' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Transformation Pathway Theory (TPT) Simulation</h3>
        <p className="text-gray-600 mb-6">
          Run predictive simulations using our proprietary TPT framework to forecast economic transformation pathways
          and assess the impact of strategic interventions on your target region's development trajectory.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className={labelStyles}>Time Horizon</label>
          <select
            value={timeHorizon}
            onChange={(e) => setTimeHorizon(e.target.value)}
            className={inputStyles}
            title="Select simulation time horizon"
          >
            {timeHorizonOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelStyles}>Growth Assumption</label>
          <select
            value={growthAssumption}
            onChange={(e) => setGrowthAssumption(e.target.value)}
            className={inputStyles}
            title="Select economic growth assumption"
          >
            {growthOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelStyles}>Strategic Intervention</label>
          <textarea
            value={intervention}
            onChange={(e) => setIntervention(e.target.value)}
            placeholder="Describe your proposed intervention strategy (e.g., infrastructure investment, policy reform, technology adoption)..."
            className={`${inputStyles} resize-none`}
            rows={4}
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSimulate}
            disabled={loading || !params.rroiResult || !intervention.trim()}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <SpinnerSmall />
                Running TPT Simulation...
              </>
            ) : (
              'Run TPT Simulation'
            )}
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {tptResult && (
          <div className="mt-8">
            <h4 className="text-xl font-semibold text-gray-900 mb-4">TPT Simulation Results</h4>
            <TPTResultDisplay sim={tptResult} />
          </div>
        )}
      </div>
    </div>
  );
};