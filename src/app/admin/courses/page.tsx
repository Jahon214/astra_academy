'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  BookOpen,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Clock,
  Coins,
  X,
  PlayCircle,
  FolderPlus,
} from 'lucide-react';
import { useAstra } from '@/lib/store';
import { CourseDifficulty } from '@/lib/types';

export default function AdminCoursesPage() {
  const { courses, addCourse, updateCourse, deleteCourse, addLesson } = useAstra();

  // Create Course Modal State
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDesc, setCourseDesc] = useState('');
  const [courseCategory, setCourseCategory] = useState('Frontend');
  const [courseDifficulty, setCourseDifficulty] = useState<CourseDifficulty>('Boshlang\'ich');
  const [courseThumb, setCourseThumb] = useState(
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80'
  );

  // Add Lesson Modal State
  const [activeCourseIdForLesson, setActiveCourseIdForLesson] = useState<string | null>(null);
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonDesc, setLessonDesc] = useState('');
  const [lessonYoutubeId, setLessonYoutubeId] = useState('');
  const [lessonDuration, setLessonDuration] = useState(15);
  const [lessonCoins, setLessonCoins] = useState(20);
  const [lessonXp, setLessonXp] = useState(30);

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseTitle) return;

    addCourse({
      title: courseTitle,
      description: courseDesc,
      category: courseCategory,
      difficulty: courseDifficulty,
      thumbnail_url: courseThumb,
    });

    setCourseTitle('');
    setCourseDesc('');
    setIsAddCourseOpen(false);
  };

  const handleCreateLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeCourseIdForLesson || !lessonTitle) return;

    const course = courses.find((c) => c.id === activeCourseIdForLesson);
    const moduleId = course?.modules?.[0]?.id || `mod-${Date.now()}`;

    addLesson(activeCourseIdForLesson, moduleId, {
      title: lessonTitle,
      description: lessonDesc,
      youtube_video_id: lessonYoutubeId || 'UB1O30fR-EE',
      duration_minutes: lessonDuration,
      coin_reward: lessonCoins,
      xp_reward: lessonXp,
    });

    setLessonTitle('');
    setLessonDesc('');
    setLessonYoutubeId('');
    setActiveCourseIdForLesson(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Kontent Boshqaruvi</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Kurslar va Darslar Boshqaruvi
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Yangi kurslar yaratish, mavjud darslarni tahrirlash yoki YouTube darsliklarini integratsiya qilish.
          </p>
        </div>

        <button
          onClick={() => setIsAddCourseOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-glow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Yangi Kurs Yaratish</span>
        </button>
      </div>

      {/* Courses List */}
      <div className="space-y-4">
        {courses.map((course) => {
          const allLessons = course.modules?.flatMap((m) => m.lessons) || [];

          return (
            <div
              key={course.id}
              className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-slate-700 flex-shrink-0">
                    <Image
                      src={course.thumbnail_url}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-800 text-cyan-300">
                        {course.category}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-800 text-slate-400">
                        {course.difficulty}
                      </span>
                      {course.is_published ? (
                        <span className="text-[10px] font-semibold text-emerald-400">
                          ● Nashr qilingan
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold text-amber-400">
                          ○ Qoralama
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                      {course.description}
                    </p>
                  </div>
                </div>

                {/* Course Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => setActiveCourseIdForLesson(course.id)}
                    className="px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Dars qo‘shish</span>
                  </button>

                  <button
                    onClick={() =>
                      updateCourse(course.id, { is_published: !course.is_published })
                    }
                    title={course.is_published ? 'Yashirish' : 'Nashr qilish'}
                    className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                  >
                    {course.is_published ? (
                      <Eye className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-slate-500" />
                    )}
                  </button>

                  <button
                    onClick={() => deleteCourse(course.id)}
                    title="O‘chirish"
                    className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Lessons Sub-list */}
              {allLessons.length > 0 && (
                <div className="pt-3 border-t border-slate-800/80 space-y-1.5">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Darslar ({allLessons.length} ta):
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {allLessons.map((les, idx) => (
                      <div
                        key={les.id}
                        className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs flex items-center justify-between gap-2"
                      >
                        <span className="truncate text-slate-300">
                          {idx + 1}. {les.title}
                        </span>
                        <span className="text-[10px] font-mono text-cyan-400 flex-shrink-0">
                          +{les.coin_reward}c
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal: Create Course */}
      {isAddCourseOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl glass-panel border border-cyan-500/40 p-6 sm:p-8 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setIsAddCourseOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white bg-slate-900/60 rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-white">Yangi Kurs Yaratish</h2>

            <form onSubmit={handleCreateCourse} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Kurs Sarlavhasi:
                </label>
                <input
                  type="text"
                  required
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  placeholder="masalan: Node.js Backend Asoslari"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Tavsif:
                </label>
                <textarea
                  required
                  value={courseDesc}
                  onChange={(e) => setCourseDesc(e.target.value)}
                  placeholder="Kurs haqida batafsil ma’lumot..."
                  rows={3}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Kategoriya:
                  </label>
                  <select
                    value={courseCategory}
                    onChange={(e) => setCourseCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Full-Stack">Full-Stack</option>
                    <option value="Asboblar">Asboblar</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Qiyinchilik:
                  </label>
                  <select
                    value={courseDifficulty}
                    onChange={(e) =>
                      setCourseDifficulty(e.target.value as CourseDifficulty)
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Boshlang'ich">Boshlang'ich</option>
                    <option value="O'rta">O'rta</option>
                    <option value="Murakkab">Murakkab</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Muqova Rasmi (URL):
                </label>
                <input
                  type="url"
                  value={courseThumb}
                  onChange={(e) => setCourseThumb(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddCourseOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
                >
                  Yaratish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Lesson */}
      {activeCourseIdForLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl glass-panel border border-cyan-500/40 p-6 sm:p-8 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setActiveCourseIdForLesson(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white bg-slate-900/60 rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-white">Yangi Dars Qo‘shish</h2>

            <form onSubmit={handleCreateLesson} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Dars Sarlavhasi:
                </label>
                <input
                  type="text"
                  required
                  value={lessonTitle}
                  onChange={(e) => setLessonTitle(e.target.value)}
                  placeholder="masalan: Express.js Routing"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  YouTube Video ID:
                </label>
                <input
                  type="text"
                  required
                  value={lessonYoutubeId}
                  onChange={(e) => setLessonYoutubeId(e.target.value)}
                  placeholder="masalan: UB1O30fR-EE"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Dars Tavsifi:
                </label>
                <textarea
                  value={lessonDesc}
                  onChange={(e) => setLessonDesc(e.target.value)}
                  placeholder="Darsda nimalar o‘rganilishi haqida..."
                  rows={2}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Davomiylik (daq):
                  </label>
                  <input
                    type="number"
                    value={lessonDuration}
                    onChange={(e) => setLessonDuration(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Coin Mukofoti:
                  </label>
                  <input
                    type="number"
                    value={lessonCoins}
                    onChange={(e) => setLessonCoins(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    XP Mukofoti:
                  </label>
                  <input
                    type="number"
                    value={lessonXp}
                    onChange={(e) => setLessonXp(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveCourseIdForLesson(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
                >
                  Darsni Qo‘shish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
