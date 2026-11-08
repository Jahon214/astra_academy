'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import {
  BookOpen,
  Clock,
  PlayCircle,
  CheckCircle2,
  Coins,
  ArrowLeft,
  Award,
  ArrowRight,
} from 'lucide-react';
import { useAstra } from '@/lib/store';

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { courses } = useAstra();

  const courseId = params?.courseId as string;
  const course = courses.find((c) => c.id === courseId || c.slug === courseId);

  if (!course) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-white mb-2">Kurs topilmadi</h2>
        <p className="text-slate-400 text-sm mb-6">
          Kechirasiz, siz qidirayotgan kurs mavjud emas yoki o‘chirilgan.
        </p>
        <Link
          href="/courses"
          className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-sm"
        >
          Kurslarga qaytish
        </Link>
      </div>
    );
  }

  const allLessons = course.modules?.flatMap((m) => m.lessons) || [];
  const completedLessons = allLessons.filter((l) => l.is_completed);
  const progressPercent =
    allLessons.length > 0 ? Math.round((completedLessons.length / allLessons.length) * 100) : 0;
  const firstUnfinishedLesson = allLessons.find((l) => !l.is_completed) || allLessons[0];

  return (
    <div className="space-y-4">
      {/* Back Button */}
      <button
        onClick={() => router.push('/courses')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors py-1"
      >
        <ArrowLeft className="w-4 h-4" />
        Kurslarga qaytish
      </button>

      {/* Course Hero Banner */}
      <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-[#0c1a3a] via-[#102452] to-[#070c18] border border-cyan-500/30 shadow-card space-y-3">
        <div className="flex gap-2">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase">
            {course.category}
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700 uppercase">
            {course.difficulty}
          </span>
        </div>

        <h1 className="text-lg sm:text-xl font-extrabold text-white">
          {course.title}
        </h1>

        <p className="text-xs text-slate-300 leading-relaxed">
          {course.description}
        </p>

        {/* Quick Metrics */}
        <div className="flex flex-wrap gap-3 pt-1 text-[11px] text-slate-300">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            {course.total_lessons} ta dars
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            {completedLessons.length} ta tugallangan
          </span>
          <span className="flex items-center gap-1">
            <Coins className="w-3.5 h-3.5 text-amber-400" />
            +{allLessons.length * 20} coin
          </span>
        </div>

        {/* Progress bar */}
        <div className="space-y-1 pt-1">
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>Kurs progressi</span>
            <span className="font-bold text-cyan-400">{progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {firstUnfinishedLesson && (
          <Link
            href={`/courses/${course.id}/lessons/${firstUnfinishedLesson.id}`}
            className="w-full py-2.5 px-4 mt-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-95 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-glow-sm transition-all"
          >
            <PlayCircle className="w-4 h-4 fill-current" />
            <span>{completedLessons.length > 0 ? 'Darsni davom ettirish' : 'Darsni boshlash'}</span>
          </Link>
        )}
      </div>

      {/* Modules and Lessons Tree */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-cyan-400" />
          Kurs Mundarijasi va Darslar
        </h2>

        {course.modules && course.modules.length > 0 ? (
          <div className="space-y-6">
            {course.modules.map((module, mIdx) => (
              <div
                key={module.id}
                className="glass-panel rounded-3xl p-5 sm:p-6 border border-slate-800 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {module.title}
                  </h3>
                  <span className="text-xs font-semibold text-slate-400">
                    {module.lessons.length} ta dars
                  </span>
                </div>

                <div className="space-y-2">
                  {module.lessons.map((lesson, lIdx) => {
                    const isCompleted = lesson.is_completed;

                    return (
                      <Link
                        key={lesson.id}
                        href={`/courses/${course.id}/lessons/${lesson.id}`}
                        className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 group ${
                          isCompleted
                            ? 'bg-slate-900/40 border-slate-800/80 hover:border-cyan-500/40'
                            : 'bg-slate-800/40 border-slate-700/60 hover:bg-cyan-500/10 hover:border-cyan-500/50'
                        }`}
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                              isCompleted
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-slate-800 text-slate-300 border border-slate-700 group-hover:bg-cyan-500/20 group-hover:text-cyan-300'
                            }`}
                          >
                            {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : lIdx + 1}
                          </div>

                          <div className="min-w-0">
                            <h4
                              className={`text-sm font-semibold truncate transition-colors ${
                                isCompleted
                                  ? 'text-slate-300 group-hover:text-white'
                                  : 'text-white group-hover:text-cyan-300'
                              }`}
                            >
                              {lesson.title}
                            </h4>
                            <p className="text-xs text-slate-400 truncate mt-0.5">
                              {lesson.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 flex-shrink-0 text-xs">
                          <span className="hidden sm:flex items-center gap-1 text-slate-400 font-mono">
                            <Clock className="w-3.5 h-3.5" />
                            {lesson.duration_minutes} daq
                          </span>
                          <span className="flex items-center gap-1 text-cyan-400 font-bold bg-cyan-500/10 px-2 py-1 rounded-lg border border-cyan-500/20">
                            +{lesson.coin_reward} coin
                          </span>
                          <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-transform group-hover:translate-x-1" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-panel p-8 rounded-3xl text-center text-slate-400">
            Hozircha ushbu kurs uchun darslar kiritilmoqda. Tez orada joylanadi.
          </div>
        )}
      </div>
    </div>
  );
}
