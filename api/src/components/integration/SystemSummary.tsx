import React from 'react';
import { UserProfileData } from '../../types';

interface SystemSummaryProps {
  userProfile: UserProfileData;
  completedSteps: number[];
  totalSteps: number;
}

export const SystemSummary: React.FC<SystemSummaryProps> = ({
  userProfile,
  completedSteps,
  totalSteps
}) => {
  const progress = Math.round((completedSteps.length / totalSteps) * 100);
  
  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'basic': return 'text-nexus-accent-green';
      case 'professional': return 'text-nexus-accent-purple';
      case 'enterprise': return 'text-nexus-accent-yellow';
      default: return 'text-nexus-accent-cyan';
    }
  };

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'basic': return 'nexus-badge-green';
      case 'professional': return 'nexus-badge-purple';
      case 'enterprise': return 'nexus-badge-yellow';
      default: return 'nexus-badge-cyan';
    }
  };

  return (
    <div className="nexus-card max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-nexus-text-primary mb-4">
          Nexus Intelligence System Summary
        </h2>
        <p className="text-nexus-text-secondary text-lg">
          Comprehensive regional development intelligence platform
        </p>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="nexus-card-glow p-6 text-center">
          <div className="text-4xl mb-4">🧠</div>
          <h3 className="text-xl font-semibold text-nexus-text-primary mb-2">12-Step Workflow</h3>
          <p className="text-nexus-text-secondary text-sm">
            Comprehensive intelligence analysis framework covering strategic context to implementation
          </p>
        </div>

        <div className="nexus-card-glow p-6 text-center">
          <div className="text-4xl mb-4">📊</div>
          <h3 className="text-xl font-semibold text-nexus-text-primary mb-2">Report Generation</h3>
          <p className="text-nexus-text-secondary text-sm">
            Multi-format reports with customizable engagement styles and scoring systems
          </p>
        </div>

        <div className="nexus-card-glow p-6 text-center">
          <div className="text-4xl mb-4">⚡</div>
          <h3 className="text-xl font-semibold text-nexus-text-primary mb-2">AI Integration</h3>
          <p className="text-nexus-text-secondary text-sm">
            Real-time intelligence, opportunity tracking, and predictive analytics
          </p>
        </div>
      </div>

      {/* User Profile Status */}
      <div className="nexus-card mb-8 p-6">
        <h3 className="text-xl font-semibold text-nexus-text-primary mb-4">User Profile</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-nexus-text-secondary">Name:</span>
              <span className="font-medium text-nexus-text-primary">{userProfile.name}</span>
            </div>
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-nexus-text-secondary">Role:</span>
              <span className="font-medium text-nexus-text-primary">{userProfile.role}</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-nexus-text-secondary">Tier:</span>
              <span className={`font-medium ${getTierColor(userProfile.tier)}`}>
                {userProfile.tier.toUpperCase()}
              </span>
              <span className={`nexus-badge ${getTierBadge(userProfile.tier)}`}>
                {userProfile.tier}
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-nexus-text-secondary">Goals:</span>
              <span className="font-medium text-nexus-text-primary">{userProfile.goals}</span>
            </div>
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-nexus-text-secondary">Experience:</span>
              <span className="font-medium text-nexus-text-primary">{userProfile.experience}</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-nexus-text-secondary">Assistance:</span>
              <span className="font-medium text-nexus-text-primary">{userProfile.assistance}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="nexus-card mb-8 p-6">
        <h3 className="text-xl font-semibold text-nexus-text-primary mb-4">Workflow Progress</h3>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-nexus-text-secondary">Overall Progress</span>
            <span className="text-nexus-accent-cyan font-semibold">{progress}%</span>
          </div>
          <div className="nexus-progress-bar">
            <div 
              className="nexus-progress-fill bg-gradient-to-r from-nexus-accent-cyan to-nexus-accent-purple"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-nexus-accent-cyan">{completedSteps.length}</div>
            <div className="text-sm text-nexus-text-secondary">Completed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-nexus-accent-purple">{totalSteps - completedSteps.length}</div>
            <div className="text-sm text-nexus-text-secondary">Remaining</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-nexus-accent-green">{totalSteps}</div>
            <div className="text-sm text-nexus-text-secondary">Total Steps</div>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="nexus-card p-6">
          <h4 className="text-lg font-semibold text-nexus-text-primary mb-3">Regional Development Focus</h4>
          <ul className="space-y-2 text-nexus-text-secondary">
            <li>• Shift from traditional global markets to regional cities</li>
            <li>• Government business opportunity identification</li>
            <li>• Global industry integration strategies</li>
            <li>• Economic diversification planning</li>
          </ul>
        </div>

        <div className="nexus-card p-6">
          <h4 className="text-lg font-semibold text-nexus-text-primary mb-3">Intelligence Framework</h4>
          <ul className="space-y-2 text-nexus-text-secondary">
            <li>• Strategic context analysis</li>
            <li>• ROI and risk assessment</li>
            <li>• Partner network mapping</li>
            <li>• Implementation roadmapping</li>
          </ul>
        </div>
      </div>

      {/* System Capabilities */}
      <div className="nexus-card p-6 mb-8">
        <h3 className="text-xl font-semibold text-nexus-text-primary mb-4">System Capabilities</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl mb-2">🛤️</div>
            <h5 className="font-medium text-nexus-text-primary mb-1">Workflow Management</h5>
            <p className="text-sm text-nexus-text-secondary">12-step intelligence process</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">📈</div>
            <h5 className="font-medium text-nexus-text-primary mb-1">Scoring System</h5>
            <p className="text-sm text-nexus-text-secondary">Opportunity and complexity analysis</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">🤖</div>
            <h5 className="font-medium text-nexus-text-primary mb-1">AI Integration</h5>
            <p className="text-sm text-nexus-text-secondary">Intelligent insights and recommendations</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">📋</div>
            <h5 className="font-medium text-nexus-text-primary mb-1">Report Generation</h5>
            <p className="text-sm text-nexus-text-secondary">Multi-format comprehensive reports</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <p className="text-nexus-text-secondary mb-4">
          Continue your intelligence journey by exploring the available workflow steps and generating comprehensive reports.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="nexus-button nexus-button-primary">
            Continue Workflow
          </button>
          <button className="nexus-button nexus-button-secondary">
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
};