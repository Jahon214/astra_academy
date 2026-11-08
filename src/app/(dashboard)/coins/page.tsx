'use client';

import React, { useState } from 'react';
import {
  Coins,
  History,
  TrendingUp,
  Gift,
  Sparkles,
  BookOpen,
  CheckSquare,
  Code2,
  Rocket,
  Flame,
} from 'lucide-react';
import { useAstra } from '@/lib/store';

export default function CoinsPage() {
  const { user, transactions, triggerHaptic } = useAstra();
  const [selectedFilter, setSelectedFilter] = useState('barchasi');

  const filteredTransactions = transactions.filter((tx) => {
    if (selectedFilter === 'barchasi') return true;
    return tx.category === selectedFilter;
  });

  const totalEarned = transactions.reduce((sum, tx) => sum + (tx.amount > 0 ? tx.amount : 0), 0);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-base sm:text-lg font-bold text-white flex items-center gap-1.5">
          <Coins className="w-4 h-4 text-cyan-400" />
          Astra Coinlar Hamyoni
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Ta’lim davomida to‘plangan tangalaringiz va tranzaksiyalar tarixi.
        </p>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="p-4 rounded-2xl glass-panel border border-cyan-500/40 shadow-glow-sm">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
            Joriy Balans
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-cyan-300">
              {user?.coins || 0}
            </span>
            <span className="text-xs font-semibold text-cyan-400">coin</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Avtomatik hisoblandi</p>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-slate-800">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
            Jami Ishlangan
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
              +{totalEarned}
            </span>
            <span className="text-xs font-semibold text-emerald-400">coin</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Barcha yutuqlar bilan</p>
        </div>
      </div>

      {/* How to Earn Coins */}
      <div className="p-4 rounded-2xl glass-panel border border-slate-800 space-y-2.5">
        <h2 className="text-xs font-bold text-white flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          Qanday Coin Ishlash Mumkin?
        </h2>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <BookOpen className="w-4 h-4 text-cyan-400 mx-auto mb-0.5" />
            <p className="text-[10px] text-slate-300 font-medium">Video dars</p>
            <span className="text-xs font-bold text-cyan-400">+20 c</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <CheckSquare className="w-4 h-4 text-blue-400 mx-auto mb-0.5" />
            <p className="text-[10px] text-slate-300 font-medium">Test yakuni</p>
            <span className="text-xs font-bold text-blue-400">+20 c</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <Flame className="w-4 h-4 text-orange-400 mx-auto mb-0.5" />
            <p className="text-[10px] text-slate-300 font-medium">7 kun streak</p>
            <span className="text-xs font-bold text-orange-400">+50 c</span>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="p-4 rounded-2xl glass-panel border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
            <History className="w-3.5 h-3.5 text-cyan-400" />
            Tranzaksiyalar Tarixi
          </h2>

          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {['barchasi', 'lesson', 'quiz', 'bonus'].map((f) => (
              <button
                key={f}
                onClick={() => {
                  triggerHaptic('light');
                  setSelectedFilter(f);
                }}
                className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold capitalize whitespace-nowrap transition-all ${
                  selectedFilter === f
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                {f === 'barchasi' ? 'Barchasi' : f === 'lesson' ? 'Dars' : f === 'quiz' ? 'Test' : 'Bonus'}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          {filteredTransactions.map((tx) => (
            <div
              key={tx.id}
              className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between gap-3 text-xs"
            >
              <div className="min-w-0">
                <p className="font-medium text-white truncate text-[11px]">
                  {tx.description}
                </p>
                <span className="text-[9px] text-slate-500">
                  {new Date(tx.created_at).toLocaleDateString('uz-UZ', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>

              <span className="text-[11px] font-bold text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded-lg border border-cyan-500/20 flex-shrink-0">
                +{tx.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
