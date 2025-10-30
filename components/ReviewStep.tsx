import React from 'react';

interface ReviewStepProps {
  params: any;
  onChange: (params: any) => void;
}

const ReviewStep: React.FC<ReviewStepProps> = ({ params }) => (
  <section className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
    <h2 className="text-2xl font-bold mb-6">Review & Generate</h2>
    <div className="space-y-6">
      <div>
        <strong>Report Name:</strong> {params.reportName || 'N/A'}
      </div>
      <div>
        <strong>Operator:</strong> {params.userName || 'N/A'} ({params.organizationType || 'N/A'})
      </div>
      <div>
        <strong>Analysis Tiers:</strong> {params.tier?.join(', ') || 'N/A'}
      </div>
      <div>
        <strong>Geographic Focus:</strong> {params.region || 'N/A'}
      </div>
      <div>
        <strong>Industry Sectors:</strong> {params.industry || 'N/A'}
      </div>
      <div>
        <strong>Strategic Objective:</strong> {params.problemStatement || 'N/A'}
      </div>
      <div>
        <strong>AI Persona:</strong> {params.aiPersona || 'N/A'}
      </div>
      <div>
        <strong>Analytical Lens:</strong> {params.analyticalLens || 'N/A'}
      </div>
      <div>
        <strong>Tone & Style:</strong> {params.toneAndStyle || 'N/A'}
      </div>
      <button className="mt-8 px-6 py-3 bg-blue-700 text-white font-bold rounded-lg shadow-lg hover:bg-blue-800 transition">Generate Report</button>
    </div>
  </section>
);

export default ReviewStep;