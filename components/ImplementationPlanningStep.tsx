import React, { useState } from 'react';
import { SpinnerSmall } from './Spinner.tsx';

interface ImplementationPlanningStepProps {
  params: any;
  onChange: (params: any) => void;
  inputStyles: string;
  labelStyles: string;
}

export const ImplementationPlanningStep: React.FC<ImplementationPlanningStepProps> = ({
  params,
  onChange,
  inputStyles,
  labelStyles,
}) => {
  const [loading, setLoading] = useState(false);
  const [implementationPlan, setImplementationPlan] = useState<any>(null);

  const timelineOptions = [
    { id: '3_months', title: '3 Months', description: 'Quick implementation focus' },
    { id: '6_months', title: '6 Months', description: 'Balanced approach' },
    { id: '12_months', title: '12 Months', description: 'Comprehensive rollout' },
    { id: '18_months', title: '18 Months', description: 'Extended implementation' },
    { id: '24_months', title: '24+ Months', description: 'Long-term transformation' }
  ];

  const resourceCategories = [
    { id: 'human_resources', title: 'Human Resources', description: 'Team members, consultants, training' },
    { id: 'financial_resources', title: 'Financial Resources', description: 'Budget, funding, investment capital' },
    { id: 'technical_resources', title: 'Technical Resources', description: 'Technology, infrastructure, tools' },
    { id: 'partnership_resources', title: 'Partnership Resources', description: 'Partner commitments, joint resources' },
    { id: 'knowledge_resources', title: 'Knowledge Resources', description: 'Research, expertise, intellectual property' }
  ];

  const handleTimelineSelect = (timelineId: string) => {
    onChange({ ...params, implementationTimeline: timelineId });
  };

  const handleResourceToggle = (resourceId: string) => {
    const currentResources = params.requiredResources || [];
    const newResources = currentResources.includes(resourceId)
      ? currentResources.filter((id: string) => id !== resourceId)
      : [...currentResources, resourceId];

    onChange({ ...params, requiredResources: newResources });
  };

  const handleGeneratePlan = async () => {
    if (!params.problemStatement?.trim() || !params.implementationTimeline) {
      return;
    }

    setLoading(true);
    try {
      // Simulate implementation planning
      await new Promise(resolve => setTimeout(resolve, 3000));

      const plan = {
        phases: [
          {
            name: 'Planning & Preparation',
            duration: '4-6 weeks',
            milestones: [
              'Finalize partnership agreements',
              'Establish governance structure',
              'Resource allocation and budgeting',
              'Initial team formation'
            ],
            deliverables: [
              'Project charter and scope document',
              'Resource plan and budget',
              'Risk mitigation plan',
              'Communication plan'
            ]
          },
          {
            name: 'Foundation Building',
            duration: '8-12 weeks',
            milestones: [
              'Technology infrastructure setup',
              'Process integration planning',
              'Training program development',
              'Initial pilot testing'
            ],
            deliverables: [
              'Technical architecture document',
              'Integration specifications',
              'Training materials',
              'Pilot test results'
            ]
          },
          {
            name: 'Execution & Scaling',
            duration: '12-20 weeks',
            milestones: [
              'Full system implementation',
              'Process optimization',
              'Performance monitoring setup',
              'Change management'
            ],
            deliverables: [
              'Fully operational system',
              'Performance dashboards',
              'User adoption metrics',
              'Lessons learned report'
            ]
          },
          {
            name: 'Optimization & Growth',
            duration: 'Ongoing',
            milestones: [
              'Continuous improvement',
              'Scale expansion planning',
              'Advanced feature implementation',
              'Partnership expansion'
            ],
            deliverables: [
              'Optimization roadmap',
              'Growth strategy document',
              'Advanced feature specifications',
              'Expansion business case'
            ]
          }
        ],
        criticalSuccessFactors: [
          'Strong executive sponsorship and leadership commitment',
          'Clear communication and change management',
          'Adequate resource allocation and budget',
          'Robust project governance and oversight',
          'Continuous monitoring and course correction'
        ],
        keyMetrics: [
          'Project milestone achievement rate',
          'Budget utilization vs. plan',
          'Resource utilization efficiency',
          'Stakeholder satisfaction scores',
          'Business value realization metrics'
        ],
        totalEstimatedCost: '$2.5-4.2M',
        estimatedROI: '180-250% over 3 years'
      };

      setImplementationPlan(plan);
      onChange({ ...params, implementationRoadmap: plan });
    } catch (error) {
      console.error('Implementation planning failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Implementation Planning</h3>
        <p className="text-gray-600 mb-6">
          Develop a comprehensive implementation roadmap with timelines, milestones, resource requirements,
          and success metrics for your partnership initiative.
        </p>
      </div>

      <div className="space-y-4">
        {/* Implementation Timeline */}
        <div>
          <label className={labelStyles}>Implementation Timeline</label>
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mt-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {timelineOptions.map((option) => (
                <label
                  key={option.id}
                  className={`flex flex-col items-center p-4 rounded-xl cursor-pointer transition-all duration-200 border ${
                    params.implementationTimeline === option.id
                      ? 'border-blue-500 bg-blue-500/5 shadow-md'
                      : 'border-gray-200 hover:border-blue-400 bg-white hover:bg-gray-50/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="timeline"
                    value={option.id}
                    checked={params.implementationTimeline === option.id}
                    onChange={() => handleTimelineSelect(option.id)}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <div className="font-semibold text-gray-800">{option.title}</div>
                    <div className="text-sm text-gray-600 mt-1">{option.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Resource Requirements */}
        <div>
          <label className={labelStyles}>Resource Requirements</label>
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mt-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resourceCategories.map((resource) => (
                <label
                  key={resource.id}
                  className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-all duration-200 border ${
                    (params.requiredResources || []).includes(resource.id)
                      ? 'border-green-500 bg-green-500/5 shadow-md'
                      : 'border-gray-200 hover:border-green-400 bg-white hover:bg-gray-50/50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={(params.requiredResources || []).includes(resource.id)}
                    onChange={() => handleResourceToggle(resource.id)}
                    className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 focus:ring-offset-2"
                  />
                  <div className="flex-grow">
                    <div className="font-semibold text-gray-800">{resource.title}</div>
                    <div className="text-sm text-gray-600 mt-1">{resource.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Specific Requirements */}
        <div>
          <label className={labelStyles}>Specific Implementation Requirements</label>
          <textarea
            value={params.implementationRequirements || ''}
            onChange={(e) => onChange({ ...params, implementationRequirements: e.target.value })}
            placeholder="Describe any specific requirements, constraints, or considerations for implementation (e.g., regulatory approvals, technology standards, cultural integration needs)"
            className={`${inputStyles} resize-none`}
            rows={4}
          />
        </div>

        {/* Success Metrics */}
        <div>
          <label className={labelStyles}>Success Metrics & KPIs</label>
          <textarea
            value={params.successMetrics || ''}
            onChange={(e) => onChange({ ...params, successMetrics: e.target.value })}
            placeholder="Define the key metrics that will be used to measure implementation success and partnership performance"
            className={`${inputStyles} resize-none`}
            rows={3}
          />
        </div>

        {/* Generate Plan Button */}
        <div className="flex justify-center">
          <button
            onClick={handleGeneratePlan}
            disabled={loading || !params.problemStatement?.trim() || !params.implementationTimeline}
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold rounded-xl shadow-lg hover:from-indigo-700 hover:to-indigo-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <SpinnerSmall />
                Generating Implementation Plan...
              </>
            ) : (
              'Generate Implementation Roadmap'
            )}
          </button>
        </div>

        {/* Implementation Plan Results */}
        {implementationPlan && (
          <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-200">
            <h4 className="text-xl font-semibold text-indigo-800 mb-4">Implementation Roadmap</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg border border-indigo-200">
                <h5 className="font-semibold text-gray-800 mb-2">Estimated Total Cost</h5>
                <p className="text-2xl font-bold text-indigo-600">{implementationPlan.totalEstimatedCost}</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-indigo-200">
                <h5 className="font-semibold text-gray-800 mb-2">Projected ROI</h5>
                <p className="text-2xl font-bold text-green-600">{implementationPlan.estimatedROI}</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <h5 className="font-semibold text-gray-800">Implementation Phases</h5>
              {implementationPlan.phases.map((phase: any, index: number) => (
                <div key={index} className="bg-white p-4 rounded-lg border border-indigo-200">
                  <div className="flex justify-between items-start mb-3">
                    <h6 className="font-semibold text-indigo-800">{phase.name}</h6>
                    <span className="text-sm text-gray-600 bg-indigo-100 px-2 py-1 rounded">
                      {phase.duration}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-sm font-semibold text-gray-700 mb-2">Key Milestones</h6>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {phase.milestones.map((milestone: string, mIndex: number) => (
                          <li key={mIndex} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                            {milestone}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h6 className="text-sm font-semibold text-gray-700 mb-2">Deliverables</h6>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {phase.deliverables.map((deliverable: string, dIndex: number) => (
                          <li key={dIndex} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg border border-indigo-200">
                <h5 className="font-semibold text-gray-800 mb-3">Critical Success Factors</h5>
                <ul className="space-y-2">
                  {implementationPlan.criticalSuccessFactors.map((factor: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></span>
                      <span className="text-sm text-gray-700">{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg border border-indigo-200">
                <h5 className="font-semibold text-gray-800 mb-3">Key Performance Metrics</h5>
                <ul className="space-y-2">
                  {implementationPlan.keyMetrics.map((metric: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                      <span className="text-sm text-gray-700">{metric}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};