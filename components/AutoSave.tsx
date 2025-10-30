import React, { useState, useEffect, useCallback } from 'react';
import { SaveIcon } from './Icons.tsx';

interface AutoSaveProps {
  data: any;
  onSave: (data: any) => Promise<void>;
  delay?: number;
  enabled?: boolean;
  className?: string;
}

export const AutoSave: React.FC<AutoSaveProps> = ({
  data,
  onSave,
  delay = 2000,
  enabled = true,
  className = ''
}) => {
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const saveData = useCallback(async (dataToSave: any) => {
    if (!enabled) return;

    setSaveStatus('saving');
    try {
      await onSave(dataToSave);
      setSaveStatus('saved');
      setLastSaved(new Date());
    } catch (error) {
      setSaveStatus('error');
      console.error('Auto-save failed:', error);
    }
  }, [onSave, enabled]);

  useEffect(() => {
    if (!enabled || !data) return;

    const timeoutId = setTimeout(() => {
      saveData(data);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [data, delay, saveData, enabled]);

  const getStatusText = () => {
    switch (saveStatus) {
      case 'saving':
        return 'Saving...';
      case 'saved':
        return lastSaved ? `Saved ${formatTimeAgo(lastSaved)}` : 'Saved';
      case 'error':
        return 'Save failed';
      default:
        return 'All changes saved';
    }
  };

  const getStatusColor = () => {
    switch (saveStatus) {
      case 'saving':
        return 'text-blue-600';
      case 'saved':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-gray-500';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  if (!enabled) return null;

  return (
    <div className={`flex items-center gap-2 text-sm ${getStatusColor()} ${className}`}>
      <SaveIcon className="h-4 w-4" />
      <span>{getStatusText()}</span>
    </div>
  );
};

interface AutoSaveIndicatorProps {
  isDirty: boolean;
  lastSaved?: Date;
  className?: string;
}

export const AutoSaveIndicator: React.FC<AutoSaveIndicatorProps> = ({
  isDirty,
  lastSaved,
  className = ''
}) => {
  return (
    <div className={`flex items-center gap-2 text-sm ${className}`}>
      {isDirty ? (
        <>
          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
          <span className="text-yellow-600">Unsaved changes</span>
        </>
      ) : (
        <>
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <span className="text-green-600">
            {lastSaved ? `Saved ${formatTimeAgo(lastSaved)}` : 'All changes saved'}
          </span>
        </>
      )}
    </div>
  );
};

const formatTimeAgo = (date: Date) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
};

export default AutoSave;