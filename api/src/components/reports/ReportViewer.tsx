import React, { useState } from 'react';
import { UserProfile } from '../../../types';

interface ReportViewerProps {
  report: string;
  letter: string;
  userProfile: UserProfile;
  onClose: () => void;
  onDownload: (format: 'pdf' | 'word' | 'markdown') => void;
}

export const ReportViewer: React.FC<ReportViewerProps> = ({
  report,
  letter,
  userProfile,
  onClose,
  onDownload
}) => {
  const [activeTab, setActiveTab] = useState<'report' | 'letter'>('report');
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);

  const downloadFormats = [
    { id: 'pdf', name: 'PDF Document', icon: '📄', color: 'red' },
    { id: 'word', name: 'Word Document', icon: '📝', color: 'blue' },
    { id: 'markdown', name: 'Markdown', icon: '📊', color: 'green' }
  ];

  const handleDownload = (format: string) => {
    onDownload(format as any);
    setShowDownloadMenu(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      // Show success notification (you could add a toast notification here)
      alert('Content copied to clipboard!');
    });
  };

  const printReport = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-nexus-surface-800 rounded-xl shadow-2xl max-w-6xl w-full max-h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-nexus-surface-700">
          <div>
            <h2 className="text-2xl font-bold text-nexus-text-primary">
              Nexus Intelligence Report
            </h2>
            <p className="text-nexus-text-secondary">
              Generated for {userProfile.name} - {userProfile.role}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            {/* Action Buttons */}
            <button
              onClick={printReport}
              className="nexus-button nexus-button-secondary text-sm"
              title="Print Report"
            >
              🖨️ Print
            </button>
            
            {/* Download Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowDownloadMenu(!showDownloadMenu)}
                className="nexus-button nexus-button-primary text-sm"
              >
                📥 Download
              </button>
              
              {showDownloadMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-nexus-surface-700 rounded-lg shadow-lg border border-nexus-surface-600 z-10">
                  {downloadFormats.map((format) => (
                    <button
                      key={format.id}
                      onClick={() => handleDownload(format.id)}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-nexus-surface-600 transition-colors first:rounded-t-lg last:rounded-b-lg"
                    >
                      <span className="text-lg">{format.icon}</span>
                      <span className="text-nexus-text-primary">{format.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <button
              onClick={onClose}
              className="nexus-button nexus-button-outline text-sm"
            >
              ✕ Close
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-nexus-surface-700">
          <button
            onClick={() => setActiveTab('report')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'report'
                ? 'text-nexus-accent-cyan border-b-2 border-nexus-accent-cyan'
                : 'text-nexus-text-secondary hover:text-nexus-text-primary'
            }`}
          >
            📊 Intelligence Report
          </button>
          {letter && (
            <button
              onClick={() => setActiveTab('letter')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'letter'
                  ? 'text-nexus-accent-cyan border-b-2 border-nexus-accent-cyan'
                  : 'text-nexus-text-secondary hover:text-nexus-text-primary'
              }`}
            >
              ✉️ Introduction Letter
            </button>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto p-6">
            {activeTab === 'report' ? (
              <div className="prose prose-invert max-w-none">
                <div className="bg-nexus-surface-900 rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-nexus-text-primary">
                      Executive Summary
                    </h3>
                    <button
                      onClick={() => copyToClipboard(report)}
                      className="nexus-button nexus-button-secondary text-sm"
                    >
                      📋 Copy
                    </button>
                  </div>
                  <div className="text-nexus-text-secondary">
                    Report generated on {new Date().toLocaleDateString()} for {userProfile.name}
                  </div>
                </div>
                
                <div className="bg-nexus-surface-900 rounded-lg p-6">
                  <div dangerouslySetInnerHTML={{ __html: report }} />
                </div>
              </div>
            ) : (
              <div className="prose prose-invert max-w-none">
                <div className="bg-nexus-surface-900 rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-nexus-text-primary">
                      Introduction Letter
                    </h3>
                    <button
                      onClick={() => copyToClipboard(letter)}
                      className="nexus-button nexus-button-secondary text-sm"
                    >
                      📋 Copy
                    </button>
                  </div>
                  <div className="text-nexus-text-secondary">
                    Formal introduction letter for {userProfile.name}
                  </div>
                </div>
                
                <div className="bg-nexus-surface-900 rounded-lg p-6">
                  <div dangerouslySetInnerHTML={{ __html: letter }} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-nexus-surface-700 bg-nexus-surface-900">
          <div className="flex items-center justify-between">
            <div className="text-sm text-nexus-text-secondary">
              Report ID: {Date.now().toString(36).toUpperCase()} | 
              Generated: {new Date().toLocaleString()} | 
              Tier: {userProfile.tier.toUpperCase()}
            </div>
            <div className="flex items-center space-x-4">
              <div className="nexus-badge nexus-badge-cyan">
                {activeTab === 'report' ? 'Intelligence Report' : 'Introduction Letter'}
              </div>
              <div className="nexus-badge nexus-badge-purple">
                {userProfile.tier.toUpperCase()} Tier
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};