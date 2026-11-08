'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Coins,
  Sparkles,
  RotateCcw,
  Check,
  AlertCircle,
  Award,
} from 'lucide-react';
import { useAstra } from '@/lib/store';
import { CoinRewardModal } from '@/components/gamification/CoinRewardModal';

export default function QuizRunnerPage() {
  const params = useParams();
  const router = useRouter();
  const { quizzes, submitQuiz } = useAstra();

  const quizId = params?.quizId as string;
  const quiz = quizzes.find((q) => q.id === quizId);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
  const [quizResult, setQuizResult] = useState<{
    score: number;
    total: number;
    percentage: number;
    passed: boolean;
    coinsEarned: number;
    xpEarned: number;
  } | null>(null);

  if (!quiz) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-white mb-2">Test topilmadi</h2>
        <Link
          href="/tests"
          className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-sm"
        >
          Testlarga qaytish
        </Link>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const currentSelectedOptionId = selectedAnswers[currentQuestion?.id];

  const handleSelectOption = (questionId: string, optionId: string) => {
    if (isCompleted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    let score = 0;
    quiz.questions.forEach((q) => {
      const selectedOptId = selectedAnswers[q.id];
      const correctOpt = q.options.find((o) => o.is_correct);
      if (selectedOptId && correctOpt && selectedOptId === correctOpt.id) {
        score++;
      }
    });

    const total = quiz.questions.length;
    const percentage = Math.round((score / total) * 100);
    const { passed, coinsEarned, xpEarned } = submitQuiz(quiz.id, score, total);

    setQuizResult({
      score,
      total,
      percentage,
      passed,
      coinsEarned,
      xpEarned,
    });

    setIsCompleted(true);
    if (passed) {
      setIsRewardModalOpen(true);
    }
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setIsCompleted(false);
    setQuizResult(null);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          href="/tests"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Testlar ro‘yxatiga qaytish
        </Link>
        <span className="text-xs text-slate-400">
          O‘tish bali: <strong className="text-white">{quiz.passing_score_percentage}%</strong>
        </span>
      </div>

      {!isCompleted ? (
        /* Quiz Active Runner */
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800 space-y-8">
          {/* Header & Progress */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Savol {currentQuestionIndex + 1} / {quiz.questions.length}
              </span>
              <span className="text-xs text-slate-400">
                Astra Sinov Tizimi
              </span>
            </div>

            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all"
                style={{
                  width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <h2 className="text-lg sm:text-2xl font-bold text-white leading-relaxed">
              {currentQuestion.question_text}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              const letters = ['A', 'B', 'C', 'D'];
              const isSelected = currentSelectedOptionId === option.id;

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectOption(currentQuestion.id, option.id)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between group ${
                    isSelected
                      ? 'bg-cyan-500/20 border-cyan-400/80 text-cyan-200 shadow-glow-sm'
                      : 'bg-slate-900/60 hover:bg-slate-800 border-slate-700/60 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={`w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-cyan-500 text-slate-950'
                          : 'bg-slate-800 text-slate-400 group-hover:text-white'
                      }`}
                    >
                      {letters[idx] || idx + 1}
                    </span>
                    <span className="text-sm font-medium">{option.text}</span>
                  </div>

                  {isSelected && <Check className="w-5 h-5 text-cyan-400" />}
                </button>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <div className="pt-6 border-t border-slate-800 flex items-center justify-between gap-4">
            <button
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-300 disabled:opacity-40 disabled:pointer-events-none border border-slate-700"
            >
              Oldingi savol
            </button>

            {isLastQuestion ? (
              <button
                onClick={handleSubmit}
                disabled={!currentSelectedOptionId}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-95 text-slate-950 font-bold text-sm shadow-glow-sm disabled:opacity-40 disabled:pointer-events-none transition-all"
              >
                Testni yakunlash
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!currentSelectedOptionId}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-glow-sm disabled:opacity-40 disabled:pointer-events-none transition-all"
              >
                Keyingi savol
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Finished Results Screen */
        <div className="space-y-8 animate-in fade-in zoom-in-95 duration-200">
          {/* Result Card */}
          <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-cyan-500/40 text-center space-y-6 shadow-glow-md">
            <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center border-2 border-cyan-400/50 bg-cyan-500/10 shadow-glow-sm">
              {quizResult?.passed ? (
                <Sparkles className="w-10 h-10 text-cyan-400 animate-pulse" />
              ) : (
                <AlertCircle className="w-10 h-10 text-amber-400" />
              )}
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {quizResult?.passed ? 'Test yakunlandi! 🎉' : 'Natijangiz qoniqarsiz ⚠️'}
              </h2>
              <p className="text-slate-300 text-sm max-w-md mx-auto">
                {quizResult?.passed
                  ? 'Tabriklaymiz, siz testdan muvaffaqiyatli o‘tdingiz va mukofot coinlarini qo‘lga kiritdingiz!'
                  : 'O‘tish bali uchun kamida 70% to‘plash zarur. Mavzuni qayta o‘qib, testni qayta topshiring.'}
              </p>
            </div>

            {/* Score Numbers */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-lg mx-auto">
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">To‘g‘ri javoblar</span>
                <span className="text-2xl font-extrabold text-white">
                  {quizResult?.score} / {quizResult?.total}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Natija foizi</span>
                <span className="text-2xl font-extrabold text-cyan-300">
                  {quizResult?.percentage}%
                </span>
              </div>

              <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Yutilgan mukofot</span>
                <span className="text-2xl font-extrabold text-amber-400">
                  +{quizResult?.coinsEarned} coin
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-3 pt-4">
              <button
                onClick={handleRetry}
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                Qayta ishlash
              </button>
              <Link
                href="/courses"
                className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm shadow-glow-sm transition-all"
              >
                Keyingi mavzuga o‘tish
              </Link>
            </div>
          </div>

          {/* Detailed Question Review with Uzbek Explanations */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">
              Savollar Tahlili va To‘g‘ri Javoblar
            </h3>

            {quiz.questions.map((question, qIdx) => {
              const selectedOptId = selectedAnswers[question.id];
              const correctOpt = question.options.find((o) => o.is_correct);
              const isCorrect = selectedOptId === correctOpt?.id;

              return (
                <div
                  key={question.id}
                  className={`p-6 rounded-3xl border space-y-4 ${
                    isCorrect
                      ? 'glass-panel border-emerald-500/40 bg-emerald-950/10'
                      : 'glass-panel border-rose-500/40 bg-rose-950/10'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        {qIdx + 1}-savol
                      </span>
                      <h4 className="text-base font-bold text-white">
                        {question.question_text}
                      </h4>
                    </div>
                    {isCorrect ? (
                      <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30 flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4" /> To‘g‘ri
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-xs font-bold text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/30 flex-shrink-0">
                        <XCircle className="w-4 h-4" /> Noto‘g‘ri
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    {question.options.map((option) => {
                      const wasSelected = selectedOptId === option.id;
                      const isTargetCorrect = option.is_correct;

                      let style = 'bg-slate-900/60 border-slate-800 text-slate-400';
                      if (isTargetCorrect) {
                        style = 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 font-semibold';
                      } else if (wasSelected && !isTargetCorrect) {
                        style = 'bg-rose-500/20 border-rose-500/40 text-rose-300';
                      }

                      return (
                        <div
                          key={option.id}
                          className={`p-3 rounded-xl border text-xs sm:text-sm flex items-center justify-between ${style}`}
                        >
                          <span>{option.text}</span>
                          {isTargetCorrect && (
                            <span className="text-[11px] uppercase font-bold text-emerald-400">
                              (To‘g‘ri javob)
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {question.explanation && (
                    <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                      💡 <strong className="text-cyan-300">Tushuntirish:</strong> {question.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Confetti Reward Modal */}
      <CoinRewardModal
        isOpen={isRewardModalOpen}
        onClose={() => setIsRewardModalOpen(false)}
        title="Testdan O‘tdingiz! 🏆"
        coins={quizResult?.coinsEarned || 20}
        xp={quizResult?.xpEarned || 30}
        message={`"${quiz.title}" testini muvaffaqiyatli topshirdingiz (${quizResult?.percentage}%).`}
      />
    </div>
  );
}
