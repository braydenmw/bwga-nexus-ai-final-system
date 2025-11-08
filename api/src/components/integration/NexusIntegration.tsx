import React, { useState, useEffect } from 'react';
import { UserProfileData, WorkflowStep, EngagementStyle, ReportFormat } from '../../types';
import { WORKFLOW_STEPS } from '../../data/workflowSteps';
import { ReportGenerator } from '../reports/ReportGenerator';
import { ReportViewer } from '../reports/ReportViewer';

interface NexusIntegrationProps {
  userProfile: UserProfileData;
  currentView: string;
  onViewChange: (view: string) => void;
}

export const NexusIntegration: React.FC<NexusIntegrationProps> = ({
  userProfile,
  currentView,
  onViewChange
}) => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [currentWorkflowStep, setCurrentWorkflowStep] = useState(1);
  const [generatedReport, setGeneratedReport] = useState<string | null>(null);
  const [generatedLetter, setGeneratedLetter] = useState<string | null>(null);
  const [showReportViewer, setShowReportViewer] = useState(false);

  // Load saved progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('nexusWorkflowProgress');
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress);
        setCompletedSteps(progress.completedSteps || []);
        setCurrentWorkflowStep(progress.currentStep || 1);
      } catch (error) {
        console.error('Failed to load saved progress:', error);
      }
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = (completed: number[], current: number) => {
    const progress = {
      completedSteps: completed,
      currentStep: current,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('nexusWorkflowProgress', JSON.stringify(progress));
  };

  const handleStepComplete = (stepId: number, data: any) => {
    const newCompletedSteps = completedSteps.includes(stepId)
      ? completedSteps
      : [...completedSteps, stepId];
    
    setCompletedSteps(newCompletedSteps);
    saveProgress(newCompletedSteps, currentWorkflowStep);
  };

  const handleStepSelect = (stepId: number) => {
    setCurrentWorkflowStep(stepId);
    onViewChange('workflow-step');
  };

  const handleReportGenerated = (report: string, letter: string) => {
    setGeneratedReport(report);
    setGeneratedLetter(letter);
    setShowReportViewer(true);
  };

  const handleCloseReportViewer = () => {
    setShowReportViewer(false);
  };

  const handleDownloadReport = (format: 'pdf' | 'word' | 'markdown') => {
    // Implement download functionality
    console.log(`Downloading report in ${format} format`);
    alert(`Report download in ${format} format would be implemented here`);
  };

  const calculateProgress = () => {
    const totalSteps = WORKFLOW_STEPS.length;
    const completedCount = completedSteps.length;
    return Math.round((completedCount / totalSteps) * 100);
  };

  const getAvailableSteps = () => {
    return WORKFLOW_STEPS.filter(step => {
      const hasRequiredTier = step.requiredTier === 'basic' || 
        (step.requiredTier === 'professional' && ['professional', 'enterprise'].includes(userProfile.tier)) ||
        (step.requiredTier === 'enterprise' && userProfile.tier === 'enterprise');
      
      const hasPrerequisites = step.prerequisites.every(prereq => completedSteps.includes(prereq));
      
      return hasRequiredTier && hasPrerequisites;
    });
  };

  const renderIntegrationDashboard = () => {
    const progress = calculateProgress();
    const availableSteps = getAvailableSteps();

    return (
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-nexus-text-primary mb-2">
            Nexus Intelligence Integration
          </h1>
          <p className="text-nexus-text-secondary">
            Comprehensive regional development intelligence platform
          </p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="nexus-card-glow">
            <div className="text-center">
              <div className="text-2xl font-bold text-nexus-accent-cyan mb-1">
                {progress}%
              </div>
              <div className="text-sm text-nexus-text-secondary">Overall Progress</div>
            </div>
          </div>
          
          <div className="nexus-card-glow">
            <div className="text-center">
              <div className="text-2xl font-bold text-nexus-accent-purple mb-1">
                {completedSteps.length}
              </div>
              <div className="text-sm text-nexus-text-secondary">Steps Completed</div>
            </div>
          </div>
          
          <div className="nexus-card-glow">
            <div className="text-center">
              <div className="text-2xl font-bold text-nexus-accent-green mb-1">
                {availableSteps.length}
              </div>
              <div className="text-sm text-nexus-text-secondary">Available Steps</div>
            </div>
          </div>
          
          <div className="nexus-card-glow">
            <div className="text-center">
              <div className="text-2xl font-bold text-nexus-accent-yellow mb-1">
                {userProfile.tier.toUpperCase()}
              </div>
              <div className="text-sm text-nexus-text-secondary">User Tier</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <button
            onClick={() => onViewChange('workflow')}
            className="nexus-card hover:border-nexus-accent-cyan transition-all cursor-pointer"
          >
            <div className="text-center">
              <div className="text-3xl mb-3">🛤️</div>
              <h3 className="font-semibold text-nexus-text-primary mb-2">12-Step Workflow</h3>
              <p className="text-sm text-nexus-text-secondary">Complete intelligence analysis</p>
            </div>
          </button>

          <button
            onClick={() => onViewChange('reports')}
            className="nexus-card hover:border-nexus-accent-purple transition-all cursor-pointer"
          >
            <div className="text-center">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="font-semibold text-nexus-text-primary mb-2">Report Generator</h3>
              <p className="text-sm text-nexus-text-secondary">Generate comprehensive reports</p>
            </div>
          </button>

          <button
            onClick={() => onViewChange('opportunities')}
            className="nexus-card hover:border-nexus-accent-green transition-all cursor-pointer"
          >
            <div className="text-center">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-semibold text-nexus-text-primary mb-2">Live Opportunities</h3>
              <p className="text-sm text-nexus-text-secondary">Real-time investment data</p>
            </div>
          </button>

          <button
            onClick={() => onViewChange('intelligence')}
            className="nexus-card hover:border-nexus-accent-yellow transition-all cursor-pointer"
          >
            <div className="text-center">
              <div className="text-3xl mb-3">🧠</div>
              <h3 className="font-semibold text-nexus-text-primary mb-2">AI Intelligence</h3>
              <p className="text-sm text-nexus-text-secondary">AI-powered insights</p>
            </div>
          </button>
        </div>

        {/* Recent Activity */}
        <div className="nexus-card mb-8">
          <h3 className="text-xl font-semibold text-nexus-text-primary mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {completedSteps.slice(-5).reverse().map(stepId => {
              const step = WORKFLOW_STEPS.find(s => s.id === stepId);
              if (!step) return null;
              
              return (
                <div key={stepId} className="flex items-center space-x-4 p-3 bg-nexus-surface-700 rounded-lg">
                  <div className="text-2xl">{step.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-nexus-text-primary">{step.title}</h4>
                    <p className="text-sm text-nexus-text-secondary">{step.description}</p>
                  </div>
                  <div className="nexus-badge nexus-badge-green">Completed</div>
                </div>
              );
            })}
            
            {completedSteps.length === 0 && (
              <p className="text-nexus-text-secondary text-center py-8">
                No completed steps yet. Start your intelligence journey!
              </p>
            )}
          </div>
        </div>

        {/* Next Steps */}
        <div className="nexus-card">
          <h3 className="text-xl font-semibold text-nexus-text-primary mb-4">Next Steps</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableSteps.slice(0, 4).map(step => (
              <button
                key={step.id}
                onClick={() => handleStepSelect(step.id)}
                className="nexus-card hover:border-nexus-accent-cyan transition-all cursor-pointer text-left"
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{step.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-nexus-text-primary">{step.title}</h4>
                    <p className="text-sm text-nexus-text-secondary">{step.description}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="nexus-badge nexus-badge-cyan text-xs">
                        {step.estimatedTime}
                      </span>
                      <span className="nexus-badge nexus-badge-purple text-xs">
                        {step.requiredTier}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'integration-dashboard':
        return renderIntegrationDashboard();
      
      case 'reports':
        return (
          <ReportGenerator
            userProfile={userProfile}
            workflowSteps={WORKFLOW_STEPS}
            completedSteps={completedSteps}
            onReportGenerated={handleReportGenerated}
          />
        );
      
      default:
        return renderIntegrationDashboard();
    }
  };

  return (
    <div className="flex-1 overflow-auto">
      {renderCurrentView()}
      
      {showReportViewer && generatedReport && (
        <ReportViewer
          report={generatedReport}
          letter={generatedLetter || ''}
          userProfile={userProfile}
          onClose={handleCloseReportViewer}
          onDownload={handleDownloadReport}
        />
      )}
    </div>
  );
};