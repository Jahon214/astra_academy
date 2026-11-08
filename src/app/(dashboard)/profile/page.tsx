'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  User,
  Coins,
  Flame,
  Award,
  BookOpen,
  Send,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  LogOut,
  Settings,
  HelpCircle,
  QrCode,
  Sparkles,
} from 'lucide-react';
import { useAstra } from '@/lib/store';
import { CertificateModal } from '@/components/learning/CertificateModal';

export default function ProfilePage() {
  const { user, courses, achievements, logout, loginAsStudent, loginAsAdmin, triggerHaptic } = useAstra();
  const [selectedCertCourse, setSelectedCertCourse] = useState<string | null>(null);

  let totalCompletedLessons = 0;
  courses.forEach((c) => {
    c.modules?.forEach((m) => {
      totalCompletedLessons += m.lessons.filter((l) => l.is_completed).length;
    });
  });

  const unlockedCount = achievements.filter((a) => a.is_unlocked).length;

  return (
    <div className="space-y-4">
      {/* 1. Profile Hero Card (Telegram Style) */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-[#0c1938] via-[#0f2352] to-[#070d1e] border border-cyan-500/30 relative overflow-hidden shadow-card">
        <div className="flex items-center gap-3.5 relative z-10">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-cyan-400 shadow-[0_0_15px_rgba(0,210,255,0.4)] flex-shrink-0">
            <Image
              src={
                user?.avatar_url ||
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
              }
              alt={user?.first_name || 'Talaba'}
              fill
              className="object-cover"
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h1 className="text-base sm:text-lg font-bold text-white truncate">
                {user?.first_name} {user?.last_name}
              </h1>
              <CheckCircle2 className="w-4 h-4 text-cyan-400 fill-cyan-400/20 flex-shrink-0" />
            </div>

            <p className="text-xs text-yellow-400 font-mono mt-0.5">
              {user?.telegram_username ? `@${user.telegram_username}` : user?.email || '@talaba'}
            </p>

            <div className="flex items-center gap-2 mt-2">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {user?.role === 'admin' ? 'Admin' : 'Talaba'}
              </span>
              <span className="text-[11px] text-slate-300 font-medium">
                ⭐ Daraja {user?.level || 1}
              </span>
            </div>
          </div>
        </div>

        {/* 4 Mini Stat Pills */}
        <div className="grid grid-cols-4 gap-2 mt-4 pt-3 border-t border-slate-700/60 text-center">
          <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
            <Coins className="w-3.5 h-3.5 text-cyan-400 mx-auto mb-1" />
            <span className="text-xs font-bold text-cyan-300 block">{user?.coins || 0}</span>
            <span className="text-[9px] text-slate-400">Coin</span>
          </div>

          <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
            <Flame className="w-3.5 h-3.5 text-orange-400 mx-auto mb-1 animate-pulse" />
            <span className="text-xs font-bold text-orange-400 block">{user?.streak || 1} kun</span>
            <span className="text-[9px] text-slate-400">Streak</span>
          </div>

          <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
            <BookOpen className="w-3.5 h-3.5 text-blue-400 mx-auto mb-1" />
            <span className="text-xs font-bold text-white block">{totalCompletedLessons} ta</span>
            <span className="text-[9px] text-slate-400">Dars</span>
          </div>

          <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
            <Award className="w-3.5 h-3.5 text-amber-400 mx-auto mb-1" />
            <span className="text-xs font-bold text-amber-300 block">{unlockedCount} ta</span>
            <span className="text-[9px] text-slate-400">Medal</span>
          </div>
        </div>
      </div>

      {/* 2. Mening Kurslarim & Sertifikat */}
      <div className="p-4 rounded-2xl glass-panel border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            Mening O‘quv Kurslarim
          </h2>
          <Link
            href="/courses"
            onClick={() => triggerHaptic('light')}
            className="text-[11px] text-cyan-400 font-semibold hover:text-cyan-300"
          >
            Hammasi
          </Link>
        </div>

        <div className="space-y-2">
          {courses.slice(0, 3).map((course) => {
            const allLes = course.modules?.flatMap((m) => m.lessons) || [];
            const doneLes = allLes.filter((l) => l.is_completed).length;
            const pct = allLes.length > 0 ? Math.round((doneLes / allLes.length) * 100) : 0;

            return (
              <div
                key={course.id}
                className="p-3 rounded-xl bg-slate-900/70 border border-slate-800/80 flex items-center justify-between gap-3"
              >
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-white truncate">
                    {course.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-cyan-400 rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 flex-shrink-0">
                      {pct}%
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    triggerHaptic('medium');
                    setSelectedCertCourse(course.title);
                  }}
                  className="px-2.5 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold flex items-center gap-1 flex-shrink-0 transition-all"
                >
                  <Award className="w-3 h-3" />
                  <span>Sertifikat</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Settings & Quick Links (Menu items like Telegram Bot menu) */}
      <div className="p-2 rounded-2xl glass-panel border border-slate-800 divide-y divide-slate-800/60">
        <Link
          href="/coins"
          onClick={() => triggerHaptic('light')}
          className="p-3 flex items-center justify-between hover:bg-slate-800/30 rounded-xl transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Coins className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Coinlar Hamyoni va Tarixi</p>
              <p className="text-[10px] text-slate-400">Jami balans: {user?.coins || 0} coin</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500" />
        </Link>

        <Link
          href="/achievements"
          onClick={() => triggerHaptic('light')}
          className="p-3 flex items-center justify-between hover:bg-slate-800/30 rounded-xl transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Ketma-ketlik (Streak) va Yutuqlar</p>
              <p className="text-[10px] text-slate-400">{user?.streak || 1} kunlik faollik</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500" />
        </Link>

        <a
          href="https://t.me/astra_academy_uz"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => triggerHaptic('light')}
          className="p-3 flex items-center justify-between hover:bg-neutral-900/60 rounded-xl transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-400">
              <Send className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Telegram Yordam & Bot</p>
              <p className="text-[10px] text-neutral-400">@astra_academy_uz bilan bog‘lanish</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-neutral-500" />
        </a>

        {user?.role === 'admin' && (
          <Link
            href="/admin"
            onClick={() => triggerHaptic('light')}
            className="p-3 flex items-center justify-between hover:bg-slate-800/30 rounded-xl transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-amber-300">Admin Boshqaruv Paneli</p>
                <p className="text-[10px] text-slate-400">Kurslar, testlar va o‘quvchilar</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </Link>
        )}
      </div>

      {/* 4. Switch Accounts / Demo Buttons */}
      <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">
          Hisobni Sinash Rejimi:
        </p>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              triggerHaptic('light');
              loginAsStudent();
            }}
            className="py-2 px-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold text-center transition-all"
          >
            Talaba Sifatida
          </button>
          <button
            onClick={() => {
              triggerHaptic('light');
              loginAsAdmin();
            }}
            className="py-2 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold text-center transition-all"
          >
            Admin Sifatida
          </button>
        </div>
      </div>

      {/* Certificate Modal */}
      {selectedCertCourse && (
        <CertificateModal
          isOpen={Boolean(selectedCertCourse)}
          onClose={() => setSelectedCertCourse(null)}
          studentName={`${user?.first_name || 'Ali'} ${user?.last_name || 'Valiyev'}`}
          courseTitle={selectedCertCourse}
        />
      )}
    </div>
  );
}
