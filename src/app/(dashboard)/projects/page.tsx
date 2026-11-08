'use client';

import React, { useState } from 'react';
import {
  Rocket,
  CheckCircle2,
  Coins,
  Youtube,
  Github,
  Globe,
  ExternalLink,
  Sparkles,
  Send,
  Code2,
  X,
} from 'lucide-react';
import { useAstra } from '@/lib/store';
import { Project } from '@/lib/types';
import { CoinRewardModal } from '@/components/gamification/CoinRewardModal';
import { VideoPlayer } from '@/components/learning/VideoPlayer';

export default function ProjectsPage() {
  const { projects, completeProject } = useAstra();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
  const [activeReward, setActiveReward] = useState({ coins: 100, xp: 150, title: '' });

  const handleOpenProject = (project: Project) => {
    setSelectedProject(project);
    setGithubUrl(project.github_url || '');
    setLiveUrl(project.live_url || '');
  };

  const handleSubmitProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject) return;

    completeProject(selectedProject.id, githubUrl, liveUrl);
    setActiveReward({
      coins: selectedProject.coin_reward,
      xp: selectedProject.xp_reward,
      title: selectedProject.title,
    });
    setSelectedProject(null);
    setIsRewardModalOpen(true);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-base sm:text-lg font-bold text-white flex items-center gap-1.5">
          <Rocket className="w-4 h-4 text-cyan-400" />
          Portfolio Loyihalari
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Amaliy loyihalarni video darslik asosida yarating va GitHub havolasini topshiring.
        </p>
      </div>

      {/* Projects List */}
      <div className="space-y-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="glass-panel rounded-2xl p-4 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-3 group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-slate-800 text-slate-300 border border-slate-700">
                  {project.difficulty}
                </span>

                {project.is_completed ? (
                  <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                    <CheckCircle2 className="w-4 h-4" /> Bajarilgan
                  </span>
                ) : (
                  <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30 flex items-center gap-1">
                    <Coins className="w-3.5 h-3.5" />
                    +{project.coin_reward} coin
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-semibold bg-slate-900 border border-slate-700/60 text-cyan-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action */}
            <div className="pt-4 border-t border-slate-800">
              <button
                onClick={() => handleOpenProject(project)}
                className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                  project.is_completed
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                    : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-glow-sm'
                }`}
              >
                <span>{project.is_completed ? 'Loyihani ko‘rish' : 'Loyihani boshlash'}</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Project Details & Submission Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl glass-panel border border-cyan-500/40 p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white bg-slate-900/60 rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-slate-800 text-slate-300">
                  {selectedProject.difficulty}
                </span>
                <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30">
                  +{selectedProject.coin_reward} coin • +{selectedProject.xp_reward} XP
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                {selectedProject.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedProject.description}
              </p>
            </div>

            {/* Embedded YouTube Project Tutorial if available */}
            {selectedProject.youtube_tutorial_id && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Youtube className="w-4 h-4 text-rose-500" />
                  Video Yo‘riqnoma va Darslik
                </h4>
                <VideoPlayer
                  youtubeId={selectedProject.youtube_tutorial_id}
                  title={selectedProject.title}
                />
              </div>
            )}

            {/* Project Requirements */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Loyiha Talablari:
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {selectedProject.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Submission Form */}
            <form onSubmit={handleSubmitProject} className="space-y-4 pt-2 border-t border-slate-800">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Send className="w-4 h-4 text-cyan-400" />
                Loyihani Topshirish (GitHub & Live Demo)
              </h4>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    GitHub Ombori Havolasi (URL):
                  </label>
                  <div className="relative">
                    <Github className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      required
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      placeholder="https://github.com/foydalanuvchi/loyiha-nomi"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Jonli Sayt Havolasi (Vercel / Netlify / GitHub Pages):
                  </label>
                  <div className="relative">
                    <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      value={liveUrl}
                      onChange={(e) => setLiveUrl(e.target.value)}
                      placeholder="https://loyiha.vercel.app"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-glow-sm transition-all"
                >
                  {selectedProject.is_completed ? 'Qayta topshirish' : 'Topshirish va +100 coin olish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confetti Reward Modal */}
      <CoinRewardModal
        isOpen={isRewardModalOpen}
        onClose={() => setIsRewardModalOpen(false)}
        title="Loyiha Qabul Qilindi! 🚀"
        coins={activeReward.coins}
        xp={activeReward.xp}
        message={`"${activeReward.title}" loyihangiz muvaffaqiyatli topshirildi va hisobingizga tangalar tushdi.`}
      />
    </div>
  );
}
