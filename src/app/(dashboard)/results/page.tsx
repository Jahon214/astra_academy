'use client';

import React, { useState } from 'react';
import {
  BarChart3,
  Award,
  CheckCircle2,
  BookOpen,
  Code2,
  Rocket,
  Download,
  ExternalLink,
} from 'lucide-react';
import { useAstra } from '@/lib/store';
import { CertificateModal } from '@/components/learning/CertificateModal';

export default function ResultsPage() {
  const { user, courses, practicalTasks, projects } = useAstra();
  const [selectedCertificateCourse, setSelectedCertificateCourse] = useState<string | null>(null);

  let totalLessons = 0;
  let completedLessons = 0;

  courses.forEach((c) => {
    c.modules?.forEach((m) => {
      totalLessons += m.lessons.length;
      completedLessons += m.lessons.filter((l) => l.is_completed).length;
    });
  });

  const completedTasks = practicalTasks.filter((t) => t.is_completed).length;
  const completedProjects = projects.filter((p) => p.is_completed).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
          <BarChart3 className="w-4 h-4" />
          <span>Ta’lim Ko‘rsatkichlari</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Mening Natijalarim va Sertifikatlar
        </h1>
        <p className="text-sm text-slate-300 mt-1 max-w-2xl">
          Platformadagi barcha kurslar, amaliy topshiriqlar va loyihalar bo‘yicha to‘liq o‘quv statistikangiz.
        </p>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl">
          <BookOpen className="w-5 h-5 text-cyan-400 mb-2" />
          <span className="text-2xl sm:text-3xl font-extrabold text-white">
            {completedLessons} / {totalLessons}
          </span>
          <p className="text-xs text-slate-400 mt-1">Tugatilgan darslar</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl">
          <Code2 className="w-5 h-5 text-emerald-400 mb-2" />
          <span className="text-2xl sm:text-3xl font-extrabold text-white">
            {completedTasks} / {practicalTasks.length}
          </span>
          <p className="text-xs text-slate-400 mt-1">Amaliy topshiriqlar</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl">
          <Rocket className="w-5 h-5 text-purple-400 mb-2" />
          <span className="text-2xl sm:text-3xl font-extrabold text-white">
            {completedProjects} / {projects.length}
          </span>
          <p className="text-xs text-slate-400 mt-1">Bajarilgan loyihalar</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl">
          <Award className="w-5 h-5 text-amber-400 mb-2" />
          <span className="text-2xl sm:text-3xl font-extrabold text-white">
            ⭐ Daraja {user?.level || 1}
          </span>
          <p className="text-xs text-slate-400 mt-1">{user?.xp || 0} umumiy XP</p>
        </div>
      </div>

      {/* Course-by-Course Progress */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-cyan-400" />
          Kurslar Bo‘yicha Progress
        </h2>

        <div className="space-y-4">
          {courses.map((course) => {
            const allLessons = course.modules?.flatMap((m) => m.lessons) || [];
            const doneLessons = allLessons.filter((l) => l.is_completed).length;
            const percent =
              allLessons.length > 0 ? Math.round((doneLessons / allLessons.length) * 100) : 0;
            const isCompleted = percent === 100 && allLessons.length > 0;

            return (
              <div
                key={course.id}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{course.title}</span>
                    <span className="text-xs text-slate-400">
                      ({doneLessons}/{allLessons.length} dars)
                    </span>
                  </div>

                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-shrink-0">
                  <span className="text-sm font-extrabold text-cyan-400">{percent}%</span>

                  {/* Certificate generation if completed or for demo preview */}
                  <button
                    onClick={() => setSelectedCertificateCourse(course.title)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition-all"
                  >
                    <Award className="w-4 h-4" />
                    <span>Sertifikat</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Certificate Modal */}
      {selectedCertificateCourse && (
        <CertificateModal
          isOpen={Boolean(selectedCertificateCourse)}
          onClose={() => setSelectedCertificateCourse(null)}
          studentName={`${user?.first_name || 'Ali'} ${user?.last_name || 'Valiyev'}`}
          courseTitle={selectedCertificateCourse}
        />
      )}
    </div>
  );
}
