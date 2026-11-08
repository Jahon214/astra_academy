'use client';

import React, { useState } from 'react';
import { CheckSquare, Plus, Trash2, Check, X } from 'lucide-react';
import { useAstra } from '@/lib/store';
import { QuizQuestion } from '@/lib/types';

export default function AdminQuizzesPage() {
  const { quizzes, addQuiz } = useAstra();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [coins, setCoins] = useState(20);
  const [xp, setXp] = useState(30);

  // Simple question builder inside create modal
  const [questionText, setQuestionText] = useState('');
  const [explanation, setExplanation] = useState('');
  const [opt1, setOpt1] = useState('');
  const [opt2, setOpt2] = useState('');
  const [opt3, setOpt3] = useState('');
  const [opt4, setOpt4] = useState('');
  const [correctOptIdx, setCorrectOptIdx] = useState(0);

  const handleCreateQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !questionText) return;

    const sampleQuestion: QuizQuestion = {
      id: `q-${Date.now()}`,
      quiz_id: `quiz-${Date.now()}`,
      question_text: questionText,
      explanation: explanation || 'To‘g‘ri javob belgilandi.',
      options: [
        { id: 'opt-1', text: opt1 || 'Variant A', is_correct: correctOptIdx === 0 },
        { id: 'opt-2', text: opt2 || 'Variant B', is_correct: correctOptIdx === 1 },
        { id: 'opt-3', text: opt3 || 'Variant C', is_correct: correctOptIdx === 2 },
        { id: 'opt-4', text: opt4 || 'Variant D', is_correct: correctOptIdx === 3 },
      ],
    };

    addQuiz({
      title,
      description: desc,
      coin_reward: coins,
      xp_reward: xp,
      passing_score_percentage: 70,
      questions: [sampleQuestion],
    });

    setTitle('');
    setDesc('');
    setQuestionText('');
    setExplanation('');
    setOpt1('');
    setOpt2('');
    setOpt3('');
    setOpt4('');
    setIsCreateOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <CheckSquare className="w-4 h-4" />
            <span>Viktorina Konstruktori</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Testlar va Viktorinalar Boshqaruvi
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Talabalar bilimini baholash uchun yangi testlar va savollar tuzing.
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-glow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Yangi Test Yaratish</span>
        </button>
      </div>

      {/* Quizzes List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white">{quiz.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{quiz.description}</p>
              </div>
              <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-xl border border-cyan-500/30 flex-shrink-0">
                +{quiz.coin_reward} coin
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <span className="text-xs font-semibold text-slate-300 block">
                Savollar soni: {quiz.questions.length} ta
              </span>
              <ul className="space-y-1 text-xs text-slate-400">
                {quiz.questions.slice(0, 2).map((q, idx) => (
                  <li key={q.id} className="truncate">
                    {idx + 1}. {q.question_text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Create Quiz */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl glass-panel border border-cyan-500/40 p-6 sm:p-8 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setIsCreateOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white bg-slate-900/60 rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-white">Yangi Test Tuzish</h2>

            <form onSubmit={handleCreateQuiz} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Test Sarlavhasi:
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="masalan: TypeScript Asoslari Testi"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Tavsif:
                </label>
                <input
                  type="text"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Test haqida qisqacha..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* First Question Builder */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-cyan-400 uppercase">
                  1-Savol Ma’lumotlari:
                </h4>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Savol Matni:
                  </label>
                  <input
                    type="text"
                    required
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    placeholder="Savol qanday?"
                    className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[11px] font-semibold text-slate-300">
                    Variantlar (To‘g‘ri javobni tanlang):
                  </label>
                  {[opt1, opt2, opt3, opt4].map((opt, idx) => {
                    const setters = [setOpt1, setOpt2, setOpt3, setOpt4];
                    return (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="correctOpt"
                          checked={correctOptIdx === idx}
                          onChange={() => setCorrectOptIdx(idx)}
                          className="accent-cyan-400"
                        />
                        <input
                          type="text"
                          required
                          value={opt}
                          onChange={(e) => setters[idx](e.target.value)}
                          placeholder={`Variant ${idx + 1}`}
                          className="flex-1 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                        />
                      </div>
                    );
                  })}
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    To‘g‘ri Javob Tushuntirishi:
                  </label>
                  <input
                    type="text"
                    value={explanation}
                    onChange={(e) => setExplanation(e.target.value)}
                    placeholder="Nima uchun bu javob to‘g‘ri ekanligi..."
                    className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
                >
                  Testni Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
