'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  PlayCircle,
  Clock,
  Sparkles,
  Send,
} from 'lucide-react';
import { useAstra } from '@/lib/store';

export default function StudentDashboard() {
  const { user, courses, triggerHaptic } = useAstra();

  // Active course calculation
  const activeCourse = courses.find((c) => (c.modules?.length || 0) > 0) || courses[0];
  const activeLessons = activeCourse.modules?.flatMap((m) => m.lessons) || [];
  const nextLesson = activeLessons.find((l) => !l.is_completed) || activeLessons[0];
  const activeCompletedCount = activeLessons.filter((l) => l.is_completed).length;
  const activeProgress = activeLessons.length > 0 ? Math.round((activeCompletedCount / activeLessons.length) * 100) : 0;

  const mainBanners = [
    {
      id: 'kurslar',
      title: 'KURSLAR',
      image: '/images/menu/menu-kurslar.webp',
      href: '/courses',
    },
    {
      id: 'jonli-efirlar',
      title: 'JONLI EFIRLAR',
      image: '/images/menu/menu-jonli-efirlar.webp',
      href: '/live',
    },
    {
      id: 'foydali-videolar',
      title: 'FOYDALI VIDEOLAR',
      image: '/images/menu/menu-foydali-videolar.webp',
      href: '/videos',
    },
    {
      id: 'sovgalar',
      title: 'SOVG‘ALAR BO‘LIMI',
      image: '/images/menu/menu-sovgalar.webp',
      href: '/gifts',
    },
  ];

  return (
    <div className="space-y-4">
      {/* 1. Compact Welcome & XP Banner (Black & Gold) */}
      <div className="p-4 rounded-2xl bg-neutral-950 border border-yellow-500/30 relative overflow-hidden shadow-[0_0_25px_rgba(250,204,21,0.12)]">
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white">
              Assalomu alaykum, <span className="text-yellow-400">{user?.first_name || 'Talaba'}</span>! 👋
            </span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-yellow-400/20 text-yellow-400 border border-yellow-500/40">
            ⭐ Daraja {user?.level || 1}
          </span>
        </div>

        {/* XP Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-[11px] text-neutral-300">
            <span>Tajriba ballari (XP):</span>
            <span className="font-semibold text-yellow-400">{user?.xp || 0} / 900 XP</span>
          </div>
          <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all"
              style={{ width: `${Math.min(100, Math.round(((user?.xp || 0) / 900) * 100))}%` }}
            />
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. CORE 4 MENU BANNERS (Full-width responsive cards, image IS the card) */}
      {/* ========================================================= */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <h2 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            Asosiy Bo‘limlar
          </h2>
          <span className="text-[10px] text-neutral-400 font-medium">Astra Academy Menyu</span>
        </div>

        <div className="flex flex-col gap-3.5 w-full">
          {mainBanners.map((banner) => (
            <Link
              key={banner.id}
              href={banner.href}
              onClick={() => triggerHaptic('medium')}
              className="block w-full relative aspect-[16/9] rounded-2xl overflow-hidden active:opacity-90 transition-opacity"
            >
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                className="object-cover"
                priority
              />
            </Link>
          ))}
        </div>
      </div>

      {/* 3. Resume Learning Compact Widget */}
      <div className="p-3.5 rounded-2xl bg-neutral-950 border border-yellow-500/25 space-y-2.5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-yellow-400 flex items-center gap-1">
            <PlayCircle className="w-3.5 h-3.5" />
            O‘qishni Davom Ettirish
          </span>
          <span className="text-[11px] font-semibold text-neutral-400">
            {activeCompletedCount}/{activeLessons.length} dars ({activeProgress}%)
          </span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-xs sm:text-sm font-bold text-white truncate">
              {activeCourse.title}
            </h3>
            {nextLesson && (
              <p className="text-[11px] text-neutral-400 truncate flex items-center gap-1 mt-0.5">
                <Clock className="w-3 h-3 text-yellow-400 flex-shrink-0" />
                <span>{nextLesson.title}</span>
              </p>
            )}
          </div>

          {nextLesson && (
            <Link
              href={`/courses/${activeCourse.id}/lessons/${nextLesson.id}`}
              onClick={() => triggerHaptic('medium')}
              className="px-3.5 py-2 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(250,204,21,0.35)] flex-shrink-0 transition-all active:scale-95"
            >
              <PlayCircle className="w-4 h-4 fill-current" />
              <span>Davom etish</span>
            </Link>
          )}
        </div>
      </div>

      {/* 4. Astra Academy Telegram Community / Support Banner */}
      <div className="p-3.5 rounded-2xl bg-neutral-950 border border-yellow-500/25 flex items-center justify-between gap-3 shadow-[0_0_15px_rgba(250,204,21,0.08)]">
        <div className="space-y-0.5 min-w-0">
          <p className="text-[11px] font-bold text-yellow-400 flex items-center gap-1 truncate">
            <Send className="w-3.5 h-3.5" />
            Astra Academy Hamjamiyati
          </p>
          <p className="text-[10px] text-neutral-300 truncate">
            Rasmiy kanal va qo‘llab-quvvatlash boti: @astra_academy_uz
          </p>
        </div>
        <a
          href="https://t.me/astra_academy_uz"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => triggerHaptic('light')}
          className="px-3 py-1.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black text-[10px] font-bold flex-shrink-0 transition-all shadow-[0_0_10px_rgba(250,204,21,0.25)]"
        >
          A’zo bo‘lish
        </a>
      </div>
    </div>
  );
}
