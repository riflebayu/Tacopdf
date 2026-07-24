import React, { useState, useEffect, useRef } from 'react';
import { Clock, CheckCircle2, Trash2, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TOOLS } from '../data/tools';
import TacoIcon from './TacoIcon';

export interface ActivityLog {
  id: string;
  toolId: string;
  filename: string;
  timestamp: number;
}

export function logRecentActivity(toolId: string, filename: string) {
  try {
    const saved = localStorage.getItem('tacopdf-recent-activity');
    const logs: ActivityLog[] = saved ? JSON.parse(saved) : [];
    
    // Add to top, keep only last 5
    const newLog: ActivityLog = {
      id: Date.now().toString(),
      toolId,
      filename,
      timestamp: Date.now()
    };
    
    const newLogs = [newLog, ...logs].slice(0, 5);
    localStorage.setItem('tacopdf-recent-activity', JSON.stringify(newLogs));
    
    window.dispatchEvent(new Event('tacopdf-activity-updated'));
  } catch (err) {
    console.error("Failed to save activity", err);
  }
}

interface RecentActivityProps {
  isOpen: boolean;
  onClose: () => void;
  isMobile?: boolean;
}

export default function RecentActivity({ isOpen, onClose, isMobile }: RecentActivityProps) {
  const { t, currentLanguage } = useLanguage();
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const loadLogs = () => {
    try {
      const saved = localStorage.getItem('tacopdf-recent-activity');
      if (saved) setLogs(JSON.parse(saved));
      else setLogs([]);
    } catch (_) {}
  };

  useEffect(() => {
    loadLogs();
    window.addEventListener('tacopdf-activity-updated', loadLogs);
    return () => window.removeEventListener('tacopdf-activity-updated', loadLogs);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        if ((e.target as Element).closest('.recent-activity-toggle')) return;
        if ((e.target as Element).closest('.recent-activity-menu')) return;
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleClear = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    localStorage.removeItem('tacopdf-recent-activity');
    setLogs([]);
    window.dispatchEvent(new Event('tacopdf-activity-updated'));
  };

  return (
    <div 
      ref={dropdownRef}
      className={`recent-activity-menu absolute ${isMobile ? 'top-full right-[-60px]' : 'top-[100%] right-0'} pt-2 z-50`}
    >
      <div className="w-80 bg-surface-container border border-outline-variant rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.3)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
        <div className="bg-surface-container-low px-4 py-3 flex items-center justify-between border-b border-outline-variant">
        <h3 className="font-bold text-on-surface flex items-center gap-2 text-sm">
          <Clock size={16} className="text-primary" /> {t('history.title') || 'Recent Activity'}
        </h3>
        {logs.length > 0 && (
          <button 
            type="button"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={handleClear}
            className="text-[10px] text-on-surface-variant hover:text-error transition-colors flex items-center gap-1 cursor-pointer z-50 relative"
          >
            <Trash2 size={12} /> {t('history.clear') || 'Clear'}
          </button>
        )}
      </div>

      <div className="max-h-[300px] overflow-y-auto">
        {logs.length === 0 ? (
          <div className="p-8 text-center text-sm text-on-surface-variant flex flex-col items-center gap-2">
            <Clock size={24} className="opacity-50" />
            <p>{t('history.empty') || 'No recent activity yet.'}</p>
          </div>
        ) : (
          <div className="flex flex-col">
            {logs.map((log, i) => {
              const tool = TOOLS.find(t => t.id === log.toolId);
              if (!tool) return null;

              let timeString = '';
              const diffMs = log.timestamp - Date.now();
              const diffSec = Math.round(diffMs / 1000);
              const absSec = Math.abs(diffSec);

              if (absSec < 60) {
                timeString = absSec < 10 ? (t('history.just_now') || 'just now') : new Intl.RelativeTimeFormat(currentLanguage.code, { numeric: 'auto' }).format(diffSec, 'second');
              } else {
                const diffMin = Math.round(diffSec / 60);
                const absMin = Math.abs(diffMin);
                if (absMin < 60) {
                  timeString = new Intl.RelativeTimeFormat(currentLanguage.code, { numeric: 'auto' }).format(diffMin, 'minute');
                } else {
                  const diffHour = Math.round(diffMin / 60);
                  const absHour = Math.abs(diffHour);
                  if (absHour < 24) {
                    timeString = new Intl.RelativeTimeFormat(currentLanguage.code, { numeric: 'auto' }).format(diffHour, 'hour');
                  } else {
                    const diffDay = Math.round(diffHour / 24);
                    timeString = new Intl.RelativeTimeFormat(currentLanguage.code, { numeric: 'auto' }).format(diffDay, 'day');
                  }
                }
              }

              return (
                <div key={log.id} className={`p-3 flex items-start gap-3 hover:bg-surface-container-lowest transition-colors ${i !== logs.length - 1 ? 'border-b border-outline-variant/30' : ''}`}>
                  <div className="bg-primary-container/20 text-primary p-2 rounded-lg shrink-0">
                    <TacoIcon name={tool.icon} size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-on-surface truncate pr-2" title={log.filename}>
                      {log.filename}
                    </h4>
                    <div className="flex items-center gap-1.5 mt-1">
                      <CheckCircle2 size={10} className="text-green-500" />
                      <span className="text-[10px] font-semibold text-on-surface-variant">{t(`tool_name.${tool.id.replace(/-/g, '_')}`, tool.name)}</span>
                      <span className="text-[9px] text-on-surface-variant/70 ml-auto whitespace-nowrap">{timeString}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      <div className="bg-surface-container-lowest px-4 py-2 border-t border-outline-variant">
        <p className="text-[9px] text-on-surface-variant/60 flex items-center justify-center gap-1 text-center">
          <ShieldCheck size={10} /> {t('history.privacy') || 'History is only stored locally on your device.'}
        </p>
      </div>
      </div>
    </div>
  );
}
