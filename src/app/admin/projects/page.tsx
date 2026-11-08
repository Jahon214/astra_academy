'use client';

import React, { useState } from 'react';
import { Rocket, Plus, ExternalLink, X } from 'lucide-react';
import { useAstra } from '@/lib/store';
import { CourseDifficulty } from '@/lib/types';

export default function AdminProjectsPage() {
  const { projects, addProject } = useAstra();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [difficulty, setDifficulty] = useState<CourseDifficulty>('Boshlang\'ich');
  const [technologies, setTechnologies] = useState('HTML, CSS, JavaScript');
  const [requirements, setRequirements] = useState('Responsive dizayn, Toza kod, Validatsiya');
  const [coins, setCoins] = useState(100);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    addProject({
      title,
      description: desc,
      difficulty,
      technologies: technologies.split(',').map((t) => t.trim()),
      requirements: requirements.split(',').map((r) => r.trim()),
      coin_reward: coins,
      xp_reward: coins * 1.5,
    });

    setTitle('');
    setDesc('');
    setIsCreateOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Rocket className="w-4 h-4" />
            <span>Loyihalar Boshqaruvi</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Portfolio Loyihalari Boshqaruvi
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Talabalar uchun yangi real amaliy loyihalar va vazifalar kiritish.
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-glow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Yangi Loyiha Qo‘shish</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-800 text-cyan-300">
                  {proj.difficulty}
                </span>
                <span className="text-xs font-bold text-amber-400">
                  +{proj.coin_reward} coin
                </span>
              </div>

              <h3 className="text-base font-bold text-white">{proj.title}</h3>
              <p className="text-xs text-slate-400 line-clamp-2">{proj.description}</p>

              <div className="flex flex-wrap gap-1">
                {proj.technologies.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-mono px-2 py-0.5 bg-slate-900 border border-slate-800 rounded text-slate-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 text-xs text-slate-400">
              Talablar: {proj.requirements.length} ta band
            </div>
          </div>
        ))}
      </div>

      {/* Modal Create Project */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl glass-panel border border-cyan-500/40 p-6 sm:p-8 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setIsCreateOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white bg-slate-900/60 rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-white">Yangi Loyiha Yaratish</h2>

            <form onSubmit={handleCreate} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Loyiha Nomi:
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="masalan: Shaxsiy Blog Platformasi"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Tavsif:
                </label>
                <textarea
                  required
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Loyiha haqida batafsil..."
                  rows={2}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Texnologiyalar (vergul bilan):
                </label>
                <input
                  type="text"
                  value={technologies}
                  onChange={(e) => setTechnologies(e.target.value)}
                  placeholder="React, Next.js, Tailwind CSS"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Talablar (vergul bilan):
                </label>
                <input
                  type="text"
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  placeholder="Autentifikatsiya, CRUD, Responsive dizayn"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                />
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
                  Loyiha Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
