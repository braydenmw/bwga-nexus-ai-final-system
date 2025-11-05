import React from 'react';

const audienceMembers = [
  {
    icon: '🏛️',
    title: 'Government Leaders',
    description: 'Regional governors, economic development directors, and investment promotion agencies fighting to attract capital to their communities.',
  },
  {
    icon: '🏢',
    title: 'Economic Developers',
    description: 'Private economic development firms and consultants helping regions compete with major metropolitan areas for global investment.',
  },
  {
    icon: '🏭',
    title: 'Industry Leaders',
    description: 'Manufacturing executives, technology innovators, and business leaders seeking untapped markets with superior potential.',
  },
  {
    icon: '🌍',
    title: 'Development Banks',
    description: 'International financial institutions and development banks looking to optimize investment impact in emerging regions.',
  },
  {
    icon: '🤝',
    title: 'NGOs & Communities',
    description: 'Non-profit organizations and community leaders working to bring sustainable development and economic opportunity to underserved regions.',
  },
  {
    icon: '🎓',
    title: 'Academic Institutions',
    description: 'Universities and research institutions seeking to commercialize innovations and create technology transfer partnerships.',
  },
];

const WhoItsFor: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-black mb-4">Who It's For</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Designed for serious professionals who need professional-grade intelligence
            to compete in the global investment marketplace.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {audienceMembers.map((member, index) => (
            <div
              key={index}
              className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">{member.icon}</span>
              </div>
              <h3 className="text-lg font-bold text-black mb-2">{member.title}</h3>
              <p className="text-gray-600 text-sm">{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoItsFor;