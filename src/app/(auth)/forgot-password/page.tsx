'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSent(true);
    }
  };

  return (
    <div className="min-h-screen bg-astra-darkest flex items-center justify-center p-4 relative overflow-hidden">
      <div className="w-full max-w-md rounded-3xl glass-panel border border-cyan-500/30 p-6 sm:p-10 space-y-6 shadow-2xl relative z-10">
        <div className="text-center space-y-2">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-cyan-400/50 mx-auto shadow-glow-md">
            <Image
              src="/images/astra-logo.png"
              alt="Astra Academy"
              fill
              className="object-cover"
              priority
            />
          </div>

          <h1 className="text-xl font-extrabold tracking-wider metallic-text">
            ASTRA ACADEMY
          </h1>
          <h2 className="text-lg font-bold text-white pt-1">
            Parolni tiklash
          </h2>
          <p className="text-xs text-slate-400">
            Email manzilingizni kiriting, tiklash havolasini yuboramiz
          </p>
        </div>

        {sent ? (
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h3 className="text-sm font-bold text-white">Havola yuborildi!</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-emerald-300">{email}</strong> manziliga parolni tiklash yo‘riqnomasi yuborildi. Iltimos, pochtangizni tekshiring.
            </p>
            <Link
              href="/login"
              className="inline-block mt-2 text-xs font-bold text-cyan-400 hover:text-cyan-300"
            >
              Kirish sahifasiga qaytish
            </Link>
          </div>
        ) : (
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
                  placeholder="nom@domain.uz"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-95 text-slate-950 font-bold text-xs sm:text-sm shadow-glow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Tiklash havolasini yuborish</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-center pt-2">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Kirish sahifasiga qaytish
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
