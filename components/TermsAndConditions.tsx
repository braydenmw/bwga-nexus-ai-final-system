import React, { useState } from 'react';

interface TermsAndConditionsProps {
  onAccept: () => void;
  onDecline: () => void;
  isModal?: boolean;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({
  onAccept,
  onDecline,
  isModal = false
}) => {
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    if (accepted) {
      onAccept();
    }
  };

  const content = (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          BWGA Nexus AI Terms & Conditions
        </h1>
        <p className="text-lg text-gray-600">
          Please read these terms carefully before using our AI-powered intelligence platform.
        </p>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Service Overview</h2>
        <p className="text-gray-700 mb-4">
          BWGA Nexus AI is an advanced artificial intelligence platform designed to provide strategic intelligence
          for regional development, investment opportunities, and partnership matchmaking. Our system uses
          sophisticated AI analysis to generate comprehensive intelligence blueprints based on authoritative
          economic data and multi-perspective analysis.
        </p>
        <p className="text-gray-700">
          The platform is specifically designed to help organizations overcome traditional limitations of
          anecdotal information, biased perceptions, and outdated market intelligence by providing
          data-driven, objective analysis for any region worldwide.
        </p>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">2. AI Analysis Capabilities</h2>
        <p className="text-gray-700 mb-4">
          Our Nexus Brain AI engine provides comprehensive analysis including:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li><strong>Regional Readiness & Opportunity Index (RROI):</strong> Multi-dimensional assessment of regional potential</li>
          <li><strong>Transformation Pathway Testing (TPT):</strong> Predictive modeling of development scenarios</li>
          <li><strong>Symbiotic Ecosystem Architecture Mapping (SEAM):</strong> Partner ecosystem design and optimization</li>
          <li><strong>Multi-Persona AI Analysis:</strong> 7 specialized analytical perspectives (Venture Capitalist, Regional Economist, Geopolitical Strategist, ESG Analyst, Infrastructure Planner, Supply Chain Analyst, Workforce Development Specialist)</li>
          <li><strong>NSIL Intelligence Reports:</strong> Proprietary structured matchmaking intelligence format</li>
        </ul>
        <p className="text-gray-700">
          All analysis is grounded in authoritative data from World Bank and UN Comtrade APIs, with transparent
          confidence scoring and uncertainty flags.
        </p>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">3. Data Sources & Accuracy</h2>
        <p className="text-gray-700 mb-4">
          BWGA Nexus AI integrates data from authoritative global sources:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li><strong>World Bank API:</strong> Economic indicators, GDP data, development metrics</li>
          <li><strong>UN Comtrade API:</strong> International trade statistics and export data</li>
          <li><strong>OpenAI GPT-4:</strong> Advanced AI analysis and report generation</li>
        </ul>
        <p className="text-gray-700 mb-4">
          <strong>Important Disclaimer:</strong> While we strive for accuracy, all AI-generated analysis includes
          confidence flags to indicate analytical uncertainties. The platform is designed to supplement,
          not replace, professional due diligence and expert consultation.
        </p>
        <p className="text-gray-700">
          Users should independently verify critical information and consult with qualified professionals
          for high-stakes decisions.
        </p>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Usage Guidelines</h2>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>The platform is intended for legitimate business, research, and development purposes</li>
          <li>Users must provide accurate and truthful information when using the system</li>
          <li>Generated reports are for informational purposes and should not be considered financial or legal advice</li>
          <li>Users are responsible for ensuring their use complies with applicable laws and regulations</li>
          <li>The system may not be used for fraudulent, unethical, or illegal purposes</li>
          <li>Respect intellectual property rights when uploading documents or using generated content</li>
        </ul>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Intellectual Property</h2>
        <p className="text-gray-700 mb-4">
          BWGA Nexus AI retains ownership of the platform, algorithms, and proprietary NSIL format.
          Users retain ownership of their input data and may use generated reports for their business purposes,
          provided they do not attempt to reverse-engineer or replicate the underlying AI technology.
        </p>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Privacy & Data Protection</h2>
        <p className="text-gray-700 mb-4">
          We are committed to protecting user privacy and data security. User inputs and generated reports
          are processed securely, and we do not share personal information with third parties without consent.
        </p>
        <p className="text-gray-700">
          Please note that AI analysis may involve processing data through external APIs (OpenAI, World Bank, UN Comtrade).
          By using this service, you acknowledge this data processing.
        </p>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">7. Limitation of Liability</h2>
        <p className="text-gray-700 mb-4">
          BWGA Nexus AI provides analysis based on available data and AI capabilities. While we strive for
          accuracy and usefulness, we cannot guarantee the completeness or accuracy of all information.
        </p>
        <p className="text-gray-700">
          Users acknowledge that decisions based on AI-generated analysis are made at their own risk.
          BWGA Nexus AI shall not be liable for any direct, indirect, incidental, or consequential damages
          arising from the use of this platform.
        </p>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">8. Service Availability</h2>
        <p className="text-gray-700">
          We strive to maintain high availability of the platform, but service interruptions may occur
          due to maintenance, technical issues, or external API dependencies. We do not guarantee
          uninterrupted service availability.
        </p>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              <strong>Important:</strong> This platform is designed to provide objective, data-driven intelligence
              to help organizations make informed decisions. It is not a substitute for professional advice
              in legal, financial, or technical matters. Always consult qualified experts for critical decisions.
            </p>
          </div>
        </div>
      </div>

      {!isModal && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <input
              id="accept-terms"
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="accept-terms" className="ml-2 text-gray-900">
              I have read and agree to the BWGA Nexus AI Terms & Conditions
            </label>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleAccept}
              disabled={!accepted}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors duration-200 ${
                accepted
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Accept & Continue
            </button>
            <button
              onClick={onDecline}
              className="flex-1 py-3 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition-colors duration-200"
            >
              Decline
            </button>
          </div>
        </div>
      )}

      {isModal && (
        <div className="flex gap-4">
          <button
            onClick={onAccept}
            className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors duration-200"
          >
            Accept Terms
          </button>
          <button
            onClick={onDecline}
            className="flex-1 py-3 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition-colors duration-200"
          >
            Decline
          </button>
        </div>
      )}
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {content}
    </div>
  );
};

export default TermsAndConditions;