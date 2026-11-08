'use client';

import React from 'react';
import { Trophy, Lock, CheckCircle2, Flame, Coins, Award } from 'lucide-react';
import { useAstra } from '@/lib/store';

export default function AchievementsPage() {
  const { achievements, user } = useAstra();

  const unlockedCount = achievements.filter((a) => a.is_unlocked).length;
  const daysOfWeek = ['Du', 'Se', 'Chor', 'Pay', 'Ju', 'Sha', 'Yak'];
  const currentStreak = user?.streak || 1;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-base sm:text-lg font-bold text-white flex items-center gap-1.5">
          <Trophy className="w-4 h-4 text-cyan-400" />
          Yutuqlar va Medallar
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Uzluksiz o‘qish va topshiriqlarni bajarish orqali ochilgan mukofotlar.
        </p>
      </div>

      {/* 7-Day Streak Calendar Tracker */}
      <div className="glass-panel p-4 rounded-2xl border border-orange-500/30 shadow-glow-sm relative overflow-hidden space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-orange-400 text-xs font-bold">
            <Flame className="w-4 h-4 animate-pulse" />
            <span>🔥 {currentStreak} Kunlik O‘qish Ketma-ketligi!</span>
          </div>
          <span className="text-[10px] text-amber-300 font-semibold bg-orange-500/10 px-2 py-0.5 rounded-md border border-orange-500/20">
            Bonus: +50 coin
          </span>
        </div>

        {/* 7 Day Flame Bubbles */}
        <div className="flex items-center justify-between gap-1.5 pt-1">
          {daysOfWeek.map((day, idx) => {
            const isActive = idx < currentStreak;

            return (
              <div key={day} className="flex flex-col items-center gap-1 flex-1">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                    isActive
                      ? 'bg-orange-500/20 border border-orange-400 text-orange-400 shadow-glow-sm'
                      : 'bg-slate-900/60 border border-slate-800 text-slate-600'
                  }`}
                >
                  <Flame className={`w-4 h-4 ${isActive ? 'animate-pulse' : ''}`} />
                </div>
                <span className="text-[9px] font-semibold text-slate-400">{day}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Unlocked Summary */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
        <span className="text-slate-300 font-medium">
          Ochilgan medallar: <strong className="text-white">{unlockedCount} / {achievements.length}</strong>
        </span>
        <span className="font-bold text-cyan-400">
          {Math.round((unlockedCount / achievements.length) * 100)}%
        </span>
      </div>

      {/* Achievements Cards List */}
      <div className="space-y-2">
        {achievements.map((ach) => (
          <div
            key={ach.id}
            className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
              ach.is_unlocked
                ? 'glass-panel border-cyan-500/40 bg-gradient-to-b from-cyan-950/20 to-slate-900/40'
                : 'glass-panel border-slate-800 opacity-70'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-2xl p-2 rounded-xl bg-slate-900/80 border border-slate-800 flex-shrink-0">
                {ach.icon}
              </span>
              <div className="min-w-0">
                <h3 className="text-xs sm:text-sm font-bold text-white truncate">
                  {ach.title}
                </h3>
                <p className="text-[10px] text-slate-400 truncate">
                  {ach.description}
                </p>
              </div>
            </div>

            <div className="text-right flex-shrink-0">
              {ach.is_unlocked ? (
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Ochildi
                </span>
              ) : (
                <span className="text-[10px] font-semibold text-slate-500 flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Qulflangan
                </span>
              )}
              <span className="text-[9px] text-amber-400 font-mono block mt-1">
                +{ach.reward_coins} coin
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
