import React, { useState, useCallback } from 'react';
import { UserProfileData } from '../core/UserProfileSetup';
import { WorkflowStep } from '../core/TwelveStepWorkflow';

interface SidePanelProps {
  userProfile: UserProfileData | null;
  currentView: string;
  onViewChange: (view: string) => void;
  onProfileClick: () => void;
  onHelpClick: () => void;
  workflowProgress?: {
    currentStep: number;
    completedSteps: number[];
    totalSteps: number;
  };
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  description: string;
  badge?: string | number;
  premium?: boolean;
  color?: string;
}

const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Intelligence Hub',
    icon: '🧠',
    description: 'Central command center',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'workflow',
    label: '12-Step Workflow',
    icon: '🎯',
    description: 'Guided intelligence process',
    badge: 0,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'opportunities',
    label: 'Live Opportunities',
    icon: '⚡',
    description: 'Real-time market opportunities',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'partners',
    label: 'Partner Network',
    icon: '🌐',
    description: 'Global partner connections',
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'intelligence',
    label: 'AI Intelligence',
    icon: '🔮',
    description: 'Advanced AI insights',
    premium: true,
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'reports',
    label: 'Report Center',
    icon: '📊',
    description: 'Generate and manage reports',
    color: 'from-red-500 to-pink-500'
  },
  {
    id: 'letters',
    label: 'Letter Generator',
    icon: '💌',
    description: 'Professional correspondence',
    premium: true,
    color: 'from-cyan-500 to-blue-500'
  },
  {
    id: 'chat',
    label: 'AI Copilot',
    icon: '🤖',
    description: 'Interactive AI assistant',
    color: 'from-emerald-500 to-green-500'
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: '📈',
    description: 'Performance insights',
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: '⚙️',
    description: 'Configure preferences',
    color: 'from-gray-500 to-slate-500'
  }
];

