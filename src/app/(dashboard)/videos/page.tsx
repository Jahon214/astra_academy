'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  PlayCircle,
  Clock,
  Eye,
  Bookmark,
  Share2,
  ChevronLeft,
  Search,
  Filter,
  CheckCircle2,
  X,
  Sparkles,
} from 'lucide-react';
import { useAstra } from '@/lib/store';

export default function HelpfulVideosPage() {
  const { triggerHaptic } = useAstra();
  const [selectedCategory, setSelectedCategory] = useState('barchasi');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVideo, setActiveVideo] = useState<{ id: string; title: string; youtubeId: string; description: string } | null>(null);

  const categories = [
    { id: 'barchasi', label: 'Barchasi' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'ai', label: 'Sun’iy Intellekt' },
    { id: 'career', label: 'Karyera & Maslahat' },
  ];

  const videos = [
    {
      id: 'vid-1',
      title: 'HTML & CSS 30 Daqiqada: Birinchi Veb Sahifangiz',
      description: 'Noldan boshlovchilar uchun amaliy qo‘llanma: teglardan tortib chiroyli dizayngacha.',
      category: 'frontend',
      duration: '32:15',
      views: '12.4k',
      youtubeId: 'UB1O30fR-EE',
      thumbnail: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'vid-2',
      title: 'JavaScript DOM: Tugmalar va Interaktivlik',
      description: 'Veb sahifangizni jonlantiring: hodisalar (events), animatsiyalar va elementlarni boshqarish.',
      category: 'frontend',
      duration: '25:40',
      views: '9.8k',
      youtubeId: 'W6NZfCO5SIk',
      thumbnail: 'https://images.unsplash.com/photo-1579468118864-ddab3a8a8167?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'vid-3',
      title: 'ChatGPT va AI Yordamida Kod Yozish Sirlari',
      description: 'Qanday qilib sun’iy intellekt orqali xatolarni 5 daqiqada tuzatish va yangi funksiyalar yozish mumkin.',
      category: 'ai',
      duration: '18:50',
      views: '24.1k',
      youtubeId: 'jA71v4uT4yQ',
      thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'vid-4',
      title: 'Next.js 14 App Router: Server Components va SEO',
      description: 'Zamonaviy React freymvorki bilan yuqori tezlikdagi web-saytlar qurish.',
      category: 'frontend',
      duration: '45:10',
      views: '8.3k',
      youtubeId: '843nec-IvW0',
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'vid-5',
      title: 'Dasturchi Portfoliosi: Qanday Qilib Ishga Joylashish Mumkin?',
      description: 'Rezyume tayyorlash, GitHub profili va suhbatdan (interview) o‘tish bo‘yicha amaliy maslahatlar.',
      category: 'career',
      duration: '28:15',
      views: '15.6k',
      youtubeId: 'rfscVS0vtbw',
      thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'vid-6',
      title: 'Node.js va Express: REST API Qurish Boshlang‘ich Dars',
      description: 'Ma’lumotlar bazasi va frontend bilan bog‘lanuvchi mustahkam backend arxitekturasi.',
      category: 'backend',
      duration: '38:40',
      views: '7.2k',
      youtubeId: 'Oe421EPjeBE',
      thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    },
  ];

  const filteredVideos = videos.filter((vid) => {
    const matchesCat = selectedCategory === 'barchasi' || vid.category === selectedCategory;
    const matchesQuery = vid.title.toLowerCase().includes(searchQuery.toLowerCase()) || vid.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="space-y-4">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          onClick={() => triggerHaptic('light')}
          className="flex items-center gap-1 text-xs font-semibold text-yellow-400 hover:text-yellow-300 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Bosh menyu</span>
        </Link>
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-yellow-500/20 text-yellow-400 border border-yellow-500/40">
          BEPUL RESURSLAR
        </span>
      </div>

      {/* Hero Banner Header */}
      <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden">
        <Image
          src="/images/menu/menu-foydali-videolar.webp"
          alt="Astra Academy Foydali Videolar"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Video darslarni qidirish..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-yellow-500/60 text-xs text-white placeholder-neutral-500 outline-none transition-colors"
        />
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              triggerHaptic('light');
              setSelectedCategory(cat.id);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-yellow-400 text-black shadow-[0_0_12px_rgba(250,204,21,0.35)]'
                : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800 border border-neutral-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Videos Grid */}
      <div className="space-y-3">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            className="p-3 rounded-2xl bg-neutral-950 border border-neutral-900 hover:border-yellow-500/40 transition-all space-y-2.5 group"
          >
            {/* Thumbnail with Play Trigger */}
            <div
              onClick={() => {
                triggerHaptic('medium');
                setActiveVideo(video);
              }}
              className="relative aspect-video rounded-xl overflow-hidden bg-neutral-900 cursor-pointer border border-neutral-800"
            >
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="w-11 h-11 rounded-full bg-yellow-400/90 text-black flex items-center justify-center shadow-[0_0_20px_rgba(250,204,21,0.6)] group-hover:scale-110 transition-transform">
                  <PlayCircle className="w-7 h-7 fill-current" />
                </div>
              </div>

              {/* Duration badge */}
              <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/80 text-white text-[10px] font-mono font-bold">
                {video.duration}
              </span>
            </div>

            {/* Info */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[10px] text-neutral-400">
                <span className="text-yellow-400 font-bold uppercase">{video.category}</span>
                <span>•</span>
                <span className="flex items-center gap-0.5">
                  <Eye className="w-3 h-3" /> {video.views} ko‘rishlar
                </span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-yellow-400 transition-colors">
                {video.title}
              </h3>
              <p className="text-[11px] text-neutral-400 line-clamp-2">
                {video.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-lg rounded-2xl bg-neutral-950 border border-yellow-500/40 p-4 space-y-3 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between">
              <h3 className="text-xs sm:text-sm font-bold text-white truncate max-w-[85%]">
                {activeVideo.title}
              </h3>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-1 rounded-lg bg-neutral-900 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-neutral-800">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <p className="text-xs text-neutral-300">
              {activeVideo.description}
            </p>

            <button
              onClick={() => setActiveVideo(null)}
              className="w-full py-2 rounded-xl bg-yellow-400 text-black font-bold text-xs"
            >
              Yopish
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
