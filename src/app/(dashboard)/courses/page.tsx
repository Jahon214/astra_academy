'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Clock, ArrowRight, Search, PlayCircle } from 'lucide-react';
import { useAstra } from '@/lib/store';

export default function CoursesPage() {
  const { courses, triggerHaptic } = useAstra();
  const [selectedCategory, setSelectedCategory] = useState('Barchasi');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Barchasi', 'Frontend', 'Full-Stack', 'Asboblar'];

  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      selectedCategory === 'Barchasi' || course.category === selectedCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-4">
      {/* Header & Search */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-base sm:text-lg font-bold text-white flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            Barcha Kurslar Katalogi
          </h1>
          <span className="text-[11px] text-slate-400 font-medium">
            {filteredCourses.length} ta kurs
          </span>
        </div>

        {/* Search Input */}
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Kurslarni qidirish..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900/90 border border-slate-700/60 text-white placeholder:text-slate-500 text-xs focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              triggerHaptic('light');
              setSelectedCategory(cat);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-glow-sm'
                : 'bg-slate-900/80 text-slate-300 border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Compact Courses List */}
      <div className="space-y-2.5">
        {filteredCourses.map((course) => {
          const allLessons = course.modules?.flatMap((m) => m.lessons) || [];
          const completedCount = allLessons.filter((l) => l.is_completed).length;
          const progressPercent =
            allLessons.length > 0 ? Math.round((completedCount / allLessons.length) * 100) : 0;
          const isStarted = completedCount > 0;

          return (
            <Link
              key={course.id}
              href={`/courses/${course.id}`}
              onClick={() => triggerHaptic('medium')}
              className="p-3.5 rounded-2xl glass-panel border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col gap-2.5 group block"
            >
              <div className="flex items-center gap-3">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-700 flex-shrink-0">
                  <Image
                    src={course.thumbnail_url}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase bg-black/70 text-cyan-300">
                    {course.difficulty}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[10px] font-semibold text-cyan-400">
                      {course.category}
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="text-[10px] text-slate-400">
                      {course.total_lessons} ta dars
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold text-white truncate group-hover:text-cyan-300 transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                    {course.description}
                  </p>
                </div>
              </div>

              {/* Progress bar and 1-tap action */}
              <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-800/80 text-[11px]">
                <div className="flex items-center gap-2 flex-1">
                  <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-cyan-400 rounded-full"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <span className="font-mono text-[10px] text-slate-400">
                    {progressPercent}%
                  </span>
                </div>

                <span className="text-xs font-bold text-cyan-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>{isStarted ? 'Davom etish' : 'Boshlash'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
