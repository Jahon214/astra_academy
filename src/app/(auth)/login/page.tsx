'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, ShieldCheck, UserCheck, Sparkles } from 'lucide-react';
import { useAstra } from '@/lib/store';

export default function LoginPage() {
  const router = useRouter();
  const { login, loginAsStudent, loginAsAdmin } = useAstra();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Iltimos, barcha maydonlarni to‘ldiring.');
      return;
    }

    const success = login(email, password);
    if (success) {
      router.push('/');
    } else {
      setErrorMsg('Email yoki parol noto‘g‘ri.');
    }
  };

  const handleDemoStudent = () => {
    loginAsStudent();
    router.push('/');
  };

  const handleDemoAdmin = () => {
    loginAsAdmin();
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-astra-darkest flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md rounded-3xl glass-panel border border-cyan-500/30 p-6 sm:p-10 space-y-6 shadow-2xl relative z-10">
        {/* Brand Logo & Header */}
        <div className="text-center space-y-2">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-cyan-400/50 mx-auto shadow-glow-md">
            <Image
              src="/images/astra-logo.png"
              alt="Astra Academy"
              fill
              className="object-cover"
              priority
            />
          </div>

          <h1 className="text-2xl font-extrabold tracking-wider metallic-text">
            ASTRA ACADEMY
          </h1>
          <p className="text-[10px] font-bold text-cyan-400 tracking-widest uppercase">
            IT • AI • PROGRAMMING
          </p>
          <h2 className="text-lg font-bold text-white pt-2">
            Xush kelibsiz!
          </h2>
          <p className="text-xs text-slate-400">
            Hisobingizga kiring va o‘qishni davom ettiring
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs text-center font-medium">
            {errorMsg}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Email Manzili
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ali@astra.uz"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Parol
              </label>
              <Link
                href="/forgot-password"
                className="text-[11px] text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Parolni unutdingizmi?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-95 text-slate-950 font-bold text-xs sm:text-sm shadow-glow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Kirish</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* 1-Click Quick Demo Sign-in for immediate testing */}
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <p className="text-center text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
            Tezkor Sinov Rejimi (1-bosish):
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleDemoStudent}
              type="button"
              className="py-2 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-cyan-300 border border-cyan-500/20 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Talaba sifatida</span>
            </button>
            <button
              onClick={handleDemoAdmin}
              type="button"
              className="py-2 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin sifatida</span>
            </button>
          </div>
        </div>

        {/* Footer Link */}
        <p className="text-center text-xs text-slate-400">
          Hisobingiz yo‘qmi?{' '}
          <Link href="/register" className="text-cyan-400 hover:text-cyan-300 font-bold">
            Ro‘yxatdan o‘ting
          </Link>
        </p>
      </div>
    </div>
  );
}
