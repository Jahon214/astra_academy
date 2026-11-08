'use client';

import React from 'react';
import Link from 'next/link';
import { CheckSquare, Coins, ArrowRight } from 'lucide-react';
import { useAstra } from '@/lib/store';

export default function TestsPage() {
  const { quizzes, triggerHaptic } = useAstra();

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-base sm:text-lg font-bold text-white flex items-center gap-1.5">
          <CheckSquare className="w-4 h-4 text-cyan-400" />
          Bilim Sinovlari va Viktorinalar
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Har bir mavzu bo‘yicha test topshirib, Astra Coinlar va XP to‘plang.
        </p>
      </div>

      {/* Quizzes List */}
      <div className="space-y-2.5">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="glass-panel rounded-2xl p-4 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="text-xs sm:text-sm font-bold text-white">
                  {quiz.title}
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
                  {quiz.description || 'O‘zlashtirgan bilimlaringizni sinab ko‘ring.'}
                </p>
              </div>

              <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded-lg border border-cyan-500/30 flex items-center gap-1 flex-shrink-0">
                <Coins className="w-3 h-3" />
                +{quiz.coin_reward}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px]">
              <span className="text-slate-400 text-[10px]">
                {quiz.questions.length} ta savol • O‘tish: {quiz.passing_score_percentage}%
              </span>

              <Link
                href={`/tests/${quiz.id}`}
                onClick={() => triggerHaptic('medium')}
                className="px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-glow-sm transition-all"
              >
                <span>Boshlash</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
