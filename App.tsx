import React, { useState, useCallback, useEffect } from 'react';
import type { View, ReportParameters, LiveOpportunityItem, SymbiosisContext, UserProfile as UserProfileType, ChatMessage, ReportSuggestions } from './types.ts';
import { Header } from './components/Header.tsx';

import { LiveOpportunities } from './components/LiveOpportunities.tsx';
import ReportViewer from './components/ReportViewer.tsx';
import Compliance from './components/Compliance.tsx';
import SymbiosisChatModal from './components/SymbiosisChatModal.tsx';
import { AnalysisModal } from './components/AnalysisModal.tsx';
import { LetterGeneratorModal } from './components/LetterGeneratorModal.tsx';
import { generateLetterStream, fetchSymbiosisResponse } from './services/nexusService.ts';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import { COUNTRIES, INDUSTRIES, AI_PERSONAS, ORGANIZATION_TYPES, ANALYTICAL_LENSES, TONES_AND_STYLES } from './constants.tsx';
import { SampleReport } from './components/SampleReport.tsx';
import { TechnicalManual } from './components/TechnicalManual.tsx';
import WhoWeAre from './components/WhoWeAre.tsx';
import TermsAndConditions from './components/TermsAndConditions.tsx';
import BlueprintReportWizard from './components/BlueprintReportWizard.tsx';
import { saveAutoSave, loadAutoSave, clearAutoSave, getSavedReports, saveReport, deleteReport } from './services/storageService.ts';

const initialReportParams: ReportParameters = {
    reportName: '',
    tier: [],
    userName: '',
    userDepartment: '',
    organizationType: ORGANIZATION_TYPES[0],
    userCountry: '',
    aiPersona: [AI_PERSONAS[0].id],
    customAiPersona: '',
    analyticalLens: [ANALYTICAL_LENSES[0]],
    toneAndStyle: [TONES_AND_STYLES[0]],
    region: '',
    industry: [INDUSTRIES[0].id],
    customIndustry: '',
    idealPartnerProfile: '',
    problemStatement: '',
    analysisTimeframe: 'Any Time',
    analyticalModules: [],
    reportLength: 'standard',
    outputFormat: 'report',
};

