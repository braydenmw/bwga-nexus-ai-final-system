import React from 'react';

interface ObjectiveStepProps {
  params: any;
  onChange: (params: any) => void;
}

const aiPersonas = [
  'Analyst', 'Strategist', 'Researcher', 'Consultant', 'Custom'
];
const analyticalLenses = [
  'Economic', 'Political', 'Social', 'Technological', 'Environmental'
];
const tonesAndStyles = [
  'Formal', 'Conversational', 'Executive', 'Technical', 'Creative'
];

const ObjectiveStep: React.FC<ObjectiveStepProps> = ({ params, onChange }) => (
  <section className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
    <h2 className="text-2xl font-bold mb-6">Objective & AI Analyst</h2>
    <div className="space-y-6">
      <div>
        <label className="block font-semibold mb-2">Strategic Objective</label>
        <textarea
          value={params.problemStatement || ''}
          onChange={e => onChange({ ...params, problemStatement: e.target.value })}
          className="w-full border rounded-lg px-4 py-2"
          rows={4}
          placeholder="Describe your strategic objective"
        />
      </div>
      <div>
        <label className="block font-semibold mb-2">AI Persona</label>
        <select
          value={params.aiPersona || ''}
          onChange={e => onChange({ ...params, aiPersona: e.target.value })}
          className="w-full border rounded-lg px-4 py-2"
        >
          <option value="">Select persona</option>
          {aiPersonas.map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block font-semibold mb-2">Analytical Lens</label>
        <select
          value={params.analyticalLens || ''}
          onChange={e => onChange({ ...params, analyticalLens: e.target.value })}
          className="w-full border rounded-lg px-4 py-2"
        >
          <option value="">Select lens</option>
          {analyticalLenses.map(l => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block font-semibold mb-2">Tone & Style</label>
        <select
          value={params.toneAndStyle || ''}
          onChange={e => onChange({ ...params, toneAndStyle: e.target.value })}
          className="w-full border rounded-lg px-4 py-2"
        >
          <option value="">Select style</option>
          {tonesAndStyles.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
    </div>
  </section>
);

export default ObjectiveStep;