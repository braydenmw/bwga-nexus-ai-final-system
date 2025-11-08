import React, { useState, useCallback, useEffect } from 'react';
import { SidePanel } from './components/layout/SidePanel';
import { UserProfileSetup, UserProfileData } from './components/core/UserProfileSetup';
import { TwelveStepWorkflow, WorkflowStep, EngagementStyle, ReportFormat } from './components/core/TwelveStepWorkflow';
import { ReportGenerator } from './components/reports/ReportGenerator';
import { ReportViewer } from './components/reports/ReportViewer';
import { WORKFLOW_STEPS } from './data/workflowSteps';
import { NexusIntelligenceHub } from './components/core/NexusIntelligenceHub';
import { CopilotAssistant } from './components/core/CopilotAssistant';
import { IntelligenceDashboard } from './components/core/IntelligenceDashboard';
import { ContextualHelp } from './components/shared/ContextualHelp';
import { NexusIntegration } from './components/integration/NexusIntegration';

// Import the original dist components
import { GoalAnalyzer } from './components/dist/GoalAnalyzer';
import { ContextEngine } from './components/dist/ContextEngine';
import { RROIDisplay } from './components/dist/RROIDisplay';
import { TPTSimulator } from './components/dist/TPTSimulator';
import { SEAMMapper } from './components/dist/SEAMMapper';
import { PartnerNetwork } from './components/dist/PartnerNetwork';
import { RiskMatrix } from './components/dist/RiskMatrix';
import { ImplementationRoadmap } from './components/dist/ImplementationRoadmap';
import { OpportunityTracker } from './components/dist/OpportunityTracker';

interface AppState {
  userProfile: UserProfileData | null;
  currentView: string;
  showProfileSetup: boolean;
  sidePanelCollapsed: boolean;
  workflowData: Record<number, any>;
  currentWorkflowStep: number;
  completedWorkflowSteps: number[];
  selectedEngagementStyle?: EngagementStyle;
  selectedReportFormat?: ReportFormat;
  showCopilot: boolean;
  showHelp: boolean;
  helpContext: string;
  generatedReport: string | null;
  generatedLetter: string | null;
  showReportViewer: boolean;
}