export const SidePanel: React.FC<SidePanelProps> = ({
  userProfile,
  currentView,
  onViewChange,
  onProfileClick,
  onHelpClick,
  workflowProgress,
  isCollapsed = false,
  onToggleCollapse
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleNavigationClick = useCallback((itemId: string) => {
    onViewChange(itemId);
  }, [onViewChange]);

  const getProgressPercentage = useCallback(() => {
    if (!workflowProgress) return 0;
    return (workflowProgress.completedSteps.length / workflowProgress.totalSteps) * 100;
  }, [workflowProgress]);

  const getUserTierInfo = useCallback(() => {
    if (!userProfile) return null;
    
    // Import USER_TIERS from UserProfileSetup
    const { USER_TIERS } = require('../core/UserProfileSetup');
    return USER_TIERS.find(tier => tier.id === userProfile.tier);
  }, [userProfile]);

  const userTier = getUserTierInfo();

  if (isCollapsed) {
    return (
      <div className="w-16 bg-nexus-surface-900 border-r border-nexus-surface-700 flex flex-col items-center py-4 space-y-4">
        {/* Logo */}
        <div className="w-10 h-10 bg-gradient-to-br from-nexus-accent-cyan to-nexus-accent-purple rounded-lg flex items-center justify-center mb-6">
          <span className="text-white text-lg font-bold">N</span>
        </div>

        {/* Navigation Icons */}
        {NAVIGATION_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavigationClick(item.id)}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all relative ${
              currentView === item.id
                ? 'bg-nexus-accent-cyan text-nexus-primary-900'
                : 'bg-nexus-surface-800 text-nexus-text-secondary hover:bg-nexus-surface-700 hover:text-nexus-text-primary'
            }`}
            title={item.label}
          >
            <span className="text-lg">{item.icon}</span>
            {item.badge !== undefined && item.badge > 0 && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-nexus-accent-cyan rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-nexus-primary-900">{item.badge}</span>
              </div>
            )}
            {item.premium && (
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full" />
            )}
          </button>
        ))}

        {/* Expand Button */}
        <button
          onClick={onToggleCollapse}
          className="w-10 h-10 rounded-lg bg-nexus-surface-800 text-nexus-text-secondary hover:bg-nexus-surface-700 hover:text-nexus-text-primary flex items-center justify-center mt-auto"
          title="Expand Panel"
        >
          <span className="text-lg">→</span>
        </button>
      </div>
    );
  }

  return (
    <div className="w-80 bg-nexus-surface-900 border-r border-nexus-surface-700 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-nexus-surface-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-nexus-accent-cyan to-nexus-accent-purple rounded-lg flex items-center justify-center">
              <span className="text-white text-lg font-bold">N</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-nexus-text-primary">Nexus AI</h1>
              <p className="text-sm text-nexus-text-secondary">Intelligence Platform</p>
            </div>
          </div>
          <button
            onClick={onToggleCollapse}
            className="text-nexus-text-secondary hover:text-nexus-text-primary transition-colors"
            title="Collapse Panel"
          >
            <span className="text-lg">←</span>
          </button>
        </div>

        {/* User Profile */}
        {userProfile && (
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="w-full bg-nexus-surface-800 rounded-lg p-3 flex items-center space-x-3 hover:bg-nexus-surface-700 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-nexus-accent-cyan to-nexus-accent-purple rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">
                  {userProfile.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 text-left">
                <div className="font-medium text-nexus-text-primary text-sm">{userProfile.name}</div>
                <div className="text-xs text-nexus-text-secondary">{userProfile.title}</div>
                {userTier && (
                  <div className="text-xs text-nexus-accent-cyan">{userTier.name}</div>
                )}
              </div>
              <span className="text-nexus-text-secondary">▼</span>
            </button>

            {showProfileMenu && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-nexus-surface-800 rounded-lg shadow-lg border border-nexus-surface-700 z-50">
                <button
                  onClick={() => {
                    onProfileClick();
                    setShowProfileMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-nexus-text-primary hover:bg-nexus-surface-700 transition-colors"
                >
                  View Profile
                </button>
                <button
                  onClick={() => {
                    onHelpClick();
                    setShowProfileMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-nexus-text-primary hover:bg-nexus-surface-700 transition-colors border-t border-nexus-surface-700"
                >
                  Help & Support
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Workflow Progress */}
      {workflowProgress && (
        <div className="p-4 border-b border-nexus-surface-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-nexus-text-primary">Workflow Progress</span>
            <span className="text-xs text-nexus-text-secondary">
              {workflowProgress.completedSteps.length}/{workflowProgress.totalSteps}
            </span>
          </div>
          <div className="w-full bg-nexus-surface-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-nexus-accent-cyan to-nexus-accent-purple h-2 rounded-full transition-all duration-300"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
          <div className="text-xs text-nexus-text-secondary mt-2">
            Step {workflowProgress.currentStep} of {workflowProgress.totalSteps}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {NAVIGATION_ITEMS.map((item) => {
            const isActive = currentView === item.id;
            const gradient = item.color ? `bg-gradient-to-r ${item.color}` : 'bg-nexus-surface-800';
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavigationClick(item.id)}
                className={`w-full rounded-lg p-3 text-left transition-all relative overflow-hidden ${
                  isActive
                    ? 'bg-nexus-accent-cyan text-nexus-primary-900'
                    : 'bg-nexus-surface-800 text-nexus-text-secondary hover:bg-nexus-surface-700 hover:text-nexus-text-primary'
                }`}
              >
                <div className={`absolute inset-0 opacity-10 ${isActive ? '' : gradient}`} />
                <div className="relative z-10 flex items-center space-x-3">
                  <span className="text-lg">{item.icon}</span>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{item.label}</div>
                    <div className="text-xs opacity-75">{item.description}</div>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <div className="bg-nexus-accent-cyan text-nexus-primary-900 text-xs font-bold px-2 py-1 rounded-full">
                      {item.badge}
                    </div>
                  )}
                  {item.premium && (
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" title="Premium Feature" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-nexus-text-secondary mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <button
              onClick={() => onViewChange('workflow')}
              className="w-full bg-gradient-to-r from-nexus-accent-cyan to-nexus-accent-cyan/80 text-nexus-primary-900 rounded-lg p-3 text-left hover:from-nexus-accent-cyan/90 hover:to-nexus-accent-cyan/70 transition-all"
            >
              <div className="font-medium text-sm">Start New Analysis</div>
              <div className="text-xs opacity-75">Begin 12-step workflow</div>
            </button>
            
            <button
              onClick={() => onViewChange('chat')}
              className="w-full bg-nexus-surface-800 rounded-lg p-3 text-left hover:bg-nexus-surface-700 transition-colors"
            >
              <div className="font-medium text-sm text-nexus-text-primary">AI Copilot</div>
              <div className="text-xs text-nexus-text-secondary">Get instant assistance</div>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-nexus-surface-700">
        <button
          onClick={onHelpClick}
          className="w-full bg-nexus-surface-800 rounded-lg p-3 flex items-center justify-center space-x-2 hover:bg-nexus-surface-700 transition-colors"
        >
          <span className="text-nexus-text-secondary">❓</span>
          <span className="text-sm text-nexus-text-primary">Help & Support</span>
        </button>
      </div>
    </div>
  );
};