function App() {
  const [currentView, setCurrentView] = useState<View>('who-we-are');
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState<boolean>(() => {
    // Check if user has already accepted terms
    return localStorage.getItem('bwga-nexus-terms-accepted') === 'true';
  });

  // Simplified state - BlueprintReportWizard handles its own state
  const [savedReports, setSavedReports] = useState<ReportParameters[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // State for modals and shared context
  const [symbiosisContext, setSymbiosisContext] = useState<SymbiosisContext | null>(null);
  const [analysisItem, setAnalysisItem] = useState<LiveOpportunityItem | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfileType | null>(null);
  const [letterModalOpen, setLetterModalOpen] = useState(false);

  // --- Saved Work Logic ---

  // Initial load
  useEffect(() => {
    setSavedReports(getSavedReports());
  }, []);

  // Toast message handler
  useEffect(() => {
    if (toastMessage) {
        const timer = setTimeout(() => setToastMessage(null), 3000);
        return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handleSaveReport = useCallback((params: ReportParameters) => {
    try {
        const newSavedReports = saveReport(params);
        setSavedReports(newSavedReports);
        setToastMessage(`Blueprint "${params.reportName}" saved.`);
    } catch (e) {
        console.error(e);
        const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred';
        setToastMessage(`Error: ${errorMessage}`);
    }
  }, []);

  const handleLoadReport = useCallback((params: ReportParameters) => {
    setToastMessage(`Blueprint "${params.reportName}" loaded.`);
  }, []);

  const handleDeleteReport = useCallback((reportName: string) => {
    try {
        const newSavedReports = deleteReport(reportName);
        setSavedReports(newSavedReports);
        setToastMessage(`Blueprint "${reportName}" deleted.`);
    } catch (e) {
        console.error(e);
        const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred';
        setToastMessage(`Error: ${errorMessage}`);
    }
  }, []);

  const handleViewChange = (view: View) => {
    // Reset terms acceptance when navigating to report view
    if (view === 'report') {
        setHasAcceptedTerms(localStorage.getItem('bwga-nexus-terms-accepted') === 'true');
    }
    setCurrentView(view);
    // Auto-scroll to top when changing views
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAcceptTerms = () => {
    localStorage.setItem('bwga-nexus-terms-accepted', 'true');
    setHasAcceptedTerms(true);
  };

  const handleDeclineTerms = () => {
    // Redirect to external site or show message
    window.location.href = 'https://www.bwga.com.au';
  };
  
  // BlueprintReportWizard handles its own suggestions internally
  const handleApplySuggestions = useCallback((suggestions: ReportSuggestions) => {
      // This function is kept for compatibility but BlueprintReportWizard manages its own state
      console.log('Suggestions applied:', suggestions);
  }, []);

  // BlueprintReportWizard handles report updates internally
  const handleReportUpdate = useCallback((params: ReportParameters, content: string, error: string | null, generating: boolean) => {
    // This function is kept for compatibility but BlueprintReportWizard manages its own state
    console.log('Report update:', { params, content, error, generating });
  }, []);

  const handleAnalyzeOpportunity = useCallback((item: LiveOpportunityItem) => {
    setAnalysisItem(item);
  }, []);

  const handleStartSymbiosis = useCallback((context: SymbiosisContext) => {
    setSymbiosisContext(context);
  }, []);

  const handleGenerateLetter = useCallback(() => {
    setLetterModalOpen(true);
  }, []);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'sample-report':
        return <div className="view-container"><SampleReport /></div>;
      case 'technical-manual':
        return <div className="view-container"><TechnicalManual onGetStarted={() => handleViewChange('report')} /></div>;
      case 'who-we-are':
        return <div className="view-container"><WhoWeAre onViewChange={handleViewChange} /></div>;
      case 'opportunities':
        return <div className="view-container"><LiveOpportunities onAnalyze={handleAnalyzeOpportunity} onStartSymbiosis={handleStartSymbiosis} /></div>;
      case 'report':
        return (
          <div className="h-full">
            <BlueprintReportWizard />
          </div>
        );
      case 'compliance':
        return <div className="view-container"><Compliance /></div>;
      default:
        return <div className="view-container"><WhoWeAre onViewChange={handleViewChange} /></div>;
    }
  };
  



  // Show terms and conditions if not accepted and trying to access report
  if (!hasAcceptedTerms && currentView === 'report') {
    return (
      <ErrorBoundary>
        <TermsAndConditions
          onAccept={handleAcceptTerms}
          onDecline={handleDeclineTerms}
          isModal={true}
        />
      </ErrorBoundary>
    );
  }

  // Blueprint wizard is now handled in the main render logic above

  return (
    <ErrorBoundary>
      <div className="aurora-background" style={{height: '100vh', display: 'flex', flexDirection: 'column'}}>
        <Header currentView={currentView} onViewChange={handleViewChange} />
        <main className="pt-20 flex-grow overflow-y-auto" style={{height: 'calc(100vh - 80px)'}}>
          {/* The container below ensures consistent padding and max-width for non-workspace views */}
          <div className={`min-h-full ${currentView !== 'report' ? 'container mx-auto px-4 md:px-8' : ''}`}>
            {renderCurrentView()}
          </div>
        </main>

        {toastMessage && (
            <div className="fixed bottom-4 right-4 bg-nexus-surface-700 text-nexus-text-primary px-4 py-2 rounded-lg shadow-lg border border-nexus-accent-cyan/50 animate-fadeIn z-50">
                {toastMessage}
            </div>
        )}

        {symbiosisContext && (
          <SymbiosisChatModal
            isOpen={!!symbiosisContext}
            onClose={() => setSymbiosisContext(null)}
            context={symbiosisContext}
            onSendMessage={(history) => fetchSymbiosisResponse(symbiosisContext, history)}
          />
        )}

        {analysisItem && (
          <AnalysisModal
            item={analysisItem}
            region={userProfile?.userCountry || analysisItem.country}
            onClose={() => setAnalysisItem(null)}
          />
        )}

        {letterModalOpen && (
          <LetterGeneratorModal
            isOpen={letterModalOpen}
            onClose={() => setLetterModalOpen(null)}
            onGenerate={async () => {
              // For now, return a placeholder - BlueprintReportWizard should handle letter generation
              return "Letter generation is handled within the Blueprint Report Wizard.";
            }}
          />
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;