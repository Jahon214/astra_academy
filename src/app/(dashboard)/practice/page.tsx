'use client';

import React, { useState } from 'react';
import {
  Code2,
  CheckCircle2,
  Coins,
  Play,
  RotateCcw,
  Sparkles,
  Send,
  ExternalLink,
  Laptop,
} from 'lucide-react';
import { useAstra } from '@/lib/store';
import { CoinRewardModal } from '@/components/gamification/CoinRewardModal';

export default function PracticePage() {
  const { practicalTasks, completeTask } = useAstra();
  const [selectedTaskId, setSelectedTaskId] = useState<string>(practicalTasks[0]?.id || '');
  const [userCode, setUserCode] = useState<string>(practicalTasks[0]?.starter_code || '');
  const [previewSrcDoc, setPreviewSrcDoc] = useState<string>(practicalTasks[0]?.starter_code || '');
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);

  const selectedTask = practicalTasks.find((t) => t.id === selectedTaskId) || practicalTasks[0];

  const handleSelectTask = (taskId: string) => {
    setSelectedTaskId(taskId);
    const task = practicalTasks.find((t) => t.id === taskId);
    if (task) {
      setUserCode(task.starter_code);
      setPreviewSrcDoc(task.starter_code);
    }
  };

  const handleRunCode = () => {
    setPreviewSrcDoc(userCode);
  };

  const handleResetCode = () => {
    if (selectedTask) {
      setUserCode(selectedTask.starter_code);
      setPreviewSrcDoc(selectedTask.starter_code);
    }
  };

  const handleSubmitTask = () => {
    if (selectedTask) {
      completeTask(selectedTask.id);
      setIsRewardModalOpen(true);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-base sm:text-lg font-bold text-white flex items-center gap-1.5">
          <Code2 className="w-4 h-4 text-cyan-400" />
          Amaliy Topshiriqlar va Kod Sinovi
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Brauzer ichida HTML va CSS kodlarini yozib, natijani jonli ko‘ring.
        </p>
      </div>

      {/* Task Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {practicalTasks.map((task) => {
          const isCurrent = task.id === selectedTask?.id;

          return (
            <div
              key={task.id}
              onClick={() => handleSelectTask(task.id)}
              className={`p-5 rounded-3xl border cursor-pointer transition-all flex items-start justify-between gap-4 ${
                isCurrent
                  ? 'glass-panel border-cyan-500/80 bg-cyan-950/20 shadow-glow-sm'
                  : 'glass-panel border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-1.5 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-800 text-slate-300">
                    {task.difficulty}
                  </span>
                  {task.is_completed && (
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Bajarildi
                    </span>
                  )}
                </div>
                <h3 className="text-base font-bold text-white truncate">
                  {task.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {task.description}
                </p>
              </div>

              <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1.5 rounded-xl border border-cyan-500/30 flex-shrink-0 flex items-center gap-1">
                <Coins className="w-3.5 h-3.5" />
                +{task.coin_reward} coin
              </span>
            </div>
          );
        })}
      </div>

      {/* Task Details and Requirements */}
      {selectedTask && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white">{selectedTask.title}</h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                {selectedTask.description}
              </p>
            </div>

            <button
              onClick={handleSubmitTask}
              disabled={selectedTask.is_completed}
              className={`px-6 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all flex-shrink-0 ${
                selectedTask.is_completed
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 cursor-default'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-95 text-slate-950 shadow-glow-sm cursor-pointer'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>{selectedTask.is_completed ? 'Topshirilgan ✓' : 'Topshiriqni topshirish'}</span>
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Bajarilishi kerak bo‘lgan talablar:
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {selectedTask.requirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Live Interactive Code Playground: Editor on Left, Live Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor Box */}
        <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800 flex flex-col h-[260px] sm:h-[320px]">
          {/* Editor Header */}
          <div className="px-5 py-3.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs font-mono text-slate-400 ml-2">index.html</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleResetCode}
                title="Boshlang‘ich holatga qaytarish"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 text-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleRunCode}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-glow-sm transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Ishga tushirish</span>
              </button>
            </div>
          </div>

          {/* Textarea Editor */}
          <div className="flex-1 p-4 bg-[#0a0f1d] overflow-hidden">
            <textarea
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              spellCheck={false}
              className="w-full h-full bg-transparent font-mono text-xs sm:text-sm text-cyan-200 resize-none focus:outline-none leading-relaxed placeholder:text-slate-600"
              placeholder="HTML/CSS kodingizni shu yerga yozing..."
            />
          </div>
        </div>

        {/* Live Preview Box */}
        <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800 flex flex-col h-[260px] sm:h-[320px]">
          {/* Preview Header */}
          <div className="px-5 py-3.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <Laptop className="w-4 h-4 text-cyan-400" />
              <span>Jonli Natija (Live Preview)</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Interactive
            </span>
          </div>

          {/* Iframe Preview */}
          <div className="flex-1 bg-white p-2">
            <iframe
              title="Jonli Natija"
              srcDoc={previewSrcDoc}
              sandbox="allow-scripts"
              className="w-full h-full border-none rounded-xl bg-slate-950"
            />
          </div>
        </div>
      </div>

      {/* Confetti Reward Modal */}
      <CoinRewardModal
        isOpen={isRewardModalOpen}
        onClose={() => setIsRewardModalOpen(false)}
        title="Topshiriq Bajarildi! 💻"
        coins={selectedTask?.coin_reward || 50}
        xp={selectedTask?.xp_reward || 60}
        message={`"${selectedTask?.title}" amaliy topshirig‘i muvaffaqiyatli yakunlandi.`}
      />
    </div>
  );
}
