'use client';

import React, { Suspense } from 'react';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { TelegramUrlHandler } from '@/components/layout/TelegramUrlHandler';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-slate-100 flex flex-col justify-between selection:bg-yellow-500/30 selection:text-yellow-200">
      <Suspense fallback={null}>
        <TelegramUrlHandler />
      </Suspense>

      {/* Main Telegram App Shell */}
      <div className="w-full max-w-2xl mx-auto min-h-screen flex flex-col bg-black border-x border-neutral-900 shadow-[0_0_60px_rgba(0,0,0,0.9)] relative">
        {/* Top Header Bar */}
        <Header />

        {/* Dynamic Page Content */}
        <main className="flex-1 px-3 sm:px-4 py-4 pb-24 overflow-x-hidden animate-in fade-in duration-150 bg-black">
          {children}
        </main>

        {/* Fixed Bottom Navigation Bar */}
        <BottomNav />
      </div>
    </div>
  );
}
