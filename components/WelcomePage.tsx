import React from 'react';

interface WelcomePageProps {
  onGetStarted?: () => void;
  onViewChange?: (view: string) => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onGetStarted, onViewChange }) => {
  const handleGetStarted = () => {
    if (onGetStarted) {
      onGetStarted();
    } else if (onViewChange) {
      onViewChange('report');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            BWGA Nexus AI
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            The world's most advanced AI-powered platform for global investment intelligence and strategic partnership matchmaking.
            Transform regional development opportunities into actionable intelligence in minutes.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-200"
          >
            Start Your Intelligence Journey
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 text-2xl">🧠</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">AI-Powered Intelligence</h3>
            <p className="text-gray-600">
              Advanced AI algorithms analyze regional readiness, predict transformation outcomes, and identify optimal partnership opportunities using real economic data.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 text-2xl">🌍</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Global Market Intelligence</h3>
            <p className="text-gray-600">
              Real-time data from World Bank and UN Comtrade APIs provides authoritative economic insights, dispelling outdated perceptions about regional potential.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-purple-600 text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Minutes to Intelligence</h3>
            <p className="text-gray-600">
              Generate comprehensive intelligence blueprints in minutes, not days. From initial research to actionable partnership recommendations instantly.
            </p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How BWGA Nexus AI Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Define Your Objective</h3>
              <p className="text-gray-600 text-sm">
                Specify your research, investment, or partnership goals. Upload documents or describe your needs in natural language.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">AI Analysis Engine</h3>
              <p className="text-gray-600 text-sm">
                Our Nexus Brain processes your request through 7 AI analyst personas, analyzing economic data and identifying opportunities.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Intelligence Blueprint</h3>
              <p className="text-gray-600 text-sm">
                Receive a comprehensive NSIL-formatted report with matched partners, risk assessments, and implementation roadmaps.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-lg text-white mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Why Choose BWGA Nexus AI?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Overcome Traditional Limitations</h3>
              <ul className="space-y-2">
                <li>• Replace anecdotal opinions with data-driven insights</li>
                <li>• Discover overlooked regional opportunities</li>
                <li>• Avoid wasting time on biased or outdated information</li>
                <li>• Access professional-grade intelligence affordably</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Comprehensive Intelligence</h3>
              <ul className="space-y-2">
                <li>• Regional Readiness & Opportunity Index (RROI)</li>
                <li>• Transformation Pathway Testing (TPT)</li>
                <li>• Symbiotic Ecosystem Architecture Mapping (SEAM)</li>
                <li>• Multi-persona AI analysis with confidence scoring</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Ready to Transform Your Investment Strategy?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGetStarted}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              Start Your Analysis
            </button>
            <button
              onClick={() => onViewChange?.('sample-report')}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              View Sample Intelligence
            </button>
            <button
              onClick={() => onViewChange?.('technical-manual')}
              className="bg-green-200 hover:bg-green-300 text-gray-800 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;