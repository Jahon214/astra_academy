'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Radio,
  Play,
  Calendar,
  Clock,
  Users,
  MessageSquare,
  Send,
  Sparkles,
  Share2,
  Bell,
  CheckCircle2,
  ChevronLeft,
} from 'lucide-react';
import { useAstra } from '@/lib/store';

export default function LiveStreamsPage() {
  const { user, triggerHaptic } = useAstra();
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { id: '1', name: 'Jasur Bek', text: 'Assalomu alaykum ustoz, ovoz zo‘r eshitilyapti!', time: '20:02' },
    { id: '2', name: 'Madina K.', text: 'AI bilan ishlash bo‘yicha savol bersam bo‘ladimi?', time: '20:04' },
    { id: '3', name: 'Astra Moderator', text: 'Xush kelibsiz! Savollaringizni bemalol yozib qoldiring.', time: '20:05', isMod: true },
  ]);
  const [isReminderSet, setIsReminderSet] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    triggerHaptic('light');

    setChatMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: user ? `${user.first_name} ${user.last_name}` : 'Talaba',
        text: chatMessage.trim(),
        time: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setChatMessage('');
  };

  const upcomingStreams = [
    {
      id: 'live-1',
      title: 'Full-Stack Dasturlash: Next.js va Supabase',
      instructor: 'Astra Academy Katta Muhandisi',
      date: 'Bugun',
      time: '20:00',
      viewers: '240+ kutilmoqda',
      isLiveNow: true,
      youtubeId: 'kJQP7kiw5Fk', // Luis Fonsi or generic educational/lofi embed
    },
    {
      id: 'live-2',
      title: 'AI Vositalari: Cursor va Claude orqali 10x Tezroq Kod Yozish',
      instructor: 'Astra Academy AI Mutaxassisi',
      date: 'Ertaga',
      time: '20:00',
      viewers: '350+ ro‘yxatdan o‘tdi',
      isLiveNow: false,
    },
    {
      id: 'live-3',
      title: 'Telegram Mini Apps va Botlar Integratsiyasi',
      instructor: 'Backend & DevOps Team',
      date: 'Shanba',
      time: '19:30',
      viewers: '180+ ro‘yxatdan o‘tdi',
      isLiveNow: false,
    },
  ];

  return (
    <div className="space-y-4">
      {/* Top Breadcrumb & Title */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          onClick={() => triggerHaptic('light')}
          className="flex items-center gap-1 text-xs font-semibold text-yellow-400 hover:text-yellow-300 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Bosh menyu</span>
        </Link>
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/40 flex items-center gap-1 animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
          JONLI EFIR
        </span>
      </div>

      {/* Hero Banner Header */}
      <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden">
        <Image
          src="/images/menu/menu-jonli-efirlar.webp"
          alt="Astra Academy Jonli Efirlar"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Main Active Live Player */}
      <div className="p-3.5 rounded-2xl bg-neutral-950 border border-yellow-500/30 space-y-3 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Hozir Efirda
            </span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-yellow-400 font-semibold">
            <Users className="w-3.5 h-3.5" />
            <span>342 tomoshabin</span>
          </div>
        </div>

        {/* Video Embed */}
        <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-neutral-800 shadow-inner">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0"
            title="Astra Academy Jonli Efir"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div>
          <h2 className="text-sm sm:text-base font-bold text-white">
            Full-Stack Dasturlash: Next.js 14 va Sun’iy Intellekt Integratsiyasi
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Ushbu jonli efirda zamonaviy veb ilovalarga sun’iy intellekt API larini integratsiya qilish va amaliy loyiha yaratish ko‘rsatib beriladi.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => {
              triggerHaptic('success');
              setIsReminderSet(!isReminderSet);
            }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              isReminderSet
                ? 'bg-yellow-400 text-black shadow-[0_0_15px_rgba(250,204,21,0.4)]'
                : 'bg-neutral-900 hover:bg-neutral-800 text-yellow-400 border border-yellow-500/30'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>{isReminderSet ? 'Eslatma yoqildi ✓' : 'Eslatma o‘rnatish'}</span>
          </button>

          <button
            onClick={() => {
              triggerHaptic('light');
              if (navigator.share) {
                navigator.share({
                  title: 'Astra Academy Jonli Efir',
                  text: 'Astra Academy jonli masterklassiga qo‘shiling!',
                  url: window.location.href,
                });
              }
            }}
            className="py-2 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 text-xs font-semibold flex items-center gap-1 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>Ulashish</span>
          </button>
        </div>
      </div>

      {/* Interactive Live Chat */}
      <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
          <div className="flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-yellow-400" />
            <h3 className="text-xs sm:text-sm font-bold text-white">Jonli Muloqot va Savollar</h3>
          </div>
          <span className="text-[10px] text-neutral-500 font-mono">Real-vaqt</span>
        </div>

        {/* Message Feed */}
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`p-2 rounded-xl text-xs space-y-0.5 ${
                msg.isMod
                  ? 'bg-yellow-500/10 border border-yellow-500/30'
                  : 'bg-neutral-900/80 border border-neutral-800/80'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`font-bold ${msg.isMod ? 'text-yellow-400' : 'text-neutral-300'}`}>
                  {msg.name} {msg.isMod && '★'}
                </span>
                <span className="text-[10px] text-neutral-500">{msg.time}</span>
              </div>
              <p className="text-neutral-200">{msg.text}</p>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            placeholder="Savolingizni yozing..."
            className="flex-1 px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-yellow-500 text-xs text-white placeholder-neutral-500 outline-none"
          />
          <button
            type="submit"
            className="px-3 py-2 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-xs flex items-center justify-center transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Upcoming Masterclasses Schedule */}
      <div className="space-y-2 pt-1">
        <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-yellow-400" />
          Yaqinlashayotgan Efirlar Jadvali
        </h3>

        <div className="space-y-2">
          {upcomingStreams.map((stream) => (
            <div
              key={stream.id}
              className="p-3 rounded-2xl bg-neutral-950 border border-neutral-900 hover:border-yellow-500/30 transition-all flex items-center justify-between gap-3"
            >
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-900 text-yellow-400 border border-neutral-800">
                    {stream.date} • {stream.time}
                  </span>
                  {stream.isLiveNow && (
                    <span className="text-[9px] font-extrabold text-red-400 uppercase tracking-wider">
                      ● Efirda
                    </span>
                  )}
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                  {stream.title}
                </h4>
                <p className="text-[10px] text-neutral-400 truncate">
                  {stream.instructor}
                </p>
              </div>

              <button
                onClick={() => {
                  triggerHaptic('light');
                  alert(`"${stream.title}" efiriga eslatma belgilandi!`);
                }}
                className="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-yellow-400 border border-yellow-500/30 text-[11px] font-bold flex-shrink-0 transition-colors"
              >
                Qatnashish
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
