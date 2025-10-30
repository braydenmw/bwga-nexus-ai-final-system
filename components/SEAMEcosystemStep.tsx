import React, { useState } from 'react';
import { SEAMResultDisplay } from './SEAMResultDisplay.tsx';
import { architectEcosystem } from '../services/nexusService.ts';
import type { SEAM_Blueprint, RROI_Index } from '../types.ts';
import { SpinnerSmall } from './Spinner.tsx';

interface SEAMEcosystemStepProps {
  params: any;
  onChange: (params: any) => void;
  inputStyles: string;
  labelStyles: string;
}

export const SEAMEcosystemStep: React.FC<SEAMEcosystemStepProps> = ({
  params,
  onChange,
  inputStyles,
  labelStyles,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [seamResult, setSeamResult] = useState<SEAM_Blueprint | null>(null);
  const [partnerTypes, setPartnerTypes] = useState(params.partnerTypes || []);
  const [collaborationModels, setCollaborationModels] = useState(params.collaborationModels || []);
  const [ecosystemParameters, setEcosystemParameters] = useState(params.ecosystemParameters || '');

  const handleArchitect = async () => {
    if (!params.tptResult) {
      setError("Please complete the TPT simulation first.");
      return;
    }
    if (!params.rroiResult) {
      setError("Please complete the RROI analysis first.");
      return;
    }
    if (partnerTypes.length === 0) {
      setError("Please select at least one partner type.");
      return;
    }
    if (!ecosystemParameters.trim()) {
      setError("Please specify ecosystem parameters.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const objective = `${params.problemStatement} - Partner Types: ${partnerTypes.join(', ')}, Collaboration Models: ${collaborationModels.join(', ')}, Parameters: ${ecosystemParameters}`;
      const result = await architectEcosystem(params.rroiResult, objective);
      setSeamResult(result);
      onChange({ ...params, seamResult: result, partnerTypes, collaborationModels, ecosystemParameters });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to perform SEAM ecosystem mapping.');
    } finally {
      setLoading(false);
    }
  };

  const partnerTypeOptions = [
    { value: 'Anchor', label: 'Anchor Partners (Lead organizations)' },
    { value: 'Infrastructure', label: 'Infrastructure Providers' },
    { value: 'Innovation', label: 'Innovation & Technology Partners' },
    { value: 'Capital', label: 'Capital & Investment Partners' },
    { value: 'Government', label: 'Government & Policy Partners' },
    { value: 'Community', label: 'Community & Local Stakeholders' },
  ];

  const collaborationModelOptions = [
    { value: 'Joint Venture', label: 'Joint Venture' },
    { value: 'Public-Private Partnership', label: 'Public-Private Partnership' },
    { value: 'Strategic Alliance', label: 'Strategic Alliance' },
    { value: 'Technology Transfer', label: 'Technology Transfer' },
    { value: 'Capacity Building', label: 'Capacity Building' },
    { value: 'Knowledge Exchange', label: 'Knowledge Exchange' },
  ];

  const handlePartnerTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setPartnerTypes([...partnerTypes, type]);
    } else {
      setPartnerTypes(partnerTypes.filter((t: string) => t !== type));
    }
  };

  const handleCollaborationModelChange = (model: string, checked: boolean) => {
    if (checked) {
      setCollaborationModels([...collaborationModels, model]);
    } else {
      setCollaborationModels(collaborationModels.filter((m: string) => m !== model));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Symbiotic Ecosystem Architecture Model (SEAM)</h3>
        <p className="text-gray-600 mb-6">
          Design comprehensive ecosystem architectures using our proprietary SEAM framework to identify and map
          strategic partner networks required to solve regional challenges and drive sustainable transformation.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className={labelStyles}>Partner Types</label>
          <div className="grid grid-cols-2 gap-3">
            {partnerTypeOptions.map((option) => (
              <label key={option.value} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={partnerTypes.includes(option.value)}
                  onChange={(e) => handlePartnerTypeChange(option.value, e.target.checked)}
                  className="accent-blue-600"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className={labelStyles}>Collaboration Models</label>
          <div className="grid grid-cols-2 gap-3">
            {collaborationModelOptions.map((option) => (
              <label key={option.value} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={collaborationModels.includes(option.value)}
                  onChange={(e) => handleCollaborationModelChange(option.value, e.target.checked)}
                  className="accent-blue-600"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className={labelStyles}>Ecosystem Parameters</label>
          <textarea
            value={ecosystemParameters}
            onChange={(e) => setEcosystemParameters(e.target.value)}
            placeholder="Describe specific ecosystem requirements, constraints, or strategic objectives (e.g., focus on sustainable agriculture, digital transformation, infrastructure development)..."
            className={`${inputStyles} resize-none`}
            rows={4}
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleArchitect}
            disabled={loading || !params.rroiResult || !params.tptResult || partnerTypes.length === 0 || !ecosystemParameters.trim()}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <SpinnerSmall />
                Designing Ecosystem Architecture...
              </>
            ) : (
              'Design SEAM Ecosystem'
            )}
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {seamResult && (
          <div className="mt-8">
            <h4 className="text-xl font-semibold text-gray-900 mb-4">SEAM Ecosystem Architecture Results</h4>
            <SEAMResultDisplay seam={seamResult} />
          </div>
        )}
      </div>
    </div>
  );
};