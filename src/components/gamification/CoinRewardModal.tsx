'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Coins, ArrowRight } from 'lucide-react';

interface CoinRewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  coins: number;
  xp: number;
  message?: string;
  nextActionLabel?: string;
  onNextAction?: () => void;
}

export const CoinRewardModal: React.FC<CoinRewardModalProps> = ({
  isOpen,
  onClose,
  title,
  coins,
  xp,
  message,
  nextActionLabel = 'Davom etish',
  onNextAction,
}) => {
  useEffect(() => {
    if (isOpen) {
      // Trigger festive confetti burst
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00d2ff', '#3b82f6', '#fbbf24', '#ffffff'],
        });
      } catch (e) {
        console.error(e);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-md rounded-3xl glass-panel border-2 border-cyan-500/40 p-6 sm:p-8 text-center shadow-glow-lg relative overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Glowing Background Radial */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Badge Icon */}
        <div className="w-20 h-20 rounded-2xl mx-auto mb-5 bg-gradient-to-tr from-cyan-500/20 via-blue-600/30 to-amber-500/20 border border-cyan-400/50 flex items-center justify-center shadow-glow-md relative">
          <Sparkles className="w-10 h-10 text-cyan-400 animate-pulse" />
        </div>

        <h3 className="text-2xl font-extrabold text-white mb-2">{title}</h3>
        <p className="text-sm text-slate-300 mb-6">
          {message || 'Ajoyib natija! Siz Astra Academy o‘quv faoliyatini muvaffaqiyatli yakunladingiz.'}
        </p>

        {/* Rewards Box */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex flex-col items-center">
            <Coins className="w-6 h-6 text-cyan-400 mb-1" />
            <span className="text-xl font-extrabold text-cyan-300">+{coins}</span>
            <span className="text-[11px] font-medium text-slate-400">Astra Coin</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex flex-col items-center">
            <span className="text-2xl mb-0.5">⭐</span>
            <span className="text-xl font-extrabold text-blue-300">+{xp}</span>
            <span className="text-[11px] font-medium text-slate-400">Tajriba (XP)</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          {onNextAction && (
            <button
              onClick={() => {
                onClose();
                onNextAction();
              }}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-sm hover:opacity-95 shadow-glow-md flex items-center justify-center gap-2 transition-all"
            >
              <span>{nextActionLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
          >
            Yopish
          </button>
        </div>
      </div>
    </div>
  );
};
