'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, BookOpen, FileText, Rocket, X, ArrowRight } from 'lucide-react';
import { useAstra } from '@/lib/store';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { courses, guides, projects } = useAstra();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent can toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredCourses = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.description.toLowerCase().includes(query.toLowerCase())
  );

  const filteredGuides = guides.filter(
    (g) =>
      g.title.toLowerCase().includes(query.toLowerCase()) ||
      g.category.toLowerCase().includes(query.toLowerCase())
  );

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.technologies.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  const hasResults =
    filteredCourses.length > 0 || filteredGuides.length > 0 || filteredProjects.length > 0;

  const handleSelect = (url: string) => {
    router.push(url);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-2xl rounded-2xl glass-panel shadow-2xl border border-cyan-500/30 overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-700/60 flex items-center gap-3 bg-slate-900/90">
          <Search className="w-5 h-5 text-cyan-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Kurslar, qo‘llanmalar yoki loyihalarni qidirish..."
            className="w-full bg-transparent border-none text-white text-base focus:outline-none placeholder:text-slate-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-white rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-xs text-slate-400 bg-slate-800 border border-slate-700 rounded">
            ESC
          </kbd>
        </div>

        {/* Search Results */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!query ? (
            <div className="text-center py-8 text-slate-400 text-sm">
              <p>Qidirmoqchi bo‘lgan mavzu nomini yozing</p>
              <div className="flex justify-center gap-2 mt-3 flex-wrap">
                {['HTML', 'CSS Flexbox', 'JavaScript', 'React', 'Todo App', 'Portfolio'].map(
                  (tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-cyan-500/20 hover:text-cyan-300 text-slate-300 border border-slate-700/50 transition-all"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : !hasResults ? (
            <div className="text-center py-8 text-slate-400 text-sm">
              "{query}" bo‘yicha hech narsa topilmadi.
            </div>
          ) : (
            <>
              {/* Courses Results */}
              {filteredCourses.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                    Kurslar
                  </h4>
                  <div className="space-y-1">
                    {filteredCourses.map((course) => (
                      <div
                        key={course.id}
                        onClick={() => handleSelect(`/courses/${course.id}`)}
                        className="p-3 rounded-xl bg-slate-800/40 hover:bg-cyan-500/10 border border-slate-700/40 hover:border-cyan-500/40 cursor-pointer flex items-center justify-between transition-all group"
                      >
                        <div>
                          <p className="text-sm font-semibold text-white group-hover:text-cyan-300">
                            {course.title}
                          </p>
                          <p className="text-xs text-slate-400 line-clamp-1">
                            {course.description}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-transform group-hover:translate-x-1 flex-shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Guides Results */}
              {filteredGuides.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-cyan-400" />
                    Qo‘llanmalar
                  </h4>
                  <div className="space-y-1">
                    {filteredGuides.map((guide) => (
                      <div
                        key={guide.id}
                        onClick={() => handleSelect(`/guides`)}
                        className="p-3 rounded-xl bg-slate-800/40 hover:bg-cyan-500/10 border border-slate-700/40 hover:border-cyan-500/40 cursor-pointer flex items-center justify-between transition-all group"
                      >
                        <div>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 mr-2">
                            {guide.category}
                          </span>
                          <span className="text-sm font-semibold text-white group-hover:text-cyan-300">
                            {guide.title}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-transform group-hover:translate-x-1 flex-shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects Results */}
              {filteredProjects.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Rocket className="w-3.5 h-3.5 text-cyan-400" />
                    Loyihalar
                  </h4>
                  <div className="space-y-1">
                    {filteredProjects.map((project) => (
                      <div
                        key={project.id}
                        onClick={() => handleSelect(`/projects`)}
                        className="p-3 rounded-xl bg-slate-800/40 hover:bg-cyan-500/10 border border-slate-700/40 hover:border-cyan-500/40 cursor-pointer flex items-center justify-between transition-all group"
                      >
                        <div>
                          <p className="text-sm font-semibold text-white group-hover:text-cyan-300">
                            {project.title}
                          </p>
                          <p className="text-xs text-slate-400 line-clamp-1">
                            {project.technologies.join(', ')}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-transform group-hover:translate-x-1 flex-shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
