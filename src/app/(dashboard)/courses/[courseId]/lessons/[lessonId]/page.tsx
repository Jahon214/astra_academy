'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  FileText,
  CheckSquare,
  Code2,
  Sparkles,
  PlayCircle,
  Clock,
  Coins,
} from 'lucide-react';
import { useAstra } from '@/lib/store';
import { VideoPlayer } from '@/components/learning/VideoPlayer';
import { CoinRewardModal } from '@/components/gamification/CoinRewardModal';

export default function LessonViewPage() {
  const params = useParams();
  const router = useRouter();
  const { courses, completeLesson } = useAstra();

  const courseId = params?.courseId as string;
  const lessonId = params?.lessonId as string;

  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
  const [earnedCoins, setEarnedCoins] = useState(20);
  const [earnedXp, setEarnedXp] = useState(30);

  const course = courses.find((c) => c.id === courseId || c.slug === courseId);
  const allLessons = course?.modules?.flatMap((m) => m.lessons) || [];
  const currentLessonIndex = allLessons.findIndex((l) => l.id === lessonId);
  const currentLesson = allLessons[currentLessonIndex];

  const prevLesson = currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;
  const nextLesson =
    currentLessonIndex < allLessons.length - 1 ? allLessons[currentLessonIndex + 1] : null;

  if (!course || !currentLesson) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-white mb-2">Dars topilmadi</h2>
        <p className="text-slate-400 text-sm mb-6">
          Kechirasiz, ushbu dars mavjud emas yoki o‘chirilgan.
        </p>
        <Link
          href={`/courses/${courseId}`}
          className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-sm"
        >
          Kursga qaytish
        </Link>
      </div>
    );
  }

  const handleCompleteLesson = () => {
    const { coinsEarned, xpEarned } = completeLesson(course.id, currentLesson.id);
    setEarnedCoins(coinsEarned);
    setEarnedXp(xpEarned);
    setIsRewardModalOpen(true);
  };

  const handleNextAction = () => {
    if (nextLesson) {
      router.push(`/courses/${course.id}/lessons/${nextLesson.id}`);
    } else {
      router.push(`/courses/${course.id}`);
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Breadcrumb & Back Navigation */}
      <div className="flex items-center justify-between gap-2">
        <Link
          href={`/courses/${course.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors truncate"
        >
          <ArrowLeft className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="truncate">{course.title}</span>
        </Link>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          {prevLesson && (
            <Link
              href={`/courses/${course.id}/lessons/${prevLesson.id}`}
              className="px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-700 text-[11px] text-slate-300 hover:text-white flex items-center gap-1"
            >
              <ArrowLeft className="w-3 h-3" /> Oldingi
            </Link>
          )}
          {nextLesson && (
            <Link
              href={`/courses/${course.id}/lessons/${nextLesson.id}`}
              className="px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-700 text-[11px] text-slate-300 hover:text-white flex items-center gap-1"
            >
              Keyingi <ArrowRight className="w-3 h-3" />
            </Link>
          )}
        </div>
      </div>

      {/* Video & Actions */}
      <div className="space-y-3">
        {/* YouTube Video Player */}
        <VideoPlayer
          youtubeId={currentLesson.youtube_video_id}
          title={currentLesson.title}
        />

        {/* Lesson Header & Complete Button */}
        <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-semibold text-cyan-400 mb-0.5">
              <Clock className="w-3 h-3" />
              <span>{currentLesson.duration_minutes} daqiqa</span>
              <span className="text-slate-600">•</span>
              <span className="text-amber-400 font-bold flex items-center gap-1">
                <Coins className="w-3 h-3" />
                +{currentLesson.coin_reward} coin
              </span>
            </div>
            <h1 className="text-base sm:text-lg font-bold text-white">
              {currentLesson.title}
            </h1>
          </div>

          <button
            onClick={handleCompleteLesson}
            disabled={currentLesson.is_completed}
            className={`py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all flex-shrink-0 ${
              currentLesson.is_completed
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 cursor-default'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-95 text-slate-950 shadow-glow-sm cursor-pointer'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>
              {currentLesson.is_completed ? 'Dars tugatilgan ✓' : 'Darsni tugatdim'}
            </span>
          </button>
        </div>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-4 gap-2">
          <Link
            href="/guides"
            className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-center transition-all group"
          >
            <FileText className="w-4 h-4 text-cyan-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-semibold text-slate-200 block truncate">
              Qo‘llanma
            </span>
          </Link>

          <Link
            href="/tests"
            className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-center transition-all group"
          >
            <CheckSquare className="w-4 h-4 text-blue-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-semibold text-slate-200 block truncate">
              Test
            </span>
          </Link>

          <Link
            href="/practice"
            className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-center transition-all group"
          >
            <Code2 className="w-4 h-4 text-emerald-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-semibold text-slate-200 block truncate">
              Amaliyot
            </span>
          </Link>

          <Link
            href="/projects"
            className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-center transition-all group"
          >
            <Sparkles className="w-4 h-4 text-purple-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-semibold text-slate-200 block truncate">
              Loyihalar
            </span>
          </Link>
        </div>

        {/* Lesson Description */}
        <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-2">
          <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            Dars Mazmuni
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            {currentLesson.description}
          </p>
        </div>

        {/* Course Outline in Accordion */}
        <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-2">
          <h3 className="text-xs font-bold text-white mb-2">
            Kurs Mundarijasi ({allLessons.length} ta dars)
          </h3>
          <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
            {allLessons.map((les, idx) => {
              const isCurrent = les.id === currentLesson.id;
              const isDone = les.is_completed;

              return (
                <Link
                  key={les.id}
                  href={`/courses/${course.id}/lessons/${les.id}`}
                  className={`p-2.5 rounded-xl border transition-all flex items-center justify-between gap-2 text-xs ${
                    isCurrent
                      ? 'bg-cyan-500/20 border-cyan-400/60 text-cyan-300 font-bold'
                      : isDone
                      ? 'bg-slate-900/40 border-slate-800 text-slate-300'
                      : 'bg-slate-800/40 border-slate-700/60 text-slate-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[10px] font-mono text-slate-500">{idx + 1}.</span>
                    <span className="truncate">{les.title}</span>
                  </div>
                  {isDone ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <span className="text-[10px] text-slate-500">{les.duration_minutes}m</span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Confetti Reward Modal */}
      <CoinRewardModal
        isOpen={isRewardModalOpen}
        onClose={() => setIsRewardModalOpen(false)}
        title="Dars Yakunlandi! 🎉"
        coins={earnedCoins}
        xp={earnedXp}
        message={`"${currentLesson.title}" darsini muvaffaqiyatli yakunladingiz.`}
        nextActionLabel={nextLesson ? 'Keyingi darsga o‘tish' : 'Kurs mundarijasiga qaytish'}
        onNextAction={handleNextAction}
      />
    </div>
  );
}
