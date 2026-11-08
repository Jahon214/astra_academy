'use client';

import React from 'react';
import Link from 'next/link';
import {
  Users,
  BookOpen,
  CheckSquare,
  Rocket,
  ShieldCheck,
  TrendingUp,
  Activity,
  ArrowRight,
} from 'lucide-react';
import { useAstra } from '@/lib/store';

export default function AdminDashboardPage() {
  const { allStudents, courses, quizzes, projects, transactions } = useAstra();

  let totalLessonsCount = 0;
  let completedLessonsCount = 0;

  courses.forEach((c) => {
    c.modules?.forEach((m) => {
      totalLessonsCount += m.lessons.length;
      completedLessonsCount += m.lessons.filter((l) => l.is_completed).length;
    });
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Astra Boshqaruv Markazi</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Admin Statistika Paneli
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Astra Academy platformasining umumiy o‘quv statistikasi va faollik ko‘rsatkichlari.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/courses"
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-glow-sm"
          >
            + Yangi Kurs Qo‘shish
          </Link>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">Jami O‘quvchilar</span>
            <Users className="w-5 h-5 text-cyan-400" />
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold text-white">
            {allStudents.length} nafar
          </span>
          <p className="text-[11px] text-emerald-400 mt-1">● Barchasi faol</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">Mavjud Kurslar</span>
            <BookOpen className="w-5 h-5 text-blue-400" />
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold text-white">
            {courses.length} ta
          </span>
          <p className="text-[11px] text-slate-400 mt-1">{totalLessonsCount} ta dars bilan</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">Sinov Testlari</span>
            <CheckSquare className="w-5 h-5 text-amber-400" />
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold text-white">
            {quizzes.length} ta
          </span>
          <p className="text-[11px] text-slate-400 mt-1">Interaktiv savollar</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">Katta Loyihalar</span>
            <Rocket className="w-5 h-5 text-purple-400" />
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold text-white">
            {projects.length} ta
          </span>
          <p className="text-[11px] text-slate-400 mt-1">Portfolio loyihalar</p>
        </div>
      </div>

      {/* Two Columns: Recent Students and Recent Platform Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Registered Students */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-cyan-400" />
              So‘nggi Ro‘yxatdan O‘tganlar
            </h2>
            <Link href="/admin/students" className="text-xs text-cyan-400 hover:text-cyan-300">
              Barchasi
            </Link>
          </div>

          <div className="space-y-2">
            {allStudents.map((st) => (
              <div
                key={st.id}
                className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">
                    {st.first_name} {st.last_name}
                  </p>
                  <p className="text-[11px] text-slate-400 truncate">{st.email}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-[10px] px-2 py-0.5 rounded-md font-bold uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    {st.role}
                  </span>
                  <span className="text-xs font-mono text-amber-400">🪙 {st.coins}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Activities */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-400" />
              Platforma Faollik Jurnali
            </h2>
          </div>

          <div className="space-y-2">
            {transactions.slice(0, 6).map((tx) => (
              <div
                key={tx.id}
                className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-300 truncate">
                    {tx.description}
                  </p>
                  <span className="text-[10px] text-slate-500">
                    {new Date(tx.created_at).toLocaleDateString('uz-UZ', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                <span className="text-xs font-bold text-cyan-400 flex-shrink-0">
                  +{tx.amount} coin
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