function App() {
  const [appState, setAppState] = useState<AppState>({
    userProfile: null,
    currentView: 'dashboard',
    showProfileSetup: true,
    sidePanelCollapsed: false,
    workflowData: {},
    currentWorkflowStep: 1,
    completedWorkflowSteps: [],
    showCopilot: false,
    showHelp: false,
    helpContext: '',
    generatedReport: null,
    generatedLetter: null,
    showReportViewer: false
  });

  // Load user profile from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('nexusUserProfile');
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);
        setAppState(prev => ({
          ...prev,
          userProfile: profile,
          showProfileSetup: false
        }));
      } catch (error) {
        console.error('Failed to load saved profile:', error);
      }
    }
  }, []);

  const handleProfileComplete = useCallback((profile: UserProfileData) => {
    setAppState(prev => ({
      ...prev,
      userProfile: profile,
      showProfileSetup: false
    }));
    localStorage.setItem('nexusUserProfile', JSON.stringify(profile));
  }, []);

  const handleViewChange = useCallback((view: string) => {
    setAppState(prev => ({
      ...prev,
      currentView: view
    }));
  }, []);

  const handleProfileClick = useCallback(() => {
    setAppState(prev => ({
      ...prev,
      showProfileSetup: true
    }));
  }, []);

  const handleHelpClick = useCallback(() => {
    setAppState(prev => ({
      ...prev,
      showHelp: true,
      helpContext: 'General help and support'
    }));
  }, []);

  const handleWorkflowStepComplete = useCallback((stepId: number, data: any) => {
    setAppState(prev => ({
      ...prev,
      workflowData: {
        ...prev.workflowData,
        [stepId]: data
      },
      completedWorkflowSteps: prev.completedWorkflowSteps.includes(stepId)
        ? prev.completedWorkflowSteps
        : [...prev.completedWorkflowSteps, stepId]
    }));
  }, []);

  const handleWorkflowStepSelect = useCallback((stepId: number) => {
    setAppState(prev => ({
      ...prev,
      currentWorkflowStep: stepId,
      currentView: 'workflow-step'
    }));
  }, []);

  const handleEngagementStyleSelect = useCallback((style: EngagementStyle) => {
    setAppState(prev => ({
      ...prev,
      selectedEngagementStyle: style
    }));
  }, []);

  const handleReportFormatSelect = useCallback((format: ReportFormat) => {
    setAppState(prev => ({
      ...prev,
      selectedReportFormat: format
    }));
  }, []);

  const toggleCopilot = useCallback(() => {
    setAppState(prev => ({
      ...prev,
      showCopilot: !prev.showCopilot
    }));
  }, []);

  const closeHelp = useCallback(() => {
    setAppState(prev => ({
      ...prev,
      showHelp: false,
      helpContext: ''
    }));
  }, []);

  const handleReportGenerated = useCallback((report: string, letter: string) => {
    setAppState(prev => ({
      ...prev,
      generatedReport: report,
      generatedLetter: letter,
      showReportViewer: true
    }));
  }, []);

  const handleCloseReportViewer = useCallback(() => {
    setAppState(prev => ({
      ...prev,
      showReportViewer: false
    }));
  }, []);

  const handleDownloadReport = useCallback((format: 'pdf' | 'word' | 'markdown') => {
    // Implement download functionality
    console.log(`Downloading report in ${format} format`);
    // This would typically involve calling a backend API or using a client-side library
    alert(`Report download in ${format} format would be implemented here`);
  }, []);

  const renderCurrentView = () => {
    if (appState.showProfileSetup) {
      return (
        <div className="flex-1 flex items-center justify-center bg-nexus-surface-900">
          <UserProfileSetup
            onProfileComplete={handleProfileComplete}
            onRequestHelp={(context) => {
              setAppState(prev => ({
                ...prev,
                showHelp: true,
                helpContext: context
              }));
            }}
          />
        </div>
      );
    }

    switch (appState.currentView) {
      case 'dashboard':
        return (
          <div className="flex-1 overflow-auto">
            <NexusIntelligenceHub
              onStepComplete={handleWorkflowStepComplete}
              onRequestHelp={(context) => {
                setAppState(prev => ({
                  ...prev,
                  showHelp: true,
                  helpContext: context
                }));
              }}
            />
          </div>
        );

      case 'workflow':
        return (
          <div className="flex-1 overflow-auto">
            <TwelveStepWorkflow
              userTier={appState.userProfile ? require('./components/core/UserProfileSetup').USER_TIERS.find(t => t.id === appState.userProfile!.tier) : require('./components/core/UserProfileSetup').USER_TIERS[0]}
              currentStep={appState.currentWorkflowStep}
              completedSteps={appState.completedWorkflowSteps}
              onStepComplete={handleWorkflowStepComplete}
              onStepSelect={handleWorkflowStepSelect}
              onEngagementStyleSelect={handleEngagementStyleSelect}
              onReportFormatSelect={handleReportFormatSelect}
              selectedEngagementStyle={appState.selectedEngagementStyle}
              selectedReportFormat={appState.selectedReportFormat}
              workflowData={appState.workflowData}
            />
          </div>
        );

      case 'workflow-step':
        return renderWorkflowStep();

      case 'opportunities':
        return (
          <div className="flex-1 overflow-auto">
            <OpportunityTracker
              onOpportunitySelect={(opportunity) => {
                console.log('Selected opportunity:', opportunity);
              }}
              onRequestHelp={(context) => {
                setAppState(prev => ({
                  ...prev,
                  showHelp: true,
                  helpContext: context
                }));
              }}
            />
          </div>
        );

      case 'partners':
        return (
          <div className="flex-1 overflow-auto">
            <PartnerNetwork
              onPartnerSelect={(partner) => {
                console.log('Selected partner:', partner);
              }}
              onRequestHelp={(context) => {
                setAppState(prev => ({
                  ...prev,
                  showHelp: true,
                  helpContext: context
                }));
              }}
            />
          </div>
        );

      case 'intelligence':
        return (
          <div className="flex-1 overflow-auto">
            <IntelligenceDashboard
              onInsightSelect={(insight) => {
                console.log('Selected insight:', insight);
              }}
              onRequestHelp={(context) => {
                setAppState(prev => ({
                  ...prev,
                  showHelp: true,
                  helpContext: context
                }));
              }}
            />
          </div>
        );

      case 'reports':
        return (
          <div className="flex-1 overflow-auto">
            <ReportGenerator
              userProfile={appState.userProfile!}
              workflowSteps={WORKFLOW_STEPS}
              completedSteps={appState.completedWorkflowSteps}
              onReportGenerated={handleReportGenerated}
            />
          </div>
        );
      
      case 'integration':
        return (
          <div className="flex-1 overflow-auto">
            <NexusIntegration
              userProfile={appState.userProfile!}
              currentView={appState.currentView}
              onViewChange={handleViewChange}
            />
          </div>
        );

      case 'letters':
        return (
          <div className="flex-1 overflow-auto">
            <div className="p-8">
              <h1 className="text-3xl font-bold text-nexus-text-primary mb-6">Letter Generator</h1>
              <p className="text-nexus-text-secondary">Professional letter generation coming soon...</p>
            </div>
          </div>
        );

      case 'chat':
        return (
          <div className="flex-1 overflow-auto">
            <CopilotAssistant
              onMessageSend={(message) => {
                console.log('User message:', message);
              }}
              onRequestHelp={(context) => {
                setAppState(prev => ({
                  ...prev,
                  showHelp: true,
                  helpContext: context
                }));
              }}
            />
          </div>
        );

      case 'analytics':
        return (
          <div className="flex-1 overflow-auto">
            <div className="p-8">
              <h1 className="text-3xl font-bold text-nexus-text-primary mb-6">Analytics Dashboard</h1>
              <p className="text-nexus-text-secondary">Analytics and insights coming soon...</p>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="flex-1 overflow-auto">
            <div className="p-8">
              <h1 className="text-3xl font-bold text-nexus-text-primary mb-6">Settings</h1>
              <p className="text-nexus-text-secondary">Settings and preferences coming soon...</p>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex-1 overflow-auto">
            <div className="p-8">
              <h1 className="text-3xl font-bold text-nexus-text-primary mb-6">Page Not Found</h1>
              <p className="text-nexus-text-secondary">The requested page could not be found.</p>
            </div>
          </div>
        );
    }
  };

  const renderWorkflowStep = () => {
    const stepId = appState.currentWorkflowStep;
    const stepData = appState.workflowData[stepId];

    switch (stepId) {
      case 1:
        return (
          <div className="flex-1 overflow-auto">
            <GoalAnalyzer
              initialGoal={stepData?.goal || ''}
              onGoalSubmit={(goal) => handleWorkflowStepComplete(stepId, { goal })}
              onRequestHelp={(context) => {
                setAppState(prev => ({
                  ...prev,
                  showHelp: true,
                  helpContext: context
                }));
              }}
            />
          </div>
        );
      case 2:
        return (
          <div className="flex-1 overflow-auto">
            <ContextEngine
              initialContext={stepData?.context || {}}
              onContextSubmit={(context) => handleWorkflowStepComplete(stepId, { context })}
              onRequestHelp={(context) => {
                setAppState(prev => ({
                  ...prev,
                  showHelp: true,
                  helpContext: context
                }));
              }}
            />
          </div>
        );
      case 3:
        return (
          <div className="flex-1 overflow-auto">
            <OpportunityTracker
              onOpportunitySelect={(opportunity) => handleWorkflowStepComplete(stepId, { opportunity })}
              onRequestHelp={(context) => {
                setAppState(prev => ({
                  ...prev,
                  showHelp: true,
                  helpContext: context
                }));
              }}
            />
          </div>
        );
      case 4:
        return (
          <div className="flex-1 overflow-auto">
            <PartnerNetwork
              onPartnerSelect={(partner) => handleWorkflowStepComplete(stepId, { partner })}
              onRequestHelp={(context) => {
                setAppState(prev => ({
                  ...prev,
                  showHelp: true,
                  helpContext: context
                }));
              }}
            />
          </div>
        );
      case 5:
        return (
          <div className="flex-1 overflow-auto">
            <RiskMatrix
              onRiskAssessment={(risks) => handleWorkflowStepComplete(stepId, { risks })}
              onRequestHelp={(context) => {
                setAppState(prev => ({
                  ...prev,
                  showHelp: true,
                  helpContext: context
                }));
              }}
            />
          </div>
        );
      case 6:
        return (
          <div className="flex-1 overflow-auto">
            <RROIDisplay
              onROIAnalysis={(roi) => handleWorkflowStepComplete(stepId, { roi })}
              onRequestHelp={(context) => {
                setAppState(prev => ({
                  ...prev,
                  showHelp: true,
                  helpContext: context
                }));
              }}
            />
          </div>
        );
      case 7:
        return (
          <div className="flex-1 overflow-auto">
            <TPTSimulator
              onPathwaySelect={(pathway) => handleWorkflowStepComplete(stepId, { pathway })}
              onRequestHelp={(context) => {
                setAppState(prev => ({
                  ...prev,
                  showHelp: true,
                  helpContext: context
                }));
              }}
            />
          </div>
        );
      case 8:
        return (
          <div className="flex-1 overflow-auto">
            <SEAMMapper
              onArchitectureSelect={(architecture) => handleWorkflowStepComplete(stepId, { architecture })}
              onRequestHelp={(context) => {
                setAppState(prev => ({
                  ...prev,
                  showHelp: true,
                  helpContext: context
                }));
              }}
            />
          </div>
        );
      case 9:
        return (
          <div className="flex-1 overflow-auto">
            <ImplementationRoadmap
              onRoadmapSelect={(roadmap) => handleWorkflowStepComplete(stepId, { roadmap })}
              onRequestHelp={(context) => {
                setAppState(prev => ({
                  ...prev,
                  showHelp: true,
                  helpContext: context
                }));
              }}
            />
          </div>
        );
      case 10:
        return (
          <div className="flex-1 overflow-auto">
            <IntelligenceDashboard
              onInsightSelect={(insight) => handleWorkflowStepComplete(stepId, { insight })}
              onRequestHelp={(context) => {
                setAppState(prev => ({
                  ...prev,
                  showHelp: true,
                  helpContext: context
                }));
              }}
            />
          </div>
        );
      default:
        return (
          <div className="flex-1 overflow-auto">
            <div className="p-8">
              <h1 className="text-3xl font-bold text-nexus-text-primary mb-6">Workflow Step {stepId}</h1>
              <p className="text-nexus-text-secondary">This step is under development...</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="h-screen bg-nexus-surface-900 text-nexus-text-primary flex">
      {/* Side Panel */}
      <SidePanel
        userProfile={appState.userProfile}
        currentView={appState.currentView}
        onViewChange={handleViewChange}
        onProfileClick={handleProfileClick}
        onHelpClick={handleHelpClick}
        workflowProgress={{
          currentStep: appState.currentWorkflowStep,
          completedSteps: appState.completedWorkflowSteps,
          totalSteps: 12
        }}
        isCollapsed={appState.sidePanelCollapsed}
        onToggleCollapse={() => setAppState(prev => ({
          ...prev,
          sidePanelCollapsed: !prev.sidePanelCollapsed
        }))}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {renderCurrentView()}
      </div>

      {/* Copilot Assistant */}
      {appState.showCopilot && (
        <div className="w-96 bg-nexus-surface-800 border-l border-nexus-surface-700 flex flex-col">
          <div className="p-4 border-b border-nexus-surface-700 flex items-center justify-between">
            <h3 className="font-semibold text-nexus-text-primary">AI Copilot</h3>
            <button
              onClick={toggleCopilot}
              className="text-nexus-text-secondary hover:text-nexus-text-primary transition-colors"
            >
              ✕
            </button>
          </div>
          <div className="flex-1 overflow-auto">
            <CopilotAssistant
              onMessageSend={(message) => {
                console.log('Copilot message:', message);
              }}
              onRequestHelp={(context) => {
                setAppState(prev => ({
                  ...prev,
                  showHelp: true,
                  helpContext: context
                }));
              }}
            />
          </div>
        </div>
      )}

      {/* Contextual Help */}
      {appState.showHelp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-nexus-surface-800 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-auto">
            <div className="p-6 border-b border-nexus-surface-700 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-nexus-text-primary">Help & Support</h3>
              <button
                onClick={closeHelp}
                className="text-nexus-text-secondary hover:text-nexus-text-primary transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <ContextualHelp
                context={appState.helpContext}
                onClose={closeHelp}
              />
            </div>
          </div>
        </div>
      )}

      {/* Floating Copilot Toggle */}
      {!appState.showCopilot && (
        <button
          onClick={toggleCopilot}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-nexus-accent-cyan to-nexus-accent-purple rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-all hover:scale-110"
          title="Open AI Copilot"
        >
          <span className="text-xl">🤖</span>
        </button>
      )}

      {/* Report Viewer Modal */}
      {appState.showReportViewer && appState.generatedReport && (
        <ReportViewer
          report={appState.generatedReport}
          letter={appState.generatedLetter || ''}
          userProfile={appState.userProfile!}
          onClose={handleCloseReportViewer}
          onDownload={handleDownloadReport}
        />
      )}
    </div>
  );
}

export default App;