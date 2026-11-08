'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bell, Check, Sparkles, BookOpen, Trophy, Info } from 'lucide-react';
import { useAstra } from '@/lib/store';

export const NotificationDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { notifications, unreadNotificationsCount, markNotificationRead, markAllNotificationsRead } = useAstra();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'reward':
        return <Sparkles className="w-4 h-4 text-amber-400" />;
      case 'course':
        return <BookOpen className="w-4 h-4 text-cyan-400" />;
      case 'achievement':
        return <Trophy className="w-4 h-4 text-emerald-400" />;
      default:
        return <Info className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-slate-700/60 rounded-xl transition-all"
        aria-label="Bildirishnomalar"
      >
        <Bell className="w-5 h-5" />
        {unreadNotificationsCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[11px] font-bold flex items-center justify-center shadow-glow-sm animate-pulse">
            {unreadNotificationsCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl glass-panel shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-700/60">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-white text-sm">Bildirishnomalar</h3>
              {unreadNotificationsCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-semibold border border-cyan-500/30">
                  {unreadNotificationsCount} yangi
                </span>
              )}
            </div>
            {unreadNotificationsCount > 0 && (
              <button
                onClick={markAllNotificationsRead}
                className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-medium transition-colors"
              >
                <Check className="w-3.5 h-3.5" />
                O‘qilgan deb belgilash
              </button>
            )}
          </div>

          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            {notifications.length === 0 ? (
              <p className="text-center text-sm text-slate-400 py-6">
                Sizda hali bildirishnomalar mavjud emas.
              </p>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => markNotificationRead(notif.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex gap-3 ${
                    notif.is_read
                      ? 'bg-slate-900/40 border-slate-800/60 opacity-75'
                      : 'bg-slate-800/70 border-cyan-500/30 hover:border-cyan-400/50'
                  }`}
                >
                  <div className="mt-0.5 p-2 rounded-lg bg-slate-900/80 border border-slate-700/60 flex-shrink-0">
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-white mb-0.5">{notif.title}</p>
                    <p className="text-[11px] text-slate-300 leading-relaxed line-clamp-2">
                      {notif.message}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
