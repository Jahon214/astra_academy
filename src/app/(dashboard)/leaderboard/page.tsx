'use client';

import React, { useState } from 'react';
import { Trophy, Medal, Coins, Award, Sparkles } from 'lucide-react';
import { useAstra } from '@/lib/store';

export default function LeaderboardPage() {
  const { leaderboard, user } = useAstra();
  const [tab, setTab] = useState<'xp' | 'coins'>('xp');

  const sortedLeaderboard = [...leaderboard].sort((a, b) => {
    return tab === 'xp' ? b.xp - a.xp : b.coins - a.coins;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
          <Trophy className="w-4 h-4" />
          <span>Talabalar Reytingi</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Astra Academy Peshqadamlar Doskasi
        </h1>
        <p className="text-sm text-slate-300 mt-1">
          Eng faol, ko‘p darslarni tugatgan va yuqori XP to‘plagan talabalar reytingi.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setTab('xp')}
          className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            tab === 'xp'
              ? 'bg-cyan-500 text-slate-950 shadow-glow-sm'
              : 'bg-slate-900 text-slate-400 border border-slate-800'
          }`}
        >
          ⭐ XP Bo‘yicha
        </button>
        <button
          onClick={() => setTab('coins')}
          className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            tab === 'coins'
              ? 'bg-cyan-500 text-slate-950 shadow-glow-sm'
              : 'bg-slate-900 text-slate-400 border border-slate-800'
          }`}
        >
          🪙 Coinlar Bo‘yicha
        </button>
      </div>

      {/* Leaderboard Table */}
      <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden">
        <div className="p-4 sm:p-6 space-y-3">
          {sortedLeaderboard.map((student, idx) => {
            const isCurrentUser = user && student.name.includes(user.first_name);

            let rankBadge = (
              <span className="w-8 h-8 rounded-xl font-mono font-bold text-xs flex items-center justify-center bg-slate-800 text-slate-400">
                {idx + 1}
              </span>
            );

            if (idx === 0) {
              rankBadge = (
                <span className="w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-glow-sm">
                  🥇 1
                </span>
              );
            } else if (idx === 1) {
              rankBadge = (
                <span className="w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center bg-slate-400/20 text-slate-200 border border-slate-400/40">
                  🥈 2
                </span>
              );
            } else if (idx === 2) {
              rankBadge = (
                <span className="w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center bg-amber-700/20 text-amber-500 border border-amber-700/40">
                  🥉 3
                </span>
              );
            }

            return (
              <div
                key={student.id}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                  isCurrentUser
                    ? 'bg-cyan-500/15 border-cyan-400/60 text-cyan-200 shadow-glow-sm'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  {rankBadge}
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      {student.name}
                      {isCurrentUser && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                          Siz
                        </span>
                      )}
                    </h4>
                    <span className="text-xs text-slate-400">
                      ⭐ Daraja {student.level}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-bold">
                  <span className="text-blue-300">{student.xp} XP</span>
                  <span className="text-amber-400">🪙 {student.coins} coin</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
