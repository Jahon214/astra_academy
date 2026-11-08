'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Flame, Coins, Bell, User } from 'lucide-react';
import { useAstra } from '@/lib/store';
import { NotificationDropdown } from '../ui/NotificationDropdown';
import { SearchModal } from '../ui/SearchModal';

export const Header: React.FC = () => {
  const { user, triggerHaptic } = useAstra();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <header className="h-14 border-b border-yellow-500/20 bg-black/95 backdrop-blur-xl sticky top-0 z-30 px-3 sm:px-4 flex items-center justify-between gap-2 max-w-2xl mx-auto w-full">
        {/* Brand Logo & Name */}
        <Link
          href="/"
          onClick={() => triggerHaptic('light')}
          className="flex items-center gap-2.5 group flex-shrink-0"
        >
          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-yellow-500/50 shadow-[0_0_12px_rgba(250,204,21,0.35)] group-hover:scale-105 transition-transform bg-black">
            <Image
              src="/images/astra-logo.png"
              alt="Astra Academy"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="leading-tight">
            <span className="font-extrabold text-xs sm:text-sm tracking-wider block text-white group-hover:text-yellow-400 transition-colors">
              ASTRA ACADEMY
            </span>
            <span className="text-[9px] font-bold text-yellow-400 tracking-wider block">
              IT • AI • PROGRAMMING
            </span>
          </div>
        </Link>

        {/* Right Action Badges */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quick Search Button */}
          <button
            onClick={() => {
              triggerHaptic('light');
              setIsSearchOpen(true);
            }}
            className="p-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-slate-300 border border-neutral-800 hover:border-yellow-500/40 transition-colors"
            aria-label="Qidirish"
          >
            <Search className="w-4 h-4 text-yellow-400" />
          </button>

          {/* Daily Streak */}
          <Link
            href="/achievements"
            onClick={() => triggerHaptic('light')}
            title="Streak"
            className="flex items-center gap-1 px-2 py-1 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold hover:bg-orange-500/20 transition-all"
          >
            <Flame className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
            <span>{user?.streak || 1}</span>
          </Link>

          {/* Coins Balance */}
          <Link
            href="/coins"
            onClick={() => triggerHaptic('light')}
            title="Coinlar"
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-yellow-500/10 border border-yellow-500/40 text-yellow-400 text-xs font-bold hover:bg-yellow-500/20 transition-all shadow-[0_0_10px_rgba(250,204,21,0.2)]"
          >
            <Coins className="w-3.5 h-3.5 text-yellow-400" />
            <span>{user?.coins || 0}</span>
          </Link>

          {/* Notifications */}
          <NotificationDropdown />
        </div>
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
